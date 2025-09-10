# StatusShot — MVP TODO (Free v1, Auto-Deliver, Preorder Credit)

## 0 ONE RULE

- [ ] Ship the single-scene (Yacht) demo and measure: **100 UV → 25+ downloads → ≥10 preorder clicks (or 1+ preorder)**. If not, iterate copy/samples before adding features.

---

## 1 Decisions (10 min)

- [x] Name: `StatusShot`
- [ ] v1 = **Free download**, **no watermark**, **no login**, **no email required**
- [ ] Upsell = **Preorder early-supporter subscription credit** (Stripe Checkout Link)
- [x] Model: **Vercel AI SDK** (server route)
- [ ] IG outputs: **4:5 (1080×1350)** and **1:1 (1080×1080)**

---

## 2 Repo & Stack

- [x] Next.js (App Router) + TypeScript + Tailwind (Vercel deploy)
- [x] UI components: shadcn/ui
- [ ] Uploads: UploadThing
- [ ] Image gen: Vercel AI SDK wired in `/api/generate`
- [ ] Payments: single **Stripe Checkout Link** (no backend logic for checkout)
- [ ] Analytics: **DataFast** snippet + (optional) **Stripe webhook** only for conversion counts

---

## 3 Landing (single page)

- [ ] H1: “Boat-set shots in minutes. No boat debt.”
- [ ] Sub: “Upload a selfie → get a photoreal yacht shot. Free download. Preorder a year of Pro as an early supporter.”
- [ ] Primary CTA: **Make My Boat Shot**
- [ ] Mini gallery (2–3 samples) — placeholders day 1
- [ ] Secondary CTA: **Preorder Pro (Founding Year Credit)**
- [ ] Footer: TOS, Privacy, “For entertainment use only”, content policy

---

## 4 Upload Flow (no auth, no email)

- [ ] Drag-and-drop / picker (jpg/png ≤10MB)
- [ ] Guidelines box (above picker): - Face + upper torso visible - Plain background, bright soft light - No hats/sunglasses; camera at eye level
- [ ] Progress states + simple error messages
- [ ] “Delete my photo” button (immediate purge)

---

## 5 Scene (only one)

- [ ] Store 1 high-quality **Yacht** background
- [ ] `/lib/prompt.ts`: single preset (golden-hour rim light, shallow DOF, teak deck, chrome rail, turquoise water bokeh)

---

## 6 Generate (Auto path — fully deliverable)

- [ ] API: `app/api/generate/route.ts` with **Vercel AI SDK**
- [ ] Minimal pipeline: 1. Receive upload URL 2. Call model with likeness-preserving preset 3. Return composite (PNG/JPEG)
- [ ] **No watermark**
- [ ] Client: show result + **Download** button

---

## 7 IG-Optimized Outputs

- [ ] After base composite, auto-make: - **4:5 (1080×1350)** - **1:1 (1080×1080)**
- [ ] Buttons: **Download All (ZIP)**, **Download 4:5**, **Download 1:1**

---

## 8 Share Buttons (X, IG, etc.)

- [ ] Add Web Share API (`navigator.share`) on mobile
- [ ] Buttons: - **Share to X** → open tweet composer with preset text + `#StatusShot` + link - **Copy IG caption** → copy-to-clipboard text; prompt user to post manually to IG - **Copy Link** → landing URL with `?src=share`
- [ ] Add Open Graph/Twitter meta tags (title, description, preview image)

---

## 9 Preorder (subscription credit)

- [ ] Button under result: **Preorder Pro Year (Founding Supporter)**
- [ ] Opens **Stripe Checkout Link**
- [ ] On-page copy explains credit: - “Your preorder is applied as credit to your first year of Pro at launch.” - Early perks: more scenes (Penthouse, PJ stairs, Supercar), 4K HD + 3 variants, faster renders, priority queue
- [ ] Post-checkout success page: “Thanks, Founding Supporter! We’ll announce launch here. Your credit is saved in Stripe.”

---

## 10 Delivery (no email)

- [ ] Show result on page
- [ ] Direct **Download** (no email)
- [ ] **Delete files now** button (immediate purge)
- [ ] Retention note: auto-delete in **48h**

---

## 11 Custom Requests (email only if needed)

- [ ] Tiny link: “Want a custom scene tweak?” → optional email form
- [ ] Only use email for custom work; not required for normal flow

---

## 12 Analytics (simple)

- [ ] **DataFast events**: - `view_landing` - `start_upload` - `generate_success` - `download_click` - `preorder_click`
- [ ] **Stripe conversion count**: - Option A (no code): Check Stripe Dashboard for Checkout Link conversions - Option B (tiny code): add `/api/stripe-webhook` for `checkout.session.completed` to increment a counter (Upstash/KV) for on-site stats
- [ ] Show lightweight counters on page: “{X} downloads today”, “{Y} founding supporters”

---

## 13 Policy & Safety

- [ ] Block: minors, porn, impersonation, political/celebrity deepfakes
- [ ] Clear “For entertainment/creative use”
- [ ] Report/abuse link

---

## 14 Launch List (Day 1–2)

- [ ] X thread with before/afters + CTA (link + `#StatusShot`)
- [ ] Reddit (2–3 subs; follow rules): demo + free link
- [ ] TikTok/IG short demo (10–15s screen capture → result) with on-screen URL
- [ ] **Wall of Love** (see below)
- [ ] Track sources via `?src=` (x, reddit, tiktok, ig, direct)

---

## 15 Wall of Love (social proof flywheel)

- [ ] Pick ONE canonical place to post results publicly (recommended: **pinned X thread**)
- [ ] On-site “Wall of Love” grid pulls curated embeds/links from that thread/hashtag `#StatusShot`
- [ ] Button under result: **Post yours to the Wall →** opens X composer with preset text + hashtag + link
- [ ] Manual moderation list (`/data/wall.json`) to feature best posts on landing

---

## 16 Success / Kill Criteria

- [ ] Continue if: **100 UV → 25+ downloads → ≥10 preorder clicks (or 1+ preorder)**
- [ ] If not met: iterate hero copy + sample images; if still flat, test **Penthouse** as second scene before expanding scope

---

## 17 Later (do NOT touch now)

- [ ] 9:16 export for Reels/Stories
- [ ] Referral credit
- [ ] Multi-scene picker
- [ ] Account system & saved gallery
