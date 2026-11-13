# 🎂 Selamat Ulang Tahun Thio Maria! 

Website ucapan ulang tahun interaktif yang dibuat khusus untuk **Thio Maria**. Dibuat dengan HTML, CSS, dan Vanilla JavaScript murni tanpa *framework*.

## ✨ Fitur Utama

- **✉️ Landing Page Amplop**: Animasi amplop 3D yang harus diklik untuk membuka kejutan.
- **🎵 Autoplay Musik**: Lagu (`lagu-maria.mp3`) akan otomatis berputar segera setelah amplop diklik (memanfaatkan interaksi *user* untuk menembus blokir *autoplay* browser).
- **🐈🐕 Switch Maskot**: Ganti suasana antara versi **Cacan** (Kucing) dan **Mocca** (Anjing). Setiap maskot memiliki foto dan teks ucapan khusus yang berbeda!
- **🕯️ Interaksi Tiup Lilin**: Klik tombol "Tiup Lilinnya" untuk memadamkan lilin di atas kue, memicu hujan konfeti, dan ledakan kembang api.
- **✨ Desain Glassmorphism**: Tampilan kotak transparan (*frosted glass*) dengan *background* luar angkasa. Bintang-bintang dan bintang jatuh dibuat secara prosedural menggunakan Canvas API.
- **✍️ Efek Ketik (Typewriter)**: Teks ucapan muncul huruf demi huruf dengan animasi yang halus.

## 📁 Struktur Folder

Proyek ini telah di-*refactor* agar rapi dan siap untuk di-*deploy*:

```text
birthday-maria/
│
├── index.html          # Halaman utama
├── README.md           # Dokumentasi ini
│
├── css/
│   └── style.css       # Semua styling (layout, animasi, glassmorphism, amplop)
│
├── js/
│   └── script.js       # Logika interaktif (canvas, lagu, ganti hewan, tiup lilin)
│
└── assets/             # File media
    ├── kucing-maria.gif
    ├── anjing-maria.gif
    └── lagu-maria.mp3
