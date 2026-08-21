# Drift PVP

Website and Discord bot for [driftpvp.com](https://driftpvp.com).

## Live

- Site: https://driftpvp.com
- Netlify project: `driftpvp`
- Netlify site ID: `3886acc1-881f-468d-a2fc-bd91fb80ebcf`

## Setup

1. Install [Node.js LTS](https://nodejs.org).
2. Copy `.env.example` to `.env` and fill in Discord values.
3. Run `npm install`.

## Publish

```
npx netlify-cli login
npx netlify-cli link --id 3886acc1-881f-468d-a2fc-bd91fb80ebcf
npx netlify-cli deploy --dir=. --prod --site 3886acc1-881f-468d-a2fc-bd91fb80ebcf
```

If you change slash commands:

```
node register-commands.js
```

## Discord commands (admin only)

- `/update add` — popup box, keeps line breaks, posts and pings the update role
- `/update delete` / `/update list`
- `/event add` — Team duel, FFA, or Tournament
- `/event delete` / `/event list`
- `/send` — pick a channel, optional embed, popup box for the message
