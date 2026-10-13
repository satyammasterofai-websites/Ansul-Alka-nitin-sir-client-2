import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const EMOJIS = ['🌸', '🌸', '🌼', '🌼', '🌿', '☘️'];

interface EmojiItem {
  id: number;
  emoji: string;
  x: number;
  duration: number;
  delay: number;
  size: number;
  rotation: number;
}

export function FallingEmojis() {
  const [emojis, setEmojis] = useState<EmojiItem[]>([]);

  useEffect(() => {
    // Initial batch - less dense
    const createEmoji = (id: number): EmojiItem => ({
      id,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      x: Math.random() * 90, // random x position (vw)
      duration: 35 + Math.random() * 10, // 35-45 seconds to fall (~40s average)
      delay: Math.random() * 15, // Only positive delay so they fall from the top
      size: 0.7 + Math.random() * 0.8, // 0.7rem to 1.5rem (smaller size)
      rotation: -180 + Math.random() * 360,
    });

    const initialEmojis = Array.from({ length: 8 }, (_, i) => createEmoji(i));
    setEmojis(initialEmojis);

    // Continue spawning slowly
    let idCounter = 8;
    const interval = setInterval(() => {
      setEmojis(prev => {
        // Keep max 8 emojis to make it less dense (approx 2 of each type)
        const next = prev.length >= 8 ? prev.slice(1) : prev;
        return [...next, {
          id: idCounter++,
          emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
          x: Math.random() * 90,
          duration: 35 + Math.random() * 10,
          delay: 0, // new ones start exactly from the top
          size: 0.7 + Math.random() * 0.8,
          rotation: -180 + Math.random() * 360,
        }];
      });
    }, 6000); // add a new one every 6 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {emojis.map((item) => (
          <motion.div
            key={item.id}
            initial={{ 
              y: '-10vh', 
              x: `${item.x}vw`, 
              rotate: 0,
              opacity: 1 // No fade-in to prevent blurry mid-air appearances
            }}
            animate={{ 
              y: '110vh', 
              x: `${item.x + (Math.random() * 10 - 5)}vw`, // slight horizontal drift
              rotate: item.rotation,
            }}
            transition={{ 
              duration: item.duration, 
              ease: "linear", 
              delay: item.delay,
            }}
            style={{ 
              position: 'absolute', 
              fontSize: `${item.size}rem`,
              willChange: 'transform',
              textShadow: '0 0 1px rgba(255,255,255,0.5)' // crisp rendering
            }}
          >
            {item.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
