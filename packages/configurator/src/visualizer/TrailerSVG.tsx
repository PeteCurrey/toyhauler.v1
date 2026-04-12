'use client';

import React from 'react';
import { useConfigStore } from '../store/useConfigStore';

export const TrailerSVG = () => {
  const { dimensions, axleConfig, baseModel, exteriorFinish, doors } = useConfigStore();

  const isEnclosed = baseModel === 'JPC-EX';
  const isVnose = doors.front === 'v-nose';
  
  // Calculate visual scale
  const lengthScale = (dimensions.length / 20) * 200;
  const heightScale = (dimensions.height / 6) * 60;

  return (
    <div className="relative w-full h-full flex items-center justify-center p-8">
      <svg 
        viewBox="0 0 400 200" 
        className="w-full h-auto drop-shadow-2xl"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <g transform="translate(100, 100)">
          {/* Main Chassis / Body */}
          <path 
            id="body"
            d={`M 0 0 L ${lengthScale} 0 L ${lengthScale} -${heightScale} L ${isVnose ? -20 : 0} -${heightScale} Z`}
            fill={exteriorFinish === 'MILL ALUMINIUM' ? '#2A2A2A' : '#111'}
            stroke="#E8500A"
            strokeWidth="1.5"
            className="transition-all duration-500"
          />

          {/* Axles */}
          <g transform={`translate(${lengthScale/2}, 5)`}>
            <circle cx="-15" cy="0" r="8" fill="#111" stroke="#444" strokeWidth="1" />
            {(axleConfig.includes('twin') || axleConfig === 'triple') && (
              <circle cx="15" cy="0" r="8" fill="#111" stroke="#444" strokeWidth="1" />
            )}
            {axleConfig === 'triple' && (
              <circle cx="45" cy="0" r="8" fill="#111" stroke="#444" strokeWidth="1" />
            )}
          </g>

          {/* Side Door */}
          {doors.side && isEnclosed && (
            <rect 
              x={lengthScale / 4} 
              y={-heightScale + 5} 
              width="25" 
              height={heightScale - 10} 
              stroke="#555" 
              strokeWidth="1"
              fill="#1A1A1A"
            />
          )}

          {/* Measurement Lines */}
          <g className="font-mono" opacity="0.3">
            <line x1="0" y1="25" x2={lengthScale} y2="25" stroke="#888" strokeWidth="0.5" />
            <text x={lengthScale/2} y="40" textAnchor="middle" fontSize="8" fill="#888">{dimensions.length}ft LENGTH</text>
            
            <line x1="-30" y1="0" x2="-30" y2={-heightScale} stroke="#888" strokeWidth="0.5" />
            <text x="-45" y={-heightScale/2} textAnchor="middle" fontSize="8" fill="#888" transform={`rotate(-90, -45, ${-heightScale/2})`}>{dimensions.height}ft HEIGHT</text>
          </g>
        </g>
      </svg>
    </div>
  );
};
