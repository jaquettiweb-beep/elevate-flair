"use client";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, Link as LinkIcon, Zap, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
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
  link?: string;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

export default function RadialOrbitalTimeline({
  timelineData,
}: RadialOrbitalTimelineProps) {
  const navigate = useNavigate();
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>(
    {}
  );
  const [rotationAngle, setRotationAngle] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [centerOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const handleContainerClick = (e: React.MouseEvent) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) {
          newState[parseInt(key)] = false;
        }
      });

      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);

        const relatedItems = getRelatedItems(id);
        const newPulseEffect: Record<number, boolean> = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);

        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return newState;
    });
  };

  useEffect(() => {
    let rotationTimer: ReturnType<typeof setInterval>;

    if (autoRotate) {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => {
          const newAngle = (prev + 0.3) % 360;
          return Number(newAngle.toFixed(3));
        });
      }, 50);
    }

    return () => {
      if (rotationTimer) {
        clearInterval(rotationTimer);
      }
    };
  }, [autoRotate]);

  const centerViewOnNode = (nodeId: number) => {
    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;

    setRotationAngle(270 - targetAngle);
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 300;
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian) + centerOffset.x;
    const y = radius * Math.sin(radian) + centerOffset.y;

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(
      0.4,
      Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2))
    );

    return { x, y, angle, zIndex, opacity };
  };

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    const relatedItems = getRelatedItems(activeNodeId);
    return relatedItems.includes(itemId);
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
      style={{ minHeight: "750px" }}
      onClick={handleContainerClick}
    >
      <div
        ref={orbitRef}
        className="relative"
        style={{ width: "700px", height: "700px" }}
      >
        {/* Orbit rings */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute w-[620px] h-[620px] rounded-full border border-white/10 transition-all duration-1000" />
          <div className="absolute w-[500px] h-[500px] rounded-full border border-white/5" />
          <div className="absolute w-[380px] h-[380px] rounded-full border border-white/5" />
        </div>

        {/* Center element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center shadow-lg shadow-secondary/30">
            <Zap className="w-9 h-9 text-secondary-foreground" />
          </div>
        </div>

        {/* Nodes */}
        {timelineData.map((item, index) => {
          const position = calculateNodePosition(index, timelineData.length);
          const isExpanded = expandedItems[item.id];
          const isRelated = isRelatedToActive(item.id);
          const isPulsing = pulseEffect[item.id];
          const Icon = item.icon;

            const nodeStyle = {
              transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px))`,
              zIndex: isExpanded ? 200 : position.zIndex,
              opacity: isExpanded ? 1 : position.opacity,
            };

          return (
            <div
              key={item.id}
              ref={(el) => (nodeRefs.current[item.id] = el)}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-700 cursor-pointer"
              style={nodeStyle}
              onClick={(e) => {
                e.stopPropagation();
                toggleItem(item.id);
              }}
            >
              {/* Pulse ring */}
              {(isPulsing || isRelated) && (
                <div className="absolute inset-0 -m-2 rounded-full border-2 border-secondary animate-ping" />
              )}

              {/* Node circle */}
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center border-2 transition-all duration-300 backdrop-blur-lg ${
                  isExpanded
                    ? "bg-secondary border-secondary scale-125 shadow-lg shadow-secondary/40"
                    : isRelated
                    ? "bg-primary/80 border-primary scale-110"
                    : "bg-card/80 border-border hover:border-primary hover:scale-110"
                }`}
              >
                <Icon className={`w-7 h-7 ${isExpanded ? "text-secondary-foreground" : "text-foreground"}`} />
              </div>

              {/* Label */}
              <div
                className={`absolute top-18 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm font-medium transition-all duration-300 ${
                  isExpanded ? "text-secondary font-bold" : "text-muted-foreground"
                }`}
              >
                {item.title}
              </div>

              {/* Expanded card */}
              {isExpanded && (
                <div className="absolute top-20 left-1/2 -translate-x-1/2 z-50">
                  <Card className="w-72 bg-card/95 backdrop-blur-lg border-border shadow-2xl">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <Badge
                          className={getStatusStyles(item.status)}
                          variant="outline"
                        >
                          {item.status === "completed"
                            ? "CONCLUÍDO"
                            : item.status === "in-progress"
                            ? "EM ANDAMENTO"
                            : "PENDENTE"}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {item.date}
                        </span>
                      </div>
                      <CardTitle className="text-base text-foreground mt-2">
                        {item.title}
                      </CardTitle>
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
                          className="bg-gradient-to-r from-primary to-secondary h-1.5 rounded-full transition-all duration-1000"
                          style={{ width: `${item.energy}%` }}
                        />
                      </div>

                      {item.relatedIds.length > 0 && (
                        <div className="border-t border-border pt-3">
                          <div className="flex items-center gap-1 mb-2">
                            <LinkIcon className="w-3 h-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">
                              Conexões
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {item.relatedIds.map((relatedId) => {
                              const relatedItem = timelineData.find(
                                (i) => i.id === relatedId
                              );
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
          );
        })}
      </div>
    </div>
  );
}
