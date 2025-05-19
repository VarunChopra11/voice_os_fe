
import React, { useState, useCallback } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/Navbar";
import MicrophoneButton from "@/components/MicrophoneButton";
import VoiceWaveform from "@/components/VoiceWaveform";
import useSpeechRecognition from "@/hooks/useSpeechRecognition";

interface AssistantResponse {
  action_type: string;
  response: string;
  [key: string]: any;
}

const Dashboard: React.FC = () => {
  const [transcription, setTranscription] = useState("");
  const [finalTranscript, setFinalTranscript] = useState("");
  const [assistantResponse, setAssistantResponse] = useState<AssistantResponse | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleTranscribe = useCallback((text: string) => {
    setTranscription(text);
  }, []);

  const handleSpeechEnd = useCallback(() => {
    if (transcription) {
      setFinalTranscript(transcription);
      handleSubmitCommand(transcription);
    }
  }, [transcription]);

  const { isListening, startListening, stopListening, error } = useSpeechRecognition({
    onTranscribe: handleTranscribe,
    onEnd: handleSpeechEnd,
  });

  const handleSubmitCommand = async (command: string) => {
    if (!command.trim()) return;

    setIsProcessing(true);
    try {
      // Send the command to the backend
      const response = await fetch("/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: command }),
      });

      if (!response.ok) {
        throw new Error("Failed to execute command");
      }

      const data = await response.json();
      setAssistantResponse(data);
      toast({
        title: "Command processed",
        description: "Your voice command was successfully processed.",
      });
    } catch (error) {
      console.error("Error executing command:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to process your command. Please try again.",
      });
      setAssistantResponse(null);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleMicClick = () => {
    if (isListening) {
      stopListening();
    } else {
      setTranscription("");
      setAssistantResponse(null);
      startListening();
    }
  };

  // Mock the API call for development purposes
  const handleMockCommand = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const mockResponses = [
        {
          action_type: "greeting",
          response: "Hello there! How can I assist you today?",
        },
        {
          action_type: "translation",
          original_text: "Hello world",
          translated_text: "Hola mundo",
          source_language: "English",
          target_language: "Spanish",
          response: "I've translated 'Hello world' to Spanish: 'Hola mundo'",
        },
        {
          action_type: "file_opened",
          file_name: "quarterly_report.pdf",
          file_path: "/documents/quarterly_report.pdf",
          response: "I've opened the quarterly report PDF file for you",
        },
        {
          action_type: "note_taken",
          note_content: "Remember to schedule a meeting with the design team on Friday",
          note_saved_at: "2025-05-19T15:30:00Z",
          response: "I've saved your note about scheduling a meeting with the design team",
        },
      ];

      const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      setAssistantResponse(randomResponse);
      setIsProcessing(false);
      toast({
        title: "Command processed",
        description: "Your voice command was successfully processed.",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-assistant-background">
      <Navbar />
      
      <main className="flex-1 pt-20 pb-10 px-4">
        <div className="container max-w-4xl mx-auto">
          <Card className="glass-card overflow-hidden mb-6 animate-fade-in">
            <CardHeader className="bg-gradient-to-r from-assistant-primary to-assistant-secondary text-white">
              <CardTitle className="text-2xl font-semibold">Voice Assistant Dashboard</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-col items-center justify-center space-y-6 py-6">
                <div className="relative">
                  <MicrophoneButton isListening={isListening} onClick={handleMicClick} className="w-20 h-20" />
                  {error && (
                    <p className="text-destructive text-sm mt-2 max-w-xs text-center">{error}</p>
                  )}
                </div>
                
                <div className="text-center">
                  {isListening ? (
                    <p className="text-sm text-muted-foreground">Listening... Just speak naturally</p>
                  ) : (
                    <p className="text-sm text-muted-foreground">Click the microphone to start speaking</p>
                  )}
                </div>

                {/* Voice Waveform */}
                <div className="w-full max-w-md mx-auto flex justify-center">
                  <VoiceWaveform isListening={isListening} />
                </div>
                
                {/* Transcription Area */}
                <Card className="w-full border border-border bg-card/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-md font-medium flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-assistant-primary"
                      >
                        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                        <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                        <line x1="12" x2="12" y1="19" y2="22"></line>
                      </svg>
                      Transcription
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="min-h-32 max-h-48 overflow-y-auto">
                    {transcription || finalTranscript ? (
                      <p className="text-lg">{transcription || finalTranscript}</p>
                    ) : (
                      <p className="text-muted-foreground text-center italic">
                        {isListening ? "Speak now..." : "Your speech will appear here"}
                      </p>
                    )}
                  </CardContent>
                </Card>
                
                {/* For development: mock API button */}
                <div className="w-full flex justify-center">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleMockCommand}
                    disabled={isProcessing || isListening}
                    className="text-xs"
                  >
                    {isProcessing ? "Processing..." : "Simulate Assistant Response"}
                  </Button>
                </div>

                {/* Response Area */}
                {(isProcessing || assistantResponse) && (
                  <>
                    <Separator className="my-4" />
                    <Card className="w-full border border-border bg-card/50">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-md font-medium flex items-center gap-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-assistant-primary"
                          >
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                          </svg>
                          Assistant Response
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="min-h-32 max-h-72 overflow-y-auto">
                        {isProcessing ? (
                          <div className="flex flex-col items-center justify-center h-32 space-y-4">
                            <div className="w-8 h-8 border-4 border-assistant-primary border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-muted-foreground">Processing your request...</p>
                          </div>
                        ) : assistantResponse ? (
                          <div className="space-y-4">
                            {/* Action Type Badge */}
                            <div className="inline-block bg-assistant-muted text-assistant-primary px-2 py-1 rounded-md text-xs font-medium">
                              {assistantResponse.action_type}
                            </div>
                            
                            {/* Main Response */}
                            <p className="text-lg">{assistantResponse.response}</p>
                            
                            {/* Additional Info Based on Action Type */}
                            {assistantResponse.action_type === "translation" && (
                              <div className="bg-assistant-background p-3 rounded-md">
                                <div className="flex justify-between text-sm text-muted-foreground mb-2">
                                  <span>{assistantResponse.source_language}</span>
                                  <span>{assistantResponse.target_language}</span>
                                </div>
                                <div className="flex justify-between gap-4">
                                  <div className="flex-1 p-2 bg-white/50 rounded-md">
                                    {assistantResponse.original_text}
                                  </div>
                                  <div className="flex-1 p-2 bg-white/70 rounded-md font-medium">
                                    {assistantResponse.translated_text}
                                  </div>
                                </div>
                              </div>
                            )}
                            
                            {assistantResponse.action_type === "file_opened" && (
                              <div className="flex items-center gap-2 bg-assistant-background p-3 rounded-md">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="18"
                                  height="18"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                                  <polyline points="14 2 14 8 20 8"></polyline>
                                </svg>
                                <span>{assistantResponse.file_path}</span>
                              </div>
                            )}
                            
                            {assistantResponse.action_type === "note_taken" && (
                              <div className="bg-assistant-background p-3 rounded-md">
                                <p className="font-medium">Note Content:</p>
                                <p className="italic">"{assistantResponse.note_content}"</p>
                                <p className="text-xs text-muted-foreground mt-2">
                                  Saved at: {new Date(assistantResponse.note_saved_at).toLocaleString()}
                                </p>
                              </div>
                            )}
                          </div>
                        ) : null}
                      </CardContent>
                    </Card>
                  </>
                )}

                {/* Placeholder Message */}
                {!isListening && !transcription && !finalTranscript && !assistantResponse && !isProcessing && (
                  <div className="text-center p-8 max-w-md">
                    <div className="text-assistant-primary opacity-20">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="64"
                        height="64"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mx-auto mb-4"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="16" x2="12" y2="12"></line>
                        <line x1="12" y1="8" x2="12.01" y2="8"></line>
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium mb-2">How can I assist you?</h3>
                    <p className="text-muted-foreground">
                      Click the microphone button and ask me something like:
                    </p>
                    <ul className="mt-3 space-y-2 text-sm text-left">
                      <li className="bg-assistant-muted p-2 rounded-md">"Open my recent document"</li>
                      <li className="bg-assistant-muted p-2 rounded-md">"Translate Hello to Spanish"</li>
                      <li className="bg-assistant-muted p-2 rounded-md">"Take a note: Meeting at 3pm"</li>
                    </ul>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Tips Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <Card className="glass-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Voice Commands</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="bg-assistant-primary/20 p-1 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                    "Open [filename]" - Opens specified file
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="bg-assistant-primary/20 p-1 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                    "Translate [text] to [language]" - Translates text
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="bg-assistant-primary/20 p-1 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                    "Take a note: [content]" - Saves a note
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="bg-assistant-primary/20 p-1 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                    </span>
                    Speak clearly and at a moderate pace
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="bg-assistant-primary/20 p-1 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                    </span>
                    Use natural language for best results
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="bg-assistant-primary/20 p-1 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                    </span>
                    Begin with action verbs for best recognition
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
