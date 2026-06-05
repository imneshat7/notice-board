# Notice Board

A full-stack notice board app built with Next.js Pages Router, Prisma, Supabase (PostgreSQL), and Tailwind CSS.

## How to run locally

1. Clone the repo: `git clone https://github.com/imneshat7/notice-board`
2. Install dependencies: `npm install`
3. Create a `.env` file in the root:


4. Push the Prisma schema: `npx prisma db push`
5. Generate Prisma client: `npx prisma generate`
6. Start the dev server: `npm run dev`
7. Open http://localhost:3000

## What I would improve with more time

Add pagination to the notices list so the page doesn't slow down as notices grow. I would also add filtering by category so users can quickly find relevant notices.

## AI usage

Used Claude (Anthropic) and Gemini to scaffold the project structure, generate API routes, Prisma schema, and page components. Debugging was also done with AI assistance — including fixing Tailwind v4 config, resolving Prisma v7 breaking changes by downgrading to v6, and fixing the Supabase connection URL for Vercel's serverless environment. I followed along with each step and understand the overall structure of the app.