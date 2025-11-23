import React, { useState, useEffect } from 'react';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image - placeholder */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-theme-black via-theme-charcoal to-theme-gray"
        style={{
          backgroundImage: 'url(assets/images/couple.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Floating hearts animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute text-sm text-theme-gold opacity-60 animate-floatUp"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
            }}
          >
            {['❤︎', '♡', '♥︎', '𦃲', '𖝭', '᫫᭡', '‹𝞹'][Math.floor(Math.random() * 5)]}
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
        <div
          className={`transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          {/* Main title */}
          <h1 className="text-6xl md:text-8xl font-romantic font-bold text-theme-gold mb-6 drop-shadow-2xl animate-fadeInDown">
            Happy Anniversary! <br/> Akiiii! ❸(｡˃ ᵕ ˂)❽♡
          </h1>
          
          {/* Subtitle */}
          <p className="text-2xl md:text-3xl font-modern text-white mb-8 drop-shadow-lg animate-fadeInUp">
            One whole amazing year with you
          </p>

          {/* Decorative line */}
          <div className="w-32 h-1 bg-theme-gold mx-auto mb-8 animate-expandWidth"></div>

          {/* Date */}
          <p className="text-xl md:text-2xl font-romantic text-theme-gold-light mb-12 animate-fadeIn">
            Aki we known each other since September 10, 2024
          </p>

          {/* GIF placeholder */}
          <div className="relative inline-block animate-bounce-slow">
            <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-theme-gold/20 backdrop-blur-sm border-4 border-theme-gold/50 flex items-center justify-center overflow-hidden shadow-2xl">
              {/* Replace with actual GIF */}
              <img 
                src="assets/gifs/hero-animation.gif" 
                alt="ken and rai"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
