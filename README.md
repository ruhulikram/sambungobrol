# 🗣️ Ngobrol Abjad — Game Sambung Kalimat A–Z

Game web sederhana untuk dimainkan bareng teman — setiap giliran harus ngomong kalimat yang diawali huruf berikutnya sesuai urutan alfabet!

---

## 📁 Struktur Folder

```
ngobrolabjad/
├── index.html            ← File utama (buka ini di browser)
├── assets/
│   ├── css/
│   │   └── style.css     ← Styling + animasi
│   └── js/
│       └── game.js       ← Logic permainan
└── README.md
```

## 🚀 Cara Jalankan

**Opsi 1 — Langsung buka file:**
- Double-click `index.html` → buka di browser

**Opsi 2 — Via live server (disarankan):**
```bash
# Pakai VS Code extension "Live Server"
# Atau pakai Python:
python -m http.server 3000
# Lalu buka: http://localhost:3000
```

## 🎮 Cara Main

1. Tekan **"Yuk Mulai!"**
2. Huruf pertama muncul **(A)**
3. Pemain yang dapat giliran harus ngomong kalimat yang **diawali huruf itu**
4. Tekan **SELANJUTNYA** untuk huruf berikutnya
5. Lanjutkan sampai **Z**!

## ⌨️ Shortcut

| Aksi | Tombol |
|------|--------|
| Huruf berikutnya | `Space` atau `→` |
| Swipe di mobile | Geser ke kiri |

## 🛠️ Tech Stack

- **HTML5** — Semantik & Aksesibel
- **Vanilla CSS** — Custom animasi, responsive
- **Vanilla JS** — Zero dependencies
- Google Fonts: **Poppins**
