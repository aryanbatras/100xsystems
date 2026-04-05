import React, { useEffect, useRef } from 'react';
import FluidSimulation from 'fluid-simulation-react';

interface FluidAnimationProps {
  className?: string;
  id?: string;
  useCustomColors?: boolean;
}

const FluidAnimation: React.FC<FluidAnimationProps> = ({ 
  className = "", 
  id = "fluid-animation",
  useCustomColors = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const colors = [
    [0.98, 0.8, 0.08], // Primary Yellow (#facc15)
    [1, 0.9, 0.2]     // Lighter Yellow variant
  ];

  useEffect(() => {
    console.log('FluidAnimation mounted, container:', containerRef.current);
    console.log('FluidAnimation props:', { className, id, useCustomColors });
    
    if (containerRef.current) {
      console.log('Container dimensions:', {
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
        zIndex: window.getComputedStyle(containerRef.current).zIndex
      });
    }
  }, []);

  return (
    <div 
      ref={containerRef}
      className={className}
      id={id}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 10,
        pointerEvents: 'auto',
        overflow: 'hidden',
        background: 'rgba(255, 0, 0, 0.1)', // Light red background for debugging
        backfaceVisibility: 'hidden'
      }}
    >
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0
      }}>
        <FluidSimulation 
          color={useCustomColors ? colors : undefined}
        />
      </div>
      
      {/* Debug text */}
      <div style={{
        position: 'absolute',
        top: '10px',
        left: '10px',
        color: 'white',
        fontSize: '14px',
        fontWeight: 'bold',
        textAlign: 'left',
        background: 'rgba(0, 0, 0, 0.7)',
        padding: '5px 10px',
        borderRadius: '5px',
        zIndex: 100
      }}>
        FLUID ANIMATION TEST
      </div>
    </div>
  );
};

export default FluidAnimation;
