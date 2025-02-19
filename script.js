document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("toggle-theme").addEventListener("click", toggleTheme);
    populateSurahList();
    loadDoa();
    loadSholat();
    startCountdown();
});

function toggleTheme() {
    document.body.classList.toggle("dark-mode");
}

function showSection(sectionId) {
    document.querySelectorAll('.content-section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';

    if (sectionId !== "quran") {
        playAudio();
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const script = document.createElement("script");
    script.src = "waktu.js";
    document.body.appendChild(script);
});

let backgroundAudio = new Audio("ramadan_tiba.mp3");
backgroundAudio.volume = 0.5;

function playAudio() {
    backgroundAudio.play().catch(error => console.log("Autoplay dicegah oleh browser", error));
}

function stopAudio() {
    backgroundAudio.pause();
}

document.addEventListener("DOMContentLoaded", function () {
    playAudio();
});

function showSection(sectionId) {
    document.querySelectorAll('.content-section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';

    if (sectionId === "quran") {
        stopAudio();
    } else {
        playAudio();
    }
}
