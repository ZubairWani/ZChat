import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import io from 'socket.io-client';
import { MessageBubble } from '../components/MessageBubble';
import { ChatInput } from '../components/ChatInput';

const socket = io('http://localhost:4000');

export function ChatPage() {
  const { conversationId } = useParams();
  const { user } = useApp();
  const navigate = useNavigate();
  
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [chatPartnerName, setChatPartnerName] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    // Logic to determine the chat partner's name
    if (user.role === 'admin') {
      // For the admin, the name is in the conversationId (e.g., 'yahya-zubair')
      const names = conversationId.split('-');
      const partner = names.find(name => name !== user.name.toLowerCase());
      setChatPartnerName(partner.charAt(0).toUpperCase() + partner.slice(1)); // Capitalize the first letter
    } else {
      // For a friend, the partner's name is already in the context
      setChatPartnerName(user.otherName);
    }

    socket.emit('joinRoom', conversationId);
    
    if (user.role === 'admin') {
      fetch('/api/conversations/mark-as-read', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conversationId }),
      });
    }

    const fetchMessages = async () => {
      try {
        const response = await fetch(`/api/messages/${conversationId}`);
        const data = await response.json();
        setMessages(data);
      } catch (err) {
        console.error("Failed to fetch messages", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMessages();

    const handleNewMessage = (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };
    socket.on('newMessage', handleNewMessage);

    return () => {
      socket.off('newMessage', handleNewMessage);
    };
  }, [conversationId, user, navigate]);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (content) => {
    if (!content.trim() || !user) return;
    const messageData = { conversationId, senderName: user.name, content };
    socket.emit('sendMessage', messageData);
  };

  // Function to handle going back
  const handleGoBack = () => {
    if (user.role === 'admin') {
      navigate('/dashboard');
    } else {
      navigate('/welcome');
    }
  };

  if (isLoading) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating Orbs */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-slate-500/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          
          {/* Animated Grid */}
          <div className="absolute inset-0 opacity-10">
            <div className="grid grid-cols-12 gap-px h-full w-full">
              {Array.from({ length: 144 }, (_, i) => (
                <div 
                  key={i} 
                  className="bg-white/5 animate-pulse" 
                  style={{ animationDelay: `${i * 0.1}s` }}
                ></div>
              ))}
            </div>
          </div>
          
          {/* Floating Particles */}
          <div className="absolute inset-0">
            {Array.from({ length: 50 }, (_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white/30 rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                }}
              ></div>
            ))}
          </div>
        </div>

        {/* Loading Content */}
        <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl text-center">
            <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white text-lg">Loading chat...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-slate-500/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-12 gap-px h-full w-full">
            {Array.from({ length: 144 }, (_, i) => (
              <div 
                key={i} 
                className="bg-white/5 animate-pulse" 
                style={{ animationDelay: `${i * 0.1}s` }}
              ></div>
            ))}
          </div>
        </div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 50 }, (_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Main Chat Container */}
      <div className="relative z-10 flex flex-col h-screen">
        {/* Header with Glass Morphism */}
        <header className={`
          backdrop-blur-xl bg-white/5 
          border-b border-white/10 
          p-4 sm:p-6
          transform transition-all duration-1000 ease-out
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
        `}>
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            <button 
              onClick={handleGoBack} 
              className="
                p-2 sm:p-3 
                rounded-full 
                backdrop-blur-sm bg-white/5 
                border border-white/10 
                hover:bg-white/10 hover:border-white/20 
                transition-all duration-300 
                transform hover:scale-105 active:scale-95
                focus:outline-none focus:ring-2 focus:ring-blue-500/50
              "
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <div className="flex items-center space-x-3 sm:space-x-4">
              {/* Partner Avatar */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-semibold text-lg sm:text-xl">
                {chatPartnerName.charAt(0).toUpperCase()}
              </div>
              
              {/* Chat Title */}
              <div>
                <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
                  {chatPartnerName}
                </h1>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs sm:text-sm text-gray-300">Secure Chat</span>
                </div>
              </div>
            </div>
            
            <div className="w-8 sm:w-12"></div> {/* Spacer to keep title centered */}
          </div>
        </header>

        {/* Message Area with Glass Morphism */}
        <main className={`
          flex-1 overflow-hidden 
          transform transition-all duration-1000 ease-out
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
        `} style={{ animationDelay: '0.2s' }}>
          <div className="h-full overflow-y-auto p-4 sm:p-6 max-w-4xl mx-auto">
            <div className="space-y-4 sm:space-y-6">
              {messages.length > 0 ? (
                messages.map((msg, index) => (
                  <div
                    key={msg._id}
                    className="transform transition-all duration-500 ease-out"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      animation: isVisible ? 'slideIn 0.6s ease-out forwards' : 'none',
                      opacity: isVisible ? 1 : 0,
                    }}
                  >
                    <MessageBubble 
                      message={msg}
                      isOwnMessage={msg.senderName === user.name}
                    />
                  </div>
                ))
              ) : (
                <div className={`
                  flex flex-col items-center justify-center h-full text-center
                  backdrop-blur-sm bg-white/5 
                  border border-white/10 
                  rounded-3xl p-8 sm:p-12
                  transform transition-all duration-1000 ease-out
                  ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
                `} style={{ animationDelay: '0.4s' }}>
                  <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 mb-6 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl shadow-lg">
                    <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Start the Conversation</h3>
                  <p className="text-gray-300 text-sm sm:text-base">This is the beginning of your secure chat with {chatPartnerName}.</p>
                  <p className="text-gray-400 text-sm sm:text-base mt-2">Say hello and start chatting!</p>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
        </main>

        {/* Input Area with Glass Morphism */}
        <div className={`
          backdrop-blur-xl bg-white/5 
          border-t border-white/10 
          p-4 sm:p-6
          transform transition-all duration-1000 ease-out
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
        `} style={{ animationDelay: '0.4s' }}>
          <div className="max-w-4xl mx-auto">
            <ChatInput onSendMessage={handleSendMessage} />
          </div>
        </div>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}