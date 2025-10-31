
import React from 'react';

const AnimatedLogo: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <svg
        width="120"
        height="120"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className="text-white"
      >
        <g className="animate-pulse">
          <path
            d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
            fill="currentColor"
            opacity="0.3"
          />
          <path
            d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
            fill="currentColor"
            className="animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]"
          />
        </g>
      </svg>
      <h1 className="text-4xl font-bold text-white tracking-wider animate-fade-in">ChatVerse</h1>
    </div>
  );
};

export default AnimatedLogo;
