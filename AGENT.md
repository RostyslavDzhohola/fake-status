## StatusShot — Agent Guide (MVP)

### Purpose

Give any agent enough context to build/iterate on the MVP without re‑deciding fundamentals.

### One‑liner

StatusShot turns a selfie into a photoreal yacht shot. Free v1. Preorder credit upsell.

## Scope (v1 MVP)

- Free download, no watermark, no login, no email.
- Single scene: Yacht preset. Store one HQ background.
- Model via Vercel AI SDK in `app/api/generate`.
- Outputs: 4:5 (1080×1350) and 1:1 (1080×1080); direct download; “Delete files now”; auto‑delete in 48h.
- Upsell: one Stripe Checkout Link; explain founding credit.
- Analytics: DataFast snippet; optional Stripe webhook counter.

## Stack

- Next.js App Router + TypeScript + Tailwind v4
- UI: shadcn/ui + Radix + Tailwind utilities
- Server‑first: prefer RSC; keep `use client` local and minimal

## Current Implementation (snapshot)

- `src/app/layout.tsx` — metadata + global fonts + `<Toaster/>`
- `src/app/page.tsx` — MVP hero copy and CTAs
- `src/app/api/generate/route.ts` — POST stub: `{ imageUrl }` → echoes payload (wire Vercel AI SDK next)
- `src/lib/prompt.ts` — `yachtPreset` prompt guidance
- `src/app/globals.css` — Tailwind v4 + tokens; shadcn compatible
- `components.json` — shadcn config (rsc true)

## How We Work (rules)

- Functional, declarative React; avoid classes.
- Use TypeScript everywhere; prefer interfaces over types. Avoid enums (use maps).
- Naming: lowercase‑dash directories (e.g., `components/upload-card`). Favor named exports.
- Rendering: minimize `use client`, `useEffect`, and state; prefer RSC/SSR. Wrap client components in `Suspense`.
- Performance: dynamic import non‑critical UI; optimize images; watch LCP/CLS/FID.
- Files ≤ ~200–300 LOC; refactor if larger.
- No mock/stub data outside tests.

## UI Conventions

- shadcn/ui + Radix primitives; Tailwind utility‑first, mobile‑first.
- Keep tokens in CSS variables; use `text-muted-foreground`, `bg-background`, etc.
- Prefer accessible defaults (focus rings, contrast).

## Directories

- `src/components/...` — UI components (grouped by feature; lowercase‑dash)
- `src/lib/...` — helpers, prompts, utils
- `src/app/...` — routes, RSC pages, API routes

## API

- `POST /api/generate` body: `{ imageUrl: string }`
  - v1 now: returns `{ ok: true, received: { imageUrl } }`
  - next: call Vercel AI SDK with likeness‑preserving yacht preset; return composite image (PNG/JPEG)

## Environment

- `.env.local`
  - `NEXT_PUBLIC_STRIPE_CHECKOUT_URL` — Stripe Checkout Link URL
  - Add provider keys later (e.g., `OPENAI_API_KEY`, `REPLICATE_API_TOKEN`) when wiring model

## Tasks (from MVP TODO)

1. Decisions: Name, free v1, checkout link, model via Vercel AI SDK, IG outputs
2. Repo & Stack: Next.js + TS + Tailwind, shadcn/ui, Uploads provider, Vercel AI SDK, Stripe link, Analytics
3. Landing: hero copy, primary CTA, mini gallery, preorder CTA, footer policy
4. Upload Flow: DnD/picker (≤10MB), guidelines, progress/errors, delete button
5. Scene: store one HQ Yacht background; preset in `src/lib/prompt.ts`
6. Generate: `app/api/generate` minimal pipeline; return composite; client shows result + Download
7. IG Outputs: auto‑make 4:5 and 1:1; buttons for each and ZIP
8. Share: Web Share API; X/IG helpers; OG/Twitter meta
9. Preorder: button opens Stripe Checkout Link; explain founding credit; success message
10. Delivery: show result, direct download, delete now, 48h auto‑delete
11. Custom Requests: small email link (optional) for custom scenes only
12. Analytics: DataFast events; optional Stripe webhook counter; show lightweight counters
13. Policy: block minors/porn/impersonation/political/celebrity deepfakes; “For entertainment/creative use”; report link
14. Launch List: X thread, Reddit posts, TikTok/IG short, Wall of Love, `?src=` tracking
15. Wall of Love: pinned X thread canonical; on‑site grid via curated list; post helper
16. Success/Kill: continue if 100 UV → 25+ downloads → ≥10 preorder clicks (or ≥1 preorder); otherwise iterate hero/sample, then test Penthouse

## Definition of Done (MVP)

- Landing matches copy; primary CTA triggers upload/generate flow.
- `/api/generate` composes and returns images (base + 4:5 + 1:1), downloadable without watermark.
- “Delete now” and 48h auto‑delete behavior implemented.
- Preorder button opens Checkout Link; success copy present.
- Analytics events firing; optional counters visible.
- Safety copy and blocks in place.

## Run

```bash
npm i
npm run dev
```

## References

- Rules: `.cursor/rules/project-rules.mdc`, `.cursor/rules/general-project-rules.mdc`
- Tasks: `.cursor/todo.md`
