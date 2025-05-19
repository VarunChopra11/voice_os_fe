
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Your <span className="text-assistant-primary">Smart Assistant</span> at Your Command
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-2xl">
                Experience the next generation of voice assistants. Simply speak your command and watch it happen instantly.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-assistant-primary to-assistant-secondary hover:opacity-90 transition-opacity text-white rounded-xl"
                >
                  <Link to="/dashboard">Get Started</Link>
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-assistant-primary text-assistant-primary hover:bg-assistant-background rounded-xl"
                >
                  Learn More
                </Button>
              </div>
            </div>
            
            <div className="flex-1 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-assistant-primary to-assistant-secondary opacity-30 blur-3xl rounded-full"></div>
                <div className="relative w-64 h-64 md:w-80 md:h-80 glass-card rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100"
                    height="100"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-assistant-primary"
                  >
                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                    <line x1="12" x2="12" y1="19" y2="22"></line>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="container mx-auto px-4 py-16 bg-assistant-background rounded-3xl my-16">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Speak Your Command",
                description: "Just click the microphone button and tell our assistant what you need.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4 text-assistant-primary">
                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                    <line x1="12" x2="12" y1="19" y2="22"></line>
                  </svg>
                )
              },
              {
                title: "Smart Processing",
                description: "Our AI processes your request with advanced natural language understanding.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4 text-assistant-primary">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                )
              },
              {
                title: "Instant Results",
                description: "Get immediate responses and actions based on your commands.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4 text-assistant-primary">
                    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                    <polyline points="16 7 22 7 22 13"></polyline>
                  </svg>
                )
              }
            ].map((feature, index) => (
              <div key={index} className="glass-card p-6 rounded-2xl text-center">
                {feature.icon}
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      
      <footer className="bg-assistant-muted py-6">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; 2025 VoiceAssist. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
