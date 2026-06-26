import React, { useEffect, useMemo, useState } from 'react';

export type RotatorImage = {
  src: string;
  alt: string;
  fallbackSrc?: string;
  waitTime?: number;
};

type ImageRotatorProps = {
  images: RotatorImage[];
  defaultWaitTime?: number;
  className?: string;
  imageClassName?: string;
  autoPlay?: boolean;
};

const DEFAULT_WAIT_TIME = 3000;

function getWaitTime(image: RotatorImage | undefined, defaultWaitTime?: number) {
  return image?.waitTime ?? defaultWaitTime ?? DEFAULT_WAIT_TIME;
}

export function ImageRotator({
  images,
  defaultWaitTime = DEFAULT_WAIT_TIME,
  className = '',
  imageClassName = '',
  autoPlay = true,
}: ImageRotatorProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [failedSources, setFailedSources] = useState<Record<string, boolean>>({});

  const safeImages = useMemo(() => images.filter((image) => Boolean(image.src)), [images]);
  const activeImage = safeImages[activeIndex];

  useEffect(() => {
    if (!autoPlay || safeImages.length <= 1) {
      return undefined;
    }

    const timeout = window.setTimeout(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % safeImages.length);
    }, getWaitTime(activeImage, defaultWaitTime));

    return () => window.clearTimeout(timeout);
  }, [activeImage, autoPlay, defaultWaitTime, safeImages.length]);

  useEffect(() => {
    if (activeIndex >= safeImages.length) {
      setActiveIndex(0);
    }
  }, [activeIndex, safeImages.length]);

  if (!safeImages.length) {
    return null;
  }

  return (
    <div className={`image-rotator ${className}`.trim()} aria-live="polite">
      {safeImages.map((image, index) => {
        const hasFailed = failedSources[image.src];
        const imageSrc = hasFailed && image.fallbackSrc ? image.fallbackSrc : image.src;

        return (
          <img
            key={`${image.src}-${index}`}
            src={imageSrc}
            alt={image.alt}
            className={`image-rotator__image ${imageClassName} ${index === activeIndex ? 'is-active' : ''}`.trim()}
            onError={() => setFailedSources((current) => ({ ...current, [image.src]: true }))}
          />
        );
      })}
    </div>
  );
}
