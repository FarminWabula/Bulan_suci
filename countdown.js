function startCountdown() {
    setInterval(() => {
        let now = new Date();
        let ramadhan = new Date("2025-03-1");
        let idulfitri = new Date("2025-03-30");

        document.getElementById('ramadhan-countdown').innerText = Math.ceil((ramadhan - now) / (1000 * 60 * 60 * 24)) + " hari";
        document.getElementById('idulfitri-countdown').innerText = Math.ceil((idulfitri - now) / (1000 * 60 * 60 * 24)) + " hari";
    }, 1000);
}
