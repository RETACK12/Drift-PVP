const { verifyKey } = require("discord-interactions");
const { loadUpdates, loadEvents, nextId } = require("./_lib/store");
const {
  json,
  ephemeral,
  isAdmin,
  postChannelMessage,
  deleteChannelMessage,
  option,
  subcommand
} = require("./_lib/discord");

function rawBody(event) {
  if (!event.body) return "";
  return event.isBase64Encoded ? Buffer.from(event.body, "base64").toString("utf8") : event.body;
}

function header(event, name) {
  const headers = event.headers || {};
  const found = Object.keys(headers).find((key) => key.toLowerCase() === name.toLowerCase());
  return found ? headers[found] : "";
}

function keepLines(text) {
  return String(text || "")
    .replace(/\r\n/g, "\n")
    .replace(/\\n/g, "\n")
    .trim();
}

function modalValue(interaction, id) {
  for (const row of interaction.data?.components || []) {
    for (const field of row.components || []) {
      if (field.custom_id === id) return field.value || "";
    }
  }
  return "";
}

function sendModal(channelId, useEmbed, colorName) {
  const customId = `send:${channelId}:${useEmbed ? "1" : "0"}:${colorName || "cyan"}`;
  const fields = [];
  if (useEmbed) {
    fields.push({
      type: 1,
      components: [
        {
          type: 4,
          custom_id: "title",
          style: 1,
          label: "Embed title",
          required: false,
          max_length: 256
        }
      ]
    });
  }
  fields.push({
    type: 1,
    components: [
      {
        type: 4,
        custom_id: "message",
        style: 2,
        label: "Message",
        placeholder: "Paste rules or any text. Line breaks stay.",
        required: true,
        max_length: useEmbed ? 4000 : 2000
      }
    ]
  });
  return json(200, {
    type: 9,
    data: {
      custom_id: customId.slice(0, 100),
      title: useEmbed ? "Send embed" : "Send message",
      components: fields
    }
  });
}

function updateModal() {
  return json(200, {
    type: 9,
    data: {
      custom_id: "update:add",
      title: "Post update",
      components: [
        {
          type: 1,
          components: [
            {
              type: 4,
              custom_id: "message",
              style: 2,
              label: "Update",
              placeholder: "Paste text or rules. Line breaks stay.",
              required: true,
              max_length: 4000
            }
          ]
        }
      ]
    }
  });
}

async function postUpdateLog(message) {
  const updates = await loadUpdates();
  const id = await nextId(updates);
  const createdAt = Date.now();
  const updateRole = process.env.UPDATE_PING_ROLE_ID || "1536149945856426057";
  await postChannelMessage(process.env.UPDATES_CHANNEL_ID, {
    content: `<@&${updateRole}>`,
    allowed_mentions: { roles: [updateRole] },
    embeds: [
      {
        color: 0x0ebaff,
        title: "Drift PVP Update",
        description: message,
        footer: { text: `ID ${id}` },
        timestamp: new Date(createdAt).toISOString()
      }
    ]
  });
  return id;
}

async function handleSendModal(interaction) {
  const parts = String(interaction.data?.custom_id || "").split(":");
  const channelId = parts[1];
  const useEmbed = parts[2] === "1";
  const colorName = parts[3] || "cyan";
  const title = keepLines(modalValue(interaction, "title"));
  const message = keepLines(modalValue(interaction, "message"));
  if (!channelId || !message) return ephemeral("Channel and message are required.");
  if (useEmbed) {
    const colors = { cyan: 0x0ebaff, purple: 0x771bff };
    const embed = {
      color: colors[colorName] || colors.cyan,
      description: message
    };
    if (title) embed.title = title;
    await postChannelMessage(channelId, { embeds: [embed] });
  } else {
    await postChannelMessage(channelId, { content: message });
  }
  return ephemeral("Message sent.");
}

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const body = rawBody(event);
  const signature = header(event, "x-signature-ed25519");
  const timestamp = header(event, "x-signature-timestamp");
  const valid = await verifyKey(body, signature, timestamp, process.env.DISCORD_PUBLIC_KEY);
  if (!signature || !timestamp || !valid) {
    return { statusCode: 401, body: "Bad request signature" };
  }

  const interaction = JSON.parse(body);

  if (interaction.type === 1) {
    return json(200, { type: 1 });
  }

  if (interaction.type === 5) {
    if (!isAdmin(interaction)) return ephemeral("Only admins can use this command.");
    try {
      const customId = String(interaction.data?.custom_id || "");
      if (customId.startsWith("send:")) {
        return await handleSendModal(interaction);
      }
      if (customId === "update:add") {
        const message = keepLines(modalValue(interaction, "message"));
        if (!message) return ephemeral("Message is required.");
        const id = await postUpdateLog(message);
        return ephemeral(`Update **#${id}** posted to the channel and the website.`);
      }
      return ephemeral("Unknown form.");
    } catch (error) {
      console.error(error);
      return ephemeral(`Command failed: ${String(error.message || error).slice(0, 300)}`);
    }
  }

  if (interaction.type !== 2) {
    return json(200, { type: 1 });
  }

  if (!isAdmin(interaction)) {
    return ephemeral("Only admins can use this command.");
  }

  try {
    const command = interaction.data?.name;
    const sub = subcommand(interaction);

    if (command === "send") {
      const channelId = option(interaction, "channel");
      const useEmbed = Boolean(option(interaction, "embed"));
      const colorName = String(option(interaction, "color") || "cyan");
      if (!channelId) return ephemeral("Channel is required.");
      return sendModal(channelId, useEmbed, colorName);
    }

    if (command === "update") {
      if (sub === "add") {
        return updateModal();
      }

      if (sub === "delete") {
        const id = String(option(interaction, "id") || "").replace(/^#/, "");
        const updates = await loadUpdates();
        const found = updates.find((item) => item.id === id);
        if (!found) return ephemeral(`No update with ID **${id}**.`);
        await deleteChannelMessage(process.env.UPDATES_CHANNEL_ID, found.discordMessageId);
        return ephemeral(`Deleted update **#${id}**.`);
      }

      if (sub === "list") {
        const updates = await loadUpdates();
        if (!updates.length) return ephemeral("No updates yet.");
        return ephemeral(
          updates
            .slice(0, 15)
            .map((item) => `**#${item.id}** — ${item.message.slice(0, 80)}`)
            .join("\n")
        );
      }
    }

    if (command === "event") {
      if (sub === "add") {
        const type = option(interaction, "type");
        const days = Number(option(interaction, "days") || 0);
        const hours = Number(option(interaction, "hours") || 0);
        const minutes = Number(option(interaction, "minutes") || 0);
        const delayMs = ((days * 24 + hours) * 60 + minutes) * 60 * 1000;
        const startAt = Date.now() + delayMs;
        const events = await loadEvents();
        const id = await nextId(events);
        const unix = Math.floor(startAt / 1000);
        const eventRole = process.env.EVENT_PING_ROLE_ID || "1536149679874510948";
        await postChannelMessage(process.env.EVENTS_CHANNEL_ID, {
          content: `<@&${eventRole}>`,
          allowed_mentions: { roles: [eventRole] },
          embeds: [
            {
              color: 0x771bff,
              title: type,
              description: delayMs === 0 ? `**Happening Now**\n<t:${unix}:F>` : `Starts <t:${unix}:F>\nCountdown: <t:${unix}:R>`,
              footer: { text: `ID ${id}` }
            }
          ]
        });
        return ephemeral(`Event **#${id}** (${type}) scheduled and added to the website.`);
      }

      if (sub === "delete") {
        const id = String(option(interaction, "id") || "").replace(/^#/, "");
        const events = await loadEvents();
        const found = events.find((item) => item.id === id);
        if (!found) return ephemeral(`No event with ID **${id}**.`);
        await deleteChannelMessage(process.env.EVENTS_CHANNEL_ID, found.discordMessageId);
        return ephemeral(`Deleted event **#${id}**.`);
      }

      if (sub === "list") {
        const events = await loadEvents();
        if (!events.length) return ephemeral("No events scheduled.");
        return ephemeral(
          events
            .map((event) => {
              const unix = Math.floor(event.startAt / 1000);
              return `**#${event.id}** — ${event.type} · <t:${unix}:F>`;
            })
            .join("\n")
        );
      }
    }

    return ephemeral("Unknown command.");
  } catch (error) {
    console.error(error);
    const detail = String(error.message || error).slice(0, 300);
    return ephemeral(`Command failed: ${detail}`);
  }
};
