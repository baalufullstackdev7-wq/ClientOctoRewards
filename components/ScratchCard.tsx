import React, { useEffect, useRef, useState } from 'react';
import { GameResult } from '../types';

interface ScratchCardProps {
  isPlaying: boolean;
  result: GameResult | null;
  onRevealComplete: () => void;
}

const ScratchCard: React.FC<ScratchCardProps> = ({ isPlaying, result, onRevealComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    // Reset when starting a new game
    // Initialize cover immediately when play starts, don't wait for result to avoid flash
    if (isPlaying) {
        setIsRevealed(false);
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (canvas && ctx && containerRef.current) {
            canvas.width = containerRef.current.offsetWidth;
            canvas.height = containerRef.current.offsetHeight;

            // Fill with scratchable overlay
            ctx.fillStyle = '#9CA3AF'; // Gray-400
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Add texture/text to overlay
            ctx.font = '20px sans-serif';
            ctx.fillStyle = '#4B5563';
            ctx.textAlign = 'center';
            ctx.fillText('SCRATCH HERE', canvas.width / 2, canvas.height / 2);

            // Set composite operation for erasing
            ctx.globalCompositeOperation = 'destination-out';
        }
    }
  }, [isPlaying]);

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    // Prevent scratching if revealed or if result hasn't arrived yet
    if (isRevealed || !result) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const rect = canvas.getBoundingClientRect();
    let x, y;

    if ('touches' in e) {
       x = e.touches[0].clientX - rect.left;
       y = e.touches[0].clientY - rect.top;
    } else {
       x = (e as React.MouseEvent).clientX - rect.left;
       y = (e as React.MouseEvent).clientY - rect.top;
    }

    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fill();

    checkRevealPercentage();
  };

  const checkRevealPercentage = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    // Sample pixels to see how much is cleared
    // Optimization: Don't check every pixel, check a grid
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparentPixels = 0;
    
    for (let i = 3; i < pixels.length; i += 4 * 10) { // Check every 10th pixel
        if (pixels[i] === 0) transparentPixels++;
    }

    const totalPixelsChecked = pixels.length / (4 * 10);
    const percentage = (transparentPixels / totalPixelsChecked) * 100;

    if (percentage > 50) {
        setIsRevealed(true);
        onRevealComplete();
    }
  };

  return (
    <div className="flex flex-col items-center my-8">
      <div 
        ref={containerRef}
        className="relative w-64 h-40 rounded-xl overflow-hidden shadow-xl"
      >
        {/* Hidden Result Layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-100 to-yellow-300 flex flex-col items-center justify-center p-4">
             {result ? (
                 <>
                    <div className="text-4xl mb-2">
                        {result.won ? '🎉' : '💔'}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 text-center">{result.prizeLabel}</h3>
                 </>
             ) : (
                 <div className="animate-pulse flex flex-col items-center">
                    <div className="h-2 w-20 bg-yellow-400/50 rounded mb-2"></div>
                    <p className="text-yellow-800/50 font-bold text-sm">Loading...</p>
                 </div>
             )}
        </div>

        {/* Scratchable Canvas Layer */}
        <canvas
            ref={canvasRef}
            className={`absolute inset-0 cursor-pointer touch-none transition-opacity duration-700 ${isRevealed ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            onMouseMove={handleMouseMove}
            onTouchMove={handleMouseMove}
        />
      </div>
      <p className="mt-4 text-gray-500 text-sm">Swipe or drag to scratch the card!</p>
    </div>
  );
};

export default ScratchCard;