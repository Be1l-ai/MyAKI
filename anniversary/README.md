# Anniversary Project - Asset Placement Guide

## 📁 Folder Structure

```
anniversary/
├── assets/
│   ├── images/          # Place your photos here
│   ├── gifs/            # Place your animated GIFs here
│   └── models/          # Place 3D models here (optional)
```

## 🖼️ Images to Add

### Hero Section
- `assets/images/hero-background.jpg` - Your couple photo for the landing page background

### Timeline Memories
- `assets/images/memory1.jpg` - First meeting photo (Sep 10, 2024)
- `assets/images/memory2.jpg` - Official anniversary photo (Nov 17, 2024)
- `assets/images/memory3.jpg` - First holiday together
- `assets/images/memory4.jpg` - Valentine's Day
- `assets/images/memory5.jpg` - Summer adventures
- `assets/images/memory6.jpg` - One year anniversary

### Future Section
- `assets/images/future1.jpg` - Future dream photo 1
- `assets/images/future2.jpg` - Future dream photo 2
- `assets/images/future3.jpg` - Future dream photo 3

## 🎞️ GIFs to Add

### Hero Section
- `assets/gifs/hero-animation.gif` - Animated GIF for hero section

### Timeline
- `assets/gifs/sparkle.gif` - For "The Day We Met"
- `assets/gifs/hearts.gif` - For "We Became Official"
- `assets/gifs/celebration.gif` - For "Our First Holiday"
- `assets/gifs/love.gif` - For "Valentine's Day"
- `assets/gifs/summer.gif` - For "Summer Adventures"
- `assets/gifs/anniversary.gif` - For "One Year Together"

### Future Section
- `assets/gifs/future1.gif` - Floating GIF 1
- `assets/gifs/future2.gif` - Floating GIF 2
- `assets/gifs/future3.gif` - Floating GIF 3

## 🎵 Spotify Playlist

Update the Spotify playlist URL in `src/components/SpotifyPlayer.jsx`:
1. Go to your Spotify playlist
2. Click "Share" → "Embed playlist"
3. Copy the embed URL
4. Replace the `spotifyPlaylistUrl` constant

## 📝 Customization

### Love Letter
Edit `src/components/LoveLetter.jsx` to personalize your message.

### Timeline Data
Edit `timeline.json` to add/modify your memories with dates and descriptions.

### Footer Notes
Edit `src/components/Footer.jsx` to add your personal notes.

## 🚀 Running the Project

```bash
cd anniversary
npm install
npm run dev
```

Visit http://localhost:5173 to view your anniversary page!

## 📦 Building for Production

```bash
npm run build
```

The built files will be in the `dist/` folder, ready to deploy!
