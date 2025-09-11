"use client";

import { useEffect, useState } from "react";

/**
 * Renders the overlay label text for the upload preview slot.
 * Shows "Your image" when a user upload exists in sessionStorage,
 * otherwise falls back to "Before".
 */
export default function UploadStatusText() {
  const [hasUpload, setHasUpload] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const sync = () => {
      try {
        setHasUpload(Boolean(sessionStorage.getItem("userUploadDataUrl")));
      } catch {
        setHasUpload(false);
      }
    };
    sync();
    window.addEventListener("user-uploaded-photo", sync);
    return () => window.removeEventListener("user-uploaded-photo", sync);
  }, []);

  return <>{hasUpload ? "Your image" : "Before"}</>;
}
