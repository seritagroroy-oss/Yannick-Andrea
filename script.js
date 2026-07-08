// --- Animation au défilement (Scroll Reveal) ---
const fadeElements = document.querySelectorAll('.fade-in');

const checkVisibility = () => {
    const triggerBottom = window.innerHeight * 0.85;

    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < triggerBottom) {
            element.classList.add('visible');
        }
    });
};

// Vérifier la visibilité au chargement et au défilement
window.addEventListener('load', checkVisibility);
window.addEventListener('scroll', checkVisibility);




// --- Animation de pluie de fleurs ---
const flowerEmojis = ['🌹', '🌸', '🌺', '🌻', '🌼'];

function startFallingFlowers() {
    const numFlowers = 40; // Multitude de fleurs
    
    for (let i = 0; i < numFlowers; i++) {
        const flower = document.createElement('div');
        
        // Choisir un émoji au hasard
        const randomFlower = flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)];
        flower.innerText = randomFlower;
        flower.classList.add('flower-falling');
        
        // Position X aléatoire (sur toute la largeur de l'écran)
        flower.style.left = Math.random() * 100 + 'vw';
        
        // Taille aléatoire (plus variée)
        const size = Math.random() * 25 + 15; // Entre 15px et 40px
        flower.style.fontSize = size + 'px';
        flower.style.lineHeight = '1';
        
        // Paramètres d'animation CSS variables
        const sway = (Math.random() - 0.5) * 300; // Oscillation gauche/droite (px)
        const rot = (Math.random() - 0.5) * 720; // Rotation pendant la chute (deg)
        const duration = Math.random() * 10 + 10; // Durée de chute (entre 10s et 20s)
        const delay = Math.random() * 15; // Délai de départ aléatoire pour ne pas toutes tomber en même temps
        
        flower.style.setProperty('--sway', `${sway}px`);
        flower.style.setProperty('--rot', `${rot}deg`);
        flower.style.setProperty('--duration', `${duration}s`);
        flower.style.animationDelay = `${delay}s`;
        
        document.body.appendChild(flower);
    }
}

// --- Lucioles (Poussières d'étoiles) ---
function startFireflies() {
    const numFireflies = 30; // Nombre de lucioles
    
    for (let i = 0; i < numFireflies; i++) {
        const firefly = document.createElement('div');
        firefly.classList.add('firefly');
        
        // Position de départ aléatoire (en bas de l'écran)
        firefly.style.left = Math.random() * 100 + 'vw';
        firefly.style.bottom = '-' + (Math.random() * 50 + 20) + 'px';
        
        // Taille aléatoire (très petit)
        const size = Math.random() * 3 + 2; // Entre 2px et 5px
        firefly.style.width = size + 'px';
        firefly.style.height = size + 'px';
        
        // Variables d'animation
        const drift = (Math.random() - 0.5) * 200; // Dérive latérale (px)
        const duration = Math.random() * 10 + 15; // Durée de montée (15s à 25s)
        const delay = Math.random() * 15; // Délai
        const maxOpacity = Math.random() * 0.5 + 0.3; // Transparence max
        
        firefly.style.setProperty('--drift', `${drift}px`);
        firefly.style.setProperty('--duration', `${duration}s`);
        firefly.style.setProperty('--max-opacity', maxOpacity);
        firefly.style.animationDelay = `${delay}s`;
        
        document.body.appendChild(firefly);
    }
}

// --- Gestion de la musique et de l'écran d'accueil ---
const audio = document.getElementById('wedding-audio');
audio.volume = 0.3; // Baisse le volume à 30%

const musicBtn = document.getElementById('music-toggle');
const musicIcon = musicBtn.querySelector('i');

// Éléments de l'écran d'accueil
const welcomeOverlay = document.getElementById('welcome-overlay');
const openBtn = document.getElementById('open-invitation-btn');

function toggleMusic() {
    if (audio.paused) {
        audio.play().then(() => {
            musicBtn.classList.add('playing');
            musicIcon.classList.remove('fa-music', 'fa-play');
            musicIcon.classList.add('fa-pause');
        }).catch(err => console.log("En attente d'une interaction utilisateur pour la musique."));
    } else {
        audio.pause();
        musicBtn.classList.remove('playing');
        musicIcon.classList.remove('fa-pause');
        musicIcon.classList.add('fa-play');
    }
}

// Ouvrir l'invitation
openBtn.addEventListener('click', () => {
    // Forcer le retour tout en haut de la page (au cas où le navigateur a gardé la position de défilement)
    window.scrollTo(0, 0);
    
    // Débloquer le défilement
    document.body.classList.remove('no-scroll');

    // Cacher l'écran d'accueil avec un effet fondu
    welcomeOverlay.classList.add('hidden');
    
    // Lancer la musique
    toggleMusic();
    
    // Déclencher la pluie de fleurs
    setTimeout(() => {
        startFallingFlowers();
        startFireflies(); // Déclencher les lucioles en même temps
    }, 500); // Laisse le temps à l'image d'apparaître
});

// Lancer/Couper la musique au clic sur le bouton en bas à droite
musicBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMusic();
});
