"use client";

import Image from "next/image";
import { useState } from "react";

interface ArticleImageProps {
  src: string | null;
  alt: string;
  className?: string;
  priority?: boolean;
}

export function ArticleImage({ src, alt, className = "", priority = false }: ArticleImageProps) {
  const [error, setError] = useState(false);

  if (!src || error) {
    return null;
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
      className={`object-cover ${className}`}
      priority={priority}
      onError={() => setError(true)}
    />
  );
}
