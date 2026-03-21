import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// ─── LESSON CONTENT ──────────────────────────────────────────────────────────

const L_APA_ITU_DB = `# Pengantar: Database, Tabel, dan SQL

> **Ringkasan:** Database adalah sistem penyimpanan data terstruktur. Data di dalamnya diorganisasikan dalam bentuk tabel dengan baris dan kolom. SQL adalah bahasa standar untuk mengambil dan menganalisis data tersebut — termasuk data blockchain di platform seperti Dune Analytics.

---

## Apa Itu Database?

**Database** (basis data) adalah sistem yang dirancang untuk menyimpan, mengelola, dan mengambil data secara efisien dan terstruktur.

Bayangkan sebuah perpustakaan digital: setiap buku memiliki tempat yang jelas, setiap informasi tercatat rapi, dan Anda dapat menemukan data apa pun dalam hitungan detik — itulah fungsi database.

Dalam konteks blockchain, platform seperti Dune Analytics telah mengindeks seluruh riwayat transaksi Ethereum, Polygon, Arbitrum, dan puluhan jaringan lainnya ke dalam database yang dapat di-query secara langsung.

---

## Struktur Data: Tabel, Kolom, dan Baris

Data dalam database disusun dalam bentuk **tabel**, mirip dengan spreadsheet. Setiap tabel terdiri dari:

- **Kolom (Column)**: mendefinisikan kategori atau atribut data
- **Baris (Row)**: merepresentasikan satu catatan atau entitas

Contoh tabel \`ethereum.transactions\` di Dune Analytics:

| tx_hash | from_address | to_address | value (wei) | block_time |
|---------|-------------|------------|-------------|------------|
| 0xabc123.. | 0x111aaa.. | 0x222bbb.. | 1500000000000000000 | 2024-01-15 10:00:00 |
| 0xdef456.. | 0x333ccc.. | 0x444ddd.. | 500000000000000000 | 2024-01-15 10:05:12 |
| 0xghi789.. | 0x555eee.. | 0x666fff.. | 3000000000000000000 | 2024-01-15 10:10:45 |

> **Catatan Penting — Satuan Wei:** Nilai ETH di blockchain disimpan dalam satuan **wei**, bukan ETH. Konversi: 1 ETH = 10¹⁸ wei (1,000,000,000,000,000,000). Selalu bagi nilai \`value\` dengan \`1e18\` untuk mendapatkan jumlah dalam ETH.

---

## Apa Itu SQL?

**SQL** (*Structured Query Language*, dibaca "sequel") adalah bahasa standar untuk berkomunikasi dengan database relasional. SQL memungkinkan pengguna untuk:

1. **Mengambil data** (SELECT) — mengekstrak informasi yang dibutuhkan
2. **Memfilter data** (WHERE) — membatasi hasil berdasarkan kondisi tertentu
3. **Mengelompokkan data** (GROUP BY) — merangkum data per kategori
4. **Mengurutkan data** (ORDER BY) — menyusun hasil sesuai kebutuhan

Contoh: untuk menemukan semua transaksi bernilai lebih dari 10 ETH dalam 7 hari terakhir, Anda cukup menuliskan:

\`\`\`sql
SELECT
    hash         AS tx_hash,
    "from"       AS pengirim,
    "to"         AS penerima,
    value / 1e18 AS jumlah_eth,
    block_time
FROM ethereum.transactions
WHERE value / 1e18 > 10
  AND block_time >= NOW() - INTERVAL '7' DAY
ORDER BY value DESC
LIMIT 50;
\`\`\`

---

## Mengapa SQL Penting bagi Analis On-Chain?

Seluruh platform analisis data blockchain terkemuka menggunakan SQL sebagai antarmuka utama:

| Platform | Dialek SQL | Keunggulan |
|----------|-----------|------------|
| **Dune Analytics** | Trino (DuneSQL) | Data multi-chain terlengkap, komunitas besar |
| **Footprint Analytics** | Standard SQL | Antarmuka no-code + SQL, fokus DeFi & GameFi |
| **Flipside Crypto** | Standard SQL | Reward program untuk analis |
| **Allium** | Standard SQL | Data berkualitas tinggi, API-first |

Dengan menguasai SQL, Anda dapat menjawab pertanyaan analisis seperti:

- Siapa saja *whale* terbesar yang bertransaksi di Uniswap minggu ini?
- Berapa total volume DEX di seluruh jaringan dalam 30 hari terakhir?
- Protokol DeFi mana yang mengalami pertumbuhan TVL tertinggi bulan ini?
- Apakah ada aktivitas *sandwich attack* yang terdeteksi dalam blok tertentu?

---

## Perbandingan Jenis Database

| Jenis | Contoh | Struktur | Penggunaan dalam Web3 |
|-------|--------|----------|----------------------|
| **Relasional (SQL)** | PostgreSQL, Trino | Tabel terstruktur | Dune, Footprint, Flipside |
| **Non-relasional (NoSQL)** | MongoDB, Redis | Dokumen, key-value | Node RPC, cache sistem |
| **Graph** | The Graph Protocol | Node dan Edge | Query smart contract events |

Data blockchain mentah (*raw data*) pada dasarnya tidak terstruktur. Platform seperti Dune telah melakukan proses **decoding** dan **normalisasi** sehingga data dapat di-query dengan SQL standar.

---

## Anatomi Query SQL

Setiap query SQL memiliki struktur yang konsisten dan dapat dibaca seperti kalimat bahasa Inggris:

\`\`\`sql
SELECT kolom_yang_diinginkan      -- PILIH kolom ini
FROM nama_tabel                   -- DARI tabel ini
WHERE kondisi_filter              -- DENGAN syarat ini
ORDER BY kolom_urutan DESC        -- URUTKAN berdasarkan ini
LIMIT 100;                        -- BATASI hasilnya
\`\`\`

Urutan penulisan klausa SQL bersifat wajib (tidak dapat diubah), namun hanya \`SELECT\` dan \`FROM\` yang bersifat wajib — klausa lainnya opsional.

---

## Ringkasan

| Konsep | Definisi |
|--------|----------|
| **Database** | Sistem penyimpanan data yang terorganisir dan dapat di-query |
| **Tabel** | Struktur data dalam bentuk baris dan kolom |
| **SQL** | Bahasa standar untuk mengambil dan menganalisis data |
| **DuneSQL** | Dialek SQL berbasis Trino yang digunakan di Dune Analytics |
| **Wei** | Satuan terkecil ETH; 1 ETH = 10¹⁸ wei |

Pada lesson berikutnya, Anda akan mempelajari klausa \`SELECT\` dan \`FROM\` secara mendalam — fondasi dari setiap query SQL.

---

## 🎯 Tantangan Praktik

Buka **Dune Analytics** (dune.com) dan coba selesaikan tantangan berikut menggunakan Query Editor.

### Tantangan 1 — Eksplorasi Struktur Tabel

Jalankan query berikut dan perhatikan seluruh kolom yang tersedia:

\`\`\`sql
SELECT *
FROM ethereum.transactions
LIMIT 5;
\`\`\`

**Pertanyaan eksplorasi:**
- Kolom apa saja yang tersedia pada tabel \`ethereum.transactions\`?
- Kolom mana yang menyimpan nilai transaksi dalam satuan wei?
- Apakah semua baris memiliki nilai pada kolom \`to\`? Mengapa ada yang kosong?

---

### Tantangan 2 — Konversi Wei ke ETH

Modifikasi query berikut sehingga kolom \`jumlah_eth\` menampilkan nilai yang benar:

\`\`\`sql
SELECT
    hash,
    "from"       AS pengirim,
    "to"         AS penerima,
    value / ???  AS jumlah_eth,  -- ganti ??? dengan nilai yang tepat
    block_time
FROM ethereum.transactions
WHERE value > 0
LIMIT 20;
\`\`\`

**Target hasil:** Kolom \`jumlah_eth\` seharusnya menampilkan angka antara 0 hingga ribuan (bukan angka 18 digit).

**Petunjuk:** 1 ETH = 10¹⁸ wei, sehingga pembagi yang tepat adalah \`1e18\`.

---

### Tantangan 3 (Bonus) — Temukan Transaksi Terbesar

Tulis query secara mandiri untuk menjawab pertanyaan berikut:

> *"Tampilkan 10 transaksi dengan nilai ETH terbesar yang terjadi dalam 24 jam terakhir."*

**Kolom yang perlu ditampilkan:** \`hash\`, \`pengirim\` (from), \`penerima\` (to), \`jumlah_eth\`, \`block_time\`

**Petunjuk:** Gunakan \`ORDER BY\` dan \`LIMIT\` yang telah Anda pelajari di ringkasan lesson ini.`;

const L_SELECT_FROM = `# SELECT dan FROM: Mengambil Data dari Tabel

> **Ringkasan:** \`SELECT\` menentukan kolom yang ingin ditampilkan, sedangkan \`FROM\` menentukan tabel sumber data. Kedua klausa ini adalah fondasi wajib dari setiap query SQL. Pada lesson ini, Anda juga akan mempelajari alias (\`AS\`), kalkulasi dalam query, dan praktik terbaik penggunaan \`LIMIT\`.

---

## Anatomi Query SELECT

Setiap query SQL dimulai dengan dua klausa wajib:

\`\`\`sql
SELECT kolom1, kolom2, kolom3
FROM nama_tabel;
\`\`\`

- **SELECT** — mendefinisikan kolom mana yang akan ditampilkan dalam hasil query
- **FROM** — mendefinisikan tabel sumber data yang akan dibaca

Analoginya seperti memesan makanan: SELECT adalah menu yang Anda pilih, FROM adalah restoran tempat Anda memesan.

---

## SELECT *: Mengambil Semua Kolom

Tanda bintang (\`*\`) pada SELECT berarti "ambil semua kolom yang tersedia":

\`\`\`sql
SELECT *
FROM ethereum.transactions
LIMIT 5;
\`\`\`

> **Perhatian:** Tabel blockchain seperti \`ethereum.transactions\` dapat memuat miliaran baris data. Penggunaan \`SELECT *\` tanpa \`LIMIT\` akan membebani sistem dan berpotensi menyebabkan *query timeout*. Selalu tambahkan \`LIMIT\` saat eksplorasi awal, dan ganti \`*\` dengan kolom spesifik pada query analisis.

---

## SELECT Kolom Tertentu

Praktik terbaik dalam analisis data adalah hanya memilih kolom yang benar-benar dibutuhkan. Hal ini mempercepat eksekusi query dan menghemat kuota komputasi:

\`\`\`sql
SELECT
    hash,
    "from",
    "to",
    value,
    block_time
FROM ethereum.transactions
LIMIT 100;
\`\`\`

> **Catatan DuneSQL:** Kolom \`from\` dan \`to\` merupakan *reserved words* dalam SQL. Di Dune Analytics, kedua kolom ini harus ditulis dengan tanda kutip ganda: \`"from"\` dan \`"to"\`. Mengabaikan aturan ini akan menghasilkan *syntax error*.

---

## Alias dengan AS: Memberi Nama yang Bermakna

Kolom hasil query dapat diberi nama baru menggunakan kata kunci \`AS\`. Alias berguna untuk membuat hasil query lebih mudah dibaca, terutama saat menampilkan hasil kalkulasi:

\`\`\`sql
SELECT
    hash                    AS tx_hash,
    "from"                  AS pengirim,
    "to"                    AS penerima,
    value / 1e18            AS jumlah_eth,
    block_time              AS waktu_transaksi
FROM ethereum.transactions
LIMIT 50;
\`\`\`

Hasil query di atas:

| tx_hash | pengirim | penerima | jumlah_eth | waktu_transaksi |
|---------|----------|----------|------------|-----------------|
| 0xabc123.. | 0x111aaa.. | 0x222bbb.. | 1.5 | 2024-01-15 10:00:00 |
| 0xdef456.. | 0x333ccc.. | 0x444ddd.. | 0.25 | 2024-01-15 10:05:12 |

---

## Kalkulasi Langsung dalam SELECT

Klausa SELECT tidak hanya dapat menampilkan kolom — Anda dapat melakukan operasi matematika secara langsung:

\`\`\`sql
SELECT
    hash,
    value / 1e18                AS jumlah_eth,
    value / 1e18 * 3500         AS estimasi_usd,   -- estimasi (1 ETH ≈ $3.500)
    gas_price / 1e9             AS gas_gwei,        -- konversi wei → Gwei
    gas_used * gas_price / 1e18 AS biaya_gas_eth    -- total biaya transaksi
FROM ethereum.transactions
WHERE value > 0
LIMIT 20;
\`\`\`

Operasi yang didukung: penjumlahan (\`+\`), pengurangan (\`-\`), perkalian (\`*\`), pembagian (\`/\`), dan modulo (\`%\`).

---

## LIMIT: Membatasi Jumlah Baris

\`LIMIT\` membatasi jumlah baris yang dikembalikan oleh query. Penggunaannya sangat dianjurkan, terutama saat:

1. Melakukan eksplorasi tabel baru
2. Memverifikasi logika query sebelum dijalankan pada dataset penuh
3. Menghindari *timeout* pada tabel berukuran besar

\`\`\`sql
-- Eksplorasi awal: lihat 5 baris pertama
SELECT *
FROM ethereum.transactions
LIMIT 5;

-- Analisis: ambil 1.000 baris untuk sampling
SELECT hash, "from", value / 1e18 AS eth
FROM ethereum.transactions
LIMIT 1000;
\`\`\`

---

## Query Lengkap: Studi Kasus

Berikut contoh query analitis yang menggabungkan seluruh konsep pada lesson ini:

\`\`\`sql
-- Tampilkan 20 transaksi ETH terbaru beserta estimasi nilainya dalam USD
SELECT
    hash                    AS tx_hash,
    "from"                  AS pengirim,
    "to"                    AS penerima,
    value / 1e18            AS jumlah_eth,
    value / 1e18 * 3500     AS estimasi_usd,
    gas_used * gas_price / 1e18 AS biaya_gas_eth,
    block_number,
    block_time              AS waktu
FROM ethereum.transactions
WHERE value > 0
LIMIT 20;
\`\`\`

---

## Ringkasan

| Klausa | Fungsi | Contoh |
|--------|--------|--------|
| \`SELECT *\` | Ambil semua kolom | \`SELECT * FROM tabel\` |
| \`SELECT kol1, kol2\` | Ambil kolom tertentu | \`SELECT hash, value FROM ...\` |
| \`AS alias\` | Beri nama baru pada kolom | \`value / 1e18 AS jumlah_eth\` |
| \`FROM\` | Tentukan sumber tabel | \`FROM ethereum.transactions\` |
| \`LIMIT n\` | Batasi jumlah baris hasil | \`LIMIT 100\` |

Pada lesson berikutnya, Anda akan mempelajari klausa \`WHERE\` untuk memfilter data berdasarkan kondisi tertentu — kemampuan esensial dalam setiap analisis on-chain.

---

## 🎯 Tantangan Praktik

Buka **Dune Analytics** (dune.com) dan selesaikan tantangan berikut.

### Tantangan 1 — Eksplorasi Kolom Tersedia

Jalankan query berikut, lalu catat seluruh nama kolom yang tersedia:

\`\`\`sql
SELECT *
FROM ethereum.transactions
LIMIT 3;
\`\`\`

**Pertanyaan:** Kolom apa saja yang ada? Kolom mana yang menyimpan alamat pengirim dan penerima?

---

### Tantangan 2 — Pilih dan Beri Alias

Tulis query yang menampilkan kolom \`hash\`, \`from\`, \`to\`, dan \`value\` — namun beri alias yang lebih deskriptif pada setiap kolom, serta konversikan \`value\` dari wei ke ETH.

**Petunjuk:** Gunakan \`AS\` dan operasi \`/ 1e18\`.

---

### Tantangan 3 (Bonus) — Kalkulasi Biaya Transaksi

Tulis query yang menampilkan biaya gas setiap transaksi dalam satuan ETH. Rumus: \`gas_used × gas_price / 1e18\`.

**Target:** Kolom hasil harus bernama \`biaya_gas_eth\` dan query hanya menampilkan transaksi dengan \`value > 0\`.`;

const L_WHERE = `# WHERE — Cara Filter Data

## Mengapa Perlu Filter?

Tabel \`ethereum.transactions\` berisi **miliaran baris** data. Kalau kita ambil semua data, query akan sangat lambat dan hasilnya tidak berguna.

**WHERE** adalah cara kita memberitahu database: *"Saya hanya mau data yang memenuhi syarat ini."*

Analogi: Seperti menyaring pasir — kita hanya ingin butiran emas, bukan semua pasir.

## Operator Perbandingan Dasar

\`\`\`sql
-- SAMA DENGAN (=)
SELECT * FROM ethereum.transactions
WHERE "from" = '0x28C6c06298d514Db089934071355E5743bf21d60'
LIMIT 20;

-- TIDAK SAMA DENGAN (!=  atau <>)
SELECT * FROM dex.trades
WHERE project != 'uniswap'
LIMIT 20;

-- LEBIH BESAR (>)
SELECT hash, value / 1e18 AS eth FROM ethereum.transactions
WHERE value / 1e18 > 100
LIMIT 20;

-- LEBIH KECIL (<)
SELECT hash, gas_price / 1e9 AS gwei FROM ethereum.transactions
WHERE gas_price / 1e9 < 10
LIMIT 20;

-- LEBIH BESAR SAMA DENGAN (>=)
SELECT * FROM dex.trades
WHERE amount_usd >= 100000
LIMIT 20;
\`\`\`

## BETWEEN — Range Nilai

Lebih bersih daripada menulis \`>= X AND <= Y\`:

\`\`\`sql
-- Transaksi antara 1 ETH dan 10 ETH
SELECT hash, value / 1e18 AS eth
FROM ethereum.transactions
WHERE value / 1e18 BETWEEN 1 AND 10
LIMIT 50;

-- Transaksi dalam range tanggal
SELECT hash, block_time
FROM ethereum.transactions
WHERE block_time BETWEEN TIMESTAMP '2024-01-01' AND TIMESTAMP '2024-01-31'
LIMIT 50;
\`\`\`

## IN — Daftar Nilai

Lebih efisien daripada banyak OR:

\`\`\`sql
-- DEX trades dari 3 chain sekaligus
SELECT blockchain, project, amount_usd
FROM dex.trades
WHERE blockchain IN ('ethereum', 'arbitrum', 'optimism')
LIMIT 50;

-- Token tertentu
SELECT * FROM tokens.transfers
WHERE symbol IN ('USDC', 'USDT', 'DAI', 'WETH')
LIMIT 50;

-- Kebalikannya: NOT IN
SELECT * FROM dex.trades
WHERE blockchain NOT IN ('ethereum')  -- semua chain kecuali Ethereum
LIMIT 50;
\`\`\`

## LIKE — Pattern Matching

Untuk mencari teks yang mengandung pola tertentu:

\`\`\`sql
-- Wallet yang namanya mengandung 'Binance'
SELECT address, name
FROM labels.addresses
WHERE name LIKE '%Binance%';  -- % = karakter apapun

-- Alamat yang diawali '0x28'
SELECT address FROM labels.addresses
WHERE address LIKE '0x28%';

-- Nama yang diakhiri 'Exchange'
SELECT name FROM labels.addresses
WHERE name LIKE '%Exchange';
\`\`\`

> 📝 **Simbol LIKE**:
> - \`%\` = nol atau lebih karakter apapun
> - \`_\` = tepat satu karakter

## IS NULL / IS NOT NULL

NULL berarti data tidak ada/kosong:

\`\`\`sql
-- Transaksi yang tidak memiliki label
SELECT t.hash, t."from"
FROM ethereum.transactions t
LEFT JOIN labels.addresses l ON t."from" = l.address
WHERE l.name IS NULL  -- address tidak ada di tabel labels
LIMIT 50;

-- Hanya yang punya label
WHERE l.name IS NOT NULL
\`\`\`

## AND & OR — Kombinasi Kondisi

\`\`\`sql
-- AND: kedua kondisi harus terpenuhi
SELECT hash, value / 1e18 AS eth, block_time
FROM ethereum.transactions
WHERE value / 1e18 > 10           -- lebih dari 10 ETH
  AND block_time >= NOW() - INTERVAL '7' DAY  -- 7 hari terakhir
LIMIT 50;

-- OR: salah satu kondisi terpenuhi
SELECT * FROM dex.trades
WHERE project = 'uniswap'
   OR project = 'sushiswap'
LIMIT 50;

-- Kombinasi AND & OR (gunakan kurung untuk kejelasan!)
SELECT * FROM dex.trades
WHERE (project = 'uniswap' OR project = 'curve')
  AND amount_usd > 10000
  AND blockchain = 'ethereum'
LIMIT 50;
\`\`\`

> ⚠️ **Penting**: Selalu gunakan tanda kurung \`()\` saat mengkombinasikan AND dan OR untuk menghindari kebingungan!

## Filter Waktu — WAJIB di Dune!

\`\`\`sql
-- ❌ BURUK: scan seluruh tabel (bisa timeout!)
SELECT * FROM ethereum.transactions WHERE "from" = '0x123..';

-- ✅ BAIK: selalu filter block_time
SELECT * FROM ethereum.transactions
WHERE "from" = '0x123..'
  AND block_time >= NOW() - INTERVAL '30' DAY;
\`\`\`

## Contoh Query Lengkap

\`\`\`sql
-- Cari semua swap besar di Uniswap v3 Ethereum minggu ini
SELECT
  block_time,
  token_bought_symbol AS beli,
  token_sold_symbol AS jual,
  amount_usd,
  tx_hash
FROM dex.trades
WHERE project = 'uniswap'
  AND version = '3'
  AND blockchain = 'ethereum'
  AND amount_usd > 100000         -- lebih dari $100K
  AND block_time >= NOW() - INTERVAL '7' DAY
ORDER BY amount_usd DESC
LIMIT 20;
\`\`\``;

const L_ORDER_BY = `# ORDER BY — Mengurutkan Hasil

## Mengapa Perlu Urutan?

Data di database tidak memiliki urutan natural — bisa acak. \`ORDER BY\` memungkinkan kita menampilkan data dalam urutan yang bermakna.

## ASC dan DESC

\`\`\`sql
-- ASC (Ascending) = terkecil ke terbesar (DEFAULT)
SELECT hash, value / 1e18 AS eth
FROM ethereum.transactions
WHERE block_time >= NOW() - INTERVAL '1' DAY
ORDER BY value ASC   -- dari terkecil
LIMIT 20;

-- DESC (Descending) = terbesar ke terkecil
SELECT hash, value / 1e18 AS eth
FROM ethereum.transactions
WHERE block_time >= NOW() - INTERVAL '1' DAY
ORDER BY value DESC  -- dari terbesar (whale dulu!)
LIMIT 20;
\`\`\`

## Order by Teks (Alphabetical)

\`\`\`sql
SELECT project, SUM(amount_usd) AS volume
FROM dex.trades
WHERE block_time >= NOW() - INTERVAL '7' DAY
GROUP BY project
ORDER BY project ASC;  -- urut A-Z
\`\`\`

## Order by Tanggal/Waktu

\`\`\`sql
-- Terbaru dulu (paling sering dipakai)
SELECT hash, block_time, value / 1e18 AS eth
FROM ethereum.transactions
WHERE "from" = '0x28C6c06298d514Db089934071355E5743bf21d60'
  AND block_time >= NOW() - INTERVAL '30' DAY
ORDER BY block_time DESC
LIMIT 50;

-- Terlama dulu
ORDER BY block_time ASC
\`\`\`

## Multiple ORDER BY

Urutan prioritas: kolom pertama dulu, jika sama baru kolom kedua:

\`\`\`sql
SELECT
  blockchain,
  project,
  SUM(amount_usd) AS volume
FROM dex.trades
WHERE block_time >= NOW() - INTERVAL '7' DAY
GROUP BY blockchain, project
ORDER BY
  blockchain ASC,    -- urut per chain dulu (A-Z)
  volume DESC;       -- dalam chain yang sama, volume terbesar dulu
\`\`\`

## ORDER BY dengan Alias

Bisa pakai nama alias yang sudah didefinisikan di SELECT:

\`\`\`sql
SELECT
  "from" AS wallet,
  COUNT(*) AS jumlah_tx,
  SUM(value) / 1e18 AS total_eth
FROM ethereum.transactions
WHERE block_time >= NOW() - INTERVAL '30' DAY
GROUP BY "from"
ORDER BY total_eth DESC  -- pakai alias
LIMIT 20;
\`\`\`

## Kombinasi Lengkap: SELECT + FROM + WHERE + ORDER BY + LIMIT

\`\`\`sql
-- Top 10 whale swap di Uniswap bulan ini
SELECT
  block_time AS waktu,
  token_bought_symbol AS token_dibeli,
  token_sold_symbol AS token_dijual,
  ROUND(amount_usd, 2) AS nilai_usd,
  tx_hash
FROM dex.trades
WHERE project = 'uniswap'
  AND blockchain = 'ethereum'
  AND block_time >= NOW() - INTERVAL '30' DAY
  AND amount_usd > 0
ORDER BY amount_usd DESC
LIMIT 10;
\`\`\``;

const L_AGREGAT = `# Fungsi Agregat: COUNT, SUM, AVG, MAX, MIN

## Apa itu Fungsi Agregat?

Fungsi agregat melakukan **perhitungan pada sekumpulan baris** dan mengembalikan **satu nilai**.

Analogi: Kamu punya 100 struk belanja. Fungsi agregat menjawab:
- COUNT → ada berapa struk?
- SUM → total belanja berapa?
- AVG → rata-rata belanja berapa?
- MAX → belanja terbesar berapa?
- MIN → belanja terkecil berapa?

## COUNT — Menghitung Jumlah

\`\`\`sql
-- Hitung total transaksi 24 jam terakhir
SELECT COUNT(*) AS total_transaksi
FROM ethereum.transactions
WHERE block_time >= NOW() - INTERVAL '1' DAY;

-- COUNT(*) vs COUNT(kolom)
-- COUNT(*) = hitung semua baris termasuk NULL
-- COUNT(kolom) = hitung baris yang tidak NULL

-- Hitung berapa address unik yang bertransaksi
SELECT COUNT(DISTINCT "from") AS unique_senders
FROM ethereum.transactions
WHERE block_time >= NOW() - INTERVAL '7' DAY;
\`\`\`

## SUM — Total Nilai

\`\`\`sql
-- Total volume ETH yang ditransfer hari ini
SELECT SUM(value) / 1e18 AS total_eth
FROM ethereum.transactions
WHERE block_time >= NOW() - INTERVAL '1' DAY;

-- Total volume DEX dalam USD 30 hari terakhir
SELECT SUM(amount_usd) AS total_volume_usd
FROM dex.trades
WHERE block_time >= NOW() - INTERVAL '30' DAY
  AND blockchain = 'ethereum';
\`\`\`

## AVG — Rata-Rata

\`\`\`sql
-- Rata-rata nilai transaksi dalam ETH
SELECT AVG(value) / 1e18 AS avg_eth_per_tx
FROM ethereum.transactions
WHERE block_time >= NOW() - INTERVAL '7' DAY
  AND value > 0;

-- Rata-rata trade size di Uniswap
SELECT AVG(amount_usd) AS avg_trade_usd
FROM dex.trades
WHERE project = 'uniswap'
  AND block_time >= NOW() - INTERVAL '30' DAY;
\`\`\`

## MAX & MIN — Nilai Terbesar dan Terkecil

\`\`\`sql
-- Transaksi terbesar dan terkecil hari ini
SELECT
  MAX(value) / 1e18 AS transaksi_terbesar_eth,
  MIN(value) / 1e18 AS transaksi_terkecil_eth
FROM ethereum.transactions
WHERE block_time >= NOW() - INTERVAL '1' DAY
  AND value > 0;

-- Kombinasi semua fungsi sekaligus
SELECT
  COUNT(*) AS jumlah_tx,
  SUM(amount_usd) AS total_volume,
  AVG(amount_usd) AS rata_rata,
  MAX(amount_usd) AS terbesar,
  MIN(amount_usd) AS terkecil
FROM dex.trades
WHERE block_time >= NOW() - INTERVAL '7' DAY
  AND blockchain = 'ethereum';
\`\`\`

## GROUP BY — Kelompokkan Data

GROUP BY mengubah agregasi dari "satu angka untuk semua data" menjadi "satu angka per kelompok".

\`\`\`sql
-- Volume DEX per protokol
SELECT
  project AS protokol,
  COUNT(*) AS jumlah_swap,
  SUM(amount_usd) AS total_volume_usd,
  AVG(amount_usd) AS rata_rata_swap_usd
FROM dex.trades
WHERE block_time >= NOW() - INTERVAL '7' DAY
  AND blockchain = 'ethereum'
GROUP BY project
ORDER BY total_volume_usd DESC;
\`\`\`

Hasilnya:
| protokol | jumlah_swap | total_volume_usd | rata_rata_swap_usd |
|----------|-------------|------------------|---------------------|
| uniswap | 850,000 | 2,500,000,000 | 2,941 |
| curve | 120,000 | 800,000,000 | 6,667 |
| sushiswap | 45,000 | 150,000,000 | 3,333 |

\`\`\`sql
-- Volume per hari (time series)
SELECT
  DATE_TRUNC('day', block_time) AS hari,
  COUNT(*) AS jumlah_tx,
  SUM(value) / 1e18 AS total_eth
FROM ethereum.transactions
WHERE block_time >= NOW() - INTERVAL '30' DAY
GROUP BY DATE_TRUNC('day', block_time)
ORDER BY hari ASC;
\`\`\`

## HAVING — Filter Setelah GROUP BY

WHERE memfilter **sebelum** GROUP BY. HAVING memfilter **setelah** GROUP BY.

\`\`\`sql
-- Cari wallet yang mengirim lebih dari 50 transaksi minggu ini
SELECT
  "from" AS wallet,
  COUNT(*) AS jumlah_tx,
  SUM(value) / 1e18 AS total_eth_dikirim
FROM ethereum.transactions
WHERE block_time >= NOW() - INTERVAL '7' DAY  -- WHERE: filter dulu
GROUP BY "from"
HAVING COUNT(*) > 50                          -- HAVING: filter setelah group
ORDER BY jumlah_tx DESC
LIMIT 20;
\`\`\`

> 💡 **Aturan Sederhana**:
> - Filter berdasarkan data **asli** → pakai **WHERE**
> - Filter berdasarkan **hasil agregasi** (COUNT, SUM, dll) → pakai **HAVING**`;

const L_JOIN = `# JOIN Table — Menggabungkan Data dari Beberapa Tabel

## Mengapa Perlu JOIN?

Data sering tersebar di beberapa tabel. Contoh:
- Tabel \`ethereum.transactions\` → data transaksi
- Tabel \`labels.addresses\` → nama/label wallet
- Tabel \`tokens.erc20\` → informasi token

JOIN memungkinkan kita **menggabungkan** tabel-tabel ini berdasarkan kolom yang sama (biasanya address atau ID).

Analogi: Kamu punya dua buku catatan:
- Buku A: nomor telepon teman
- Buku B: alamat rumah teman

JOIN = mencocokkan nama di kedua buku untuk mendapat info lengkap.

## INNER JOIN — Hanya yang Cocok di Kedua Tabel

\`\`\`sql
-- Tampilkan transaksi beserta nama pengirimnya
-- Hanya tampilkan jika pengirim ADA di tabel labels
SELECT
  t.hash AS tx_hash,
  t.value / 1e18 AS eth_amount,
  t.block_time,
  l.name AS sender_name
FROM ethereum.transactions t
INNER JOIN labels.addresses l
  ON t."from" = l.address      -- kolom penghubung
WHERE t.block_time >= NOW() - INTERVAL '7' DAY
  AND t.value / 1e18 > 10
LIMIT 50;
\`\`\`

> Perhatikan: Kita menggunakan **alias tabel** (\`t\` dan \`l\`) agar query lebih singkat.

## LEFT JOIN — Semua Baris Kiri, NULL jika Tidak Ada Pasangan

LEFT JOIN paling sering dipakai! Mengambil semua baris dari tabel kiri, dan data dari tabel kanan jika ada (NULL jika tidak ada).

\`\`\`sql
-- Tampilkan SEMUA transaksi besar, baik yang ada labelnya maupun tidak
SELECT
  t.hash,
  t.value / 1e18 AS eth,
  t."from" AS sender_address,
  COALESCE(l.name, 'Unknown/Unlabeled') AS sender_name
FROM ethereum.transactions t
LEFT JOIN labels.addresses l
  ON t."from" = l.address
WHERE t.block_time >= NOW() - INTERVAL '1' DAY
  AND t.value / 1e18 > 100
ORDER BY t.value DESC
LIMIT 30;
\`\`\`

Hasilnya:
| tx_hash | eth | sender_address | sender_name |
|---------|-----|----------------|-------------|
| 0xabc.. | 500 | 0x28C6.. | Binance 14 |
| 0xdef.. | 200 | 0x1234.. | **Unknown/Unlabeled** |
| 0xghi.. | 150 | 0x5678.. | Coinbase 5 |

## RIGHT JOIN & FULL OUTER JOIN

\`\`\`sql
-- RIGHT JOIN: semua baris kanan, NULL jika tidak ada di kiri
-- (jarang dipakai, biasanya bisa diganti LEFT JOIN dengan urutan tabel dibalik)

-- FULL OUTER JOIN: semua baris dari kedua tabel
SELECT t.hash, l.name
FROM ethereum.transactions t
FULL OUTER JOIN labels.addresses l ON t."from" = l.address
WHERE t.block_time >= NOW() - INTERVAL '1' DAY
LIMIT 50;
\`\`\`

## JOIN 3 Tabel atau Lebih

\`\`\`sql
-- Gabungkan DEX trades + label pengirim + label penerima
SELECT
  tr.block_time,
  tr.amount_usd,
  tr.token_bought_symbol AS token,
  buyer_label.name AS buyer_name,
  COALESCE(buyer_label.name, 'Unknown') AS buyer
FROM dex.trades tr
LEFT JOIN labels.addresses buyer_label
  ON tr.taker = buyer_label.address
WHERE tr.block_time >= NOW() - INTERVAL '7' DAY
  AND tr.amount_usd > 50000
ORDER BY tr.amount_usd DESC
LIMIT 20;
\`\`\`

## Self JOIN — Tabel Join dengan Dirinya Sendiri

Berguna untuk membandingkan baris dalam tabel yang sama:

\`\`\`sql
-- Cari wallet yang saling berinteraksi lebih dari 5 kali
SELECT
  a."from" AS wallet_a,
  a."to" AS wallet_b,
  COUNT(*) AS jumlah_interaksi
FROM ethereum.transactions a
JOIN ethereum.transactions b
  ON a."from" = b."to"
  AND a."to" = b."from"
WHERE a.block_time >= NOW() - INTERVAL '30' DAY
GROUP BY a."from", a."to"
HAVING COUNT(*) > 5
ORDER BY jumlah_interaksi DESC
LIMIT 20;
\`\`\`

## Tips JOIN

| Situasi | Gunakan |
|---------|---------|
| Mau data dari kedua tabel, dan keduanya harus cocok | INNER JOIN |
| Mau semua data dari tabel utama + info tambahan (kalau ada) | LEFT JOIN |
| Mau semua data dari kedua tabel | FULL OUTER JOIN |

> 💡 **90% kasus, LEFT JOIN adalah pilihan yang tepat!**`;

const L_SUBQUERY = `# Subquery — Query di Dalam Query

## Apa itu Subquery?

Subquery adalah query SQL yang **ditulis di dalam query lain**. Bayangkan seperti kalimat bersarang:

*"Tampilkan transaksi dari wallet yang [pernah melakukan swap lebih dari $1 juta]."*

Bagian dalam kurung siku adalah subquery!

## Subquery di WHERE

\`\`\`sql
-- Cari wallet yang pernah melakukan swap > $1 juta di Uniswap
SELECT
  "from" AS wallet,
  hash AS tx_hash,
  value / 1e18 AS eth_amount,
  block_time
FROM ethereum.transactions
WHERE block_time >= NOW() - INTERVAL '7' DAY
  AND "from" IN (
    -- Subquery: cari whale wallets dari Uniswap
    SELECT DISTINCT taker
    FROM dex.trades
    WHERE project = 'uniswap'
      AND amount_usd > 1000000
      AND block_time >= NOW() - INTERVAL '30' DAY
  )
ORDER BY block_time DESC
LIMIT 50;
\`\`\`

## Subquery di FROM (Derived Table)

\`\`\`sql
-- Ambil wallet dengan total ETH > 1000, lalu filter lebih lanjut
SELECT
  wallet,
  total_eth,
  CASE
    WHEN total_eth > 10000 THEN 'Mega Whale'
    WHEN total_eth > 1000  THEN 'Whale'
    ELSE 'Large Holder'
  END AS kategori
FROM (
  -- Subquery: hitung total ETH per wallet
  SELECT
    "from" AS wallet,
    SUM(value) / 1e18 AS total_eth
  FROM ethereum.transactions
  WHERE block_time >= NOW() - INTERVAL '90' DAY
  GROUP BY "from"
  HAVING SUM(value) / 1e18 > 1000
) big_senders
ORDER BY total_eth DESC
LIMIT 50;
\`\`\`

## Subquery di SELECT

\`\`\`sql
-- Bandingkan volume Uniswap dengan total pasar
SELECT
  project,
  SUM(amount_usd) AS volume_project,
  (SELECT SUM(amount_usd) FROM dex.trades
   WHERE block_time >= NOW() - INTERVAL '7' DAY
   AND blockchain = 'ethereum') AS total_market_volume,
  SUM(amount_usd) * 100.0 /
    (SELECT SUM(amount_usd) FROM dex.trades
     WHERE block_time >= NOW() - INTERVAL '7' DAY
     AND blockchain = 'ethereum') AS market_share_pct
FROM dex.trades
WHERE block_time >= NOW() - INTERVAL '7' DAY
  AND blockchain = 'ethereum'
GROUP BY project
ORDER BY volume_project DESC
LIMIT 10;
\`\`\``;

const L_CTE = `# CTE dengan WITH — Query yang Rapi dan Mudah Dibaca

## Masalah dengan Subquery

Subquery bisa menjadi sangat sulit dibaca jika nested terlalu dalam:

\`\`\`sql
-- Susah dibaca!
SELECT wallet, total_eth FROM (
  SELECT "from" AS wallet, SUM(value)/1e18 AS total_eth FROM (
    SELECT * FROM ethereum.transactions WHERE value > 0
  ) filtered GROUP BY "from"
) summary WHERE total_eth > 100;
\`\`\`

## Solusi: CTE dengan WITH

CTE (Common Table Expression) memecah query kompleks menjadi bagian-bagian bernama yang mudah dipahami:

\`\`\`sql
-- Sama persis, tapi JAUH lebih mudah dibaca!
WITH filtered_txs AS (
  SELECT * FROM ethereum.transactions
  WHERE value > 0
    AND block_time >= NOW() - INTERVAL '30' DAY
),

wallet_summary AS (
  SELECT
    "from" AS wallet,
    SUM(value) / 1e18 AS total_eth,
    COUNT(*) AS tx_count
  FROM filtered_txs
  GROUP BY "from"
)

SELECT wallet, total_eth, tx_count
FROM wallet_summary
WHERE total_eth > 100
ORDER BY total_eth DESC
LIMIT 20;
\`\`\`

## Multiple CTE (Chaining)

\`\`\`sql
WITH
-- Step 1: Data mentah DEX 30 hari terakhir
raw_trades AS (
  SELECT block_time, project, amount_usd, taker
  FROM dex.trades
  WHERE block_time >= NOW() - INTERVAL '30' DAY
    AND blockchain = 'ethereum'
    AND amount_usd > 0
),

-- Step 2: Hitung volume per protokol
protocol_volume AS (
  SELECT
    project,
    SUM(amount_usd) AS total_volume,
    COUNT(*) AS trade_count
  FROM raw_trades
  GROUP BY project
),

-- Step 3: Hitung total pasar
total_market AS (
  SELECT SUM(total_volume) AS market_total
  FROM protocol_volume
)

-- Query final: gabungkan semua
SELECT
  p.project,
  p.total_volume,
  p.trade_count,
  ROUND(p.total_volume * 100.0 / t.market_total, 2) AS market_share_pct
FROM protocol_volume p
CROSS JOIN total_market t
ORDER BY p.total_volume DESC;
\`\`\`

## Kapan Pakai CTE vs Subquery?

| Situasi | Pilihan |
|---------|---------|
| Logic sederhana, 1 level | Subquery boleh |
| Logic kompleks, 2+ level | **CTE lebih baik** |
| Perlu referensikan hasil yang sama berkali-kali | **CTE wajib** |
| Perlu dokumentasi/readable untuk tim | **CTE lebih baik** |

> 💡 **Best Practice**: Di dunia analisis on-chain profesional, hampir semua query kompleks menggunakan CTE. Biasakan menulis CTE dari sekarang!`;

const L_WINDOW = `# Window Functions — Analisis Lanjutan Tanpa Menggabungkan Baris

## Apa Bedanya dengan GROUP BY?

\`\`\`sql
-- GROUP BY: 1000 baris → menjadi 10 baris (data tergabung)
SELECT project, COUNT(*) AS trades FROM dex.trades GROUP BY project;

-- Window Function: 1000 baris → TETAP 1000 baris (data tidak tergabung)
SELECT project, COUNT(*) OVER (PARTITION BY project) AS trades FROM dex.trades;
\`\`\`

Window function menghitung nilai berdasarkan "jendela" baris yang terkait, tanpa mengurangi jumlah baris.

## OVER() — Sintaks Dasar

\`\`\`sql
SELECT
  block_time,
  amount_usd,
  -- Total semua swap (satu angka untuk semua baris)
  SUM(amount_usd) OVER () AS total_volume_all
FROM dex.trades
WHERE block_time >= NOW() - INTERVAL '1' DAY
  AND blockchain = 'ethereum'
LIMIT 20;
\`\`\`

## PARTITION BY — Grup di dalam Window

\`\`\`sql
SELECT
  block_time,
  project,
  amount_usd,
  -- Total per protokol (bukan total semua)
  SUM(amount_usd) OVER (PARTITION BY project) AS volume_per_protokol,
  -- Market share setiap baris
  amount_usd * 100.0 / SUM(amount_usd) OVER () AS market_share_pct
FROM dex.trades
WHERE block_time >= NOW() - INTERVAL '1' DAY
  AND blockchain = 'ethereum'
LIMIT 50;
\`\`\`

## ROW_NUMBER, RANK, DENSE_RANK

\`\`\`sql
WITH wallet_volume AS (
  SELECT
    taker AS wallet,
    SUM(amount_usd) AS total_volume
  FROM dex.trades
  WHERE block_time >= NOW() - INTERVAL '30' DAY
  GROUP BY taker
)
SELECT
  wallet,
  total_volume,
  ROW_NUMBER() OVER (ORDER BY total_volume DESC) AS row_num,
  RANK() OVER (ORDER BY total_volume DESC) AS rank_val,
  DENSE_RANK() OVER (ORDER BY total_volume DESC) AS dense_rank_val
FROM wallet_volume
LIMIT 20;
\`\`\`

Perbedaan jika ada nilai yang sama (tie):
| Wallet | Volume | ROW_NUMBER | RANK | DENSE_RANK |
|--------|--------|------------|------|------------|
| A | 1000 | 1 | 1 | 1 |
| B | 900 | 2 | 2 | 2 |
| C | 900 | 3 | 2 | 2 |
| D | 800 | 4 | **4** | **3** |

- RANK: melewati nomor setelah tie (2,2,4)
- DENSE_RANK: tidak melewati nomor (2,2,3)

## LAG & LEAD — Nilai Baris Lain

\`\`\`sql
-- LAG = nilai dari baris SEBELUMNYA
-- LEAD = nilai dari baris BERIKUTNYA
WITH daily_volume AS (
  SELECT
    DATE_TRUNC('day', block_time) AS day,
    SUM(amount_usd) AS volume
  FROM dex.trades
  WHERE block_time >= NOW() - INTERVAL '30' DAY
    AND blockchain = 'ethereum'
  GROUP BY 1
)
SELECT
  day,
  volume,
  LAG(volume) OVER (ORDER BY day) AS volume_kemarin,
  volume - LAG(volume) OVER (ORDER BY day) AS perubahan,
  ROUND((volume - LAG(volume) OVER (ORDER BY day)) * 100.0
    / LAG(volume) OVER (ORDER BY day), 2) AS pct_change
FROM daily_volume
ORDER BY day;
\`\`\`

## Running Total (Kumulatif)

\`\`\`sql
WITH daily AS (
  SELECT
    DATE_TRUNC('day', block_time) AS day,
    SUM(amount_usd) AS daily_volume
  FROM dex.trades
  WHERE block_time >= NOW() - INTERVAL '30' DAY
    AND blockchain = 'ethereum'
  GROUP BY 1
)
SELECT
  day,
  daily_volume,
  SUM(daily_volume) OVER (ORDER BY day) AS cumulative_volume
FROM daily
ORDER BY day;
\`\`\``;

const L_DATE = `# Fungsi Tanggal & Waktu

## Mengapa Tanggal Penting di Blockchain?

Hampir semua analisis on-chain melibatkan dimensi waktu:
- Volume hari ini vs kemarin
- Trend 30 hari terakhir
- Aktivitas per jam

## DATE_TRUNC — Bulatkan Waktu

\`\`\`sql
-- Bulatkan ke berbagai level
SELECT
  DATE_TRUNC('second', NOW()) AS per_detik,
  DATE_TRUNC('minute', NOW()) AS per_menit,
  DATE_TRUNC('hour', NOW()) AS per_jam,
  DATE_TRUNC('day', NOW()) AS per_hari,
  DATE_TRUNC('week', NOW()) AS per_minggu,
  DATE_TRUNC('month', NOW()) AS per_bulan,
  DATE_TRUNC('year', NOW()) AS per_tahun;

-- Paling sering dipakai: group by hari
SELECT
  DATE_TRUNC('day', block_time) AS tanggal,
  COUNT(*) AS jumlah_tx,
  SUM(amount_usd) AS volume_usd
FROM dex.trades
WHERE block_time >= NOW() - INTERVAL '30' DAY
  AND blockchain = 'ethereum'
GROUP BY DATE_TRUNC('day', block_time)
ORDER BY tanggal ASC;
\`\`\`

## EXTRACT — Ambil Bagian Tertentu

\`\`\`sql
SELECT
  EXTRACT(year FROM block_time) AS tahun,
  EXTRACT(month FROM block_time) AS bulan,     -- 1-12
  EXTRACT(day FROM block_time) AS hari,        -- 1-31
  EXTRACT(hour FROM block_time) AS jam,        -- 0-23
  EXTRACT(dow FROM block_time) AS hari_minggu  -- 0=Minggu, 1=Senin, ..., 6=Sabtu
FROM ethereum.transactions
LIMIT 10;

-- Contoh: analisis aktivitas per jam
SELECT
  EXTRACT(hour FROM block_time) AS jam,
  COUNT(*) AS jumlah_tx
FROM dex.trades
WHERE block_time >= NOW() - INTERVAL '7' DAY
  AND blockchain = 'ethereum'
GROUP BY EXTRACT(hour FROM block_time)
ORDER BY jam;
\`\`\`

## NOW(), CURRENT_DATE, CURRENT_TIMESTAMP

\`\`\`sql
SELECT
  NOW() AS waktu_sekarang,          -- timestamp dengan timezone
  CURRENT_DATE AS hari_ini,         -- hanya tanggal
  CURRENT_TIMESTAMP AS timestamp_now; -- sama dengan NOW()

-- Filter waktu yang sering dipakai
WHERE block_time >= NOW() - INTERVAL '1' DAY    -- 24 jam terakhir
WHERE block_time >= NOW() - INTERVAL '7' DAY    -- 7 hari terakhir
WHERE block_time >= NOW() - INTERVAL '30' DAY   -- 30 hari terakhir
WHERE block_time >= NOW() - INTERVAL '90' DAY   -- 3 bulan terakhir
WHERE block_time >= NOW() - INTERVAL '1' YEAR   -- 1 tahun terakhir
\`\`\``;

const L_STRING = `# Fungsi String & Konversi Tipe Data

## Fungsi String Dasar

\`\`\`sql
SELECT
  LOWER('0xABCDEF123') AS lowercase,    -- '0xabcdef123'
  UPPER('0xabcdef123') AS uppercase,    -- '0XABCDEF123'
  LENGTH('0x1234567890') AS panjang,    -- 12
  SUBSTR('0xabcdef1234', 3, 6) AS sub,  -- 'abcdef' (mulai pos 3, 6 karakter)
  CONCAT('0x', 'abcdef') AS gabung,     -- '0xabcdef'
  REPLACE('0x1234', '0x', '') AS bersih -- '1234'
\`\`\`

## Manipulasi Address Ethereum

\`\`\`sql
-- Normalisasi address (selalu lowercase)
SELECT
  LOWER(address) AS normalized_address,
  name
FROM labels.addresses
WHERE LOWER(name) LIKE '%binance%';

-- Ambil prefix address (8 karakter pertama)
SELECT
  address,
  SUBSTR(CAST(address AS VARCHAR), 1, 8) AS prefix
FROM labels.addresses
LIMIT 20;
\`\`\`

## CAST & Konversi Tipe

\`\`\`sql
-- CAST ke tipe lain
SELECT
  CAST('123' AS BIGINT) AS string_ke_integer,
  CAST(123 AS VARCHAR) AS integer_ke_string,
  CAST('2024-01-01' AS DATE) AS string_ke_date,
  CAST(1.5 AS INTEGER) AS float_ke_int;  -- 1 (dibulatkan)

-- Konversi hex ke decimal (PENTING di Dune!)
-- from_hex() mengkonversi hex string ke bytes
-- bytearray_to_bigint() mengkonversi bytes ke integer
SELECT
  '0xFF' AS hex_val,
  255 AS decimal_val;  -- 0xFF = 255 dalam decimal
\`\`\`

## COALESCE — Ganti NULL dengan Default

\`\`\`sql
SELECT
  address,
  COALESCE(name, 'Unknown Wallet') AS label,
  COALESCE(category, 'Uncategorized') AS cat
FROM (
  SELECT t."from" AS address, l.name, l.category
  FROM ethereum.transactions t
  LEFT JOIN labels.addresses l ON t."from" = l.address
  WHERE t.block_time >= NOW() - INTERVAL '1' DAY
) combined
LIMIT 50;
\`\`\``;

const L_CASE_WHEN = `# CASE WHEN — Logika Kondisional dalam SQL

## Apa itu CASE WHEN?

CASE WHEN adalah cara menulis logika "jika...maka..." dalam SQL. Seperti rumus IF di Excel, tapi lebih powerful.

\`\`\`sql
CASE
  WHEN kondisi_1 THEN hasil_1
  WHEN kondisi_2 THEN hasil_2
  WHEN kondisi_3 THEN hasil_3
  ELSE hasil_default  -- jika tidak ada yang cocok
END
\`\`\`

## Kategorisasi Whale

\`\`\`sql
SELECT
  hash,
  value / 1e18 AS eth_amount,
  CASE
    WHEN value / 1e18 >= 10000 THEN '🐋 Mega Whale (>10K ETH)'
    WHEN value / 1e18 >= 1000  THEN '🐳 Whale (1K-10K ETH)'
    WHEN value / 1e18 >= 100   THEN '🐟 Large (100-1K ETH)'
    WHEN value / 1e18 >= 10    THEN '🐠 Medium (10-100 ETH)'
    ELSE '🦐 Small (<10 ETH)'
  END AS ukuran_transaksi
FROM ethereum.transactions
WHERE block_time >= NOW() - INTERVAL '1' DAY
  AND value > 0
ORDER BY value DESC
LIMIT 50;
\`\`\`

## CASE dalam Agregasi (Conditional Aggregation)

\`\`\`sql
-- Hitung volume per chain dalam satu baris
SELECT
  DATE_TRUNC('day', block_time) AS day,
  SUM(CASE WHEN blockchain = 'ethereum' THEN amount_usd ELSE 0 END) AS eth_volume,
  SUM(CASE WHEN blockchain = 'arbitrum' THEN amount_usd ELSE 0 END) AS arb_volume,
  SUM(CASE WHEN blockchain = 'optimism' THEN amount_usd ELSE 0 END) AS op_volume,
  SUM(CASE WHEN blockchain = 'polygon'  THEN amount_usd ELSE 0 END) AS poly_volume
FROM dex.trades
WHERE block_time >= NOW() - INTERVAL '30' DAY
GROUP BY DATE_TRUNC('day', block_time)
ORDER BY day;
\`\`\`

## UNION ALL — Gabungkan Hasil Query

\`\`\`sql
-- Gabungkan aktivitas dari beberapa chain
SELECT 'ethereum' AS chain, COUNT(*) AS tx_count, SUM(amount_usd) AS volume
FROM dex.trades
WHERE blockchain = 'ethereum' AND block_time >= NOW() - INTERVAL '7' DAY

UNION ALL

SELECT 'arbitrum' AS chain, COUNT(*) AS tx_count, SUM(amount_usd) AS volume
FROM dex.trades
WHERE blockchain = 'arbitrum' AND block_time >= NOW() - INTERVAL '7' DAY

UNION ALL

SELECT 'polygon' AS chain, COUNT(*) AS tx_count, SUM(amount_usd) AS volume
FROM dex.trades
WHERE blockchain = 'polygon' AND block_time >= NOW() - INTERVAL '7' DAY

ORDER BY volume DESC;
\`\`\`

## INTERSECT & EXCEPT

\`\`\`sql
-- INTERSECT: wallet yang aktif di KEDUA Ethereum DAN Arbitrum
SELECT DISTINCT taker FROM dex.trades
WHERE blockchain = 'ethereum' AND block_time >= NOW() - INTERVAL '30' DAY
INTERSECT
SELECT DISTINCT taker FROM dex.trades
WHERE blockchain = 'arbitrum' AND block_time >= NOW() - INTERVAL '30' DAY;

-- EXCEPT: wallet di Ethereum tapi TIDAK di Arbitrum
SELECT DISTINCT taker FROM dex.trades
WHERE blockchain = 'ethereum' AND block_time >= NOW() - INTERVAL '30' DAY
EXCEPT
SELECT DISTINCT taker FROM dex.trades
WHERE blockchain = 'arbitrum' AND block_time >= NOW() - INTERVAL '30' DAY;
\`\`\``;

const L_DUNESQL = `# Mengenal Dune & DuneSQL

## Dune Analytics: Google untuk Blockchain

Dune Analytics adalah platform analisis data blockchain terbesar. Dibuat pada 2018, kini memiliki ratusan ribu dashboard publik dari komunitas analis seluruh dunia.

**Yang bisa dilakukan di Dune:**
- Query data dari 20+ blockchain secara real-time
- Buat visualisasi dan dashboard publik/privat
- Fork dan modifikasi query orang lain
- Share analisis ke komunitas

## DuneSQL = Trino SQL

Dune menggunakan **Trino** (sebelumnya PrestoSQL) sebagai engine SQL-nya. Trino adalah distributed SQL engine yang mampu memproses data skala petabyte.

### Perbedaan Syntax dari PostgreSQL/MySQL

\`\`\`sql
-- INTERVAL: di Trino pakai format berbeda
-- PostgreSQL: INTERVAL '7 days'
-- DuneSQL:    INTERVAL '7' DAY   ← perhatikan perbedaannya!

-- Benar di DuneSQL:
WHERE block_time >= NOW() - INTERVAL '7' DAY
WHERE block_time >= NOW() - INTERVAL '1' MONTH

-- Hex conversion:
SELECT from_hex('deadbeef');  -- konversi hex ke bytes

-- Varbinary (hex address) comparison:
WHERE contract_address = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
-- (tanpa tanda kutip untuk address di DuneSQL terbaru!)
\`\`\`

## Tabel-Tabel Utama di Dune

### Raw Tables (Data Mentah)
\`\`\`sql
ethereum.blocks           -- Informasi setiap block
ethereum.transactions     -- Semua transaksi
ethereum.logs             -- Event logs smart contract
ethereum.traces           -- Internal transactions
\`\`\`

### Spellbook (Sudah Diproses)
\`\`\`sql
dex.trades                -- Semua DEX swap (multi-chain)
nft.trades                -- Semua NFT jual beli
tokens.transfers          -- Semua token transfer ERC20
tokens.erc20              -- Metadata token (nama, simbol, desimal)
labels.addresses          -- Label/nama wallet terkenal
prices.usd                -- Harga token historis dalam USD
\`\`\`

### Decoded Tables (Spesifik Kontrak)
\`\`\`sql
uniswap_v3_ethereum.Factory_evt_PoolCreated
uniswap_v3_ethereum.Pair_evt_Swap
aave_v3_ethereum.Pool_evt_Supply
\`\`\``;

const L_OPTIMIZE = `# Optimasi Query di Dune

## Mengapa Query Bisa Lambat atau Timeout?

Tabel blockchain sangat besar:
- \`ethereum.transactions\` → **miliaran baris**
- \`dex.trades\` → ratusan juta baris

Query tanpa filter yang tepat = scan seluruh tabel = lambat atau timeout.

## Aturan #1: SELALU Filter block_time

\`\`\`sql
-- ❌ SANGAT BURUK: scan miliaran baris!
SELECT COUNT(*) FROM ethereum.transactions
WHERE "from" = '0x123...';

-- ✅ BAGUS: hanya scan partisi 90 hari terakhir
SELECT COUNT(*) FROM ethereum.transactions
WHERE "from" = '0x123...'
  AND block_time >= NOW() - INTERVAL '90' DAY;
\`\`\`

Dune menyimpan data dalam **partisi** berdasarkan waktu. Dengan filter \`block_time\`, Dune hanya membaca partisi yang relevan (**Partition Pruning**).

## Aturan #2: Hindari SELECT *

\`\`\`sql
-- ❌ BURUK: baca semua 50+ kolom
SELECT * FROM ethereum.transactions
WHERE block_time >= NOW() - INTERVAL '7' DAY LIMIT 100;

-- ✅ BAIK: hanya baca kolom yang dibutuhkan
SELECT hash, "from", "to", value, block_time
FROM ethereum.transactions
WHERE block_time >= NOW() - INTERVAL '7' DAY LIMIT 100;
\`\`\`

## Aturan #3: Gunakan Approximate Functions

Untuk data skala besar, approximate functions jauh lebih cepat:

\`\`\`sql
-- ❌ Lambat untuk data besar:
SELECT COUNT(DISTINCT "from") FROM ethereum.transactions
WHERE block_time >= NOW() - INTERVAL '30' DAY;

-- ✅ Jauh lebih cepat, akurasi ~98%:
SELECT approx_distinct("from") FROM ethereum.transactions
WHERE block_time >= NOW() - INTERVAL '30' DAY;

-- approx_percentile untuk median/percentile:
SELECT
  approx_percentile(value/1e18, 0.5) AS median_eth,   -- median
  approx_percentile(value/1e18, 0.95) AS p95_eth,     -- persentil 95
  approx_percentile(value/1e18, 0.99) AS p99_eth      -- persentil 99
FROM ethereum.transactions
WHERE block_time >= NOW() - INTERVAL '30' DAY;
\`\`\`

## Aturan #4: Filter Awal, Join Kemudian

\`\`\`sql
-- ❌ BURUK: join dulu baru filter
SELECT t.*, l.name
FROM ethereum.transactions t
LEFT JOIN labels.addresses l ON t."from" = l.address
WHERE t.block_time >= NOW() - INTERVAL '7' DAY
  AND t.value / 1e18 > 100;

-- ✅ BAIK: filter dulu dengan CTE, baru join
WITH large_txs AS (
  SELECT hash, "from", value
  FROM ethereum.transactions
  WHERE block_time >= NOW() - INTERVAL '7' DAY
    AND value / 1e18 > 100
)
SELECT lt.*, l.name
FROM large_txs lt
LEFT JOIN labels.addresses l ON lt."from" = l.address;
\`\`\`

## Checklist Query Optimal di Dune

- [ ] Ada filter \`block_time\`?
- [ ] Tidak menggunakan \`SELECT *\` pada tabel besar?
- [ ] Menggunakan \`approx_distinct\` untuk COUNT DISTINCT pada data besar?
- [ ] Filter diterapkan sebelum JOIN?
- [ ] LIMIT ditambahkan saat eksplorasi?`;

// ─── QUIZ DATA ────────────────────────────────────────────────────────────────

const Q_SQL_DASAR = [
  { text: "Apa fungsi utama SQL?", options: ["Membuat website", "Berkomunikasi dengan database untuk mengambil dan menganalisis data", "Membuat animasi", "Mengirim email"], answer: 1, order: 1 },
  { text: "Dalam tabel database, apa yang dimaksud dengan 'baris' (row)?", options: ["Nama kategori data", "Satu record/entri data", "Nama tabel", "Jumlah kolom"], answer: 1, order: 2 },
  { text: "Mengapa nilai ETH di blockchain perlu dibagi dengan 1e18?", options: ["Untuk mempercepat query", "Karena ETH disimpan dalam satuan wei (1 ETH = 1e18 wei)", "Karena aturan SQL", "Untuk konversi ke USD"], answer: 1, order: 3 },
  { text: "Platform analisis blockchain mana yang menggunakan SQL?", options: ["Hanya Dune Analytics", "Hanya Footprint", "Dune, Footprint, Flipside, dan banyak platform lainnya", "Tidak ada, blockchain pakai NoSQL"], answer: 2, order: 4 },
  { text: "Apa perbedaan database SQL dengan data blockchain?", options: ["Tidak ada perbedaan", "Data blockchain bersifat immutable dan on-chain, SQL untuk data relasional terstruktur", "SQL lebih cepat", "Blockchain lebih murah"], answer: 1, order: 5 },
];

const Q_SELECT = [
  { text: "Apa fungsi tanda * dalam SELECT *?", options: ["Filter semua baris", "Pilih semua kolom", "Hitung semua nilai", "Hapus semua data"], answer: 1, order: 1 },
  { text: "Keyword apa yang digunakan untuk memberi nama alias pada kolom?", options: ["NAME", "ALIAS", "AS", "LABEL"], answer: 2, order: 2 },
  { text: "Mengapa sebaiknya menghindari SELECT * pada tabel besar di Dune?", options: ["Karena SELECT * tidak valid", "Karena membaca semua kolom membutuhkan banyak resource dan memperlambat query", "Karena hasilnya tidak akurat", "Karena tidak ada alasan"], answer: 1, order: 3 },
  { text: "Keyword apa yang membatasi jumlah baris hasil query?", options: ["MAX", "TOP", "LIMIT", "RESTRICT"], answer: 2, order: 4 },
  { text: "Di DuneSQL, mengapa kolom 'from' ditulis dengan tanda kutip (\"from\")?", options: ["Karena aturan estetika", "Karena 'from' adalah reserved word di SQL", "Karena itu nama tabel", "Tidak ada alasan"], answer: 1, order: 5 },
];

const Q_WHERE = [
  { text: "Operator apa yang digunakan untuk mencari nilai dalam range tertentu?", options: ["RANGE", "BETWEEN", "WITHIN", "SPAN"], answer: 1, order: 1 },
  { text: "Simbol % dalam LIKE berarti apa?", options: ["Tepat satu karakter", "Nol atau lebih karakter apapun", "Hanya angka", "Hanya huruf"], answer: 1, order: 2 },
  { text: "Mengapa filter block_time sangat penting di Dune Analytics?", options: ["Karena block_time adalah primary key", "Untuk mengaktifkan partition pruning sehingga query tidak scan seluruh tabel", "Karena aturan Dune", "Untuk mengurutkan data"], answer: 1, order: 3 },
  { text: "Apa perbedaan AND dan OR?", options: ["Tidak ada perbedaan", "AND: kedua kondisi harus terpenuhi; OR: salah satu kondisi cukup", "AND lebih cepat dari OR", "OR hanya untuk teks"], answer: 1, order: 4 },
  { text: "Bagaimana cara mencari baris yang nilai kolomnya NULL?", options: ["WHERE kolom = NULL", "WHERE kolom IS NULL", "WHERE kolom == NULL", "WHERE ISNULL(kolom)"], answer: 1, order: 5 },
];

const Q_ORDER = [
  { text: "ORDER BY DESC mengurutkan data dari...", options: ["Terkecil ke terbesar", "Terbesar ke terkecil", "Huruf A ke Z", "Acak"], answer: 1, order: 1 },
  { text: "Apa urutan default ORDER BY jika tidak ditulis ASC atau DESC?", options: ["DESC", "ASC", "Acak", "Tidak ada urutan"], answer: 1, order: 2 },
  { text: "Dalam Multiple ORDER BY, kolom mana yang diprioritaskan?", options: ["Kolom terakhir", "Kolom pertama", "Kolom dengan nilai terbesar", "Kolom dengan nama terpendek"], answer: 1, order: 3 },
  { text: "Bisakah kita ORDER BY menggunakan alias yang didefinisikan di SELECT?", options: ["Tidak bisa", "Bisa", "Hanya di PostgreSQL", "Hanya untuk angka"], answer: 1, order: 4 },
  { text: "Query mana yang menampilkan 10 transaksi ETH terbesar?", options: ["SELECT * FROM ethereum.transactions LIMIT 10;", "SELECT * FROM ethereum.transactions ORDER BY value DESC LIMIT 10;", "SELECT TOP 10 * FROM ethereum.transactions;", "SELECT * FROM ethereum.transactions WHERE value = MAX(value);"], answer: 1, order: 5 },
];

const Q_AGREGAT = [
  { text: "Fungsi apa yang menghitung jumlah baris?", options: ["SUM()", "COUNT()", "TOTAL()", "NUM()"], answer: 1, order: 1 },
  { text: "Apa perbedaan COUNT(*) dan COUNT(kolom)?", options: ["Tidak ada perbedaan", "COUNT(*) menghitung semua baris termasuk NULL; COUNT(kolom) hanya non-NULL", "COUNT(*) lebih lambat", "COUNT(kolom) menghitung total nilai"], answer: 1, order: 2 },
  { text: "Apa perbedaan WHERE dan HAVING?", options: ["Tidak ada perbedaan", "WHERE filter sebelum GROUP BY; HAVING filter setelah GROUP BY (untuk hasil agregasi)", "HAVING lebih cepat", "WHERE hanya untuk angka"], answer: 1, order: 3 },
  { text: "Query mana yang benar untuk mencari wallet dengan lebih dari 100 transaksi?", options: ["WHERE COUNT(*) > 100", "HAVING COUNT(*) > 100", "FILTER COUNT(*) > 100", "COUNT WHERE > 100"], answer: 1, order: 4 },
  { text: "COUNT(DISTINCT address) berbeda dengan COUNT(address) karena?", options: ["Tidak ada perbedaan", "COUNT(DISTINCT) menghitung hanya nilai unik, mengabaikan duplikat", "COUNT(DISTINCT) lebih lambat dan tidak akurat", "COUNT(DISTINCT) tidak bisa digunakan"], answer: 1, order: 5 },
];

const Q_JOIN = [
  { text: "Apa perbedaan INNER JOIN dan LEFT JOIN?", options: ["Tidak ada perbedaan", "INNER JOIN hanya baris yang cocok di kedua tabel; LEFT JOIN semua baris kiri + NULL jika tidak cocok", "LEFT JOIN lebih cepat", "INNER JOIN lebih akurat"], answer: 1, order: 1 },
  { text: "Apa yang terjadi pada kolom tabel kanan jika LEFT JOIN tidak menemukan kecocokan?", options: ["Baris dihapus", "Kolom bernilai NULL", "Query error", "Nilai 0"], answer: 1, order: 2 },
  { text: "Keyword apa yang menentukan kondisi penggabungan tabel?", options: ["WHERE", "ON", "MATCH", "CONNECT"], answer: 1, order: 3 },
  { text: "Self JOIN digunakan untuk?", options: ["Join dua tabel berbeda", "Menggabungkan tabel dengan dirinya sendiri untuk perbandingan internal", "Mempercepat query", "Membuat tabel baru"], answer: 1, order: 4 },
  { text: "Dalam sebagian besar kasus analisis on-chain, JOIN mana yang paling sering dipakai?", options: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL OUTER JOIN"], answer: 1, order: 5 },
];

const Q_SUBQUERY_CTE = [
  { text: "Apa itu CTE (Common Table Expression)?", options: ["Tabel permanen di database", "Query sementara dengan nama yang didefinisikan menggunakan WITH", "Tipe JOIN khusus", "Fungsi matematika"], answer: 1, order: 1 },
  { text: "Keyword apa yang digunakan untuk membuat CTE?", options: ["CREATE TEMP", "WITH", "DEFINE", "SUBQUERY"], answer: 1, order: 2 },
  { text: "Kapan sebaiknya menggunakan CTE dibanding subquery?", options: ["Selalu pakai subquery", "Saat logic kompleks, butuh referensi berkali-kali, atau perlu keterbacaan yang baik", "CTE selalu lebih lambat", "Hanya untuk data kecil"], answer: 1, order: 3 },
  { text: "Berapa kali CTE yang sama bisa direferensikan dalam satu query?", options: ["Hanya sekali", "Maksimal 2 kali", "Tidak terbatas", "Maksimal 10 kali"], answer: 2, order: 4 },
  { text: "Correlated subquery berbeda dengan non-correlated karena?", options: ["Tidak ada perbedaan", "Correlated subquery mereferensikan kolom dari query luar dan dieksekusi per baris", "Non-correlated lebih lambat", "Correlated tidak bisa di SELECT"], answer: 1, order: 5 },
];

const Q_WINDOW = [
  { text: "Apa perbedaan utama Window Function dengan GROUP BY?", options: ["Window Function selalu lebih cepat", "Window Function tidak mengurangi jumlah baris; GROUP BY menggabungkan baris", "GROUP BY bisa menggunakan OVER()", "Tidak ada perbedaan"], answer: 1, order: 1 },
  { text: "PARTITION BY dalam window function berfungsi untuk?", options: ["Mengurutkan data", "Membagi data menjadi partisi yang diproses secara terpisah", "Memfilter data", "Menghitung rata-rata global"], answer: 1, order: 2 },
  { text: "Apa perbedaan RANK() dan DENSE_RANK() saat ada nilai yang sama (tie)?", options: ["Tidak ada perbedaan", "RANK melewati nomor setelah tie; DENSE_RANK tidak melewati nomor", "DENSE_RANK lebih lambat", "RANK tidak bisa untuk teks"], answer: 1, order: 3 },
  { text: "LAG(value) OVER (ORDER BY date) mengakses?", options: ["Nilai baris berikutnya", "Nilai baris sebelumnya", "Nilai rata-rata window", "Nilai pertama window"], answer: 1, order: 4 },
  { text: "Bagaimana cara membuat running total (kumulatif)?", options: ["RUNNING_SUM(col)", "SUM(col) OVER (ORDER BY date)", "CUMSUM(col)", "SUM(col) GROUP BY date"], answer: 1, order: 5 },
];

const Q_DATE = [
  { text: "DATE_TRUNC('day', block_time) menghasilkan?", options: ["Hanya angka hari (1-31)", "Timestamp dengan jam/menit/detik menjadi 00:00:00", "Nama hari dalam seminggu", "Selisih hari dengan sekarang"], answer: 1, order: 1 },
  { text: "Bagaimana menulis filter '7 hari terakhir' yang benar di DuneSQL?", options: ["WHERE block_time > '7 days ago'", "WHERE block_time >= NOW() - INTERVAL '7' DAY", "WHERE DATEDIFF(NOW(), block_time) < 7", "WHERE block_time LAST 7 DAYS"], answer: 1, order: 2 },
  { text: "EXTRACT(month FROM block_time) mengembalikan?", options: ["Nama bulan (January)", "Nomor bulan (1-12)", "Jumlah hari dalam bulan", "Quarter (1-4)"], answer: 1, order: 3 },
  { text: "LOWER('0xABCDEF') menghasilkan?", options: ["Error", "'0xabcdef'", "'0XABCDEF'", "6"], answer: 1, order: 4 },
  { text: "COALESCE(label, 'Unknown') mengembalikan?", options: ["Selalu 'Unknown'", "label jika tidak NULL; 'Unknown' jika NULL", "NULL jika label ada", "Error jika label NULL"], answer: 1, order: 5 },
];

const Q_CASE_WHEN = [
  { text: "CASE WHEN digunakan untuk?", options: ["Menggabungkan tabel", "Menambahkan logika kondisional (if-else) dalam query", "Membuat index", "Menghapus data"], answer: 1, order: 1 },
  { text: "Perbedaan UNION dan UNION ALL?", options: ["Tidak ada perbedaan", "UNION menghapus duplikat (lebih lambat); UNION ALL mempertahankan semua baris (lebih cepat)", "UNION ALL menghapus duplikat", "UNION hanya untuk 2 query"], answer: 1, order: 2 },
  { text: "INTERSECT digunakan untuk mendapatkan?", options: ["Semua baris dari kedua query", "Hanya baris yang ADA di kedua query", "Baris yang ada di query pertama tapi tidak di kedua", "Baris unik saja"], answer: 1, order: 3 },
  { text: "COALESCE(a, b, c) mengembalikan?", options: ["Nilai terbesar", "Nilai pertama yang tidak NULL", "Rata-rata a, b, c", "Nilai terakhir"], answer: 1, order: 4 },
  { text: "NULLIF(value, 0) mengembalikan NULL ketika?", options: ["value adalah NULL", "value sama dengan 0", "value negatif", "value lebih besar dari 0"], answer: 1, order: 5 },
];

const Q_DUNESQL = [
  { text: "Engine SQL apa yang digunakan Dune Analytics?", options: ["PostgreSQL", "MySQL", "Trino (PrestoSQL)", "BigQuery"], answer: 2, order: 1 },
  { text: "Mengapa filter block_time wajib di Dune?", options: ["Karena block_time adalah primary key", "Untuk mengaktifkan partition pruning agar query tidak scan semua data", "Karena aturan Dune", "Untuk mengurutkan data"], answer: 1, order: 2 },
  { text: "approx_distinct() vs COUNT(DISTINCT)?", options: ["Tidak ada perbedaan", "approx_distinct() lebih cepat dengan akurasi ~98%; COUNT(DISTINCT) exact tapi lebih lambat", "COUNT(DISTINCT) selalu lebih cepat", "approx_distinct() tidak tersedia di Dune"], answer: 1, order: 3 },
  { text: "Spellbook table mana yang berisi semua DEX trades multi-chain?", options: ["ethereum.transactions", "uniswap.trades", "dex.trades", "defi.swaps"], answer: 2, order: 4 },
  { text: "approx_percentile(value, 0.5) menghasilkan?", options: ["Nilai rata-rata", "Nilai median (persentil ke-50)", "Nilai maksimum", "50% dari total nilai"], answer: 1, order: 5 },
];

// ─── DUNE, ONCHAIN, ADVANCED, FOOTPRINT CONTENT ──────────────────────────────

const L_DUNE_INTRO = `# Apa itu Dune Analytics?

## Dune = Google untuk Data Blockchain

Bayangkan semua data blockchain — transaksi, swap DEX, NFT, lending — tersimpan dalam satu "gudang data" raksasa. **Dune Analytics** adalah pintu masuk ke gudang itu, memungkinkan siapa saja menganalisis data tersebut dengan SQL.

## Kenapa Dune Populer?

- **Gratis** untuk akun dasar
- Data **real-time** dari 20+ blockchain (Ethereum, Arbitrum, Polygon, Optimism, dll)
- Ratusan ribu **dashboard publik** yang bisa di-fork
- Komunitas analis aktif

## Cara Kerja Dune

\`\`\`
Blockchain Nodes
      ↓
Dune Ingestion Layer (baca data dari chain)
      ↓
Data Lake (simpan raw data)
      ↓
Decoding Layer (decode smart contract events)
      ↓
Spellbook (abstraksi: dex.trades, nft.trades, dll)
      ↓
Query Engine (Trino/DuneSQL)
      ↓
Visualisasi & Dashboard
\`\`\`

## Navigasi Platform Dune

1. **New Query** (+ icon) → buka editor SQL
2. **My Creations** → semua query & dashboard milikmu
3. **Discover** → temukan query & dashboard komunitas
4. **Docs** → dokumentasi tabel dan API

## Query Pertama di Dune

Coba jalankan ini di editor Dune:

\`\`\`sql
-- Lihat 10 transaksi ETH terbesar hari ini
SELECT
  hash AS tx,
  "from" AS pengirim,
  "to" AS penerima,
  value / 1e18 AS eth,
  block_time
FROM ethereum.transactions
WHERE block_time >= NOW() - INTERVAL '1' DAY
  AND value > 0
ORDER BY value DESC
LIMIT 10;
\`\`\``;

const L_DUNE_TABLES = `# Raw Tables vs Decoded Tables vs Spellbook

## Hierarki Data di Dune

\`\`\`
Level 1: Raw Tables       → Data mentah, perlu decode manual
Level 2: Decoded Tables   → Sudah didecode berdasarkan ABI kontrak
Level 3: Spellbook        → Sudah diabstraksikan, paling mudah dipakai
\`\`\`

## Level 1: Raw Tables

\`\`\`sql
-- ethereum.logs: semua event dari semua kontrak (susah dibaca)
SELECT
  block_time,
  contract_address,
  topic0,   -- keccak256 dari event signature
  data      -- encoded parameter (hex)
FROM ethereum.logs
WHERE block_time >= NOW() - INTERVAL '1' DAY
LIMIT 5;
\`\`\`

## Level 2: Decoded Tables

Dune otomatis decode kontrak yang ABI-nya disubmit:

\`\`\`sql
-- Uniswap V3 Swap events yang sudah terdecode
SELECT
  evt_block_time AS waktu,
  sender,
  recipient,
  amount0,
  amount1
FROM uniswap_v3_ethereum.Pair_evt_Swap
WHERE evt_block_time >= NOW() - INTERVAL '1' DAY
LIMIT 20;
\`\`\`

## Level 3: Spellbook (Paling Disarankan!)

\`\`\`sql
-- dex.trades: semua DEX swap dari semua protokol, sudah dinormalisasi
SELECT
  block_time,
  blockchain,
  project,
  token_bought_symbol AS beli,
  token_sold_symbol AS jual,
  amount_usd,
  taker AS wallet
FROM dex.trades
WHERE block_time >= NOW() - INTERVAL '7' DAY
  AND blockchain = 'ethereum'
  AND amount_usd > 10000
ORDER BY amount_usd DESC
LIMIT 20;
\`\`\`

## Kapan Pakai yang Mana?

| Kebutuhan | Tabel yang Dipakai |
|-----------|-------------------|
| Analisis umum DEX | \`dex.trades\` |
| Analisis NFT | \`nft.trades\` |
| Token transfers | \`tokens.transfers\` |
| Label wallet | \`labels.addresses\` |
| Harga token historis | \`prices.usd\` |
| Analisis protokol spesifik | Decoded tables |
| Research sangat mendalam | Raw tables |`;

const L_DUNE_VIZ = `# Membuat Visualisasi di Dune

## Setelah Query Berhasil...

Setelah menjalankan query, hasil muncul sebagai tabel. Klik **"New visualization"** untuk membuat chart.

## Tipe Visualisasi

| Tipe | Kapan Dipakai | Contoh |
|------|--------------|--------|
| **Line Chart** | Trend over time | Volume harian |
| **Bar Chart** | Perbandingan kategori | Volume per DEX |
| **Area Chart** | Kumulatif over time | Total TVL |
| **Pie/Donut** | Proporsi/market share | Share tiap protokol |
| **Counter** | Satu angka penting | Total TVL hari ini |
| **Table** | Detail data | Top 100 wallets |
| **Scatter** | Korelasi 2 variabel | Volume vs jumlah transaksi |

## Setup Line Chart: Volume Harian

\`\`\`sql
SELECT
  DATE_TRUNC('day', block_time) AS day,
  SUM(amount_usd) AS volume_usd
FROM dex.trades
WHERE block_time >= NOW() - INTERVAL '90' DAY
  AND blockchain = 'ethereum'
GROUP BY 1
ORDER BY 1;
\`\`\`

Setting chart:
- X-axis: **day**
- Y-axis: **volume_usd**
- Title: "Daily DEX Volume - Ethereum"

## Parameter Interaktif

\`\`\`sql
SELECT
  DATE_TRUNC('day', block_time) AS day,
  project,
  SUM(amount_usd) AS volume
FROM dex.trades
WHERE block_time >= NOW() - INTERVAL '{{days}}' DAY
  AND blockchain = '{{chain}}'
GROUP BY 1, 2
ORDER BY 1;
\`\`\`

Tambahkan parameter:
- \`{{days}}\`: Number, default 30
- \`{{chain}}\`: Text list → ethereum, arbitrum, polygon`;

const L_DUNE_DASH = `# Menyusun Dashboard Profesional

## Anatomi Dashboard yang Baik

Dashboard yang baik memiliki:
1. **Judul dan deskripsi** yang jelas
2. **Counter** metrics penting di atas (TVL, Volume, Users)
3. **Time series chart** untuk trend
4. **Breakdown chart** untuk distribusi
5. **Detail table** di bawah

## Langkah Membuat Dashboard

1. Klik **"Create"** → **"Dashboard"**
2. Beri nama: misal "Ethereum DEX Overview"
3. Klik **"Add visualization"** → pilih query yang sudah ada
4. Drag & resize widget sesuai kebutuhan
5. Tambahkan **Text widget** untuk judul bagian
6. Tambahkan **global filter/parameter**
7. Klik **"Publish"**

## Study Case: Simple DEX Dashboard

**Metric 1: Total Volume (Counter)**
\`\`\`sql
SELECT SUM(amount_usd) AS total_volume_30d
FROM dex.trades
WHERE block_time >= NOW() - INTERVAL '30' DAY
  AND blockchain = 'ethereum';
\`\`\`

**Metric 2: Daily Volume (Line Chart)**
\`\`\`sql
SELECT
  DATE_TRUNC('day', block_time) AS day,
  SUM(amount_usd) AS volume
FROM dex.trades
WHERE block_time >= NOW() - INTERVAL '30' DAY
  AND blockchain = 'ethereum'
GROUP BY 1 ORDER BY 1;
\`\`\`

**Metric 3: Market Share (Pie Chart)**
\`\`\`sql
SELECT project, SUM(amount_usd) AS volume
FROM dex.trades
WHERE block_time >= NOW() - INTERVAL '30' DAY
  AND blockchain = 'ethereum'
GROUP BY project
ORDER BY volume DESC
LIMIT 10;
\`\`\``;

const L_ERC20 = `# Analisis Token ERC20

## Apa itu Token ERC20?

ERC20 adalah standar token di Ethereum. Hampir semua token DeFi (USDC, USDT, DAI, WETH, dll) adalah ERC20.

## Token Transfer Volume

\`\`\`sql
-- Volume transfer USDC per hari 30 hari terakhir
SELECT
  DATE_TRUNC('day', block_time) AS day,
  symbol,
  SUM(amount) AS volume,
  COUNT(*) AS transfer_count
FROM tokens.transfers
WHERE block_time >= NOW() - INTERVAL '30' DAY
  AND blockchain = 'ethereum'
  AND symbol = 'USDC'
GROUP BY 1, 2
ORDER BY 1;
\`\`\`

## Holder Distribution Analysis

\`\`\`sql
-- Kategorisasi holder USDC
WITH holder_balances AS (
  SELECT
    "to" AS address,
    SUM(amount) AS received
  FROM tokens.transfers
  WHERE blockchain = 'ethereum'
    AND symbol = 'USDC'
    AND block_time >= NOW() - INTERVAL '365' DAY
  GROUP BY 1
)
SELECT
  CASE
    WHEN received >= 10000000  THEN '🐋 Whale (>10M USDC)'
    WHEN received >= 1000000   THEN '🐳 Large (1M-10M)'
    WHEN received >= 100000    THEN '🐟 Medium (100K-1M)'
    WHEN received >= 10000     THEN '🐠 Small (10K-100K)'
    ELSE '🦐 Micro (<10K)'
  END AS kategori,
  COUNT(*) AS jumlah_address,
  SUM(received) AS total_usdc
FROM holder_balances
GROUP BY 1
ORDER BY total_usdc DESC;
\`\`\`

## Top Token by Volume

\`\`\`sql
SELECT
  symbol,
  COUNT(*) AS transfer_count,
  SUM(amount_usd) AS volume_usd
FROM tokens.transfers
WHERE block_time >= NOW() - INTERVAL '7' DAY
  AND blockchain = 'ethereum'
  AND amount_usd > 0
GROUP BY symbol
ORDER BY volume_usd DESC
LIMIT 20;
\`\`\``;

const L_NFT = `# Analisis NFT Marketplace

## Volume per Marketplace

\`\`\`sql
SELECT
  DATE_TRUNC('week', block_time) AS week,
  marketplace,
  SUM(amount_usd) AS volume_usd,
  COUNT(*) AS sales_count,
  AVG(amount_usd) AS avg_price
FROM nft.trades
WHERE block_time >= NOW() - INTERVAL '90' DAY
  AND blockchain = 'ethereum'
GROUP BY 1, 2
ORDER BY 1, 3 DESC;
\`\`\`

## Floor Price Tracking

\`\`\`sql
-- Track floor price koleksi per hari
SELECT
  DATE_TRUNC('day', block_time) AS day,
  collection,
  MIN(amount_usd) AS floor_price,
  AVG(amount_usd) AS avg_price,
  MAX(amount_usd) AS max_price,
  COUNT(*) AS sales_count
FROM nft.trades
WHERE blockchain = 'ethereum'
  AND block_time >= NOW() - INTERVAL '90' DAY
GROUP BY 1, 2
ORDER BY 1;
\`\`\`

## Whale NFT Buyers

\`\`\`sql
SELECT
  buyer,
  COUNT(*) AS total_purchases,
  COUNT(DISTINCT collection) AS collections,
  SUM(amount_usd) AS total_spent_usd
FROM nft.trades
WHERE block_time >= NOW() - INTERVAL '30' DAY
  AND blockchain = 'ethereum'
GROUP BY buyer
HAVING SUM(amount_usd) > 50000
ORDER BY total_spent_usd DESC
LIMIT 20;
\`\`\``;

const L_DEFI = `# Analisis Protokol DeFi

## DEX Analysis (Uniswap)

\`\`\`sql
-- Top trading pairs di Uniswap V3
SELECT
  token_bought_symbol || '/' || token_sold_symbol AS pair,
  COUNT(*) AS swap_count,
  SUM(amount_usd) AS volume_usd,
  AVG(amount_usd) AS avg_swap_size
FROM dex.trades
WHERE block_time >= NOW() - INTERVAL '7' DAY
  AND project = 'uniswap'
  AND version = '3'
  AND blockchain = 'ethereum'
GROUP BY 1
ORDER BY volume_usd DESC
LIMIT 20;
\`\`\`

## Lending Protocol (Aave)

\`\`\`sql
-- Supply vs Borrow di Aave V3
SELECT
  DATE_TRUNC('day', evt_block_time) AS day,
  'Supply' AS action,
  COUNT(*) AS count,
  SUM(CAST(amount AS DOUBLE) / 1e6) AS usdc_amount  -- USDC 6 desimal
FROM aave_v3_ethereum.Pool_evt_Supply
WHERE evt_block_time >= NOW() - INTERVAL '30' DAY
GROUP BY 1, 2

UNION ALL

SELECT
  DATE_TRUNC('day', evt_block_time) AS day,
  'Borrow' AS action,
  COUNT(*) AS count,
  SUM(CAST(amount AS DOUBLE) / 1e6) AS usdc_amount
FROM aave_v3_ethereum.Pool_evt_Borrow
WHERE evt_block_time >= NOW() - INTERVAL '30' DAY
GROUP BY 1, 2

ORDER BY day, action;
\`\`\``;

const L_MEV = `# Memahami MEV

## Apa itu MEV?

**MEV** (Maximal Extractable Value) adalah profit yang bisa diekstrak oleh validator/builder dengan mengontrol **urutan transaksi** dalam satu block.

## Jenis-jenis MEV

### 1. Sandwich Attack
Searcher "men挟" transaksi victim:
\`\`\`
Block N:
  Tx 1 (Searcher): Beli token A  ← front-run
  Tx 2 (Victim):   Beli token A  ← harga sudah naik
  Tx 3 (Searcher): Jual token A  ← back-run, ambil profit
\`\`\`

### 2. Arbitrage
Manfaatkan perbedaan harga antar DEX:
\`\`\`sql
-- Cari arbitrage: beli di DEX A, jual di DEX B dalam blok yang sama
WITH same_block_trades AS (
  SELECT
    block_number,
    tx_hash,
    taker,
    token_bought_symbol,
    token_sold_symbol,
    amount_usd,
    project
  FROM dex.trades
  WHERE block_time >= NOW() - INTERVAL '1' DAY
    AND blockchain = 'ethereum'
)
SELECT
  a.block_number,
  a.taker AS searcher,
  a.token_bought_symbol AS token,
  a.project AS buy_dex,
  b.project AS sell_dex,
  a.amount_usd AS buy_amount,
  b.amount_usd AS sell_amount,
  b.amount_usd - a.amount_usd AS profit_usd
FROM same_block_trades a
JOIN same_block_trades b
  ON a.block_number = b.block_number
  AND a.taker = b.taker
  AND a.token_bought_symbol = b.token_sold_symbol
  AND a.project != b.project
WHERE b.amount_usd > a.amount_usd  -- ada profit
ORDER BY profit_usd DESC
LIMIT 20;
\`\`\``;

const L_MULTICHAIN = `# Analisis Multi-Chain

## Mengapa Multi-Chain Penting?

DeFi kini tersebar di banyak chain. Analis harus bisa melihat gambaran besar lintas chain.

## Bandingkan Volume Antar Chain

\`\`\`sql
SELECT
  blockchain,
  DATE_TRUNC('week', block_time) AS week,
  SUM(amount_usd) AS volume_usd,
  COUNT(*) AS trade_count,
  COUNT(DISTINCT taker) AS unique_traders
FROM dex.trades
WHERE block_time >= NOW() - INTERVAL '90' DAY
  AND blockchain IN ('ethereum', 'arbitrum', 'polygon', 'optimism', 'base')
GROUP BY 1, 2
ORDER BY 2, 3 DESC;
\`\`\`

## Bridge Activity

\`\`\`sql
-- Aliran likuiditas antar chain
SELECT
  DATE_TRUNC('day', block_time) AS day,
  blockchain AS source_chain,
  project AS bridge,
  SUM(amount_usd) AS bridged_usd
FROM bridges.transfers
WHERE block_time >= NOW() - INTERVAL '30' DAY
GROUP BY 1, 2, 3
ORDER BY 1, 4 DESC;
\`\`\``;

const L_WALLET = `# Wallet Clustering & Smart Money

## Smart Money Tracking

\`\`\`sql
-- Track aktivitas wallet yang dilabel sebagai fund/whale
SELECT
  t.block_time,
  l.name AS wallet_name,
  t.token_bought_symbol AS token_dibeli,
  t.amount_usd,
  t.project AS dex
FROM dex.trades t
INNER JOIN labels.addresses l
  ON t.taker = l.address
WHERE t.block_time >= NOW() - INTERVAL '7' DAY
  AND t.amount_usd > 10000
  AND t.blockchain = 'ethereum'
ORDER BY t.amount_usd DESC
LIMIT 50;
\`\`\`

## Identifikasi Wallet Terkait

\`\`\`sql
-- Wallet yang sering berinteraksi (kemungkinan satu entitas)
SELECT
  "from" AS wallet_a,
  "to" AS wallet_b,
  COUNT(*) AS jumlah_transfer,
  SUM(value) / 1e18 AS total_eth
FROM ethereum.transactions
WHERE block_time >= NOW() - INTERVAL '90' DAY
  AND value > 0
GROUP BY 1, 2
HAVING COUNT(*) > 10
ORDER BY jumlah_transfer DESC
LIMIT 20;
\`\`\``;

const L_BITCOIN = `# Bitcoin On-Chain Analytics

## Model UTXO vs Account

Bitcoin menggunakan model **UTXO** (Unspent Transaction Output):
- Setiap transaksi mengkonsumsi UTXO lama dan membuat UTXO baru
- Tidak ada "saldo akun" seperti Ethereum
- Privacy lebih baik (address baru setiap transaksi)

## Tabel Bitcoin di Dune

\`\`\`sql
-- Melihat transaksi Bitcoin terbaru
SELECT
  block_time,
  hash AS tx_hash,
  fee / 1e8 AS fee_btc,
  input_value / 1e8 AS input_btc
FROM bitcoin.transactions
WHERE block_time >= NOW() - INTERVAL '1' DAY
ORDER BY fee DESC
LIMIT 20;

-- Analisis fee harian
SELECT
  DATE_TRUNC('day', block_time) AS day,
  COUNT(*) AS tx_count,
  SUM(fee) / 1e8 AS total_fee_btc,
  AVG(fee) / 1e8 AS avg_fee_btc
FROM bitcoin.transactions
WHERE block_time >= NOW() - INTERVAL '30' DAY
GROUP BY 1 ORDER BY 1;
\`\`\``;

const L_API = `# Dune API & Spellbook

## Dune API — Otomatisasi Analisis

Dune API memungkinkan fetch hasil query secara programmatic:

\`\`\`javascript
// Fetch hasil query dari Dune API
const QUERY_ID = '1234567';  // ID query kamu
const API_KEY = 'your_api_key';

const response = await fetch(
  \`https://api.dune.com/api/v1/query/\${QUERY_ID}/results\`,
  { headers: { 'x-dune-api-key': API_KEY } }
);

const data = await response.json();
console.log(data.result.rows);  // array of result rows
\`\`\`

## Spellbook — Kontribusi ke Komunitas

Spellbook adalah repositori open-source untuk abstraksi tabel Dune.

\`\`\`bash
# Cara berkontribusi
1. Fork github.com/duneanalytics/spellbook
2. Buat model baru di folder models/
3. Definisikan schema dan test
4. Submit Pull Request
\`\`\`

## Use Cases Dune API

- Dashboard real-time di website sendiri
- Alert otomatis (kirim notif jika TVL turun 10%)
- Feed data ke aplikasi DeFi
- Research automation`;

const L_FOOTPRINT = `# Pengenalan Footprint Analytics

## Apa itu Footprint?

Footprint Analytics adalah platform analisis blockchain dengan fokus pada **DeFi dan GameFi**. Keunggulan utama: tersedia mode **no-code** (drag & drop) selain SQL.

## Footprint vs Dune

| Fitur | Footprint | Dune |
|-------|-----------|------|
| No-code chart builder | ✅ | ❌ |
| SQL mode | ✅ | ✅ |
| DeFi data | ✅ Sangat lengkap | ✅ |
| GameFi data | ✅ | Terbatas |
| Komunitas | Berkembang | Sangat besar |
| Harga | Gratis (basic) | Gratis (basic) |

## Dataset Utama Footprint

\`\`\`
DeFi:
- protocol_daily_stats    → TVL, volume, users per protokol
- dex_transaction         → DEX swap trades
- lending_transaction     → Borrow/supply di lending protokol

GameFi:
- game_daily_stats        → DAU, TX count per game
- nft_transaction         → NFT trades

Token:
- token_price_daily       → Harga token historis
\`\`\`

## Cara Daftar & Mulai

1. Buka **footprint.network**
2. Klik **"Sign Up"** (gratis dengan email/Google)
3. Explore Dashboard publik
4. Klik **"Create"** → **"Chart"** untuk mulai analisis`;

const L_NOCODE = `# No-Code Dashboard di Footprint

## Membuat Chart Tanpa SQL

1. Klik **"Create"** → **"Chart"**
2. Pilih **Dataset**: misal \`protocol_daily_stats\`
3. Di panel kanan:
   - **X-axis**: date
   - **Y-axis**: tvl
   - **Breakdown**: protocol_name (untuk compare)
4. Tambahkan **Filter**: \`chain = 'Ethereum'\`
5. Pilih **Chart Type**: Line Chart
6. Klik **"Save"**

## Filter & Parameter

Di Footprint, kamu bisa tambahkan filter yang bisa diubah oleh viewer:
- Date range picker
- Dropdown protocol/chain
- Multi-select token

## Membuat Dashboard

1. **"Create"** → **"Dashboard"**
2. Klik **"Add Chart"** → pilih chart yang sudah dibuat
3. Drag & resize setiap chart
4. Tambahkan **Text Card** untuk judul dan penjelasan
5. Tambahkan **Global Filter** untuk interaktivitas
6. **"Publish"** → share URL`;

const L_SQL_FOOTPRINT = `# SQL Mode di Footprint

## Menggunakan SQL di Footprint

Footprint juga mendukung SQL untuk analisis yang lebih kompleks.

\`\`\`sql
-- TVL semua protokol DeFi di Ethereum 90 hari terakhir
SELECT
  date,
  protocol_name,
  chain,
  tvl
FROM protocol_daily_stats
WHERE date >= DATE_ADD('day', -90, CURRENT_DATE)
  AND chain = 'Ethereum'
  AND tvl > 1000000
ORDER BY date DESC, tvl DESC
LIMIT 100;
\`\`\`

## Analisis GameFi

\`\`\`sql
-- Top 10 games by Daily Active Users
SELECT
  date,
  game_name,
  chain,
  dau AS daily_active_users,
  transaction_count,
  volume_usd
FROM game_daily_stats
WHERE date >= DATE_ADD('day', -30, CURRENT_DATE)
ORDER BY dau DESC
LIMIT 50;
\`\`\`

## Perbedaan SQL Footprint vs DuneSQL

| Fitur | Footprint | DuneSQL |
|-------|-----------|---------|
| Interval | DATE_ADD() | INTERVAL '7' DAY |
| Current date | CURRENT_DATE | NOW() |
| Engine | Trino/Presto | Trino |
| Data focus | DeFi/GameFi | General blockchain |

> 💡 **Tips**: Mulai dengan no-code explorer untuk memahami struktur tabel, lalu beralih ke SQL untuk analisis yang lebih custom dan kompleks.`;

// ─── QUIZ DUNE/ONCHAIN/ADVANCED/FOOTPRINT ────────────────────────────────────

const Q_DUNE = [
  { text: "Apa yang dimaksud 'Spellbook' di Dune Analytics?", options: ["Buku dokumentasi Dune", "Repositori open-source yang berisi abstraksi tabel on-chain yang sudah diproses", "Tool untuk generate query", "Premium feature berbayar"], answer: 1, order: 1 },
  { text: "Tabel dex.trades berisi?", options: ["Hanya Uniswap trades di Ethereum", "Semua DEX swap dari berbagai protokol dan chain yang sudah dinormalisasi", "Hanya data CEX", "Data harga token"], answer: 1, order: 2 },
  { text: "Sintaks parameter di DuneSQL menggunakan?", options: ["@variable", "${variable}", "{{variable}}", ":variable"], answer: 2, order: 3 },
  { text: "Decoded tables di Dune dibuat berdasarkan?", options: ["Input manual tim Dune", "ABI smart contract yang disubmit ke Dune", "Data dari CoinGecko", "Block headers"], answer: 1, order: 4 },
  { text: "Visualisasi apa yang paling cocok untuk menampilkan market share DEX?", options: ["Line chart", "Counter", "Pie/Donut chart", "Scatter plot"], answer: 2, order: 5 },
];

const Q_TOKEN_NFT = [
  { text: "Tabel apa di Dune yang berisi semua NFT trades?", options: ["ethereum.logs", "opensea.trades", "nft.trades", "tokens.nft"], answer: 2, order: 1 },
  { text: "USDC memiliki 6 decimal. Untuk mendapat nilai USDC dari raw amount, bagi dengan?", options: ["1e18", "1e8", "1e6", "1e12"], answer: 2, order: 2 },
  { text: "Bagaimana cara menemukan floor price NFT collection per hari?", options: ["MAX(amount_usd) GROUP BY day", "MIN(amount_usd) GROUP BY day", "AVG(amount_usd) GROUP BY day", "SUM(amount_usd) GROUP BY day"], answer: 1, order: 3 },
  { text: "Apa yang dimaksud 'whale' dalam konteks holder analysis?", options: ["Wallet dengan banyak NFT", "Address dengan saldo atau volume transaksi sangat besar", "Developer smart contract", "Validator Ethereum"], answer: 1, order: 4 },
  { text: "tokens.transfers berisi?", options: ["Hanya ETH native transfers", "Semua ERC20 token transfer events", "Hanya stablecoin transfers", "NFT transfers"], answer: 1, order: 5 },
];

const Q_DEFI_MEV = [
  { text: "TVL (Total Value Locked) mengukur?", options: ["Total transaksi harian", "Total aset yang di-deposit ke protokol DeFi", "Total token yang beredar", "Total gas fee"], answer: 1, order: 1 },
  { text: "MEV (Maximal Extractable Value) adalah?", options: ["Biaya gas transaksi", "Profit yang bisa diekstrak dengan mengatur urutan transaksi dalam block", "Reward staking", "Fee liquidity provider"], answer: 1, order: 2 },
  { text: "Sandwich attack terdiri dari berapa transaksi?", options: ["1 transaksi", "2 transaksi", "3 transaksi (front-run + victim + back-run)", "4 transaksi"], answer: 2, order: 3 },
  { text: "dex.trades berisi?", options: ["Hanya Uniswap", "Semua DEX swap multi-chain yang sudah dinormalisasi", "Hanya Ethereum", "Data CEX"], answer: 1, order: 4 },
  { text: "Aave adalah protokol?", options: ["DEX (Decentralized Exchange)", "Lending/Borrowing protocol", "NFT marketplace", "Layer 2 solution"], answer: 1, order: 5 },
];

const Q_ADVANCED = [
  { text: "Smart money dalam on-chain analysis merujuk pada?", options: ["Transaksi nilai tinggi", "Wallet dari trader/fund berpengalaman yang gerakannya sering diikuti", "Smart contract wallet", "Wallet dengan gas rendah"], answer: 1, order: 1 },
  { text: "Model UTXO (Bitcoin) berbeda dengan Account Model (Ethereum) karena?", options: ["Bitcoin lebih cepat", "UTXO melacak unspent outputs, Account model melacak saldo akun", "Ethereum lebih aman", "Tidak ada perbedaan"], answer: 1, order: 2 },
  { text: "Dune API digunakan untuk?", options: ["Edit data on-chain", "Fetch hasil query secara programmatic untuk integrasi ke aplikasi", "Deploy smart contract", "Trade token"], answer: 1, order: 3 },
  { text: "Spellbook di Dune adalah?", options: ["AI query generator", "Repositori open-source untuk abstraksi tabel yang dikontribusi komunitas", "Dokumentasi resmi", "Premium feature"], answer: 1, order: 4 },
  { text: "Dalam satoshi, 1 BTC = berapa satoshi?", options: ["1e6 satoshi", "1e8 satoshi", "1e18 satoshi", "1e10 satoshi"], answer: 1, order: 5 },
];

const Q_FOOTPRINT = [
  { text: "Keunggulan utama Footprint vs Dune?", options: ["Footprint lebih cepat", "Footprint punya no-code drag & drop chart builder", "Footprint gratis sepenuhnya", "Footprint support Bitcoin"], answer: 1, order: 1 },
  { text: "protocol_daily_stats di Footprint berisi?", options: ["Harga token harian", "TVL, volume, dan user count per protokol DeFi", "NFT trading data", "GameFi leaderboard"], answer: 1, order: 2 },
  { text: "Footprint Analytics fokus pada data?", options: ["Bitcoin dan Lightning Network", "DeFi dan GameFi", "CEX trading", "Social media blockchain"], answer: 1, order: 3 },
  { text: "Perbedaan syntax interval di Footprint vs DuneSQL?", options: ["Sama persis", "Footprint: DATE_ADD('day', -7, CURRENT_DATE); Dune: NOW() - INTERVAL '7' DAY", "Footprint menggunakan PostgreSQL syntax", "Tidak ada interval di Footprint"], answer: 1, order: 4 },
  { text: "game_daily_stats di Footprint berisi?", options: ["Harga token game", "DAU, transaction count, dan volume per blockchain game", "NFT item stats", "Smart contract code"], answer: 1, order: 5 },
];

// ─── CURRICULUM DATA ──────────────────────────────────────────────────────────

const curriculum = [
  {
    title: "SQL Fundamentals",
    slug: "sql-fundamentals",
    description: "Kuasai SQL dari nol untuk analisis data blockchain. Mulai dari SELECT dasar, JOIN, CTE, Window Functions, hingga optimasi query DuneSQL untuk on-chain analysis profesional.",
    icon: "🗄️", level: "Beginner", order: 1,
    modules: [
      {
        title: "Pengantar SQL Dasar", slug: "pengantar-sql-dasar", order: 1,
        lessons: [
          { title: "Apa itu Database & SQL?", slug: "apa-itu-database-sql", order: 1, content: L_APA_ITU_DB, lessonQuiz: [
            { text: "Apa yang dimaksud dengan 'kolom' dalam sebuah tabel database?", options: ["Satu catatan atau transaksi tunggal", "Kategori atau atribut yang mendefinisikan jenis informasi", "Bahasa untuk mengambil data dari database", "Sistem penyimpanan data digital"], answer: 1, order: 1 },
            { text: "Berapa nilai 1 ETH dalam satuan wei?", options: ["1.000.000 wei (10⁶)", "1.000.000.000 wei (10⁹)", "1.000.000.000.000.000.000 wei (10¹⁸)", "1.000.000.000.000 wei (10¹²)"], answer: 2, order: 2 },
            { text: "Platform analisis blockchain mana yang menggunakan dialek SQL berbasis Trino (DuneSQL)?", options: ["Footprint Analytics", "Flipside Crypto", "Dune Analytics", "Allium"], answer: 2, order: 3 },
            { text: "Manakah pernyataan yang BENAR mengenai perbedaan baris dan kolom dalam tabel?", options: ["Baris mendefinisikan kategori data; kolom merepresentasikan satu catatan", "Baris merepresentasikan satu catatan; kolom mendefinisikan kategori data", "Baris dan kolom memiliki fungsi yang identik", "Kolom berisi data transaksi; baris berisi metadata tabel"], answer: 1, order: 4 },
            { text: "Apa kepanjangan dari SQL?", options: ["Simple Query Language", "System Query Logic", "Structured Query Language", "Sequential Query List"], answer: 2, order: 5 },
          ] },
          { title: "SELECT & FROM — Cara Membaca Data", slug: "select-from", order: 2, content: L_SELECT_FROM, lessonQuiz: [
            { text: "Apa fungsi klausa FROM dalam sebuah query SQL?", options: ["Menentukan kolom yang akan ditampilkan", "Menentukan tabel sumber data yang akan dibaca", "Memfilter baris berdasarkan kondisi tertentu", "Mengurutkan hasil query"], answer: 1, order: 1 },
            { text: "Mengapa kolom 'from' dan 'to' di Dune Analytics harus ditulis dengan tanda kutip ganda (\"from\", \"to\")?", options: ["Karena keduanya berisi alamat wallet yang panjang", "Karena keduanya merupakan reserved words dalam SQL", "Karena Dune menggunakan dialek SQL yang berbeda dari standar", "Karena nilainya bisa berupa NULL"], answer: 1, order: 2 },
            { text: "Apa risiko utama menggunakan SELECT * tanpa LIMIT pada tabel blockchain?", options: ["Query akan menampilkan kolom yang salah", "Query akan gagal karena syntax error", "Query berpotensi timeout karena membaca miliaran baris data", "Alias tidak akan berfungsi dengan SELECT *"], answer: 2, order: 3 },
            { text: "Manakah query yang BENAR untuk menampilkan nilai transaksi dalam satuan ETH dengan nama kolom 'jumlah_eth'?", options: ["SELECT value AS jumlah_eth FROM ethereum.transactions", "SELECT value / 1e18 AS jumlah_eth FROM ethereum.transactions LIMIT 10", "SELECT value * 1e18 AS jumlah_eth FROM ethereum.transactions LIMIT 10", "SELECT ETH(value) AS jumlah_eth FROM ethereum.transactions"], answer: 1, order: 4 },
            { text: "Kata kunci apa yang digunakan untuk memberi nama alias pada kolom hasil query?", options: ["NAME", "ALIAS", "AS", "RENAME"], answer: 2, order: 5 },
          ] },
          { title: "WHERE — Cara Filter Data", slug: "where-filter", order: 3, content: L_WHERE, lessonQuiz: [
            { text: "Operator apa yang digunakan untuk mencocokkan nilai dalam sebuah daftar (list)?", options: ["BETWEEN", "LIKE", "IN", "EXISTS"], answer: 2, order: 1 },
            { text: "Bagaimana cara memfilter baris yang nilai kolomnya adalah NULL?", options: ["WHERE kolom = NULL", "WHERE kolom IS NULL", "WHERE kolom == NULL", "WHERE ISNULL(kolom)"], answer: 1, order: 2 },
            { text: "Operator mana yang digunakan untuk pattern matching dengan wildcard '%'?", options: ["IN", "BETWEEN", "LIKE", "MATCH"], answer: 2, order: 3 },
            { text: "Query mana yang benar untuk mencari transaksi ETH antara 1 dan 10 ETH?", options: ["WHERE value/1e18 > 1 OR value/1e18 < 10", "WHERE value/1e18 BETWEEN 1 AND 10", "WHERE value/1e18 IN (1, 10)", "WHERE value/1e18 LIKE '1%'"], answer: 1, order: 4 },
            { text: "Apa fungsi operator AND dalam klausa WHERE?", options: ["Menggabungkan dua tabel", "Semua kondisi yang digabungkan harus terpenuhi", "Minimal satu kondisi harus terpenuhi", "Membalik logika kondisi"], answer: 1, order: 5 },
          ] },
          { title: "ORDER BY — Mengurutkan Hasil", slug: "order-by", order: 4, content: L_ORDER_BY, lessonQuiz: [
            { text: "Apa default urutan pengurutan ORDER BY jika tidak disebutkan?", options: ["DESC (terbesar ke terkecil)", "ASC (terkecil ke terbesar)", "Random", "Sesuai urutan insert"], answer: 1, order: 1 },
            { text: "Query mana yang menampilkan 10 transaksi dengan nilai ETH terbesar?", options: ["SELECT * FROM ethereum.transactions ORDER BY value LIMIT 10", "SELECT * FROM ethereum.transactions ORDER BY value DESC LIMIT 10", "SELECT * FROM ethereum.transactions LIMIT 10 ORDER BY value DESC", "SELECT TOP 10 * FROM ethereum.transactions ORDER BY value DESC"], answer: 1, order: 2 },
            { text: "Apa fungsi LIMIT dalam sebuah query?", options: ["Memfilter baris berdasarkan kondisi", "Membatasi jumlah baris yang ditampilkan", "Mengurutkan hasil query", "Mengelompokkan data"], answer: 1, order: 3 },
            { text: "Bagaimana cara mengurutkan berdasarkan dua kolom: block_time DESC, value ASC?", options: ["ORDER BY block_time DESC AND value ASC", "ORDER BY block_time DESC, value ASC", "ORDER BY (block_time DESC, value ASC)", "SORT BY block_time DESC, value ASC"], answer: 1, order: 4 },
            { text: "NULLS LAST dalam ORDER BY berarti?", options: ["NULL dianggap bernilai nol", "Baris dengan nilai NULL muncul di akhir hasil", "NULL diabaikan dari hasil", "Error jika ada NULL"], answer: 1, order: 5 },
          ] },
        ],
        quiz: { questions: [...Q_SQL_DASAR.slice(0,2), ...Q_SELECT.slice(0,2), Q_WHERE[1]] },
      },
      {
        title: "Agregasi & Group BY", slug: "agregasi-group-by", order: 2,
        lessons: [
          { title: "Fungsi Agregat: COUNT, SUM, AVG, MAX, MIN", slug: "fungsi-agregat", order: 1, content: L_AGREGAT, lessonQuiz: [
            { text: "Apa perbedaan COUNT(*) dan COUNT(kolom)?", options: ["Tidak ada perbedaan", "COUNT(*) menghitung semua baris termasuk NULL; COUNT(kolom) hanya menghitung nilai non-NULL", "COUNT(kolom) lebih cepat", "COUNT(*) hanya menghitung baris unik"], answer: 1, order: 1 },
            { text: "Klausa apa yang wajib digunakan bersama fungsi agregat untuk mengelompokkan data?", options: ["ORDER BY", "WHERE", "GROUP BY", "HAVING"], answer: 2, order: 2 },
            { text: "Apa perbedaan WHERE dan HAVING dalam query dengan agregasi?", options: ["Tidak ada perbedaan", "WHERE memfilter sebelum agregasi; HAVING memfilter setelah agregasi", "HAVING memfilter sebelum agregasi; WHERE setelah", "WHERE hanya untuk angka, HAVING untuk teks"], answer: 1, order: 3 },
            { text: "Query mana yang benar untuk menghitung total volume trading per hari dari tabel dex.trades?", options: ["SELECT day, COUNT(amount_usd) FROM dex.trades GROUP BY day", "SELECT day, SUM(amount_usd) FROM dex.trades GROUP BY day", "SELECT SUM(amount_usd) FROM dex.trades WHERE day GROUP BY day", "SELECT day FROM dex.trades GROUP BY SUM(amount_usd)"], answer: 1, order: 4 },
            { text: "Fungsi agregat mana yang tepat untuk menemukan harga NFT tertinggi yang pernah terjual?", options: ["AVG(price_usd)", "MIN(price_usd)", "MAX(price_usd)", "SUM(price_usd)"], answer: 2, order: 5 },
          ] },
        ],
        quiz: { questions: Q_AGREGAT },
      },
      {
        title: "JOIN Table", slug: "join-table", order: 3,
        lessons: [
          { title: "INNER JOIN, LEFT JOIN & Menggabungkan Tabel", slug: "memahami-join", order: 1, content: L_JOIN, lessonQuiz: [
            { text: "Apa perbedaan utama INNER JOIN dan LEFT JOIN?", options: ["INNER JOIN lebih cepat dari LEFT JOIN", "INNER JOIN hanya mengembalikan baris yang cocok di kedua tabel; LEFT JOIN mengembalikan semua baris tabel kiri meski tidak ada pasangan", "LEFT JOIN hanya mengembalikan baris yang cocok di kedua tabel", "Tidak ada perbedaan"], answer: 1, order: 1 },
            { text: "Klausa apa yang digunakan untuk mendefinisikan kondisi penggabungan tabel dalam JOIN?", options: ["WHERE", "ON", "USING", "MATCH"], answer: 1, order: 2 },
            { text: "Untuk menemukan address yang mengirim ETH tapi TIDAK pernah menerima, join mana yang tepat?", options: ["INNER JOIN antara senders dan receivers", "LEFT JOIN senders dengan receivers, lalu filter WHERE receiver IS NULL", "RIGHT JOIN receivers dengan senders", "FULL OUTER JOIN"], answer: 1, order: 3 },
            { text: "Dalam query JOIN berikut, kolom 'e.hash' merujuk pada?", options: ["Kolom hash dari semua tabel", "Kolom hash dari tabel dengan alias 'e'", "Hash hasil kalkulasi JOIN", "Error karena harus pakai nama tabel penuh"], answer: 1, order: 4 },
            { text: "Mengapa perlu mendefinisikan alias tabel (misalnya 'tx') saat menulis JOIN?", options: ["Wajib secara syntax", "Agar query lebih cepat", "Untuk memperpendek penulisan dan menghindari ambiguitas nama kolom yang sama di dua tabel", "Untuk mengubah nama tabel secara permanen"], answer: 2, order: 5 },
          ] },
        ],
        quiz: { questions: Q_JOIN },
      },
      {
        title: "Subquery & CTE", slug: "subquery-cte", order: 4,
        lessons: [
          { title: "Subquery — Query di Dalam Query", slug: "subquery", order: 1, content: L_SUBQUERY, lessonQuiz: [
            { text: "Di mana subquery dapat diletakkan dalam sebuah query SQL?", options: ["Hanya dalam klausa WHERE", "Hanya dalam klausa FROM", "Dalam SELECT, FROM, dan WHERE", "Hanya dalam klausa SELECT"], answer: 2, order: 1 },
            { text: "Apa yang dimaksud 'scalar subquery'?", options: ["Subquery yang mengembalikan banyak baris", "Subquery yang mengembalikan tepat satu nilai (satu baris, satu kolom)", "Subquery dalam klausa FROM", "Subquery yang menggunakan fungsi agregat"], answer: 1, order: 2 },
            { text: "Subquery di klausa FROM sering disebut juga sebagai?", options: ["Nested query", "Derived table atau inline view", "Correlated query", "Union query"], answer: 1, order: 3 },
            { text: "Kapan sebaiknya menggunakan subquery dibandingkan JOIN?", options: ["Saat tabel yang digabung sangat besar", "Saat hanya butuh satu nilai agregat dari tabel lain sebagai filter", "Subquery selalu lebih baik dari JOIN", "JOIN selalu lebih baik dari subquery"], answer: 1, order: 4 },
            { text: "Operator IN dengan subquery berfungsi untuk?", options: ["Memeriksa apakah nilai ada dalam hasil subquery", "Menggabungkan dua tabel", "Menghitung jumlah baris subquery", "Mengurutkan berdasarkan subquery"], answer: 0, order: 5 },
          ] },
          { title: "CTE dengan WITH — Query yang Rapi", slug: "cte-with", order: 2, content: L_CTE, lessonQuiz: [
            { text: "Kata kunci apa yang digunakan untuk mendefinisikan CTE?", options: ["DEFINE", "CREATE TEMP", "WITH", "DECLARE"], answer: 2, order: 1 },
            { text: "Apa keuntungan utama menggunakan CTE dibandingkan subquery bertingkat?", options: ["CTE lebih cepat dari subquery", "CTE membuat query lebih mudah dibaca dan di-debug karena setiap langkah diberi nama", "CTE otomatis di-cache oleh database", "CTE tidak perlu klausa FROM"], answer: 1, order: 2 },
            { text: "Bisakah satu query mendefinisikan lebih dari satu CTE?", options: ["Tidak, hanya boleh satu CTE", "Ya, dengan memisahkan setiap CTE menggunakan koma setelah WITH", "Ya, dengan menulis WITH berulang kali", "Tergantung database engine"], answer: 1, order: 3 },
            { text: "Apakah CTE bisa direferensikan lebih dari satu kali dalam query yang sama?", options: ["Tidak, hanya bisa digunakan sekali", "Ya, CTE dapat dipanggil berkali-kali dalam query yang sama", "Tergantung apakah CTE mengandung agregasi", "Hanya jika menggunakan MATERIALIZED"], answer: 1, order: 4 },
            { text: "Dalam konteks analisis on-chain, CTE paling berguna untuk?", options: ["Mempercepat query secara otomatis", "Memecah query kompleks multi-langkah menjadi bagian yang mudah dipahami", "Menggantikan fungsi JOIN", "Menyimpan data secara permanen"], answer: 1, order: 5 },
          ] },
        ],
        quiz: { questions: Q_SUBQUERY_CTE },
      },
      {
        title: "Window Functions", slug: "window-functions", order: 5,
        lessons: [
          { title: "OVER, PARTITION BY, ROW_NUMBER, LAG & LEAD", slug: "window-functions-lengkap", order: 1, content: L_WINDOW, lessonQuiz: [
            { text: "Apa perbedaan Window Function dengan GROUP BY + agregasi?", options: ["Tidak ada perbedaan", "Window Function menghitung nilai per baris tanpa menggabungkan baris ke satu hasil; GROUP BY menggabungkan baris menjadi satu", "Window Function lebih lambat", "GROUP BY tidak bisa digunakan dengan agregasi"], answer: 1, order: 1 },
            { text: "Apa fungsi PARTITION BY dalam window function?", options: ["Mengurutkan baris dalam window", "Membagi data menjadi partisi/grup terpisah; kalkulasi window dilakukan per partisi", "Membatasi jumlah baris yang dihitung", "Menggabungkan dua tabel"], answer: 1, order: 2 },
            { text: "ROW_NUMBER() digunakan untuk?", options: ["Menghitung total baris", "Memberikan nomor urut unik ke setiap baris dalam partisi", "Menghitung perbedaan antara dua baris", "Menjumlahkan nilai kumulatif"], answer: 1, order: 3 },
            { text: "LAG(value, 1) dalam window function mengambil?", options: ["Nilai baris berikutnya", "Nilai baris sebelumnya (offset 1)", "Rata-rata dari semua baris sebelumnya", "Nilai maksimum dari partisi"], answer: 1, order: 4 },
            { text: "SUM(volume) OVER (ORDER BY day) menghasilkan?", options: ["Total volume keseluruhan", "Cumulative sum — total volume kumulatif hingga baris saat ini", "Rata-rata volume harian", "Volume per hari saja"], answer: 1, order: 5 },
          ] },
        ],
        quiz: { questions: Q_WINDOW },
      },
      {
        title: "Date, Time & String Functions", slug: "date-time-string", order: 6,
        lessons: [
          { title: "Fungsi Tanggal & Waktu", slug: "fungsi-tanggal-waktu", order: 1, content: L_DATE, lessonQuiz: [
            { text: "Fungsi apa yang digunakan di DuneSQL (Trino) untuk mendapatkan waktu saat ini?", options: ["GETDATE()", "SYSDATE()", "NOW()", "CURRENT_TIMESTAMP()"], answer: 2, order: 1 },
            { text: "Apa hasil dari date_trunc('month', timestamp '2024-03-15 10:30:00') di Trino?", options: ["2024-03-15 00:00:00", "2024-03-01 00:00:00", "2024-01-01 00:00:00", "2024-03-15 10:00:00"], answer: 1, order: 2 },
            { text: "Cara yang benar untuk mendapatkan data 7 hari terakhir di DuneSQL adalah?", options: ["WHERE block_time >= DATE_SUB(NOW(), 7)", "WHERE block_time >= NOW() - INTERVAL '7' DAY", "WHERE block_time >= NOW() - 7 DAY", "WHERE block_time BETWEEN NOW() AND -7 DAY"], answer: 1, order: 3 },
            { text: "Fungsi EXTRACT(HOUR FROM block_time) digunakan untuk?", options: ["Menghapus jam dari timestamp", "Mengambil komponen jam dari sebuah nilai timestamp", "Menambahkan jam ke timestamp", "Mengkonversi timestamp ke zona waktu lain"], answer: 1, order: 4 },
            { text: "date_diff('day', start_time, end_time) menghitung?", options: ["Jumlah hari antara start_time dan end_time", "Menambahkan hari ke start_time", "Format tanggal dalam hari", "Hari dalam seminggu"], answer: 0, order: 5 },
          ] },
          { title: "Fungsi String & Konversi Tipe", slug: "fungsi-string-konversi", order: 2, content: L_STRING, lessonQuiz: [
            { text: "Fungsi apa yang mengubah semua huruf menjadi huruf kecil?", options: ["UPPER()", "TRIM()", "LOWER()", "SUBSTRING()"], answer: 2, order: 1 },
            { text: "Cara menggabungkan dua string 'Hello' dan 'World' di SQL?", options: ["CONCAT('Hello', 'World') atau 'Hello' || 'World'", "'Hello' + 'World'", "MERGE('Hello', 'World')", "JOIN('Hello', 'World')"], answer: 0, order: 2 },
            { text: "CAST(value AS VARCHAR) digunakan untuk?", options: ["Mengubah tipe data value menjadi teks (VARCHAR)", "Mengubah teks menjadi angka", "Memotong teks", "Mencari nilai dalam teks"], answer: 0, order: 3 },
            { text: "Fungsi apa yang mengambil sebagian karakter dari sebuah string?", options: ["TRIM()", "LOWER()", "SUBSTRING() atau SUBSTR()", "CONCAT()"], answer: 2, order: 4 },
            { text: "Dalam konteks Dune, mengapa sering perlu LOWER(address)?", options: ["Untuk menghemat ruang penyimpanan", "Karena alamat Ethereum bisa tersimpan dalam campuran huruf besar/kecil; LOWER() memastikan perbandingan konsisten", "Karena UPPER() tidak tersedia di DuneSQL", "Tidak perlu, address selalu lowercase"], answer: 1, order: 5 },
          ] },
        ],
        quiz: { questions: Q_DATE },
      },
      {
        title: "Advanced SQL", slug: "advanced-sql", order: 7,
        lessons: [
          { title: "CASE WHEN, UNION, INTERSECT & NULL Handling", slug: "case-union-null", order: 1, content: L_CASE_WHEN, lessonQuiz: [
            { text: "Apa fungsi CASE WHEN dalam SQL?", options: ["Menggabungkan dua tabel", "Membuat logika kondisional IF-THEN-ELSE dalam query", "Mengelompokkan data berdasarkan kondisi", "Memfilter baris berdasarkan kondisi"], answer: 1, order: 1 },
            { text: "Apa fungsi klausa ELSE dalam CASE WHEN?", options: ["Wajib ada di setiap CASE WHEN", "Menentukan nilai default jika tidak ada kondisi WHEN yang terpenuhi", "Mengakhiri blok CASE WHEN", "Sama dengan END"], answer: 1, order: 2 },
            { text: "Perbedaan UNION dan UNION ALL adalah?", options: ["Tidak ada perbedaan", "UNION menghilangkan duplikat; UNION ALL menyertakan semua baris termasuk duplikat", "UNION ALL lebih lambat dari UNION", "UNION hanya untuk dua tabel"], answer: 1, order: 3 },
            { text: "COALESCE(a, b, c) mengembalikan?", options: ["Nilai terbesar dari a, b, c", "Nilai pertama yang bukan NULL dari daftar argumen", "Jumlah dari a, b, c", "NULL jika salah satu argumen NULL"], answer: 1, order: 4 },
            { text: "Mengapa penting menangani NULL dalam kalkulasi on-chain?", options: ["NULL tidak ada di data blockchain", "Operasi aritmatika dengan NULL menghasilkan NULL, sehingga bisa menyebabkan hasil analisis yang salah", "NULL hanya ada di kolom teks", "Database otomatis mengubah NULL menjadi 0"], answer: 1, order: 5 },
          ] },
        ],
        quiz: { questions: Q_CASE_WHEN },
      },
      {
        title: "DuneSQL & Query Optimization", slug: "dunesql-optimization", order: 8,
        lessons: [
          { title: "Mengenal Dune & DuneSQL (Trino)", slug: "mengenal-dune-dunesql", order: 1, content: L_DUNESQL, lessonQuiz: [
            { text: "DuneSQL berbasis engine SQL apa?", options: ["PostgreSQL", "MySQL", "Trino (sebelumnya PrestoSQL)", "BigQuery"], answer: 2, order: 1 },
            { text: "Bagaimana cara menulis parameter/variabel di DuneSQL?", options: ["@variable_name", "$variable_name", "{{variable_name}}", ":variable_name"], answer: 2, order: 2 },
            { text: "Apa kegunaan fungsi bytea2numeric() di DuneSQL?", options: ["Mengkonversi alamat wallet ke format checksum", "Mengkonversi nilai hexadecimal/bytea menjadi angka desimal", "Mengubah angka menjadi format hex", "Memformat angka dalam notasi ilmiah"], answer: 1, order: 3 },
            { text: "Tipe data varbinary di DuneSQL digunakan untuk menyimpan?", options: ["Teks panjang", "Data biner seperti alamat wallet dan transaction hash (format hex)", "Angka desimal presisi tinggi", "Array JSON"], answer: 1, order: 4 },
            { text: "Fungsi TRY() di DuneSQL berguna untuk?", options: ["Mencoba koneksi ke database", "Membungkus ekspresi agar tidak error dan mengembalikan NULL jika gagal", "Menjalankan query secara paralel", "Testing performa query"], answer: 1, order: 5 },
          ] },
          { title: "Optimasi Query di Dune", slug: "optimasi-query-dune", order: 2, content: L_OPTIMIZE, lessonQuiz: [
            { text: "Cara paling efektif mengurangi jumlah data yang di-scan di Dune adalah?", options: ["Menggunakan SELECT *", "Menambahkan filter WHERE pada kolom partisi seperti block_time atau block_date", "Menggunakan ORDER BY di awal", "Memperbesar LIMIT"], answer: 1, order: 1 },
            { text: "Mengapa sebaiknya menghindari SELECT * di Dune?", options: ["Sintaks SELECT * tidak valid di DuneSQL", "Membaca semua kolom berarti lebih banyak data di-scan, memperlambat query dan meningkatkan biaya komputasi", "SELECT * tidak bisa digunakan dengan WHERE", "Hanya satu kolom yang boleh dipilih"], answer: 1, order: 2 },
            { text: "Tabel ethereum.transactions di Dune biasanya dipartisi berdasarkan?", options: ["Nilai transaksi (value)", "Alamat pengirim (from)", "Waktu blok (block_time atau block_date)", "Hash transaksi"], answer: 2, order: 3 },
            { text: "approx_distinct() vs COUNT(DISTINCT): kapan sebaiknya menggunakan approx_distinct()?", options: ["Saat akurasi 100% mutlak diperlukan", "Saat performa lebih penting dari akurasi mutlak; approx_distinct jauh lebih cepat untuk data besar dengan error ~2%", "approx_distinct tidak tersedia di DuneSQL", "Keduanya sama saja"], answer: 1, order: 3 },
            { text: "Mengapa filter pada kolom yang sudah di-decode lebih efisien daripada filter pada ethereum.logs raw?", options: ["Tabel decoded lebih kecil", "Tabel decoded menggunakan index yang lebih baik", "Decoded tables sudah terstruktur per kontrak/event sehingga data yang di-scan jauh lebih sedikit", "Raw logs tidak bisa difilter"], answer: 2, order: 5 },
          ] },
        ],
        quiz: { questions: Q_DUNESQL },
      },
    ],
  },
  {
    title: "Dune Analytics",
    slug: "dune-analytics",
    description: "Pelajari Dune Analytics dari awal — navigasi platform, query data on-chain, membuat visualisasi menarik, hingga dashboard profesional yang bisa di-share ke komunitas.",
    icon: "🔮", level: "Intermediate", order: 2,
    modules: [
      {
        title: "Pengenalan Dune Analytics", slug: "pengenalan-dune", order: 1,
        lessons: [
          { title: "Apa itu Dune Analytics?", slug: "apa-itu-dune", order: 1, content: L_DUNE_INTRO, lessonQuiz: [
            { text: "Apa yang membuat Dune Analytics berbeda dari platform analisis data tradisional?", options: ["Dune menggunakan Excel untuk visualisasi", "Dune mengindeks data blockchain secara publik dan memungkinkan siapa saja query data on-chain dengan SQL", "Dune hanya support Ethereum mainnet", "Dune memerlukan koneksi langsung ke node blockchain"], answer: 1, order: 1 },
            { text: "Fitur 'Fork' pada query Dune berfungsi untuk?", options: ["Menyalin query orang lain sebagai titik awal untuk dimodifikasi", "Membagi query menjadi beberapa bagian", "Menjalankan query di fork/testnet", "Menghapus query"], answer: 0, order: 2 },
            { text: "Apa itu Dune Spellbook?", options: ["Fitur premium berbayar Dune", "Repositori open-source yang berisi tabel abstraksi on-chain yang dikontribusi komunitas", "Tool AI untuk generate query otomatis", "Dokumentasi resmi Dune"], answer: 1, order: 3 },
            { text: "Chain mana saja yang didukung Dune Analytics?", options: ["Hanya Ethereum", "Ethereum dan Polygon saja", "Multi-chain: Ethereum, Solana, Polygon, Arbitrum, Optimism, Base, dan puluhan chain lainnya", "Hanya EVM-compatible chains"], answer: 2, order: 4 },
            { text: "Wizard di Dune Analytics merujuk pada?", options: ["AI assistant bawaan Dune", "Analis on-chain terkemuka yang aktif berbagi query dan dashboard di komunitas Dune", "Admin platform Dune", "Bot otomatis untuk update dashboard"], answer: 1, order: 5 },
          ] },
          { title: "Raw Tables vs Decoded Tables vs Spellbook", slug: "raw-decoded-spellbook", order: 2, content: L_DUNE_TABLES, lessonQuiz: [
            { text: "Apa yang dimaksud 'Raw Tables' di Dune seperti ethereum.transactions?", options: ["Data yang sudah diproses dan mudah dibaca", "Data mentah langsung dari blockchain tanpa decoding atau transformasi tambahan", "Data yang sudah dihapus", "Data khusus untuk smart contract"], answer: 1, order: 1 },
            { text: "Decoded Tables di Dune dibuat berdasarkan apa?", options: ["Input manual tim Dune Analytics", "ABI (Application Binary Interface) smart contract yang disubmit oleh pengguna atau komunitas", "Data harga dari CoinGecko", "Block header data"], answer: 1, order: 2 },
            { text: "Tabel dex.trades di Spellbook berisi?", options: ["Hanya data Uniswap V3", "Semua DEX swap dari berbagai protokol dan chain yang sudah dinormalisasi ke skema seragam", "Hanya data Ethereum mainnet", "Data CEX trading"], answer: 1, order: 3 },
            { text: "Kapan sebaiknya menggunakan Raw Tables daripada Decoded Tables?", options: ["Selalu gunakan Raw Tables karena lebih akurat", "Saat smart contract belum di-decode atau saat butuh data sangat low-level seperti raw calldata", "Raw Tables tidak tersedia untuk umum", "Saat ingin query lebih cepat"], answer: 1, order: 4 },
            { text: "Keuntungan utama menggunakan Spellbook (tabel seperti dex.trades, nft.trades)?", options: ["Data lebih baru dari tabel biasa", "Abstraksi lintas protokol dan chain — tidak perlu tahu nama tabel spesifik setiap protokol", "Lebih murah secara komputasi", "Hanya tersedia untuk subscriber premium"], answer: 1, order: 5 },
          ] },
        ],
        quiz: { questions: Q_DUNE.slice(0, 5) },
      },
      {
        title: "Visualisasi & Dashboard", slug: "visualisasi-dashboard", order: 2,
        lessons: [
          { title: "Membuat Visualisasi di Dune", slug: "membuat-visualisasi", order: 1, content: L_DUNE_VIZ, lessonQuiz: [
            { text: "Tipe visualisasi apa yang paling tepat untuk menampilkan tren volume DEX selama 30 hari?", options: ["Pie chart", "Counter (angka tunggal)", "Bar chart atau Line chart", "Scatter plot"], answer: 2, order: 1 },
            { text: "Visualisasi 'Counter' di Dune paling cocok untuk menampilkan?", options: ["Tren data harian", "Satu nilai ringkasan seperti total volume atau jumlah pengguna aktif", "Distribusi data", "Perbandingan beberapa kategori"], answer: 1, order: 2 },
            { text: "Pie/Donut chart paling efektif untuk menampilkan?", options: ["Tren harian selama sebulan", "Market share atau proporsi dari sebuah total, seperti dominasi DEX", "Korelasi antara dua variabel", "Data time-series"], answer: 1, order: 3 },
            { text: "Cara menambahkan visualisasi ke query di Dune adalah?", options: ["Klik 'Export' lalu pilih jenis chart", "Klik tab 'New visualization' setelah query berhasil dijalankan", "Hanya bisa dilakukan via Dune API", "Visualisasi dibuat otomatis"], answer: 1, order: 4 },
            { text: "Mengapa penting memilih tipe visualisasi yang tepat?", options: ["Hanya masalah estetika", "Visualisasi yang tepat mempermudah pembaca memahami insight; yang salah bisa menyesatkan", "Semua tipe visualisasi menampilkan data yang sama", "Tipe visualisasi mempengaruhi kecepatan query"], answer: 1, order: 5 },
          ] },
          { title: "Menyusun Dashboard Profesional", slug: "menyusun-dashboard", order: 2, content: L_DUNE_DASH, lessonQuiz: [
            { text: "Elemen apa yang sebaiknya selalu ada di dashboard on-chain profesional?", options: ["Hanya satu chart besar", "Kombinasi counter (ringkasan), chart tren, dan breakdown per kategori", "Sebanyak mungkin chart tanpa struktur", "Hanya tabel data raw"], answer: 1, order: 1 },
            { text: "Cara terbaik menyusun layout dashboard Dune untuk keterbacaan?", options: ["Letakkan semua chart sejajar vertikal", "Mulai dengan KPI/counter di atas, diikuti tren, lalu detail di bawah", "Mulai dengan tabel data raw di atas", "Urutan tidak berpengaruh pada keterbacaan"], answer: 1, order: 2 },
            { text: "Parameter dalam dashboard Dune berfungsi untuk?", options: ["Mempercepat loading dashboard", "Memungkinkan pengguna interaktif mengubah filter seperti chain, protocol, atau rentang waktu", "Mengunci dashboard agar tidak bisa diedit", "Menambah warna pada visualisasi"], answer: 1, order: 3 },
            { text: "Mengapa forking dashboard populer di Dune adalah praktik yang baik untuk pemula?", options: ["Karena Dune mewajibkan semua pengguna untuk fork sebelum membuat baru", "Bisa mempelajari struktur query yang sudah proven dan memodifikasinya sesuai kebutuhan", "Dashboard hasil fork mendapat lebih banyak views", "Fork otomatis mengupdate data"], answer: 1, order: 4 },
            { text: "Apa yang membuat sebuah dashboard on-chain bernilai tinggi bagi komunitas?", options: ["Menggunakan banyak warna mencolok", "Data yang akurat, update otomatis, narasi yang jelas, dan menjawab pertanyaan analisis yang relevan", "Hanya menampilkan data real-time", "Dibuat oleh tim Dune Analytics"], answer: 1, order: 5 },
          ] },
        ],
        quiz: { questions: Q_DUNE },
      },
    ],
  },
  {
    title: "On-Chain Analysis",
    slug: "onchain-analysis",
    description: "Analisis mendalam data on-chain: token ERC20, NFT marketplace, DeFi protocols (Uniswap, Aave), dan deteksi MEV menggunakan SQL di Dune Analytics.",
    icon: "⛓️", level: "Intermediate", order: 3,
    modules: [
      {
        title: "Token & NFT Analysis", slug: "token-nft-analysis", order: 1,
        lessons: [
          { title: "Analisis Token ERC20", slug: "erc20-analysis", order: 1, content: L_ERC20, lessonQuiz: [
            { text: "Tabel Dune mana yang menyimpan semua transfer token ERC20 lintas chain?", options: ["ethereum.transactions", "erc20.transfer", "tokens.transfers", "contracts.tokens"], answer: 2, order: 1 },
            { text: "Token USDC memiliki 6 desimal. Untuk mengkonversi raw amount 5000000 menjadi USDC?", options: ["5000000 / 1e18 = ~0.000005 USDC", "5000000 / 1e6 = 5 USDC", "5000000 / 1e8 = 0.05 USDC", "5000000 tidak perlu dikonversi"], answer: 1, order: 2 },
            { text: "Cara query untuk menemukan top 10 holder sebuah token ERC20 adalah?", options: ["SELECT holder, SUM(value) FROM tokens.transfers GROUP BY holder ORDER BY SUM(value) DESC LIMIT 10", "SELECT to AS holder, SUM(value/decimals) AS balance FROM tokens.transfers WHERE contract_address = '0x...' GROUP BY to ORDER BY balance DESC LIMIT 10", "SELECT * FROM token_holders WHERE token = '0x...' LIMIT 10", "SELECT holder FROM ethereum.transactions ORDER BY value DESC LIMIT 10"], answer: 1, order: 3 },
            { text: "Apa yang dimaksud 'whale' dalam konteks analisis token?", options: ["Smart contract besar", "Wallet dengan saldo atau volume transaksi sangat besar yang gerakannya bisa mempengaruhi pasar", "Validator Ethereum", "Token dengan supply besar"], answer: 1, order: 4 },
            { text: "Transfer event ERC20 standar mengeluarkan data apa?", options: ["Hanya jumlah token yang ditransfer", "From address, to address, dan amount (value)", "From, to, amount, dan gas fee", "Hanya from dan to address"], answer: 1, order: 5 },
          ] },
          { title: "Analisis NFT Marketplace", slug: "nft-analysis", order: 2, content: L_NFT, lessonQuiz: [
            { text: "Tabel Dune yang berisi semua NFT trades lintas marketplace adalah?", options: ["opensea.trades", "ethereum.nft_transfers", "nft.trades", "tokens.nft"], answer: 2, order: 1 },
            { text: "Cara menghitung floor price sebuah NFT collection per hari adalah?", options: ["SELECT AVG(amount_usd) AS floor FROM nft.trades WHERE nft_contract_address = '0x...' GROUP BY date_trunc('day', block_time)", "SELECT MIN(amount_usd) AS floor FROM nft.trades WHERE nft_contract_address = '0x...' GROUP BY date_trunc('day', block_time)", "SELECT MAX(amount_usd) AS floor FROM nft.trades WHERE nft_contract_address = '0x...' GROUP BY date_trunc('day', block_time)", "SELECT FIRST(amount_usd) AS floor FROM nft.trades GROUP BY day"], answer: 1, order: 2 },
            { text: "Apa yang dimaksud 'wash trading' dalam analisis NFT?", options: ["Membersihkan metadata NFT", "Transaksi jual-beli NFT antara wallet yang dikendalikan orang yang sama untuk menciptakan volume palsu", "Proses burning NFT", "Transfer NFT tanpa pembayaran"], answer: 1, order: 3 },
            { text: "Untuk menghitung total royalty yang diterima kreator, perlu query kolom apa dari nft.trades?", options: ["price_usd", "royalty_fee_usd atau royalty_amount", "gas_price", "platform_fee_usd"], answer: 1, order: 4 },
            { text: "Metrik apa yang paling menggambarkan kesehatan sebuah NFT collection?", options: ["Total supply NFT", "Unique buyers, floor price trend, dan volume per hari", "Harga listing tertinggi", "Jumlah transfer"], answer: 1, order: 5 },
          ] },
        ],
        quiz: { questions: Q_TOKEN_NFT },
      },
      {
        title: "DeFi & MEV Analysis", slug: "defi-mev-analysis", order: 2,
        lessons: [
          { title: "Analisis Protokol DeFi", slug: "defi-analysis", order: 1, content: L_DEFI, lessonQuiz: [
            { text: "TVL (Total Value Locked) mengukur?", options: ["Total gas fee yang dibayar ke protokol", "Total nilai aset yang di-deposit atau dikunci dalam smart contract DeFi", "Total volume trading harian", "Jumlah pengguna aktif"], answer: 1, order: 1 },
            { text: "Tabel Dune mana yang berisi data swap dari berbagai DEX secara normalized?", options: ["uniswap.trades", "ethereum.transactions", "dex.trades", "defi.swaps"], answer: 2, order: 2 },
            { text: "Cara menghitung APY (Annual Percentage Yield) dari data Aave di Dune?", options: ["Query langsung kolom APY dari aave.lending_pool", "Hitung dari rasio interest yang terakumulasi per hari lalu annualize", "APY tidak bisa dihitung dari data on-chain", "Ambil dari tabel prices.usd"], answer: 1, order: 3 },
            { text: "Apa yang dimaksud 'liquidity depth' dalam analisis Uniswap V3?", options: ["Jumlah token yang pernah di-swap", "Distribusi likuiditas dalam price range tertentu; mempengaruhi slippage saat trading", "Jumlah LP position yang ada", "Fee tier yang dipilih"], answer: 1, order: 4 },
            { text: "Protokol lending DeFi seperti Aave menggunakan konsep apa untuk mengelola risiko?", options: ["Hanya whitelist pengguna terpercaya", "Collateralization ratio — peminjam harus deposit aset jaminan melebihi nilai pinjaman", "Asuransi dari pihak ketiga", "Verifikasi KYC"], answer: 1, order: 5 },
          ] },
          { title: "Memahami & Mendeteksi MEV", slug: "mev-analysis", order: 2, content: L_MEV, lessonQuiz: [
            { text: "MEV (Maximal Extractable Value) adalah?", options: ["Mining reward validator Ethereum", "Profit yang bisa diekstrak dengan mengatur urutan, menyertakan, atau mengecualikan transaksi dalam sebuah block", "Biaya gas transaksi", "Fee trading DEX"], answer: 1, order: 1 },
            { text: "Sandwich attack terdiri dari urutan transaksi apa?", options: ["1 transaksi besar", "2 transaksi: front-run dan back-run", "3 transaksi: front-run + victim transaction + back-run", "4 transaksi: 2 front-run dan 2 back-run"], answer: 2, order: 2 },
            { text: "Cara mendeteksi sandwich attack dari data on-chain adalah?", options: ["Tidak bisa dideteksi karena terenkripsi", "Cari 3 transaksi berurutan dalam blok yang sama: buy → victim swap → sell token yang sama di pool yang sama", "Lihat transaksi dengan gas fee tertinggi", "Cek tabel mev.sandwiches di Dune"], answer: 1, order: 3 },
            { text: "Flashbots adalah?", options: ["Jenis serangan MEV baru", "Infrastruktur yang memungkinkan MEV searcher mengirim bundle transaksi langsung ke validator secara private", "Plugin wallet untuk proteksi MEV", "Token governance Ethereum"], answer: 1, order: 4 },
            { text: "Mengapa MEV penting dipahami analis on-chain?", options: ["Hanya relevan untuk developer", "MEV mempengaruhi harga efektif transaksi, dapat merugikan trader biasa, dan merupakan bagian besar dari ekonomi Ethereum", "MEV sudah tidak ada sejak The Merge", "MEV hanya terjadi di Bitcoin"], answer: 1, order: 5 },
          ] },
        ],
        quiz: { questions: Q_DEFI_MEV },
      },
    ],
  },
  {
    title: "Advanced On-Chain Analysis",
    slug: "advanced-onchain",
    description: "Analisis multi-chain, cross-chain bridging, wallet clustering, smart money tracking, Bitcoin UTXO model, dan penggunaan Dune API untuk otomatisasi.",
    icon: "🔬", level: "Advanced", order: 4,
    modules: [
      {
        title: "Cross-Chain & Wallet Analysis", slug: "cross-chain-wallet", order: 1,
        lessons: [
          { title: "Analisis Multi-Chain & Bridge Activity", slug: "multichain-analysis", order: 1, content: L_MULTICHAIN, lessonQuiz: [
            { text: "Cara terbaik menganalisis total volume DEX lintas semua chain di Dune adalah?", options: ["Query ethereum.transactions dan hitung manual", "Query tabel dex.trades yang sudah mengandung data multi-chain terstandardisasi", "JOIN semua tabel chain satu per satu", "Hanya bisa di satu chain dalam satu query"], answer: 1, order: 1 },
            { text: "Bridge dalam konteks blockchain berfungsi untuk?", options: ["Menghubungkan smart contract ke dunia nyata", "Memindahkan aset antara blockchain yang berbeda (contoh: ETH dari Ethereum ke Arbitrum)", "Protokol DEX khusus", "Jenis stablecoin"], answer: 1, order: 2 },
            { text: "Cara mengidentifikasi apakah sebuah address adalah bridge contract?", options: ["Cek apakah address memiliki banyak transaksi", "Cek pola transfer: menerima token di satu chain dan mengeluarkan token senilai di chain lain; biasanya terdaftar di labels.contracts", "Semua contract dengan saldo besar adalah bridge", "Bridge selalu memiliki nama 'bridge' di ABI-nya"], answer: 1, order: 3 },
            { text: "Metrik apa yang paling relevan untuk mengukur dominasi sebuah chain?", options: ["Harga native token", "TVL, DAU (daily active users), volume DEX, dan jumlah transaksi aktif", "Jumlah validator", "Ukuran block"], answer: 1, order: 4 },
            { text: "Mengapa analisis multi-chain lebih kompleks dari analisis single-chain?", options: ["Tidak ada perbedaan kompleksitas", "Schema tabel berbeda per chain, bridge menciptakan double-counting, dan aset bisa memiliki representasi berbeda di setiap chain", "Multi-chain tidak didukung Dune", "Query multi-chain selalu lebih lambat"], answer: 1, order: 5 },
          ] },
          { title: "Wallet Clustering & Smart Money", slug: "wallet-clustering", order: 2, content: L_WALLET, lessonQuiz: [
            { text: "Yang dimaksud 'smart money' dalam analisis on-chain adalah?", options: ["Wallet yang menggunakan smart contract", "Wallet dari trader, fund, atau entitas berpengalaman yang track record-nya terbukti profitable", "Wallet dengan saldo terbesar", "Alamat exchange terpusat"], answer: 1, order: 1 },
            { text: "Teknik wallet clustering digunakan untuk?", options: ["Mengenkripsi data wallet", "Mengelompokkan wallet yang kemungkinan dikontrol oleh entitas yang sama berdasarkan pola transaksi", "Membuat wallet baru", "Memblokir wallet mencurigakan"], answer: 1, order: 2 },
            { text: "Sinyal heuristic mana yang menunjukkan dua wallet mungkin milik entitas yang sama?", options: ["Keduanya pernah bertransaksi dengan exchange yang sama", "Wallet A selalu mengirim ETH ke Wallet B tepat sebelum B melakukan swap besar", "Keduanya dibuat di hari yang sama", "Keduanya memiliki saldo yang mirip"], answer: 1, order: 3 },
            { text: "Mengapa melacak pergerakan smart money berguna untuk analisis?", options: ["Untuk mengikuti semua transaksi secara real-time", "Smart money sering early ke protokol baru atau posisi menguntungkan; polanya bisa menjadi sinyal pasar", "Smart money selalu salah sehingga bisa dijadikan kontrarian signal", "Hanya berguna untuk trader jangka pendek"], answer: 1, order: 4 },
            { text: "Tabel labels.addresses di Dune berisi?", options: ["Semua alamat wallet yang pernah ada di Ethereum", "Label nama untuk address terkenal seperti exchange, protokol DeFi, atau entitas yang dikenal", "Hanya alamat exchange terpusat", "Alamat validator/staker"], answer: 1, order: 5 },
          ] },
        ],
        quiz: { questions: Q_ADVANCED },
      },
      {
        title: "Bitcoin Analytics & Dune API", slug: "bitcoin-dune-api", order: 2,
        lessons: [
          { title: "Bitcoin On-Chain Analytics (UTXO Model)", slug: "bitcoin-analytics", order: 1, content: L_BITCOIN, lessonQuiz: [
            { text: "Apa perbedaan mendasar model UTXO (Bitcoin) vs Account model (Ethereum)?", options: ["Tidak ada perbedaan fundamental", "UTXO melacak unspent transaction outputs sebagai 'koin'; Account model melacak saldo (balance) akun secara langsung", "UTXO lebih aman dari Account model", "Account model hanya untuk smart contract"], answer: 1, order: 1 },
            { text: "1 BTC setara dengan berapa satoshi?", options: ["1.000.000 satoshi (10⁶)", "100.000.000 satoshi (10⁸)", "1.000.000.000 satoshi (10⁹)", "10.000.000 satoshi (10⁷)"], answer: 1, order: 2 },
            { text: "Tabel Dune untuk data transaksi Bitcoin adalah?", options: ["bitcoin.transactions", "btc.txs", "bitcoin.inputs dan bitcoin.outputs", "chain.bitcoin_transfers"], answer: 2, order: 3 },
            { text: "Metrik on-chain Bitcoin mana yang mengukur total nilai yang dipindahkan di seluruh jaringan?", options: ["Hash rate", "Realized Cap", "Transfer Volume (on-chain transfer value)", "MVRV Ratio"], answer: 2, order: 4 },
            { text: "Apa itu HODL Waves dalam analisis Bitcoin?", options: ["Jenis serangan terhadap jaringan Bitcoin", "Visualisasi distribusi Bitcoin berdasarkan berapa lama UTXO tidak bergerak (age of coins)", "Indikator teknikal harga", "Metode mining Bitcoin"], answer: 1, order: 5 },
          ] },
          { title: "Dune API & Berkontribusi ke Spellbook", slug: "dune-api-spellbook", order: 2, content: L_API, lessonQuiz: [
            { text: "Dune API memungkinkan developer untuk?", options: ["Menulis data ke blockchain melalui Dune", "Mengeksekusi query dan mengambil hasilnya secara programmatic untuk integrasi ke aplikasi/bot", "Deploy smart contract", "Melihat query privat pengguna lain"], answer: 1, order: 1 },
            { text: "Endpoint Dune API apa yang digunakan untuk mengeksekusi query dan mendapatkan hasilnya?", options: ["/api/v1/query/{id}/execute dan /api/v1/execution/{id}/results", "/api/query/run/{id}", "/dune/execute?query_id={id}", "/v1/sql/run"], answer: 0, order: 2 },
            { text: "Spellbook di Dune adalah?", options: ["Fitur premium berbayar Dune", "Repositori open-source (GitHub) berisi model SQL yang dikontribusi komunitas untuk membuat abstraksi tabel on-chain", "Buku dokumentasi resmi Dune", "AI query assistant"], answer: 1, order: 3 },
            { text: "Untuk berkontribusi ke Spellbook, teknologi apa yang digunakan?", options: ["Plain SQL files", "dbt (data build tool) dengan model SQL dan skema YAML", "Python pandas", "JavaScript/TypeScript"], answer: 1, order: 4 },
            { text: "Kapan menggunakan Dune API lebih tepat daripada query manual di Dune UI?", options: ["Saat ingin query sekali saja", "Saat butuh data otomatis dan terjadwal untuk dashboard aplikasi, bot Telegram/Discord, atau riset programmatic", "Dune API selalu lebih baik dari UI", "Saat data tidak tersedia di Dune"], answer: 1, order: 5 },
          ] },
        ],
        quiz: { questions: Q_ADVANCED },
      },
    ],
  },
  {
    title: "Footprint Analytics",
    slug: "footprint-analytics",
    description: "Kuasai Footprint Analytics — platform no-code & SQL untuk DeFi dan GameFi. Dari drag-and-drop chart builder hingga SQL query untuk analisis mendalam.",
    icon: "👣", level: "Intermediate", order: 5,
    modules: [
      {
        title: "Footprint Fundamentals", slug: "footprint-fundamentals", order: 1,
        lessons: [
          { title: "Pengenalan Footprint Analytics", slug: "pengenalan-footprint", order: 1, content: L_FOOTPRINT, lessonQuiz: [
            { text: "Apa keunggulan utama Footprint Analytics dibandingkan Dune Analytics?", options: ["Footprint memiliki data lebih lengkap dari Dune", "Footprint menyediakan no-code drag-and-drop chart builder, memungkinkan analisis tanpa SQL", "Footprint gratis tanpa limit", "Footprint support lebih banyak chain dari Dune"], answer: 1, order: 1 },
            { text: "Footprint Analytics terutama fokus pada data?", options: ["Bitcoin dan Lightning Network", "DeFi dan GameFi (blockchain gaming)", "CEX trading data", "Social media on-chain"], answer: 1, order: 2 },
            { text: "Tabel protocol_daily_stats di Footprint berisi?", options: ["Harga token harian", "TVL, volume, revenue, dan user count per protokol DeFi per hari", "NFT trading data", "GameFi leaderboard"], answer: 1, order: 3 },
            { text: "Footprint Analytics mendukung analisis berapa banyak chain?", options: ["Hanya Ethereum dan BSC", "Hanya 5 chain teratas", "30+ blockchain termasuk Ethereum, BNB Chain, Polygon, Arbitrum, dan lainnya", "Hanya EVM-compatible chains"], answer: 2, order: 4 },
            { text: "Apa yang membedakan data DeFi di Footprint dari raw blockchain data?", options: ["Tidak ada perbedaan", "Footprint sudah melakukan data cleaning, normalisasi, dan enrichment sehingga lebih mudah dianalisis tanpa perlu decode ABI", "Footprint data selalu lebih baru", "Footprint hanya menyimpan data 1 tahun terakhir"], answer: 1, order: 5 },
          ] },
          { title: "No-Code Dashboard di Footprint", slug: "nocode-dashboard", order: 2, content: L_NOCODE, lessonQuiz: [
            { text: "Cara membuat chart di Footprint tanpa SQL adalah?", options: ["Import data dari Excel", "Gunakan drag-and-drop chart builder: pilih tabel, pilih kolom X dan Y, pilih tipe chart", "Tulis query Python", "Hanya bisa dibuat via API"], answer: 1, order: 1 },
            { text: "Apa langkah pertama saat membuat dashboard baru di Footprint?", options: ["Langsung tambah chart", "Definisikan tujuan dashboard dan metrik apa yang ingin ditampilkan", "Import data CSV", "Pilih template dari library"], answer: 1, order: 2 },
            { text: "Filter interaktif di Footprint dashboard memungkinkan pengguna untuk?", options: ["Mengubah data sumber secara real-time", "Menyesuaikan tampilan dashboard seperti rentang waktu, chain, atau protokol tanpa edit query", "Export data ke Excel", "Membagikan dashboard ke publik"], answer: 1, order: 3 },
            { text: "Tipe chart apa yang tepat untuk membandingkan TVL antar protokol DeFi pada satu waktu?", options: ["Line chart", "Bar chart atau Horizontal bar chart", "Scatter plot", "Area chart"], answer: 1, order: 4 },
            { text: "Kapan no-code dashboard builder lebih direkomendasikan daripada SQL mode di Footprint?", options: ["Untuk analisis yang sangat custom dan kompleks", "Untuk eksplorasi data cepat, presentasi stakeholder, atau pengguna yang belum familiar SQL", "No-code selalu lebih baik dari SQL", "Untuk data real-time"], answer: 1, order: 5 },
          ] },
          { title: "SQL Mode di Footprint", slug: "sql-mode-footprint", order: 3, content: L_SQL_FOOTPRINT, lessonQuiz: [
            { text: "Perbedaan syntax interval di Footprint SQL vs DuneSQL?", options: ["Sama persis", "Footprint: DATE_ADD('day', -7, CURRENT_DATE); DuneSQL: NOW() - INTERVAL '7' DAY", "Footprint menggunakan PostgreSQL syntax DATE_TRUNC", "Tidak ada interval di Footprint SQL"], answer: 1, order: 1 },
            { text: "Tabel game_daily_stats di Footprint berisi?", options: ["Harga token game", "DAU (daily active users), transaction count, dan volume per blockchain game per hari", "NFT item dalam game", "Smart contract game"], answer: 1, order: 2 },
            { text: "Kapan sebaiknya menggunakan SQL mode daripada no-code di Footprint?", options: ["SQL tidak tersedia di Footprint", "Untuk analisis kompleks yang membutuhkan JOIN, kalkulasi kustom, atau window functions", "SQL hanya untuk admin", "Saat data tidak tersedia di no-code"], answer: 1, order: 3 },
            { text: "Protocol mana yang populer untuk dianalisis di Footprint karena fokus DeFi-nya?", options: ["Uniswap dan Aave (Ethereum DeFi)", "GameFi protocols seperti Axie Infinity, StepN, dan Thetan Arena", "Footprint fokus pada semua protokol sama rata", "Footprint hanya untuk BSC protokol"], answer: 1, order: 4 },
            { text: "Keunggulan menggunakan SQL di Footprint dibandingkan menulis query raw blockchain?", options: ["Tidak ada keunggulan", "Tabel Footprint sudah terstandardisasi dan di-enrich, sehingga tidak perlu decode event log atau konversi desimal manual", "SQL di Footprint lebih cepat dari DuneSQL", "Footprint SQL gratis tanpa limit"], answer: 1, order: 5 },
          ] },
        ],
        quiz: { questions: Q_FOOTPRINT },
      },
    ],
  },
];

// ─── MAIN SEED FUNCTION ───────────────────────────────────────────────────────

async function main() {
  console.log("🌱 Seeding full curriculum...\n");

  for (const courseData of curriculum) {
    const { modules, ...courseFields } = courseData;
    const course = await prisma.course.upsert({
      where: { slug: courseFields.slug },
      create: courseFields,
      update: courseFields,
    });
    console.log(`✅ ${course.title}`);

    for (const moduleData of modules) {
      const { lessons, quiz, ...moduleFields } = moduleData;
      const mod = await prisma.module.upsert({
        where: { courseId_slug: { courseId: course.id, slug: moduleFields.slug } },
        create: { ...moduleFields, courseId: course.id },
        update: { ...moduleFields },
      });
      console.log(`  📖 ${mod.title}`);

      for (const lessonData of lessons) {
        const { lessonQuiz, ...lessonFields } = lessonData as typeof lessonData & { lessonQuiz?: { text: string; options: string[]; answer: number; order: number }[] };
        const lesson = await prisma.lesson.upsert({
          where: { moduleId_slug: { moduleId: mod.id, slug: lessonFields.slug } },
          create: { ...lessonFields, moduleId: mod.id },
          update: { ...lessonFields },
        });
        console.log(`    📝 ${lessonFields.title}`);

        if (lessonQuiz) {
          const existingQuiz = await prisma.lessonQuiz.findUnique({ where: { lessonId: lesson.id } });
          if (existingQuiz) {
            await prisma.lessonQuestion.deleteMany({ where: { quizId: existingQuiz.id } });
            await prisma.lessonQuestion.createMany({
              data: lessonQuiz.map(q => ({ ...q, quizId: existingQuiz.id })),
            });
          } else {
            await prisma.lessonQuiz.create({
              data: {
                lessonId: lesson.id,
                questions: { create: lessonQuiz },
              },
            });
          }
          console.log(`    🧩 LessonQuiz: ${lessonQuiz.length} soal`);
        }
      }

      if (quiz) {
        const quizRecord = await prisma.quiz.upsert({
          where: { moduleId: mod.id },
          create: { moduleId: mod.id },
          update: {},
        });
        await prisma.question.deleteMany({ where: { quizId: quizRecord.id } });
        for (const q of quiz.questions) {
          await prisma.question.create({ data: { ...q, quizId: quizRecord.id } });
        }
        console.log(`    📊 Quiz: ${quiz.questions.length} soal`);
      }
    }
    console.log();
  }

  console.log("✨ Seeding selesai!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
