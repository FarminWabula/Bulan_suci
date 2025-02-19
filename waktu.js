document.addEventListener("DOMContentLoaded", function () {
    startCountdown();
    getImsakiyah();
});

function startCountdown() {
    setInterval(() => {
        let now = new Date();
        let ramadhan = new Date("2025-03-01");
        let idulfitri = new Date("2025-03-30");

        document.getElementById('ramadhan-countdown').innerText = 
            Math.ceil((ramadhan - now) / (1000 * 60 * 60 * 24)) + " hari";
        document.getElementById('idulfitri-countdown').innerText = 
            Math.ceil((idulfitri - now) / (1000 * 60 * 60 * 24)) + " hari";
    }, 1000);
}

function getImsakiyah() {
    const imsakElement = document.getElementById("imsak-time");
    const iftarElement = document.getElementById("iftar-time");
    const countdownText = document.getElementById("countdown-text");

    const city = "Jakarta";

    fetch(`https://api.aladhan.com/v1/timingsByCity?city=${city}&country=Indonesia&method=2`)
        .then(response => response.json())
        .then(data => {
            if (!data.data) {
                console.error("Gagal mengambil data Imsakiyah.");
                return;
            }

            const timings = data.data.timings;
            imsakElement.textContent = timings.Imsak;
            iftarElement.textContent = timings.Maghrib;

            updateCountdown(timings.Imsak, timings.Maghrib);
        })
        .catch(error => console.error("Gagal mengambil data:", error));
}

function updateCountdown(imsak, iftar) {
    setInterval(() => {
        const now = new Date();
        const today = now.toISOString().split("T")[0];

        const imsakTime = new Date(`${today}T${imsak}:00`);
        const iftarTime = new Date(`${today}T${iftar}:00`);

        let targetTime, message;

        if (now < imsakTime) {
            targetTime = imsakTime;
            message = "Menuju Waktu Imsak:";
        } else if (now < iftarTime) {
            targetTime = iftarTime;
            message = "Menuju Waktu Berbuka:";
        } else {
            countdownText.innerHTML = "Sudah melewati waktu berbuka 🌙";
            return;
        }

        const timeLeft = targetTime - now;
        const hours = Math.floor(timeLeft / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        countdownText.innerHTML = `${message} ${hours} jam ${minutes} menit ${seconds} detik ⏳`;
    }, 1000);
}
