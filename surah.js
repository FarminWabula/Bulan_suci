document.addEventListener("DOMContentLoaded", function () {
    populateSurahList();
});

function fetchSurah(surahNumber) {
    if (!surahNumber) return;

    fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/editions/quran-uthmani,id.indonesian`)
        .then(response => response.json())
        .then(data => {
            if (!data.data || data.data.length < 2) {
                console.error("Error: Data surat tidak ditemukan.");
                return;
            }

            const arabicVerses = data.data[0].ayahs;
            const translations = data.data[1].ayahs;
            const transliterations = data.data.length > 2 ? data.data[2].ayahs : [];

            let content = `<h2>${data.data[0].englishName} (${data.data[0].name})</h2>`;

            content += arabicVerses.map((ayah, index) => {
                const transliterationText = transliterations[index] 
                    ? transliterations[index].text 
                    : arabicToTransliteration(ayah.text);

                return `
                    <div class="ayah-container">
                        <p class="arabic"><strong>(${ayah.numberInSurah}) ${ayah.text}</strong></p>
                        <p class="latin"><i>${transliterationText}</i></p>
                        <p class="translation"><em>${translations[index]?.text || "Terjemahan tidak tersedia."}</em></p>
                        <audio src="https://cdn.islamic.network/quran/audio/128/ar.alafasy/${ayah.number}.mp3" controls></audio>
                    </div>
                `;
            }).join('');

            document.getElementById('quran-content').innerHTML = content;
            document.getElementById('search-results').style.display = "none";
            stopAudio();
        })
        .catch(error => console.error("Error fetching Surah:", error));
}

function searchSurah() {
    let searchQuery = document.getElementById("search-surah").value.trim().toLowerCase();
    let resultContainer = document.getElementById("search-results");

    if (!searchQuery) {
        resultContainer.innerHTML = "";
        resultContainer.style.display = "none";
        return;
    }

    fetch("https://api.alquran.cloud/v1/surah")
        .then(response => response.json())
        .then(data => {
            let matchedSurahs = data.data.filter(surah =>
                surah.englishName.toLowerCase().includes(searchQuery) ||
                surah.name.toLowerCase().includes(searchQuery)
            );

            if (matchedSurahs.length === 0) {
                resultContainer.innerHTML = "<p class='not-found'>Surat tidak ditemukan</p>";
            } else {
                resultContainer.innerHTML = matchedSurahs.map(surah => `
                    <div class="search-item" onclick="fetchSurah(${surah.number})">
                        ${surah.number}. ${surah.englishName} (${surah.name})
                    </div>
                `).join('');
            }

            resultContainer.style.display = "block";
        })
        .catch(error => console.error("Error searching Surah:", error));
}

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

function arabicToTransliteration(text) {
    const mapping = {
        "ا": "a", "ب": "b", "ت": "t", "ث": "ts", "ج": "j", "ح": "h", "خ": "kh", 
        "د": "d", "ذ": "dz", "ر": "r", "ز": "z", "س": "s", "ش": "sy", "ص": "sh", "ض": "dh",
        "ط": "th", "ظ": "zh", "ع": "‘", "غ": "gh", "ف": "f", "ق": "q", "ك": "k", "ل": "l",
        "م": "m", "ن": "n", "ه": "h", "و": "w", "ي": "y", "ى": "a", "ء": "'", "ؤ": "u", "إ": "i",
        "أ": "a", "ئ": "i", "ٱ": "a", "لا": "la", "لَا": "la", "ة": "h", "ـ": "",
        "َ": "a", "ُ": "u", "ِ": "i", "ْ": "", "ّ": "", "ً": "an", "ٌ": "un", "ٍ": "in",
        "ۙ": "", "ە": "h", "وَ": "wa", "الَّذِينَ": "alladzīna", "عَلَيْهِمْ": "alaihim"
    };

    return text.split('').map(char => mapping[char] || char).join('');
}
