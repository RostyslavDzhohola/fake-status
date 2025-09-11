import Link from "next/link";
import GenerateSection from "@/components/generate-section";
import UploadPhotoButton from "@/components/upload-photo-button";
import Image from "next/image";
import UploadPreview from "@/components/upload-preview";

export default function Home() {
  return (
    <main className="min-h-dvh flex flex-col items-center gap-16 px-6 py-8 text-center bg-white">
      {/* HERO */}
      <section className="w-full max-w-4xl mx-auto space-y-8">
        <div className="space-y-5">
          <h1 className="text-5xl sm:text-7xl font-semibold tracking-tight leading-[1.05]">
            Generate high‑status shots
            <span className="inline-block rounded-md bg-black text-white px-2 py-1 ml-2 align-baseline">
              in minutes
            </span>
          </h1>
          <p className="text-pretty text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload a selfie → get photoreal “status‑trigger” scenes (v1: Yacht).
            Playful social‑engineering vibe—signal status in places it usually
            wouldn’t be allowed. Free download. No watermark. For entertainment
            only.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <UploadPhotoButton />
          <Link
            href="#make-shot"
            className="inline-flex h-12 items-center justify-center rounded-md border px-6"
          >
            Try without upload
          </Link>
        </div>

        {/* TRUST BADGES (placeholder) */}
        {/* TODO: add this later when we have some data */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-muted-foreground">
          <div className="rounded-lg border p-3">
            #1 Design Tools — Product of the Day
          </div>
          <div className="rounded-lg border p-3">400,000+ images generated</div>
          <div className="rounded-lg border p-3">Made with privacy in mind</div>
        </div> */}
      </section>

      {/* GALLERY PLACEHOLDER */}
      <section
        className="w-full max-w-5xl mx-auto"
        aria-label="Sample gallery (coming soon)"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="aspect-[4/3] rounded-xl border bg-gradient-to-b from-neutral-50 to-white flex items-center justify-center overflow-hidden">
            {/* Not clickable, just viewable */}
            <span className="sr-only">Sample yacht scene image from</span>
            <Image
              src="https://g5bkk9ebz3.ufs.sh/f/PZXJIaSDIN6EGuuBpPPeJVcWxw42m0dKa3ghMb8Gr6HANYeo"
              alt="Sample yacht scene"
              className="object-cover w-full h-full"
              width={400}
              height={300}
              priority={false}
            />
          </div>

          <div className="aspect-[4/3] rounded-xl border bg-gradient-to-b from-neutral-50 to-white flex items-center justify-center overflow-hidden">
            <span className="sr-only">Your uploaded photo preview</span>
            <UploadPreview />
          </div>
        </div>
      </section>

      {/* GENERATOR */}
      <GenerateSection />

      {/* FEATURES PLACEHOLDER */}
      <section
        className="w-full max-w-4xl mx-auto grid gap-3"
        aria-label="Features (placeholders)"
      >
        <div className="rounded-lg border p-4 text-left">
          <h3 className="font-medium">Status triggers</h3>
          <p className="text-sm text-muted-foreground">
            Yacht bow, chrome rail, golden‑hour rim light. More scenes later.
          </p>
        </div>
        <div className="rounded-lg border p-4 text-left">
          <h3 className="font-medium">IG‑ready sizes</h3>
          <p className="text-sm text-muted-foreground">
            4:5 and 1:1 outputs coming right after base composite.
          </p>
        </div>
        <div className="rounded-lg border p-4 text-left">
          <h3 className="font-medium">Free download</h3>
          <p className="text-sm text-muted-foreground">
            No watermark. No login. Day‑one simplicity.
          </p>
        </div>
      </section>

      {/* FAQ PLACEHOLDER */}
      <section
        className="w-full max-w-3xl mx-auto text-left space-y-4"
        aria-label="FAQ (placeholder)"
      >
        <details className="rounded-lg border p-4">
          <summary className="font-medium">Is my photo stored?</summary>
          <p className="mt-2 text-sm text-muted-foreground">
            We generate on demand and plan auto‑delete within 48h. Manual delete
            will be available.
          </p>
        </details>
        <details className="rounded-lg border p-4">
          <summary className="font-medium">Can I use any selfie?</summary>
          <p className="mt-2 text-sm text-muted-foreground">
            Best results: face + upper torso, plain background, soft light.
          </p>
        </details>
      </section>

      {/* FOOTER */}
      <footer className="text-xs text-muted-foreground">
        <p>
          For entertainment use only • No impersonation • No minors • Report
          abuse
        </p>
      </footer>
    </main>
  );
}
