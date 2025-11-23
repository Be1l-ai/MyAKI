import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full bg-white text-black py-12 px-4 border-t-2 border-theme-gold grid-bg-gold relative overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `linear-gradient(rgba(212, 175, 55, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212, 175, 55, 0.3) 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }}></div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Main message */}
        <div className="text-center mb-8">
          <h3 className="text-3xl font-romantic font-bold mb-4 text-black">
            Forever and Always
          </h3>
          <p className="text-lg font-modern text-black">
            Thank you for being my everything ❤️
          </p>
        </div>

        {/* Divider */}
        <div className="w-32 h-1 bg-theme-gold mx-auto mb-8"></div>

        {/* Notes section */}
        <div className="text-center space-y-4 mb-8">
          <p className="font-modern text-sm md:text-base text-black">
            💝 Every moment with you is a treasure
          </p>
          <p className="font-modern text-sm md:text-base text-black">
            🌟 You make every day brighter
          </p>
          <p className="font-modern text-sm md:text-base text-black">
            ✨ Here's to many more adventures together
          </p>
        </div>

        {/* Custom notes area - editable */}
        <div className="bg-theme-gold/10 backdrop-blur-sm rounded-xl p-6 mb-8 border border-theme-gold/50">
          <h4 className="text-xl font-romantic font-bold text-center mb-4 text-black">
            Special Notes
          </h4>
          <div className="space-y-2 text-center font-modern text-sm md:text-base text-black">
            <p>📝 Add your personal notes here</p>
            <p>📝 Share your favorite memories</p>
            <p>📝 Write promises for the future</p>
          </div>
        </div>

        {/* Bottom text */}
        <div className="text-center text-sm font-modern text-black">
          <p>Made with 💖 for Aki</p>
          <p className="mt-2">© {new Date().getFullYear()} • Our Love Story Continues...</p>
        </div>
      </div>
    </footer>
  );
}
