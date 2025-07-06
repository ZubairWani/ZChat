import { useState, useEffect } from 'react';
import { WelcomeHeader } from '../components/WelcomeHeader';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

export function WelcomePage() {
  const [isVisible, setIsVisible] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { user } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // If for some reason the user data is not available, redirect to home
  if (!user || !user.conversationId) {
    navigate('/');
    return null; 
  }

  const handleStartChat = () => {
    // Trigger the transition animation
    setIsTransitioning(true);
    
    // Navigate after animation completes
    setTimeout(() => {
      navigate(`/chat/${user.conversationId}`);
    }, 1200); // Slightly longer than the animation duration
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Transition Overlay */}
      <div className={`
        fixed inset-0 z-50 pointer-events-none
        transition-all duration-1000 ease-in-out
        ${isTransitioning ? 'opacity-100' : 'opacity-0'}
      `}>
        {/* Expanding Circles */}
        <div className={`
          absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-4 h-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full
          transition-all duration-1000 ease-out
          ${isTransitioning ? 'scale-[200] opacity-90' : 'scale-0 opacity-0'}
        `}></div>
        
        {/* Ripple Effects */}
        <div className={`
          absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-8 h-8 border-2 border-cyan-400 rounded-full
          transition-all duration-800 ease-out
          ${isTransitioning ? 'scale-[150] opacity-0' : 'scale-0 opacity-100'}
        `}></div>
        
        <div className={`
          absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-12 h-12 border-2 border-blue-400 rounded-full
          transition-all duration-1000 ease-out
          ${isTransitioning ? 'scale-[100] opacity-0' : 'scale-0 opacity-100'}
        `} style={{ transitionDelay: '0.1s' }}></div>
        
        {/* Particle Burst */}
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className={`
              absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full
              transition-all duration-1000 ease-out
              ${isTransitioning ? 'opacity-0' : 'opacity-100'}
            `}
            style={{
              transform: isTransitioning 
                ? `translate(${Math.cos(i * 18 * Math.PI / 180) * 200}px, ${Math.sin(i * 18 * Math.PI / 180) * 200}px) translate(-50%, -50%)`
                : 'translate(-50%, -50%)',
              transitionDelay: `${i * 0.02}s`
            }}
          ></div>
        ))}
        
        {/* Scanning Lines */}
        <div className={`
          absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent
          w-1 h-full
          transition-all duration-800 ease-out
          ${isTransitioning ? 'translate-x-full opacity-100' : '-translate-x-full opacity-0'}
        `} style={{ transitionDelay: '0.2s' }}></div>
        
        <div className={`
          absolute inset-0 bg-gradient-to-b from-transparent via-blue-400/30 to-transparent
          w-full h-1
          transition-all duration-800 ease-out
          ${isTransitioning ? 'translate-y-full opacity-100' : '-translate-y-full opacity-0'}
        `} style={{ transitionDelay: '0.3s' }}></div>
        
        {/* Digital Grid Overlay */}
        <div className={`
          absolute inset-0 opacity-20
          transition-all duration-1000 ease-out
          ${isTransitioning ? 'opacity-100 scale-110' : 'opacity-0 scale-100'}
        `} style={{ transitionDelay: '0.4s' }}>
          <div className="grid grid-cols-8 gap-px h-full w-full">
            {Array.from({ length: 64 }, (_, i) => (
              <div 
                key={i} 
                className={`
                  bg-cyan-400/20 
                  transition-all duration-300 ease-out
                  ${isTransitioning ? 'opacity-100' : 'opacity-0'}
                `}
                style={{ transitionDelay: `${i * 0.01}s` }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content with Transition Effects */}
      <div className={`
        relative z-10 transition-all duration-1000 ease-out
        ${isTransitioning ? 'scale-110 opacity-0 blur-sm' : 'scale-100 opacity-100 blur-0'}
      `}>
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

        {/* Main Content */}
        <div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
          {/* Glass Morphism Container */}
          <div className={`
            w-full max-w-md sm:max-w-lg lg:max-w-xl xl:max-w-2xl 
            backdrop-blur-xl bg-white/5 
            border border-white/10 
            rounded-3xl sm:rounded-4xl 
            p-6 sm:p-8 lg:p-12 
            shadow-2xl
            transform transition-all duration-1000 ease-out
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
          `}>
            
            {/* Success Icon */}
            <div className="text-center mb-8 sm:mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 mb-6 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent leading-tight">
                Access Granted
              </h1>
              
              <p className="text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed max-w-lg mx-auto mb-6">
                Your secure connection has been established. You're now ready to begin your encrypted conversation.
              </p>
            </div>

            {/* Welcome Header Component */}
            <div className="mb-8 sm:mb-12">
              <WelcomeHeader userName={user.name} partnerName={user.otherName} />
            </div>

            {/* Start Chat Button */}
            <div className="text-center">
              <button
                onClick={handleStartChat}
                disabled={isTransitioning}
                className={`
                  w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 lg:py-6 
                  bg-gradient-to-r from-blue-600 to-cyan-600 
                  hover:from-blue-700 hover:to-cyan-700 
                  text-white font-semibold 
                  rounded-2xl 
                  transition-all duration-300 
                  transform hover:scale-[1.02] active:scale-[0.98]
                  shadow-lg hover:shadow-xl
                  text-sm sm:text-base lg:text-lg
                  focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-transparent
                  relative overflow-hidden
                  group
                  ${isTransitioning ? 'cursor-not-allowed opacity-75' : ''}
                `}
              >
                {/* Button Background Animation */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                
                {/* Loading Spinner for Transition */}
                {isTransitioning && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  </div>
                )}
                
                {/* Button Content */}
                <div className={`
                  relative flex items-center justify-center space-x-2
                  transition-opacity duration-300
                  ${isTransitioning ? 'opacity-0' : 'opacity-100'}
                `}>
                  <span>Start Chatting</span>
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
              </button>
            </div>

            {/* Connection Status */}
            <div className="mt-8 sm:mt-12 text-center">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs sm:text-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span>Secure Connection Active</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 sm:mt-12 text-center text-gray-500 text-xs sm:text-sm">
            <p>© 2025 ZLink. Secure. Private. Professional.</p>
          </div>
        </div>
      </div>
    </div>
  );
}