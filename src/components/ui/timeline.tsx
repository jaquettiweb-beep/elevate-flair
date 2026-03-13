"use client";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full font-sans md:px-10" ref={containerRef}>
      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <motion.div
            key={index}
            className="flex justify-start pt-10 md:pt-40 md:gap-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ type: "spring", stiffness: 60, damping: 18, delay: 0.1 }}
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full flex items-center justify-center"
                style={{
                  background: "hsla(215,80%,12%,1)",
                  boxShadow: "0 0 0 4px hsla(215,80%,12%,1), 0 0 12px hsla(24,95%,53%,0.15)",
                }}
              >
                <div
                  className="h-4 w-4 rounded-full"
                  style={{
                    background: "linear-gradient(135deg, hsl(24,95%,53%), hsl(15,90%,50%))",
                    boxShadow: "0 0 8px hsla(24,95%,53%,0.4)",
                  }}
                />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-secondary drop-shadow-sm">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-secondary">
                {item.title}
              </h3>
              {item.content}
            </div>
          </motion.div>
        ))}
        <div
          style={{ height: height + "px" }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          {/* Track */}
          <div className="absolute inset-0 w-full" style={{ background: "hsla(0,0%,100%,0.08)" }} />
          {/* Progress */}
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] rounded-full"
          >
            <div
              className="w-full h-full"
              style={{
                background: "linear-gradient(to bottom, hsl(24,95%,53%), hsla(24,95%,53%,0.3), transparent)",
              }}
            />
            {/* Glow tip */}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-6"
              style={{
                background: "radial-gradient(ellipse, hsla(24,95%,53%,0.6), transparent)",
                filter: "blur(3px)",
              }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};
