"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import DottedMap from "dotted-map";
import Image from "next/image";
import { useTheme } from "next-themes";

interface MapProps {
  dots?: Array<{
    start: { lat: number; lng: number; label?: string };
    end: { lat: number; lng: number; label?: string };
  }>;
  lineColor?: string;
}

export function WorldMap({
  dots = [{
            start: { lat: -15.793889, lng: -47.882778, label: "Brasil" },
            end: { lat: 38.89511, lng: -77.03637, label: "Estados Unidos" }
          },
          {
            start: { lat: 38.89511, lng: -77.03637, label: "Estados Unidos" },
            end: { lat: 45.4215, lng: -75.6996, label: "Canadá" }
          },
          {
            start: { lat: 45.4215, lng: -75.6996, label: "Canadá" },
            end: { lat: 51.5074, lng: -0.1278, label: "Reino Unido" }
          },
          {
            start: { lat: 51.5074, lng: -0.1278, label: "Reino Unido" },
            end: { lat: 48.8566, lng: 2.3522, label: "França" }
          },
          {
            start: { lat: 48.8566, lng: 2.3522, label: "França" },
            end: { lat: 52.52, lng: 13.405, label: "Alemanha" }
          },
          {
            start: { lat: 52.52, lng: 13.405, label: "Alemanha" },
            end: { lat: 41.9028, lng: 12.4964, label: "Itália" }
          },
          {
            start: { lat: 41.9028, lng: 12.4964, label: "Itália" },
            end: { lat: 35.6895, lng: 139.6917, label: "Japão" }
          },
          {
            start: { lat: 35.6895, lng: 139.6917, label: "Japão" },
            end: { lat: 39.9042, lng: 116.4074, label: "China" }
          },
          {
            start: { lat: 39.9042, lng: 116.4074, label: "China" },
            end: { lat: -35.2809, lng: 149.13, label: "Austrália" }
          },
          {
            start: { lat: -35.2809, lng: 149.13, label: "Austrália" },
            end: { lat: 28.6139, lng: 77.209, label: "Índia" }
          },
          {
            start: { lat: 28.6139, lng: 77.209, label: "Índia" },
            end: { lat: 55.7558, lng: 37.6173, label: "Rússia" }
          },
          {
            start: { lat: 55.7558, lng: 37.6173, label: "Rússia" },
            end: { lat: -25.7461, lng: 28.1881, label: "África do Sul" }
          },
          {
            start: { lat: -25.7461, lng: 28.1881, label: "África do Sul" },
            end: { lat: 19.4326, lng: -99.1332, label: "México" }
          },
          {
            start: { lat: 19.4326, lng: -99.1332, label: "México" },
            end: { lat: -34.6037, lng: -58.3816, label: "Argentina" }
          },
          {
            start: { lat: -34.6037, lng: -58.3816, label: "Argentina" },
            end: { lat: 30.0444, lng: 31.2357, label: "Egito" }
          },
          {
            start: { lat: 30.0444, lng: 31.2357, label: "Egito" },
            end: { lat: 37.5665, lng: 126.978, label: "Coreia do Sul" }
          },
          {
            start: { lat: 37.5665, lng: 126.978, label: "Coreia do Sul" },
            end: { lat: -6.2088, lng: 106.8456, label: "Indonésia" }
          },
          {
            start: { lat: -6.2088, lng: 106.8456, label: "Indonésia" },
            end: { lat: 39.9208, lng: 32.8541, label: "Turquia" }
          }],
  lineColor = "#0ea5e9",
}: MapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const map = new DottedMap({ height: 100, grid: "diagonal" });

  const { theme } = useTheme();

  const svgMap = map.getSVG({
    radius: 0.22,
    color: theme === "dark" ? "#FFFFFF40" : "#00000040",
    shape: "circle",
    backgroundColor: theme === "dark" ? "black" : "white",
  });

  const projectPoint = (lat: number, lng: number) => {
    const x = (lng + 180) * (800 / 360);
    const y = (90 - lat) * (400 / 180);
    return { x, y };
  };

  const createCurvedPath = (
    start: { x: number; y: number },
    end: { x: number; y: number }
  ) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 50;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  return (
    <div className="w-full aspect-[2/1] dark:bg-black rgba(0,0,0,0.1) rounded-lg  relative font-sans">
      <Image
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="h-full w-full [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)] pointer-events-none select-none"
        alt="world map"
        height="495"
        width="1056"
        draggable={false}
      />
      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        className="w-full h-full absolute inset-0 pointer-events-none select-none"
      >
        {dots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng);
          const endPoint = projectPoint(dot.end.lat, dot.end.lng);
          return (
            <g key={`path-group-${i}`}>
              <motion.path
                d={createCurvedPath(startPoint, endPoint)}
                fill="none"
                stroke="url(#path-gradient)"
                strokeWidth="1"
                initial={{
                  pathLength: 0,
                }}
                animate={{
                  pathLength: 1,
                }}
                transition={{
                  duration: 1,
                  delay: 0.5 * i,
                  ease: "easeOut",
                }}
                key={`start-upper-${i}`}
              ></motion.path>
            </g>
          );
        })}

        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="5%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="95%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>

        {dots.map((dot, i) => (
          <g key={`points-group-${i}`}>
            <g key={`start-${i}`}>
              <circle
                cx={projectPoint(dot.start.lat, dot.start.lng).x}
                cy={projectPoint(dot.start.lat, dot.start.lng).y}
                r="2"
                fill={lineColor}
              />
              <circle
                cx={projectPoint(dot.start.lat, dot.start.lng).x}
                cy={projectPoint(dot.start.lat, dot.start.lng).y}
                r="2"
                fill={lineColor}
                opacity="0.5"
              >
                <animate
                  attributeName="r"
                  from="2"
                  to="8"
                  dur="1.5s"
                  begin="0s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  from="0.5"
                  to="0"
                  dur="1.5s"
                  begin="0s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
            <g key={`end-${i}`}>
              <circle
                cx={projectPoint(dot.end.lat, dot.end.lng).x}
                cy={projectPoint(dot.end.lat, dot.end.lng).y}
                r="2"
                fill={lineColor}
              />
              <circle
                cx={projectPoint(dot.end.lat, dot.end.lng).x}
                cy={projectPoint(dot.end.lat, dot.end.lng).y}
                r="2"
                fill={lineColor}
                opacity="0.5"
              >
                <animate
                  attributeName="r"
                  from="2"
                  to="8"
                  dur="1.5s"
                  begin="0s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  from="0.5"
                  to="0"
                  dur="1.5s"
                  begin="0s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          </g>
        ))}
      </svg>
    </div>
  );
}
