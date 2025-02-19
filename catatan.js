document.addEventListener("DOMContentLoaded", function () {
    loadCatatan();
});

function saveCatatan() {
    let catatanInput = document.getElementById("catatan-input").value.trim();
    if (catatanInput === "") {
        alert("Catatan tidak boleh kosong!");
        return;
    }

    let catatanList = JSON.parse(localStorage.getItem("catatanRamadhan")) || [];
    catatanList.push(catatanInput);
    localStorage.setItem("catatanRamadhan", JSON.stringify(catatanList));

    document.getElementById("catatan-input").value = "";
    loadCatatan();
}

function loadCatatan() {
    let catatanList = JSON.parse(localStorage.getItem("catatanRamadhan")) || [];
    let catatanContainer = document.getElementById("catatan-list");

    if (catatanList.length === 0) {
        catatanContainer.innerHTML = "<p>Belum ada catatan Ramadhan.</p>";
        return;
    }

    catatanContainer.innerHTML = catatanList.map((catatan, index) => `
        <div class="catatan-item">
            <p>${catatan}</p>
            <button class="delete-btn" onclick="deleteCatatan(${index})">Hapus</button>
        </div>
    `).join("");
}

function deleteCatatan(index) {
    let catatanList = JSON.parse(localStorage.getItem("catatanRamadhan")) || [];
    catatanList.splice(index, 1);
    localStorage.setItem("catatanRamadhan", JSON.stringify(catatanList));
    loadCatatan();
}
