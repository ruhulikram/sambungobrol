# 🗣️ Ngobrol Abjad — Game Sambung Kalimat A–Z

Game web interaktif untuk dimainkan bersama teman secara bergantian mengikuti urutan alfabet.

---

## 📁 Struktur Folder Proyek

```
ngobrolabjad/
├── index.html            ← Struktur HTML utama
├── README.md             ← Petunjuk ini
├── assets/
│   ├── css/
│   │   └── style.css     ← Konfigurasi & Styling Tema (CSS Variables)
│   ├── js/
│   │   └── game.js       ← Logika Permainan & Event Gestures
│   └── images/
│       ├── logo.svg      ← Aset Logo (Bisa langsung ditimpa/diganti)
│       └── home.svg      ← Aset Ikon Home (Bisa langsung ditimpa/diganti)
```

---

## 🎨 Cara Kustomisasi UI Sendiri (Full Customization)

Proyek ini telah dikonfigurasi agar kamu bisa mengganti tema dan aset dengan sangat mudah tanpa merusak kode utama.

### 1. Ganti Logo & Ikon Game
Semua aset gambar diletakkan di dalam folder `assets/images/`. Untuk mengganti logo atau ikon:
* **Ganti Logo Permainan**: Timpa file [logo.svg](file:///c:/Umar/Job/ngobrolabjad/assets/images/logo.svg) dengan logo buatanmu sendiri (bisa berformat `.png`, `.jpg`, `.svg`, atau `.webp`). Jika menggunakan format selain `.svg`, pastikan kamu mengubah ekstensi file di [index.html](file:///c:/Umar/Job/ngobrolabjad/index.html) pada bagian `<img src="assets/images/logo.svg">`.
* **Ganti Ikon Home**: Cukup ganti atau timpa file [home.svg](file:///c:/Umar/Job/ngobrolabjad/assets/images/home.svg).

### 2. Ganti Warna, Ukuran, & Font (CSS Variables)
Buka file stylesheet [style.css](file:///c:/Umar/Job/ngobrolabjad/assets/css/style.css). Di bagian paling atas terdapat blok `:root` berisi variabel CSS yang dapat kamu ubah nilainya langsung:

```css
:root {
  /* --- Ganti Warna Tema Utama --- */
  --primary: #6366f1;         /* Warna ungu utama */
  --primary-dark: #4f46e5;    /* Warna ungu hover/aktif */
  --secondary: #a855f7;       /* Warna ungu sekunder */
  --accent: #ec4899;          /* Warna pink aksen */
  --success: #10b981;         /* Warna tombol sukses */
  
  /* --- Ganti Warna Background & Teks --- */
  --bg: #f3f4f6;              /* Latar belakang halaman */
  --card-bg: #ffffff;         /* Latar belakang card */
  --text-main: #1f2937;       /* Warna teks utama */
  
  /* --- Ganti Layout & Radius --- */
  --card-max-width: 400px;    /* Lebar maksimal kotak game */
  --radius-card: 28px;        /* Kebulatan sudut kotak game */
  --radius-btn: 16px;         /* Kebulatan sudut tombol */
}
```

### 3. Menonaktifkan Gelembung Latar Belakang (Bubble Background)
Jika tidak ingin ada efek gelembung melayang di latar belakang, kamu cukup menghapus baris-baris elemen berikut dari [index.html](file:///c:/Umar/Job/ngobrolabjad/index.html):
```html
<div class="bubble" aria-hidden="true"></div>
```
Atau sembunyikan via CSS di [style.css](file:///c:/Umar/Job/ngobrolabjad/assets/css/style.css) dengan menambahkan `.bubble { display: none; }`.

---

## 🚀 Cara Menjalankan

1. **Buka Langsung**: Cukup klik dua kali berkas [index.html](file:///c:/Umar/Job/ngobrolabjad/index.html) untuk memainkannya langsung di browser pilihanmu.
2. **Local Server (Disarankan)**: Jika menggunakan Laravel Herd, buka browser di alamat:
   `http://ngobrolabjad.test/`

## ⌨️ Kontrol Keyboard & Gestur

* **Lanjut ke Huruf Berikutnya**: Tekan tombol `Spasi (Space)` atau tombol `Panah Kanan (→)`.
* **Kembali ke Menu Utama**: Tekan tombol `Escape (Esc)` pada keyboard atau tekan ikon 🏠.
* **Pengguna HP**: Kamu bisa **menggeser layar ke kiri (swipe left)** untuk melanjutkan ke huruf berikutnya.
