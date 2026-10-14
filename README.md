# ⚡ ElectroHub - Website E-Commerce Elektronik Profesional

Website toko online jual beli elektronik modern, responsif, dan kaya fitur yang dikembangkan menggunakan **React (Vite), TypeScript, Tailwind CSS, Lucide Icons, Recharts, dan Node.js/Express**.

---

## 🚀 Fitur-Fitur Utama yang Berfungsi 100%

### 1. Navigasi & Tampilan Visual Premium
* **Header Modern**: Bar pengumuman garansi resmi, logo ElectroHub, bar pencarian dengan **live autocomplete search dropdown**, dropdown kategori, indikator badge keranjang, wishlist, dan komparasi.
* **Responsive Layout**: 100% responsif di layar Smartphone (Android & iPhone), Tablet, Laptop, dan Desktop.
* **Multi-Halaman Lengkap (18 Halaman)**:
  1. `Homepage` (`/`): Banner promo, flash sale countdown, produk unggulan, terlaris, ulasan pelanggan, dan newsletter.
  2. `Semua Produk` (`/products`): Katalog produk lengkap dengan filter interaktif.
  3. `Kategori Produk` (`/categories` / `/category/:slug`): Filter berbasis kategori elektronik.
  4. `Detail Produk` (`/product/:id`): Galeri foto, tabel spesifikasi teknis lengkap, rating, ulasan pembeli, pemilih varian, garansi resmi, dan produk terkait.
  5. `Pencarian` (`/search`): Halaman khusus penelusuran produk.
  6. `Keranjang Belanja` (`/cart`): Pilih barang, ubah kuantitas, input voucher diskon, hitung subtotal & total otomatis.
  7. `Form Checkout` (`/checkout`): Input alamat penerima, pilihan kurir (JNE, J&T, SiCepat, GoSend), metode pembayaran (VA BCA, Mandiri, QRIS, GoPay, CC).
  8. `Faktur Pembayaran` (`/order-success/:orderId`): Ringkasan faktur invoice & cetak nota.
  9. `Login & Registrasi` (`/login`, `/register`): Autentikasi pengguna dengan **Quick Role Switcher Toggle (Pelanggan vs Admin)** untuk pengujian demo yang mudah.
  10. `Profil Pengguna` (`/profile`): Edit nama, nomor telepon, dan pengelola buku alamat pengiriman.
  11. `Riwayat Pesanan` (`/orders`): Daftar transaksi dan tracking status.
  12. `Wishlist Produk` (`/wishlist`): Produk favorit pengguna.
  13. `Pelacakan Pesanan` (`/track-order`): Lacak nomor resi kurir dan status timeline pengiriman.
  14. `Promo & Diskon` (`/promos`): Daftar voucher aktif dan tombol *Salin Kode*.
  15. `Tentang Toko` (`/about`): Visi misi, garansi resmi 100%, dan lokasi store fisik.
  16. `Kontak & Bantuan` (`/contact`): Form customer service, hotline, dan FAQ accordion.
  17. `Kebijakan Retur & Privasi` (`/privacy`): Syarat retur 7 hari & proteksi data.
  18. `Dashboard Admin` (`/admin`, `/admin/products`, `/admin/orders`, `/admin/vouchers`): Portal admin lengkap dengan grafik Recharts, CRUD produk, kelola stok, dan ubah status transaksi.
  19. `Halaman 404` (`*`): Tampilan 404 bertema elektronik dengan tombol navigasi utama.

### 2. Fitur Spesial Elektronik
* **Bandingkan Spesifikasi (Product Comparison)**: Matriks tabel perbandingan hingga 4 produk elektronik secara berdampingan.
* **Sistem Voucher Diskon**: Validasi minimal transaksi dan potongan harga langsung (contoh: `ELECTRO100`).
* **Sistem Notifikasi Toast**: Umpan balik langsung ketika menambah barang, menghapus wishlist, atau menerapkan voucher.
* **Persistensi State LocalStorage**: Semua perubahan data cart, order baru, produk hasil CRUD admin tetap tersimpan saat browser di-refresh!

---

## 📁 Struktur Folder Proyek

```
web elektronik/
├── server/                      # Backend Express & Database Schema
│   ├── db/
│   │   └── schema.sql          # Skema Tabel Relasional Database (PostgreSQL / MySQL)
│   └── index.js                 # Express REST API Server
├── src/
│   ├── components/
│   │   └── common/             # Component UI (Header, Footer, ProductCard, Toast, CompareModal, Breadcrumbs)
│   ├── context/
│   │   └── AppContext.tsx       # State Management & Storage Layer
│   ├── data/
│   │   └── mockData.ts          # Dataset Demo 14+ Produk Elektronik Lengkap
│   ├── pages/
│   │   ├── admin/              # Dashboard Admin, Products CRUD, Orders Manager, Vouchers Manager
│   │   ├── HomePage.tsx
│   │   ├── ProductsPage.tsx
│   │   ├── ProductDetailPage.tsx
│   │   ├── CategoriesPage.tsx
│   │   ├── SearchPage.tsx
│   │   ├── CartPage.tsx
│   │   ├── CheckoutPage.tsx
│   │   ├── OrderSuccessPage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   ├── ProfilePage.tsx
│   │   ├── OrdersPage.tsx
│   │   ├── WishlistPage.tsx
│   │   ├── TrackOrderPage.tsx
│   │   ├── PromosPage.tsx
│   │   ├── AboutPage.tsx
│   │   ├── ContactPage.tsx
│   │   ├── PoliciesPage.tsx
│   │   └── NotFoundPage.tsx
│   ├── types/
│   │   └── index.ts             # Definisi TypeScript Interfaces
│   ├── utils/
│   │   └── formatters.ts        # Helper Format Rupiah (Rp), Tanggal ID, & Badge Status
│   ├── App.tsx                  # React Router Config
│   ├── main.tsx
│   └── index.css                # Tailwind CSS Directives
├── .env.example                 # Template Variabel Lingkungan
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── README.md
```

---

## 🛠️ Petunjuk Instalasi dan Menjalankan Proyek

### 1. Menjalankan Frontend Web Application (Vite React)

1. Buka terminal di direktori utama `web elektronik`.
2. Jalankan perintah instalasi paket:
   ```bash
   npm install
   ```
3. Jalankan server pengembang aplikasi:
   ```bash
   npm run dev
   ```
4. Buka alamat `http://localhost:5173` di browser Anda.

### 2. Pengujian Hak Akses Demo (Customer vs Admin)

Anda dapat dengan mudah berpindah antara mode pelanggan biasa dan Admin Store:
* **Mode Pelanggan Default**: Email `rian@gmail.com`
* **Mode Admin Store**: Buka halaman `/login`, lalu tekan tombol **"Mode Admin Store"** (Email `admin@electrohub.id`), atau buka langsung URL `/admin`.

---

## 🗄️ Petunjuk Konfigurasi Database (Jika Menggunakan Server Production)

1. Buat database di PostgreSQL atau MySQL dengan nama `electrohub_db`.
2. Import skema tabel relasional dari file SQL:
   ```bash
   psql -U postgres -d electrohub_db -f server/db/schema.sql
   ```
3. Jalankan server Express Backend:
   ```bash
   node server/index.js
   ```

---

## 📌 Daftar Integrasi Eksternal

* **Payment Gateway Production (Midtrans / Xendit)**: Memerlukan `MIDTRANS_SERVER_KEY` & `MIDTRANS_CLIENT_KEY` asli di `.env`. Untuk demo aplikasi saat ini, transaksi disimulasikan menggunakan alur validasi checkout aman.
