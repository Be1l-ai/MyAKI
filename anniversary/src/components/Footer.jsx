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
          <h3 className="text-3xl font-romantic font-bold mb-4 text-theme-black">
            I love you for Eternity, Aki
          </h3>
          <p className="text-lg font-modern text-theme-charcoal">
            Thank you for being my everything
          </p>
        </div>

        {/* Divider */}
        <div className="w-32 h-1 bg-theme-gold mx-auto mb-8"></div>

        {/* Notes section */}
        <div className="text-center space-y-4 mb-8">
          <p className="font-modern text-sm md:text-base text-theme-charcoal">
            Every day that I'm with you is every day that I would choose you again
          </p>
          <p className="font-modern text-sm md:text-base text-theme-charcoal">
            You always make my day better and my life lighter
          </p>
          <p className="font-modern text-sm md:text-base text-theme-charcoal">
            I'm looking forward to many more days and memory we would have Aki
          </p>
        </div>

        {/* Custom notes area - editable */}
        <div className="bg-theme-gold/10 backdrop-blur-sm rounded-xl p-6 mb-8 border border-theme-gold/50">
          <h4 className="text-xl font-romantic font-bold text-center mb-4 text-theme-black">
            Special Notes
          </h4>
          <div className="space-y-2 text-center font-modern text-sm md:text-base text-theme-charcoal">
            <p>First, Sorry po medyo new ako sa technology na ginamit dito hehe kaya hindi ganun kaganda yung pagkakagawa ko po</p>
            <p>Which part do you like the best aki? I hope you like my gift, ahhhh pati physical gift ko hindi maayos (*꒦ິ꒳꒦ີ)</p>
            <p>I love you so much aki, I can't wait to see you for this upcoming saturday. I miss you so much. ( •̯́ ^ •̯̀)</p>
          </div>
        </div>

        {/* Bottom text */}
        <div className="text-center text-sm font-modern text-theme-charcoal">
          <p>Made for my Aki</p>
        </div>
      </div>
    </footer>
  );
}
