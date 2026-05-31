# Panduan Lokasi File — Portfolio Habibi Ramadhani

Dokumen ini berisi peta lengkap lokasi setiap elemen website agar mudah diubah.

---

## Cara Menjalankan

Buka **2 terminal** secara bersamaan:

```powershell
# Terminal 1 — Backend Django
.\start-backend.ps1

# Terminal 2 — Frontend React
.\start-frontend.ps1
```

Buka browser: **http://localhost:5173**

---

## Struktur Folder

```
D:\KULIAH\poRtofolio\
├── backend\
│   ├── data\          ← Semua konten (JSON)  ← SERING DIEDIT
│   ├── media\         ← Semua gambar
│   ├── api\           ← Logic API Django
│   └── venv\          ← Virtual environment (jangan diedit)
├── frontend\
│   └── src\
│       ├── sections\  ← Tampilan tiap halaman ← SERING DIEDIT
│       ├── components\← Navbar, Footer, dll
│       ├── hooks\     ← Logic (useFetch, typewriter, dll)
│       └── context\   ← Dark mode
├── start-backend.ps1
├── start-frontend.ps1
└── panduan.md         ← File ini
```

---

## Data JSON — `backend\data\`

Ini adalah file yang paling sering diedit untuk mengubah konten website.

### `profile.json` — Identitas & kontak
| Field | Keterangan | Contoh |
|-------|-----------|--------|
| `name` | Nama pendek (ditampilkan di Hero) | `"Habibi"` |
| `full_name` | Nama lengkap | `"Habibi Ramadhani"` |
| `profession` | Profesi | `"Programmer & Web Developer"` |
| `domicile` | Kota tinggal | `"Pemalang, Indonesia"` |
| `education_summary` | Ringkasan pendidikan (di About) | `"S1 Informatika 2023"` |
| `field` | Bidang keahlian | `"Web Development & ..."` |
| `summary` | Deskripsi singkat (di Hero) | `"Programmer dan..."` |
| `photo` | Path foto profil | `"/media/profile.jpeg"` |
| `whatsapp` | Nomor WA tanpa `+` | `"6285292301037"` |
| `whatsapp_display` | WA yang ditampilkan | `"+62 852-9230-1037"` |
| `instagram` | Username IG (tanpa @) | `"habibiramadhani02"` |
| `instagram_url` | URL penuh Instagram | `"https://instagram.com/..."` |
| `github` | URL GitHub | `"https://github.com/bibirama20"` |
| `github_username` | Username GitHub | `"bibirama20"` |
| `linkedin` | URL LinkedIn (harus diawali `https://`) | `"https://www.linkedin.com/in/..."` |
| `email` | Alamat email | `"habibi.ramadhani02@gmail.com"` |

> **Penting:** LinkedIn harus diawali `https://` agar link berfungsi.

---

### `skills.json` — Keahlian
```json
{
  "hard_skills": [
    { "name": "Python", "category": "ai"    },
    { "name": "Django", "category": "web"   },
    { "name": "MySQL",  "category": "tools" }
  ],
  "soft_skills": ["Problem Solving", "Teamwork"]
}
```
| Nilai `category` | Tab yang muncul |
|-----------------|----------------|
| `"ai"` | AI & Machine Learning |
| `"web"` | Web Development |
| `"tools"` | Database & DevOps |

Untuk **menambah skill baru**, cukup tambah baris baru di `hard_skills`.
Untuk **icon otomatis**, pastikan `name` sama persis dengan daftar di [Skills.jsx:16-35].

---

### `projects.json` — Proyek akademik
Setiap proyek memiliki field:
| Field | Keterangan |
|-------|-----------|
| `id` | Angka unik (1, 2, 3, ...) |
| `title` | Nama proyek |
| `image` | Path gambar: `"/media/projects/namafile.png"` |
| `description` | Deskripsi singkat |
| `technologies` | Array teknologi: `["Django", "React"]` |
| `github_url` | Link repository GitHub |
| `year` | Tahun pengerjaan |

> **Tambah screenshot:** Simpan file PNG di `backend\media\projects\` lalu isi field `image`.
> Badge **AI / ML** muncul otomatis jika technologies mengandung Python/OpenCV/ML.

---

### `certificates.json` — Sertifikat
| Field | Keterangan |
|-------|-----------|
| `id` | Angka unik |
| `title` | Nama sertifikat |
| `issuer` | Penerbit (Coursera, Dicoding, dll) |
| `year` | Tahun |
| `image` | Path gambar: `"/media/cert-namafile.png"` |

> Simpan gambar sertifikat di `backend\media\` dengan nama yang sesuai.

---

### `education.json` — Pendidikan
| Field | Keterangan |
|-------|-----------|
| `institution` | Nama sekolah/universitas |
| `major` | Jurusan/program studi |
| `start_year` | Tahun masuk |
| `end_year` | Tahun lulus (`null` jika masih aktif) |
| `description` | Deskripsi singkat |

---

## Gambar — `backend\media\`

| File | Digunakan untuk |
|------|----------------|
| `profile.jpeg` | Foto profil di Hero |
| `cert-ibm-devops.png` | Sertifikat IBM DevOps |
| `cert-ml-python.png` | Sertifikat ML Python |
| `cert-eda-ml.png` | Sertifikat EDA ML |
| `cert-dicoding-ds.png` | Sertifikat Dicoding DS |
| `projects\*.png` | Screenshot proyek |

> Untuk **mengganti foto profil**: ganti file `profile.jpeg` (nama harus sama persis).

---

## Tampilan — `frontend\src\sections\`

### `Hero.jsx`
| Elemen | Cara ubah |
|--------|----------|
| Teks typewriter (peran) | Cari `const ROLES` di baris ~8 |
| Tech pills bawah nama | Cari `const INFO_PILLS` di baris ~15 |
| Badge atas ("Programmer & Web Developer") | Cari teks `Programmer &amp; Web Developer` di dalam JSX |
| Badge foto ("Web Developer") | Cari teks `Web Developer` di dalam JSX |
| Tombol CTA | Cari `btn-primary` dan `btn-outline` |

### `Skills.jsx`
| Elemen | Cara ubah |
|--------|----------|
| Tab kategori (label, icon, warna) | Cari `const CATEGORIES` di baris ~42 |
| Nama & icon per skill | Cari `const ICON_MAP` di baris ~16 |
| Deskripsi tab | Field `desc` di `CATEGORIES` |

### `Projects.jsx`
- Semua konten dari `backend\data\projects.json`
- Badge AI/ML otomatis jika keywords cocok (lihat `const AI_KEYWORDS`)

### `Certificates.jsx`
- Semua konten dari `backend\data\certificates.json`

### `Education.jsx`
- Semua konten dari `backend\data\education.json`

### `Contact.jsx`
| Elemen | Cara ubah |
|--------|----------|
| Daftar kontak & link | Cari `const CONTACT_CFG` di baris ~8 |
| Nama di footer (`© Habibi`) | Cari `gradient-text font-bold` dalam JSX |
| Tagline footer | Cari `Powered by spirit` |

---

## Komponen Shared — `frontend\src\components\`

### `Navbar.jsx`
| Elemen | Cara ubah |
|--------|----------|
| Logo nama (`Habibi.`) | Cari `gradient-text` di dalam logo button |
| Menu items | Cari `const NAV_ITEMS` di baris ~6 |

### `BackToTop.jsx`
- Tombol scroll ke atas, muncul otomatis setelah scroll 400px
- Ubah warna: cari `from-indigo-500 to-violet-600`

---

## Dark Mode
- Default: mengikuti preferensi sistem operasi
- Tombol toggle di pojok kanan navbar
- Preferensi tersimpan di browser (localStorage)
- File: `frontend\src\context\ThemeContext.jsx`

---

## Tips Umum

1. **Ubah konten** → Edit file JSON di `backend\data\`
2. **Ubah tampilan** → Edit file JSX di `frontend\src\sections\`
3. **Ubah warna utama** → Cari `from-indigo` atau `from-violet` di file sections
4. **Tambah proyek/sertifikat** → Tambah entry di JSON, taruh gambar di `media\`
5. **Setelah edit JSX** → Frontend auto-reload (tidak perlu restart)
6. **Setelah edit JSON** → Refresh browser (Ctrl+Shift+R)
