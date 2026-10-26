const { verifyKey } = require("discord-interactions");
const { loadUpdates, loadEvents, nextId, getGuildConfig, setGuildConfig, bindStore, WEBSITE_CODE } = require("./_lib/store");
const {
  json,
  ephemeral,
  isAdmin,
  postChannelMessage,
  deleteChannelMessage,
  patchChannelMessage,
  getChannelMessage,
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

function parseHexColor(value, fallback = 0x0ebaff) {
  if (value == null || value === "") return fallback;
  const named = { cyan: 0x0ebaff, purple: 0x771bff };
  const lower = String(value).trim().toLowerCase();
  if (named[lower] != null) return named[lower];
  const hex = lower.replace(/^#/, "");
  if (/^[0-9a-f]{6}$/.test(hex)) return parseInt(hex, 16);
  return null;
}

function hexString(color) {
  return color.toString(16).padStart(6, "0");
}

function pingFromConfig(cfg, kind) {
  if (kind === "update") return cfg?.updatePing || null;
  return cfg?.eventPing || null;
}

async function notifyAdmin(guildId, text) {
  const cfg = await getGuildConfig(guildId);
  if (!cfg?.adminUpdates) return;
  try {
    await postChannelMessage(cfg.adminUpdates, {
      embeds: [
        {
          color: 0x0ebaff,
          title: "Drift PVP",
          description: text
        }
      ]
    });
  } catch (error) {
    console.error("admin notify failed", error);
  }
}

function modalValue(interaction, id) {
  for (const row of interaction.data?.components || []) {
    for (const field of row.components || []) {
      if (field.custom_id === id) return field.value || "";
    }
  }
  return "";
}

function sendModal(channelId, useEmbed, color) {
  const customId = `send:${channelId}:${useEmbed ? "1" : "0"}:${hexString(color)}`;
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

function textInput(customId, label, style, maxLength, required, value, placeholder) {
  const field = {
    type: 4,
    custom_id: customId,
    style,
    label,
    required,
    max_length: maxLength
  };
  if (placeholder) field.placeholder = placeholder;
  if (value) field.value = String(value).slice(0, maxLength);
  return { type: 1, components: [field] };
}

function updateModal(guildId, color) {
  return json(200, {
    type: 9,
    data: {
      custom_id: `update:add:${hexString(color)}:${guildId || ""}`.slice(0, 100),
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

async function postUpdateLog(message, guildId, color) {
  const cfg = await getGuildConfig(guildId);
  if (!cfg?.updates) throw new Error("Run /setup first to set the updates channel.");
  const updates = await loadUpdates(guildId);
  const id = await nextId(updates);
  const createdAt = Date.now();
  const updateRole = pingFromConfig(cfg, "update");
  const payload = {
    embeds: [
      {
        color: color ?? 0x0ebaff,
        title: "Drift PVP Update",
        description: message,
        footer: { text: `ID ${id}` },
        timestamp: new Date(createdAt).toISOString()
      }
    ]
  };
  if (updateRole) {
    payload.content = `<@&${updateRole}>`;
    payload.allowed_mentions = { roles: [updateRole] };
  }
  await postChannelMessage(cfg.updates, payload);
  return { id, verified: Boolean(cfg.verified) };
}

async function handleSendModal(interaction) {
  const parts = String(interaction.data?.custom_id || "").split(":");
  const channelId = parts[1];
  const useEmbed = parts[2] === "1";
  const color = parseHexColor(parts[3], 0x0ebaff);
  const title = keepLines(modalValue(interaction, "title"));
  const message = keepLines(modalValue(interaction, "message"));
  if (!channelId || !message) return ephemeral("Channel and message are required.");
  if (useEmbed) {
    const embed = {
      color,
      description: message
    };
    if (title) embed.title = title;
    await postChannelMessage(channelId, { embeds: [embed] });
  } else {
    await postChannelMessage(channelId, { content: message });
  }
  return ephemeral("Message sent.");
}

function customEventModal(guildId, days, hours, minutes, color) {
  return json(200, {
    type: 9,
    data: {
      custom_id: `event:custom:${days}:${hours}:${minutes}:${hexString(color)}:${guildId}`.slice(0, 100),
      title: "Custom event",
      components: [
        textInput("name", "Event name", 1, 100, true),
        textInput("details", "Details", 2, 1000, false, "", "Any extra text. Line breaks stay.")
      ]
    }
  });
}

async function postScheduledEvent(guildId, type, details, days, hours, minutes, color) {
  const cfg = await getGuildConfig(guildId);
  if (!cfg?.events) throw new Error("Run /setup first to set the events channel.");
  const delayMs = ((days * 24 + hours) * 60 + minutes) * 60 * 1000;
  const startAt = Date.now() + delayMs;
  const events = await loadEvents(guildId);
  const id = await nextId(events);
  const unix = Math.floor(startAt / 1000);
  const when = delayMs === 0 ? `**Happening Now**\n<t:${unix}:F>` : `Starts <t:${unix}:F>\nCountdown: <t:${unix}:R>`;
  const description = details ? `${details}\n\n${when}` : when;
  const eventRole = pingFromConfig(cfg, "event");
  const payload = {
    embeds: [
      {
        color: color ?? 0x771bff,
        title: type,
        description,
        footer: { text: `ID ${id}` }
      }
    ]
  };
  if (eventRole) {
    payload.content = `<@&${eventRole}>`;
    payload.allowed_mentions = { roles: [eventRole] };
  }
  await postChannelMessage(cfg.events, payload);
  return { id, type, verified: Boolean(cfg.verified) };
}

async function findEditableMessage(guildId, messageId, channelHint) {
  const cfg = await getGuildConfig(guildId);
  const ordered = [];
  const push = (id) => {
    if (id && !ordered.includes(id)) ordered.push(id);
  };
  push(channelHint);
  push(cfg?.updates);
  push(cfg?.events);
  push(cfg?.adminUpdates);
  for (const channelId of ordered) {
    try {
      const message = await getChannelMessage(channelId, messageId);
      if (message?.id && message.author?.id === process.env.DISCORD_CLIENT_ID) {
        return { channelId, message };
      }
    } catch {
      /* not in this channel */
    }
  }
  return null;
}

function editModal(channelId, message) {
  const embed = message.embeds?.[0];
  const components = [
    textInput(
      "content",
      "Message",
      2,
      2000,
      !embed,
      message.content || "",
      embed ? "Ping or text above the embed. Leave blank to clear it." : "Message text. Line breaks stay."
    )
  ];
  if (embed) {
    components.push(textInput("title", "Embed title", 1, 256, false, embed.title || ""));
    components.push(
      textInput("description", "Embed text", 2, 4000, false, embed.description || "", "Keep the countdown lines if this is an event.")
    );
  }
  return json(200, {
    type: 9,
    data: {
      custom_id: `edit:${channelId}:${message.id}`.slice(0, 100),
      title: embed ? "Edit embed" : "Edit message",
      components
    }
  });
}

async function handleEditModal(interaction) {
  const parts = String(interaction.data?.custom_id || "").split(":");
  const channelId = parts[1];
  const messageId = parts[2];
  const current = await getChannelMessage(channelId, messageId);
  if (!current || current.author?.id !== process.env.DISCORD_CLIENT_ID) {
    return ephemeral("That message was not sent by the bot.");
  }
  const content = keepLines(modalValue(interaction, "content"));
  const title = keepLines(modalValue(interaction, "title"));
  const description = keepLines(modalValue(interaction, "description"));
  const hadEmbed = Boolean(current.embeds?.length);
  const payload = {};
  if (hadEmbed) {
    const prev = current.embeds[0];
    const embed = {};
    if (prev.color != null) embed.color = prev.color;
    if (prev.footer) embed.footer = prev.footer;
    if (prev.timestamp) embed.timestamp = prev.timestamp;
    if (title) embed.title = title;
    if (description) embed.description = description;
    if (!embed.title && !embed.description) return ephemeral("The embed needs a title or text.");
    payload.embeds = [embed];
    payload.content = content;
  } else {
    if (!content) return ephemeral("Message cannot be blank.");
    payload.content = content;
  }
  await patchChannelMessage(channelId, messageId, payload);
  return ephemeral("Message updated.");
}

async function handleCustomEventModal(interaction) {
  const parts = String(interaction.data?.custom_id || "").split(":");
  const days = Number(parts[2] || 0);
  const hours = Number(parts[3] || 0);
  const minutes = Number(parts[4] || 0);
  const color = parseHexColor(parts[5], 0x771bff);
  const guildId = parts[6] || interaction.guild_id;
  const name = keepLines(modalValue(interaction, "name")).slice(0, 100);
  const details = keepLines(modalValue(interaction, "details"));
  if (!name) return ephemeral("Event name is required.");
  const result = await postScheduledEvent(guildId, name, details, days, hours, minutes, color);
  return ephemeral(
    result.verified
      ? `Event **#${result.id}** (${result.type}) scheduled and added to the website.`
      : `Event **#${result.id}** (${result.type}) scheduled in Discord. Run /driftcode with the website code to show it on the site.`
  );
}

exports.handler = async (event) => {
  bindStore(event);
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
      if (customId.startsWith("edit:")) {
        return await handleEditModal(interaction);
      }
      if (customId.startsWith("event:custom:")) {
        return await handleCustomEventModal(interaction);
      }
      if (customId.startsWith("update:add")) {
        const parts = customId.split(":");
        const color = parseHexColor(parts[2], 0x0ebaff);
        const guildId = parts[3] || interaction.guild_id;
        const message = keepLines(modalValue(interaction, "message"));
        if (!message) return ephemeral("Message is required.");
        const result = await postUpdateLog(message, guildId, color);
        return ephemeral(
          result.verified
            ? `Update **#${result.id}** posted to the channel and the website.`
            : `Update **#${result.id}** posted in Discord. Run /driftcode with the website code to show it on the site.`
        );
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

    const guildId = interaction.guild_id;

    if (command === "setup") {
      const updates = option(interaction, "updates");
      const events = option(interaction, "events");
      const updatePing = option(interaction, "update_ping");
      const eventPing = option(interaction, "events_ping");
      const adminUpdates = option(interaction, "admin_updates");
      const boostPing = option(interaction, "boost_ping");
      const driftPlus = option(interaction, "drift_plus");
      if (!guildId) return ephemeral("Use this in a server.");
      if (!updates || !events || !updatePing || !eventPing || !adminUpdates || !boostPing || !driftPlus) {
        return ephemeral("Fill every setup field, including the boost ping role and the Drift+ role.");
      }
      const cfg = await setGuildConfig(guildId, {
        updates,
        events,
        updatePing,
        eventPing,
        adminUpdates,
        boostPing,
        driftPlus
      });
      const text = cfg.verified
        ? "Setup saved. Updates and events from this server can show on the website."
        : "Setup saved for this server. Run `/driftcode` with the website code to show posts on driftpvp.com.";
      await notifyAdmin(guildId, text);
      return ephemeral(text);
    }

    if (command === "driftcode") {
      if (!guildId) return ephemeral("Use this in a server.");
      const code = String(option(interaction, "code") || "");
      if (code !== WEBSITE_CODE) {
        await setGuildConfig(guildId, { verified: false });
        const text = "Wrong code. This server will not show on the website.";
        await notifyAdmin(guildId, text);
        return ephemeral(text);
      }
      const cfg = await setGuildConfig(guildId, { verified: true });
      const text =
        !cfg.updates || !cfg.events
          ? "Code accepted. Run `/setup` to set the updates and events channels so they can appear on the website."
          : "Code accepted. This server's updates and events can now show on the website.";
      await notifyAdmin(guildId, text);
      return ephemeral(text);
    }

    if (command === "send") {
      const channelId = option(interaction, "channel");
      const useEmbed = Boolean(option(interaction, "embed"));
      const color = parseHexColor(option(interaction, "hex") || option(interaction, "color"), 0x0ebaff);
      if (color == null) return ephemeral("Hex must look like `#0ebaff` or `0ebaff`.");
      if (!channelId) return ephemeral("Channel is required.");
      return sendModal(channelId, useEmbed, color);
    }

    if (command === "update") {
      if (sub === "add") {
        if (!guildId) return ephemeral("Use this in a server.");
        const cfg = await getGuildConfig(guildId);
        if (!cfg?.updates) return ephemeral("Run `/setup` first to set the updates channel.");
        const color = parseHexColor(option(interaction, "hex"), 0x0ebaff);
        if (color == null) return ephemeral("Hex must look like `#0ebaff` or `0ebaff`.");
        return updateModal(guildId, color);
      }

      if (sub === "delete") {
        const id = String(option(interaction, "id") || "").replace(/^#/, "");
        const updates = await loadUpdates(guildId);
        const found = updates.find((item) => item.id === id);
        if (!found) return ephemeral(`No update with ID **${id}**.`);
        const cfg = await getGuildConfig(guildId);
        await deleteChannelMessage(cfg?.updates, found.discordMessageId);
        return ephemeral(`Deleted update **#${id}**.`);
      }

      if (sub === "list") {
        const updates = await loadUpdates(guildId);
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
        if (!guildId) return ephemeral("Use this in a server.");
        const cfg = await getGuildConfig(guildId);
        if (!cfg?.events) return ephemeral("Run `/setup` first to set the events channel.");
        const type = option(interaction, "type");
        const days = Number(option(interaction, "days") || 0);
        const hours = Number(option(interaction, "hours") || 0);
        const minutes = Number(option(interaction, "minutes") || 0);
        const color = parseHexColor(option(interaction, "hex"), 0x771bff);
        if (color == null) return ephemeral("Hex must look like `#771bff` or `771bff`.");
        if (type === "Custom") return customEventModal(guildId, days, hours, minutes, color);
        const result = await postScheduledEvent(guildId, type, "", days, hours, minutes, color);
        return ephemeral(
          result.verified
            ? `Event **#${result.id}** (${result.type}) scheduled and added to the website.`
            : `Event **#${result.id}** (${result.type}) scheduled in Discord. Run /driftcode with the website code to show it on the site.`
        );
      }

      if (sub === "delete") {
        const id = String(option(interaction, "id") || "").replace(/^#/, "");
        const events = await loadEvents(guildId);
        const found = events.find((item) => item.id === id);
        if (!found) return ephemeral(`No event with ID **${id}**.`);
        const cfg = await getGuildConfig(guildId);
        await deleteChannelMessage(cfg?.events, found.discordMessageId);
        return ephemeral(`Deleted event **#${id}**.`);
      }

      if (sub === "list") {
        const events = await loadEvents(guildId);
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

    if (command === "edit") {
      if (!guildId) return ephemeral("Use this in a server.");
      const messageId = String(option(interaction, "message_id") || "").replace(/\D/g, "");
      if (!/^\d{17,22}$/.test(messageId)) return ephemeral("That is not a message ID.");
      const found = await findEditableMessage(guildId, messageId, option(interaction, "channel"));
      if (!found) {
        return ephemeral("No bot message with that ID in the update, event, or admin channel. Pick the channel too for a /send message.");
      }
      return editModal(found.channelId, found.message);
    }

    return ephemeral("Unknown command.");
  } catch (error) {
    console.error(error);
    const detail = String(error.message || error).slice(0, 300);
    return ephemeral(`Command failed: ${detail}`);
  }
};
