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
            Click this po hehe
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
          <div className="max-w-3xl w-full p-4">
            <div className="relative">

              {/* Envelope body */}
              <div className="bg-gradient-to-br from-theme-black via-theme-charcoal to-theme-gray border-2 border-theme-gold rounded-3xl shadow-2xl shadow-theme-gold/30 w-full max-h-[80vh] overflow-y-auto p-8 md:p-12 relative animate-scaleIn">
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
                      It's been 2 weeks past our anniversary po aki, I would like to apologize one last time for the delay I've cause sa anniversary celebration natin.
                      Aki, ever since i met you or talk with you since online tayo po nagkakilala. Ever since that day my life changed for better. Every since we talked, I knew i should get close with you more.
                      I want to learn about you more, maybe that time i still haven't realize that it was love, after all it was unfamiliar to me. Hehe if i knew what that was in the first place sep 10 anniversary natin hindi nov 17.
                      It's been a year since that day too and this feeling has not gone down for a simple moment, in fact its even stronger than it used to. Everyday waking up, I look for your presence, I would go greet you good morning immediately hoping i can immediately talk with you.
                      And every day, every time we talk I feel like im in heaven. I'm so lucky i have met you.
                    </p>

                    <p>
                      Thank you Aki. Thank you for the way you love me. Not just on the days you show it but for everyday that you choose me. For the small gesture, for the assurance, for never letting me feel unloved.
                      Thank you for understanding me even when im being unreasonable. Thank you for all the gifts you gave me. Thank you for speaking and talking with me even when you're tired from hope, for all the money you spent on me.
                      Thank you for letting me be a part of your life. I notice it all and i appreciate it all aki. Thank you for everything.
                    </p>

                    <p>
                      I remember nung first date natin, i was still awkward that time but the way you look at me like you saw 1k sa sahig. Your eyes are shining, that's the day I first saw you personally and that looks of yours stick to me so much.
                      There's that time when we played horror game together too. It might seems not much but for me its one of the best moment of my life, sayang hindi tayo naka call but you look so cute that time. You even run away from me because of my double ganger.
                      For all of our silent moments sa chats, it's something worth remembering. It's actually amazing how spending with time with you doing nothing still somehow feels amazing and thats online, us without seeing each other. Honestly whenever it's the silent moment or big topics, talking with you always feels comfortable.
                      Ahh recently din when you come over samin to meet sila mama, i made a coffee but you but its terrible and you still drank that TT. I'm sorry for that aki, you really never failed to make me feel accepted, to make me feel loved.
                    </p>

                    <p>
                      Of course out of our one year together we got a lot of obstacles, clashes, and hardship. There we're days when us talking is not possible. There we're days when you're mad at me and there we're days when we have misunderstanding.
                      But aki out of all those days, today its still us. We have grown aki. Dati when i feel sad i would shutdown and sleep diba, now its not a thing hehe. Dati din you wouldn't tell me when you have something bothering you, now you open up to me, share your thoughts, and let me be there for you.
                      We still have moments where we shutdown naman, where nag tatampo sa isa't isa but unlike before we can handle conversation much much much better. Every time theres a hardshiip and surely there would be more, we come back softer, stronger and more us. You have thought me aki that love is not just a feelings, its a promise that we always keep on hold.
                      It's the comprimise and understanding, it's when staying especially when things get hard. 
                    </p>

                    <p>
                      I can't wait for the next chapter of our life, together. Yung ano po puti na buhok natin and we are telling our stories to our grandchildens and then you'll still tease me like it's your full time job.
                      Next chapter of our life where we are finally together in one home. We we overcome more difficulties and where we achieve our dreams together with the help of each other.
                      Next chapter of our life where we keep choosing each other like a stubborn rocks, where life keeps throwing hardship and blessings, where we can say good morning and goodnight personally with kiss to each other.
                      I looking forward with more wonderful memories and future with you aki. Let's eat ice cream sa saturday po. I miss you.
                    </p>

                    <p>
                      I'm saying it again aki, i know i says it a lot but this time it's louder, more sure that i ever been. I love you aki. Not just for who you are, but for who am i when i'm with you.
                      I know you think a lot that you're a burden but you're not. Loving you is easier than breathing and every day i just love you more and more. I love you not just for the life we built but for every tomorrow we would keep building.
                      I love you for eternity and i would never get tired of you Aki.
                    </p>

                    <p className="text-xl font-romantic font-bold text-white text-center mt-8">
                      That's all for now, I love you more than all atoms in the universe.
                    </p>

                    <p className="text-right italic mt-8 text-white">
                      Forever yours, Forever loving you,<br />
                      <span className="font-romantic text-2xl text-white">Your Kenny, Your Aki</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Wax seal */}
              <div className="absolute left-1/2 -translate-x-1/2 -bottom-6 w-14 h-14 rounded-full bg-theme-gold flex items-center justify-center text-theme-black shadow-xl transform rotate-6">
                ❤
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}