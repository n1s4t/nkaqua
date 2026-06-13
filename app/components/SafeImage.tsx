"use client";

import { useState } from "react";
import Image from "next/image";

interface SafeImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  sizes?: string;
  width?: number;
  height?: number;
  quality?: number;
}

export default function SafeImage({ src, alt, fill, className, sizes, width, height, quality }: SafeImageProps) {
  const [error, setError] = useState(false);
  const fallback = "/placeholder.svg";

  const imageSrc = error || !src || src === "" ? fallback : src;

  if (fill) {
    return (
      <Image
        src={imageSrc}
        alt={alt}
        fill
        sizes={sizes || "(max-width: 640px) 100vw, 25vw"}
        className={className}
        quality={quality}
        onError={() => setError(true)}
        unoptimized={imageSrc.startsWith("http")}
      />
    );
  }

  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={width || 400}
      height={height || 400}
      className={className}
      quality={quality}
      onError={() => setError(true)}
      unoptimized={imageSrc.startsWith("http")}
    />
  );
}
