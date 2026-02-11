import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

/* ─── SVG Gym Icons ─── */

export function DumbbellIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="22" width="8" height="20" rx="2" fill="currentColor" />
      <rect x="48" y="22" width="8" height="20" rx="2" fill="currentColor" />
      <rect x="2" y="26" width="6" height="12" rx="2" fill="currentColor" />
      <rect x="56" y="26" width="6" height="12" rx="2" fill="currentColor" />
      <rect x="16" y="29" width="32" height="6" rx="1.5" fill="currentColor" />
    </svg>
  );
}

export function KettlebellIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M24 18C24 12 28 8 32 8C36 8 40 12 40 18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" />
      <ellipse cx="32" cy="40" rx="16" ry="18" fill="currentColor" />
      <circle cx="32" cy="38" r="6" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

export function SwimGoggleIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="20" cy="32" rx="12" ry="10" stroke="currentColor" strokeWidth="3" fill="none" />
      <ellipse cx="44" cy="32" rx="12" ry="10" stroke="currentColor" strokeWidth="3" fill="none" />
      <path d="M32 30C30 28 34 28 32 30" stroke="currentColor" strokeWidth="2.5" />
      <path d="M8 28C4 26 4 24 8 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M56 28C60 26 60 24 56 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function SwimCapIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 38C12 22 22 12 32 12C42 12 52 22 52 38" fill="currentColor" />
      <path d="M10 38C10 38 16 42 32 42C48 42 54 38 54 38" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M18 20C22 16 26 14 32 14" stroke="currentColor" strokeWidth="1.5" opacity="0.3" strokeLinecap="round" />
    </svg>
  );
}

export function BoxingGloveIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M16 24C16 16 22 10 30 10H34C42 10 46 16 46 24V32C46 40 40 48 32 48H28C20 48 16 40 16 32V24Z" fill="currentColor" />
      <path d="M46 28C50 28 52 30 52 34C52 38 50 40 46 40" fill="currentColor" />
      <rect x="20" y="48" width="22" height="8" rx="3" fill="currentColor" opacity="0.7" />
      <path d="M22 26H40" stroke="currentColor" strokeWidth="2" opacity="0.3" strokeLinecap="round" />
      <path d="M22 32H38" stroke="currentColor" strokeWidth="2" opacity="0.3" strokeLinecap="round" />
    </svg>
  );
}

export function WaterWaveIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M4 28C10 22 18 22 24 28C30 34 38 34 44 28C50 22 58 22 64 28" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M4 38C10 32 18 32 24 38C30 44 38 44 44 38C50 32 58 32 64 38" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.6" />
      <path d="M4 48C10 42 18 42 24 48C30 54 38 54 44 48C50 42 58 42 64 48" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.3" />
    </svg>
  );
}

export function YogaPoseIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="12" r="6" fill="currentColor" />
      <path d="M32 18V36" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M32 36L20 52" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M32 36L44 52" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M18 26L32 24L46 26" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function JumpRopeIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="6" width="8" height="14" rx="3" fill="currentColor" />
      <rect x="46" y="6" width="8" height="14" rx="3" fill="currentColor" />
      <path d="M14 20C14 40 24 54 32 54C40 54 50 40 50 20" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

/* ─── Floating Decorator Component ─── */

interface FloatingGymIconProps {
  icon: ReactNode;
  x: string;
  y: string;
  size?: number;
  rotate?: number;
  delay?: number;
  duration?: number;
  color?: string;
  parallaxRange?: [string, string];
}

export function FloatingGymIcon({
  icon,
  x,
  y,
  size = 48,
  rotate = 0,
  delay = 0,
  duration = 12,
  color = "hsl(var(--primary))",
  parallaxRange,
}: FloatingGymIconProps) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      className="absolute pointer-events-none select-none"
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        color,
        rotate: `${rotate}deg`,
      }}
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: delay + 0.3, duration: 0.6, type: "spring", stiffness: 150 }}
    >
      <motion.div
        animate={{
          y: [0, -12, 0],
          rotate: [0, rotate > 0 ? 8 : -8, 0],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        }}
      >
        {icon}
      </motion.div>
    </motion.div>
  );
}

/* ─── Section Decorator Presets ─── */

export function GymDecorWhyFlipper() {
  return (
    <>
      <FloatingGymIcon icon={<DumbbellIcon className="w-full h-full" />} x="5%" y="15%" size={56} rotate={-20} delay={0} color="hsla(221,83%,53%,0.07)" duration={14} />
      <FloatingGymIcon icon={<KettlebellIcon className="w-full h-full" />} x="90%" y="70%" size={44} rotate={15} delay={0.5} color="hsla(24,95%,53%,0.07)" duration={11} />
      <FloatingGymIcon icon={<JumpRopeIcon className="w-full h-full" />} x="85%" y="10%" size={40} rotate={10} delay={1} color="hsla(221,83%,53%,0.05)" duration={13} />
    </>
  );
}

export function GymDecorModalities() {
  return (
    <>
      <FloatingGymIcon icon={<SwimGoggleIcon className="w-full h-full" />} x="3%" y="20%" size={52} rotate={-10} delay={0.2} color="hsla(200,100%,55%,0.08)" duration={15} />
      <FloatingGymIcon icon={<SwimCapIcon className="w-full h-full" />} x="92%" y="15%" size={44} rotate={12} delay={0.6} color="hsla(200,100%,55%,0.06)" duration={12} />
      <FloatingGymIcon icon={<WaterWaveIcon className="w-full h-full" />} x="88%" y="75%" size={60} rotate={0} delay={0.3} color="hsla(200,80%,60%,0.06)" duration={10} />
      <FloatingGymIcon icon={<BoxingGloveIcon className="w-full h-full" />} x="6%" y="80%" size={40} rotate={-15} delay={0.8} color="hsla(0,70%,50%,0.06)" duration={13} />
    </>
  );
}

export function GymDecorStats() {
  return (
    <>
      <FloatingGymIcon icon={<DumbbellIcon className="w-full h-full" />} x="8%" y="20%" size={64} rotate={-25} delay={0} color="hsla(0,0%,100%,0.04)" duration={16} />
      <FloatingGymIcon icon={<YogaPoseIcon className="w-full h-full" />} x="85%" y="25%" size={56} rotate={0} delay={0.4} color="hsla(0,0%,100%,0.04)" duration={14} />
      <FloatingGymIcon icon={<KettlebellIcon className="w-full h-full" />} x="50%" y="10%" size={40} rotate={20} delay={0.8} color="hsla(0,0%,100%,0.03)" duration={12} />
    </>
  );
}

export function GymDecorTestimonials() {
  return (
    <>
      <FloatingGymIcon icon={<SwimGoggleIcon className="w-full h-full" />} x="92%" y="20%" size={48} rotate={8} delay={0.3} color="hsla(221,83%,53%,0.06)" duration={14} />
      <FloatingGymIcon icon={<DumbbellIcon className="w-full h-full" />} x="4%" y="60%" size={52} rotate={-18} delay={0.6} color="hsla(221,83%,53%,0.05)" duration={16} />
    </>
  );
}

export function GymDecorCTA() {
  return (
    <>
      <FloatingGymIcon icon={<DumbbellIcon className="w-full h-full" />} x="5%" y="15%" size={72} rotate={-30} delay={0} color="hsla(0,0%,100%,0.06)" duration={18} />
      <FloatingGymIcon icon={<SwimCapIcon className="w-full h-full" />} x="88%" y="20%" size={56} rotate={15} delay={0.5} color="hsla(0,0%,100%,0.05)" duration={14} />
      <FloatingGymIcon icon={<BoxingGloveIcon className="w-full h-full" />} x="80%" y="70%" size={48} rotate={-10} delay={1} color="hsla(0,0%,100%,0.04)" duration={12} />
      <FloatingGymIcon icon={<JumpRopeIcon className="w-full h-full" />} x="12%" y="75%" size={44} rotate={20} delay={0.7} color="hsla(0,0%,100%,0.04)" duration={15} />
    </>
  );
}

export function GymDecorFooter() {
  return (
    <>
      <FloatingGymIcon icon={<WaterWaveIcon className="w-full h-full" />} x="90%" y="10%" size={60} rotate={0} delay={0} color="hsla(0,0%,100%,0.03)" duration={20} />
      <FloatingGymIcon icon={<KettlebellIcon className="w-full h-full" />} x="5%" y="70%" size={48} rotate={-12} delay={0.5} color="hsla(0,0%,100%,0.03)" duration={16} />
    </>
  );
}
