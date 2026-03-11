"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { ArrowRight, Link, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

const RADIUS = 190;

export default function RadialOrbitalTimeline({
  timelineData,
}: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const angleRef = useRef(0);
  const autoRotateRef = useRef(true);
  const rafRef = useRef<number>(0);
  const nodeElsRef = useRef<(HTMLDivElement | null)[]>([]);

  const handleContainerClick = useCallback((e: React.MouseEvent) => {
    if (e.target === containerRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      autoRotateRef.current = true;
    }
  }, []);

  // Single rAF loop that positions all nodes via DOM
  useEffect(() => {
    let lastTime = performance.now();
    const total = timelineData.length;

    const animate = (now: number) => {
      const delta = now - lastTime;
      lastTime = now;

      if (autoRotateRef.current) {
        angleRef.current = (angleRef.current + delta * 0.012) % 360;
      }

      for (let i = 0; i < total; i++) {
        const el = nodeElsRef.current[i];
        if (!el) continue;
        const baseAngle = (i / total) * 360 - 90;
        const angle = baseAngle + angleRef.current;
        const radian = (angle * Math.PI) / 180;
        const x = RADIUS * Math.cos(radian);
        const y = RADIUS * Math.sin(radian);
        el.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [timelineData.length]);

  const centerViewOnNode = useCallback((nodeId: number) => {
    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const baseAngle = (nodeIndex / totalNodes) * 360 - 90;
    // Snap so that the clicked node is at the top (angle = -90 → top)
    angleRef.current = (-baseAngle) % 360;
  }, [timelineData]);

  const toggleItem = useCallback((id: number) => {
    setExpandedItems((prev) => {
      const willExpand = !prev[id];
      const newState: Record<number, boolean> = {};
      newState[id] = willExpand;

      if (willExpand) {
        setActiveNodeId(id);
        autoRotateRef.current = false;
        const currentItem = timelineData.find((item) => item.id === id);
        const newPulse: Record<number, boolean> = {};
        currentItem?.relatedIds.forEach((relId) => { newPulse[relId] = true; });
        setPulseEffect(newPulse);
        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        autoRotateRef.current = true;
        setPulseEffect({});
      }

      return newState;
    });
  }, [timelineData, centerViewOnNode]);

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    const currentItem = timelineData.find((item) => item.id === activeNodeId);
    return currentItem?.relatedIds.includes(itemId) ?? false;
  };

  const getStatusStyles = (status: TimelineItem["status"]): string => {
    switch (status) {
      case "completed":
        return "text-primary-foreground bg-primary border-primary";
      case "in-progress":
        return "text-secondary-foreground bg-secondary border-secondary";
      case "pending":
        return "text-muted-foreground bg-muted border-muted";
      default:
        return "text-muted-foreground bg-muted border-muted";
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full flex items-center justify-center overflow-hidden"
      style={{ minHeight: "520px" }}
      onClick={handleContainerClick}
    >
      <div className="relative" style={{ width: "460px", height: "460px" }}>
        {/* Orbit ring */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="rounded-full border border-white/[0.08]"
            style={{ width: RADIUS * 2 + 20, height: RADIUS * 2 + 20 }}
          />
        </div>

        {/* Center element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="w-14 h-14 rounded-full bg-secondary/90 flex items-center justify-center shadow-md shadow-secondary/20">
            <Zap className="w-6 h-6 text-secondary-foreground" />
          </div>
        </div>

        {/* Nodes — positioned by rAF, always upright */}
        {timelineData.map((item, index) => {
          const isExpanded = expandedItems[item.id];
          const isRelated = isRelatedToActive(item.id);
          const isPulsing = pulseEffect[item.id];
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              ref={(el) => { nodeElsRef.current[index] = el; }}
              className="absolute cursor-pointer"
              style={{
                left: "50%",
                top: "50%",
                zIndex: isExpanded ? 200 : 10,
                willChange: "transform",
              }}
              onClick={(e) => {
                e.stopPropagation();
                toggleItem(item.id);
              }}
            >
              <div className="flex flex-col items-center -translate-x-1/2 -translate-y-1/2">
                {/* Pulse ring */}
                {(isPulsing || isRelated) && (
                  <div className="absolute w-14 h-14 -translate-x-1 -translate-y-1 rounded-full border-2 border-secondary animate-ping" />
                )}

                {/* Node circle */}
                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center border-2 transition-colors duration-300 backdrop-blur-lg ${
                    isExpanded
                      ? "bg-secondary border-secondary shadow-lg shadow-secondary/40"
                      : isRelated
                      ? "bg-primary/80 border-primary"
                      : "bg-card/80 border-border hover:border-primary"
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isExpanded ? "text-secondary-foreground" : "text-foreground"}`} />
                </div>

                {/* Label */}
                <div
                  className={`mt-2 whitespace-nowrap text-xs font-medium ${
                    isExpanded ? "text-secondary font-bold" : "text-muted-foreground"
                  }`}
                >
                  {item.title}
                </div>

                {/* Expanded card */}
                {isExpanded && (
                  <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50">
                    <Card className="w-72 bg-card/95 backdrop-blur-lg border-border shadow-2xl">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <Badge className={getStatusStyles(item.status)} variant="outline">
                            {item.status === "completed"
                              ? "CONCLUÍDO"
                              : item.status === "in-progress"
                              ? "EM ANDAMENTO"
                              : "PENDENTE"}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{item.date}</span>
                        </div>
                        <CardTitle className="text-base text-foreground mt-2">{item.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">{item.content}</p>

                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Zap className="w-3 h-3 text-secondary" />
                            Nível de Energia
                          </div>
                          <span className="text-xs font-bold text-foreground">{item.energy}%</span>
                        </div>

                        <div className="w-full bg-muted rounded-full h-1.5 mb-4">
                          <div
                            className="bg-gradient-to-r from-primary to-secondary h-1.5 rounded-full"
                            style={{ width: `${item.energy}%` }}
                          />
                        </div>

                        {item.relatedIds.length > 0 && (
                          <div className="border-t border-border pt-3">
                            <div className="flex items-center gap-1 mb-2">
                              <Link className="w-3 h-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">Conexões</span>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {item.relatedIds.map((relatedId) => {
                                const relatedItem = timelineData.find((i) => i.id === relatedId);
                                return (
                                  <Button
                                    key={relatedId}
                                    variant="outline"
                                    size="sm"
                                    className="text-xs h-7 bg-muted/50 border-border text-foreground hover:bg-primary hover:text-primary-foreground"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleItem(relatedId);
                                    }}
                                  >
                                    {relatedItem?.title}
                                    <ArrowRight className="w-3 h-3 ml-1" />
                                  </Button>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
