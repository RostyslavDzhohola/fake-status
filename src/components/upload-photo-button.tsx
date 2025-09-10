"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";

interface UploadPhotoButtonProps {
  className?: string;
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

  function openPicker() {
    inputRef.current?.click();
  }

  async function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Basic validation: image and <= 10MB
    const isImage = file.type.startsWith("image/");
    const isSmallEnough = file.size <= 10 * 1024 * 1024;
    if (!isImage || !isSmallEnough) {
      alert("Please select an image up to 10MB.");
      e.target.value = "";
      return;
    }

    setIsBusy(true);
    try {
      const reader = new FileReader();
      const dataUrl: string = await new Promise((resolve, reject) => {
        reader.onerror = () => reject(new Error("Failed to read file"));
        reader.onload = () => resolve(String(reader.result));
        reader.readAsDataURL(file);
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
        accept="image/*"
        className="hidden"
        onChange={onChange}
      />
      <Button onClick={openPicker} disabled={isBusy} className={className}>
        {isBusy ? "Uploading..." : "Upload your photo"}
      </Button>
    </>
  );
}
