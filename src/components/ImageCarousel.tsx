import { useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageCarouselProps {
  images: { src: string; alt: string }[];
  className?: string;
  height?: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

const ImageCarousel = ({
  images,
  className = "",
  height = "h-[420px]",
  autoPlay = true,
  autoPlayInterval = 4000,
}: ImageCarouselProps) => {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const go = useCallback(
    (index: number) => {
      if (animating || images.length <= 1) return;
      setAnimating(true);
      setCurrent((index + images.length) % images.length);
      setTimeout(() => setAnimating(false), 500);
    },
    [animating, images.length]
  );

  const prev = () => go(current - 1);
  const next = useCallback(() => go(current + 1), [current, go]);

  useEffect(() => {
    if (!autoPlay || images.length <= 1) return;
    const timer = setInterval(next, autoPlayInterval);
    return () => clearInterval(timer);
  }, [autoPlay, autoPlayInterval, next, images.length]);

  if (!images || images.length === 0) return null;

  return (
    <div className={`relative rounded-2xl overflow-hidden shadow-2xl aspect-video ${className}`}>
      {/* Slides */}
      {images.map((img, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-500"
          style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}
        >
          <img
            src={img.src}
            alt={img.alt}
            className="w-full h-full object-cover"
          />
          {/* subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        </div>
      ))}

      {/* Prev / Next buttons */}
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Foto anterior"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/70 text-white rounded-full p-2 transition-all duration-200 backdrop-blur-sm"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            aria-label="Próxima foto"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/70 text-white rounded-full p-2 transition-all duration-200 backdrop-blur-sm"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                aria-label={`Ir para foto ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === current
                    ? "bg-white w-6 h-2"
                    : "bg-white/50 w-2 h-2 hover:bg-white/80"
                }`}
              />
            ))}
          </div>

          {/* Counter */}
          <div className="absolute top-4 right-4 z-10 bg-black/40 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
            {current + 1} / {images.length}
          </div>
        </>
      )}
    </div>
  );
};

export default ImageCarousel;
