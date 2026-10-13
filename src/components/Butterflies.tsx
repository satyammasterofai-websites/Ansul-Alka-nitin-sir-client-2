import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

import { ECardSettings } from '../types';

// Generates a path that moves horizontally
const generatePath = (w: number, h: number, count: number, startLeft: boolean) => {
  const path = { x: [] as number[], y: [] as number[], rotate: [] as number[] };
  for (let i = 0; i < count; i++) {
    // Progress from 0 to 1
    const progress = i / (count - 1);
    
    // Start left -> move right, or Start right -> move left
    // We add some margin (-w*0.2 to w*1.2) to let them fly off screen
    const startX = startLeft ? -w * 0.2 : w * 1.2;
    const endX = startLeft ? w * 1.2 : -w * 0.2;
    
    const baseX = startX + (endX - startX) * progress;
    // Add random horizontal variation
    path.x.push(baseX + (Math.random() - 0.5) * (w * 0.1));
    
    // Y moves up and down somewhat randomly
    path.y.push(h * 0.1 + Math.random() * h * 0.8);
    
    // Rotation based on direction
    const baseRotation = startLeft ? 15 : -15;
    path.rotate.push(baseRotation + (Math.random() - 0.5) * 40);
  }
  return path;
};

interface ButterfliesProps {
  isOpening?: boolean;
  settings?: ECardSettings;
}

export function Butterflies({ isOpening, settings }: ButterfliesProps) {
  const [windowSize, setWindowSize] = useState({ w: 1000, h: 1000 });
  const [bluePath, setBluePath] = useState({ x: [0], y: [0], rotate: [0] });
  const [pinkPath, setPinkPath] = useState({ x: [0], y: [0], rotate: [0] });

  useEffect(() => {
    // Check if window is defined
    if (typeof window === 'undefined') return;

    const initSize = { w: window.innerWidth, h: window.innerHeight };
    setWindowSize(initSize);
    
    // Generate initial paths based on actual window size
    // Blue starts left, moves right
    setBluePath(generatePath(initSize.w, initSize.h, 10, true));
    // Pink starts right, moves left
    setPinkPath(generatePath(initSize.w, initSize.h, 10, false));

    const handleResize = () => {
      setWindowSize({ w: window.innerWidth, h: window.innerHeight });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const targetX = (windowSize.w * (settings?.embeddedImageLeft ?? 50)) / 100;
  const targetY = (windowSize.h * (settings?.embeddedImageTop ?? 65)) / 100;

  const blueSitting = {
    x: targetX - 80,
    y: targetY - 100,
    rotate: 15,
  };

  const pinkSitting = {
    x: targetX + 80,
    y: targetY - 110,
    rotate: -15,
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {/* Blue Butterfly */}
      <motion.div
        className="absolute text-4xl"
        animate={{
          x: isOpening ? blueSitting.x : bluePath.x,
          y: isOpening ? blueSitting.y : bluePath.y,
        }}
        transition={isOpening ? { duration: 3.5, ease: "easeOut" } : {
          duration: 85,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut"
        }}
      >
        <motion.div
           animate={{ rotate: isOpening ? blueSitting.rotate : bluePath.rotate }}
           transition={isOpening ? { duration: 3.5, ease: "easeOut" } : { duration: 85, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        >
          {/* Wing flapping wrapper */}
          <motion.div
             animate={{ scaleX: [1, 0.1, 1] }}
             transition={{ duration: 0.25, repeat: Infinity, ease: "linear" }}
          >
            🦋
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Pink Butterfly */}
      <motion.div
        className="absolute text-4xl"
        animate={{
          x: isOpening ? pinkSitting.x : pinkPath.x,
          y: isOpening ? pinkSitting.y : pinkPath.y,
        }}
        transition={isOpening ? { duration: 4, ease: "easeOut" } : {
          duration: 90,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
          delay: isOpening ? 0 : 1.5
        }}
      >
        <motion.div
           animate={{ rotate: isOpening ? pinkSitting.rotate : pinkPath.rotate }}
           transition={isOpening ? { duration: 4, ease: "easeOut" } : { duration: 90, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: 1.5 }}
        >
          {/* Wing flapping wrapper - hue rotate for pink color */}
          <motion.div
             animate={{ scaleX: [1, 0.1, 1] }}
             transition={{ duration: 0.2, repeat: Infinity, ease: "linear" }}
             style={{ filter: 'hue-rotate(140deg) saturate(1.8)' }}
          >
            🦋
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
