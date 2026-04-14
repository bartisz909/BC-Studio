# BC Studio - Web & AI Solutions

Custom websites, AI chatbots, AI agents, and automation for businesses that want to scale smarter.

**Founded by:** Bartek  
**Location:** Poland (Working Globally)  
**Tech Stack:** React, Next.js, Node.js, Python, OpenAI API, LangChain, n8n, Vercel

## Features

- ⚡ **High-performance website** - Dark theme, custom cursor, matrix rain animation
- 💬 **Live AI Chatbot** - Powered by OpenAI GPT, responds in English & Polish
- 📱 **Responsive Design** - Works on desktop, tablet, mobile
- 🌐 **Bilingual** - Full English/Polish support with i18n
- 🚀 **Auto-deployed** - Connected to Vercel for instant updates

## Services Offered

1. **Websites & Web Apps** - Fast, responsive, conversion-focused
2. **AI Chatbots** - 24/7 customer support and lead generation
3. **AI Integration** - Embed AI into your workflows
4. **AI Agents** - Autonomous multi-step task execution
5. **IT Solutions** - Cloud setup and technical consulting
6. **Automation** - Smart workflows with Zapier, Make, n8n

## Setup & Deployment

### Local Development

```bash
# Install dependencies
npm install

# Run local server
npm run dev
# Visit http://localhost:3000
```

### Deploy to Vercel

1. **Connect GitHub**
   - Push code to https://github.com/bartisz909/BC-Studio
   - Go to https://vercel.com/new
   - Import the GitHub repo

2. **Set Environment Variables**
   - In Vercel Dashboard → Settings → Environment Variables
   - Add `OPENAI_API_KEY` with your OpenAI API key
   - (Get key from https://platform.openai.com/api-keys)

3. **Deploy**
   - Vercel auto-deploys on every GitHub push
   - Your site will be live at `bc-studio.vercel.app` (or custom domain)

## Environment Variables

Create `.env.local` locally (for development):
```
OPENAI_API_KEY=sk-xxx...
NODE_ENV=production
```

On Vercel, set these in **Settings → Environment Variables**:
- `OPENAI_API_KEY` - Your OpenAI API key

## File Structure

```
.
├── index.html              # Main website
├── api/
│   └── chat.js            # Chatbot API endpoint (Vercel Function)
├── .env.example           # Environment variables template
├── vercel.json            # Vercel configuration
├── package.json           # Dependencies & scripts
└── README.md              # This file
```

## API Endpoint

### POST `/api/chat`

Send a message to the chatbot:

```json
{
  "message": "What services do you offer?",
  "lang": "en"
}
```

Response:
```json
{
  "reply": "BC Studio offers custom websites, AI chatbots, AI agents, automation, and IT solutions..."
}
```

## Chatbot Prompt

The chatbot is configured with a system prompt that instructs it about BC Studio's services, pricing, timeline, and contact info. You can customize this in `api/chat.js`.

Languages supported: **English** & **Polish**

## Contact

- **Email:** hello@bc-studio.dev
- **GitHub:** https://github.com/bartisz909
- **Website:** bc-studio.vercel.app (live)

## License

MIT - Feel free to use as reference for your own projects.

---

**Built with:** HTML, CSS, JavaScript, OpenAI API, Vercel  
**Built by:** Bartek 🚀
