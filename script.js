// 1. COMPTE À REBOURS
const targetDate = new Date("June 20, 2026 19:00:00").getTime();
setInterval(() => {
    const now = new Date().getTime();
    const d = targetDate - now;
    document.getElementById("days").innerText = Math.floor(d / 86400000);
    document.getElementById("hours").innerText = Math.floor((d % 86400000) / 3600000);
    document.getElementById("minutes").innerText = Math.floor((d % 3600000) / 60000);
    document.getElementById("seconds").innerText = Math.floor((d % 60000) / 1000);
}, 1000);

// 2. CONFETTIS
function createConfetti() {
    for (let i = 0; i < 70; i++) {
        const c = document.createElement('div');
        c.classList.add('confetti-particle');
        c.style.left = Math.random() * 100 + 'vw';
        const size = Math.random() * 8 + 5 + 'px';
        c.style.width = size; c.style.height = size;
        c.style.backgroundColor = ['#c6a361', '#fff', '#a0a0a0'][Math.floor(Math.random() * 3)];
        c.style.animationDuration = Math.random() * 3 + 2 + 's';
        c.style.animationDelay = Math.random() * 5 + 's';
        document.body.appendChild(c);
    }
}

// 3. LOGIQUE D'ENTRÉE ET MUSIQUE
const overlay = document.getElementById("overlay");
const enterBtn = document.getElementById("enter-btn");
const audio = document.getElementById("musique-fete");
const pop = document.getElementById("pop-sound");
const musicBtn = document.getElementById("music-control");

enterBtn.addEventListener("click", () => {
    overlay.classList.add("hidden");
    if(pop) pop.play(); // Effet Pop !
    audio.play().then(() => {
        musicBtn.classList.add("playing");
        musicBtn.querySelector(".music-text").innerText = "PAUSE AMBIANCE";
    });
    createConfetti(); // Lance les confettis au clic
});

musicBtn.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        musicBtn.classList.add("playing");
        musicBtn.querySelector(".music-text").innerText = "PAUSE AMBIANCE";
    } else {
        audio.pause();
        musicBtn.classList.remove("playing");
        musicBtn.querySelector(".music-text").innerText = "PLAY AMBIANCE";
    }
});