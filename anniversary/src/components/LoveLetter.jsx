import React, { useState } from 'react';

export default function LoveLetter() {
  const [isOpen, setIsOpen] = useState(false);
  const [hearts, setHearts] = useState([]);

  const handleHeartClick = () => {
    if (!isOpen) {
      // Create heart explosion
      const newHearts = [];
      for (let i = 0; i < 50; i++) {
        newHearts.push({
          id: Date.now() + i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          delay: Math.random() * 0.5,
          duration: 1 + Math.random() * 2,
          rotation: Math.random() * 360,
          emoji: ['❤︎', '♡', '♥︎'][Math.floor(Math.random() * 7)]
        });
      }
      setHearts(newHearts);
      
      // Open letter after explosion
      setTimeout(() => {
        setIsOpen(true);
      }, 500);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setHearts([]);
  };

  return (
    <div className="relative w-full flex justify-center items-center py-20">
      {/* Heart Button */}
      {!isOpen && (
        <button
          onClick={handleHeartClick}
          className="group relative w-32 h-32 transform transition-all duration-300 hover:scale-110"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-theme-gold to-theme-gold-dark rounded-full animate-pulse shadow-lg shadow-theme-gold/50"></div>
          <div className="absolute inset-2 bg-theme-black rounded-full flex items-center justify-center border-2 border-theme-gold/30">
            <span className="text-6xl text-theme-gold group-hover:scale-110 transition-transform duration-300">
              ❤︎
            </span>
          </div>
          <p className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-white font-modern text-sm">
            Click to reveal
          </p>
        </button>
      )}

      {/* Heart Confetti */}
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="fixed pointer-events-none z-50 text-4xl"
          style={{
            left: `${heart.x}%`,
            top: `${heart.y}%`,
            animation: `heartFloat ${heart.duration}s ease-out ${heart.delay}s forwards`,
            transform: `rotate(${heart.rotation}deg)`,
            filter: 'drop-shadow(0 0 8px rgba(212, 175, 55, 0.6))',
          }}
        >
          {heart.emoji}
        </div>
      ))}

      {/* Love Letter Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-gradient-to-br from-theme-black via-theme-charcoal to-theme-gray border-2 border-theme-gold rounded-2xl shadow-2xl shadow-theme-gold/30 max-w-3xl w-full max-h-[80vh] overflow-y-auto p-8 md:p-12 relative animate-scaleIn">
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-theme-gold shadow-lg flex items-center justify-center text-theme-black hover:bg-theme-gold-light transition-colors"
            >
              ✕
            </button>

            {/* Letter content */}
            <div className="prose prose-lg max-w-none">
              <h2 className="text-4xl font-romantic font-bold text-white mb-6 text-center">
                To My Dearest Aki
              </h2>
              
              <div className="text-white font-modern space-y-4 leading-relaxed">
                <p>
                  From the moment we met on September 10th, 2024, my life changed in ways I never imagined. 
                  You brought color to my world, light to my darkest days, and joy to every moment we share.
                </p>
                
                <p>
                  When we became official on November 17th, 2024, I knew that was just the beginning of our 
                  beautiful journey together. Every day with you feels like a dream I never want to wake up from.
                </p>
                
                <p>
                  You make me laugh when I want to cry, you hold me close when I need comfort, and you 
                  inspire me to be the best version of myself. Your smile is my favorite sight, your laugh 
                  is my favorite sound, and your happiness is my greatest goal.
                </p>
                
                <p>
                  This past year has been filled with incredible memories - from our first awkward hello to 
                  our comfortable silences, from spontaneous adventures to quiet evenings together. Each moment 
                  with you is a treasure I hold close to my heart.
                </p>
                
                <p>
                  I promise to love you on your good days and bad days, to support your dreams as if they were 
                  my own, to laugh with you until our stomachs hurt, and to hold your hand through whatever 
                  life brings our way.
                </p>
                
                <p>
                  Thank you for choosing me, for loving me, for being patient with me, and for making every 
                  day brighter. I can't wait to create a million more memories with you, to explore the world 
                  together, and to build our future side by side.
                </p>
                
                <p className="text-xl font-romantic font-bold text-white text-center mt-8">
                  Here's to us, to our love, and to forever.
                </p>
                
                <p className="text-right italic mt-8 text-white">
                  Forever yours,<br />
                  <span className="font-romantic text-2xl text-white">Your [Your Name]</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
