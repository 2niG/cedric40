// =========================================
// 1. LE COMPTE À REBOURS
// =========================================
// Date cible précise de l'invitation (20 Juin 2026 à 19:00)
const targetDate = new Date("June 20, 2026 19:00:00").getTime();

const timer = setInterval(function() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    // Calculs précis
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Affichage des résultats
    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");

    if (daysEl && hoursEl && minutesEl && secondsEl) {
        daysEl.innerText = days;
        hoursEl.innerText = hours;
        minutesEl.innerText = minutes;
        secondsEl.innerText = seconds;
    }

    // Si le compte à rebours est fini
    if (distance < 0) {
        clearInterval(timer);
        document.getElementById("countdown-container").innerHTML = "<h2>C'est l'heure de faire la fête ! 🥂</h2>";
    }
}, 1000);


// =========================================
// 2. L'EFFET PLUIE DE CONFETTIS
// =========================================
function createConfetti() {
    // Création de 50 particules
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti-particle');
        
        // Position aléatoire horizontale
        confetti.style.left = Math.random() * 100 + 'vw';
        
        // Taille aléatoire (plus variée)
        const size = Math.random() * 10 + 5 + 'px';
        confetti.style.width = size;
        confetti.style.height = size;
        
        // Couleur aléatoire (Or chic, Argent, Blanc)
        const colors = ['#c6a361', '#fff', '#a0a0a0'];
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        // Vitesse d'animation aléatoire
        confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
        
        // Délai aléatoire pour un flux continu
        confetti.style.animationDelay = Math.random() * 5 + 's';

        document.body.appendChild(confetti);
    }
}


// =========================================
// 3. LOGIQUE D'ENTRÉE, RÉVÉLATION & MUSIQUE
// =========================================
function initExperience() {
    const overlay = document.getElementById("overlay");
    const enterBtn = document.getElementById("enter-btn");
    const mainInvitation = document.getElementById("main-invitation");
    const audio = document.getElementById("musique-fete");
    const musicBtn = document.getElementById("music-control");
    const musicBtnText = musicBtn.querySelector(".music-text");

    if (!overlay || !enterBtn || !mainInvitation || !audio) return;

    // QUAND ON CLIQUE SUR "DÉCOUVRIR L'INVITATION"
    enterBtn.addEventListener("click", function() {
        // 1. Cacher le rideau d'entrée (Splash Screen)
        overlay.classList.add("hidden");

        // 2. Révéler l'invitation principale (Image + Compteur)
        mainInvitation.classList.remove("hidden");

        // 3. Lancer la Musique (Le navigateur autorise car il y a un clic !)
        audio.play().then(() => {
            // Activer le bouton de contrôle
            musicBtn.classList.remove("hidden");
            musicBtn.classList.add("playing");
            musicBtnText.innerText = "PAUSE AMBIANCE";
        }).catch(error => {
            console.log("Lecture automatique bloquée par le navigateur.");
        });

        // 4. Lancer les Confettis (effet surprise immédiat)
        createConfetti(); 
    });

    // GARDE LE CONTRÔLE MANUEL SUR LE BOUTON MUSIQUE
    musicBtn.addEventListener("click", function(e) {
        e.stopPropagation(); // Évite de redéclencher le rideau
        if (audio.paused) {
            audio.play();
            musicBtn.classList.add("playing");
            musicBtnText.innerText = "PAUSE AMBIANCE";
        } else {
            audio.pause();
            musicBtn.classList.remove("playing");
            musicBtnText.innerText = "PLAY AMBIANCE";
        }
    });
}

// Lancement au chargement de la page
window.onload = function() {
    initExperience();
};