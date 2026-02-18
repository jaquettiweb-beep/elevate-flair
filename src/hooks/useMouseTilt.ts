import { useRef, useCallback, useState } from "react";

interface TiltStyle {
  rotateX: number;
  rotateY: number;
  scale: number;
}

export function useMouseTilt(intensity = 8) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<TiltStyle>({ rotateX: 0, rotateY: 0, scale: 1 });

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setStyle({
      rotateY: x * intensity,
      rotateX: -y * intensity,
      scale: 1.03,
    });
  }, [intensity]);

  const onMouseLeave = useCallback(() => {
    setStyle({ rotateX: 0, rotateY: 0, scale: 1 });
  }, []);

  return { ref, style, onMouseMove, onMouseLeave };
}
