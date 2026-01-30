"use client";

import { useEffect } from "react";

export default function VideoModal({ open, onClose }) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
      <div className="relative w-full max-w-3xl aspect-video bg-black">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white text-2xl"
        >
          ✕
        </button>

        <iframe
          className="w-full h-full"
          src="https://www.youtube.com/embed/Sklc_fQBmcs?autoplay=1"
          allow="autoplay"
          allowFullScreen
        />
      </div>
    </div>
  );
}
