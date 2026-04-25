import { useState, useCallback, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageCarouselProps {
  images: { src: string; alt: string }[];
  className?: string;
  height?: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

type Orientation = "landscape" | "portrait" | "unknown";

const ImageCarousel = ({
  images,
  className = "",
  height = "h-[420px]",
  autoPlay = true,
  autoPlayInterval = 4000,
}: ImageCarouselProps) => {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [orientations, setOrientations] = useState<Record<number, Orientation>>({});
  const imgRefs = useRef<Record<number, HTMLImageElement | null>>({});

  // Detect orientation for each image once loaded
  const handleImageLoad = useCallback((index: number, img: HTMLImageElement) => {
    const orientation: Orientation =
      img.naturalHeight > img.naturalWidth ? "portrait" : "landscape";
    setOrientations((prev) => ({ ...prev, [index]: orientation }));
  }, []);

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

  const currentOrientation = orientations[current] || "unknown";
  const isPortrait = currentOrientation === "portrait";

  return (
    <div
      className={`relative rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 ${className}`}
      style={{
        // Portrait: taller container; Landscape: standard 16:9
        aspectRatio: isPortrait ? "3/4" : "16/9",
        maxHeight: isPortrait ? "600px" : undefined,
        margin: "0 auto",
        maxWidth: isPortrait ? "450px" : undefined,
        background: "#0a0f1a",
      }}
    >
      {/* Slides */}
      {images.map((img, i) => {
        const ori = orientations[i] || "unknown";
        const isImgPortrait = ori === "portrait";

        return (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-500"
            style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}
          >
            <img
              ref={(el) => {
                imgRefs.current[i] = el;
              }}
              src={img.src}
              alt={img.alt}
              onLoad={(e) => handleImageLoad(i, e.currentTarget)}
              className={`w-full h-full transition-transform duration-700 hover:scale-[1.02] ${
                isImgPortrait ? "object-contain" : "object-cover"
              }`}
              style={{
                filter: "contrast(1.08) saturate(1.12) brightness(1.02)",
                transformOrigin: "center",
              }}
            />
            {/* subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
          </div>
        );
      })}

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
