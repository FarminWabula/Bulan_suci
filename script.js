document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("toggle-theme").addEventListener("click", toggleTheme);
    populateSurahList();  // Pastikan dropdown surat diisi saat halaman dimuat (menggunakan fungsi yang benar)
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

    // Jika pindah ke fitur selain Qur'an, putar ulang lagu Ramadan
    if (sectionId !== "quran") {
        playAudio();
    }
}

// Memuat Imsakiyah secara dinamis
document.addEventListener("DOMContentLoaded", function () {
    const script = document.createElement("script");
    script.src = "imsakiyah.js";
    document.body.appendChild(script);
});

// Inisialisasi audio
let backgroundAudio = new Audio("natwalsal.mp3");
backgroundAudio.volume = 0.5;

// Fungsi untuk memutar audio
function playAudio() {
    backgroundAudio.play().catch(error => console.log("Autoplay dicegah oleh browser", error));
}

// Fungsi untuk menghentikan audio
function stopAudio() {
    backgroundAudio.pause();
}

// Putar otomatis saat membuka website
document.addEventListener("DOMContentLoaded", function () {
    playAudio();
});

// Hentikan lagu saat membuka fitur surat atau memilih surat
function showSection(sectionId) {
    document.querySelectorAll('.content-section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';

    // Jika pengguna membuka fitur surat, hentikan musik latar
    if (sectionId === "quran") {
        stopAudio();
    } else {
        playAudio();
    }
}
