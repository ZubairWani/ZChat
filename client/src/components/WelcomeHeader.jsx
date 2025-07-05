// In client/src/components/WelcomeHeader.jsx
export function WelcomeHeader({ userName, partnerName }) {
  return (
    <div className="max-w-2xl text-center">
      {/* Welcome Message */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent">
          Welcome, {userName}!
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed">
          You are about to start a private chat with{' '}
          <span className="font-semibold text-cyan-300">{partnerName}</span>.
        </p>
      </div>

     

      {/* Chat Preview */}
      <div className="text-center">
        <p className="text-xs sm:text-sm text-gray-400 mb-2">Your conversation will be:</p>
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          <span className="inline-flex items-center px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs">
            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Private
          </span>
          <span className="inline-flex items-center px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-xs">
            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Secure
          </span>
          <span className="inline-flex items-center px-3 py-1 bg-slate-500/10 border border-slate-500/20 rounded-full text-slate-400 text-xs">
            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Real-time
          </span>
        </div>
      </div>
    </div>
  );
}