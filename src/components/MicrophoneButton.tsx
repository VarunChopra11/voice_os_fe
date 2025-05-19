
import React from "react";
import { cn } from "@/lib/utils";

interface MicrophoneButtonProps {
  isListening: boolean;
  onClick: () => void;
  className?: string;
}

const MicrophoneButton: React.FC<MicrophoneButtonProps> = ({
  isListening,
  onClick,
  className,
}) => {
  return (
    <button
      className={cn(
        "relative rounded-full p-4 w-16 h-16 flex items-center justify-center transition-all duration-300 focus:outline-none",
        isListening 
          ? "bg-red-500 text-white" 
          : "bg-gradient-to-r from-assistant-primary to-assistant-secondary text-white",
        className
      )}
      onClick={onClick}
      aria-label={isListening ? "Stop listening" : "Start listening"}
    >
      {isListening && (
        <span className="animate-pulse-ring absolute inset-0 rounded-full bg-red-400 opacity-75"></span>
      )}

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
        <line x1="12" x2="12" y1="19" y2="22"></line>
      </svg>
    </button>
  );
};

export default MicrophoneButton;
