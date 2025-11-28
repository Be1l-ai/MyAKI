import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import CountdownTimer from './components/CountdownTimer';
import Timeline3D from './components/Timeline3D';
import SpotifyPlayer from './components/SpotifyPlayer';
import LoveLetter from './components/LoveLetter';
import FutureScene from './components/FutureScene';
import Footer from './components/Footer';
import timelineData from '../timeline.json';
import futureData from '../future.json';

function App() {
  return (
    <div className="min-h-screen bg-theme-black">
      {/* Hero Section */}
      <section id="hero" className="relative">
        <Hero />
      </section>

      {/* Countdown Timers */}
      <section id="countdown" className="bg-theme-black relative border-t-4 border-b-4 border-theme-gold stitched-border-gold">
        <CountdownTimer />
      </section>

      {/* Timeline Section */}
      <section id="timeline" className="bg-gradient-to-b from-gray-800 via-gray-900 to-black relative">
        <div className="py-16">
          <h2 className="text-5xl font-romantic font-bold text-center text-theme-gold mb-4">
            Our Timeline pooo (^᎑^๑)/♡
          </h2>
          <p className="text-center text-white font-modern text-lg mb-8">
            Our dates and favorite moments hehe (˶˘ ³˘(´͈ ᵕ `͈˶)
          </p>
          <Timeline3D memories={timelineData.memories} />
        </div>
      </section>

      {/* Spotify Player */}
      <section id="music" className="relative bg-theme-black border-t-2 border-b-2 border-theme-gold grid-bg-gold">
        <SpotifyPlayer />
      </section>

      {/* Love Letter */}
      <section id="letter" className="bg-theme-black py-16 relative border-t-4 border-b-4 border-theme-gold stitched-border-gold">
        <h2 className="text-5xl font-romantic font-bold text-center text-white mb-8">
          A Message for my Aki
        </h2>
        <LoveLetter />
      </section>

      {/* Future Section */}
      <section id="future" className="bg-gradient-to-b from-gray-900 via-black to-theme-black relative">
        <FutureScene futureMemories={futureData.futureMemories} />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
