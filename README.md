# GasKeep - Aplikasi Penitipan Kendaraan

Aplikasi web untuk layanan penitipan dan perawatan kendaraan dengan sistem login Google OAuth.

## Fitur

- ✅ Landing page dengan navigasi smooth scroll
- ✅ Login menggunakan Google OAuth
- ✅ Dashboard user setelah login
- ✅ Responsive design
- ✅ Sistem autentikasi yang aman

## Setup Google OAuth

### 1. Buat Project di Google Cloud Console

1. Kunjungi [Google Cloud Console](https://console.cloud.google.com/)
2. Buat project baru atau pilih project yang sudah ada
3. Aktifkan Google+ API dan Google Identity API

### 2. Buat OAuth 2.0 Credentials

1. Buka menu "APIs & Services" > "Credentials"
2. Klik "Create Credentials" > "OAuth 2.0 Client IDs"
3. Pilih "Web application"
4. Isi form dengan detail berikut:
   - **Name**: GasKeep Web App
   - **Authorized JavaScript origins**: 
     - `http://localhost:3000` (untuk development)
     - `https://yourdomain.com` (untuk production)
   - **Authorized redirect URIs**:
     - `http://localhost:3000/login` (untuk development)
     - `https://yourdomain.com/login` (untuk production)

### 3. Setup Environment Variables

Buat file `.env.local` di root project dengan isi:

```env
# Google OAuth Configuration
NEXT_PUBLIC_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID_HERE
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET_HERE
```

**Catatan**: 
- `NEXT_PUBLIC_GOOGLE_CLIENT_ID` harus diawali dengan `NEXT_PUBLIC_` agar bisa diakses di client-side
- `GOOGLE_CLIENT_SECRET` hanya untuk server-side (jika diperlukan)

## Instalasi dan Menjalankan

```bash
# Install dependencies
npm install

# Setup environment variables
# Buat file .env.local dan isi dengan credentials Google OAuth

# Jalankan development server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

## Struktur Aplikasi

```
Gaskeep/
├── app/
│   ├── component_landing/     # Komponen landing page
│   ├── login/                 # Halaman login
│   ├── dashboard/             # Halaman dashboard
│   └── page.tsx              # Halaman utama
├── public/
│   └── img/                  # Gambar dan logo
├── GOOGLE_OAUTH_SETUP.md     # Dokumentasi setup Google OAuth
└── README.md                 # File ini
```

## Cara Kerja Sistem

1. **User mengklik button "Daftar" atau "Daftar Sekarang"**
2. **User diarahkan ke halaman `/login`**
3. **Google OAuth button muncul**
4. **User mengklik Google button dan memilih akun**
5. **Google mengirimkan JWT token**
6. **Sistem decode token dan menyimpan data user**
7. **User diarahkan ke `/dashboard`**

## Data User yang Disimpan

Setelah login berhasil, sistem akan menyimpan data berikut di localStorage:

```javascript
{
    id: "user_google_id",
    email: "user@example.com",
    name: "User Name",
    picture: "https://profile_picture_url",
    given_name: "User",
    family_name: "Name",
    email_verified: true,
    loginTime: "2024-01-01T00:00:00.000Z"
}
```

## Troubleshooting

### Error: "Invalid Client ID"
- Pastikan Client ID sudah benar
- Pastikan domain sudah ditambahkan di Authorized JavaScript origins

### Error: "Redirect URI mismatch"
- Pastikan redirect URI sudah benar di Google Cloud Console
- Pastikan menggunakan protocol yang sama (http/https)

### Button Google tidak muncul
- Pastikan script Google OAuth sudah ter-load
- Cek console browser untuk error
- Pastikan Client ID sudah benar

## Keamanan

- Client Secret tidak boleh di-expose ke client-side
- Selalu gunakan HTTPS di production
- Validasi token di server-side jika diperlukan
- Implementasikan CSRF protection jika diperlukan

## Teknologi yang Digunakan

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Google OAuth 2.0** - Authentication
- **CSS Modules** - Styling
- **Tailwind CSS** - Utility-first CSS framework

## Lisensi

©2025 GasKeep - All Rights Reserved
