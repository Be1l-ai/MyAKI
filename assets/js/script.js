// Create animated stars
function createStars() {
    const container = document.getElementById('starsContainer');
    const numberOfStars = 100;
    
    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        container.appendChild(star);
    }
}

// Create floating hearts
function createFloatingHeart() {
    const container = document.getElementById('floatingHearts');
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.textContent = '<3';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (Math.random() * 5 + 8) + 's';
    heart.style.animationDelay = Math.random() * 5 + 's';
    container.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 13000);
}

// Countdown timer
function updateCountdown() {
    const targetDate = new Date('2025-10-26T00:00:00').getTime();
    const now = new Date().getTime();
    const distance = targetDate - now;
    
    if (distance < 0) {
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        document.querySelector('.countdown-title').textContent = "It's Date Day! \\(^o^)/";
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

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    createStars();
    setInterval(createFloatingHeart, 3000);
    updateCountdown();
    setInterval(updateCountdown, 1000);
});
