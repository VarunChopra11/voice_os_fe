
import React from "react";

interface VoiceWaveformProps {
  isListening: boolean;
}

const VoiceWaveform: React.FC<VoiceWaveformProps> = ({ isListening }) => {
  const bars = 9;
  
  return (
    <div className={`wave-group ${isListening ? 'opacity-100' : 'opacity-30'}`}>
      {Array.from({ length: bars }).map((_, index) => (
        <div
          key={index}
          className={`wave-bar ${isListening ? 'animate-wave' : ''}`}
          style={{
            height: `${Math.random() * 100}%`,
            animationDelay: `${index * 0.1}s`,
          }}
        />
      ))}
    </div>
  );
};

export default VoiceWaveform;
