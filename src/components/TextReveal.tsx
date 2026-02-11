import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface TextRevealProps {
  children: string;
  className?: string;
}

export default function TextReveal({ children, className = "" }: TextRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const chars = children.split("");

  return (
    <span ref={ref} className={className} style={{ display: "inline" }}>
      {chars.map((char, i) => (
        <span
          key={`${i}-${char}`}
          style={{
            display: "inline-block",
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(8px)",
            transition: `opacity 0.3s ease ${i * 0.02}s, transform 0.3s ease ${i * 0.02}s`,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

export function TextRevealHighlight({ children, className = "" }: { children: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const chars = children.split("");

  return (
    <span ref={ref} className={`gradient-text ${className}`} style={{ display: "inline" }}>
      {chars.map((char, i) => (
        <span
          key={`${i}-${char}`}
          style={{
            display: "inline-block",
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0)" : "translateY(8px)",
            transition: `opacity 0.3s ease ${i * 0.02}s, transform 0.3s ease ${i * 0.02}s`,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}
