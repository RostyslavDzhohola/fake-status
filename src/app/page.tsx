import Link from "next/link";
import GenerateSection from "@/components/generate-section";

export default function Home() {
  return (
    <main className="min-h-dvh flex flex-col items-center justify-center gap-10 px-6 py-16 text-center">
      <div className="space-y-4 max-w-2xl">
        <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight">
          Jet-set shots in minutes. No jet debt.
        </h1>
        <p className="text-balance text-base sm:text-lg text-muted-foreground">
          Upload a selfie → get a photoreal yacht shot. Free download. Preorder
          a year of Pro as an early supporter.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="#make-shot"
          className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-6 text-primary-foreground shadow transition-colors hover:opacity-90"
        >
          Make My Yacht Shot
        </Link>
        <a
          href="#preorder"
          className="inline-flex h-12 items-center justify-center rounded-md border px-6"
        >
          Preorder Pro (Founding Year Credit)
        </a>
      </div>

      <footer className="text-xs text-muted-foreground">
        <p>
          For entertainment use only • No impersonation • No minors • Report
          abuse
        </p>
      </footer>
      <GenerateSection />
    </main>
  );
}
