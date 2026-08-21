const fs = require("fs");
const path = require("path");
const express = require("express");
const cors = require("cors");
const {
  Client,
  GatewayIntentBits,
  REST,
  Routes,
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
  MessageFlags
} = require("discord.js");

require("dotenv").config({ path: path.join(__dirname, ".env") });

const DATA_PATH = path.join(__dirname, "data", "db.json");
const PORT = Number(process.env.PORT) || 3000;
const EVENT_TTL_MS = 24 * 60 * 60 * 1000;

function loadDb() {
  const raw = fs.readFileSync(DATA_PATH, "utf8");
  const db = JSON.parse(raw);
  db.updates ||= [];
  db.events ||= [];
  db.nextUpdateId ||= 1;
  db.nextEventId ||= 1;
  return db;
}

function saveDb(db) {
  const tmp = DATA_PATH + ".tmp";
  fs.writeFileSync(tmp, JSON.stringify(db, null, 2));
  fs.renameSync(tmp, DATA_PATH);
}

function pruneEvents(db) {
  const cutoff = Date.now();
  const before = db.events.length;
  db.events = db.events.filter((event) => cutoff < event.startAt + EVENT_TTL_MS);
  if (db.events.length !== before) saveDb(db);
  return db;
}

function publicUpdates(db) {
  return [...db.updates].sort((a, b) => b.createdAt - a.createdAt).map((item) => ({
    id: item.id,
    message: item.message,
    createdAt: item.createdAt
  }));
}

function publicEvents(db) {
  pruneEvents(db);
  return [...db.events]
    .sort((a, b) => a.startAt - b.startAt)
    .map((event) => ({
      id: event.id,
      type: event.type,
      startAt: event.startAt
    }));
}

function isAdmin(interaction) {
  if (interaction.memberPermissions?.has(PermissionFlagsBits.Administrator)) return true;
  const roleId = process.env.ADMIN_ROLE_ID;
  if (roleId && interaction.member?.roles?.cache?.has(roleId)) return true;
  return false;
}

const commands = [
  new SlashCommandBuilder()
    .setName("update")
    .setDescription("Post or remove an update log")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand((sub) =>
      sub
        .setName("add")
        .setDescription("Post an update to Discord and the website")
        .addStringOption((opt) =>
          opt.setName("message").setDescription("Update text").setRequired(true).setMaxLength(1000)
        )
    )
    .addSubcommand((sub) =>
      sub
        .setName("delete")
        .setDescription("Delete an update log")
        .addStringOption((opt) => opt.setName("id").setDescription("Update ID").setRequired(true))
    )
    .addSubcommand((sub) => sub.setName("list").setDescription("List update IDs")),
  new SlashCommandBuilder()
    .setName("event")
    .setDescription("Schedule or remove an event")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand((sub) =>
      sub
        .setName("add")
        .setDescription("Schedule an event on Discord and the website")
        .addStringOption((opt) =>
          opt
            .setName("type")
            .setDescription("Event type")
            .setRequired(true)
            .addChoices(
              { name: "Team duel", value: "Team duel" },
              { name: "FFA", value: "FFA" },
              { name: "Tournament", value: "Tournament" }
            )
        )
        .addIntegerOption((opt) =>
          opt.setName("days").setDescription("Days until it starts").setMinValue(0).setMaxValue(365)
        )
        .addIntegerOption((opt) =>
          opt.setName("hours").setDescription("Hours until it starts").setMinValue(0).setMaxValue(999)
        )
        .addIntegerOption((opt) =>
          opt.setName("minutes").setDescription("Mins until it starts").setMinValue(0).setMaxValue(59)
        )
    )
    .addSubcommand((sub) =>
      sub
        .setName("delete")
        .setDescription("Delete an event")
        .addStringOption((opt) => opt.setName("id").setDescription("Event ID").setRequired(true))
    )
    .addSubcommand((sub) => sub.setName("list").setDescription("List event IDs"))
].map((command) => command.toJSON());

async function registerCommands() {
  const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);
  await rest.put(
    Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID, process.env.DISCORD_GUILD_ID),
    { body: commands }
  );
}

async function postToChannel(client, channelId, payload) {
  if (!channelId) return null;
  const channel = await client.channels.fetch(channelId);
  const message = await channel.send(payload);
  return message.id;
}

async function deleteDiscordMessage(client, channelId, messageId) {
  if (!channelId || !messageId) return;
  try {
    const channel = await client.channels.fetch(channelId);
    const message = await channel.messages.fetch(messageId);
    await message.delete();
  } catch {
    /* already gone or missing permissions */
  }
}

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once("ready", () => {
  console.log(`Discord bot online as ${client.user.tag}`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (!isAdmin(interaction)) {
    await interaction.reply({
      content: "Only admins can use this command.",
      flags: MessageFlags.Ephemeral
    });
    return;
  }

  const db = pruneEvents(loadDb());

  try {
    if (interaction.commandName === "update") {
      const sub = interaction.options.getSubcommand();

      if (sub === "add") {
        const message = interaction.options.getString("message", true);
        const id = String(db.nextUpdateId++);
        const createdAt = Date.now();
        const embed = new EmbedBuilder()
          .setColor(0x0ebaff)
          .setTitle("Drift PVP Update")
          .setDescription(message)
          .setFooter({ text: `ID ${id}` })
          .setTimestamp(createdAt);
        const updateRole = process.env.UPDATE_PING_ROLE_ID || "1536149945856426057";
        const discordMessageId = await postToChannel(client, process.env.UPDATES_CHANNEL_ID, {
          content: `<@&${updateRole}>`,
          allowedMentions: { roles: [updateRole] },
          embeds: [embed]
        });
        db.updates.push({
          id,
          message,
          createdAt,
          authorId: interaction.user.id,
          discordMessageId
        });
        saveDb(db);
        await interaction.reply({
          content: `Update **#${id}** posted to the channel and the website.`,
          flags: MessageFlags.Ephemeral
        });
        return;
      }

      if (sub === "delete") {
        const id = interaction.options.getString("id", true).replace(/^#/, "");
        const index = db.updates.findIndex((item) => item.id === id);
        if (index === -1) {
          await interaction.reply({ content: `No update with ID **${id}**.`, flags: MessageFlags.Ephemeral });
          return;
        }
        const [removed] = db.updates.splice(index, 1);
        saveDb(db);
        await deleteDiscordMessage(client, process.env.UPDATES_CHANNEL_ID, removed.discordMessageId);
        await interaction.reply({
          content: `Deleted update **#${id}**.`,
          flags: MessageFlags.Ephemeral
        });
        return;
      }

      if (sub === "list") {
        if (!db.updates.length) {
          await interaction.reply({ content: "No updates yet.", flags: MessageFlags.Ephemeral });
          return;
        }
        const lines = publicUpdates(db)
          .slice(0, 15)
          .map((item) => `**#${item.id}** — ${item.message.slice(0, 80)}`);
        await interaction.reply({ content: lines.join("\n"), flags: MessageFlags.Ephemeral });
      }
    }

    if (interaction.commandName === "event") {
      const sub = interaction.options.getSubcommand();

      if (sub === "add") {
        const type = interaction.options.getString("type", true);
        const days = interaction.options.getInteger("days") || 0;
        const hours = interaction.options.getInteger("hours") || 0;
        const minutes = interaction.options.getInteger("minutes") || 0;
        const delayMs = ((days * 24 + hours) * 60 + minutes) * 60 * 1000;
        const startAt = Date.now() + delayMs;
        const id = String(db.nextEventId++);
        const unix = Math.floor(startAt / 1000);
        const embed = new EmbedBuilder()
          .setColor(0x771bff)
          .setTitle(type)
          .setDescription(
            delayMs === 0
              ? "**Happening Now**"
              : `Starts <t:${unix}:F>\nCountdown: <t:${unix}:R>`
          )
          .setFooter({ text: `ID ${id}` });
        const eventRole = process.env.EVENT_PING_ROLE_ID || "1536149679874510948";
        const discordMessageId = await postToChannel(client, process.env.EVENTS_CHANNEL_ID, {
          content: `<@&${eventRole}>`,
          allowedMentions: { roles: [eventRole] },
          embeds: [embed]
        });
        db.events.push({
          id,
          type,
          startAt,
          createdAt: Date.now(),
          authorId: interaction.user.id,
          discordMessageId
        });
        saveDb(db);
        await interaction.reply({
          content: `Event **#${id}** (${type}) scheduled and added to the website.`,
          flags: MessageFlags.Ephemeral
        });
        return;
      }

      if (sub === "delete") {
        const id = interaction.options.getString("id", true).replace(/^#/, "");
        const index = db.events.findIndex((item) => item.id === id);
        if (index === -1) {
          await interaction.reply({ content: `No event with ID **${id}**.`, flags: MessageFlags.Ephemeral });
          return;
        }
        const [removed] = db.events.splice(index, 1);
        saveDb(db);
        await deleteDiscordMessage(client, process.env.EVENTS_CHANNEL_ID, removed.discordMessageId);
        await interaction.reply({
          content: `Deleted event **#${id}**.`,
          flags: MessageFlags.Ephemeral
        });
        return;
      }

      if (sub === "list") {
        pruneEvents(db);
        if (!db.events.length) {
          await interaction.reply({ content: "No events scheduled.", flags: MessageFlags.Ephemeral });
          return;
        }
        const lines = publicEvents(db).map((event) => {
          const unix = Math.floor(event.startAt / 1000);
          return `**#${event.id}** — ${event.type} · <t:${unix}:F>`;
        });
        await interaction.reply({ content: lines.join("\n"), flags: MessageFlags.Ephemeral });
      }
    }
  } catch (error) {
    console.error(error);
    const text = "Something went wrong running that command.";
    if (interaction.deferred || interaction.replied) {
      await interaction.followUp({ content: text, flags: MessageFlags.Ephemeral });
    } else {
      await interaction.reply({ content: text, flags: MessageFlags.Ephemeral });
    }
  }
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname, { extensions: ["html"] }));

app.get("/api/updates", (_req, res) => {
  res.json({ updates: publicUpdates(loadDb()) });
});

app.get("/api/events", (_req, res) => {
  res.json({ events: publicEvents(loadDb()) });
});

setInterval(() => {
  try {
    pruneEvents(loadDb());
  } catch (error) {
    console.error("Event cleanup failed:", error);
  }
}, 30 * 1000);

async function start() {
  if (!process.env.DISCORD_TOKEN || !process.env.DISCORD_CLIENT_ID || !process.env.DISCORD_GUILD_ID) {
    console.error("Missing DISCORD_TOKEN, DISCORD_CLIENT_ID, or DISCORD_GUILD_ID in .env");
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`Website + API running at http://localhost:${PORT}`);
  });

  await registerCommands();
  console.log("Slash commands registered.");
  await client.login(process.env.DISCORD_TOKEN);
}

start().catch((error) => {
  console.error(error);
  process.exit(1);
});
