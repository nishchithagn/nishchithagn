import React, { useState, useEffect } from 'react';

interface GlitchedTextProps {
  text: string;
  className?: string;
  speed?: number; // frequency of glitches in ms
  glitchActive?: boolean;
}

export const GlitchedText: React.FC<GlitchedTextProps> = ({
  text,
  className = '',
  speed = 3000,
  glitchActive = true
}) => {
  const [isGlitched, setIsGlitched] = useState(false);

  useEffect(() => {
    if (!glitchActive) return;

    const interval = setInterval(() => {
      setIsGlitched(true);
      setTimeout(() => {
        setIsGlitched(false);
      }, 250 + Math.random() * 200); // glitch duration
    }, speed + Math.random() * 1500);

    return () => clearInterval(interval);
  }, [speed, glitchActive]);

  if (!isGlitched) {
    return <span className={`${className} transition-all duration-100`}>{text}</span>;
  }

  return (
    <span className={`relative inline-block select-none ${className}`}>
      {/* Gold Layer Offset */}
      <span 
        className="absolute left-[-1px] top-0 text-[#C5A059] opacity-70 mix-blend-screen glitch-offset-cyan"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% 33%, 0 33%)',
          animation: 'glitch-skew 0.3s infinite linear alternate-reverse'
        }}
      >
        {text}
      </span>
      
      {/* Soft White Layer Offset */}
      <span 
        className="absolute left-[1.5px] top-[-0.5px] text-[#ffffff] opacity-60 mix-blend-screen glitch-offset-magenta"
        style={{
          clipPath: 'polygon(0 67%, 100% 67%, 100% 100%, 0 100%)',
          animation: 'glitch-skew 0.2s infinite linear alternate-reverse'
        }}
      >
        {text}
      </span>

      {/* Main Base Text */}
      <span className="relative z-10 text-white animate-pulse">
        {text}
      </span>
    </span>
  );
};

export default GlitchedText;
