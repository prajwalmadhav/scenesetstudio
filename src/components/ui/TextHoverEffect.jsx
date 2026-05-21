"use client";
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

export const TextHoverEffect = ({ text, duration = 0 }) => {
  const svgRef = useRef(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  useEffect(() => {
    if (svgRef.current && cursor.x !== null && cursor.y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      });
    }
  }, [cursor]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 300 100"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      style={{ userSelect: "none" }}
    >
      <defs>
        <linearGradient id="textGradient" gradientUnits="userSpaceOnUse">
          {hovered && (
            <>
              <stop offset="0%"   stopColor="rgb(234 179 8)" />
              <stop offset="25%"  stopColor="rgb(239 68 68)" />
              <stop offset="50%"  stopColor="rgb(59 130 246)" />
              <stop offset="75%"  stopColor="rgb(6 182 212)" />
              <stop offset="100%" stopColor="rgb(139 92 246)" />
            </>
          )}
        </linearGradient>

        <motion.radialGradient
          id="revealMask"
          gradientUnits="userSpaceOnUse"
          r="20%"
          animate={maskPosition}
          transition={{ duration, ease: "easeOut" }}
        >
          <stop offset="0%"   stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>

        <mask id="textMask">
          <rect x="0" y="0" width="100%" height="100%" fill="url(#revealMask)" />
        </mask>
      </defs>

      {/* Base text — always visible with fill */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        stroke="rgba(242,240,235,0.25)"
        fill="rgba(242,240,235,0.08)"
        style={{
          fontFamily: "var(--font-heading)",
          fontWeight: 800,
          fontSize: "7rem",
        }}
      >
        {text}
      </text>

      {/* Stroke draw-on animation */}
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        stroke="rgba(242,240,235,0.18)"
        fill="transparent"
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{ strokeDashoffset: 0, strokeDasharray: 1000 }}
        transition={{ duration: 4, ease: "easeInOut" }}
        style={{
          fontFamily: "var(--font-heading)",
          fontWeight: 800,
          fontSize: "7rem",
        }}
      >
        {text}
      </motion.text>

      {/* Gradient reveal on hover — masked to cursor position */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke="url(#textGradient)"
        strokeWidth="0.3"
        fill="url(#textGradient)"
        mask="url(#textMask)"
        style={{
          fontFamily: "var(--font-heading)",
          fontWeight: 800,
          fontSize: "7rem",
        }}
      >
        {text}
      </text>
    </svg>
  );
};
