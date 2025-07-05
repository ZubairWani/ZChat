// In client/src/components/ChatInput.jsx

import { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';

export function ChatInput({ onSendMessage }) {
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiClick = (emojiObject) => {
    setMessage((prevMessage) => prevMessage + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="relative">
      {/* Emoji Picker */}
      {showEmojiPicker && (
        <div className="absolute bottom-full left-0 mb-2 z-50">
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-2 shadow-2xl">
            <EmojiPicker 
              onEmojiClick={handleEmojiClick} 
              theme="dark"
              emojiStyle="native"
              searchDisabled={true}
              skinTonePickerLocation="PREVIEW"
              width={300}
              height={400}
            />
          </div>
        </div>
      )}

      {/* Input Container with Glass Morphism */}
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-3 sm:p-4 shadow-2xl">
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Emoji Button */}
          <button
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="
              p-2 sm:p-3 
              rounded-full 
              backdrop-blur-sm bg-white/5 
              border border-white/10 
              hover:bg-white/10 hover:border-white/20 
              transition-all duration-300 
              transform hover:scale-105 active:scale-95
              focus:outline-none focus:ring-2 focus:ring-blue-500/50
              text-gray-300 hover:text-white
            "
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>

          {/* Text Input */}
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type a message..."
            className="
              flex-grow 
              p-3 sm:p-4 
              backdrop-blur-sm bg-white/5 
              border border-white/10 
              rounded-2xl 
              focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50
              focus:outline-none 
              text-white placeholder-gray-400
              transition-all duration-300
              hover:bg-white/10 hover:border-white/20
            "
          />

          {/* Send Button */}
          <button
            onClick={handleSend}
            className={`
              px-4 sm:px-6 py-3 sm:py-4 
              font-semibold text-white 
              rounded-2xl 
              transition-all duration-300 
              transform hover:scale-105 active:scale-95
              focus:outline-none focus:ring-2 focus:ring-blue-500/50
              ${message.trim() 
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg hover:shadow-xl' 
                : 'bg-white/10 border border-white/20 cursor-not-allowed opacity-50'
              }
            `}
            disabled={!message.trim()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}