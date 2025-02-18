function fetchSurah() {
    let surah = document.getElementById("surah-number").value || document.getElementById("surah-dropdown").value;
    if (!surah) {
        alert("Silakan masukkan atau pilih nomor surat!");
        return;
    }

    fetch(`https://api.alquran.cloud/v1/surah/${surah}/editions/quran-uthmani,id.indonesian`)
        .then(response => response.json())
        .then(data => {
            const arabicVerses = data.data[0].ayahs;
            const translations = data.data[1].ayahs;
            let content = `<h2>${data.data[0].name}</h2>`;
            content += arabicVerses.map((ayah, index) => `
                <div>
                    <p><strong>${ayah.text}</strong></p>
                    <p><em>${translations[index].text}</em></p>
                    <audio src="https://cdn.islamic.network/quran/audio/128/ar.alafasy/${ayah.number}.mp3" controls></audio>
                </div>
            `).join('');
            document.getElementById('quran-content').innerHTML = content;
        });
}

function populateSurahDropdown() {
    fetch("https://api.alquran.cloud/v1/surah")
        .then(response => response.json())
        .then(data => {
            const dropdown = document.getElementById("surah-dropdown");
            data.data.forEach(surah => {
                let option = document.createElement("option");
                option.value = surah.number;
                option.textContent = `${surah.number}. ${surah.englishName}`;
                dropdown.appendChild(option);
            });
        });
}
