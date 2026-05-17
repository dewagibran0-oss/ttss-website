/* ==========================================================================
   PT TTSS MASTER JAVASCRIPT - 2026 PREMIUM INTERACTIVE ENGINE
   Mencakup Fungsionalitas: Index, About, Sewa, dan Galeri
   ========================================================================== */

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

