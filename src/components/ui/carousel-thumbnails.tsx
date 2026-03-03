import { Carousel } from "@ark-ui/react/carousel";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface ThumbnailCarouselProps {
  images: { full: string; thumb: string; alt: string }[];
}

export default function ThumbnailCarousel({ images }: ThumbnailCarouselProps) {
  return (
    <Carousel.Root
      defaultPage={0}
      slideCount={images.length}
      className="w-full max-w-4xl mx-auto"
    >
      <Carousel.ItemGroup className="overflow-hidden rounded-xl">
        {images.map((image, index) => (
          <Carousel.Item key={index} index={index}>
            <img
              src={image.full}
              alt={image.alt}
              className="w-full h-[60vh] object-cover"
              loading="lazy"
            />
          </Carousel.Item>
        ))}
      </Carousel.ItemGroup>

      <div className="flex items-center gap-3 mt-4">
        <Carousel.PrevTrigger className="shrink-0 p-2 rounded-full bg-muted hover:bg-accent text-muted-foreground hover:text-accent-foreground transition-colors">
          <ChevronLeft size={20} />
        </Carousel.PrevTrigger>

        <Carousel.IndicatorGroup className="flex gap-2 overflow-x-auto flex-1 justify-center py-1">
          {images.map((image, index) => (
            <Carousel.Indicator
              key={index}
              index={index}
              className="shrink-0 rounded-md overflow-hidden border-2 border-transparent data-[current]:border-primary transition-all cursor-pointer opacity-60 data-[current]:opacity-100"
            >
              <img
                src={image.thumb}
                alt={image.alt}
                className="w-20 h-14 object-cover"
                loading="lazy"
              />
            </Carousel.Indicator>
          ))}
        </Carousel.IndicatorGroup>

        <Carousel.NextTrigger className="shrink-0 p-2 rounded-full bg-muted hover:bg-accent text-muted-foreground hover:text-accent-foreground transition-colors">
          <ChevronRight size={20} />
        </Carousel.NextTrigger>
      </div>
    </Carousel.Root>
  );
}
