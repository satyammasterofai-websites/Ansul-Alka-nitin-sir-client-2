import React, { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { motion } from 'motion/react';

import { ECardSettings } from "../types";

interface Props {
  targetDate: string;
  settings: ECardSettings;
}

export function ScratchCardSection({ targetDate, settings }: Props) {
  const canvasTopRef = useRef<HTMLCanvasElement>(null);
  const canvasMidRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isCanvasReady, setIsCanvasReady] = useState(false);
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);

  // Countdown timer logic
  useEffect(() => {
    if (!isRevealed) return;

    const targetTime = new Date(targetDate).getTime();
    
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetTime - now;

      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [isRevealed, targetDate]);

  // Scratch card logic
  useEffect(() => {
    const canvasTop = canvasTopRef.current;
    const canvasMid = canvasMidRef.current;
    if (!canvasTop || !canvasMid) return;

    const ctxTop = canvasTop.getContext('2d', { willReadFrequently: true });
    const ctxMid = canvasMid.getContext('2d', { willReadFrequently: true });
    if (!ctxTop || !ctxMid) return;

    const resizeCanvas = () => {
      if (!containerRef.current) return;
      const { clientWidth, clientHeight } = containerRef.current;
      canvasTop.width = clientWidth;
      canvasTop.height = clientHeight;
      canvasMid.width = clientWidth;
      canvasMid.height = clientHeight;

      // --- Draw Middle Layer (Silver foil) ---
      const gradientMid = ctxMid.createLinearGradient(0, 0, canvasMid.width, canvasMid.height);
      gradientMid.addColorStop(0, '#e0e0e0');
      gradientMid.addColorStop(0.5, '#b0b0b0');
      gradientMid.addColorStop(1, '#d0d0d0');
      ctxMid.fillStyle = gradientMid;
      ctxMid.fillRect(0, 0, canvasMid.width, canvasMid.height);

      // Add noise to silver foil
      const imgDataMid = ctxMid.getImageData(0, 0, canvasMid.width, canvasMid.height);
      for (let i = 0; i < imgDataMid.data.length; i += 4) {
        const noise = (Math.random() - 0.5) * 40;
        imgDataMid.data[i] = Math.max(0, Math.min(255, imgDataMid.data[i] + noise));
        imgDataMid.data[i+1] = Math.max(0, Math.min(255, imgDataMid.data[i+1] + noise));
        imgDataMid.data[i+2] = Math.max(0, Math.min(255, imgDataMid.data[i+2] + noise));
      }
      ctxMid.putImageData(imgDataMid, 0, 0);

      // --- Draw Top Layer (Gold foil) ---
      const gradientTop = ctxTop.createLinearGradient(0, 0, canvasTop.width, canvasTop.height);
      gradientTop.addColorStop(0, '#f9f2d1');
      gradientTop.addColorStop(0.5, '#ebd197');
      gradientTop.addColorStop(1, '#d3a95d');
      ctxTop.fillStyle = gradientTop;
      ctxTop.fillRect(0, 0, canvasTop.width, canvasTop.height);
      
      // Add subtle noise to gold foil
      const imgDataTop = ctxTop.getImageData(0, 0, canvasTop.width, canvasTop.height);
      for (let i = 0; i < imgDataTop.data.length; i += 4) {
        const noise = (Math.random() - 0.5) * 20;
        imgDataTop.data[i] = Math.max(0, Math.min(255, imgDataTop.data[i] + noise));
        imgDataTop.data[i+1] = Math.max(0, Math.min(255, imgDataTop.data[i+1] + noise));
        imgDataTop.data[i+2] = Math.max(0, Math.min(255, imgDataTop.data[i+2] + noise));
      }
      ctxTop.putImageData(imgDataTop, 0, 0);

      // Draw subtle diagonal lines on top foil
      ctxTop.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctxTop.lineWidth = 2;
      for (let i = -canvasTop.height; i < canvasTop.width; i += 8) {
        ctxTop.beginPath();
        ctxTop.moveTo(i, 0);
        ctxTop.lineTo(i + canvasTop.height, canvasTop.height);
        ctxTop.stroke();
      }

      // Draw text
      const fontSize = Math.max(16, canvasTop.width * 0.05);
      ctxTop.font = `bold ${fontSize}px "Cinzel", serif`;
      ctxTop.textAlign = 'center';
      ctxTop.textBaseline = 'middle';
      
      // Text Shadow/Emboss
      ctxTop.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctxTop.fillText('SCRATCH TO REVEAL', canvasTop.width / 2 + 1, canvasTop.height / 2 + 1);
      ctxTop.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctxTop.fillText('SCRATCH TO REVEAL', canvasTop.width / 2 - 1, canvasTop.height / 2 - 1);
      
      // Main text
      ctxTop.fillStyle = '#6b4e28';
      ctxTop.fillText('SCRATCH TO REVEAL', canvasTop.width / 2, canvasTop.height / 2);
    };

    resizeCanvas();
    setIsCanvasReady(true);
    window.addEventListener('resize', resizeCanvas);

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    const getMousePos = (e: MouseEvent | TouchEvent) => {
      const rect = canvasTop.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
      return {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
    };

    const scratch = (x: number, y: number) => {
      // Top layer gets a smaller brush (reveals silver underneath)
      ctxTop.globalCompositeOperation = 'destination-out';
      ctxTop.beginPath();
      ctxTop.arc(x, y, 30, 0, Math.PI * 2, false);
      ctxTop.fill();

      // Mid layer gets a larger brush (reveals actual content)
      ctxMid.globalCompositeOperation = 'destination-out';
      ctxMid.beginPath();
      ctxMid.arc(x, y, 45, 0, Math.PI * 2, false);
      ctxMid.fill();
    };

    const handleStart = (e: MouseEvent | TouchEvent) => {
      if (isRevealed) return;
      e.preventDefault();
      isDrawing = true;
      const { x, y } = getMousePos(e);
      lastX = x;
      lastY = y;
      scratch(x, y);
    };

    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!isDrawing || isRevealed) return;
      e.preventDefault();
      const { x, y } = getMousePos(e);
      
      // Top Layer Line
      ctxTop.globalCompositeOperation = 'destination-out';
      ctxTop.beginPath();
      ctxTop.moveTo(lastX, lastY);
      ctxTop.lineTo(x, y);
      ctxTop.lineWidth = 60;
      ctxTop.lineCap = 'round';
      ctxTop.lineJoin = 'round';
      ctxTop.stroke();

      // Mid Layer Line
      ctxMid.globalCompositeOperation = 'destination-out';
      ctxMid.beginPath();
      ctxMid.moveTo(lastX, lastY);
      ctxMid.lineTo(x, y);
      ctxMid.lineWidth = 90;
      ctxMid.lineCap = 'round';
      ctxMid.lineJoin = 'round';
      ctxMid.stroke();
      
      lastX = x;
      lastY = y;
      
      checkRevealed();
    };

    const handleEnd = () => {
      isDrawing = false;
    };

    const checkRevealed = () => {
      // Check the mid layer (which reveals the actual content)
      const pixels = ctxMid.getImageData(0, 0, canvasMid.width, canvasMid.height).data;
      let transparentCount = 0;
      
      // Check every 4th pixel for performance (RGBA)
      for (let i = 3; i < pixels.length; i += 16) {
        if (pixels[i] === 0) {
          transparentCount++;
        }
      }
      
      const totalPixels = pixels.length / 16;
      if (transparentCount / totalPixels > 0.75 && !isRevealed) {
        setIsRevealed(true);
        // Clear remaining canvas
        ctxTop.clearRect(0, 0, canvasTop.width, canvasTop.height);
        ctxMid.clearRect(0, 0, canvasMid.width, canvasMid.height);
        
        // Boom celebration!
        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;

        const interval: any = setInterval(function() {
          const timeLeft = animationEnd - Date.now();

          if (timeLeft <= 0) {
            return clearInterval(interval);
          }

          const particleCount = 50 * (timeLeft / duration);
          confetti({
            startVelocity: 30,
            spread: 360,
            ticks: 60,
            zIndex: 1000,
            origin: { x: Math.random(), y: Math.random() - 0.2 },
            particleCount,
            colors: ['#ebd197', '#d3a95d', '#ff9a9e', '#fecfef']
          });
        }, 250);
      }
    };

    // Attach events to top canvas
    canvasTop.addEventListener('mousedown', handleStart);
    canvasTop.addEventListener('mousemove', handleMove);
    canvasTop.addEventListener('mouseup', handleEnd);
    canvasTop.addEventListener('mouseleave', handleEnd);
    
    canvasTop.addEventListener('touchstart', handleStart, { passive: false });
    canvasTop.addEventListener('touchmove', handleMove, { passive: false });
    canvasTop.addEventListener('touchend', handleEnd);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvasTop.removeEventListener('mousedown', handleStart);
      canvasTop.removeEventListener('mousemove', handleMove);
      canvasTop.removeEventListener('mouseup', handleEnd);
      canvasTop.removeEventListener('mouseleave', handleEnd);
      canvasTop.removeEventListener('touchstart', handleStart);
      canvasTop.removeEventListener('touchmove', handleMove);
      canvasTop.removeEventListener('touchend', handleEnd);
    };
  }, [isRevealed]);

  return (
    <div 
      className="w-full flex flex-col items-center justify-center p-6 relative overflow-hidden"
      style={{ backgroundColor: settings.sectionsBgColor || '#fdf2f8' }}
    >
      {/* Corner Emojis inside the reveal section (same theme as opening) */}
      <motion.div className="absolute top-4 left-4 text-xl pointer-events-none z-10 opacity-40" animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>🌿</motion.div>
      <motion.div className="absolute top-4 right-4 text-xl pointer-events-none z-10 opacity-40" animate={{ y: [0, 10, 0], rotate: [0, -5, 5, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>🌸</motion.div>
      <motion.div className="absolute bottom-4 left-4 text-xl pointer-events-none z-10 opacity-40" animate={{ y: [0, -8, 0], rotate: [0, 8, -8, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}>🌼</motion.div>
      <motion.div className="absolute bottom-4 right-4 text-xl pointer-events-none z-10 opacity-40" animate={{ y: [0, 12, 0], rotate: [0, -10, 10, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}>☘️</motion.div>

      {/* Flower Separator */}
      <div className="w-full flex justify-center items-center py-8 gap-2 text-stone-400 font-bold tracking-widest relative z-10">
        <span>----------</span>
        <span className="text-2xl">🌼</span>
        <span>----------</span>
      </div>

      <div className="w-full max-w-lg aspect-[2/1] relative rounded-2xl overflow-hidden shadow-xl border border-pink-200 bg-white flex flex-col items-center justify-center z-10" ref={containerRef}>
        
        {/* Underlying revealed content */}
        <div 
          className={`absolute inset-0 flex flex-col items-center justify-center p-6 text-center overflow-hidden transition-opacity duration-700 ${isRevealed ? 'opacity-100' : 'opacity-0'}`}
          style={{ backgroundColor: settings.sectionsBgColor ? `${settings.sectionsBgColor}80` : '#fdf2f880' }}
        >
          <h3 className="text-2xl sm:text-3xl font-['Playfair_Display',serif] text-black mb-1 drop-shadow-sm">Save the Date</h3>
          <div className="text-3xl sm:text-4xl md:text-5xl font-['Dancing_Script',cursive] text-pink-700 font-bold tracking-wide mt-2 drop-shadow-sm whitespace-nowrap">
            {new Date(targetDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>

        {/* Mid Layer Canvas (Silver Foil) */}
        <canvas
          ref={canvasMidRef}
          className={`absolute inset-0 w-full h-full cursor-crosshair transition-opacity duration-1000 pointer-events-none ${isRevealed ? 'opacity-0' : 'opacity-100'}`}
        />

        {/* Top Layer Canvas (Gold Foil) */}
        <canvas
          ref={canvasTopRef}
          className={`absolute inset-0 w-full h-full cursor-crosshair transition-opacity duration-1000 ${isRevealed ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        />
      </div>

      {/* Countdown outside the card */}
      <div className={`w-full max-w-lg px-4 transition-all duration-1000 transform relative z-10 overflow-hidden ${isRevealed ? 'opacity-100 translate-y-0 mt-8 max-h-[500px]' : 'opacity-0 translate-y-4 pointer-events-none mt-0 max-h-0'}`}>
        {timeLeft && (
          <div className="flex flex-col items-center justify-center gap-3">
            <h4 className="text-xs sm:text-sm uppercase tracking-widest text-pink-800/60 font-bold">Time remaining</h4>
            <div className="flex items-center justify-center gap-2 sm:gap-4 text-pink-900 bg-white/60 px-4 py-4 sm:px-8 sm:py-6 rounded-3xl shadow-lg border border-pink-100 backdrop-blur-sm w-full">
              <div className="flex flex-col items-center min-w-[3rem] sm:min-w-[4rem]">
                <span className="text-2xl sm:text-4xl font-light font-serif">{timeLeft.days}</span>
                <span className="text-[10px] sm:text-xs uppercase tracking-widest text-pink-600 mt-1 font-semibold">Days</span>
              </div>
              <span className="text-xl sm:text-3xl font-serif text-pink-300 pb-4 sm:pb-5">:</span>
              <div className="flex flex-col items-center min-w-[3rem] sm:min-w-[4rem]">
                <span className="text-2xl sm:text-4xl font-light font-serif">{timeLeft.hours.toString().padStart(2, '0')}</span>
                <span className="text-[10px] sm:text-xs uppercase tracking-widest text-pink-600 mt-1 font-semibold">Hrs</span>
              </div>
              <span className="text-xl sm:text-3xl font-serif text-pink-300 pb-4 sm:pb-5">:</span>
              <div className="flex flex-col items-center min-w-[3rem] sm:min-w-[4rem]">
                <span className="text-2xl sm:text-4xl font-light font-serif">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                <span className="text-[10px] sm:text-xs uppercase tracking-widest text-pink-600 mt-1 font-semibold">Min</span>
              </div>
              <span className="text-xl sm:text-3xl font-serif text-pink-300 pb-4 sm:pb-5">:</span>
              <div className="flex flex-col items-center min-w-[3rem] sm:min-w-[4rem]">
                <span className="text-2xl sm:text-4xl font-light font-serif">{timeLeft.seconds.toString().padStart(2, '0')}</span>
                <span className="text-[10px] sm:text-xs uppercase tracking-widest text-pink-600 mt-1 font-semibold">Sec</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Flower Separator (Bottom) */}
      <div className="w-full flex justify-center items-center py-8 gap-2 text-stone-400 font-bold tracking-widest relative z-10 mt-4">
        <span>----------</span>
        <span className="text-2xl">🌼</span>
        <span>----------</span>
      </div>
    </div>
  );
}
