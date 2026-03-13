import React, { useState, useRef, useEffect, useCallback, CSSProperties } from 'react';

export interface Testimonial {
  id: string | number;
  initials: string;
  name: string;
  role: string;
  quote: string;
  tags: { text: string; type: 'featured' | 'default' }[];
  stats: { icon: React.ComponentType<Record<string, unknown>>; text: string }[];
  avatarGradient: string;
  avatarUrl?: string;
}

export interface TestimonialStackProps {
  testimonials: Testimonial[];
  visibleBehind?: number;
}

export const TestimonialStack = ({ testimonials, visibleBehind = 2 }: TestimonialStackProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const dragStartRef = useRef(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const totalCards = testimonials.length;

  const navigate = useCallback((newIndex: number) => {
    setActiveIndex((newIndex + totalCards) % totalCards);
  }, [totalCards]);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent, index: number) => {
    if (index !== activeIndex) return;
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    dragStartRef.current = clientX;
  };

  const handleDragMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setDragOffset(clientX - dragStartRef.current);
  }, [isDragging]);

  const handleDragEnd = useCallback(() => {
    if (!isDragging) return;
    if (Math.abs(dragOffset) > 50) {
      navigate(activeIndex + (dragOffset < 0 ? 1 : -1));
    }
    setIsDragging(false);
    setDragOffset(0);
  }, [isDragging, dragOffset, activeIndex, navigate]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleDragMove);
      window.addEventListener('touchmove', handleDragMove);
      window.addEventListener('mouseup', handleDragEnd);
      window.addEventListener('touchend', handleDragEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleDragMove);
      window.removeEventListener('touchmove', handleDragMove);
      window.removeEventListener('mouseup', handleDragEnd);
      window.removeEventListener('touchend', handleDragEnd);
    };
  }, [isDragging, handleDragMove, handleDragEnd]);

  if (!testimonials?.length) return null;

  return (
    <div className="testimonial-stack-container">
      {testimonials.map((testimonial, index) => {
        const displayOrder = (index - activeIndex + totalCards) % totalCards;

        const style: CSSProperties = {};
        if (displayOrder === 0) {
          style.transform = `translateX(${dragOffset}px)`;
          style.opacity = 1;
          style.zIndex = totalCards;
        } else if (displayOrder <= visibleBehind) {
          const scale = 1 - 0.05 * displayOrder;
          const translateY = -2 * displayOrder;
          style.transform = `scale(${scale}) translateY(${translateY}rem)`;
          style.opacity = 1 - 0.2 * displayOrder;
          style.zIndex = totalCards - displayOrder;
        } else {
          style.transform = 'scale(0)';
          style.opacity = 0;
          style.zIndex = 0;
        }

        const tagClasses = (type: 'featured' | 'default') =>
          type === 'featured'
            ? 'bg-primary/20 text-primary border border-primary/30'
            : 'bg-white/5 text-white/60 border border-white/10';

        return (
          <div
            ref={(el) => (cardRefs.current[index] = el)}
            key={testimonial.id}
            className="testimonial-card glass-effect backdrop-blur-xl"
            style={style}
            onMouseDown={(e) => handleDragStart(e, index)}
            onTouchStart={(e) => handleDragStart(e, index)}
          >
            <div className="testimonial-card-inner">
              <div className="testimonial-header">
                <div className="testimonial-author">
                  <div
                    className="testimonial-avatar"
                    style={{ background: testimonial.avatarGradient, overflow: 'hidden' }}
                  >
                    {testimonial.avatarUrl ? (
                      <img src={testimonial.avatarUrl} alt={testimonial.name} className="w-full h-full object-cover rounded-full" />
                    ) : (
                      testimonial.initials
                    )}
                  </div>
                  <div className="testimonial-author-info">
                    <p className="testimonial-name">{testimonial.name}</p>
                    <p className="testimonial-role">{testimonial.role}</p>
                  </div>
                </div>
              </div>

              <p className="testimonial-quote">"{testimonial.quote}"</p>

              <div className="testimonial-footer">
                <div className="testimonial-tags">
                  {testimonial.tags.map((tag, i) => (
                    <span key={i} className={`testimonial-tag ${tagClasses(tag.type)}`}>
                      {tag.text}
                    </span>
                  ))}
                </div>
                <div className="testimonial-stats">
                  {testimonial.stats.map((stat, i) => {
                    const IconComponent = stat.icon;
                    return (
                      <span key={i} className="testimonial-stat">
                        <IconComponent size={14} className="opacity-60" />
                        {stat.text}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <div className="testimonial-pagination">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => navigate(index)}
            className={`pagination-dot ${activeIndex === index ? 'active' : ''}`}
          />
        ))}
      </div>
    </div>
  );
};
