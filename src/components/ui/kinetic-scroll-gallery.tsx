import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, MotionValue } from "framer-motion";

export interface GalleryImage {
  src: string;
  alt: string;
  category?: string;
}

const KineticGridItem = ({ image, scrollVelocity }: { image: GalleryImage; scrollVelocity: MotionValue<number> }) => {
  const smoothedVelocity = useSpring(scrollVelocity, {
    mass: 0.1,
    stiffness: 80,
    damping: 40,
  });

  const skew = useTransform(smoothedVelocity, [-1500, 0, 1500], [-15, 0, 15]);

  return (
    <motion.div className="overflow-hidden rounded-xl" style={{ skewY: skew }}>
      <img
        src={image.src}
        alt={image.alt}
        className="w-full aspect-[4/3] object-cover hover:scale-110 transition-transform duration-700"
        loading="lazy"
      />
    </motion.div>
  );
};

export interface KineticScrollGalleryProps {
  images: GalleryImage[];
  title?: string;
  subtitle?: string;
}

export default function KineticScrollGallery({ images, title, subtitle }: KineticScrollGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  const scrollYVelocity = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 1000],
    { clamp: false }
  );

  return (
    <div ref={containerRef} className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && (
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground">{title}</h2>
            )}
            {subtitle && (
              <p className="text-muted-foreground mt-3 max-w-lg mx-auto">{subtitle}</p>
            )}
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img, index) => (
            <KineticGridItem key={index} image={img} scrollVelocity={scrollYVelocity} />
          ))}
        </div>
      </div>
    </div>
  );
}
