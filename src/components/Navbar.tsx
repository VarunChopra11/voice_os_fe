
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const Navbar: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glassmorphism">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="bg-gradient-to-r from-assistant-primary to-assistant-secondary p-1.5 rounded-lg">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none"
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="text-white"
            >
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
              <line x1="12" x2="12" y1="19" y2="22"></line>
            </svg>
          </div>
          <span className="text-xl font-semibold text-foreground">VoiceAssist</span>
        </Link>
        
        <nav>
          <Button 
            asChild 
            variant="default" 
            className="bg-gradient-to-r from-assistant-primary to-assistant-secondary hover:opacity-90 transition-opacity"
          >
            <Link to="/dashboard">Dashboard</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
