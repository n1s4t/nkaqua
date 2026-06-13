"use client";

import { useState } from "react";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import SafeImage from "./SafeImage";

export default function ImageGallery({
  images,
  productName,
}: {
  images: string[];
  productName: string;
}) {
  const [selectedImage, setSelectedImage] = useState(
    images[0] || "/placeholder.svg"
  );
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const allImages = images.length > 0 ? images : ["/placeholder.svg"];

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const nextImage = () => {
    setLightboxIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setLightboxIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <>
      <div className="space-y-4">
        <div
          className="relative aspect-square w-full bg-bg-soft rounded-2xl overflow-hidden cursor-zoom-in group border border-[var(--border)]"
          onClick={() => openLightbox(allImages.indexOf(selectedImage))}
        >
          <SafeImage
            src={selectedImage}
            alt={productName}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition border border-white/10">
            <ZoomIn className="h-4 w-4 text-white" />
          </div>
        </div>

        {allImages.length > 1 && (
          <div className="relative">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`relative h-20 w-20 flex-shrink-0 bg-bg-soft rounded-lg overflow-hidden transition-all border ${
                    selectedImage === img
                      ? "ring-2 ring-[var(--accent)] ring-offset-2 ring-offset-[var(--bg)] border-[var(--accent)]/30"
                      : "border-[var(--border)] opacity-70 hover:opacity-100"
                  }`}
                >
                  <SafeImage
                    src={img}
                    alt={`${productName} view ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition z-10"
          >
            <X className="h-8 w-8" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-4 text-white/70 hover:text-white transition"
          >
            <ChevronLeft className="h-10 w-10" />
          </button>
          <div
            className="relative w-full max-w-4xl max-h-[80vh] mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <SafeImage
              src={allImages[lightboxIndex]}
              alt={`${productName} - fullscreen`}
              width={1200}
              height={1200}
              className="object-contain w-full h-full"
            />
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-4 text-white/70 hover:text-white transition"
          >
            <ChevronRight className="h-10 w-10" />
          </button>
          <div className="absolute bottom-4 left-0 right-0 text-center text-white/60 text-sm">
            {lightboxIndex + 1} / {allImages.length}
          </div>
        </div>
      )}
    </>
  );
}
