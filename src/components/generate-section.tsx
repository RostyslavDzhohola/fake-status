"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { yachtPreset } from "@/lib/prompt";

export default function GenerateSection() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>(
    `Photoreal portrait on a yacht, ${yachtPreset.guidance}`
  );
  const [userPhoto, setUserPhoto] = useState<string | null>(null);

  async function handleGenerate() {
    setIsGenerating(true);
    setError(null);
    setDataUrl(null);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, imageUrl: userPhoto || undefined }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to generate");
      if (json.dataUrl) setDataUrl(json.dataUrl);
    } catch (e: unknown) {
      setError((e as Error).message);
    } finally {
      setIsGenerating(false);
    }
  }

  // Pick up user upload from the UploadPhotoButton via sessionStorage
  // and update live when the custom event fires. Keeps scope client‑local.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const readFromSession = () => {
      try {
        const next = sessionStorage.getItem("userUploadDataUrl");
        setUserPhoto(next || null);
      } catch {
        // ignore
      }
    };
    readFromSession();
    window.addEventListener("user-uploaded-photo", readFromSession);
    return () =>
      window.removeEventListener("user-uploaded-photo", readFromSession);
  }, []);

  return (
    <section id="make-shot" className="w-full max-w-2xl mx-auto space-y-6">
      <div className="text-left space-y-2">
        <p className="text-sm text-muted-foreground">
          Tip: Face + upper torso visible, plain background, soft light, no
          hats/sunglasses.
        </p>
      </div>

      <div className="grid gap-3">
        <label className="text-sm font-medium">Style prompt</label>
        <Textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={3}
        />
        {userPhoto ? (
          <p className="text-xs text-muted-foreground">
            Using your uploaded photo.
          </p>
        ) : (
          <p className="text-xs text-muted-foreground">
            Optional: upload a selfie above to personalize.
          </p>
        )}
      </div>

      <div className="flex gap-3">
        <Button onClick={handleGenerate} disabled={isGenerating}>
          {isGenerating ? "Generating..." : "Generate"}
        </Button>
        {dataUrl ? (
          <a href={dataUrl} download className="underline text-sm self-center">
            Download result
          </a>
        ) : null}
      </div>

      {error ? (
        <p className="text-sm text-red-600">{error}</p>
      ) : (
        <p className="text-xs text-muted-foreground">
          Images are generated without watermark. Do not impersonate public
          figures or minors.
        </p>
      )}

      {dataUrl ? (
        <div className="mt-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={dataUrl}
            alt="Generated yacht shot"
            className="rounded-lg border max-h-[540px] w-auto mx-auto"
          />
        </div>
      ) : null}
    </section>
  );
}
