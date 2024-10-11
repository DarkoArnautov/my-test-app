"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Textarea,
  Avatar,
  ScrollShadow,
} from "@nextui-org/react";
import { User, Bot, Send } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const AIAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hello! How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  const handleSubmit = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulating AI response
    setTimeout(() => {
      const aiResponses = [
        "I understand. Could you provide more details?",
        "That's interesting. What else would you like to know?",
        "I see. How can I further assist you?",
        "Noted. Is there anything specific you're looking for?",
      ];
      const randomResponse =
        aiResponses[Math.floor(Math.random() * aiResponses.length)];
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: randomResponse },
      ]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto h-[90vh] flex items-center">
      <Card className="w-full h-full bg-white rounded-lg">
        <CardHeader className="flex justify-between items-center bg-gray-100 p-4">
          <h4 className="text-xl font-bold text-gray-800">AI Assistant</h4>
        </CardHeader>
        <CardBody>
          <ScrollShadow className="h-[calc(100vh-15rem)] w-full pr-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                } mb-4`}
              >
                <div
                  className={`flex items-start max-w-[70%] ${
                    message.role === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  <Avatar
                    icon={message.role === "user" ? <User /> : <Bot />}
                    className={`w-8 h-8 ${
                      message.role === "user" ? "bg-gray-600" : "bg-gray-400"
                    }`}
                  />
                  <div
                    className={`mx-2 p-3 rounded-lg ${
                      message.role === "user"
                        ? "bg-gray-200 text-gray-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start mb-4">
                <div className="flex items-center bg-gray-100 rounded-lg p-3">
                  <div className="dot-flashing"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </ScrollShadow>
        </CardBody>
        <CardFooter className="border-t border-gray-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="flex items-end w-full space-x-2"
          >
            <Textarea
              placeholder="Type your message here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-grow bg-white text-gray-800 border-gray-300 min-h-[40px] rounded-md"
              minRows={1}
              maxRows={5}
              ref={textareaRef}
            />
            <Button
              type="submit"
              isDisabled={isLoading || !input.trim()}
              className="bg-gray-800 text-white h-[40px]"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AIAssistant;
