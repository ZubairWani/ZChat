// import { useState, useEffect } from 'react';
// import { useApp } from '../context/AppContext';

// export function HomePage() {
//   const [key, setKey] = useState('');
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [isVisible, setIsVisible] = useState(false);
  
//   const { login } = useApp();

//   useEffect(() => {
//     setIsVisible(true);
//   }, []);

//   const handleJoin = async () => {
//     if (!key.trim()) {
//       setError('Please enter a key.');
//       return;
//     }
    
//     setIsLoading(true);
//     setError('');

//     try {
//       const response = await fetch('/api/validate-key', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ key }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.error || 'Invalid Key');
//       }

//       login(data);

//     } catch (err) {
//       setError(err.message);
//       console.error('Validation failed:', err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
//       {/* Animated Background Elements */}
//       <div className="absolute inset-0 overflow-hidden">
//         {/* Floating Orbs */}
//         <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
//         <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
//         <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-slate-500/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
//         {/* Animated Grid */}
//         <div className="absolute inset-0 opacity-10">
//           <div className="grid grid-cols-12 gap-px h-full w-full">
//             {Array.from({ length: 144 }, (_, i) => (
//               <div 
//                 key={i} 
//                 className="bg-white/5 animate-pulse" 
//                 style={{ animationDelay: `${i * 0.1}s` }}
//               ></div>
//             ))}
//           </div>
//         </div>
        
//         {/* Floating Particles */}
//         <div className="absolute inset-0">
//           {Array.from({ length: 50 }, (_, i) => (
//             <div
//               key={i}
//               className="absolute w-1 h-1 bg-white/30 rounded-full animate-pulse"
//               style={{
//                 left: `${Math.random() * 100}%`,
//                 top: `${Math.random() * 100}%`,
//                 animationDelay: `${Math.random() * 3}s`,
//                 animationDuration: `${2 + Math.random() * 2}s`,
//               }}
//             ></div>
//           ))}
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
//         {/* Glass Morphism Container */}
//         <div className={`
//           w-full max-w-md sm:max-w-lg lg:max-w-xl xl:max-w-2xl 
//           backdrop-blur-xl bg-white/5 
//           border border-white/10 
//           rounded-3xl sm:rounded-4xl 
//           p-6 sm:p-8 lg:p-12 
//           shadow-2xl
//           transform transition-all duration-1000 ease-out
//           ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
//         `}>
          
//           {/* Logo/Brand Section */}
//           <div className="text-center mb-8 sm:mb-12">
//             <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 mb-6 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300">
//               <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
//               </svg>
//             </div>
            
//             <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent leading-tight">
//               Welcome to ZChat
//             </h1>
            
//             <p className="text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed max-w-lg mx-auto">
//               Securely connect with Zubair Wani. Enter the unique secret key he shared with you to begin a private, encrypted chat.
//             </p>
//           </div>

//           {/* Input Section */}
//           <div className="space-y-6">
//             <div className="relative">
//               <input
//                 type="text"
//                 value={key}
//                 onChange={(e) => setKey(e.target.value)}
//                 onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleJoin()}
//                 placeholder="Enter your secret key..."
//                 disabled={isLoading}
//                 className="
//                   w-full p-4 sm:p-5 lg:p-6 
//                   bg-white/5 backdrop-blur-sm 
//                   border border-white/20 
//                   rounded-2xl 
//                   text-white placeholder-gray-400 
//                   focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent
//                   transition-all duration-300 
//                   disabled:opacity-50 disabled:cursor-not-allowed
//                   text-sm sm:text-base lg:text-lg
//                   hover:bg-white/10 hover:border-white/30
//                 "
//               />
//               {/* Input Icon */}
//               <div className="absolute right-4 sm:right-5 top-1/2 transform -translate-y-1/2">
//                 <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 16.5H9v-1.5L7.5 13.5H6v-1.5L4.5 10.5H3a1 1 0 01-1-1V8a6 6 0 0113 0z" />
//                 </svg>
//               </div>
//             </div>

//             {/* Enter Button */}
//             <button 
//               onClick={handleJoin} 
//               disabled={isLoading || !key.trim()}
//               className="
//                 w-full p-4 sm:p-5 lg:p-6 
//                 bg-gradient-to-r from-blue-600 to-cyan-600 
//                 hover:from-blue-700 hover:to-cyan-700 
//                 text-white font-semibold 
//                 rounded-2xl 
//                 transition-all duration-300 
//                 transform hover:scale-[1.02] active:scale-[0.98]
//                 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
//                 shadow-lg hover:shadow-xl
//                 text-sm sm:text-base lg:text-lg
//                 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-transparent
//                 relative overflow-hidden
//               "
//             >
//               {/* Button Background Animation */}
//               <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              
//               {/* Button Content */}
//               <div className="relative flex items-center justify-center space-x-2">
//                 {isLoading ? (
//                   <>
//                     <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
//                     <span>Verifying Access...</span>
//                   </>
//                 ) : (
//                   <>
//                     <span>Enter Secure Chat</span>
//                     <svg className="w-5 h-5 sm:w-6 sm:h-6 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
//                     </svg>
//                   </>
//                 )}
//               </div>
//             </button>

//             {/* Error Message */}
//             {error && (
//               <div className="flex items-center space-x-2 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 animate-pulse">
//                 <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
//                 </svg>
//                 <span className="text-sm sm:text-base">{error}</span>
//               </div>
//             )}
//           </div>

//           {/* Security Badge */}
//           <div className="mt-8 sm:mt-12 text-center">
//             <div className="inline-flex items-center space-x-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-xs sm:text-sm">
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//               </svg>
//               <span>End-to-End Encrypted</span>
//             </div>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="mt-8 sm:mt-12 text-center text-gray-500 text-xs sm:text-sm">
//           <p>© 2025 ZLink. Secure. Private. Professional.</p>
//         </div>
//       </div>
//     </div>
//   );
// }













import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';

export function HomePage() {
  const [key, setKey] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const { login } = useApp();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleJoin = async () => {
    if (!key.trim()) {
      setError('Please enter a key.');
      return;
    }
    
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/validate-key', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ key }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Invalid Key');
      }

      // Start transition animation before login
      setIsTransitioning(true);
      
      // Delay login to show animation
      setTimeout(() => {
        login(data);
      }, 1500);

    } catch (err) {
      setError(err.message);
      console.error('Validation failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Digital Access Transition Overlay */}
      <div className={`
        fixed inset-0 z-50 pointer-events-none
        transition-all duration-1000 ease-in-out
        ${isTransitioning ? 'opacity-100' : 'opacity-0'}
      `}>
        {/* Matrix-style Digital Rain */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 12 }, (_, i) => (
            <div
              key={i}
              className={`
                absolute w-1 bg-gradient-to-b from-cyan-400 via-blue-400 to-transparent
                transition-all duration-1000 ease-out
                ${isTransitioning ? 'h-full opacity-80' : 'h-0 opacity-0'}
              `}
              style={{
                left: `${(i * 8) + 4}%`,
                animationDelay: `${i * 0.1}s`,
                transitionDelay: `${i * 0.05}s`
              }}
            ></div>
          ))}
        </div>
        
        {/* Scanning Beam */}
        <div className={`
          absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/40 to-transparent
          h-2 w-full
          transition-all duration-1200 ease-out
          ${isTransitioning ? 'translate-y-full opacity-100' : 'translate-y-0 opacity-0'}
        `} style={{ transitionDelay: '0.2s' }}></div>
        
        {/* Hexagonal Grid Pattern */}
        <div className={`
          absolute inset-0 opacity-20
          transition-all duration-1000 ease-out
          ${isTransitioning ? 'opacity-60 scale-110' : 'opacity-0 scale-100'}
        `} style={{ transitionDelay: '0.3s' }}>
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="hexPattern" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                <polygon points="5,1 8.66,3 8.66,7 5,9 1.34,7 1.34,3" fill="none" stroke="currentColor" strokeWidth="0.2"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#hexPattern)" className="text-cyan-400"/>
          </svg>
        </div>
        
        {/* Data Stream Lines */}
        {Array.from({ length: 8 }, (_, i) => (
          <div
            key={i}
            className={`
              absolute bg-gradient-to-r from-transparent via-blue-400/60 to-transparent
              h-px w-full
              transition-all duration-800 ease-out
              ${isTransitioning ? 'translate-x-full opacity-100' : '-translate-x-full opacity-0'}
            `}
            style={{
              top: `${20 + i * 10}%`,
              transitionDelay: `${0.1 + i * 0.05}s`
            }}
          ></div>
        ))}
        
        {/* Expanding Security Ring */}
        <div className={`
          absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-16 h-16 border-2 border-cyan-400 rounded-full
          transition-all duration-1000 ease-out
          ${isTransitioning ? 'scale-[25] opacity-0' : 'scale-1 opacity-100'}
        `} style={{ transitionDelay: '0.4s' }}></div>
        
        {/* Digital Particles */}
        {Array.from({ length: 30 }, (_, i) => (
          <div
            key={i}
            className={`
              absolute w-1 h-1 bg-cyan-400 rounded-full
              transition-all duration-1000 ease-out
              ${isTransitioning ? 'opacity-0' : 'opacity-100'}
            `}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: isTransitioning 
                ? `translate(${(Math.random() - 0.5) * 400}px, ${(Math.random() - 0.5) * 400}px)`
                : 'translate(0, 0)',
              transitionDelay: `${i * 0.03}s`
            }}
          ></div>
        ))}
        
        {/* Access Granted Text */}
        <div className={`
          absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          text-2xl font-bold text-cyan-400
          transition-all duration-800 ease-out
          ${isTransitioning ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}
        `} style={{ transitionDelay: '0.6s' }}>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 border-2 border-cyan-400 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span>ACCESS GRANTED</span>
          </div>
        </div>
        
        {/* Corner Brackets */}
        <div className={`
          absolute top-8 left-8 w-12 h-12 border-l-2 border-t-2 border-cyan-400
          transition-all duration-800 ease-out
          ${isTransitioning ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}
        `} style={{ transitionDelay: '0.5s' }}></div>
        
        <div className={`
          absolute top-8 right-8 w-12 h-12 border-r-2 border-t-2 border-cyan-400
          transition-all duration-800 ease-out
          ${isTransitioning ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}
        `} style={{ transitionDelay: '0.55s' }}></div>
        
        <div className={`
          absolute bottom-8 left-8 w-12 h-12 border-l-2 border-b-2 border-cyan-400
          transition-all duration-800 ease-out
          ${isTransitioning ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}
        `} style={{ transitionDelay: '0.6s' }}></div>
        
        <div className={`
          absolute bottom-8 right-8 w-12 h-12 border-r-2 border-b-2 border-cyan-400
          transition-all duration-800 ease-out
          ${isTransitioning ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}
        `} style={{ transitionDelay: '0.65s' }}></div>
      </div>

      {/* Main Content with Transition Effects */}
      <div className={`
        relative z-10 transition-all duration-1000 ease-out
        ${isTransitioning ? 'scale-95 opacity-0 blur-sm' : 'scale-100 opacity-100 blur-0'}
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
            
            {/* Logo/Brand Section */}
            <div className="text-center mb-8 sm:mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 mb-6 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent leading-tight">
                Welcome to ZChat
              </h1>
              
              <p className="text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed max-w-lg mx-auto">
                Securely connect with Zubair Wani. Enter the unique secret key he shared with you to begin a private, encrypted chat.
              </p>
            </div>

            {/* Input Section */}
            <div className="space-y-6">
              <div className="relative">
                <input
                  type="text"
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleJoin()}
                  placeholder="Enter your secret key..."
                  disabled={isLoading || isTransitioning}
                  className="
                    w-full p-4 sm:p-5 lg:p-6 
                    bg-white/5 backdrop-blur-sm 
                    border border-white/20 
                    rounded-2xl 
                    text-white placeholder-gray-400 
                    focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent
                    transition-all duration-300 
                    disabled:opacity-50 disabled:cursor-not-allowed
                    text-sm sm:text-base lg:text-lg
                    hover:bg-white/10 hover:border-white/30
                  "
                />
                {/* Input Icon */}
                <div className="absolute right-4 sm:right-5 top-1/2 transform -translate-y-1/2">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 16.5H9v-1.5L7.5 13.5H6v-1.5L4.5 10.5H3a1 1 0 01-1-1V8a6 6 0 0113 0z" />
                  </svg>
                </div>
              </div>

              {/* Enter Button */}
              <button 
                onClick={handleJoin} 
                disabled={isLoading || !key.trim() || isTransitioning}
                className="
                  w-full p-4 sm:p-5 lg:p-6 
                  bg-gradient-to-r from-blue-600 to-cyan-600 
                  hover:from-blue-700 hover:to-cyan-700 
                  text-white font-semibold 
                  rounded-2xl 
                  transition-all duration-300 
                  transform hover:scale-[1.02] active:scale-[0.98]
                  disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                  shadow-lg hover:shadow-xl
                  text-sm sm:text-base lg:text-lg
                  focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-transparent
                  relative overflow-hidden
                  group
                "
              >
                {/* Button Background Animation */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                
                {/* Button Content */}
                <div className="relative flex items-center justify-center space-x-2">
                  {isLoading || isTransitioning ? (
                    <>
                      <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>{isTransitioning ? 'Establishing Connection...' : 'Verifying Access...'}</span>
                    </>
                  ) : (
                    <>
                      <span>Enter Secure Chat</span>
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </>
                  )}
                </div>
              </button>

              {/* Error Message */}
              {error && (
                <div className="flex items-center space-x-2 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 animate-pulse">
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <span className="text-sm sm:text-base">{error}</span>
                </div>
              )}
            </div>

            {/* Security Badge */}
            <div className="mt-8 sm:mt-12 text-center">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-xs sm:text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>End-to-End Encrypted</span>
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