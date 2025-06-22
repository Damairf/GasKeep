# Troubleshooting Google OAuth Error

## Error: "Akses diblokir: Error Otorisasi"

Error ini terjadi karena masalah konfigurasi di Google Cloud Console. Berikut adalah langkah-langkah untuk mengatasinya:

### 1. Periksa Google Cloud Console Configuration

#### A. Pastikan API Sudah Diaktifkan
1. Buka [Google Cloud Console](https://console.cloud.google.com/)
2. Pilih project Anda
3. Buka menu "APIs & Services" > "Library"
4. Cari dan aktifkan API berikut:
   - **Google+ API** (jika masih ada)
   - **Google Identity API**
   - **Google OAuth2 API**

#### B. Periksa OAuth Consent Screen
1. Buka "APIs & Services" > "OAuth consent screen"
2. Pastikan status adalah "Published" atau "Testing"
3. Jika masih "Testing", tambahkan email Anda sebagai test user

#### C. Periksa OAuth 2.0 Credentials
1. Buka "APIs & Services" > "Credentials"
2. Klik pada OAuth 2.0 Client ID yang Anda buat
3. Periksa konfigurasi berikut:

**Authorized JavaScript origins:**
```
http://localhost:3000
https://localhost:3000
```

**Authorized redirect URIs:**
```
http://localhost:3000/login
https://localhost:3000/login
http://localhost:3000
https://localhost:3000
```

### 2. Periksa Environment Variables

Pastikan file `.env.local` berisi:
```env
NEXT_PUBLIC_GOOGLE_CLIENT_ID=648984769678-o6vjiqi2lds9o745j7cpep6aapaifcd9.apps.googleusercontent.com
```

### 3. Restart Development Server

```bash
# Stop server (Ctrl+C)
# Kemudian jalankan ulang
npm run dev
```

### 4. Clear Browser Cache

1. Buka Developer Tools (F12)
2. Klik kanan pada tombol refresh
3. Pilih "Empty Cache and Hard Reload"
4. Atau gunakan Ctrl+Shift+R

### 5. Periksa Console Browser

1. Buka Developer Tools (F12)
2. Buka tab "Console"
3. Lihat apakah ada error yang muncul
4. Error yang mungkin muncul:
   - "Invalid Client ID"
   - "Redirect URI mismatch"
   - "Origin not allowed"

### 6. Periksa Network Tab

1. Buka Developer Tools (F12)
2. Buka tab "Network"
3. Coba login dengan Google
4. Lihat request yang gagal dan error message-nya

### 7. Solusi Umum

#### A. Jika Error "Invalid Client ID"
- Pastikan Client ID sudah benar (tanpa http:// di depan)
- Pastikan tidak ada spasi atau karakter tambahan
- Restart development server

#### B. Jika Error "Redirect URI mismatch"
- Tambahkan semua URI yang mungkin digunakan
- Pastikan protocol sama (http vs https)
- Pastikan port number benar

#### C. Jika Error "Origin not allowed"
- Tambahkan `http://localhost:3000` di Authorized JavaScript origins
- Pastikan tidak ada trailing slash

### 8. Testing Checklist

- [ ] API sudah diaktifkan
- [ ] OAuth consent screen sudah dikonfigurasi
- [ ] Credentials sudah benar
- [ ] Environment variables sudah diset
- [ ] Server sudah di-restart
- [ ] Browser cache sudah di-clear
- [ ] Tidak ada error di console

### 9. Alternative Solution

Jika masih error, coba gunakan konfigurasi minimal:

```javascript
window.google.accounts.id.initialize({
    client_id: '648984769678-o6vjiqi2lds9o745j7cpep6aapaifcd9.apps.googleusercontent.com',
    callback: handleCredentialResponse,
});
```

### 10. Debug Mode

Tambahkan console.log untuk debugging:

```javascript
console.log('Client ID:', GOOGLE_CLIENT_ID);
console.log('Google object:', window.google);
```

### 11. Contact Support

Jika semua langkah di atas sudah dilakukan tapi masih error:
1. Screenshot error message
2. Screenshot console browser
3. Screenshot Google Cloud Console configuration
4. Kirim ke support atau buat issue di repository

## Common Error Messages

| Error Message | Solution |
|---------------|----------|
| "Invalid Client ID" | Periksa Client ID di .env.local |
| "Redirect URI mismatch" | Tambahkan URI di Google Cloud Console |
| "Origin not allowed" | Tambahkan origin di Authorized JavaScript origins |
| "Access blocked" | Periksa OAuth consent screen dan API activation |
| "Request blocked" | Periksa credentials dan restart server | 