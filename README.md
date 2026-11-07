# Belajar Vibe Coding - Backend API

Proyek backend API berbasis **Bun**, **ElysiaJS**, **Drizzle ORM**, dan **MySQL**.

## Tech Stack
- **Runtime**: [Bun](https://bun.sh)
- **Web Framework**: [ElysiaJS](https://elysiajs.com)
- **ORM**: [Drizzle ORM](https://orm.drizzle.team)
- **Database**: MySQL (driver `mysql2`)
- **Schema & Migration Tool**: `drizzle-kit`

## Setup & Instalasi

1. Clone repositori dan masuk ke folder proyek:
   ```bash
   cd belajar-vibe-coding
   ```

2. Pasang dependensi menggunakan Bun:
   ```bash
   bun install
   ```

3. Konfigurasi Environment:
   Salin `.env.example` ke `.env` dan sesuaikan informasi kredensial MySQL Anda:
   ```bash
   cp .env.example .env
   ```

4. Generate atau Push Migrasi Database:
   ```bash
   # Push skema langsung ke database
   bun run db:push

   # Atau generate migrasi SQL file
   bun run db:generate
   bun run db:migrate
   ```

5. Jalankan server:
   ```bash
   # Development mode (watch mode)
   bun run dev

   # Production mode
   bun run start
   ```

## Endpoint API
- `GET /` : Endpoint utama / selamat datang
- `GET /health` : Health check server dan uptime
- `GET /health/db` : Pengecekan koneksi ke database MySQL
