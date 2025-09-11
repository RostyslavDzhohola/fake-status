"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

/**
 * Shows the uploaded user photo (from sessionStorage) in the gallery slot.
 * Falls back to the existing placeholder image when no upload is present.
 */
export default function UploadPreview() {
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const readFromSession = () => {
      try {
        const next = sessionStorage.getItem("userUploadDataUrl");
        setUploadedUrl(next || null);
      } catch {
        // ignore read errors
      }
    };
    // Ensure initial client render matches SSR, then update after mount
    readFromSession();
    window.addEventListener("user-uploaded-photo", readFromSession);
    return () =>
      window.removeEventListener("user-uploaded-photo", readFromSession);
  }, []);

  return uploadedUrl ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={uploadedUrl}
      alt="Your uploaded photo"
      className="object-cover w-full h-full"
    />
  ) : (
    <Image
      src="https://g5bkk9ebz3.ufs.sh/f/PZXJIaSDIN6E1nPqf0BSDfhvcJ0BTPx8EmYrkIAGRjw6Ho7n"
      alt="Sample yacht scene 2"
      className="object-cover w-full h-full"
      width={400}
      height={300}
      priority={false}
    />
  );
}
