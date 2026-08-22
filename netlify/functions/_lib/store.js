const { getStore, connectLambda } = require("@netlify/blobs");
const { listChannelMessages, deleteChannelMessage } = require("./discord");

const EVENT_TTL_MS = 24 * 60 * 60 * 1000;
const EVENT_TYPES = new Set(["Team duel", "FFA", "Tournament"]);
const REGISTRY_TITLE = "Drift PVP Registry";
const WEBSITE_CODE = "megadrifty321";
const STORE_NAME = "drift-pvp";
const STORE_KEY = "guilds";
const SITE_ID = process.env.NETLIFY_SITE_ID || "3886acc1-881f-468d-a2fc-bd91fb80ebcf";
const BOT_ID = () => process.env.DISCORD_CLIENT_ID;

const EMPTY_CONFIG = {
  updates: null,
  events: null,
  adminUpdates: null,
  updatePing: null,
  eventPing: null,
  verified: false
};

let lambdaBound = false;
let cleanupStarted = false;

function bindStore(event) {
  if (lambdaBound || !event) return;
  try {
    if (event.blobs) {
      connectLambda(event);
      lambdaBound = true;
    }
  } catch (error) {
    console.error("blobs connect failed", error);
  }
}

function blobsStore() {
  const token = process.env.NETLIFY_BLOBS_TOKEN || process.env.NETLIFY_AUTH_TOKEN;
  if (token) {
    return getStore({
      name: STORE_NAME,
      siteID: SITE_ID,
      token,
      consistency: "strong"
    });
  }
  return getStore({ name: STORE_NAME, consistency: "strong" });
}

function isPresent(value) {
  return value !== undefined && value !== null && value !== "";
}

function mergeDefined(base, overlay) {
  const next = { ...base };
  for (const [key, value] of Object.entries(overlay || {})) {
    if (!isPresent(value) && value !== false) continue;
    next[key] = value;
  }
  return next;
}

function envSeed() {
  const guildId = process.env.DISCORD_GUILD_ID;
  if (!guildId) return {};
  return {
    [guildId]: mergeDefined({ ...EMPTY_CONFIG }, {
      updates: process.env.UPDATES_CHANNEL_ID,
      events: process.env.EVENTS_CHANNEL_ID,
      adminUpdates: process.env.ADMIN_UPDATES_CHANNEL_ID,
      updatePing: process.env.UPDATE_PING_ROLE_ID,
      eventPing: process.env.EVENT_PING_ROLE_ID,
      verified: false
    })
  };
}

function mergeGuildMaps(base, overlay) {
  const guilds = { ...base };
  for (const [guildId, cfg] of Object.entries(overlay || {})) {
    guilds[guildId] = mergeDefined(guilds[guildId] || { ...EMPTY_CONFIG }, cfg);
  }
  return guilds;
}

function parseRegistryEmbed(embed) {
  try {
    const raw = String(embed?.description || "")
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
    const guilds = JSON.parse(raw);
    return guilds && typeof guilds === "object" ? guilds : {};
  } catch {
    return {};
  }
}

async function findRegistryInChannel(channelId) {
  if (!channelId) return null;
  const messages = await listChannelMessages(channelId);
  return (messages || []).filter(
    (msg) => msg.author?.id === BOT_ID() && msg.embeds?.[0]?.title === REGISTRY_TITLE
  );
}

async function deleteRegistriesInChannel(channelId) {
  const matches = await findRegistryInChannel(channelId);
  if (!matches?.length) return [];
  await Promise.all(matches.map((msg) => deleteChannelMessage(channelId, msg.id)));
  return matches;
}

function knownChannels(guilds) {
  const ids = new Set(
    [
      process.env.ADMIN_UPDATES_CHANNEL_ID,
      process.env.UPDATES_CHANNEL_ID,
      process.env.EVENTS_CHANNEL_ID
    ].filter(Boolean)
  );
  for (const cfg of Object.values(guilds || {})) {
    if (cfg.updates) ids.add(cfg.updates);
    if (cfg.events) ids.add(cfg.events);
    if (cfg.adminUpdates) ids.add(cfg.adminUpdates);
  }
  return [...ids];
}

async function importLegacyRegistry(guilds) {
  let imported = {};
  const channels = knownChannels(guilds);
  for (const channelId of channels) {
    let matches = [];
    try {
      matches = await findRegistryInChannel(channelId);
    } catch (error) {
      console.error("registry scan failed", channelId, error);
      continue;
    }
    for (const msg of matches || []) {
      imported = mergeGuildMaps(imported, parseRegistryEmbed(msg.embeds[0]));
      await deleteChannelMessage(channelId, msg.id);
    }
  }
  return imported;
}

async function readStored() {
  try {
    const stored = await blobsStore().get(STORE_KEY, { type: "json", consistency: "strong" });
    if (stored && typeof stored === "object") {
      if (stored.guilds && typeof stored.guilds === "object") return stored;
      return { guilds: stored, legacyCleaned: false };
    }
  } catch (error) {
    console.error("blob read failed", error);
  }
  return { guilds: {}, legacyCleaned: false };
}

async function writeStored(payload) {
  await blobsStore().setJSON(STORE_KEY, payload);
}

async function readGuilds() {
  const stored = await readStored();
  let guilds = mergeGuildMaps(envSeed(), stored.guilds);
  if (!stored.legacyCleaned && !cleanupStarted) {
    cleanupStarted = true;
    try {
      const imported = await importLegacyRegistry(guilds);
      guilds = mergeGuildMaps(guilds, imported);
      await writeStored({ guilds, legacyCleaned: true });
    } catch (error) {
      console.error("legacy registry cleanup failed", error);
    }
  }
  return guilds;
}

function isEventEmbed(embed) {
  return Boolean(embed && EVENT_TYPES.has(embed.title));
}

function footerId(embed) {
  const text = embed?.footer?.text || "";
  const match = text.match(/ID\s+(\d+)/i);
  return match ? match[1] : null;
}

function isBotUpdate(msg) {
  const embed = msg.embeds?.[0];
  return (
    msg.author?.id === BOT_ID() &&
    embed?.title === "Drift PVP Update" &&
    Boolean(embed.description) &&
    Boolean(footerId(embed))
  );
}

function isBotEvent(msg) {
  const embed = msg.embeds?.[0];
  return (
    msg.author?.id === BOT_ID() &&
    isEventEmbed(embed) &&
    Boolean(footerId(embed)) &&
    /<t:\d+:/.test(embed.description || "")
  );
}

function parseUpdates(messages) {
  return (messages || [])
    .filter(isBotUpdate)
    .map((msg) => {
      const embed = msg.embeds[0];
      return {
        id: footerId(embed),
        message: embed.description,
        createdAt: Date.parse(msg.timestamp) || Date.now(),
        discordMessageId: msg.id
      };
    })
    .sort((a, b) => b.createdAt - a.createdAt);
}

function parseStartAt(embed) {
  const description = embed?.description || "";
  const stamp = description.match(/<t:(\d+):/);
  if (stamp) return Number(stamp[1]) * 1000;
  return Date.parse(embed.timestamp) || Date.now();
}

function parseEvents(messages) {
  const now = Date.now();
  return (messages || [])
    .filter(isBotEvent)
    .map((msg) => {
      const embed = msg.embeds[0];
      return {
        id: footerId(embed),
        type: embed.title || "Event",
        startAt: parseStartAt(embed),
        discordMessageId: msg.id
      };
    })
    .filter((event) => now < event.startAt + EVENT_TTL_MS)
    .sort((a, b) => a.startAt - b.startAt);
}

async function nextId(items) {
  const nums = items.map((item) => Number(item.id)).filter((value) => Number.isFinite(value));
  return String((nums.length ? Math.max(...nums) : 0) + 1);
}

async function getGuildConfig(guildId) {
  if (!guildId) return null;
  const guilds = await readGuilds();
  return guilds[guildId] || null;
}

async function setGuildConfig(guildId, patch) {
  const stored = await readStored();
  let guilds = mergeGuildMaps(envSeed(), stored.guilds);
  if (!stored.legacyCleaned) {
    try {
      const imported = await importLegacyRegistry(guilds);
      guilds = mergeGuildMaps(guilds, imported);
    } catch (error) {
      console.error("legacy registry cleanup failed", error);
    }
  }
  const current = guilds[guildId] || { ...EMPTY_CONFIG };
  guilds[guildId] = mergeDefined(current, patch);
  await writeStored({ guilds, legacyCleaned: true });
  return guilds[guildId];
}

function verifiedChannels(guilds, key) {
  return Object.values(guilds || {})
    .filter((guild) => guild.verified && guild[key])
    .map((guild) => guild[key]);
}

async function loadUpdates(guildId) {
  if (guildId) {
    const cfg = await getGuildConfig(guildId);
    if (!cfg?.updates) return [];
    return parseUpdates(await listChannelMessages(cfg.updates));
  }
  const guilds = await readGuilds();
  const channels = verifiedChannels(guilds, "updates");
  const lists = await Promise.all(channels.map((id) => listChannelMessages(id).then(parseUpdates)));
  return lists.flat().sort((a, b) => b.createdAt - a.createdAt);
}

async function loadEvents(guildId) {
  const loadFrom = async (channelId) => {
    const messages = await listChannelMessages(channelId);
    const events = parseEvents(messages);
    const expired = (messages || []).filter((msg) => {
      const embed = msg.embeds?.[0];
      if (!isEventEmbed(embed)) return false;
      return Date.now() >= parseStartAt(embed) + EVENT_TTL_MS;
    });
    await Promise.all(expired.map((msg) => deleteChannelMessage(channelId, msg.id)));
    return events;
  };

  if (guildId) {
    const cfg = await getGuildConfig(guildId);
    if (!cfg?.events) return [];
    return loadFrom(cfg.events);
  }

  const guilds = await readGuilds();
  const channels = verifiedChannels(guilds, "events");
  const lists = await Promise.all(channels.map((id) => loadFrom(id)));
  return lists.flat().sort((a, b) => a.startAt - b.startAt);
}

module.exports = {
  EVENT_TTL_MS,
  WEBSITE_CODE,
  bindStore,
  nextId,
  getGuildConfig,
  setGuildConfig,
  loadUpdates,
  loadEvents,
  deleteRegistriesInChannel
};
