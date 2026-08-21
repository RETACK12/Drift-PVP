const { listChannelMessages, deleteChannelMessage } = require("./discord");

const EVENT_TTL_MS = 24 * 60 * 60 * 1000;
const EVENT_TYPES = new Set(["Team duel", "FFA", "Tournament"]);
const BOT_ID = () => process.env.DISCORD_CLIENT_ID;

function isEventEmbed(embed) {
  return Boolean(embed && EVENT_TYPES.has(embed.title));
}

function footerId(embed) {
  const text = embed?.footer?.text || "";
  const match = text.match(/ID\s+(\d+)/i);
  return match ? match[1] : null;
}

function parseUpdates(messages) {
  const botId = BOT_ID();
  return (messages || [])
    .filter((msg) => msg.author?.id === botId && msg.embeds?.[0]?.title === "Drift PVP Update")
    .map((msg) => {
      const embed = msg.embeds[0];
      return {
        id: footerId(embed) || msg.id,
        message: embed.description || msg.content || "",
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
  const botId = BOT_ID();
  const now = Date.now();
  return (messages || [])
    .filter((msg) => {
      const embed = msg.embeds?.[0];
      if (msg.author?.id !== botId || !embed) return false;
      return isEventEmbed(embed);
    })
    .map((msg) => {
      const embed = msg.embeds[0];
      return {
        id: footerId(embed) || msg.id,
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

async function loadUpdates() {
  const messages = await listChannelMessages(process.env.UPDATES_CHANNEL_ID);
  return parseUpdates(messages);
}

async function loadEvents() {
  const messages = await listChannelMessages(process.env.EVENTS_CHANNEL_ID);
  const events = parseEvents(messages);
  const expired = (messages || []).filter((msg) => {
    const embed = msg.embeds?.[0];
    if (!isEventEmbed(embed)) return false;
    const startAt = parseStartAt(embed);
    return Date.now() >= startAt + EVENT_TTL_MS;
  });
  await Promise.all(
    expired.map((msg) => deleteChannelMessage(process.env.EVENTS_CHANNEL_ID, msg.id))
  );
  return events;
}

module.exports = {
  EVENT_TTL_MS,
  nextId,
  loadUpdates,
  loadEvents
};
