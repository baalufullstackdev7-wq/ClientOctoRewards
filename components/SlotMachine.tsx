import React, { useEffect, useState, useRef } from 'react';
import { GameResult } from '../types';

interface SlotMachineProps {
  isSpinning: boolean;
  result: GameResult | null;
  onSpinComplete: () => void;
}

const SYMBOLS = ['🍒', '🍋', '🍇', '💎', '7️⃣', '🔔'];

const SlotMachine: React.FC<SlotMachineProps> = ({ isSpinning, result, onSpinComplete }) => {
  // Initial state for 3 reels
  const [reels, setReels] = useState<string[]>(['7️⃣', '7️⃣', '7️⃣']);
  const resultRef = useRef(result);

  useEffect(() => {
    resultRef.current = result;
  }, [result]);
  
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    let timeout: ReturnType<typeof setTimeout>;

    if (isSpinning) {
      // Rapidly change symbols to simulate spinning
      interval = setInterval(() => {
        setReels([
            SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
            SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
            SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
        ]);
      }, 100);

      // Stop after 2 seconds and set final result
      timeout = setTimeout(() => {
        clearInterval(interval);
        const currentResult = resultRef.current;
        if (currentResult && currentResult.config?.symbols) {
            setReels(currentResult.config.symbols);
        } else {
             // Fallback
             setReels(['🍒', '🍋', '🍇']);
        }
        onSpinComplete();
      }, 2000);
    }

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [isSpinning, onSpinComplete]);

  return (
    <div className="flex justify-center items-center space-x-2 my-10 bg-gray-800 p-4 rounded-xl border-4 border-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.5)]">
      {reels.map((symbol, i) => (
        <div 
            key={i} 
            className="w-20 h-24 bg-white rounded-lg flex items-center justify-center text-5xl border-b-4 border-gray-300 shadow-inner overflow-hidden relative"
        >
             {/* Simple blur effect when spinning */}
             <div className={`transition-all duration-100 ${isSpinning ? 'blur-sm scale-110 opacity-80' : ''}`}>
                 {symbol}
             </div>
             {/* Shine effect */}
             <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/40 to-transparent pointer-events-none"></div>
        </div>
      ))}
    </div>
  );
};

export default SlotMachine;