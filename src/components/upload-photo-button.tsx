"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

interface UploadPhotoButtonProps {
  className?: string;
}

// Minimal runtime type for the HEIC converter to avoid "any".
type Heic2Any = (options: {
  blob: Blob;
  toType?: string;
  quality?: number;
}) => Promise<Blob>;

/**
 * Downscale an image Blob on the client using a canvas.
 * - Reads the Blob as a data URL
 * - Draws it to a canvas with scale = Math.min(1, maxDimension / max(width, height))
 * - Returns a new Blob via canvas.toBlob with the requested mimeType and quality
 * - Skips canvas processing entirely if scale === 1 to avoid unnecessary work
 */
async function downscaleImageViaCanvas(
  inputBlob: Blob,
  options: { maxDimension: number; mimeType: string; quality?: number }
): Promise<Blob> {
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Failed to read image blob"));
    reader.onload = () => resolve(String(reader.result));
    reader.readAsDataURL(inputBlob);
  });

  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Failed to load image for canvas"));
    image.src = dataUrl;
  });

  const width = img.naturalWidth || img.width;
  const height = img.naturalHeight || img.height;
  if (!width || !height) return inputBlob;

  const maxSide = Math.max(width, height);
  const scale = Math.min(1, options.maxDimension / maxSide);

  if (scale === 1) return inputBlob;

  const targetW = Math.max(1, Math.round(width * scale));
  const targetH = Math.max(1, Math.round(height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = targetW;
  canvas.height = targetH;
  const ctx = canvas.getContext("2d");
  if (!ctx) return inputBlob;
  ctx.drawImage(img, 0, 0, targetW, targetH);

  const mimeType = options.mimeType || "image/jpeg";
  const quality =
    typeof options.quality === "number" ? options.quality : undefined;

  const outBlob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (b) => {
        if (b) resolve(b);
        else reject(new Error("Canvas toBlob failed"));
      },
      mimeType,
      quality
    );
  });

  return outBlob;
}

/**
 * Minimal client upload button. Stores the selected image as a data URL in
 * sessionStorage under the key `userUploadDataUrl` so other client widgets
 * (e.g. the generator) can read it without global state.
 */
export default function UploadPhotoButton({
  className,
}: UploadPhotoButtonProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isBusy, setIsBusy] = useState(false);
  const [hasUpload, setHasUpload] = useState(false);

  function openPicker() {
    inputRef.current?.click();
  }

  // Keep local state in sync with sessionStorage and external events
  useEffect(() => {
    if (typeof window === "undefined") return;
    const sync = () => {
      try {
        const v = sessionStorage.getItem("userUploadDataUrl");
        setHasUpload(Boolean(v));
      } catch {
        setHasUpload(false);
      }
    };
    sync();
    window.addEventListener("user-uploaded-photo", sync);
    return () => window.removeEventListener("user-uploaded-photo", sync);
  }, []);

  function resetUpload() {
    try {
      sessionStorage.removeItem("userUploadDataUrl");
    } catch {}
    // Notify listeners to re-read
    window.dispatchEvent(new CustomEvent("user-uploaded-photo"));
    setHasUpload(false);
    if (inputRef.current) inputRef.current.value = "";
  }

  async function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Basic validation: specific image types and <= 10MB
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "image/heic",
      "image/heif",
    ];
    const isValidImage = allowedTypes.includes(file.type.toLowerCase());
    const isSmallEnough = file.size <= 10 * 1024 * 1024;
    if (!isValidImage || !isSmallEnough) {
      alert(
        "Please select a valid image (JPG, PNG, WebP, HEIC/HEIF) up to 10MB."
      );
      e.target.value = "";
      return;
    }

    setIsBusy(true);
    try {
      // If the image is HEIC/HEIF, convert to a widely-supported JPEG on the client
      // to ensure cross-browser compatibility for previews and further processing.
      const isHeic = ["image/heic", "image/heif"].includes(
        file.type.toLowerCase()
      );
      let blobToStore: Blob = file;
      if (isHeic) {
        const heic2any = (await import("heic2any"))
          .default as unknown as Heic2Any;
        blobToStore = await heic2any({
          blob: file,
          toType: "image/jpeg",
          quality: 0.9,
        });
      }

      // Downscale large images client-side to avoid sessionStorage overflow and memory spikes
      const targetMimeType = isHeic ? "image/jpeg" : file.type;
      blobToStore = await downscaleImageViaCanvas(blobToStore, {
        maxDimension: 2048,
        mimeType: targetMimeType,
        quality: 0.85,
      });

      // Enforce the 10MB limit after potential downscale
      if (blobToStore.size > 10 * 1024 * 1024) {
        alert(
          "Processed image exceeds 10MB. Please choose a smaller photo or crop it."
        );
        return;
      }

      const reader = new FileReader();
      const dataUrl: string = await new Promise((resolve, reject) => {
        reader.onerror = () => reject(new Error("Failed to read file"));
        reader.onload = () => resolve(String(reader.result));
        reader.readAsDataURL(blobToStore);
      });

      // Store for other components and emit a window event for live updates
      try {
        sessionStorage.setItem("userUploadDataUrl", dataUrl);
        window.dispatchEvent(new CustomEvent("user-uploaded-photo"));
      } catch (storageError) {
        console.error("Failed to store image data:", storageError);
        alert(
          "Unable to store image. Please try again or check if private browsing is enabled."
        );
        return;
      }

      // Scroll to generator section
      const el = document.getElementById("make-shot");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.location.hash = "#make-shot";
      }
    } catch (error) {
      console.error("Failed to process image:", error);
      alert("Failed to process the image. Please try again.");
    } finally {
      setIsBusy(false);
      e.target.value = "";
    }
  }

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp,image/heic,image/heif"
        className="hidden"
        onChange={onChange}
      />
      <Button
        onClick={hasUpload ? resetUpload : openPicker}
        disabled={isBusy}
        className={className}
      >
        {isBusy ? "Uploading..." : hasUpload ? "Reset" : "Upload your photo"}
      </Button>
    </>
  );
}
