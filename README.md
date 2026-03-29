# LetsMeet AI
AI-powered video call application with real-time agents, meeting summaries, and post-call features.

## Features
* 🤖 AI-powered video calls with custom agents
* 📞 Real-time video & chat using Stream SDK
* 📝 Automatic meeting summaries & transcripts
* 🔍 Smart transcript search & video playback
* 💳 Subscription management with Polar
* 🔐 Authentication with Better Auth
* 📱 Mobile responsive design
* ⚙️ Background jobs with Inngest

## Tech Stack
* Next.js 15
* React 19
* Tailwind v4
* Shadcn/ui
* tRPC
* DrizzleORM
* Neon Database
* OpenAI
* Stream Video & Chat
* Better Auth
* Inngest
* Polar

## Development Flow

```bash
# Install dependencies (use --legacy-peer-deps for React 19 compatibility)
npm install --legacy-peer-deps

# Start development servers
npm run dev          # Start Next.js development server
npm run dev:webhook  # Start webhook server (requires ngrok static domain in package.json)
npx inngest-cli@latest dev  # Start Inngest development server
```

## Additional Commands

```bash
# Database
npm run db:push      # Push database changes
npm run db:studio    # Open database studio

# Production
npm run build        # Build for production
npm run start        # Start production server
```

## Important: Version Fix Required
This project requires pinned dependency versions due to version mismatch issues with Next.js 15.3.9. Add the following `overrides` to your `package.json` before installing:

```json
"overrides": {
  "inngest": "3.37.0",
  "@stream-io/openai-realtime-api": "0.2.0"
}
```

Also pin these exact versions in `dependencies`:
```json
"inngest": "3.37.0",
"@stream-io/node-sdk": "0.4.24",
"@stream-io/openai-realtime-api": "0.2.0"
```

Then reinstall:
```bash
Remove-Item -Recurse -Force node_modules, package-lock.json
npm install --legacy-peer-deps
```

## Note
For `dev:webhook` to work, add your ngrok static domain to the script in `package.json`:
```
"dev:webhook": "ngrok http --url=[YOUR_NGROK_STATIC_DOMAIN] 3000"
```

---

Created by Jeshan Chhabra
