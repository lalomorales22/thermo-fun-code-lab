
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, Bot, User, Key, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({ isOpen, onClose }) => {
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('anthropic_api_key') || '');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your AI assistant for thermodynamic computing. I can help you with concepts, equations, and practical applications. Please enter your Anthropic API key to get started.',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showApiKeyInput, setShowApiKeyInput] = useState(!apiKey);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const saveApiKey = () => {
    localStorage.setItem('anthropic_api_key', apiKey);
    setShowApiKeyInput(false);
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || !apiKey) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-5-sonnet-20241022',
          max_tokens: 1024,
          system: 'You are an expert AI assistant specializing in thermodynamic computing. Help users understand concepts, solve problems, and learn about thermal management in computing systems. Be concise but thorough.',
          messages: [
            {
              role: 'user',
              content: inputMessage
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.content[0].text,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error calling Anthropic API:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please check your API key and try again.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    }

    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed right-0 top-0 h-full w-96 bg-white/10 backdrop-blur-lg border-l border-white/20 flex flex-col z-50">
      {/* Header */}
      <div className="p-4 border-b border-white/20 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-cyan-500/20 p-2 rounded-full">
            <Bot className="h-5 w-5 text-cyan-300" />
          </div>
          <div>
            <h3 className="text-white font-semibold">AI Assistant</h3>
            <p className="text-cyan-200 text-sm">Claude Sonnet 3.5</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="text-white hover:bg-white/10"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* API Key Input */}
      {showApiKeyInput && (
        <div className="p-4 bg-yellow-500/10 border-b border-white/20">
          <div className="flex items-center space-x-2 mb-2">
            <Key className="h-4 w-4 text-yellow-300" />
            <span className="text-yellow-200 text-sm font-medium">API Key Required</span>
          </div>
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Enter your Anthropic API key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
            />
            <Button
              onClick={saveApiKey}
              disabled={!apiKey}
              className="w-full bg-cyan-500 hover:bg-cyan-400 text-white"
            >
              Save API Key
            </Button>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.role === 'user'
                  ? 'bg-cyan-500 text-white'
                  : 'bg-white/10 text-white border border-white/20'
              }`}
            >
              <div className="flex items-start space-x-2">
                {message.role === 'assistant' && (
                  <Bot className="h-4 w-4 text-cyan-300 mt-0.5 flex-shrink-0" />
                )}
                {message.role === 'user' && (
                  <User className="h-4 w-4 text-white mt-0.5 flex-shrink-0" />
                )}
                <div className="flex-1">
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white/10 border border-white/20 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <Bot className="h-4 w-4 text-cyan-300 animate-pulse" />
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-cyan-300 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-cyan-300 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-cyan-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-white/20">
        <div className="flex space-x-2">
          <Textarea
            placeholder="Ask about thermodynamic computing..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={!apiKey || isLoading}
            className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-gray-400 resize-none"
            rows={2}
          />
          <Button
            onClick={sendMessage}
            disabled={!inputMessage.trim() || !apiKey || isLoading}
            className="bg-cyan-500 hover:bg-cyan-400 text-white px-3"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        {!apiKey && (
          <button
            onClick={() => setShowApiKeyInput(true)}
            className="text-xs text-cyan-300 hover:text-cyan-200 mt-2"
          >
            Configure API Key
          </button>
        )}
      </div>
    </div>
  );
};
