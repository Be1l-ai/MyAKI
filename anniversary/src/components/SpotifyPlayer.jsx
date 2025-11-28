import React from 'react';

export default function SpotifyPlayer() {
  // Full playable Spotify playlist embed
  const spotifyPlaylistUrl = "https://open.spotify.com/embed/playlist/0ocz0XC5uTppXkA0ZI3mNf?utm_source=oembed";

  return (
    <div className="w-full bg-white py-16 px-4 border-t-2 border-theme-gold grid-bg-gold relative overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `linear-gradient(rgba(212, 175, 55, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212, 175, 55, 0.3) 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }}></div>

      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-romantic font-bold text-center text-theme-gold mb-4">
          Playlist for Us hehe (•̀ᵗ•́ )
        </h2>
        <p className="text-center text-theme-charcoal font-modern text-m mb-8">
          Theme playlist for the year 🎵 <br/> I mean po songs for us
        </p>
        
        <div className="bg-theme-charcoal rounded-2xl shadow-2xl p-4 md:p-8 border-2 border-theme-gold/30">
          <iframe
            style={{ borderRadius: '12px' }}
            src={spotifyPlaylistUrl}
            width="100%"
            height="380"
            frameBorder="0"
            allowFullScreen=""
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="w-full"
          ></iframe>
          
          <p className="text-center text-theme-charcoal font-modern text-sm mt-4">
            Click play po Akiii ( •⌄• )✧
          </p>
        </div>
      </div>
    </div>
  );
}
