const API = "https://discord.com/api/v10";
const ADMIN = 8n;

function json(statusCode, body) {
  return {
    statusCode,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  };
}

function ephemeral(content) {
  return json(200, {
    type: 4,
    data: {
      content,
      flags: 64
    }
  });
}

function isAdmin(interaction) {
  try {
    const perms = BigInt(interaction.member?.permissions || "0");
    if ((perms & ADMIN) === ADMIN) return true;
  } catch {
    /* ignore */
  }
  const roleId = process.env.ADMIN_ROLE_ID;
  if (roleId && Array.isArray(interaction.member?.roles) && interaction.member.roles.includes(roleId)) {
    return true;
  }
  return false;
}

async function discordFetch(path, options = {}) {
  const res = await fetch(`${API}${path}`, {
    ...options,
    headers: {
      Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
      "Content-Type": "application/json",
      ...(options.headers || {})
    }
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Discord ${res.status}: ${text}`);
  }
  if (res.status === 204) return null;
  return res.json();
}

async function postChannelMessage(channelId, payload) {
  if (!channelId) throw new Error("Missing channel ID");
  const message = await discordFetch(`/channels/${channelId}/messages`, {
    method: "POST",
    body: JSON.stringify(payload)
  });
  return message;
}

async function deleteChannelMessage(channelId, messageId) {
  if (!channelId || !messageId) return;
  try {
    await discordFetch(`/channels/${channelId}/messages/${messageId}`, { method: "DELETE" });
  } catch {
    /* already gone */
  }
}

async function listChannelMessages(channelId, max = 300) {
  if (!channelId) return [];
  const all = [];
  let before;
  while (all.length < max) {
    const remaining = Math.min(100, max - all.length);
    const query = before
      ? `?limit=${remaining}&before=${before}`
      : `?limit=${remaining}`;
    const batch = await discordFetch(`/channels/${channelId}/messages${query}`);
    if (!Array.isArray(batch) || !batch.length) break;
    all.push(...batch);
    before = batch[batch.length - 1].id;
    if (batch.length < remaining) break;
  }
  return all;
}

async function patchChannelMessage(channelId, messageId, payload) {
  if (!channelId || !messageId) return null;
  return discordFetch(`/channels/${channelId}/messages/${messageId}`, {
    method: "PATCH",
    body: JSON.stringify(payload)
  });
}

async function getChannelMessage(channelId, messageId) {
  if (!channelId || !messageId) return null;
  return discordFetch(`/channels/${channelId}/messages/${messageId}`);
}

async function listGuildChannels(guildId) {
  if (!guildId) return [];
  const channels = await discordFetch(`/guilds/${guildId}/channels`);
  return Array.isArray(channels) ? channels : [];
}

async function addGuildRole(guildId, userId, roleId) {
  if (!guildId || !userId || !roleId) return;
  await discordFetch(`/guilds/${guildId}/members/${userId}/roles/${roleId}`, { method: "PUT" });
}

async function removeGuildRole(guildId, userId, roleId) {
  if (!guildId || !userId || !roleId) return;
  await discordFetch(`/guilds/${guildId}/members/${userId}/roles/${roleId}`, { method: "DELETE" });
}

function option(interaction, name) {
  const opts = interaction.data?.options || [];
  const nested = opts[0]?.type === 1 ? opts[0].options || [] : opts;
  const found = nested.find((item) => item.name === name);
  return found?.value;
}

function subcommand(interaction) {
  const first = interaction.data?.options?.[0];
  return first?.type === 1 ? first.name : null;
}

module.exports = {
  json,
  ephemeral,
  isAdmin,
  postChannelMessage,
  deleteChannelMessage,
  listChannelMessages,
  patchChannelMessage,
  getChannelMessage,
  listGuildChannels,
  addGuildRole,
  removeGuildRole,
  option,
  subcommand
};
