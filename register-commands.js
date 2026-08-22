const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const ADMIN = "8";
const HEX = {
  type: 3,
  name: "hex",
  description: "Embed color hex, like #0ebaff",
  required: false,
  max_length: 7
};

const commands = [
  {
    name: "setup",
    description: "Set this server's updates and events channels",
    default_member_permissions: ADMIN,
    options: [
      {
        type: 7,
        name: "updates",
        description: "Channel for update logs",
        required: true,
        channel_types: [0, 5]
      },
      {
        type: 7,
        name: "events",
        description: "Channel for events",
        required: true,
        channel_types: [0, 5]
      },
      {
        type: 8,
        name: "update_ping",
        description: "Role to ping for updates",
        required: true
      },
      {
        type: 8,
        name: "events_ping",
        description: "Role to ping for events",
        required: true
      },
      {
        type: 7,
        name: "admin_updates",
        description: "Channel for setup and bot notifications",
        required: true,
        channel_types: [0, 5]
      }
    ]
  },
  {
    name: "driftcode",
    description: "Enter the website code so this server can show on driftpvp.com",
    default_member_permissions: ADMIN,
    options: [
      {
        type: 3,
        name: "code",
        description: "Website code",
        required: true
      }
    ]
  },
  {
    name: "update",
    description: "Post or remove an update log",
    default_member_permissions: ADMIN,
    options: [
      {
        type: 1,
        name: "add",
        description: "Post an update (opens a box that keeps line breaks)",
        options: [HEX]
      },
      {
        type: 1,
        name: "delete",
        description: "Delete an update log",
        options: [{ type: 3, name: "id", description: "Update ID", required: true }]
      },
      { type: 1, name: "list", description: "List update IDs" }
    ]
  },
  {
    name: "event",
    description: "Schedule or remove an event",
    default_member_permissions: ADMIN,
    options: [
      {
        type: 1,
        name: "add",
        description: "Schedule an event",
        options: [
          {
            type: 3,
            name: "type",
            description: "Event type",
            required: true,
            choices: [
              { name: "Team duel", value: "Team duel" },
              { name: "FFA", value: "FFA" },
              { name: "Tournament", value: "Tournament" }
            ]
          },
          { type: 4, name: "days", description: "Days until it starts", min_value: 0, max_value: 365 },
          { type: 4, name: "hours", description: "Hours until it starts", min_value: 0, max_value: 999 },
          { type: 4, name: "minutes", description: "Mins until it starts", min_value: 0, max_value: 59 },
          HEX
        ]
      },
      {
        type: 1,
        name: "delete",
        description: "Delete an event",
        options: [{ type: 3, name: "id", description: "Event ID", required: true }]
      },
      { type: 1, name: "list", description: "List event IDs" }
    ]
  },
  {
    name: "send",
    description: "Send a message in a channel you choose",
    default_member_permissions: ADMIN,
    options: [
      {
        type: 7,
        name: "channel",
        description: "Channel to send the message in",
        required: true,
        channel_types: [0, 5]
      },
      {
        type: 5,
        name: "embed",
        description: "Send as a custom embed (opens a box that keeps line breaks)",
        required: false
      },
      {
        type: 3,
        name: "color",
        description: "Preset embed color",
        required: false,
        choices: [
          { name: "Cyan", value: "cyan" },
          { name: "Purple", value: "purple" }
        ]
      },
      HEX
    ]
  }
];

async function putCommands(url, token) {
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bot ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(commands)
  });
  const body = await res.text();
  if (!res.ok) throw new Error(`${res.status} ${body}`);
}

async function main() {
  const id = process.env.DISCORD_CLIENT_ID;
  const guild = process.env.DISCORD_GUILD_ID;
  const token = process.env.DISCORD_TOKEN;
  if (guild) {
    const clear = await fetch(`https://discord.com/api/v10/applications/${id}/guilds/${guild}/commands`, {
      method: "PUT",
      headers: {
        Authorization: `Bot ${token}`,
        "Content-Type": "application/json"
      },
      body: "[]"
    });
    if (!clear.ok) throw new Error(`clear guild commands ${clear.status} ${await clear.text()}`);
    console.log("Removed duplicate guild commands.");
  }
  await putCommands(`https://discord.com/api/v10/applications/${id}/commands`, token);
  console.log("Global slash commands registered.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
