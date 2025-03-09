"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ChatMessage from "./chat-message";
import axios from "axios";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null); // Fixed useRef syntax

  const [input, setInput] = useState(""); // Add input state since we're not using useChat
  const [history, setHistory] = useState([]);
  const [chat, setChat] = useState([]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newHistory = [...history, { role: "user", parts: [{ text: input }] }];

    setChat((prevChat) => [...prevChat, { sender: "You", text: input }]);

    try {
      console.log("Sending message...");
      const response = await axios.post("http://localhost:3000/api/chatBot", {
        message: input,
        history: newHistory,
      });

      const botResponse =
        response.data?.response?.response?.candidates?.[0]?.content?.parts?.[0]
          ?.text || "No response from AI.";

      console.log("Bot response:", botResponse);

      setChat((prevChat) => [
        ...prevChat,
        { sender: "Bot", text: botResponse },
      ]);

      setHistory((prevHistory) => [
        ...prevHistory,
        { role: "model", parts: [{ text: botResponse }] },
      ]);

      // Clear input after sending
      setInput("");
    } catch (error) {
      console.error("Error:", error);
      setChat((prevChat) => [
        ...prevChat,
        { sender: "Bot", text: "Error fetching response." },
      ]);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  // Scroll to bottom whenever chat updates
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat]);

  return (
    <>
      {/* Floating chat button */}
      <Button
        onClick={toggleChat}
        className={`fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg z-50 flex items-center justify-center ${
          isOpen
            ? "bg-red-500 hover:bg-red-600"
            : "bg-primary hover:bg-primary/90"
        }`}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </Button>

      {/* Chat panel */}
      <div
        className={`fixed right-0 bottom-0 w-full sm:w-96 h-[600px] max-h-[80vh] mb-25 bg-background border border-border rounded-tl-lg shadow-xl z-40 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Chat header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-2">
            <MessageSquare className="h-6 w-6 text-primary" />
            <h2 className="font-semibold text-lg">Spiriter AI</h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleChat}
            aria-label="Close chat"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto p-4 h-[calc(100%-132px)]">
          {chat.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
              <MessageSquare className="h-12 w-12 mb-4 opacity-50" />
              <p className="mb-2">Welcome to Spiriter AI!</p>
              <p className="text-sm">How can I help you today?</p>
            </div>
          ) : (
            chat.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))
          )}
          <div ref={messagesEndRef}></div>
        </div>

        {/* Chat input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          className="border-t p-4 flex items-center space-x-2"
        >
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={!input.trim()}>
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </>
  );
}
