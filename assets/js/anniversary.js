// === Configuration ===
const TARGET_DATE = new Date('2025-11-30T00:00:00').getTime();
const REDIRECT_URL = 'anniversary/index.html'; // Anniversary page
const PLAN_C_PASSWORD = 'hotel'; // Replace with your desired password for Plan C

// Plan-specific songs and lyrics
const PLAN_SONGS = {
    a: {
        audioUrl: 'assets/audio/yellow.mp3',
        lyrics: [
            'yellow', 'stars', 'shine', 'you', 'skin',
            'beautiful', 'bones', 'love', 'song', 'for you',
            'bleed', 'i love you'
        ]
    },
    b: {
        audioUrl: 'assets/audio/bloom.mp3',
        lyrics: [
            'morning', 'wake', 'sweetness', 'you', 'letter',
            'painted', 'can i be', 'close', 'love', 'pieces',
            'gold', 'sun', 'world', 'memories', 'fields'
        ]
    },
    c: {
        audioUrl: 'assets/audio/adore_you.mp3',
        lyrics: [
            'baby', 'love', 'you', 'adore', 'living',
            'all my life', 'eternity', 'you and me', 'I adore you',
            'next to you', 'meant to be', 'i need you'
        ]
    }
};

// === Global Variables ===
let currentSlide = 0;
let currentPlan = 'a';
let audioPlayer = null;
let isPlaying = false;
let fallingInterval = null;

// === DOM Elements ===
const carouselTrack = document.getElementById('carouselTrack');
const carouselCards = document.querySelectorAll('.carousel-card');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const indicators = document.querySelectorAll('.indicator');
const musicToggle = document.getElementById('musicToggle');
const playIcon = document.querySelector('.play-icon');
const pauseIcon = document.querySelector('.pause-icon');
const fallingContainer = document.getElementById('fallingContainer');
const rsvpButton = document.getElementById('rsvpButton');
const timerMessage = document.getElementById('timerMessage');

// Password Lock Elements
const planCLock = document.getElementById('planCLock');
const planCContent = document.getElementById('planCContent');
const planCPasswordInput = document.getElementById('planCPassword');
const unlockPlanCBtn = document.getElementById('unlockPlanC');
const passwordError = document.getElementById('passwordError');

// === Countdown Timer ===
function updateCountdown() {
    const now = new Date().getTime();
    const distance = TARGET_DATE - now;

    if (distance < 0) {
        // Timer has ended - unlock button
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        unlockButton();
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

function unlockButton() {
    rsvpButton.classList.remove('locked');
    rsvpButton.classList.add('unlocked');
    rsvpButton.disabled = false;
    rsvpButton.querySelector('.lock-icon').textContent = '[_]';
    rsvpButton.querySelector('.button-text').textContent = 'Click to See Your Surprise!';
    timerMessage.textContent = '(*) The day is here! Click the button above! (*)';
}

// === Carousel Functions ===
function updateCarousel() {
    // Hide all cards
    carouselCards.forEach(card => {
        card.classList.remove('active');
    });
    
    // Show current card
    carouselCards[currentSlide].classList.add('active');
    
    // Update indicators
    indicators.forEach((indicator, index) => {
        if (index === currentSlide) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
    
    // Update current plan
    currentPlan = carouselCards[currentSlide].getAttribute('data-plan');
    
    // Stop current music and restart if playing
    if (isPlaying) {
        stopMusic();
        setTimeout(() => {
            playMusic();
        }, 300);
    }
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % carouselCards.length;
    updateCarousel();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + carouselCards.length) % carouselCards.length;
    updateCarousel();
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
}

// === Music Player Functions ===
function initAudioPlayer() {
    if (!audioPlayer) {
        audioPlayer = new Audio();
        audioPlayer.loop = true;
        audioPlayer.volume = 0.5;
    }
}

function playMusic() {
    initAudioPlayer();
    
    const songData = PLAN_SONGS[currentPlan];
    
    audioPlayer.src = songData.audioUrl;
    
    audioPlayer.play().then(() => {
        isPlaying = true;
        musicToggle.classList.add('playing');
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
        startFallingAnimation();
    }).catch(error => {
        console.log('Audio playback requires user interaction. Click play again.');
        // Try to initialize on next click
        isPlaying = false;
    });
}

function stopMusic() {
    if (audioPlayer) {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
    }
    isPlaying = false;
    musicToggle.classList.remove('playing');
    playIcon.style.display = 'block';
    pauseIcon.style.display = 'none';
    stopFallingAnimation();
}

function toggleMusic() {
    if (isPlaying) {
        stopMusic();
    } else {
        playMusic();
    }
}

// === Falling Animation Functions ===
function createFallingElement() {
    const element = document.createElement('div');
    element.classList.add('falling-element');
    
    // Randomly choose between heart emoji and lyrics word
    const isHeart = Math.random() > 0.5;
    
    if (isHeart) {
        const hearts = ['♥', '<3', '♡', '❤', '( ˘ ³˘)♥', '<3'];
        element.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    } else {
        const lyrics = PLAN_SONGS[currentPlan].lyrics;
        element.textContent = lyrics[Math.floor(Math.random() * lyrics.length)];
        element.style.fontSize = '16px';
        element.style.color = getRandomColor();
    }
    
    // Random horizontal position
    element.style.left = Math.random() * 100 + '%';
    
    // Random rotation angle between -45 and 45 degrees
    const randomRotation = Math.floor(Math.random() * 90) - 45;
    element.style.transform = `rotate(${randomRotation}deg)`;
    
    // Random animation duration (5-10 seconds)
    const duration = (Math.random() * 5 + 5) + 's';
    element.style.animationDuration = duration;
    
    // Random delay
    element.style.animationDelay = Math.random() * 2 + 's';
    
    fallingContainer.appendChild(element);
    
    // Remove element after animation completes
    setTimeout(() => {
        if (element.parentNode) {
            element.parentNode.removeChild(element);
        }
    }, (parseFloat(duration) + 2) * 1000);
}

function getRandomColor() {
    const colors = [
        '#ff9999',
        '#ffb3ba',
        '#ffccdd',
        '#ff6b9d',
        '#c44569',
        '#f8b500',
        '#ffa502'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

function startFallingAnimation() {
    // Clear any existing interval
    stopFallingAnimation();
    
    // Create falling elements periodically
    fallingInterval = setInterval(() => {
        createFallingElement();
    }, 300); // Create new element every 300ms
}

function stopFallingAnimation() {
    if (fallingInterval) {
        clearInterval(fallingInterval);
        fallingInterval = null;
    }
    // Clear all existing falling elements
    fallingContainer.innerHTML = '';
}

// === Button Click Handler ===
function handleRSVPClick() {
    if (!rsvpButton.classList.contains('locked')) {
        window.open(REDIRECT_URL, '_blank');
    }
}

// === Password Lock Functions ===
function unlockPlanC() {
    const enteredPassword = planCPasswordInput.value.trim();
    
    if (enteredPassword === PLAN_C_PASSWORD) {
        // Correct password - unlock content
        planCLock.style.display = 'none';
        planCContent.style.display = 'block';
        planCContent.classList.add('unlocked-content');
        
        // Store unlock state in localStorage
        localStorage.setItem('planCUnlocked', 'true');
        
        // Success animation
        planCContent.style.animation = 'slideDown 0.5s ease';
    } else {
        // Wrong password
        passwordError.classList.add('show');
        planCPasswordInput.value = '';
        planCPasswordInput.style.animation = 'shake 0.5s ease';
        
        setTimeout(() => {
            passwordError.classList.remove('show');
            planCPasswordInput.style.animation = '';
        }, 2000);
    }
}

function checkPlanCUnlockState() {
    // Check if Plan C was previously unlocked
    const isUnlocked = localStorage.getItem('planCUnlocked') === 'true';
    
    if (isUnlocked) {
        planCLock.style.display = 'none';
        planCContent.style.display = 'block';
    }
}

// === Event Listeners ===
document.addEventListener('DOMContentLoaded', function() {
    // Initialize section scroll animations
    initSectionAnimations();
    
    // Check Plan C unlock state on page load
    checkPlanCUnlockState();
    
    // Carousel navigation
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    // Indicator clicks
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => goToSlide(index));
    });
    
    // Music toggle
    musicToggle.addEventListener('click', toggleMusic);
    
    // RSVP button
    rsvpButton.addEventListener('click', handleRSVPClick);
    
    // Password unlock button
    unlockPlanCBtn.addEventListener('click', unlockPlanC);
    
    // Allow Enter key to unlock Plan C
    planCPasswordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            unlockPlanC();
        }
    });
    
    // Start countdown timer
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // Keyboard navigation for carousel
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });
    
    // Touch swipe for carousel (mobile)
    let touchStartX = 0;
    let touchEndX = 0;
    
    carouselTrack.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    carouselTrack.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next slide
                nextSlide();
            } else {
                // Swipe right - previous slide
                prevSlide();
            }
        }
    }
    
    setInterval(() => {
        if (!isPlaying) { // Only auto-advance when music is not playing
            nextSlide();
        }
    }, 10000);
});

// === Cleanup on page unload ===
window.addEventListener('beforeunload', () => {
    stopMusic();
    stopFallingAnimation();
});

// === Helper Functions ===

// Section Scroll Animations
function initSectionAnimations() {
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Make hero section visible immediately
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.classList.add('visible');
    }
}

// Function to format time with leading zeros
function padZero(num) {
    return String(num).padStart(2, '0');
}

// Function to preload audio (optional - improves performance)
function preloadAudio() {
    Object.values(PLAN_SONGS).forEach(song => {
        const audio = new Audio();
        audio.src = song.audioUrl;
        audio.preload = 'auto';
    });
}

// Call preload when page is idle (optional)
if ('requestIdleCallback' in window) {
    requestIdleCallback(preloadAudio);
} else {
    setTimeout(preloadAudio, 1000);
}

// === Console Easter Egg ===
console.log("%c<3 You Probably Can't See This Aki But Happy Anniversary! <3", 'font-size: 24px; color: #ff9999; font-weight: bold;');
console.log('%cI Love you For Eternity ^_^', 'font-size: 14px; color: #ff6b9d; font-style: italic;');
