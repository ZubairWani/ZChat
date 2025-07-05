// In client/src/components/NotificationBadge.jsx
export function NotificationBadge({ count }) {
  if (count === 0) return null;
  
  return (
    <span className="
      relative inline-flex items-center justify-center 
      min-w-6 h-6 px-2 py-1 
      text-xs font-bold leading-none text-white 
      bg-gradient-to-r from-red-500 to-pink-500 
      border border-red-400/30 
      rounded-full 
      shadow-lg shadow-red-500/25
      backdrop-blur-sm
      transform transition-all duration-300 
      hover:scale-110 hover:shadow-xl hover:shadow-red-500/40
      animate-pulse
    ">
      {count > 99 ? '99+' : count}
      
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-400/30 to-pink-400/30 rounded-full blur-sm animate-pulse"></div>
      
      {/* Ping Animation for new notifications */}
      <div className="absolute -inset-1 bg-red-500/30 rounded-full animate-ping"></div>
    </span>
  );
}