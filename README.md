# Ngobrol Abjad

Game web mobile sederhana untuk bermain sambung obrolan dari huruf A sampai Z.

## File utama

- `index.html` — teks, struktur layar, dan slot elemen buatan sendiri.
- `assets/css/style.css` — warna, ukuran, jarak kosong, dan motion.
- `assets/js/game.js` — alur permainan, navigasi, keyboard, dan swipe.

## Mengganti elemen buatan sendiri

Di `index.html`, cari komentar berikut:

- `AREA LOGO`
- `Ganti tanda ini dengan ikon navbar buatanmu`
- `AREA END MARK`

Masukkan SVG atau elemen HTML buatanmu langsung di dalam slot tersebut. Setelah selesai, hapus elemen `<span>` yang berisi teks penanda.

## Mengubah ukuran dan jarak

Di bagian paling atas `assets/css/style.css`, edit variabel pada blok `:root`.

Contoh:

```css
--logo-slot-width: 104px;
--logo-slot-height: 72px;
--title-size: clamp(56px, 17vw, 76px);
--letter-area-height: 300px;
--letter-size: clamp(150px, 48vw, 220px);
--button-height: 58px;
--end-slot-height: 210px;

--screen-gap: 24px;
--start-copy-gap: 22px;
--game-gap: 17px;
--content-padding: clamp(20px, 5vw, 28px);
```

Teks permainan dapat diubah langsung di `index.html`.
