# StatusShot (MVP)

Minimal Next.js App Router + Tailwind project for the single-scene demo.

## Dev

```bash
pnpm install
pnpm dev
```

## Env

Copy `.env.example` → `.env.local` and set values as needed.

- `NEXT_PUBLIC_STRIPE_CHECKOUT_URL` – public Checkout Link URL
- Provider keys (OpenAI/Replicate/etc.) to be added later when wiring the model

## API

- `POST /api/generate` → { imageUrl } → echoes payload for now

## Rules

- See `.cursor/rules/project-rules.mdc` and `.cursor/rules/general-project-rules.mdc`
