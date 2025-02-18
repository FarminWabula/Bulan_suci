document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("toggle-theme").addEventListener("click", toggleTheme);
    populateSurahDropdown();
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
}

document.addEventListener("DOMContentLoaded", function () {
    const script = document.createElement("script");
    script.src = "imsakiyah.js";
    document.body.appendChild(script);
});
