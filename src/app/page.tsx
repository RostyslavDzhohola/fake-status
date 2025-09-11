import Link from "next/link";
import { Button } from "@/components/ui/button";
import GenerateSection from "@/components/generate-section";
import UploadPhotoButton from "@/components/upload-photo-button";
import Image from "next/image";
import UploadPreview from "@/components/upload-preview";
import UploadStatusText from "@/components/upload-status-text";

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
            <br />
            Social engineering 101.
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
          <div className="aspect-[4/3] rounded-xl border bg-gradient-to-b from-neutral-50 to-white flex items-center justify-center overflow-hidden relative">
            {/* Not clickable, just viewable */}
            <span className="sr-only">Sample yacht scene image from</span>
            <div className="absolute top-2 left-2 z-10 rounded-md bg-black/70 text-white text-xs font-medium px-2 py-1 pointer-events-none">
              After
            </div>
            <Image
              src="https://g5bkk9ebz3.ufs.sh/f/PZXJIaSDIN6EPhRGUjSDIN6ExZdGYbs0V7voFuzWTlAL3Qia"
              alt="Sample yacht scene"
              className="object-cover w-full h-full"
              width={400}
              height={300}
              priority={true}
            />
          </div>

          <div className="aspect-[4/3] rounded-xl border bg-gradient-to-b from-neutral-50 to-white flex items-center justify-center overflow-hidden relative">
            <span className="sr-only">Your uploaded photo preview</span>
            <div className="absolute top-2 left-2 z-10 rounded-md bg-black/70 text-white text-xs font-medium px-2 py-1 pointer-events-none">
              <UploadStatusText />
            </div>
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
          <p className="text-sm text-muted-foreground">4:5 standard </p>
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
            The photos are not stored on the servers or database. They are
            stored locally.
          </p>
        </details>
        <details className="rounded-lg border p-4">
          <summary className="font-medium">Can I use any selfie?</summary>
          <p className="mt-2 text-sm text-muted-foreground">
            Best results: face + upper torso, plain background, soft light.
          </p>
        </details>
      </section>

      {/* HIRING/BUILD CTA */}
      <section className="w-full max-w-4xl mx-auto" aria-label="Build with us">
        <div className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-black to-neutral-800 text-white p-6 sm:p-8 shadow-md">
          <div className="space-y-3">
            <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              We can build your website or AI idea
            </h3>
            <p className="text-sm sm:text-base text-white/80">
              The first 5 clients are free for our case study. Serious inquiries
              only.
            </p>
          </div>
          <div className="mt-5">
            <Button
              asChild
              size="lg"
              className="h-12 px-6 text-base bg-white text-black hover:bg-neutral-100 border shadow-sm"
            >
              <Link
                href="https://tally.so/r/wbpeX1"
                target="_blank"
                rel="noopener noreferrer"
              >
                Apply now
              </Link>
            </Button>
          </div>
        </div>
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
