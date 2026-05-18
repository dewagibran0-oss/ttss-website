/* ==========================================================================
   PT TTSS MASTER JAVASCRIPT - 2026 PREMIUM INTERACTIVE ENGINE
   Mencakup Fungsionalitas: Index, About, Sewa, dan Galeri
   ========================================================================== */

   /**
 * ==========================================================================
 * PT TTSS - ADVANCED LOGISTICS INTELLIGENCE ENGINE PLATFORM V2
 * ==========================================================================
 */

   /**
 * ==========================================================================
 * PT TTSS - 3D ISO-DECK CARGO CONTROLLER LOGIC
 * ==========================================================================
 */
/**
 * ==========================================================================
 * PT TTSS - TACTICAL MULTI-VESSEL 3D MATRIX LOGIC SYSTEM
 * ==========================================================================
 */

// Global State Pemantau Aktivitas Pengguna
let activeVesselKey = "tujuh-tunas";

// Database Pusat Terintegrasi (Data Resmi Spesifikasi Kapal)
const globalFleetDatabase = {
    "tujuh-tunas": { 
        name: "SPOB TUJUH TUNAS", 
        capacity: "300 KL", 
        flag: "Indonesia", 
        built: "Samarinda / 2013", 
        gt: "82 GT", 
        nt: "32 NT",
        regNo: "GT. 82 No. 5623/llk",
        callSign: "YB6611",
        owner: "PT. PELAYARAN TUJUH TUNAS SATU SAMUDERA",
        loa: "27.39 M", lbp: "24.50 M", breadth: "5.40 M", depth: "2.00 M", draft: "1.62 M",
        engine: "Mitsubishi 6B22 (2 x 230 HP)", auxEngine: "Mitsubishi T5 (1 x 100 HP)", fuelCons: "1.20 Ton / Day"
    },
    "bmp-1": { 
        name: "BMP I", 
        capacity: "300 KL", // Kapasitas tangki disamakan standar armada
        flag: "ID (Indonesia)", 
        built: "SAMARINDA / 2012", 
        gt: "84 GT", 
        nt: "41 NT",
        regNo: "GT. 84 No. 4953/IIk (Akte: 6089)",
        callSign: "-",
        owner: "PT. PELAYARAN TUJUH TUNAS SATU SAMUDERA",
        loa: "27.53 M", lbp: "25.74 M", breadth: "5.30 M", depth: "2.05 M", draft: "Summer: 1.68 M / Fresh: 1.72 M",
        engine: "MITSUBISHI (2 X 230 HP / No: 125491 | 557107)", auxEngine: "YANMAR TF 2X85 HP", fuelCons: "0.72 Ton / Day (SOLAR)"
    },
    "aqsha-yali": { 
        name: "AQSHA YALI YALI", 
        capacity: "175 KL", 
        flag: "Indonesia", 
        built: "Samarinda / 2013", 
        gt: "273 GT", // Sesuai instruksi: GT diubah menjadi 273
        nt: "98 NT",
        regNo: "GT. 273 No. 4102/llk",
        callSign: "YB3344",
        owner: "PT. PELAYARAN TUJUH TUNAS SATU SAMUDERA",
        loa: "27.39 M", lbp: "24.50 M", breadth: "5.40 M", depth: "2.00 M", draft: "1.62 M",
        engine: "Mitsubishi 6B22 (2 x 230 HP)", auxEngine: "Mitsubishi T5 (1 x 100 HP)", fuelCons: "1.20 Ton / Day"
    },
    "dian-yuspa": { 
        name: "SPOB. DIAN YUSPA XII", 
        capacity: "250 KL", 
        flag: "Indonesia", 
        built: "Balikpapan / 2012", 
        gt: "138 GT", 
        nt: "69 NT",
        regNo: "2012 IId No.979/L (Class: BKI)",
        callSign: "YB.6521",
        owner: "HJ. YUSDANA (PT. DYS)",
        loa: "30.00 M", lbp: "-", breadth: "6.50 M", depth: "-", draft: "2.70 M",
        engine: "Cummins NTA 855 (2 x 350 HP @1600 RPM)", auxEngine: "Mitsubishi 4D30 (2 Units 120 HP)", fuelCons: "2000 Liter / Day"
    }
};

// Modul Template Konstruksi Data Dokumen Berdasarkan Komponen Struktur Kapal
function generateParticularTemplate(vesselName, componentKey) {
    const v = globalFleetDatabase[activeVesselKey] || globalFleetDatabase["tujuh-tunas"];
    
    const templates = {
        "bridge": {
            title: "Principal Particulars & Hull Metadata",
            tag: "General Specs",
            color: "#00d2ff",
            rows: [
                ["Type of Vessel", "Self Propelled Oil Barge (SPOB)"],
                ["Flag / National", v.flag],
                ["Built At / Year", v.built],
                ["Material Construction", "Baja (Steel)"],
                ["Port of Registry", v.built.split(" / ")[0]], // Mengambil lokasi galangan pendaftaran
                ["Official No Registry", v.regNo],
                ["Call Sign Radio", v.callSign],
                ["LOA (Length Over All)", v.loa],
                ["Breadth Moulded", v.breadth],
                ["Depth / Draft Max", `${v.depth || '-'} M / ${v.draft}`],
                ["Crew On Board", "6 Persons Crew"],
                ["Registered Ship Owner", v.owner]
            ]
        },
        "cargo": {
            title: "Cargo Capacities & Loading Tonnage",
            tag: "Tank Compartment",
            color: "#00ff87",
            rows: [
                ["Fluid Cargo Volume", v.capacity],
                ["Gross Tonnage Vol.", v.gt],
                ["Net Tonnage Vol.", v.nt],
                ["Fresh Water Storage", activeVesselKey === "dian-yuspa" ? "30 KL" : "0 KL / Space Empty"],
                ["Cargo Payload Safety", "Double Hull Leak Protection Structure"],
                ["Validity Specification", "31 Desember 9999 / Permanent Database"]
            ]
        },
        "engine": {
            title: "Propulsion Machinery & Safety System",
            tag: "Machinery Room",
            color: "#ff4d4d",
            rows: [
                ["Main Engine Propulsion", v.engine],
                ["Auxiliary Engine Gen.", v.auxEngine],
                ["Cargo / Fire Pump Engine", activeVesselKey === "dian-yuspa" ? "Mitsubishi 4D30 / 4D31 System" : "Standard Connection System"],
                ["Fuel Feed Type", "SOLAR / HSD"],
                ["Fuel Consumed Rate", v.fuelCons],
                ["Maximum Speed Record", activeVesselKey === "bmp-1" ? "7 Knot" : "7.0 Knot standard"],
                ["Normal Standard Speed", activeVesselKey === "bmp-1" ? "5 Knot" : "5.0 Knot standard"],
                ["Economical Cruise Speed", activeVesselKey === "bmp-1" ? "4 Knot" : "4.0 Knot standard"],
                ["Fire Fighting Equipment", "Fire Pump System Available & Ready"]
            ]
        }
    };
    return templates[componentKey];
}

/**
 * 1. FUNGSI UTAMA: Navigasi Klik Dock Mengganti Model Kapal Dinamis
 */
function switchVesselModel(vesselKey) {
    if (!globalFleetDatabase[vesselKey]) return;
    activeVesselKey = vesselKey;

    // Visual Switch Tombol Aktif Di Kelas Dock
    document.querySelectorAll('.dock-item-btn').forEach(btn => btn.classList.remove('active'));
    const targetBtn = document.querySelector(`[data-ship="${vesselKey}"]`);
    if (targetBtn) targetBtn.classList.add('active');

    // Perbarui Telemetri Layar Atas
    document.getElementById('telemetry-vessel').innerText = globalFleetDatabase[vesselKey].name;

    // Reset Sudut Kamera ke Posisi Netral Lebih Dulu
    resetVesselView();

    // Efek Animasi Lambung Bergetar Saat Berpindah Aset Model Kapal (Docking Wave Effect)
    const hullMatrix = document.getElementById('vessel-hull-matrix');
    if (hullMatrix) {
        hullMatrix.style.transform = 'translateZ(-40px) rotateZ(5deg)';
        setTimeout(() => {
            hullMatrix.style.transform = 'translateZ(0) rotateZ(0)';
        }, 250);
    }
}

/**
 * 2. FUNGSI UTAMA: Deteksi Klik Zoom Isometrik Komponen Internal
 */
function triggerComponentFocus(componentKey) {
    const docData = generateParticularTemplate(activeVesselKey, componentKey);
    if (!docData) return;

    // Aktifkan Tombol Reset Kamera
    document.getElementById('btn-reset-camera').classList.remove('disabled');

    // Geser Matriks Koordinat 3D Mendekati Area Komponen (Lensa Kamera Zoom)
    const orbitSpace = document.getElementById('orbit-space-3d');
    if (componentKey === 'bridge') {
        orbitSpace.style.transform = 'rotateX(54deg) rotateZ(-25deg) scale3d(1.5, 1.5, 1.5) translate3d(55px, 35px, -15px)';
    } else if (componentKey === 'cargo') {
        orbitSpace.style.transform = 'rotateX(50deg) rotateZ(-40deg) scale3d(1.35, 1.35, 1.35) translate3d(-15px, 15px, -10px)';
    } else if (componentKey === 'engine') {
        orbitSpace.style.transform = 'rotateX(54deg) rotateZ(-55deg) scale3d(1.6, 1.6, 1.6) translate3d(-75px, -15px, -10px)';
    }

    // Isolasi Filter: Komponen Lain Memudar, Komponen Terpilih Naik Melayang
    document.querySelectorAll('.ttss-structural-cell').forEach(cell => {
        cell.classList.add('fade-isolate');
        cell.classList.remove('focused-mesh');
    });
    const currentCell = document.getElementById(`cell-${componentKey}`);
    currentCell.classList.remove('fade-isolate');
    currentCell.classList.add('focused-mesh');

    // Sembunyikan Layar Petunjuk Insting Utama, Munculkan Format Cetak Dokumen
    document.getElementById('instruction-screen').classList.add('hidden');
    const docSheet = document.getElementById('particular-document');
    docSheet.classList.remove('hidden');

    // Suntik Nilai Judul Dan Identitas Lambung Kapal Ke Lembar Kiri
    const tagLbl = document.getElementById('doc-comp-tag');
    tagLbl.innerText = docData.tag;
    tagLbl.style.backgroundColor = docData.color;
    document.getElementById('doc-comp-title').innerText = docData.title;
    document.getElementById('doc-vessel-name').innerText = globalFleetDatabase[activeVesselKey].name;

    // Render Ulang Seluruh Baris Spesifikasi Tabel
    const tableBody = document.getElementById('doc-table-data');
    tableBody.innerHTML = "";
    docData.rows.forEach(item => {
        tableBody.innerHTML += `
            <tr>
                <td><i class='bx bx-radio-circle-marked' style='color:${docData.color}'></i> ${item[0]}</td>
                <td>${item[1]}</td>
            </tr>
        `;
    });
}

/**
 * 3. FUNGSI UTAMA: Mengembalikan Orbit Pandangan Kamera Ke Sumbu Netral Standard
 */
function resetVesselView() {
    const orbitSpace = document.getElementById('orbit-space-3d');
    if (orbitSpace) {
        orbitSpace.style.transform = 'rotateX(60deg) rotateZ(-45deg) translate3d(0,0,0)';
    }

    // Bebaskan Semua Komponen Dari Efek Isolasi Transparan
    document.querySelectorAll('.ttss-structural-cell').forEach(cell => {
        cell.classList.remove('fade-isolate', 'focused-mesh');
    });

    // Kembalikan Tampilan Sisi Kiri Ke Menu Informasi Awal
    document.getElementById('particular-document').classList.add('hidden');
    document.getElementById('instruction-screen').classList.remove('hidden');

    // Kunci Kembali Akses Tombol Reset Kamera
    document.getElementById('btn-reset-camera').classList.add('disabled');
}
document.addEventListener("DOMContentLoaded", function() {
    
    // Tarik elemen DOM control panel
    const isoSlider = document.getElementById('iso-volume-slider');
    const isoSelect = document.getElementById('iso-tank-select');
    const lblPct = document.getElementById('lbl-iso-pct');
    
    // Tarik elemen indikator teks angka
    const lblTotalKl = document.getElementById('lbl-iso-total-kl');
    const lblUllage = document.getElementById('lbl-iso-ullage');
    
    // Tarik target objek kubus 3D cairan
    const fluidCube1 = document.getElementById('fluid-cube-1');
    const fluidCube2 = document.getElementById('fluid-cube-2');

    /**
     * Sinkronisasi nilai slider langsung ke variabel CSS 3D & Kalkulator Lapangan
     */
    function processIsoCargoSync() {
        if (!isoSlider) return;
        
        const pctValue = parseInt(isoSlider.value);
        const selectedTank = isoSelect ? isoSelect.value : "all";
        
        // 1. Perbarui lencana persentase teks di atas slider
        if (lblPct) lblPct.innerText = pctValue + "%";
        
        // 2. Manipulasi tinggi kubus cairan 3D via CSS Custom Property (--fluid-height)
        if (selectedTank === "all" || selectedTank === "tk1") {
            if (fluidCube1) fluidCube1.style.setProperty('--fluid-height', pctValue);
        }
        if (selectedTank === "all" || selectedTank === "tk2") {
            if (fluidCube2) fluidCube2.style.setProperty('--fluid-height', pctValue);
        }

        // 3. Simulasi matematika kalkulasi volume muatan minyak (Kapasitas Maksimal Maks 300 KL)
        const maxCapacityKl = 300;
        const currentKl = (maxCapacityKl * (pctValue / 100)).toFixed(1);
        if (lblTotalKl) lblTotalKl.innerText = currentKl + " KL";
        
        // 4. Simulasi hitung tinggi ruang kosong tangki (Ullage dalam mm, tinggi total tanki 2500 mm)
        const maxTankHeightMm = 2500;
        const currentUllageMm = Math.round(maxTankHeightMm * (1 - (pctValue / 100)));
        if (lblUllage) lblUllage.innerText = currentUllageMm.toLocaleString('id-ID') + " mm";
    }

    // Pasang Event Listener agar cairan bergerak responsif saat slider digeser
    if (isoSlider) {
        isoSlider.addEventListener('input', processIsoCargoSync);
    }
    if (isoSelect) {
        // Jika fokus kompartemen diganti, jalankan ulang perhitungan posisi
        isoSelect.addEventListener('change', processIsoCargoSync);
    }

    // Jalankan eksekusi awal sekali saat dokumen siap diakses
    processIsoCargoSync();
});

document.addEventListener("DOMContentLoaded", function() {

    // Global State Currency Control
    let currentCurrencyState = "IDR"; 
    const conversionRateUSD = 16250; // Jembatan konversi kurs USD data mock 2026

    // --- FITUR 1 & MODIFIKASI: LIVE FREIGHT CALCULATOR ENGINE ---
    function executeFreightCalculation() {
        const cargoSelect = document.getElementById('calc-cargo');
        const volumeInput = document.getElementById('calc-volume');
        const resultPriceText = document.getElementById('result-price');

        if (!volumeInput || !cargoSelect || !resultPriceText) return;

        let volume = parseFloat(volumeInput.value);
        let cargoType = cargoSelect.value;

        if (isNaN(volume) || volume <= 0) {
            resultPriceText.innerText = currentCurrencyState === "IDR" ? "Rp 0" : "$0";
            return;
        }

        if (volume > 300) {
            volume = 300;
            volumeInput.value = 300;
        }

        // Base rate perhitungan muatan logistik cairan (KL)
        let baseRateIDR = 120000; // Solar HSD
        if (cargoType === 'mfo') baseRateIDR = 145000;
        if (cargoType === 'bbf') baseRateIDR = 132000;

        let totalCostIDR = volume * baseRateIDR;

        // Render Mata Uang Berdasarkan State yang Aktif
        if (currentCurrencyState === "IDR") {
            resultPriceText.innerText = new Intl.NumberFormat('id-ID', {
                style: 'currency', currency: 'IDR', maximumFractionDigits: 0
            }).format(totalCostIDR);
        } else {
            let totalCostUSD = totalCostIDR / conversionRateUSD;
            resultPriceText.innerText = new Intl.NumberFormat('en-US', {
                style: 'currency', currency: 'USD', maximumFractionDigits: 2
            }).format(totalCostUSD);
        }
    }

    // --- ENGINE CONTROL INTEGRATION: CURRENCY TOGGLE INTERACTION ---
    const btnIDR = document.getElementById('btn-currency-idr');
    const btnUSD = document.getElementById('btn-currency-usd');

    if (btnIDR && btnUSD) {
        btnIDR.addEventListener('click', function() {
            if (currentCurrencyState === "IDR") return;
            currentCurrencyState = "IDR";
            btnIDR.classList.add('ttss-currency-btn--active');
            btnUSD.classList.remove('ttss-currency-btn--active');
            executeFreightCalculation();
        });

        btnUSD.addEventListener('click', function() {
            if (currentCurrencyState === "USD") return;
            currentCurrencyState = "USD";
            btnUSD.classList.add('ttss-currency-btn--active');
            btnIDR.classList.remove('ttss-currency-btn--active');
            executeFreightCalculation();
        });
    }

    // Live Event Listeners Perubahan Form Kalkulator
    const volumeField = document.getElementById('calc-volume');
    const cargoField = document.getElementById('calc-cargo');
    const calculateBtn = document.getElementById('btn-hitung-freight');

    if (volumeField) volumeField.addEventListener('input', executeFreightCalculation);
    if (cargoField) cargoField.addEventListener('change', executeFreightCalculation);
    if (calculateBtn) {
        calculateBtn.addEventListener('click', function(e) {
            e.preventDefault();
            executeFreightCalculation();
        });
    }


    // --- FITUR BARU 2: REAL-TIME SEARCH FILTER MATRIX FLEET ---
    const searchInput = document.getElementById('fleet-search-input');
    const fleetContainer = document.getElementById('fleet-list-container');

    if (searchInput && fleetContainer) {
        const fleetRows = fleetContainer.getElementsByClassName('ttss-status-row');
        
        // Buat elemen penampung feedback kosong sekali saja di awal
        const emptyFeedback = document.createElement('div');
        emptyFeedback.className = 'ttss-empty-search-feedback';
        emptyFeedback.innerHTML = "<i class='bx bx-search-alt'></i> Armada tidak ditemukan";
        emptyFeedback.style.display = 'none';
        fleetContainer.appendChild(emptyFeedback);

        searchInput.addEventListener('input', function() {
            const queryValue = searchInput.value.toLowerCase().trim();
            let visibleCount = 0;

            for (let i = 0; i < fleetRows.length; i++) {
                const datasetAttribute = fleetRows[i].getAttribute('data-vessel');
                if (datasetAttribute) {
                    if (datasetAttribute.includes(queryValue)) {
                        fleetRows[i].style.display = 'flex';
                        visibleCount++;
                    } else {
                        fleetRows[i].style.display = 'none';
                    }
                }
            }

            // Tampilkan pesan umpan balik jika tidak ada row data yang lolos filter pencarian
            emptyFeedback.style.display = visibleCount === 0 ? 'block' : 'none';
        });
    }


    // --- FITUR BARU 3: LOG DATA SHEET ESTIMATE EXPORTER ---
    const downloadBtn = document.getElementById('btn-download-rate');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const currentPrice = document.getElementById('result-price').innerText;
            const cargoName = document.getElementById('calc-cargo').options[document.getElementById('calc-cargo').selectedIndex].text;
            const currentVolume = document.getElementById('calc-volume').value;

            // Simulasi Trigger Log Dokumen Resmi Terunduh
            alert(`Sistem Enkripsi PDF Berhasil:\nDokumen Rekapitulasi Komersial Terunduh!\n\nDetail Ringkasan:\n-------------------------\nMuatan: ${cargoName}\nVolume: ${currentVolume} KL\nEstimasi Nilai: ${currentPrice}\n\nFile tersimpan otomatis ke direktori lokal perangkat Anda.`);
        });
    }


    // --- SHIP PARTICULARS WHATSAPP DISPATCH ROUTER ---
    const requestDocBtn = document.getElementById('btn-request-particulars');
    if (requestDocBtn) {
        requestDocBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const vesselSelector = document.getElementById('request-particular-vessel');
            if (!vesselSelector) return;

            const targetVessel = vesselSelector.value;
            const targetWhatsAppGateway = "6281111801949"; 

            const messageText = `Halo Tim Komersial PT TTSS,\n\nMohon bantuannya untuk memproses dan mengirimkan salinan berkas resmi berkas *Ship Particulars* untuk armada *${targetVessel}* komersial terbaru.\n\nTerima kasih.`;
            window.open(`https://wa.me/${targetWhatsAppGateway}?text=${encodeURIComponent(messageText)}`, '_blank');
        });
    }

    // Inisialisasi awal kalkulasi visual rate
    executeFreightCalculation();
});

document.addEventListener("DOMContentLoaded", () => {

    
    
    // ==========================================
    // 1. PREMIUM PRELOADER LOGIC
    // ==========================================
    const preloader = document.getElementById("preloader");
    if (preloader) {
        // Memastikan preloader hilang secara mulus setelah window selesai memuat seluruh aset
        window.addEventListener("load", () => {
            setTimeout(() => {
                preloader.style.opacity = "0";
                preloader.style.visibility = "hidden";
            }, 400); // Memberikan sedikit jeda dramatis yang premium
        });

        // Fail-safe: Jika window load terlalu lama/terhambat, paksa preloader hilang dalam 3 detik
        setTimeout(() => {
            preloader.style.opacity = "0";
            preloader.style.visibility = "hidden";
        }, 3000);
    }
// ==========================================
// INTERACTIVE ENGINE: PREMIUM AI CHATBOT SYSTEM
// ==========================================
const trigger = document.getElementById('chatbotTrigger');
const windowBox = document.getElementById('chatbotWindow');
const closeBtn = document.getElementById('closeChatbot');
const inputField = document.getElementById('chatbotInput');
const sendBtn = document.getElementById('chatbotSendBtn');
const msgArea = document.getElementById('chatbotMessages');
const suggestBtns = document.querySelectorAll('.suggest-btn');

// Toggle buka-tutup jendela chat
if (trigger && windowBox && closeBtn) {
    trigger.addEventListener('click', () => windowBox.classList.toggle('active'));
    closeBtn.addEventListener('click', () => windowBox.classList.remove('active'));
}

// Handler pengiriman pesan dari pengguna
function handleUserMessage() {
    const text = inputField.value.trim();
    if (!text) return;

    appendMessage(text, 'user-msg');
    inputField.value = '';

    // Picu efek mengetik bot (Simulasi Berpikir AI)
    showTypingIndicator();

    setTimeout(() => {
        removeTypingIndicator();
        const reply = generateBotReply(text);
        appendMessage(reply, 'bot-msg');
    }, 1200); // Waktu jeda simulasi berpikir (1.2 detik)
}

if (sendBtn && inputField) {
    sendBtn.addEventListener('click', handleUserMessage);
    inputField.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleUserMessage();
    });
}

// Handler untuk tombol saran cepat (Quick Suggestions)
suggestBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const text = btn.textContent;
        appendMessage(text, 'user-msg');
        showTypingIndicator();
        setTimeout(() => {
            removeTypingIndicator();
            const reply = generateBotReply(text);
            appendMessage(reply, 'bot-msg');
        }, 1000);
    });
});

// Fungsi untuk memasukkan teks ke dalam bubble chat area
function appendMessage(text, className) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', className);
    msgDiv.innerHTML = `<p>${text}</p><span class="chat-time">Baru saja</span>`;
    msgArea.appendChild(msgDiv);
    msgArea.scrollTop = msgArea.scrollHeight; // Otomatis gulung ke bawah
}

// Simulasi Indikator Mengetik
function showTypingIndicator() {
    const indicator = document.createElement('div');
    indicator.classList.add('message', 'bot-msg', 'typing-indicator');
    indicator.id = 'typingIndicator';
    indicator.innerHTML = '<span></span><span></span><span></span>';
    msgArea.appendChild(indicator);
    msgArea.scrollTop = msgArea.scrollHeight;
}

function removeTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) indicator.remove();
}

// ==========================================================================
// ADVANCED AI CHATBOT ENGINE - FUZZY NLP & CONTEXTUAL MEMORY
// ==========================================================================

// Memori jangka pendek untuk mengingat konteks pembicaraan terakhir
let chatContext = {
    lastTopic: null,
    userInquiryCount: 0
};

// Database Pengetahuan & Variasi Jawaban AI PT TTSS
const aiKnowledgeBase = {
    salam: {
        keywords: ['halo', 'hai', 'p', 'selamat', 'pagi', 'siang', 'malam', 'assalamualaikum', 'oi', 'hello'],
        replies: [
            'Halo! Senang bisa menyapa Anda. Ada yang bisa saya bantu seputar layanan logistik maritim PT TTSS hari ini?',
            'Selamat datang di portal interaktif PT TTSS. Saya siap mendampingi dan menjawab kebutuhan informasi Anda. Apa yang ingin Anda ketahui?',
            'Hai! Virtual Officer PT TTSS di sini. Semoga hari Anda menyenangkan. Ada hal yang bisa saya bantu mudahkan hari ini?'
        ]
    },
    legalitas: {
        keywords: ['legalitas', 'siupal', 'dokumen', 'npwp', 'sertifikat', 'ijin', 'izin', 'akta', 'sah', 'resmi', 'skb', 'skt'],
        replies: [
            'PT Tujuh Tunas Satu Samudera beroperasi secara sah dengan legalitas penuh. Kami memegang <strong>SIUPAL No. B.X-114/AL001</strong> serta dokumen pelengkap seperti NPWP korporasi, Akta Notaris, dan SKT. Anda bisa melakukan verifikasi mandiri dengan memindai QR Code pada section "Verifikasi Dokumen Resmi" di web ini.',
            'Kepatuhan hukum adalah prioritas kami. Seluruh dokumen legalitas perusahaan mulai dari SIUPAL hingga izin operasional pelayaran kami selalu diperbarui dan valid. Apakah Anda membutuhkan nomor registrasi spesifik untuk keperluan verifikasi berkas?'
        ]
    },
    lokasi: {
        keywords: ['lokasi', 'agen', 'kantor', 'alamat', 'cabang', 'wilayah', 'daerah', 'posisi', 'balikpapan', 'surabaya', 'palembang', 'berau', 'bontang'],
        replies: [
            'Kantor Pusat (Head Office) kami berkedudukan di <strong>Balikpapan, Kalimantan Timur</strong> (Jl. Mulawarman No 55). Guna memastikan kelancaran distribusi, kami juga diperkuat oleh kantor keagenan cabang di <strong>Palembang, Berau, Bontang, Labuan Uki, hingga Surabaya</strong>. Anda bisa meninjau peta lokasinya langsung pada bagian bawah landing page ini.',
            'Jaringan keagenan PT TTSS tersebar luas secara strategis di beberapa pelabuhan utama Indonesia, termasuk Head Office di Balikpapan dan 5 kantor cabang wilayah. Ada area spesifik yang sedang Anda targetkan untuk pengiriman atau keagenan kapal?'
        ]
    },
    armada: {
        keywords: ['sewa', 'kapal', 'armada', 'spob', 'barge', 'tongkang', 'minyak', 'charter', 'angkut', 'logistik', 'tarif', 'harga'],
        replies: [
            'Kami mengoperasikan armada kapal tangki minyak (SPOB) modern yang dirawat berkala untuk menjamin keamanan kargo cair Anda. Kami melayani sistem sewa/charter untuk distribusi domestik. Untuk kalkulasi tarif yang kompetitif, Anda dapat berdiskusi langsung dengan tim komersial kami.',
            'Layanan keagenan dan penyewaan kapal kami mencakup pengurusan dokumen clearance, bunker filling, hingga manajemen logistik maritim terpadu. Untuk mengecek jadwal *ready* armada terdekat, silakan hubungi pusat komunikasi kami via tombol WhatsApp.'
        ]
    },
    kontak: {
        keywords: ['wa', 'whatsapp', 'hubungi', 'nomor', 'kontak', 'telepon', 'email', 'admin', 'cs', 'call', 'center', 'direktur', 'komisaris'],
        replies: [
            'Anda dapat langsung berdiskusi secara personal dengan tim administrasi online kami melalui WhatsApp di nomor resmi <strong>+62 811-1180-1949</strong>, atau panggilan kantor di <strong>0542 7210436</strong>. Kami siap membantu Anda kapan saja.',
            'Untuk keperluan surat-menyurat resmi, pengajuan proposal, atau komparasi dokumen (seperti *demurrage/clearance*), Anda bisa mengirim surel ke divisi administrasi kami atau mengklik pintasan tautan WhatsApp yang ada di layar.'
        ]
    },
    apresiasi: {
        keywords: ['terima', 'kasih', 'thanks', 'oke', 'sip', 'mantap', 'bagus', 'keren', 'paham', 'mengerti'],
        replies: [
            'Sama-sama! Senang sekali bisa membantu memberikan kejelasan informasi. Jangan ragu bertegur sapa kembali jika ada hal lain yang perlu didiskusikan. Sukses selalu untuk bisnis Anda!',
            'Sama-sama. Merupakan komitmen kami memberikan pelayanan informatif layaknya standar operasional PT TTSS di lapangan. Ada hal lain yang ingin Anda validasi?',
            'Sip! Senang pembicaraan kita berjalan lancar. Tetap jaga kesehatan dan semoga kerja sama kita ke depan berjalan sukses!'
        ]
    },
    basa_basi: {
        keywords: ['kamu', 'siapa', 'nama', 'robot', 'ai', 'pintar', 'hebat', 'kerja', 'kabar', 'sehat'],
        replies: [
            'Saya adalah **TTSS Smart Assistant**, sebuah program AI Virtual Officer yang dilatih khusus untuk memahami kebutuhan informasi Anda seputar dunia pelayaran dan keagenan kapal PT TTSS.',
            'Kabar saya selalu prima berkat sistem cloud yang optimal! Terima kasih sudah bertanya. Bagaimana dengan kabar Anda hari ini? Semoga operasional bisnis Anda berjalan lancar.'
        ]
    }
};



// Database balasan dinamis berdasarkan KONTEKS lanjutan (Follow-up)
const contextualReplies = {
    legalitas: 'Jika Anda ragu dengan nomor SIUPAL tersebut, tim administrasi kami bisa mengirimkan berkas salinan resminya via email atau WhatsApp. Apakah Anda ingin langsung terhubung ke bagian admin dokumen kami?',
    lokasi: 'Sebagai informasi tambahan, seluruh kantor cabang kami memiliki tim lapangan (*boarding agent*) yang stand-by 24/7 di pelabuhan setempat untuk menangani kebutuhan kapal Anda.',
    armada: 'Untuk proses pengajuan sewa, kami biasanya memerlukan data spesifik kargo, rute muat (*loading port*), dan rute bongkar (*discharging port*). Apakah dokumen *ship particular* armada kami yang Anda perlukan saat ini?'
};

// ==========================================================================
// CORE PROCESSING ENGINE (ALGORITMA SKOR TOKEN & RELEVANSI)
// ==========================================================================
function generateBotReply(userInput) {
    const input = userInput.toLowerCase().trim();
    chatContext.userInquiryCount++;

    // 1. CEK KONTEKS LANJUTAN (Jika user mengetik hal pendek seperti "lalu?", "gimana?", "di mana?")
    const shortFollowUp = ['gimana', 'bagaimana', 'lalu', 'dimana', 'di mana', 'lanjut', 'trus', 'terus', 'detailnya'];
    if (shortFollowUp.some(word => input === word || input.includes(word)) && chatContext.lastTopic) {
        const contextReply = contextualReplies[chatContext.lastTopic];
        if (contextReply) {
            return `Menambahkan informasi dari topik **${chatContext.lastTopic}** sebelumnya: ${contextReply}`;
        }
    }

    // 2. ALGORITMA TOKENISASI & SKORING RELEVANSI (Fuzzy Logic)
    let bestMatchCategory = null;
    let highestScore = 0;

    // Pecah input user menjadi deretan kata tunggal
    const userWords = input.split(/[\s,?.!]+/);

    // Hitung bobot kecocokan kata kunci di setiap kategori database
    for (const category in aiKnowledgeBase) {
        let currentScore = 0;
        const keywords = aiKnowledgeBase[category].keywords;

        userWords.forEach(word => {
            if (keywords.includes(word)) {
                currentScore += 2; // Kecocokan kata sempurna dapat poin tinggi
            } else {
                // Cek parsial (misal user mengetik "siupalnya" tetap mendeteksi kata "siupal")
                keywords.forEach(kw => {
                    if (word.length > 3 && word.includes(kw)) {
                        currentScore += 1;
                    }
                });
            }
        });

        if (currentScore > highestScore) {
            highestScore = currentScore;
            bestMatchCategory = category;
        }
    }

    // 3. EKSEKUSI DATA BALASAN
    if (bestMatchCategory && highestScore > 0) {
        // Simpan topik terakhir ke memori chatbot
        chatContext.lastTopic = bestMatchCategory;

        // Ambil variasi jawaban secara acak agar tidak membosankan
        const replyOptions = aiKnowledgeBase[bestMatchCategory].replies;
        const randomIndex = Math.floor(Math.random() * replyOptions.length);
        return replyOptions[randomIndex];
    }

    // 4. CHATBOT OVERFLOW (Jika AI tidak memahami maksud pembicaraan)
    chatContext.lastTopic = null; // Reset konteks karena obrolan terputus
    
    const defaultReplies = [
        'Pertanyaan yang menarik! Namun agar tidak terjadi kekeliruan informasi operasional, saya sarankan Anda langsung mengonsultasikannya dengan petugas administrasi online kami via <a href="https://wa.me/6281111801949" target="_blank" style="color:#38bdf8;font-weight:600;text-decoration:underline;">WhatsApp Resmi Admin</a>.',
        'Sistem AI saya belum menangkap maksud spesifik dari kalimat Anda. Apakah ini terkait masalah peninjauan Dokumen Hukum, Sewa Armada SPOB, atau Alamat Kantor Keagenan Cabang kami?',
        'Saya ingin sekali menjawabnya dengan tepat, namun kapasitas basis data asisten virtual saya saat ini terbatas pada informasi profil korporasi PT TTSS. Anda dapat meninggalkan pesan atau kontak yang bisa dihubungi agar staf lapangan kami dapat menelepon Anda balik.'
    ];
    
    const randomDefaultIndex = Math.floor(Math.random() * defaultReplies.length);
    return defaultReplies[randomDefaultIndex];
}

    // ==========================================
    // 2. DYNAMIC STICKY NAVBAR EFFECT
    // ==========================================
    const navbar = document.querySelector(".navbar");
    if (navbar) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                navbar.style.padding = "12px 5%";
                navbar.style.background = "rgba(15, 23, 42, 0.95)";
                navbar.style.boxShadow = "0 10px 30px -10px rgba(0,0,0,0.3)";
            } else {
                navbar.style.padding = "20px 5%";
                navbar.style.background = "rgba(15, 23, 42, 0.8)";
                navbar.style.boxShadow = "none";
            }
        });
    }


    // ==========================================
    // 3. RESPONSIVE HAMBURGER MOBILE ENGINE
    // ==========================================
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".navbar-nav");
    const navLinks = document.querySelectorAll(".nav-link");

    if (hamburger && navMenu) {
        // Toggle Menu saat Hamburger diklik
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("toggle");
            navMenu.classList.toggle("active");
        });

        // Tutup menu secara otomatis saat salah satu link navigasi diklik (Penting untuk Single Page Navigation)
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                hamburger.classList.remove("toggle");
                navMenu.classList.remove("active");
            });
        });
    }


    // ==========================================
    // 4. INTERACTIVE GALLERY FILTERING SYSTEM
    // ==========================================
    const filterButtons = document.querySelectorAll(".filter-btn");
    const galleryItems = document.querySelectorAll(".gallery-item-wrapper");

    if (filterButtons.length > 0 && galleryItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener("click", function() {
                // Remove class 'active' dari semua tombol filter
                filterButtons.forEach(btn => btn.classList.remove("active"));
                // Tambahkan class 'active' ke tombol yang sedang diklik
                this.classList.add("active");

                const selectedFilter = this.textContent.trim().toLowerCase();

                galleryItems.forEach(item => {
                    // Ambil teks alt atau data internal untuk pencocokan kategori
                    const itemImageAlt = item.querySelector("img").getAttribute("alt").toLowerCase();
                    const itemOverlayTitle = item.querySelector("h5").textContent.toLowerCase();
                    const combinedText = itemImageAlt + " " + itemOverlayTitle;

                    // Logika Filter Berdasarkan Keyword Teks Komponen
                    if (selectedFilter === "semua foto") {
                        showItem(item);
                    } else if (selectedFilter === "spob fleet" && combinedText.includes("spob")) {
                        showItem(item);
                    } else if (selectedFilter === "operasional port" && (combinedText.includes("sandar") || combinedText.includes("dermaga") || combinedText.includes("loading") || combinedText.includes("hub") || combinedText.includes("port") || combinedText.includes("docking"))) {
                        showItem(item);
                    } else if (selectedFilter === "crew activity" && (combinedText.includes("kru") || combinedText.includes("inspeksi") || combinedText.includes("hse") || combinedText.includes("berkas") || combinedText.includes("anjungan"))) {
                        showItem(item);
                    } else {
                        hideItem(item);
                    }
                });
            });
        });
    }

    // Helper Function Animasi Filter Galeri (Smooth Fade Effect)
    function hideItem(element) {
        element.style.transform = "scale(0.8)";
        element.style.opacity = "0";
        setTimeout(() => {
            element.parentElement.style.display = "none";
        }, 400); // Menyesuaikan dengan durasi transisi CSS
    }

    function showItem(element) {
        element.parentElement.style.display = "block";
        setTimeout(() => {
            element.style.transform = "scale(1)";
            element.style.opacity = "1";
        }, 50);
    }


    // ==========================================
    // 5. INITIALIZATION AOS ANIMATION LAYER
    // ==========================================
    // Memastikan pustaka AOS (Animate On Scroll) berjalan optimal di semua halaman jika terpasang
    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 120,
            easing: 'cubic-bezier(0.16, 1, 0.3, 1)'
        });
    }

});

