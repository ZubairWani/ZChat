// In client/src/components/MessageBubble.jsx

export function MessageBubble({ message, isOwnMessage }) {
  // Format the timestamp into a readable time string
  const time = new Date(message.createdAt).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    // Main container for the message row
    <div className={`flex items-end ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex flex-col max-w-xs md:max-w-md lg:max-w-lg ${isOwnMessage ? 'items-end' : 'items-start'}`}>
        
        {/* The message bubble itself */}
        <div 
          className={`
            px-4 py-3 sm:px-5 sm:py-4
            backdrop-blur-xl 
            border 
            shadow-lg hover:shadow-xl
            transition-all duration-300 
            transform hover:scale-[1.02]
            ${isOwnMessage 
              ? `bg-gradient-to-r from-blue-600 to-cyan-600 
                 text-white 
                 border-blue-500/30 
                 rounded-3xl rounded-br-lg
                 shadow-blue-500/25` 
              : `bg-white/10 
                 text-white 
                 border-white/20 
                 rounded-3xl rounded-bl-lg
                 shadow-white/10`
            }
          `}
        >
          {/* We show the sender's name only if it's NOT our own message */}
          {!isOwnMessage && (
            <p className="text-sm font-bold text-cyan-300 mb-1 opacity-90">
              {message.senderName}
            </p>
          )}
          <p className="text-base sm:text-lg break-words leading-relaxed">
            {message.content}
          </p>
        </div>
        
        {/* Timestamp below the bubble */}
        <p className={`
          text-xs text-gray-400 mt-2 px-2 
          font-medium opacity-70
          ${isOwnMessage ? 'text-right' : 'text-left'}
        `}>
          {time}
        </p>
      </div>
    </div>
  );
}