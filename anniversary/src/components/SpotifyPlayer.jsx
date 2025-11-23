import React from 'react';

export default function SpotifyPlayer() {
  // Full playable Spotify playlist embed
  const spotifyPlaylistUrl = "https://open.spotify.com/embed/playlist/26Ss0Cwj2sU12khzuDDZVh?utm_source=generator&theme=0";

  return (
    <div className="w-full py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-romantic font-bold text-center text-theme-gold mb-4">
          Playlist (•̀ᴗ•́ )
        </h2>
        <p className="text-center text-theme-gold/80 font-modern text-lg mb-8">
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
          
          <p className="text-center text-theme-gold/70 font-modern text-sm mt-4">
            Click play po Akiii ( •⌄• )✧
          </p>
        </div>
      </div>
    </div>
  );
}
