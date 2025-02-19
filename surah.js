document.addEventListener("DOMContentLoaded", function () {
    populateSurahList(); // Pastikan daftar surat tersedia saat halaman dimuat
});

// Fungsi untuk menampilkan surat berdasarkan nomor
function fetchSurah(surahNumber) {
    if (!surahNumber) return;

    fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/editions/quran-uthmani,id.indonesian`)
        .then(response => response.json())
        .then(data => {
            const arabicVerses = data.data[0].ayahs;
            const translations = data.data[1].ayahs;
            let content = `<h2>${data.data[0].englishName} (${data.data[0].name})</h2>`;

            content += arabicVerses.map((ayah, index) => `
                <div>
                    <p><strong>(${ayah.numberInSurah}) ${ayah.text}</strong></p>
                    <p><em>${translations[index].text}</em></p>
                    <audio src="https://cdn.islamic.network/quran/audio/128/ar.alafasy/${ayah.number}.mp3" controls></audio>
                </div>
            `).join('');

            document.getElementById('quran-content').innerHTML = content;
            stopAudio(); // Hentikan lagu Ramadan saat pengguna memilih surat
        })
        .catch(error => console.error("Error fetching Surah:", error));
}

// Fungsi untuk mencari dan menampilkan daftar surat yang sesuai saat mengetik
function searchSurah() {
    let searchQuery = document.getElementById("search-surah").value.trim().toLowerCase();
    let resultContainer = document.getElementById("search-results");

    if (!searchQuery) {
        resultContainer.innerHTML = "";
        return;
    }

    fetch("https://api.alquran.cloud/v1/surah")
        .then(response => response.json())
        .then(data => {
            let matchedSurahs = data.data.filter(surah =>
                surah.englishName.toLowerCase().includes(searchQuery) ||
                surah.name.toLowerCase().includes(searchQuery)
            );

            resultContainer.innerHTML = matchedSurahs.map(surah => `
                <div class="search-item" onclick="fetchSurah(${surah.number})">
                    ${surah.number}. ${surah.englishName} (${surah.name})
                </div>
            `).join('');

            if (matchedSurahs.length === 0) {
                resultContainer.innerHTML = "<p class='not-found'>Surat tidak ditemukan</p>";
            }
        })
        .catch(error => console.error("Error searching Surah:", error));
}

// Fungsi untuk menampilkan semua daftar surat dalam dropdown
function populateSurahList() {
    fetch("https://api.alquran.cloud/v1/surah")
        .then(response => response.json())
        .then(data => {
            const dropdown = document.getElementById("surah-dropdown");
            dropdown.innerHTML = `<option value="" disabled selected>Pilih Surat</option>`;

            data.data.forEach(surah => {
                let option = document.createElement("option");
                option.value = surah.number;
                option.textContent = `${surah.number}. ${surah.englishName}`;
                dropdown.appendChild(option);
            });

            dropdown.addEventListener("change", function () {
                fetchSurah(this.value);
            });
        })
        .catch(error => console.error("Error fetching Surah list:", error));
}
