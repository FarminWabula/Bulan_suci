document.addEventListener("DOMContentLoaded", function () {
    loadSholat();
    getJadwalSholat();
});

function getJadwalSholat() {
    const city = "Jakarta";
    fetch(`https://api.aladhan.com/v1/timingsByCity?city=${city}&country=Indonesia&method=2`)
        .then(response => response.json())
        .then(data => {
            if (!data.data) {
                console.error("Gagal mengambil data jadwal sholat.");
                return;
            }
            const timings = data.data.timings;
            document.getElementById("jadwal-sholat").innerHTML = `
                <h3>📅 Jadwal Sholat (${city})</h3>
                <p><strong>Subuh:</strong> ${timings.Fajr}</p>
                <p><strong>Dzuhur:</strong> ${timings.Dhuhr}</p>
                <p><strong>Ashar:</strong> ${timings.Asr}</p>
                <p><strong>Maghrib:</strong> ${timings.Maghrib}</p>
                <p><strong>Isya:</strong> ${timings.Isha}</p>
            `;
        })
        .catch(error => console.error("Gagal mengambil jadwal sholat:", error));
}

function loadSholat() {
    document.getElementById('sholat-content').innerHTML = `
        <h3>🕌 Niat Sholat Subuh</h3>
        <p>أُصَلِّى فَرْضَ الصُّبْح رَكَعتَيْنِ مُسْتَقْبِلَ الْقِبْلَةِ أَدَاءً إِمَامًا لله تَعَالَى</p>
        <p>"Usholli fardho Subhi rok'ataini mustaqbilal qiblati adaa-an imaaman lillahi ta'ala"</p>
        <p>Artinya: "Aku niat melakukan sholat fardu Subuh dua rakaat, menghadap kiblat sebagai imam karena Allah ta'ala."</p>
        
        <h3>🕌 Niat Sholat Dzuhur</h3>
        <p>أصَلِّي فَرْضَ الظَّهْرِ أَرْبَعَ رَكَعَاتٍ مُستَقبِلَ الْقِبْلَةِ آداء لِلَّهِ تَعَالَى</p>
        <p>"Ushalli fardhadz dzuhri arba'a raka'aatin mustaqbilal qiblati adaa'an lillaahi Ta'aala."</p>
        <p>Artinya: "Aku niat sholat fardhu Dzuhur empat rakaat menghadap kiblat, menjadi makmum/imam karena Allah Ta'ala."</p>
        
        <h3>🕌 Niat Sholat Ashar</h3>
        <p>أصَلِّي فَرْضَ الْعَصْرِ أَرْبَعَ رَكَعَاتٍ مُسْتَقْبِلَ الْقِبْلَةِ آدَاءً لِلَّهِ تَعَالَى</p>
        <p>"Ushalli fardhal 'ashri arba'a raka'aatin mustaqbilal qiblati adaa'an lillaahi Ta'ala."</p>
        <p>Artinya: "Saya niat sholat fardhu Ashar empat rakaat menghadap kiblat karena Allah Ta'ala."</p>
        
        <h3>🕌 Niat Sholat Maghrib</h3>
        <p>صَلِّي فَرْضَ الْمَغْرِبِ ثَلَاثَ رَكَعَاتٍ مُسْتَقْبِلَ الْقِبْلَةِ آدَاءً لِلَّهِ تَعَالَى</p>
        <p>"Ushalli fardhal maghribi tsalaatsa raka'aatin mustaqbilal qiblati adaa'an lillaahi Ta'aala."</p>
        <p>Artinya: "Saya niat sholat fardhu Maghrib tiga rakaat menghadap kiblat karena Allah Ta'ala."</p>
        
        <h3>🕌 Niat Sholat Isya</h3>
        <p>صَلِّي فَرْضَ الْعِشَاءِ أَرْبَعَ رَكَعَاتٍ مُسْتَقْبِلَ الْقِبْلَةِ أَدَاءً لِلَّهِ تَعَالَى</p>
        <p>"Ushalli fardhal Isyaa'i arba'a raka'aatin mustaqbilal qiblati adaa'an lillaahi Ta'aala."</p>
        <p>Artinya: "Saya niat sholat fardhu Isya empat rakaat menghadap kiblat karena Allah Ta'ala."</p>
    `;
}
