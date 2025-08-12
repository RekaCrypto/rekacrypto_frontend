# Reka Crypto

A minimal Next.js app that fetches crypto news recaps from Supabase and displays them with search and coin filter. Styled with Tailwind CSS.

## Setup

1. Create a Supabase project and a table `crypto_recaps` with your schema.
2. Create a `.env.local` in the project root with:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

3. Install dependencies and run the dev server:

```
npm install
npm run dev
```

Visit http://localhost:3000

