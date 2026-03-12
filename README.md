This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Environment variables 🌐

This project uses environment variables for sensitive information such as the
MongoDB connection string and any secrets. You set these locally in
`.env.local` for development, but **do not commit that file** (it's already
ignored by `.gitignore`). An example `.env.local` might look like:

```text
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster0.mongodb.net/dbname
JWT_SECRET=your_jwt_secret
```

> **Note:** `next dev` and Vercel will read `process.env.*` at build/runtime,
> but Vercel **does not** read your local `.env.local` file. All required
> variables must be configured in the Vercel dashboard under *Settings ➜
> Environment Variables*. After adding or changing values there, trigger a
> redeploy so the new values take effect.


## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
