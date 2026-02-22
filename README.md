# C8K Waitlist

Waitlist landing page for **C8K** — a minimalist recipe app that saves recipes from Instagram, TikTok, YouTube, websites, and more, all in one place.

Built with React and styled with a bright neumorphism UI. Collects waitlist emails via Supabase.

## Sections

- **Hero** — headline, email signup form, social proof
- **Features** — six feature cards (save from anywhere, fridge feature, meal planning, hands-free cooking, AI assistant, smart search)
- **About** — mission statement and founder info
- **FAQ** — two-column accordion

## Tech Stack

- React 18 (Create React App)
- CSS Modules (neumorphism theme)
- GSAP (scroll-triggered animations)
- Supabase (waitlist email storage)
- Vercel (deployment)

## Getting Started

```bash
npm install
```

Create a `.env.local` file:

```
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key
```

Then run:

```bash
npm start
```

## Deploy

Configured for Vercel. Push to main and connect the repo in your Vercel dashboard, or run:

```bash
npx vercel
```

Set `REACT_APP_SUPABASE_URL` and `REACT_APP_SUPABASE_ANON_KEY` as environment variables in Vercel project settings.
