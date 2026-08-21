const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const ADMIN = "8";

const commands = [
  {
    name: "update",
    description: "Post or remove an update log",
    default_member_permissions: ADMIN,
    options: [
      {
        type: 1,
        name: "add",
        description: "Post an update to Discord and the website (opens a box that keeps line breaks)"
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
        description: "Schedule an event on Discord and the website",
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
          { type: 4, name: "minutes", description: "Mins until it starts", min_value: 0, max_value: 59 }
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
        description: "Embed color (only used if embed is true)",
        required: false,
        choices: [
          { name: "Cyan", value: "cyan" },
          { name: "Purple", value: "purple" }
        ]
      }
    ]
  }
];

async function main() {
  const id = process.env.DISCORD_CLIENT_ID;
  const guild = process.env.DISCORD_GUILD_ID;
  const token = process.env.DISCORD_TOKEN;
  const url = `https://discord.com/api/v10/applications/${id}/guilds/${guild}/commands`;
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bot ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(commands)
  });
  const body = await res.text();
  if (!res.ok) {
    console.error(res.status, body);
    process.exit(1);
  }
  console.log("Slash commands registered.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
