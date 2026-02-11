import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

interface TextRevealProps {
  children: string;
  className?: string;
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.025,
    },
  },
};

const charVariants: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

/**
 * Reveals text letter-by-letter when scrolled into view.
 */
export default function TextReveal({ children, className = "" }: TextRevealProps) {
  const chars = children.split("");

  return (
    <motion.span
      className={`inline-flex flex-wrap ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {chars.map((char, i) => (
        <motion.span
          key={`${i}-${char}`}
          variants={charVariants}
          className="inline-block whitespace-pre"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

/**
 * Highlighted variant with gradient text.
 */
export function TextRevealHighlight({ children, className = "" }: { children: string; className?: string }) {
  const chars = children.split("");

  return (
    <motion.span
      className={`gradient-text inline-flex flex-wrap ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {chars.map((char, i) => (
        <motion.span
          key={`${i}-${char}`}
          variants={charVariants}
          className="inline-block whitespace-pre"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}
