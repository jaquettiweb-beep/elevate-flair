import { useEffect, useRef } from "react";

export function useScrollAnimation(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px", ...options }
    );

    // Observe all children with the class
    const children = el.querySelectorAll(".animate-on-scroll, .animate-on-scroll-3d");
    children.forEach((child) => observer.observe(child));

    return () => observer.disconnect();
  }, []);

  return ref;
}

export function useScrollProgress() {
  useEffect(() => {
    let rafId = 0;
    let cachedDocHeight = 0;
    let lastWidth = "";

    const recalcHeight = () => {
      cachedDocHeight = document.documentElement.scrollHeight - window.innerHeight;
    };

    // Cache doc height on resize instead of every scroll
    recalcHeight();
    const ro = new ResizeObserver(recalcHeight);
    ro.observe(document.documentElement);

    const handleScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        const bar = document.getElementById("scroll-progress");
        if (!bar) return;
        const percent = cachedDocHeight > 0 ? (window.scrollY / cachedDocHeight) * 100 : 0;
        const w = `${percent}%`;
        if (w !== lastWidth) {
          bar.style.width = w;
          lastWidth = w;
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      ro.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);
}
