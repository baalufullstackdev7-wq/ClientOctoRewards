import React, { useEffect, useRef, useState } from 'react';
import { GameResult } from '../types';

interface SpinWheelProps {
  isSpinning: boolean;
  result: GameResult | null;
  onSpinComplete: () => void;
}

const SEGMENTS = [
  { label: '500 Points', color: '#E0F7FA', text: '#006064' },
  { label: '₹100 Voucher', color: '#FCE4EC', text: '#880E4F' },
  { label: '250 Points', color: '#E3F2FD', text: '#0D47A1' },
  { label: 'Better Luck', color: '#FFF9C4', text: '#F57F17' },
  { label: '250 Points', color: '#F3E5F5', text: '#4A148C' },
  { label: 'Better Luck', color: '#FFEBEE', text: '#B71C1C' },
];

const SpinWheel: React.FC<SpinWheelProps> = ({ isSpinning, result, onSpinComplete }) => {
  const [rotation, setRotation] = useState(0);
  
  useEffect(() => {
    if (isSpinning && result && result.config?.segmentIndex !== undefined) {
      // Calculate rotation to land on target
      const segmentAngle = 360 / SEGMENTS.length;
      const targetIndex = result.config.segmentIndex;
      
      // Calculate landing angle (center of the segment)
      // We add extra rotations (5 * 360) for effect
      const extraRotations = 360 * 5;
      
      // The pointer is usually at top (0deg) or right (90deg). 
      // Assuming pointer is at Top (0deg in CSS transform).
      // If segment 0 is at 0-60deg, to land on it under the pointer, we need to rotate appropriately.
      // Let's simplify: To land on Index X, we rotate total - (X * segmentAngle).
      
      const randomOffset = Math.random() * (segmentAngle - 10) + 5; // randomness within segment
      const finalAngle = extraRotations + ((360 - (targetIndex * segmentAngle)) - (segmentAngle/2));

      setRotation(finalAngle);

      const timeout = setTimeout(() => {
        onSpinComplete();
      }, 5000); // Duration matches CSS transition

      return () => clearTimeout(timeout);
    }
  }, [isSpinning, result, onSpinComplete]);

  return (
    <div className="relative w-72 h-72 mx-auto my-8">
      {/* Pointer */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 z-20">
         <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[30px] border-t-yellow-400 drop-shadow-lg" />
      </div>

      {/* Wheel */}
      <div 
        className="w-full h-full rounded-full border-4 border-white shadow-2xl overflow-hidden relative transition-transform cubic-bezier(0.25, 0.1, 0.25, 1)"
        style={{ 
          transform: `rotate(${rotation}deg)`,
          transitionDuration: isSpinning ? '5s' : '0s'
        }}
      >
        {SEGMENTS.map((seg, i) => (
          <div
            key={i}
            className="absolute top-0 left-0 w-full h-full origin-center"
            style={{
              transform: `rotate(${i * (360 / SEGMENTS.length)}deg)`,
            }}
          >
             {/* Slice Graphic */}
            <div 
                className="absolute top-0 right-0 w-1/2 h-1/2 origin-bottom-left flex items-center justify-center pt-8"
                style={{
                    backgroundColor: seg.color,
                    transform: `skewY(-${90 - (360/SEGMENTS.length)}deg)`,
                }}
            >
                {/* Content un-skewed */}
                <span 
                    className="absolute text-xs font-bold w-20 text-center -rotate-90 top-[30%] left-[20%]"
                    style={{ 
                        color: seg.text,
                        transform: `skewY(${90 - (360/SEGMENTS.length)}deg) rotate(60deg)` 
                    }}
                >
                    {seg.label}
                </span>
            </div>
          </div>
        ))}
        
        {/* Center Knob */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-blue-500 rounded-full border-4 border-white shadow-inner flex items-center justify-center z-10">
            <span className="text-2xl">🎡</span>
        </div>
      </div>
    </div>
  );
};

export default SpinWheel;
