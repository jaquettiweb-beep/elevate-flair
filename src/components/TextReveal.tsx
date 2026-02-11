import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

interface TextRevealProps {
  children: string;
  className?: string;
  /** Tag to render — defaults to span */
  as?: "h1" | "h2" | "h3" | "span" | "p";
}

/**
 * Reveals text letter-by-letter as the element scrolls into view.
 * Supports mixed plain text and <span> markup via the `highlight` helper.
 */
export default function TextReveal({
  children,
  className = "",
  as: Tag = "span",
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "start 45%"],
  });

  const chars = children.split("");

  return (
    <Tag ref={ref as any} className={`inline ${className}`}>
      {chars.map((char, i) => (
        <CharReveal
          key={`${char}-${i}`}
          char={char}
          index={i}
          total={chars.length}
          progress={scrollYProgress}
        />
      ))}
    </Tag>
  );
}

function CharReveal({
  char,
  index,
  total,
  progress,
}: {
  char: string;
  index: number;
  total: number;
  progress: any;
}) {
  // Each char reveals at a staggered point within the scroll progress
  const start = index / total;
  const end = Math.min(start + 0.4, 1);

  const opacity = useTransform(progress, [start, end], [0, 1]);
  const y = useTransform(progress, [start, end], [12, 0]);
  const blur = useTransform(progress, [start, end], [4, 0]);
  const filter = useTransform(blur, (v) => (v > 0.1 ? `blur(${v}px)` : "none"));

  return (
    <motion.span
      style={{ opacity, y, filter, display: "inline-block", willChange: "transform, opacity, filter" }}
      className="whitespace-pre"
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  );
}

/**
 * A highlighted variant that wraps children in gradient text.
 * Use inside section titles: <TextRevealHighlight>Flipper</TextRevealHighlight>
 */
export function TextRevealHighlight({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "start 45%"],
  });

  const chars = children.split("");

  return (
    <span ref={ref} className={`gradient-text inline ${className}`}>
      {chars.map((char, i) => (
        <CharReveal
          key={`${char}-${i}`}
          char={char}
          index={i}
          total={chars.length}
          progress={scrollYProgress}
        />
      ))}
    </span>
  );
}
