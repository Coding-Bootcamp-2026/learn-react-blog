# Modul Belajar React.js Dasar: Membangun Aplikasi Blog dengan RESTful API Laravel

Modul ini memandu peserta membangun aplikasi **React Blog** dari nol. Aplikasi ini memakai RESTful API dari projek Laravel ini (`learn-laravel`) yang berjalan di `http://localhost:8000`.

| Item | Keterangan |
| --- | --- |
| **Target peserta** | Sudah paham dasar HTML, CSS, JavaScript (ES6), dan pernah membuat API di Laravel |
| **Hasil akhir** | Aplikasi blog: daftar post, detail post, register, login, logout, tulis/edit/hapus post |
| **Teknologi** | React 19, Vite 8, React Router 8, Tailwind CSS 4, Fetch API |
| **Backend** | Laravel 13 + Sanctum (projek ini), port `8000` |
| **Frontend** | React (Vite dev server), port `5173` |

---

## Daftar Isi

- [Saran Pembagian Pertemuan](#saran-pembagian-pertemuan)
- [Bagian 0 — Gambaran Besar](#bagian-0--gambaran-besar)
- [Bagian 1 — Persiapan Backend Laravel](#bagian-1--persiapan-backend-laravel)
  - [Langkah 1 — Pastikan Server Laravel Berjalan](#langkah-1--pastikan-server-laravel-berjalan)
  - [Langkah 2 — Cek Endpoint Detail Post](#langkah-2--cek-endpoint-detail-post)
  - [Langkah 3 — Perbaiki Pesan Validasi](#langkah-3--perbaiki-pesan-validasi)
  - [Langkah 4 — Uji API & Pahami CORS](#langkah-4--uji-api--pahami-cors)
- [Bagian 2 — Instalasi & Setup React](#bagian-2--instalasi--setup-react)
  - [Langkah 5 — Instal Node.js](#langkah-5--instal-nodejs)
  - [Langkah 6 — Membuat Projek React dengan Vite](#langkah-6--membuat-projek-react-dengan-vite)
  - [Langkah 7 — Mengenal Struktur Folder](#langkah-7--mengenal-struktur-folder)
  - [Langkah 8 — Membersihkan Template](#langkah-8--membersihkan-template)
- [Bagian 3 — Dasar-Dasar React (Pemanasan)](#bagian-3--dasar-dasar-react-pemanasan)
  - [Langkah 9 — JSX & Komponen Pertama](#langkah-9--jsx--komponen-pertama)
  - [Langkah 10 — Props](#langkah-10--props)
  - [Langkah 11 — State & Event](#langkah-11--state--event)
  - [Langkah 12 — Form, List, dan Conditional Rendering](#langkah-12--form-list-dan-conditional-rendering)
- [Bagian 4 — Membangun Projek: Menampilkan Data](#bagian-4--membangun-projek-menampilkan-data)
  - [Langkah 13 — Install React Router & Susun Folder](#langkah-13--install-react-router--susun-folder)
  - [Langkah 14 — Environment Variable](#langkah-14--environment-variable)
  - [Langkah 15 — Membuat Helper API](#langkah-15--membuat-helper-api)
  - [Langkah 16 — Setup Tailwind CSS](#langkah-16--setup-tailwind-css)
  - [Langkah 17 — Setup Routing & Navbar](#langkah-17--setup-routing--navbar)
  - [Langkah 18 — Menampilkan Daftar Post (useEffect)](#langkah-18--menampilkan-daftar-post-useeffect)
  - [Langkah 19 — Halaman Detail Post (useParams)](#langkah-19--halaman-detail-post-useparams)
- [Bagian 5 — Autentikasi](#bagian-5--autentikasi)
  - [Langkah 20 — Membuat AuthContext](#langkah-20--membuat-authcontext)
  - [Langkah 21 — Navbar yang Sadar Login](#langkah-21--navbar-yang-sadar-login)
  - [Langkah 22 — Halaman Register](#langkah-22--halaman-register)
  - [Langkah 23 — Halaman Login](#langkah-23--halaman-login)
- [Bagian 6 — CRUD Post (Wajib Login)](#bagian-6--crud-post-wajib-login)
  - [Langkah 24 — Protected Route](#langkah-24--protected-route)
  - [Langkah 25 — Komponen Form yang Bisa Dipakai Ulang](#langkah-25--komponen-form-yang-bisa-dipakai-ulang)
  - [Langkah 26 — Membuat Post Baru](#langkah-26--membuat-post-baru)
  - [Langkah 27 — Tombol Edit & Hapus di Halaman Detail](#langkah-27--tombol-edit--hapus-di-halaman-detail)
  - [Langkah 28 — Halaman Edit Post](#langkah-28--halaman-edit-post)
  - [Langkah 29 — Kode Akhir `App.jsx` & Struktur Folder](#langkah-29--kode-akhir-appjsx--struktur-folder)
- [Bagian 7 — Penutup](#bagian-7--penutup)
  - [Skenario Pengujian](#skenario-pengujian)
  - [Troubleshooting](#troubleshooting)
  - [Lampiran: Saran Perbaikan Backend (Opsional)](#lampiran-saran-perbaikan-backend-opsional)
  - [Latihan Mandiri](#latihan-mandiri)
  - [Rangkuman Konsep](#rangkuman-konsep)
  - [Referensi](#referensi)

---

## Saran Pembagian Pertemuan

| Pertemuan | Materi | Output |
| --- | --- | --- |
| 1 | Bagian 0 – 3: gambaran besar, persiapan backend, instalasi, dasar React | Peserta paham JSX, komponen, props, state |
| 2 | Bagian 4: routing, fetch API, useEffect | Daftar & detail post tampil dari API Laravel |
| 3 | Bagian 5: Context, form, register, login, logout | Peserta bisa login dan token tersimpan |
| 4 | Bagian 6 – 7: protected route, create/edit/delete, pengujian | Aplikasi blog lengkap |

---

## Bagian 0 — Gambaran Besar

### Apa yang akan kita bangun?

Aplikasi **React Blog** dengan fitur:

1. Melihat daftar post (tanpa login)
2. Melihat detail post (tanpa login)
3. Register akun baru
4. Login & logout
5. Menulis post baru (wajib login)
6. Mengedit & menghapus post **milik sendiri** (wajib login + pemilik post)

### Arsitektur aplikasi

```
┌──────────────────────────┐        HTTP Request (JSON)        ┌──────────────────────────┐
│   Frontend: React        │ ────────────────────────────────▶ │   Backend: Laravel API   │
│   http://localhost:5173  │                                   │   http://localhost:8000  │
│                          │ ◀──────────────────────────────── │                          │
│  - Menampilkan UI        │        HTTP Response (JSON)       │  - Validasi data         │
│  - Menyimpan token       │                                   │  - Autentikasi (Sanctum) │
└──────────────────────────┘                                   │  - Policy (hak akses)    │
                                                               └────────────┬─────────────┘
                                                                            │
                                                                            ▼
                                                                    ┌───────────────┐
                                                                    │  Database     │
                                                                    │  MySQL        │
                                                                    └───────────────┘
```

**Penjelasan untuk peserta:**

- Selama ini di Laravel kita memakai **Blade**: server membuat HTML lengkap lalu mengirimnya ke browser. Setiap pindah halaman, browser me-reload seluruh halaman.
- Dengan **React**, pembagian kerjanya berubah:
  - **Laravel** hanya mengurus data dan mengirim **JSON** (tidak ada HTML).
  - **React** berjalan di browser, meminta data ke Laravel, lalu **menyusun tampilan sendiri**.
- Model seperti ini disebut **SPA (Single Page Application)**: halaman tidak di-reload penuh, hanya bagian yang berubah saja yang diperbarui. Hasilnya terasa lebih cepat, mirip aplikasi mobile.
- Karena frontend dan backend terpisah, satu API Laravel yang sama bisa dipakai oleh React, aplikasi mobile, dan aplikasi lain.

### Daftar Endpoint API yang Tersedia

Endpoint diambil dari `routes/api.php`. Semua URL diawali `http://localhost:8000/api`.

| Method | Endpoint | Butuh Token? | Keterangan |
| --- | --- | --- | --- |
| `POST` | `/register` | Tidak | Daftar akun baru (`name`, `email`, `password`, `password_confirmation`) |
| `POST` | `/login` | Tidak | Login (`email`, `password`), mengembalikan token |
| `POST` | `/logout` | **Ya** | Logout, menghapus semua token milik user |
| `GET` | `/user` | **Ya** | Data user yang sedang login |
| `GET` | `/posts` | Tidak | Daftar semua post |
| `GET` | `/posts/{id}` | Tidak | Detail satu post |
| `POST` | `/posts` | **Ya** | Membuat post (`title`, `body`) |
| `PUT` | `/posts/{id}` | **Ya** | Mengubah post (hanya pemilik post) |
| `DELETE` | `/posts/{id}` | **Ya** | Menghapus post (hanya pemilik post) |

### Contoh Respons API

Pahami bentuk JSON-nya dulu, karena React akan "membaca" data ini.

**`GET /api/posts`** — mengembalikan **array** post:

```json
[
  {
    "id": 7,
    "title": "Post 300",
    "body": "Ini adalah isi dari Post 300",
    "created_at": "2026-10-13T10:38:14.000000Z",
    "updated_at": "2026-10-13T10:38:14.000000Z",
    "user_id": 1
  }
]
```

**`GET /api/posts/{id}`** — data post ada di dalam key `data`:

```json
{
  "status": "OK",
  "message": "Detail Post: Post 300",
  "data": {
    "id": 7,
    "title": "Post 300",
    "body": "Ini adalah isi dari Post 300",
    "created_at": "2026-10-13T10:38:14.000000Z",
    "updated_at": "2026-10-13T10:38:14.000000Z",
    "user_id": 1
  }
}
```

> Perhatikan perbedaannya: `GET /api/posts` langsung mengembalikan **array**, sedangkan `GET /api/posts/{id}` membungkus post di dalam key **`data`**. Di React, data post dibaca dengan `data.data`.

**`POST /api/login`** (berhasil):

```json
{
  "status": "OK",
  "message": "Login User Successfully!",
  "user": { "id": 1, "name": "Budi", "email": "budi@mail.com", "role": "user" },
  "token": "3|kZq8x...token-acak..."
}
```

**`POST /api/register`** (berhasil) — formatnya sama dengan login:

```json
{
  "status": "OK",
  "message": "Register User Successfully!",
  "user": { "id": 2, "name": "Siti", "email": "siti@mail.com" },
  "token": "4|pW2rT...token-acak..."
}
```

**Login gagal (password salah)** — status `401`:

```json
{
  "message": "The provided credentials are incorrect.",
  "errors": {
    "email": ["The provided credentials are incorrect."]
  }
}
```

**`POST /api/posts`** (berhasil) — data post ada di dalam key `data`:

```json
{
  "status": "OK",
  "message": "Post Created Successfully!",
  "data": { "id": 9, "title": "Judul", "body": "Isi", "user_id": 1, "created_at": "...", "updated_at": "..." }
}
```

**Gagal validasi** — status `422`:

```json
{
  "message": "The email field is required. (and 1 more error)",
  "errors": {
    "email": ["The email field is required."],
    "password": ["The password field is required."]
  }
}
```

**Belum login / token salah** — status `401`:

```json
{ "message": "Unauthenticated." }
```

**Bukan pemilik post** — status `403` (dari `PostPolicy`):

```json
{ "message": "You do not own this post" }
```

### Status Code yang Perlu Dikenal

| Status | Arti | Kapan muncul di projek ini |
| --- | --- | --- |
| `200` | OK | Request berhasil |
| `401` | Unauthorized | Token tidak dikirim / tidak valid, atau password salah saat login |
| `403` | Forbidden | Sudah login, tapi tidak berhak (bukan pemilik post) |
| `404` | Not Found | Post dengan id tersebut tidak ada |
| `422` | Unprocessable Content | Data tidak lolos validasi |
| `500` | Server Error | Ada error di kode Laravel |

---

## Bagian 1 — Persiapan Backend Laravel

### Langkah 1 — Pastikan Server Laravel Berjalan

**Tujuan:** API Laravel siap menerima request dari React.

Di folder projek Laravel, jalankan:

```bash
php artisan serve
```

Server akan berjalan di `http://localhost:8000`. **Biarkan terminal ini tetap terbuka** selama kita mengerjakan React.

**Penjelasan:**

- Nanti kita akan menjalankan **dua server sekaligus**: Laravel (port `8000`) dan React (port `5173`). Gunakan dua terminal terpisah.
- Pastikan database sudah di-migrate (`php artisan migrate`), karena tabel `posts` dan `personal_access_tokens` (untuk Sanctum) dibutuhkan.

### Langkah 2 — Cek Endpoint Detail Post

**Tujuan:** Memastikan endpoint `GET /api/posts/{id}` mengembalikan data post, karena halaman detail dan edit di React membutuhkannya.

Pastikan method `show()` di `app/Http/Controllers/PostController.php` sudah berisi:

```php
/**
 * Display the specified resource.
 */
public function show(Post $post)
{
    return response()->json([
        'status' => 'OK',
        'message' => 'Detail Post: ' . $post->title,
        'data' => $post,
    ]);
}
```

Cek di browser: buka `http://localhost:8000/api/posts/{id}` (ganti `{id}` dengan id post yang ada). Harus muncul JSON dengan key `status`, `message`, dan `data`.

**Penjelasan:**

- `Post $post` adalah **Route Model Binding**: Laravel otomatis mencari post berdasarkan `{post}` di URL. Jika tidak ditemukan, Laravel otomatis mengembalikan `404`.
- Formatnya dibuat sama dengan `store()`, `update()`, dan `destroy()`: ada `status`, `message`, dan data utamanya di key `data`. Format yang konsisten memudahkan frontend membaca respons.
- Jika method ini kosong, API mengembalikan respons kosong dan React akan error `Unexpected end of JSON input` saat membaca JSON-nya.

### Langkah 3 — Perbaiki Pesan Validasi

**Tujuan:** Pesan error validasi tampil sebagai kalimat yang bisa dibaca, bukan kode seperti `validation.required`.

Projek ini memakai `APP_LOCALE=id`, tetapi belum ada file terjemahan `lang/id/validation.php`. Akibatnya API mengembalikan pesan seperti:

```json
{ "errors": { "email": ["validation.required"] } }
```

Solusi paling cepat, ubah di file `.env`:

```env
APP_FALLBACK_LOCALE=en
```

Lalu jalankan:

```bash
php artisan config:clear
```

dan restart `php artisan serve`.

**Penjelasan:**

- Jika terjemahan bahasa Indonesia tidak ditemukan, Laravel akan memakai bahasa cadangan (*fallback*), yaitu bahasa Inggris yang sudah disediakan framework. Pesan akan menjadi `"The email field is required."`.
- Jika ingin pesan berbahasa Indonesia, jalankan `php artisan lang:publish`, salin `lang/en/validation.php` ke `lang/id/validation.php`, lalu terjemahkan isinya.

### Langkah 4 — Uji API & Pahami CORS

**Tujuan:** Memastikan API bisa diakses sebelum menulis kode React.

1. Buka `http://localhost:8000/api/posts` di browser. Harus muncul array JSON.
2. (Opsional) Uji endpoint `POST` dengan Postman / Thunder Client / Insomnia. Jangan lupa header:
   ```
   Accept: application/json
   Content-Type: application/json
   ```

**Tentang CORS (penting untuk dijelaskan):**

- React berjalan di `http://localhost:5173`, sedangkan API di `http://localhost:8000`. Karena **port-nya berbeda**, browser menganggapnya **origin yang berbeda**.
- Demi keamanan, browser memblokir request lintas origin, **kecuali** server mengizinkannya lewat header `Access-Control-Allow-Origin`. Mekanisme ini disebut **CORS (Cross-Origin Resource Sharing)**.
- Kabar baiknya, Laravel sudah menyertakan middleware CORS secara default untuk route `api/*`. API projek ini sudah mengirim header:
  ```
  Access-Control-Allow-Origin: *
  ```
  Artinya semua origin diizinkan, jadi **tidak perlu konfigurasi tambahan**.
- Jika suatu saat perlu membatasi origin (misalnya saat production), jalankan `php artisan config:publish cors` lalu atur `allowed_origins` di `config/cors.php`.

> 💡 **Tips mengajar:** Tunjukkan ke peserta bahwa membuka URL API langsung di browser selalu berhasil, tapi request dari kode JavaScript di origin lain bisa diblokir. CORS adalah aturan **browser**, bukan aturan server.

---

## Bagian 2 — Instalasi & Setup React

### Langkah 5 — Instal Node.js

**Tujuan:** Menyiapkan Node.js dan npm, alat wajib untuk membuat projek React.

1. Download Node.js versi **LTS** dari [https://nodejs.org](https://nodejs.org). Vite 8 membutuhkan Node.js **20.19+** atau **22.12+**.
2. Setelah terinstal, cek di terminal:

```bash
node -v
npm -v
```

**Penjelasan:**

- **Node.js** adalah runtime untuk menjalankan JavaScript di luar browser. Di sini Node.js dipakai untuk menjalankan *tools* development (Vite), bukan untuk aplikasi kita.
- **npm** (Node Package Manager) adalah pengelola package, sama seperti **Composer** di PHP.

| PHP / Laravel | JavaScript / React |
| --- | --- |
| `composer` | `npm` |
| `composer.json` | `package.json` |
| `vendor/` | `node_modules/` |
| `composer install` | `npm install` |
| `php artisan serve` | `npm run dev` |

### Langkah 6 — Membuat Projek React dengan Vite

**Tujuan:** Membuat kerangka projek React.

Buat projek React **di luar** folder Laravel (misalnya sejajar dengan folder `learn-laravel`):

```bash
cd D:\Project
npm create vite@latest react-blog -- --template react
```

Jika muncul pertanyaan *"Install with npm and start now?"*, pilih **No** agar kita bisa menjalankannya sendiri. Lalu:

```bash
cd react-blog
npm install
npm run dev
```

Buka `http://localhost:5173` di browser. Jika muncul halaman sambutan Vite + React, instalasi berhasil.

**Penjelasan:**

- **Vite** adalah *build tool* yang sangat cepat untuk development. Vite menyediakan dev server dengan **HMR (Hot Module Replacement)**: setiap kali file disimpan, browser langsung ter-update tanpa refresh.
- `--template react` artinya kita memakai template React dengan **JavaScript** (bukan TypeScript), supaya fokus ke konsep React dulu.
- Projek React dibuat terpisah dari Laravel karena keduanya adalah **aplikasi yang berbeda** dan berkomunikasi lewat API.
- Untuk menghentikan dev server, tekan `Ctrl + C` di terminal.

### Langkah 7 — Mengenal Struktur Folder

```
react-blog/
├── node_modules/       ← package yang terinstal (jangan diedit, jangan di-commit)
├── public/             ← file statis (favicon, dll), diakses langsung lewat URL
├── src/                ← SEMUA kode React kita ada di sini
│   ├── assets/         ← gambar/ikon yang di-import dari kode
│   ├── App.css
│   ├── App.jsx         ← komponen utama aplikasi
│   ├── index.css       ← CSS global
│   └── main.jsx        ← titik masuk (entry point) aplikasi
├── .gitignore
├── index.html          ← satu-satunya file HTML
├── package.json        ← daftar package & script
└── vite.config.js      ← konfigurasi Vite
```

**Penjelasan alur kerja React:**

1. Browser membuka `index.html`. Di dalamnya hanya ada `<div id="root"></div>` yang kosong.
2. `index.html` memuat `src/main.jsx`.
3. `main.jsx` "menempelkan" komponen `<App />` ke dalam `<div id="root">`:
   ```jsx
   createRoot(document.getElementById('root')).render(<App />);
   ```
4. Seluruh tampilan aplikasi dibangun oleh React di dalam `div#root` tersebut.

> File berekstensi **`.jsx`** adalah file JavaScript yang berisi **JSX** (sintaks mirip HTML di dalam JavaScript).

### Langkah 8 — Membersihkan Template

**Tujuan:** Mulai dari kanvas kosong.

1. Hapus file `src/App.css` dan seluruh isi folder `src/assets/`.
2. Kosongkan isi file `src/index.css` (nanti akan kita isi di Langkah 16).
3. Ganti isi `src/App.jsx` menjadi:

```jsx
export default function App() {
  return <h1>Halo React!</h1>;
}
```

Simpan, lalu lihat browser. Tulisan **Halo React!** akan muncul.

---

## Bagian 3 — Dasar-Dasar React (Pemanasan)

Sebelum masuk ke projek, kita latih dulu konsep inti React. Kode di bagian ini hanya untuk latihan dan akan diganti di Bagian 4.

> ⚠️ **Aturan praktik Bagian 3:** semua latihan di Langkah 9–12 ditulis di **satu file saja, yaitu `src/App.jsx`**. Setiap blok kode adalah **isi file yang lengkap**, jadi di setiap langkah **hapus seluruh isi `App.jsx` lalu ganti** dengan kode yang baru. Jangan menambahkannya di bawah kode lama, karena akan muncul error akibat ada dua `export default` dan import yang dobel.

### Langkah 9 — JSX & Komponen Pertama

**Tujuan:** Memahami JSX dan cara membuat komponen.

📄 **File:** `src/App.jsx` → **hapus seluruh isinya**, lalu ganti dengan kode berikut:

```jsx
function Greeting() {
  return <h2>Selamat datang di bootcamp!</h2>;
}

export default function App() {
  const nama = 'Budi';

  return (
    <div>
      <h1>Belajar React</h1>
      <p>Halo, nama saya {nama.toUpperCase()}.</p>
      <p>Hasil 5 x 4 = {5 * 4}</p>
      <Greeting />
      <Greeting />
    </div>
  );
}
```

**Penjelasan:**

- **Komponen** adalah **fungsi JavaScript yang mengembalikan tampilan (JSX)**. Komponen ibarat "potongan UI" yang bisa dipakai berulang kali, seperti `<Greeting />` yang dipanggil dua kali.
- Nama komponen **wajib diawali huruf kapital** (`Greeting`, bukan `greeting`), agar React bisa membedakannya dengan tag HTML biasa.
- **JSX** terlihat seperti HTML, tapi sebenarnya JavaScript. Aturan penting JSX:
  - Gunakan `{ }` untuk menyisipkan ekspresi JavaScript: `{nama}`, `{5 * 4}`. Mirip `{{ $nama }}` di Blade.
  - Harus ada **satu elemen pembungkus** (di sini `<div>`). Jika tidak ingin menambah elemen, gunakan **Fragment** `<> ... </>`.
  - Atribut `class` ditulis `className`, dan `for` ditulis `htmlFor`.
  - Semua tag wajib ditutup, termasuk `<img />`, `<input />`, `<br />`.
- `export default` membuat komponen bisa di-import dari file lain.

### Langkah 10 — Props

**Tujuan:** Mengirim data dari komponen induk ke komponen anak.

📄 **File:** `src/App.jsx` → **hapus seluruh isinya**, lalu ganti dengan kode berikut:

```jsx
function Greeting({ name, role }) {
  return (
    <p>
      Halo <strong>{name}</strong>, kamu adalah {role}.
    </p>
  );
}

export default function App() {
  return (
    <div>
      <h1>Belajar React</h1>
      <Greeting name="Andi" role="Mentor" />
      <Greeting name="Siti" role="Peserta" />
    </div>
  );
}
```

**Penjelasan:**

- **Props** (properties) adalah "parameter" untuk komponen, dikirim seperti atribut HTML: `name="Andi"`.
- Di komponen penerima, props diterima sebagai objek. Kita memakai *destructuring* `{ name, role }` agar lebih ringkas.
- Props bersifat **read-only**: komponen anak tidak boleh mengubah props yang diterimanya.
- Analogi Laravel: mirip Blade Component `<x-greeting name="Andi" role="Mentor" />`.

### Langkah 11 — State & Event

**Tujuan:** Membuat tampilan yang berubah ketika user berinteraksi.

📄 **File:** `src/App.jsx` → **hapus seluruh isinya**, lalu ganti dengan kode berikut:

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Nilai sekarang: {count}</p>
      <button onClick={() => setCount(count + 1)}>Tambah</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

export default function App() {
  return (
    <div>
      <h1>Belajar React</h1>
      <Counter />
    </div>
  );
}
```

**Penjelasan:**

- **State** adalah data milik komponen yang **bisa berubah**. Setiap kali state berubah, React otomatis **me-render ulang** komponen sehingga tampilan ikut ter-update.
- `useState(0)` mengembalikan dua hal:
  - `count` → nilai state saat ini (awalnya `0`)
  - `setCount` → fungsi untuk mengubah nilai state
- **Kenapa tidak pakai `let count = 0` saja?** Karena mengubah variabel biasa **tidak** membuat React me-render ulang. Tampilan tidak akan berubah.
- **Event** ditulis dengan camelCase: `onClick`, `onChange`, `onSubmit`. Nilainya adalah **fungsi**, bukan string.
  - ✅ `onClick={() => setCount(count + 1)}`
  - ❌ `onClick={setCount(count + 1)}` → fungsi langsung dijalankan saat render dan menyebabkan error *infinite loop*.
- Fungsi yang diawali `use` (seperti `useState`) disebut **Hook**. Hook hanya boleh dipanggil di bagian atas komponen, tidak boleh di dalam `if` atau perulangan.

### Langkah 12 — Form, List, dan Conditional Rendering

**Tujuan:** Mempelajari tiga pola yang paling sering dipakai di projek: input form, menampilkan list, dan menampilkan sesuatu berdasarkan kondisi.

📄 **File:** `src/App.jsx` → **hapus seluruh isinya**, lalu ganti dengan kode berikut:

```jsx
import { useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState(['Belajar JSX', 'Belajar Props']);
  const [input, setInput] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (input.trim() === '') return;

    setTodos([...todos, input]);
    setInput('');
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Tulis tugas baru..."
        />
        <button type="submit">Tambah</button>
      </form>

      {todos.length === 0 ? (
        <p>Belum ada tugas.</p>
      ) : (
        <ul>
          {todos.map((todo, index) => (
            <li key={index}>{todo}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function App() {
  return (
    <div>
      <h1>Belajar React</h1>
      <TodoList />
    </div>
  );
}
```

**Penjelasan:**

- **Controlled input:** nilai `<input>` dikendalikan oleh state (`value={input}`), dan setiap ketikan memperbarui state lewat `onChange`. Dengan begitu, state selalu berisi apa yang diketik user. Pola ini akan kita pakai di semua form (login, register, post).
- `e.preventDefault()` mencegah perilaku default form, yaitu **me-reload halaman**. Di SPA kita tidak mau halaman ter-reload.
- `setTodos([...todos, input])` membuat **array baru** (berisi item lama + item baru). Di React, state **tidak boleh diubah langsung** (misalnya `todos.push(input)`), melainkan harus diganti dengan nilai baru. Ini disebut prinsip **immutability**.
- **Render list** memakai `.map()`, mirip `@foreach` di Blade. Setiap item **wajib** punya prop `key` yang unik agar React tahu item mana yang berubah. Di sini kita memakai `index` karena datanya sederhana; untuk data dari database, **gunakan `id`**.
- **Conditional rendering** memakai operator ternary `kondisi ? A : B`, mirip `@if ... @else` di Blade. Untuk kondisi tanpa `else`, bisa memakai `kondisi && <Komponen />`.

> 🧪 **Latihan singkat:** tambahkan tombol "Hapus" di setiap item todo. Petunjuk: gunakan `todos.filter((_, i) => i !== index)`.

> 💡 **Ingin semua contoh Bagian 3 tampil bersamaan?** Gabungkan komponen dari Langkah 10–12 dalam satu `App.jsx`. Tulis `import { useState } from 'react';` **cukup sekali** di baris paling atas, lalu panggil semua komponennya di dalam `App`:
>
> ```jsx
> import { useState } from 'react'; // cukup sekali di paling atas
>
> function Greeting({ name, role }) { /* ...kode dari Langkah 10... */ }
> function Counter() { /* ...kode dari Langkah 11... */ }
> function TodoList() { /* ...kode dari Langkah 12... */ }
>
> export default function App() {
>   return (
>     <div>
>       <h1>Belajar React</h1>
>       <Greeting name="Andi" role="Mentor" />
>       <Counter />
>       <TodoList />
>     </div>
>   );
> }
> ```

---

## Bagian 4 — Membangun Projek: Menampilkan Data

Mulai bagian ini kita membangun aplikasi **React Blog** yang sesungguhnya.

### Langkah 13 — Install React Router & Susun Folder

**Tujuan:** Menyiapkan library routing dan struktur folder projek.

Hentikan dev server (`Ctrl + C`), lalu install React Router:

```bash
npm install react-router
```

Buat folder-folder berikut di dalam `src/`:

```
src/
├── components/   ← komponen kecil yang dipakai ulang (Navbar, PostCard, dll)
├── context/      ← state global (data login)
└── pages/        ← komponen yang mewakili satu halaman
```

**Penjelasan:**

- React sendiri **tidak punya fitur routing** (perpindahan halaman berdasarkan URL). Karena itu kita memakai library **React Router**.
- Pemisahan `components/` dan `pages/` bukan aturan wajib React, tapi konvensi agar projek rapi. Nama file komponen memakai **PascalCase** (`HomePage.jsx`).

### Langkah 14 — Environment Variable

**Tujuan:** Menyimpan alamat API di satu tempat.

Buat file `.env` di **root** projek React (sejajar dengan `package.json`):

```env
VITE_API_URL=http://localhost:8000/api
```

**Penjelasan:**

- Sama seperti `.env` di Laravel, file ini menyimpan konfigurasi yang bisa berbeda di tiap lingkungan (development / production).
- Di Vite, variabel **wajib diawali `VITE_`** agar bisa dibaca dari kode lewat `import.meta.env.VITE_API_URL`.
- Setiap kali mengubah `.env`, **restart** `npm run dev`.

### Langkah 15 — Membuat Helper API

**Tujuan:** Membuat satu fungsi untuk semua request ke API, agar kode tidak berulang.

Buat file `src/api.js`:

```js
// Alamat API diambil dari file .env (VITE_API_URL)
const API_URL = import.meta.env.VITE_API_URL;

export async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem('token');

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  // Jika user sudah login, kirim token di header Authorization
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  // response.ok bernilai true jika status code 200-299
  if (!response.ok) {
    const error = new Error(data.message || 'Terjadi kesalahan pada server');
    error.status = response.status;
    error.errors = data.errors; // pesan error per field (misal status 422)
    throw error;
  }

  return data;
}
```

**Penjelasan:**

- **`fetch()`** adalah fungsi bawaan browser untuk melakukan HTTP request. Tidak perlu install apa pun.
- **`async` / `await`**: request ke server butuh waktu. `await` membuat kode "menunggu" sampai respons datang sebelum lanjut ke baris berikutnya. `await` hanya bisa dipakai di dalam fungsi `async`.
- **Header penting:**
  - `Accept: application/json` → meminta Laravel selalu membalas dengan JSON (termasuk saat error). Tanpa header ini, Laravel bisa mengembalikan halaman HTML atau redirect.
  - `Content-Type: application/json` → memberi tahu Laravel bahwa data yang kita kirim berformat JSON.
  - `Authorization: Bearer <token>` → cara mengirim token **Sanctum**. Middleware `auth:sanctum` di Laravel membaca header ini untuk mengenali siapa user-nya.
- **`localStorage`** adalah penyimpanan kecil di browser yang datanya tidak hilang walau halaman di-refresh. Kita menyimpan token di sini setelah login (Langkah 20).
- **`response.json()`** mengubah body respons menjadi objek JavaScript.
- **Penting:** `fetch` **tidak** menganggap status `401`, `403`, `404`, atau `422` sebagai error. Karena itu kita cek `response.ok` secara manual, lalu `throw` error agar bisa ditangkap dengan `try...catch` di komponen.
- Kita menempelkan `status` dan `errors` ke objek error supaya komponen bisa menampilkan pesan validasi per field.

**Cara pakai helper ini:**

```js
// GET
const posts = await apiFetch('/posts');

// POST dengan body JSON
const result = await apiFetch('/posts', {
  method: 'POST',
  body: JSON.stringify({ title: 'Judul', body: 'Isi' }),
});
```

`JSON.stringify()` mengubah objek JavaScript menjadi teks JSON sebelum dikirim.

### Langkah 16 — Setup Tailwind CSS

**Tujuan:** Memasang Tailwind CSS untuk mempercantik tampilan aplikasi.

**a. Install Tailwind CSS beserta plugin Vite-nya:**

```bash
npm install tailwindcss @tailwindcss/vite
```

**b. Daftarkan plugin di `vite.config.js`:**

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

**c. Isi file `src/index.css` dengan satu baris berikut:**

```css
@import 'tailwindcss';
```

**d. Tes:** jalankan `npm run dev`, lalu ubah sementara isi `src/App.jsx`:

```jsx
export default function App() {
  return (
    <h1 className="p-8 text-3xl font-bold text-blue-600 underline">
      Halo Tailwind!
    </h1>
  );
}
```

Jika tulisan tampil besar, tebal, biru, dan bergaris bawah, Tailwind sudah aktif. Isi `App.jsx` ini akan kita ganti di langkah berikutnya.

**Penjelasan:**

- **Tailwind CSS** adalah framework CSS ***utility-first***. Kita tidak menulis CSS di file terpisah, tetapi langsung menggabungkan class-class kecil di atribut `className`. Setiap class hanya melakukan **satu hal**.
- Projek Laravel ini juga sudah memakai Tailwind (lihat `package.json` Laravel), jadi class yang dipakai di Blade bisa langsung dipakai di React.
- Di Tailwind versi 4, **tidak perlu** file `tailwind.config.js`. Plugin Vite otomatis memindai file `.jsx` kita dan hanya menghasilkan CSS untuk class yang benar-benar dipakai.
- File `index.css` sudah di-import di `main.jsx` (`import './index.css'`), sehingga Tailwind berlaku untuk seluruh aplikasi.

**Perbandingan CSS biasa dan Tailwind:**

```css
/* CSS biasa: tulis class di file .css */
.tombol {
  background: #2563eb;
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
}
```

```jsx
// Tailwind: gabungkan utility class langsung di JSX
<button className="rounded-md bg-blue-600 px-4 py-2 text-white">Simpan</button>
```

**Contekan class Tailwind yang dipakai di modul ini:**

| Kategori | Contoh class | Arti |
| --- | --- | --- |
| Padding & margin | `p-6`, `px-4`, `py-2`, `mt-4`, `mb-6`, `mx-auto` | `p` = padding, `m` = margin, `x` = kiri-kanan, `y` = atas-bawah, `t`/`b` = atas/bawah. Angka 1 = 4px (`p-4` = 16px) |
| Jarak antar elemen | `gap-4`, `space-y-4` | Jarak antar anak di flex/grid, atau jarak vertikal antar anak |
| Ukuran | `w-full`, `max-w-md`, `max-w-3xl`, `min-h-screen` | Lebar penuh, lebar maksimal, tinggi minimal 1 layar |
| Teks | `text-sm`, `text-xl`, `text-3xl`, `font-medium`, `font-bold`, `text-center` | Ukuran, ketebalan, dan perataan teks |
| Warna | `text-gray-500`, `bg-white`, `bg-blue-600`, `bg-red-100` | `text-` = warna teks, `bg-` = warna latar. Angka 50–950 = terang → gelap |
| Border & bayangan | `border`, `border-gray-200`, `rounded-md`, `rounded-lg`, `shadow-sm` | Garis tepi, sudut membulat, bayangan |
| Layout | `flex`, `items-center`, `justify-between`, `flex-wrap`, `grid` | Flexbox & grid |
| Varian (kondisi) | `hover:bg-blue-700`, `focus:border-blue-500`, `disabled:opacity-60` | Class hanya berlaku saat kondisi terpenuhi (kursor di atas, input aktif, tombol nonaktif) |

**Pola class yang akan sering muncul:**

| Elemen | Class |
| --- | --- |
| Kartu (card) | `rounded-lg border border-gray-200 bg-white p-6 shadow-sm` |
| Input form | `w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none` |
| Tombol utama | `rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60` |
| Kotak pesan error | `rounded-md bg-red-100 px-4 py-3 text-red-800` |
| Pesan error di bawah input | `mt-1 text-sm text-red-600` |

> 💡 **Tips mengajar:** Minta peserta menginstal ekstensi VS Code **Tailwind CSS IntelliSense** agar mendapat *autocomplete* dan pratinjau CSS saat mengarahkan kursor ke sebuah class. Wajar jika daftar class terasa panjang. Cara Tailwind untuk mengatasinya adalah memecah elemen yang berulang menjadi **komponen React** (lihat Latihan Mandiri).

### Langkah 17 — Setup Routing & Navbar

**Tujuan:** Aplikasi bisa berpindah halaman berdasarkan URL tanpa reload.

**a. Bungkus aplikasi dengan `BrowserRouter`** — ganti isi `src/main.jsx`:

```jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
```

**b. Buat Navbar sederhana** — `src/components/Navbar.jsx`:

```jsx
import { Link, NavLink } from 'react-router';

// Class untuk NavLink: tebal & biru jika halamannya sedang dibuka
function navLinkClass({ isActive }) {
  return isActive
    ? 'font-semibold text-blue-600'
    : 'text-gray-600 hover:text-blue-600';
}

export default function Navbar() {
  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <Link to="/" className="text-xl font-bold text-gray-900">
          📝 React Blog
        </Link>

        <div className="flex items-center gap-4">
          <NavLink to="/" end className={navLinkClass}>
            Beranda
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
```

**c. Buat halaman Beranda sementara** — `src/pages/HomePage.jsx`:

```jsx
export default function HomePage() {
  return <h1 className="text-3xl font-bold">Daftar Post</h1>;
}
```

**d. Daftarkan route** — ganti isi `src/App.jsx`:

```jsx
import { Route, Routes } from 'react-router';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <Navbar />

      <main className="mx-auto max-w-3xl px-4 py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />

          {/* Jika URL tidak cocok dengan route mana pun */}
          <Route
            path="*"
            element={
              <p className="text-center text-gray-500">
                404 - Halaman tidak ditemukan
              </p>
            }
          />
        </Routes>
      </main>
    </div>
  );
}
```

Jalankan `npm run dev`, buka `http://localhost:5173`. Coba juga buka `http://localhost:5173/asal-asalan` untuk melihat halaman 404.

**Penjelasan:**

- **`BrowserRouter`** mengaktifkan fitur routing dan harus membungkus seluruh aplikasi, agar semua komponen di dalamnya bisa memakai fitur router.
- **`<Routes>`** berisi daftar **`<Route>`**. Setiap `Route` memetakan `path` (URL) ke `element` (komponen yang ditampilkan). Analogi Laravel: `Route::get('/', ...)` di `routes/web.php`.
- `path="*"` menangkap semua URL yang tidak terdaftar.
- **`<Link to="/">`** menggantikan `<a href="/">`. Bedanya, `<Link>` berpindah halaman **tanpa reload** browser, sedangkan `<a>` me-reload seluruh aplikasi dan state akan hilang.
- **`<NavLink>`** sama seperti `Link`, tetapi tahu apakah URL-nya sedang dibuka (berguna untuk menu). Prop `className` di `NavLink` boleh diisi **fungsi** yang menerima `{ isActive }`. Fungsi `navLinkClass` mengembalikan class Tailwind berbeda: biru tebal jika aktif, abu-abu jika tidak.
- Prop `end` membuat link `/` hanya aktif di halaman beranda persis, bukan di semua URL yang diawali `/`.
- `<Navbar />` diletakkan **di luar** `<Routes>` sehingga selalu tampil di semua halaman (seperti layout `@extends` di Blade).
- `<div className="min-h-screen bg-gray-100 ...">` membungkus seluruh aplikasi untuk memberi warna latar, sedangkan `<main className="mx-auto max-w-3xl ...">` membuat konten berada di tengah dengan lebar maksimal.
- **`StrictMode`** adalah mode pengecekan tambahan saat development (tidak berpengaruh di production).

### Langkah 18 — Menampilkan Daftar Post (useEffect)

**Tujuan:** Mengambil data dari `GET /api/posts` dan menampilkannya.

**a. Buat komponen kartu post** — `src/components/PostCard.jsx`:

```jsx
import { Link } from 'react-router';

export default function PostCard({ post }) {
  // Potong isi post jika terlalu panjang
  const excerpt =
    post.body.length > 100 ? post.body.slice(0, 100) + '...' : post.body;

  return (
    <article className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <h2 className="mb-2 text-xl font-semibold">{post.title}</h2>
      <p className="mb-4 text-gray-600">{excerpt}</p>
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-500">
          {new Date(post.created_at).toLocaleDateString('id-ID', {
            dateStyle: 'long',
          })}
        </span>
        <Link
          to={`/posts/${post.id}`}
          className="font-medium text-blue-600 hover:underline"
        >
          Baca selengkapnya →
        </Link>
      </div>
    </article>
  );
}
```

**b. Ganti isi `src/pages/HomePage.jsx`:**

```jsx
import { useEffect, useState } from 'react';
import { apiFetch } from '../api';
import PostCard from '../components/PostCard';

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await apiFetch('/posts');
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []); // [] = jalankan sekali saja saat komponen pertama kali tampil

  if (loading) return <p className="text-gray-500">Memuat data...</p>;
  if (error) {
    return (
      <p className="rounded-md bg-red-100 px-4 py-3 text-red-800">{error}</p>
    );
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Daftar Post</h1>

      {posts.length === 0 ? (
        <p className="text-gray-500">Belum ada post.</p>
      ) : (
        <div className="grid gap-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
```

Simpan dan lihat browser: daftar post dari database Laravel akan muncul! 🎉

**Penjelasan:**

- **Tiga state** yang hampir selalu ada saat mengambil data dari API:
  - `posts` → data hasil API (awalnya array kosong)
  - `loading` → apakah data masih dimuat (awalnya `true`)
  - `error` → pesan error jika request gagal
- **`useEffect`** adalah Hook untuk menjalankan *side effect*, yaitu pekerjaan di luar proses menampilkan UI, seperti mengambil data dari API.
  - Argumen kedua `[]` (*dependency array*) kosong artinya efek **hanya dijalankan sekali**, setelah komponen pertama kali tampil.
  - **Kenapa tidak fetch langsung di badan komponen?** Karena badan komponen dijalankan ulang setiap render. Fetch di sana → `setPosts` → render ulang → fetch lagi → *infinite loop*.
  - Fungsi di `useEffect` tidak boleh `async` secara langsung, jadi kita membuat fungsi `async` di dalamnya (`fetchPosts`) lalu memanggilnya.
- **`try...catch...finally`**:
  - `try` → jalankan request
  - `catch` → tangkap error (server mati, status bukan 2xx, dll)
  - `finally` → selalu dijalankan, berhasil atau gagal; tempat yang tepat untuk mematikan `loading`
- **Early return**: `if (loading) return ...` menampilkan tampilan berbeda sebelum data siap.
- **`key={post.id}`** memakai `id` dari database karena dijamin unik.
- **Alur data:** `HomePage` mengambil data → mengirim tiap `post` ke `PostCard` lewat **props**.

> 💡 **Tips mengajar:** Buka DevTools (F12) → tab **Network** → filter **Fetch/XHR**. Tunjukkan request ke `/api/posts` beserta respons JSON-nya. Peserta mungkin melihat request dikirim **dua kali**; itu normal karena `StrictMode` sengaja menjalankan efek dua kali saat development untuk membantu menemukan bug.

### Langkah 19 — Halaman Detail Post (useParams)

**Tujuan:** Membuka satu post berdasarkan id di URL, misalnya `/posts/7`.

**a. Buat `src/pages/PostDetailPage.jsx`:**

```jsx
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { apiFetch } from '../api';

export default function PostDetailPage() {
  const { id } = useParams(); // ambil :id dari URL

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchPost() {
      try {
        const data = await apiFetch(`/posts/${id}`);
        setPost(data.data); // data post ada di dalam key "data"
      } catch (err) {
        setError(err.status === 404 ? 'Post tidak ditemukan.' : err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [id]); // jalankan ulang jika id di URL berubah

  if (loading) return <p className="text-gray-500">Memuat data...</p>;
  if (error) {
    return (
      <p className="rounded-md bg-red-100 px-4 py-3 text-red-800">{error}</p>
    );
  }

  return (
    <article className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <Link to="/" className="text-sm text-blue-600 hover:underline">
        ← Kembali
      </Link>
      <h1 className="mt-4 text-3xl font-bold">{post.title}</h1>
      <p className="mt-1 text-sm text-gray-500">
        Dibuat pada{' '}
        {new Date(post.created_at).toLocaleString('id-ID', {
          dateStyle: 'long',
          timeStyle: 'short',
        })}
      </p>
      <p className="mt-6 leading-relaxed whitespace-pre-line">{post.body}</p>
    </article>
  );
}
```

**b. Daftarkan route** di `src/App.jsx`. Tambahkan import dan `Route` berikut:

```jsx
import PostDetailPage from './pages/PostDetailPage';

// ... di dalam <Routes>, di bawah route "/"
<Route path="/posts/:id" element={<PostDetailPage />} />
```

Klik "Baca selengkapnya" di salah satu post.

**Penjelasan:**

- `:id` di `path="/posts/:id"` adalah **parameter dinamis**, sama seperti `{post}` di route Laravel.
- **`useParams()`** mengambil nilai parameter dari URL. Jika URL-nya `/posts/7`, maka `id` bernilai `"7"` (string).
- Dependency array `[id]` artinya efek dijalankan ulang setiap kali `id` berubah.
- Jika post tidak ada, Laravel mengembalikan `404` (dari Route Model Binding), dan kita tampilkan pesan yang ramah.
- Respons API detail post berbentuk `{ status, message, data }`, sehingga post-nya diambil dengan **`data.data`**. Bandingkan dengan `HomePage` yang langsung memakai `data` karena `GET /api/posts` mengembalikan array.
- Jika muncul error `Unexpected end of JSON input`, berarti method `show()` di Laravel masih kosong. Cek [Langkah 2](#langkah-2--cek-endpoint-detail-post).

---

## Bagian 5 — Autentikasi

### Alur Autentikasi Token (Sanctum)

```
1. User mengisi form login
         │
         ▼
2. React ──POST /api/login {email, password}──▶ Laravel
         │                                         │ cek email & password
         ◀──────── { user, token: "3|abc..." } ────┘
         │
3. React menyimpan token & user di localStorage + state global (Context)
         │
         ▼
4. Request berikutnya yang butuh login:
   React ──POST /api/posts──────────────────────▶ Laravel (middleware auth:sanctum)
          Header: Authorization: Bearer 3|abc...      │ token valid → $request->user()
         ◀──────────── { data: post baru } ────────────┘
         │
5. Logout: React ──POST /api/logout──▶ Laravel menghapus token
           React menghapus token dari localStorage
```

### Langkah 20 — Membuat AuthContext

**Tujuan:** Menyimpan data login (token & user) di satu tempat yang bisa diakses oleh **semua komponen**.

**Masalah:** Data user dibutuhkan di banyak tempat (Navbar, halaman detail, halaman edit). Jika dikirim lewat props dari `App` ke setiap komponen anak, cucu, dan seterusnya, kode jadi rumit. Masalah ini disebut **props drilling**.

**Solusi:** **Context API**, yaitu "wadah data global" bawaan React.

Buat file `src/context/AuthContext.jsx`:

```jsx
import { createContext, useContext, useState } from 'react';
import { apiFetch } from '../api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Nilai awal diambil dari localStorage agar login tidak hilang saat refresh
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  function login(newToken, newUser) {
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
  }

  async function logout() {
    try {
      await apiFetch('/logout', { method: 'POST' });
    } catch {
      // Abaikan error (misal token sudah tidak berlaku), tetap hapus data lokal
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setToken(null);
      setUser(null);
    }
  }

  return (
    <AuthContext value={{ token, user, login, logout }}>
      {children}
    </AuthContext>
  );
}

// Custom hook agar komponen lain cukup memanggil useAuth()
export function useAuth() {
  return useContext(AuthContext);
}
```

Lalu bungkus aplikasi dengan `AuthProvider` di `src/main.jsx`:

```jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { AuthProvider } from './context/AuthContext';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
```

**Penjelasan:**

- **`createContext()`** membuat "wadah" global.
- **`AuthProvider`** adalah komponen yang menyimpan state `token` & `user`, lalu membagikannya lewat `value`. Semua komponen yang berada **di dalam** `<AuthProvider>` bisa mengakses nilai ini.
- **`children`** adalah prop khusus berisi elemen apa pun yang dibungkus oleh komponen tersebut (di sini `<App />`). Mirip `{{ $slot }}` di Blade Component.
- **`useState(() => ...)`** (*lazy initial state*): fungsi di dalamnya hanya dijalankan sekali saat awal. Kita membaca `localStorage` agar user **tetap login walau halaman di-refresh**.
- `localStorage` hanya bisa menyimpan **string**, jadi objek `user` diubah dengan `JSON.stringify()` saat menyimpan dan `JSON.parse()` saat membaca.
- **`logout()`** memanggil API `/logout` (agar token dihapus di server), lalu **apa pun hasilnya** menghapus data di browser (`finally`).
- **`useAuth()`** adalah **custom hook**: cara singkat agar komponen lain cukup menulis `const { user } = useAuth();`.
- Di React 19, `<AuthContext value={...}>` bisa langsung dipakai sebagai provider. Tutorial lama menulisnya `<AuthContext.Provider value={...}>`; keduanya sama saja.

> ⚠️ **Catatan keamanan:** Menyimpan token di `localStorage` itu sederhana dan cocok untuk belajar, tetapi rentan dicuri jika website terkena serangan XSS. Untuk aplikasi production, pertimbangkan autentikasi **Sanctum SPA** berbasis cookie.

### Langkah 21 — Navbar yang Sadar Login

**Tujuan:** Menu berubah sesuai status login.

Ganti isi `src/components/Navbar.jsx`:

```jsx
import { Link, NavLink, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';

// Class untuk NavLink: tebal & biru jika halamannya sedang dibuka
function navLinkClass({ isActive }) {
  return isActive
    ? 'font-semibold text-blue-600'
    : 'text-gray-600 hover:text-blue-600';
}

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate('/login');
  }

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <Link to="/" className="text-xl font-bold text-gray-900">
          📝 React Blog
        </Link>

        <div className="flex items-center gap-4">
          <NavLink to="/" end className={navLinkClass}>
            Beranda
          </NavLink>

          {user ? (
            <>
              <NavLink to="/posts/create" className={navLinkClass}>
                Tulis Post
              </NavLink>
              <span className="text-sm text-gray-500">Halo, {user.name}</span>
              <button
                onClick={handleLogout}
                className="rounded-md bg-gray-500 px-3 py-1.5 text-sm text-white hover:bg-gray-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={navLinkClass}>
                Login
              </NavLink>
              <NavLink to="/register" className={navLinkClass}>
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
```

**Penjelasan:**

- `useAuth()` mengambil `user` dan fungsi `logout` dari Context.
- **Conditional rendering**: jika `user` ada (sudah login) tampilkan menu "Tulis Post" & tombol Logout; jika tidak, tampilkan Login & Register.
- **`useNavigate()`** mengembalikan fungsi untuk **pindah halaman lewat kode** (bukan lewat klik link). Mirip `return redirect('/login')` di Laravel.
- Saat logout, token dihapus → state `user` menjadi `null` → Navbar otomatis render ulang dan menampilkan menu Login/Register. Inilah kekuatan state: **UI selalu mengikuti data**.
- Saat ini link Login, Register, dan Tulis Post masih menuju halaman 404. Halamannya akan kita buat di langkah berikutnya.

### Langkah 22 — Halaman Register

**Tujuan:** Membuat akun baru lewat `POST /api/register`.

Buat `src/pages/RegisterPage.jsx`:

```jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { apiFetch } from '../api';

export default function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault(); // cegah browser me-reload halaman
    setErrors({});
    setMessage('');
    setLoading(true);

    try {
      await apiFetch('/register', {
        method: 'POST',
        body: JSON.stringify(form),
      });

      // Berhasil: pindah ke halaman login sambil membawa pesan
      navigate('/login', {
        state: { message: 'Registrasi berhasil, silakan login.' },
      });
    } catch (err) {
      if (err.errors) {
        setErrors(err.errors); // error validasi per field (422)
      } else {
        setMessage(err.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h1 className="mb-6 text-2xl font-bold">Register</h1>

      {message && (
        <p className="mb-4 rounded-md bg-red-100 px-4 py-3 text-red-800">
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="mb-1 block font-medium">
            Nama
          </label>
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name[0]}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="mb-1 block font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email[0]}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="mb-1 block font-medium">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password[0]}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="password_confirmation"
            className="mb-1 block font-medium"
          >
            Konfirmasi Password
          </label>
          <input
            id="password_confirmation"
            name="password_confirmation"
            type="password"
            value={form.password_confirmation}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Memproses...' : 'Register'}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        Sudah punya akun?{' '}
        <Link to="/login" className="text-blue-600 hover:underline">
          Login di sini
        </Link>
      </p>
    </div>
  );
}
```

Daftarkan route di `src/App.jsx`:

```jsx
import RegisterPage from './pages/RegisterPage';

// ... di dalam <Routes>
<Route path="/register" element={<RegisterPage />} />
```

**Penjelasan:**

- **Satu state untuk banyak input:** daripada membuat 4 state terpisah, kita memakai satu objek `form`.
- **`handleChange` serbaguna:** `[e.target.name]` adalah *computed property name*. Jika user mengetik di input `name="email"`, maka yang diperbarui adalah `form.email`. Karena itu, **atribut `name` di input harus sama persis dengan nama field yang diminta API**.
- `{ ...form, ... }` menyalin isi form lama lalu menimpa satu field saja (prinsip immutability).
- Field `password_confirmation` wajib ada karena validasi Laravel memakai rule `confirmed`.
- **Menampilkan error validasi:** Laravel mengirim `errors` dalam bentuk `{ email: ["pesan 1", ...] }`. Kita tampilkan pesan pertama dengan `errors.email[0]`, tepat di bawah input-nya.
- `disabled={loading}` mencegah tombol diklik berkali-kali selama request berjalan. Class `disabled:opacity-60` membuat tombol tampak pudar saat nonaktif.
- Class Tailwind pada setiap input sama persis dan ditulis berulang. Untuk sekarang dibiarkan seperti ini agar mudah dipahami; di [Latihan Mandiri](#latihan-mandiri) peserta bisa memecahnya menjadi komponen `Input` sendiri.
- Setelah berhasil, kita pindah ke `/login` sambil mengirim **state** berisi pesan sukses. Halaman login akan membaca pesan ini.
- API register sebenarnya juga mengembalikan `token`, jadi user bisa langsung dibuat login. Di sini kita sengaja mengarahkan ke halaman Login agar alurnya jelas dan peserta berlatih mengirim state antar halaman. Versi langsung-login dijadikan [Latihan Mandiri](#latihan-mandiri).

**Coba:** submit form kosong → muncul error validasi. Isi dengan benar → diarahkan ke `/login` (masih 404, lanjut ke langkah berikutnya).

### Langkah 23 — Halaman Login

**Tujuan:** Login lewat `POST /api/login` dan menyimpan token.

Buat `src/pages/LoginPage.jsx`:

```jsx
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { apiFetch } from '../api';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Pesan sukses yang dikirim dari halaman Register (jika ada)
  const successMessage = location.state?.message;

  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErrors({});
    setMessage('');
    setLoading(true);

    try {
      const data = await apiFetch('/login', {
        method: 'POST',
        body: JSON.stringify(form),
      });

      login(data.token, data.user); // simpan token & user ke context
      navigate('/');
    } catch (err) {
      if (err.errors) {
        setErrors(err.errors);
      } else {
        setMessage(err.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h1 className="mb-6 text-2xl font-bold">Login</h1>

      {successMessage && (
        <p className="mb-4 rounded-md bg-green-100 px-4 py-3 text-green-800">
          {successMessage}
        </p>
      )}
      {message && (
        <p className="mb-4 rounded-md bg-red-100 px-4 py-3 text-red-800">
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="mb-1 block font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email[0]}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="mb-1 block font-medium">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password[0]}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Memproses...' : 'Login'}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        Belum punya akun?{' '}
        <Link to="/register" className="text-blue-600 hover:underline">
          Register di sini
        </Link>
      </p>
    </div>
  );
}
```

Daftarkan route di `src/App.jsx`:

```jsx
import LoginPage from './pages/LoginPage';

// ... di dalam <Routes>
<Route path="/login" element={<LoginPage />} />
```

**Penjelasan:**

- Strukturnya mirip halaman Register: controlled form, state `errors`, `message`, dan `loading`.
- **`useLocation()`** membaca informasi URL saat ini, termasuk `state` yang dikirim dari `navigate('/login', { state })` di halaman Register.
- `location.state?.message` memakai **optional chaining (`?.`)**: jika `state` kosong (user membuka `/login` langsung), hasilnya `undefined`, bukan error.
- **Dua kemungkinan login gagal**, dan keduanya otomatis masuk ke `catch` karena status code-nya bukan 2xx:
  - Email **tidak terdaftar** → status `422` (rule `exists:users`).
  - Email terdaftar tapi **password salah** → status `401`.
  - Keduanya mengirim `errors.email`, sehingga pesannya tampil di bawah input Email.
- Setelah login berhasil, `login(data.token, data.user)` menyimpan token ke Context + `localStorage`, lalu kita pindah ke beranda.

> 💡 **Tips mengajar:** Versi awal API login projek ini mengembalikan status `200` walaupun password salah. Akibatnya frontend harus mengecek `data.errors` secara manual di dalam `try`. Setelah backend diperbaiki menjadi `401`, semua error cukup ditangani di satu `catch`. Ini contoh nyata bahwa **status code yang tepat membuat kode frontend lebih sederhana**.

**Uji alur autentikasi:**

1. Register akun baru → diarahkan ke Login dengan pesan hijau.
2. Login → Navbar berubah menampilkan "Halo, {nama}" dan tombol Logout.
3. Buka DevTools → tab **Application** → **Local Storage** → `http://localhost:5173`. Ada `token` dan `user`.
4. Refresh halaman → masih login (karena dibaca dari `localStorage`).
5. Klik Logout → `token` dan `user` hilang dari Local Storage, Navbar kembali ke menu Login/Register.

---

## Bagian 6 — CRUD Post (Wajib Login)

### Langkah 24 — Protected Route

**Tujuan:** Halaman tertentu hanya bisa dibuka jika sudah login.

Buat `src/components/ProtectedRoute.jsx`:

```jsx
import { Navigate } from 'react-router';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { token } = useAuth();

  // Belum login? Arahkan ke halaman login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
```

**Penjelasan:**

- Komponen ini bekerja seperti **middleware `auth`** di Laravel: jika belum login, user diarahkan ke halaman login; jika sudah, tampilkan halaman yang dibungkusnya (`children`).
- **`<Navigate>`** adalah komponen untuk redirect. `replace` mengganti riwayat browser, sehingga tombol *Back* tidak kembali ke halaman terlarang.
- ⚠️ Proteksi di frontend **hanya untuk kenyamanan UI**. Keamanan sebenarnya tetap ada di backend (middleware `auth:sanctum` dan `PostPolicy`). User yang "nakal" bisa saja mengakali kode JavaScript, tapi tidak bisa mengakali Laravel.

### Langkah 25 — Komponen Form yang Bisa Dipakai Ulang

**Tujuan:** Membuat satu komponen form untuk halaman **Tambah** dan **Edit** post.

Buat `src/components/PostForm.jsx`:

```jsx
import { useState } from 'react';

export default function PostForm({
  initialData = { title: '', body: '' },
  onSubmit,
  errors = {},
  loading = false,
  submitLabel = 'Simpan',
}) {
  const [form, setForm] = useState(initialData);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(form); // kirim data form ke komponen induk
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
    >
      <div>
        <label htmlFor="title" className="mb-1 block font-medium">
          Judul
        </label>
        <input
          id="title"
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="body" className="mb-1 block font-medium">
          Isi Post
        </label>
        <textarea
          id="body"
          name="body"
          rows="8"
          value={form.body}
          onChange={handleChange}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
        />
        {errors.body && (
          <p className="mt-1 text-sm text-red-600">{errors.body[0]}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? 'Menyimpan...' : submitLabel}
      </button>
    </form>
  );
}
```

**Penjelasan:**

- Form tambah dan edit post isinya sama (judul & isi). Daripada menulis dua kali, kita buat **satu komponen yang dapat dipakai ulang** dan dikonfigurasi lewat props.
- **Props dengan nilai default** (`errors = {}`, `submitLabel = 'Simpan'`) dipakai jika induk tidak mengirim prop tersebut.
- **Mengirim fungsi lewat props:** `onSubmit` adalah fungsi milik komponen induk. Saat form disubmit, `PostForm` memanggil `onSubmit(form)` untuk **mengirim data ke atas**. Inilah pola komunikasi anak → induk di React:
  - Induk → anak: lewat **props** (data)
  - Anak → induk: lewat **props berisi fungsi** (*callback*)
- `PostForm` hanya mengurus tampilan & input. Urusan memanggil API diserahkan ke halaman (induk). Pemisahan tugas ini membuat komponen lebih mudah dipakai ulang.

### Langkah 26 — Membuat Post Baru

**Tujuan:** Mengirim post baru lewat `POST /api/posts` dengan token.

Buat `src/pages/CreatePostPage.jsx`:

```jsx
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { apiFetch } from '../api';
import PostForm from '../components/PostForm';

export default function CreatePostPage() {
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Fungsi ini dipanggil oleh PostForm saat form di-submit
  async function handleCreate(form) {
    setErrors({});
    setMessage('');
    setLoading(true);

    try {
      const data = await apiFetch('/posts', {
        method: 'POST',
        body: JSON.stringify(form),
      });

      navigate(`/posts/${data.data.id}`); // buka detail post yang baru dibuat
    } catch (err) {
      if (err.errors) {
        setErrors(err.errors);
      } else {
        setMessage(err.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Tulis Post Baru</h1>

      {message && (
        <p className="mb-4 rounded-md bg-red-100 px-4 py-3 text-red-800">
          {message}
        </p>
      )}

      <PostForm
        onSubmit={handleCreate}
        errors={errors}
        loading={loading}
        submitLabel="Terbitkan"
      />
    </div>
  );
}
```

Daftarkan route di `src/App.jsx`, **dibungkus `ProtectedRoute`**:

```jsx
import ProtectedRoute from './components/ProtectedRoute';
import CreatePostPage from './pages/CreatePostPage';

// ... di dalam <Routes>
<Route
  path="/posts/create"
  element={
    <ProtectedRoute>
      <CreatePostPage />
    </ProtectedRoute>
  }
/>
```

**Penjelasan:**

- Kita **tidak perlu** menulis header `Authorization` di sini, karena `apiFetch` sudah otomatis menambahkannya jika token ada di `localStorage`. Inilah keuntungan membuat helper di Langkah 15.
- Di Laravel, `$request->user()->posts()->create(...)` otomatis mengisi `user_id` dengan user pemilik token. React **tidak perlu** mengirim `user_id`.
- Respons API menaruh post baru di key `data`, sehingga id-nya diakses dengan `data.data.id`.
- Urutan route `/posts/create` dan `/posts/:id` tidak masalah: React Router otomatis mendahulukan path statis (`create`) dibanding parameter dinamis (`:id`).

**Coba:**

1. Logout, lalu buka `http://localhost:5173/posts/create` → otomatis dilempar ke `/login`.
2. Login, klik "Tulis Post", submit form kosong → muncul error validasi.
3. Isi judul & isi, klik Terbitkan → diarahkan ke halaman detail post baru.
4. Lihat tab **Network** → klik request `posts` → tab **Headers** → ada `Authorization: Bearer ...`.

### Langkah 27 — Tombol Edit & Hapus di Halaman Detail

**Tujuan:** Pemilik post bisa mengedit dan menghapus post-nya.

Ganti isi `src/pages/PostDetailPage.jsx` menjadi versi lengkap berikut:

```jsx
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { apiFetch } from '../api';
import { useAuth } from '../context/AuthContext';

export default function PostDetailPage() {
  const { id } = useParams(); // ambil :id dari URL
  const { user } = useAuth();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchPost() {
      try {
        const data = await apiFetch(`/posts/${id}`);
        setPost(data.data); // data post ada di dalam key "data"
      } catch (err) {
        setError(err.status === 404 ? 'Post tidak ditemukan.' : err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [id]); // jalankan ulang jika id di URL berubah

  async function handleDelete() {
    if (!confirm('Yakin ingin menghapus post ini?')) return;

    try {
      await apiFetch(`/posts/${id}`, { method: 'DELETE' });
      navigate('/');
    } catch (err) {
      alert(err.message);
    }
  }

  if (loading) return <p className="text-gray-500">Memuat data...</p>;
  if (error) {
    return (
      <p className="rounded-md bg-red-100 px-4 py-3 text-red-800">{error}</p>
    );
  }

  // Tombol Edit & Hapus hanya untuk pemilik post
  const isOwner = user && user.id === post.user_id;

  return (
    <article className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <Link to="/" className="text-sm text-blue-600 hover:underline">
        ← Kembali
      </Link>
      <h1 className="mt-4 text-3xl font-bold">{post.title}</h1>
      <p className="mt-1 text-sm text-gray-500">
        Dibuat pada{' '}
        {new Date(post.created_at).toLocaleString('id-ID', {
          dateStyle: 'long',
          timeStyle: 'short',
        })}
      </p>
      <p className="mt-6 leading-relaxed whitespace-pre-line">{post.body}</p>

      {isOwner && (
        <div className="mt-8 flex gap-2 border-t border-gray-200 pt-4">
          <Link
            to={`/posts/${post.id}/edit`}
            className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Hapus
          </button>
        </div>
      )}
    </article>
  );
}
```

**Penjelasan:**

- **Yang ditambahkan:** `useAuth()` untuk mengetahui user yang login, `useNavigate()` untuk pindah halaman setelah hapus, fungsi `handleDelete`, dan tombol Edit/Hapus.
- `isOwner` bernilai `true` jika user sudah login **dan** `id` user sama dengan `user_id` milik post. Ini sama dengan logika di `PostPolicy` Laravel:
  ```php
  return $user->id === $post->user_id;
  ```
- `{isOwner && (...)}` → tombol hanya dirender jika `isOwner` bernilai `true`.
- `confirm()` menampilkan dialog konfirmasi bawaan browser. Jika user klik *Cancel*, fungsi berhenti.
- Jika API menolak (misal `403 You do not own this post`), pesan ditampilkan dengan `alert()`.

### Langkah 28 — Halaman Edit Post

**Tujuan:** Mengubah post lewat `PUT /api/posts/{id}`.

Buat `src/pages/EditPostPage.jsx`:

```jsx
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { apiFetch } from '../api';
import { useAuth } from '../context/AuthContext';
import PostForm from '../components/PostForm';

export default function EditPostPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  // 1. Ambil data post lama untuk mengisi form
  useEffect(() => {
    async function fetchPost() {
      try {
        const data = await apiFetch(`/posts/${id}`);
        setPost(data.data); // data post ada di dalam key "data"
      } catch (err) {
        setMessage(err.status === 404 ? 'Post tidak ditemukan.' : err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [id]);

  // 2. Kirim perubahan ke API
  async function handleUpdate(form) {
    setErrors({});
    setMessage('');
    setSaving(true);

    try {
      await apiFetch(`/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify(form),
      });

      navigate(`/posts/${id}`);
    } catch (err) {
      if (err.errors) {
        setErrors(err.errors);
      } else {
        setMessage(err.message); // contoh: 403 "You do not own this post"
      }
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="text-gray-500">Memuat data...</p>;
  if (!post) {
    return (
      <p className="rounded-md bg-red-100 px-4 py-3 text-red-800">{message}</p>
    );
  }

  if (post.user_id !== user.id) {
    return (
      <p className="rounded-md bg-red-100 px-4 py-3 text-red-800">
        Kamu tidak berhak mengedit post ini.
      </p>
    );
  }

  return (
    <div>
      <Link to={`/posts/${id}`} className="text-sm text-blue-600 hover:underline">
        ← Batal
      </Link>
      <h1 className="mt-4 mb-6 text-3xl font-bold">Edit Post</h1>

      {message && (
        <p className="mb-4 rounded-md bg-red-100 px-4 py-3 text-red-800">
          {message}
        </p>
      )}

      {/* Form baru dirender setelah data post siap, agar terisi data lama */}
      <PostForm
        initialData={{ title: post.title, body: post.body }}
        onSubmit={handleUpdate}
        errors={errors}
        loading={saving}
        submitLabel="Simpan Perubahan"
      />
    </div>
  );
}
```

Daftarkan route di `src/App.jsx`:

```jsx
import EditPostPage from './pages/EditPostPage';

// ... di dalam <Routes>
<Route
  path="/posts/:id/edit"
  element={
    <ProtectedRoute>
      <EditPostPage />
    </ProtectedRoute>
  }
/>
```

**Penjelasan:**

- Halaman ini menggabungkan dua hal yang sudah dipelajari: **mengambil data** (seperti halaman detail) dan **mengirim form** (seperti halaman tambah).
- `PostForm` dipakai ulang, kali ini dengan `initialData` berisi data lama.
- **Kenapa form baru dirender setelah `loading` selesai?** Nilai awal `useState(initialData)` di `PostForm` **hanya dipakai sekali** saat komponen pertama kali muncul. Jika `PostForm` dirender sebelum data post datang, form akan terisi kosong dan tidak akan ter-update. Dengan *early return* `if (loading) ...`, `PostForm` baru muncul ketika data sudah siap.
- Ada dua state loading berbeda: `loading` (memuat data awal) dan `saving` (sedang menyimpan), supaya tampilannya tidak tercampur.
- Pengecekan `post.user_id !== user.id` di frontend membuat user non-pemilik langsung mendapat pesan yang jelas. Namun, sekali lagi, **pengaman utamanya ada di `PostPolicy`** Laravel yang akan menolak dengan status `403`.
- `user` pasti ada di halaman ini karena halaman sudah dilindungi `ProtectedRoute`.

### Langkah 29 — Kode Akhir `App.jsx` & Struktur Folder

Pastikan `src/App.jsx` sudah seperti ini:

```jsx
import { Route, Routes } from 'react-router';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import PostDetailPage from './pages/PostDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CreatePostPage from './pages/CreatePostPage';
import EditPostPage from './pages/EditPostPage';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <Navbar />

      <main className="mx-auto max-w-3xl px-4 py-8">
        <Routes>
          {/* Halaman publik */}
          <Route path="/" element={<HomePage />} />
          <Route path="/posts/:id" element={<PostDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Halaman yang wajib login */}
          <Route
            path="/posts/create"
            element={
              <ProtectedRoute>
                <CreatePostPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/posts/:id/edit"
            element={
              <ProtectedRoute>
                <EditPostPage />
              </ProtectedRoute>
            }
          />

          {/* Jika URL tidak cocok dengan route mana pun */}
          <Route
            path="*"
            element={
              <p className="text-center text-gray-500">
                404 - Halaman tidak ditemukan
              </p>
            }
          />
        </Routes>
      </main>
    </div>
  );
}
```

**Struktur folder akhir:**

```
react-blog/
├── .env                          ← VITE_API_URL
├── index.html
├── package.json
├── vite.config.js                ← plugin React + Tailwind
└── src/
    ├── api.js                    ← helper fetch ke API Laravel
    ├── App.jsx                   ← daftar route
    ├── index.css                 ← @import 'tailwindcss'
    ├── main.jsx                  ← entry point (BrowserRouter + AuthProvider)
    ├── components/
    │   ├── Navbar.jsx
    │   ├── PostCard.jsx
    │   ├── PostForm.jsx
    │   └── ProtectedRoute.jsx
    ├── context/
    │   └── AuthContext.jsx       ← state login global
    └── pages/
        ├── CreatePostPage.jsx
        ├── EditPostPage.jsx
        ├── HomePage.jsx
        ├── LoginPage.jsx
        ├── PostDetailPage.jsx
        └── RegisterPage.jsx
```

**Peta halaman:**

| URL React | Komponen | Endpoint API yang dipanggil | Wajib login |
| --- | --- | --- | --- |
| `/` | `HomePage` | `GET /api/posts` | Tidak |
| `/posts/:id` | `PostDetailPage` | `GET /api/posts/{id}`, `DELETE /api/posts/{id}` | Tidak (hapus: ya) |
| `/register` | `RegisterPage` | `POST /api/register` | Tidak |
| `/login` | `LoginPage` | `POST /api/login` | Tidak |
| `/posts/create` | `CreatePostPage` | `POST /api/posts` | **Ya** |
| `/posts/:id/edit` | `EditPostPage` | `GET /api/posts/{id}`, `PUT /api/posts/{id}` | **Ya** |
| (tombol Logout) | `Navbar` | `POST /api/logout` | **Ya** |

🎉 **Selamat, aplikasi React Blog sudah selesai!**

> ℹ️ Jika peserta menjalankan `npm run lint`, akan muncul *warning* `only-export-components` di `AuthContext.jsx`. Warning ini muncul karena file tersebut meng-export komponen (`AuthProvider`) **dan** hook (`useAuth`) sekaligus. Aplikasi tetap berjalan normal; dampaknya hanya fitur *fast refresh* untuk file itu yang melakukan reload penuh. Untuk menghilangkannya, pindahkan `useAuth` ke file terpisah.

---

## Bagian 7 — Penutup

### Skenario Pengujian

Gunakan checklist ini untuk menguji aplikasi bersama peserta:

**Tanpa login**
- [ ] Beranda menampilkan daftar post dari database
- [ ] Klik "Baca selengkapnya" membuka detail post
- [ ] Membuka `/posts/99999` menampilkan "Post tidak ditemukan."
- [ ] Membuka `/posts/create` dialihkan ke `/login`
- [ ] Tombol Edit/Hapus **tidak** muncul di halaman detail

**Register & Login**
- [ ] Register dengan form kosong → muncul error di bawah setiap input
- [ ] Register dengan email yang sudah dipakai → muncul error "email has already been taken"
- [ ] Register dengan konfirmasi password berbeda → muncul error
- [ ] Register berhasil → diarahkan ke Login dengan pesan sukses
- [ ] Login dengan password salah → muncul "The provided credentials are incorrect."
- [ ] Login berhasil → Navbar menampilkan nama user
- [ ] Refresh halaman → tetap login

**CRUD Post**
- [ ] Buat post baru → muncul di beranda
- [ ] Edit post milik sendiri → data berubah
- [ ] Hapus post milik sendiri → hilang dari beranda

**Hak akses (gunakan 2 akun berbeda)**
- [ ] Login sebagai **User A**, buat post
- [ ] Logout, login sebagai **User B**, buka post milik User A → tombol Edit/Hapus tidak muncul
- [ ] User B membuka paksa `/posts/{id-post-A}/edit` → muncul "Kamu tidak berhak mengedit post ini."

**Logout**
- [ ] Klik Logout → Navbar kembali menampilkan Login/Register, token terhapus dari Local Storage

### Troubleshooting

| Gejala | Kemungkinan Penyebab | Solusi |
| --- | --- | --- |
| `Failed to fetch` / `NetworkError` | Server Laravel tidak berjalan atau URL API salah | Jalankan `php artisan serve`, cek `VITE_API_URL` di `.env` |
| Request menuju `undefined/posts` | `.env` tidak terbaca | Pastikan file `.env` ada di root projek React, variabel diawali `VITE_`, lalu restart `npm run dev` |
| `Unexpected end of JSON input` saat membuka detail post | Method `show()` di `PostController` masih kosong | Cek [Langkah 2](#langkah-2--cek-endpoint-detail-post) |
| Judul & isi kosong, tanggal tampil `Invalid Date` di halaman detail | Data dibaca dengan `setPost(data)`, padahal post ada di dalam key `data` | Gunakan `setPost(data.data)` |
| `Unexpected token '<' ... is not valid JSON` | API mengembalikan HTML, biasanya karena URL salah (misalnya lupa `/api`) | Cek `VITE_API_URL=http://localhost:8000/api` |
| Pesan error tampil `validation.required` | File terjemahan bahasa Indonesia tidak ada | Kerjakan [Langkah 3](#langkah-3--perbaiki-pesan-validasi) |
| Error `blocked by CORS policy` di Console | Konfigurasi CORS di Laravel diubah/salah | Jalankan `php artisan config:clear`; jika `config/cors.php` ada, pastikan `paths` memuat `api/*` |
| `Unauthenticated.` saat membuat/mengedit post | Token tidak terkirim atau sudah tidak berlaku (misal sudah logout di browser lain, karena logout menghapus **semua** token user) | Logout lalu login ulang; cek header `Authorization` di tab Network |
| `You do not own this post` | User bukan pemilik post | Normal, ini tanda `PostPolicy` bekerja |
| Halaman putih kosong | Ada error JavaScript | Buka DevTools → tab **Console** untuk melihat pesan error |
| Tampilan polos, class Tailwind tidak berpengaruh | Plugin Tailwind belum terpasang | Cek `vite.config.js` dan `src/index.css` ([Langkah 16](#langkah-16--setup-tailwind-css)), pastikan `index.css` di-import di `main.jsx`, lalu restart `npm run dev` |
| `useNavigate() may be used only in the context of a <Router>` | Aplikasi belum dibungkus `BrowserRouter` | Cek `main.jsx` ([Langkah 17](#langkah-17--setup-routing--navbar)) |
| `Cannot destructure property 'user' of useAuth(...)` | Aplikasi belum dibungkus `AuthProvider` | Cek `main.jsx` ([Langkah 20](#langkah-20--membuat-authcontext)) |
| Request API terkirim dua kali | `StrictMode` menjalankan efek dua kali saat development | Normal, tidak terjadi di production |

### Lampiran: Saran Perbaikan Backend (Opsional)

Kode React di modul ini **sudah berjalan** dengan API saat ini (setelah Langkah 2 & 3). Perbaikan berikut opsional, tapi bagus didiskusikan bersama peserta.

**Urutkan post terbaru & sertakan data penulis**

Di `PostController@index`:

```php
return Post::with('user')->latest()->get();
```

Di React, nama penulis bisa ditampilkan dengan `{post.user.name}`.

### Latihan Mandiri

Tingkat kesulitan: ⭐ mudah, ⭐⭐ sedang, ⭐⭐⭐ menantang.

1. ⭐ Tampilkan jumlah total post di atas daftar post (`posts.length`).
2. ⭐ Buat komponen `Alert` yang dapat dipakai ulang: `<Alert type="error">pesan</Alert>` dan `<Alert type="success">pesan</Alert>`, lalu ganti semua paragraf pesan merah/hijau yang class Tailwind-nya berulang.
3. ⭐ Tampilkan daftar post dalam **2 kolom** di layar lebar dengan class responsif `md:grid-cols-2`.
4. ⭐ Ubah halaman Register agar user **langsung login** setelah mendaftar, memakai `token` dari respons API: `login(data.token, data.user)` lalu `navigate('/')`.
5. ⭐⭐ Tambahkan **fitur pencarian** di beranda: input teks yang memfilter post berdasarkan judul (gunakan state `search` + `posts.filter(...)`).
6. ⭐⭐ Buat halaman **"Post Saya"** (`/my-posts`) yang hanya menampilkan post milik user yang login.
7. ⭐⭐ Tampilkan **nama penulis** di setiap kartu post (kerjakan saran di [Lampiran](#lampiran-saran-perbaikan-backend-opsional)).
8. ⭐⭐ Buat komponen `Input` dan `Button` agar class Tailwind tidak ditulis berulang di halaman Login, Register, dan `PostForm`.
9. ⭐⭐ Tambahkan **dark mode** memakai varian `dark:` (contoh: `bg-white dark:bg-gray-800`).
10. ⭐⭐⭐ Saat aplikasi pertama kali dibuka, validasi token dengan memanggil `GET /api/user`. Jika gagal (`401`), hapus token dan anggap user belum login.
11. ⭐⭐⭐ Jika API mengembalikan `401` di request mana pun, otomatis logout dan arahkan ke halaman login.
12. ⭐⭐⭐ Ganti `fetch` dengan library **axios**, lalu bandingkan kelebihan dan kekurangannya.

### Rangkuman Konsep

| Konsep | Fungsi | Dipakai di |
| --- | --- | --- |
| Komponen & JSX | Membangun UI dari potongan-potongan kecil | Semua file `.jsx` |
| Props | Mengirim data induk → anak | `PostCard`, `PostForm` |
| Props berisi fungsi | Mengirim data anak → induk | `PostForm` (`onSubmit`) |
| `children` | Membungkus komponen lain | `AuthProvider`, `ProtectedRoute` |
| `useState` | Menyimpan data yang bisa berubah | Semua halaman |
| `useEffect` | Mengambil data dari API saat halaman dibuka | `HomePage`, `PostDetailPage`, `EditPostPage` |
| Controlled input | Menghubungkan input form dengan state | `LoginPage`, `RegisterPage`, `PostForm` |
| Conditional rendering | Menampilkan UI berdasarkan kondisi | `Navbar`, tombol Edit/Hapus, loading/error |
| List rendering + `key` | Menampilkan array data | `HomePage` |
| Context (`createContext`, `useContext`) | State global tanpa props drilling | `AuthContext` |
| Custom hook | Membungkus logika agar mudah dipakai ulang | `useAuth` |
| `BrowserRouter`, `Routes`, `Route` | Routing SPA | `main.jsx`, `App.jsx` |
| `Link`, `NavLink` | Navigasi tanpa reload | `Navbar`, `PostCard` |
| `useParams` | Membaca parameter URL | `PostDetailPage`, `EditPostPage` |
| `useNavigate`, `Navigate` | Pindah halaman lewat kode / redirect | Login, Register, `ProtectedRoute` |
| `useLocation` | Membaca state yang dikirim saat navigasi | `LoginPage` |
| `fetch`, `async/await`, `try/catch` | Komunikasi dengan API | `api.js` & semua halaman |
| Bearer Token (Sanctum) | Autentikasi API | `api.js`, `AuthContext` |
| `localStorage` | Menyimpan token agar tetap login | `AuthContext`, `api.js` |
| Tailwind CSS (utility class & varian `hover:`, `focus:`, `disabled:`) | Styling langsung di `className` | Semua komponen |

### Referensi

- Dokumentasi resmi React: [https://react.dev/learn](https://react.dev/learn)
- Dokumentasi Vite: [https://vite.dev/guide](https://vite.dev/guide)
- Dokumentasi React Router: [https://reactrouter.com](https://reactrouter.com)
- MDN — Using Fetch: [https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
- Dokumentasi Tailwind CSS (instalasi dengan Vite): [https://tailwindcss.com/docs/installation/using-vite](https://tailwindcss.com/docs/installation/using-vite)
- Laravel Sanctum (API Token): [https://laravel.com/docs/sanctum#api-token-authentication](https://laravel.com/docs/sanctum#api-token-authentication)
- MDN — CORS: [https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS)
