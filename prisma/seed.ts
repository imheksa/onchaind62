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

const L_WHERE = `# WHERE — Memfilter Data Berdasarkan Kondisi

> **TLDR:** Klausa WHERE memungkinkan Anda memilih hanya baris data yang memenuhi kondisi tertentu, sehingga query menjadi lebih efisien dan hasilnya lebih bermakna.

---

Di lesson sebelumnya, kita sudah belajar menggunakan SELECT dan FROM untuk mengambil data dari tabel. Namun, tabel seperti \`ethereum.transactions\` berisi **miliaran baris** data. Mengambil semua data tanpa penyaringan berarti query akan sangat lambat, membuang kuota komputasi, dan hasilnya tidak berguna. Di sinilah klausa WHERE berperan.

## Apa itu WHERE?

WHERE adalah klausa SQL yang berfungsi sebagai **filter baris**. Ketika database memproses query dengan WHERE, ia hanya mengembalikan baris yang memenuhi kondisi yang Anda tentukan — semua baris lain diabaikan.

Analogi sehari-hari: Bayangkan Anda memiliki tumpukan ribuan struk belanja. WHERE adalah seperti memilih hanya struk dengan nilai di atas Rp 500.000. Anda tidak perlu memeriksa semua struk — hanya yang sesuai kriteria saja yang diambil.

## Kapan WHERE Digunakan?

WHERE digunakan hampir di setiap query analisis on-chain yang bermakna:

1. **Filter berdasarkan alamat wallet** — Melacak aktivitas satu wallet spesifik
2. **Filter berdasarkan nilai transaksi** — Mencari transaksi whale (lebih dari 100 ETH)
3. **Filter berdasarkan waktu** — Menganalisis data dalam 7 atau 30 hari terakhir
4. **Filter berdasarkan protokol** — Hanya melihat data Uniswap atau Aave
5. **Filter berdasarkan blockchain** — Membatasi hasil hanya untuk Ethereum atau Arbitrum

## Sintaks Dasar

\`\`\`sql
SELECT kolom1, kolom2
FROM nama_tabel
WHERE kondisi;
\`\`\`

WHERE ditulis setelah FROM dan sebelum ORDER BY. Kondisi dapat berupa perbandingan sederhana hingga ekspresi logika yang kompleks.

## Operator Perbandingan

Operator perbandingan adalah blok pembangun dasar kondisi WHERE:

\`\`\`sql
-- SAMA DENGAN (=): mencari nilai yang persis cocok
SELECT hash, "from", value / 1e18 AS eth, block_time
FROM ethereum.transactions
WHERE "from" = '0x28C6c06298d514Db089934071355E5743bf21d60'
  AND block_time >= NOW() - INTERVAL '30' DAY
LIMIT 20;

-- TIDAK SAMA DENGAN (!= atau <>): mengecualikan nilai tertentu
SELECT project, blockchain, amount_usd
FROM dex.trades
WHERE project != 'uniswap'
  AND block_time >= NOW() - INTERVAL '7' DAY
LIMIT 20;

-- LEBIH BESAR DARI (>): filter nilai minimum
SELECT hash, value / 1e18 AS eth
FROM ethereum.transactions
WHERE value / 1e18 > 100
  AND block_time >= NOW() - INTERVAL '1' DAY
LIMIT 20;

-- LEBIH KECIL DARI (<): filter nilai maksimum
SELECT hash, gas_price / 1e9 AS gwei
FROM ethereum.transactions
WHERE gas_price / 1e9 < 10
  AND block_time >= NOW() - INTERVAL '1' DAY
LIMIT 20;

-- LEBIH BESAR SAMA DENGAN (>=)
SELECT project, amount_usd, taker
FROM dex.trades
WHERE amount_usd >= 100000
  AND block_time >= NOW() - INTERVAL '7' DAY
LIMIT 20;
\`\`\`

## BETWEEN — Filter Range Nilai

BETWEEN memungkinkan filter nilai dalam rentang tertentu. Sintaks ini lebih bersih dibanding menulis \`>= X AND <= Y\`:

\`\`\`sql
-- Transaksi antara 1 ETH dan 10 ETH (inklusif di kedua ujung)
SELECT
  hash,
  "from"         AS pengirim,
  value / 1e18   AS eth,
  block_time
FROM ethereum.transactions
WHERE value / 1e18 BETWEEN 1 AND 10
  AND block_time >= NOW() - INTERVAL '7' DAY
ORDER BY value DESC
LIMIT 50;

-- Transaksi dalam rentang tanggal tertentu
SELECT
  hash,
  block_time,
  value / 1e18 AS eth
FROM ethereum.transactions
WHERE block_time BETWEEN TIMESTAMP '2024-01-01' AND TIMESTAMP '2024-01-31'
ORDER BY block_time DESC
LIMIT 50;
\`\`\`

\`BETWEEN 1 AND 10\` artinya nilai >= 1 DAN <= 10. Kedua ujung rentang bersifat inklusif.

## IN — Filter Daftar Nilai

Operator IN memeriksa apakah nilai kolom ada dalam daftar yang Anda tentukan. Ini jauh lebih bersih dibanding menulis banyak kondisi OR:

\`\`\`sql
-- DEX trades dari beberapa blockchain sekaligus
SELECT
  blockchain,
  project,
  amount_usd,
  block_time
FROM dex.trades
WHERE blockchain IN ('ethereum', 'arbitrum', 'optimism')
  AND block_time >= NOW() - INTERVAL '7' DAY
LIMIT 50;

-- Hanya transfer token stablecoin
SELECT
  symbol,
  amount,
  "from",
  "to",
  block_time
FROM tokens.transfers
WHERE symbol IN ('USDC', 'USDT', 'DAI', 'WETH')
  AND blockchain = 'ethereum'
  AND block_time >= NOW() - INTERVAL '7' DAY
LIMIT 50;

-- NOT IN: mengecualikan nilai tertentu dari daftar
SELECT blockchain, COUNT(*) AS trade_count
FROM dex.trades
WHERE blockchain NOT IN ('ethereum', 'bsc')
  AND block_time >= NOW() - INTERVAL '7' DAY
GROUP BY blockchain
ORDER BY trade_count DESC;
\`\`\`

## LIKE — Pencarian Pola Teks

LIKE digunakan untuk mencari teks yang mengandung pola tertentu. Karakter khusus: \`%\` = nol atau lebih karakter apa pun, \`_\` = tepat satu karakter apa pun.

\`\`\`sql
-- Wallet yang namanya mengandung kata 'Binance'
SELECT address, name, category
FROM labels.addresses
WHERE name LIKE '%Binance%';

-- Label yang diawali dengan 'Coinbase'
SELECT address, name
FROM labels.addresses
WHERE name LIKE 'Coinbase%';

-- Label yang diakhiri dengan 'Exchange'
SELECT address, name
FROM labels.addresses
WHERE name LIKE '%Exchange';
\`\`\`

## IS NULL / IS NOT NULL

NULL adalah nilai khusus yang berarti "tidak ada data". Anda tidak bisa menggunakan operator \`=\` untuk membandingkan NULL — harus menggunakan IS NULL atau IS NOT NULL:

\`\`\`sql
-- Wallet besar yang tidak memiliki label (anonim)
SELECT
  t.hash,
  t."from"         AS sender_address,
  t.value / 1e18   AS eth,
  t.block_time
FROM ethereum.transactions t
LEFT JOIN labels.addresses l ON t."from" = l.address
WHERE t.block_time >= NOW() - INTERVAL '1' DAY
  AND t.value / 1e18 > 100
  AND l.name IS NULL
ORDER BY t.value DESC
LIMIT 30;

-- Hanya transaksi dari wallet yang sudah dilabeli
SELECT
  t.hash,
  l.name           AS sender_name,
  t.value / 1e18   AS eth
FROM ethereum.transactions t
LEFT JOIN labels.addresses l ON t."from" = l.address
WHERE t.block_time >= NOW() - INTERVAL '1' DAY
  AND t.value / 1e18 > 10
  AND l.name IS NOT NULL
LIMIT 30;
\`\`\`

## AND dan OR — Menggabungkan Kondisi

Kondisi WHERE dapat dikombinasikan menggunakan operator logika:

\`\`\`sql
-- AND: semua kondisi harus terpenuhi
SELECT
  hash,
  value / 1e18   AS eth,
  block_time
FROM ethereum.transactions
WHERE value / 1e18 > 10
  AND block_time >= NOW() - INTERVAL '7' DAY
  AND "to" IS NOT NULL
LIMIT 50;

-- OR: minimal satu kondisi harus terpenuhi
SELECT
  project,
  amount_usd,
  token_bought_symbol,
  block_time
FROM dex.trades
WHERE (project = 'uniswap' OR project = 'sushiswap')
  AND block_time >= NOW() - INTERVAL '7' DAY
LIMIT 50;

-- Kombinasi AND dan OR — selalu gunakan tanda kurung!
SELECT project, blockchain, amount_usd
FROM dex.trades
WHERE (project = 'uniswap' OR project = 'curve')
  AND amount_usd > 10000
  AND blockchain = 'ethereum'
  AND block_time >= NOW() - INTERVAL '7' DAY
LIMIT 50;
\`\`\`

Urutan prioritas operator: NOT lebih tinggi dari AND, dan AND lebih tinggi dari OR. Selalu gunakan tanda kurung \`()\` saat menggabungkan AND dan OR untuk memastikan logika berjalan sesuai keinginan Anda.

## Filter Waktu — Wajib di Dune

Tabel seperti \`ethereum.transactions\` berisi data bertahun-tahun dengan miliaran baris. Tanpa filter waktu, query Anda akan mencoba membaca seluruh data dan hampir pasti akan timeout:

\`\`\`sql
-- BURUK: akan timeout karena scan seluruh tabel!
SELECT COUNT(*) FROM ethereum.transactions
WHERE "from" = '0x28C6c06298d514Db089934071355E5743bf21d60';

-- BAIK: selalu tambahkan filter block_time
SELECT COUNT(*) FROM ethereum.transactions
WHERE "from" = '0x28C6c06298d514Db089934071355E5743bf21d60'
  AND block_time >= NOW() - INTERVAL '90' DAY;
\`\`\`

Dune menyimpan data dalam **partisi waktu**. Dengan menambahkan filter \`block_time\`, Dune hanya membaca partisi yang relevan sehingga query dapat lebih cepat ratusan kali lipat.

## Contoh Praktis di Dune

\`\`\`sql
-- Temukan semua swap besar di Uniswap V3 Ethereum dalam 7 hari terakhir
SELECT
  block_time                   AS waktu,
  token_bought_symbol          AS token_dibeli,
  token_sold_symbol            AS token_dijual,
  ROUND(amount_usd, 2)         AS nilai_usd,
  taker                        AS wallet,
  tx_hash
FROM dex.trades
WHERE project = 'uniswap'
  AND version = '3'
  AND blockchain = 'ethereum'
  AND amount_usd > 100000
  AND amount_usd IS NOT NULL
  AND block_time >= NOW() - INTERVAL '7' DAY
ORDER BY amount_usd DESC
LIMIT 20;
\`\`\`

## Ringkasan

| Operator | Fungsi | Contoh |
|----------|--------|--------|
| \`=\` | Sama dengan | \`WHERE project = 'uniswap'\` |
| \`!=\` atau \`<>\` | Tidak sama dengan | \`WHERE chain != 'ethereum'\` |
| \`>\`, \`<\`, \`>=\`, \`<=\` | Perbandingan numerik | \`WHERE amount_usd > 100000\` |
| \`BETWEEN x AND y\` | Dalam rentang nilai | \`WHERE eth BETWEEN 1 AND 10\` |
| \`IN (a, b, c)\` | Dalam daftar nilai | \`WHERE chain IN ('eth', 'arb')\` |
| \`LIKE '%pola%'\` | Cocok pola teks | \`WHERE name LIKE '%Binance%'\` |
| \`IS NULL\` | Nilai kosong | \`WHERE label IS NULL\` |
| \`AND\` | Semua kondisi harus benar | \`WHERE a > 1 AND b < 10\` |
| \`OR\` | Minimal satu kondisi benar | \`WHERE a = 1 OR a = 2\` |

## Tantangan Praktik

**Level 1 — Eksplorasi**

Buka Dune Analytics dan jalankan query berikut, lalu jawab pertanyaan:

\`\`\`sql
SELECT
  project,
  blockchain,
  token_bought_symbol   AS token,
  ROUND(amount_usd, 2)  AS nilai_usd,
  taker                 AS wallet,
  block_time
FROM dex.trades
WHERE blockchain = 'ethereum'
  AND amount_usd > 50000
  AND block_time >= NOW() - INTERVAL '1' DAY
ORDER BY amount_usd DESC
LIMIT 20;
\`\`\`

Pertanyaan: Protokol mana yang paling sering muncul di top 20? Token apa yang paling sering diperdagangkan?

**Level 2 — Modifikasi**

Ubah query berikut agar menampilkan hanya transaksi ETH native antara 5 ETH dan 50 ETH yang terjadi dalam 3 hari terakhir:

\`\`\`sql
SELECT
  hash,
  "from",
  "to",
  value / 1e18   AS eth,
  block_time
FROM ethereum.transactions
WHERE block_time >= NOW() - INTERVAL '7' DAY
  AND value > 0
ORDER BY value DESC
LIMIT 20;
\`\`\`

Petunjuk: Ganti kondisi \`value > 0\` dengan BETWEEN, dan ubah rentang waktu dari 7 menjadi 3 hari.

**Level 3 — Mandiri (Bonus)**

Tanpa melihat contoh, tulis query untuk menemukan semua swap token stablecoin (USDC, USDT, atau DAI) bernilai lebih dari 1 juta USD di Ethereum dalam 24 jam terakhir. Tampilkan waktu, protokol, token dibeli, nilai USD, dan wallet pembeli, diurutkan dari nilai terbesar.`;

const L_ORDER_BY = `# ORDER BY — Mengurutkan Hasil Query

> **TLDR:** Klausa ORDER BY menentukan urutan tampilan baris hasil query — dari terbesar ke terkecil (DESC) atau sebaliknya (ASC). Kombinasikan dengan LIMIT untuk mendapatkan data terbaik atau terbaru.

---

Di lesson sebelumnya, kita belajar menggunakan WHERE untuk memfilter data. Kita sudah bisa mengambil hanya data yang relevan. Namun, data yang muncul masih dalam urutan yang tidak menentu — bisa acak atau sesuai urutan penyimpanan internal. Bagaimana jika kita ingin melihat transaksi terbesar dulu, atau aktivitas terbaru di bagian atas? Di sinilah ORDER BY berperan.

## Apa itu ORDER BY?

ORDER BY adalah klausa SQL yang menentukan **urutan tampilan baris** dalam hasil query. Tanpa ORDER BY, database boleh menampilkan baris dalam urutan apa pun (tidak dijamin terurut).

Analogi sehari-hari: ORDER BY seperti menyortir kotak masuk email — Anda bisa memilih apakah email terbaru muncul di atas, atau email dengan lampiran terbesar yang tampil pertama.

## Kapan ORDER BY Digunakan?

ORDER BY sangat berguna dalam berbagai skenario analisis on-chain:

1. **Menemukan whale** — Urutkan dari nilai transaksi terbesar
2. **Melihat aktivitas terbaru** — Urutkan dari waktu terbaru (DESC)
3. **Menemukan nilai terendah** — Gas fee termurah, swap terkecil
4. **Menampilkan peringkat** — Top 10 protokol by volume
5. **Analisis kronologis** — Urutan kejadian dari waktu ke waktu

## Sintaks Dasar

\`\`\`sql
SELECT kolom1, kolom2
FROM nama_tabel
WHERE kondisi
ORDER BY kolom_urutan ASC;   -- atau DESC
\`\`\`

- \`ASC\` (Ascending) = urutan naik, terkecil ke terbesar (ini adalah nilai **default** jika tidak ditulis)
- \`DESC\` (Descending) = urutan turun, terbesar ke terkecil

## ASC dan DESC — Urutan Naik dan Turun

\`\`\`sql
-- DESC: tampilkan transaksi terbesar dulu (whale hunting)
SELECT
  hash,
  "from"         AS pengirim,
  value / 1e18   AS eth
FROM ethereum.transactions
WHERE block_time >= NOW() - INTERVAL '1' DAY
  AND value > 0
ORDER BY value DESC
LIMIT 20;

-- ASC: tampilkan transaksi terkecil dulu
SELECT
  hash,
  "from"         AS pengirim,
  value / 1e18   AS eth
FROM ethereum.transactions
WHERE block_time >= NOW() - INTERVAL '1' DAY
  AND value > 0
ORDER BY value ASC
LIMIT 20;

-- DESC pada waktu: tampilkan yang terbaru dulu (paling umum dipakai!)
SELECT
  hash,
  "from"         AS pengirim,
  value / 1e18   AS eth,
  block_time
FROM ethereum.transactions
WHERE "from" = '0x28C6c06298d514Db089934071355E5743bf21d60'
  AND block_time >= NOW() - INTERVAL '30' DAY
ORDER BY block_time DESC
LIMIT 50;
\`\`\`

## Order by Teks (Alfabetis)

ORDER BY juga bisa digunakan pada kolom bertipe teks. Hasilnya akan diurutkan secara alfabetis:

\`\`\`sql
-- Daftar DEX diurutkan alfabetis A-Z
SELECT
  project,
  COUNT(*)           AS jumlah_swap,
  SUM(amount_usd)    AS total_volume
FROM dex.trades
WHERE block_time >= NOW() - INTERVAL '7' DAY
  AND blockchain = 'ethereum'
GROUP BY project
ORDER BY project ASC;

-- Urutkan Z-A
ORDER BY project DESC
\`\`\`

## Order by Beberapa Kolom

Anda bisa mengurutkan berdasarkan lebih dari satu kolom. Kolom pertama adalah prioritas utama; jika nilainya sama, baru kolom kedua digunakan sebagai penentu urutan:

\`\`\`sql
-- Urutkan berdasarkan chain (A-Z), lalu dalam chain yang sama, volume terbesar dulu
SELECT
  blockchain,
  project,
  SUM(amount_usd)   AS volume
FROM dex.trades
WHERE block_time >= NOW() - INTERVAL '7' DAY
GROUP BY blockchain, project
ORDER BY
  blockchain ASC,    -- prioritas pertama: urutkan chain A-Z
  volume DESC;       -- dalam chain yang sama, volume terbesar dulu
\`\`\`

Hasilnya:
| blockchain | project | volume |
|------------|---------|--------|
| arbitrum | uniswap | 500,000,000 |
| arbitrum | camelot | 120,000,000 |
| ethereum | uniswap | 2,500,000,000 |
| ethereum | curve | 800,000,000 |

## ORDER BY dengan Alias

Anda bisa menggunakan nama alias yang sudah didefinisikan di SELECT sebagai referensi kolom di ORDER BY:

\`\`\`sql
SELECT
  "from"                    AS wallet,
  COUNT(*)                  AS jumlah_tx,
  SUM(value) / 1e18         AS total_eth_dikirim
FROM ethereum.transactions
WHERE block_time >= NOW() - INTERVAL '30' DAY
  AND value > 0
GROUP BY "from"
ORDER BY total_eth_dikirim DESC   -- menggunakan alias dari SELECT
LIMIT 20;
\`\`\`

## ORDER BY dengan Nomor Kolom

Di DuneSQL, Anda juga bisa merujuk kolom dengan nomor urutannya di SELECT (1, 2, 3, ...):

\`\`\`sql
SELECT
  DATE_TRUNC('day', block_time)   AS tanggal,     -- kolom 1
  project,                                         -- kolom 2
  SUM(amount_usd)                 AS volume        -- kolom 3
FROM dex.trades
WHERE block_time >= NOW() - INTERVAL '30' DAY
  AND blockchain = 'ethereum'
GROUP BY 1, 2     -- GROUP BY tanggal dan project
ORDER BY 1 ASC,   -- urutkan berdasarkan tanggal (kolom 1)
         3 DESC;  -- lalu volume terbesar (kolom 3)
\`\`\`

## Kombinasi Lengkap: SELECT, FROM, WHERE, ORDER BY, LIMIT

Inilah urutan penulisan klausa SQL yang benar, sekaligus contoh query yang menggabungkan semua yang telah dipelajari:

\`\`\`sql
-- Top 10 swap terbesar di Uniswap Ethereum bulan ini
SELECT
  block_time                    AS waktu,
  token_bought_symbol           AS token_dibeli,
  token_sold_symbol             AS token_dijual,
  ROUND(amount_usd, 2)          AS nilai_usd,
  taker                         AS wallet
FROM dex.trades
WHERE project = 'uniswap'
  AND blockchain = 'ethereum'
  AND block_time >= NOW() - INTERVAL '30' DAY
  AND amount_usd > 0
ORDER BY amount_usd DESC
LIMIT 10;
\`\`\`

## Ringkasan

| Penggunaan | Sintaks | Contoh |
|-----------|---------|--------|
| Urutkan naik | \`ORDER BY kolom ASC\` | \`ORDER BY block_time ASC\` |
| Urutkan turun | \`ORDER BY kolom DESC\` | \`ORDER BY amount_usd DESC\` |
| Beberapa kolom | \`ORDER BY kol1 ASC, kol2 DESC\` | \`ORDER BY chain ASC, volume DESC\` |
| Pakai alias | \`ORDER BY alias_nama\` | \`ORDER BY total_eth DESC\` |
| Pakai nomor | \`ORDER BY 1, 2 DESC\` | \`ORDER BY 1 ASC, 3 DESC\` |

## Tantangan Praktik

**Level 1 — Eksplorasi**

Jalankan query berikut dan amati hasilnya:

\`\`\`sql
SELECT
  project,
  blockchain,
  COUNT(*)              AS jumlah_swap,
  SUM(amount_usd)       AS total_volume,
  AVG(amount_usd)       AS rata_rata_swap
FROM dex.trades
WHERE block_time >= NOW() - INTERVAL '7' DAY
  AND blockchain = 'ethereum'
GROUP BY project, blockchain
ORDER BY total_volume DESC
LIMIT 15;
\`\`\`

Pertanyaan: Protokol apa yang mendominasi? Apakah ada hubungan antara jumlah swap dan total volume?

**Level 2 — Modifikasi**

Ubah query berikut agar menampilkan wallet yang paling aktif bertransaksi, diurutkan dari yang paling sering mengirim transaksi ke Uniswap V3:

\`\`\`sql
SELECT
  "from"                AS wallet,
  COUNT(*)              AS jumlah_tx,
  SUM(value) / 1e18     AS total_eth
FROM ethereum.transactions
WHERE block_time >= NOW() - INTERVAL '30' DAY
  AND value > 0
ORDER BY total_eth DESC
LIMIT 20;
\`\`\`

Petunjuk: Ubah kolom ORDER BY dari \`total_eth\` menjadi \`jumlah_tx\`.

**Level 3 — Mandiri (Bonus)**

Tanpa melihat contoh, tulis query untuk menampilkan 5 hari dengan volume DEX tertinggi di Ethereum dalam 90 hari terakhir. Tampilkan tanggal, jumlah swap, dan total volume USD, diurutkan dari volume tertinggi.`;

const L_AGREGAT = `# Fungsi Agregat — COUNT, SUM, AVG, MAX, MIN dan GROUP BY

> **TLDR:** Fungsi agregat meringkas sekumpulan baris menjadi satu nilai (jumlah, total, rata-rata, maksimum, minimum). Dikombinasikan dengan GROUP BY, fungsi ini menjadi fondasi utama analisis data on-chain.

---

Sampai di sini, semua query yang kita tulis mengambil dan menyaring data **per baris** — satu baris = satu transaksi, satu swap, satu transfer. Namun, analisis yang bermakna sering membutuhkan **ringkasan**: berapa total volume trading hari ini? Berapa rata-rata nilai transaksi? Siapa wallet yang paling banyak bertransaksi? Untuk menjawab pertanyaan-pertanyaan ini, kita membutuhkan fungsi agregat.

## Apa itu Fungsi Agregat?

Fungsi agregat adalah fungsi SQL yang melakukan **perhitungan pada sekumpulan baris** dan mengembalikan **satu nilai ringkasan**.

Analogi sehari-hari: Bayangkan Anda memiliki 100 struk belanja. Fungsi agregat menjawab pertanyaan seperti:
- COUNT → ada berapa struk?
- SUM → total belanja berapa?
- AVG → rata-rata belanja per struk berapa?
- MAX → belanja terbesar berapa?
- MIN → belanja terkecil berapa?

## Kapan Fungsi Agregat Digunakan?

1. **Menghitung total transaksi** — Berapa banyak swap yang terjadi hari ini?
2. **Menjumlahkan volume** — Berapa total nilai USD yang diperdagangkan?
3. **Mencari nilai ekstrem** — Siapa whale terbesar? Transaksi terkecil berapa?
4. **Menghitung rata-rata** — Berapa rata-rata ukuran swap di Uniswap?
5. **Menemukan pengguna unik** — Berapa wallet berbeda yang bertransaksi?

## Sintaks Dasar

\`\`\`sql
SELECT fungsi_agregat(kolom)
FROM nama_tabel
WHERE kondisi;
\`\`\`

## COUNT — Menghitung Jumlah Baris

\`\`\`sql
-- Hitung total transaksi Ethereum dalam 24 jam terakhir
SELECT COUNT(*) AS total_transaksi
FROM ethereum.transactions
WHERE block_time >= NOW() - INTERVAL '1' DAY;

-- COUNT(*) = hitung semua baris termasuk NULL
-- COUNT(kolom) = hitung hanya baris yang tidak NULL di kolom tersebut
SELECT
  COUNT(*)                       AS semua_baris,
  COUNT("to")                    AS baris_dengan_penerima,  -- NULL jika contract creation
  COUNT(DISTINCT "from")         AS unique_pengirim
FROM ethereum.transactions
WHERE block_time >= NOW() - INTERVAL '1' DAY;

-- COUNT(DISTINCT) untuk menghitung nilai unik
SELECT COUNT(DISTINCT taker) AS unique_traders
FROM dex.trades
WHERE block_time >= NOW() - INTERVAL '7' DAY
  AND blockchain = 'ethereum';
\`\`\`

## SUM — Menjumlahkan Nilai

\`\`\`sql
-- Total ETH yang ditransfer hari ini
SELECT SUM(value) / 1e18 AS total_eth_transferred
FROM ethereum.transactions
WHERE block_time >= NOW() - INTERVAL '1' DAY;

-- Total volume DEX dalam USD 30 hari terakhir
SELECT SUM(amount_usd) AS total_volume_usd
FROM dex.trades
WHERE block_time >= NOW() - INTERVAL '30' DAY
  AND blockchain = 'ethereum';

-- Total gas fee yang dibayar (dalam ETH)
SELECT SUM(gas_used * gas_price) / 1e18 AS total_gas_eth
FROM ethereum.transactions
WHERE block_time >= NOW() - INTERVAL '7' DAY;
\`\`\`

## AVG — Rata-Rata Nilai

\`\`\`sql
-- Rata-rata nilai transaksi ETH dalam seminggu terakhir
SELECT AVG(value) / 1e18 AS avg_eth_per_tx
FROM ethereum.transactions
WHERE block_time >= NOW() - INTERVAL '7' DAY
  AND value > 0;

-- Rata-rata ukuran swap di Uniswap (dalam USD)
SELECT AVG(amount_usd) AS avg_swap_size_usd
FROM dex.trades
WHERE project = 'uniswap'
  AND block_time >= NOW() - INTERVAL '30' DAY
  AND amount_usd > 0;
\`\`\`

Catatan: AVG mengabaikan NULL secara otomatis. Tambahkan \`WHERE nilai > 0\` untuk mengabaikan nilai nol jika diperlukan.

## MAX dan MIN — Nilai Terbesar dan Terkecil

\`\`\`sql
-- Transaksi ETH terbesar dan terkecil hari ini
SELECT
  MAX(value) / 1e18   AS transaksi_terbesar_eth,
  MIN(value) / 1e18   AS transaksi_terkecil_eth
FROM ethereum.transactions
WHERE block_time >= NOW() - INTERVAL '1' DAY
  AND value > 0;

-- Harga NFT tertinggi, terendah, dan rata-rata per koleksi (30 hari terakhir)
SELECT
  MAX(amount_usd)     AS harga_tertinggi,
  MIN(amount_usd)     AS harga_terendah,
  AVG(amount_usd)     AS harga_rata_rata
FROM nft.trades
WHERE block_time >= NOW() - INTERVAL '30' DAY
  AND blockchain = 'ethereum';
\`\`\`

## Semua Fungsi Sekaligus

\`\`\`sql
-- Statistik lengkap DEX trading 7 hari terakhir
SELECT
  COUNT(*)                           AS jumlah_swap,
  COUNT(DISTINCT taker)              AS unique_traders,
  SUM(amount_usd)                    AS total_volume_usd,
  AVG(amount_usd)                    AS rata_rata_swap_usd,
  MAX(amount_usd)                    AS swap_terbesar_usd,
  MIN(amount_usd)                    AS swap_terkecil_usd
FROM dex.trades
WHERE block_time >= NOW() - INTERVAL '7' DAY
  AND blockchain = 'ethereum'
  AND amount_usd > 0;
\`\`\`

## GROUP BY — Agregasi Per Kelompok

Sampai di sini, fungsi agregat menghasilkan satu angka untuk seluruh data. GROUP BY mengubah itu menjadi **satu angka per kelompok**. Ini adalah fitur yang paling sering digunakan dalam analisis on-chain.

\`\`\`sql
-- Volume DEX per protokol dalam 7 hari terakhir
SELECT
  project                        AS protokol,
  COUNT(*)                       AS jumlah_swap,
  SUM(amount_usd)                AS total_volume_usd,
  AVG(amount_usd)                AS rata_rata_swap_usd
FROM dex.trades
WHERE block_time >= NOW() - INTERVAL '7' DAY
  AND blockchain = 'ethereum'
GROUP BY project
ORDER BY total_volume_usd DESC;
\`\`\`

Hasilnya — satu baris per protokol:
| protokol | jumlah_swap | total_volume_usd | rata_rata_swap_usd |
|----------|-------------|------------------|---------------------|
| uniswap | 850,000 | 2,500,000,000 | 2,941 |
| curve | 120,000 | 800,000,000 | 6,667 |
| sushiswap | 45,000 | 150,000,000 | 3,333 |

Aturan penting: **Setiap kolom dalam SELECT yang bukan fungsi agregat harus ada di GROUP BY.**

\`\`\`sql
-- Kelompokkan berdasarkan beberapa kolom
SELECT
  DATE_TRUNC('day', block_time)  AS tanggal,
  blockchain,
  COUNT(*)                       AS jumlah_swap,
  SUM(amount_usd)                AS volume_usd
FROM dex.trades
WHERE block_time >= NOW() - INTERVAL '30' DAY
GROUP BY DATE_TRUNC('day', block_time), blockchain
ORDER BY tanggal ASC, volume_usd DESC;
\`\`\`

## HAVING — Filter Setelah Agregasi

WHERE memfilter baris **sebelum** GROUP BY. HAVING memfilter **hasil agregasi** setelah GROUP BY:

\`\`\`sql
-- Cari wallet yang mengirim lebih dari 50 transaksi minggu ini
SELECT
  "from"                        AS wallet,
  COUNT(*)                      AS jumlah_tx,
  SUM(value) / 1e18             AS total_eth_dikirim
FROM ethereum.transactions
WHERE block_time >= NOW() - INTERVAL '7' DAY   -- WHERE: filter baris dulu
GROUP BY "from"
HAVING COUNT(*) > 50                           -- HAVING: filter setelah GROUP BY
ORDER BY jumlah_tx DESC
LIMIT 20;

-- Hanya protokol dengan volume lebih dari $100 juta
SELECT
  project,
  SUM(amount_usd)               AS total_volume
FROM dex.trades
WHERE block_time >= NOW() - INTERVAL '30' DAY
  AND blockchain = 'ethereum'
GROUP BY project
HAVING SUM(amount_usd) > 100000000             -- $100 juta
ORDER BY total_volume DESC;
\`\`\`

Aturan sederhana:
- Filter berdasarkan data asli? Gunakan **WHERE**
- Filter berdasarkan hasil agregasi (COUNT, SUM, AVG, dll)? Gunakan **HAVING**

## Contoh Praktis di Dune

\`\`\`sql
-- Analisis aktivitas wallet besar di Uniswap 30 hari terakhir
SELECT
  taker                         AS wallet,
  COUNT(*)                      AS jumlah_swap,
  SUM(amount_usd)               AS total_volume_usd,
  AVG(amount_usd)               AS rata_rata_per_swap,
  MAX(amount_usd)               AS swap_terbesar
FROM dex.trades
WHERE project = 'uniswap'
  AND blockchain = 'ethereum'
  AND block_time >= NOW() - INTERVAL '30' DAY
  AND amount_usd > 0
GROUP BY taker
HAVING SUM(amount_usd) > 1000000              -- total volume lebih dari $1 juta
ORDER BY total_volume_usd DESC
LIMIT 20;
\`\`\`

## Ringkasan

| Fungsi | Kegunaan | Contoh |
|--------|----------|--------|
| \`COUNT(*)\` | Hitung semua baris | \`COUNT(*) AS total_tx\` |
| \`COUNT(DISTINCT kol)\` | Hitung nilai unik | \`COUNT(DISTINCT taker)\` |
| \`SUM(kol)\` | Jumlahkan nilai | \`SUM(amount_usd)\` |
| \`AVG(kol)\` | Rata-rata nilai | \`AVG(amount_usd)\` |
| \`MAX(kol)\` | Nilai terbesar | \`MAX(amount_usd)\` |
| \`MIN(kol)\` | Nilai terkecil | \`MIN(amount_usd)\` |
| \`GROUP BY kol\` | Agregasi per kelompok | \`GROUP BY project\` |
| \`HAVING kondisi\` | Filter hasil agregasi | \`HAVING COUNT(*) > 50\` |

## Tantangan Praktik

**Level 1 — Eksplorasi**

Jalankan query berikut dan amati hasilnya:

\`\`\`sql
SELECT
  blockchain,
  COUNT(*)              AS jumlah_swap,
  COUNT(DISTINCT taker) AS unique_traders,
  SUM(amount_usd)       AS total_volume,
  AVG(amount_usd)       AS rata_rata_swap
FROM dex.trades
WHERE block_time >= NOW() - INTERVAL '7' DAY
GROUP BY blockchain
ORDER BY total_volume DESC;
\`\`\`

Pertanyaan: Chain mana yang memiliki volume terbesar? Apakah chain dengan volume terbesar juga memiliki jumlah trader unik terbanyak?

**Level 2 — Modifikasi**

Ubah query berikut agar menampilkan hanya protokol yang memiliki lebih dari 1.000 swap dalam 7 hari terakhir, dan urutkan berdasarkan rata-rata ukuran swap terbesar:

\`\`\`sql
SELECT
  project,
  COUNT(*)        AS jumlah_swap,
  SUM(amount_usd) AS total_volume,
  AVG(amount_usd) AS rata_rata_swap
FROM dex.trades
WHERE blockchain = 'ethereum'
  AND block_time >= NOW() - INTERVAL '7' DAY
GROUP BY project
ORDER BY total_volume DESC;
\`\`\`

Petunjuk: Tambahkan HAVING untuk filter jumlah swap, dan ubah kolom ORDER BY.

**Level 3 — Mandiri (Bonus)**

Tanpa melihat contoh, tulis query untuk menemukan 10 wallet yang paling banyak melakukan swap di Uniswap Ethereum dalam 30 hari terakhir, dengan total volume lebih dari $500.000. Tampilkan alamat wallet, jumlah swap, total volume, dan rata-rata ukuran swap.`;

const L_JOIN = `# JOIN — Menggabungkan Data dari Beberapa Tabel

> **TLDR:** JOIN menggabungkan dua atau lebih tabel berdasarkan kolom yang sama (biasanya alamat atau ID). INNER JOIN hanya mengembalikan baris yang cocok di kedua tabel; LEFT JOIN mengembalikan semua baris dari tabel kiri, dan NULL jika tidak ada pasangan di tabel kanan.

---

Sejauh ini, semua query kita bekerja dengan satu tabel pada satu waktu. Namun, dalam analisis on-chain yang nyata, informasi yang kita butuhkan sering tersebar di beberapa tabel. Misalnya: data transaksi ada di \`ethereum.transactions\`, tapi label wallet ada di \`labels.addresses\`, dan metadata token ada di \`tokens.erc20\`. JOIN adalah cara kita menggabungkan informasi dari tabel-tabel yang berbeda ini dalam satu query.

## Apa itu JOIN?

JOIN adalah operasi SQL yang **menggabungkan baris dari dua tabel** berdasarkan nilai kolom yang cocok antara keduanya. Kolom yang digunakan sebagai penghubung biasanya adalah alamat wallet, contract address, atau ID unik lainnya.

Analogi sehari-hari: Bayangkan Anda punya dua buku catatan:
- Buku A: daftar nomor telepon teman
- Buku B: daftar alamat rumah teman

JOIN = mencocokkan nama di kedua buku untuk mendapatkan informasi lengkap: nomor telepon DAN alamat rumah sekaligus.

## Kapan JOIN Digunakan?

1. **Menambahkan label** — Menampilkan nama wallet dari \`labels.addresses\` bersama data transaksi
2. **Menambahkan harga** — Menggabungkan data transfer dengan harga token dari \`prices.usd\`
3. **Menambahkan metadata token** — Mendapatkan simbol dan desimal dari \`tokens.erc20\`
4. **Menganalisis dari dua sudut** — Menggabungkan data swap dengan data on-chain lainnya
5. **Cross-reference** — Menemukan wallet yang muncul di lebih dari satu dataset

## Sintaks Dasar

\`\`\`sql
SELECT t.kolom1, l.kolom2
FROM tabel_utama t              -- alias 't'
JOIN tabel_kedua l              -- alias 'l'
  ON t.kolom_kunci = l.kolom_kunci;   -- kondisi penggabungan
\`\`\`

Alias tabel (seperti \`t\` dan \`l\`) digunakan untuk memperpendek penulisan dan menghindari ambiguitas ketika dua tabel memiliki nama kolom yang sama.

## INNER JOIN — Hanya Baris yang Cocok

INNER JOIN mengembalikan hanya baris yang memiliki kecocokan di **kedua tabel**. Jika wallet tidak ada di tabel labels, transaksinya tidak akan muncul di hasil:

\`\`\`sql
-- Tampilkan transaksi besar beserta nama pengirimnya
-- Hanya tampilkan jika pengirim MEMILIKI label
SELECT
  t.hash                        AS tx_hash,
  t.value / 1e18                AS eth_amount,
  t.block_time,
  l.name                        AS sender_name,
  l.category                    AS kategori
FROM ethereum.transactions t
INNER JOIN labels.addresses l
  ON t."from" = l.address
WHERE t.block_time >= NOW() - INTERVAL '7' DAY
  AND t.value / 1e18 > 10
ORDER BY t.value DESC
LIMIT 50;
\`\`\`

Karena INNER JOIN, transaksi dari wallet yang tidak terdaftar di \`labels.addresses\` tidak akan ditampilkan sama sekali.

## LEFT JOIN — Semua Baris Kiri, NULL jika Tidak Ada Pasangan

LEFT JOIN adalah jenis JOIN yang paling sering digunakan dalam analisis on-chain. Ini mengambil semua baris dari tabel kiri (tabel pertama), dan menambahkan data dari tabel kanan jika ada. Jika tidak ada kecocokan, kolom dari tabel kanan akan bernilai NULL:

\`\`\`sql
-- Tampilkan SEMUA transaksi besar, baik yang ada labelnya maupun tidak
SELECT
  t.hash,
  t.value / 1e18                AS eth,
  t."from"                      AS sender_address,
  COALESCE(l.name, 'Wallet Anonim') AS sender_name  -- NULL diganti dengan teks default
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
| 0xdef.. | 200 | 0x1234.. | Wallet Anonim |
| 0xghi.. | 150 | 0x5678.. | Coinbase 5 |

Fungsi \`COALESCE(nilai, nilai_default)\` menggantikan NULL dengan nilai default yang Anda tentukan.

## FULL OUTER JOIN — Semua Baris dari Kedua Tabel

FULL OUTER JOIN mengembalikan semua baris dari kedua tabel, dengan NULL di kolom yang tidak memiliki pasangan. Jarang digunakan dalam analisis on-chain, tapi berguna untuk membandingkan dua set data:

\`\`\`sql
-- Bandingkan trader aktif minggu ini vs minggu lalu
WITH traders_minggu_ini AS (
  SELECT DISTINCT taker FROM dex.trades
  WHERE block_time >= NOW() - INTERVAL '7' DAY
    AND blockchain = 'ethereum'
),
traders_minggu_lalu AS (
  SELECT DISTINCT taker FROM dex.trades
  WHERE block_time BETWEEN NOW() - INTERVAL '14' DAY AND NOW() - INTERVAL '7' DAY
    AND blockchain = 'ethereum'
)
SELECT
  COALESCE(a.taker, b.taker) AS wallet,
  CASE WHEN a.taker IS NOT NULL THEN 'Ya' ELSE 'Tidak' END AS aktif_minggu_ini,
  CASE WHEN b.taker IS NOT NULL THEN 'Ya' ELSE 'Tidak' END AS aktif_minggu_lalu
FROM traders_minggu_ini a
FULL OUTER JOIN traders_minggu_lalu b ON a.taker = b.taker
LIMIT 50;
\`\`\`

## JOIN Lebih dari Dua Tabel

Anda bisa menggabungkan tiga tabel atau lebih dalam satu query:

\`\`\`sql
-- Gabungkan DEX trades + label wallet + metadata token
SELECT
  tr.block_time,
  tr.amount_usd,
  tr.token_bought_symbol         AS token,
  COALESCE(buyer.name, 'Anonim') AS buyer_name,
  tok.decimals                   AS token_decimals
FROM dex.trades tr
LEFT JOIN labels.addresses buyer
  ON tr.taker = buyer.address
LEFT JOIN tokens.erc20 tok
  ON tr.token_bought_address = tok.contract_address
  AND tr.blockchain = tok.blockchain
WHERE tr.block_time >= NOW() - INTERVAL '7' DAY
  AND tr.amount_usd > 50000
  AND tr.blockchain = 'ethereum'
ORDER BY tr.amount_usd DESC
LIMIT 20;
\`\`\`

## JOIN dengan Kondisi Ganda

Kadang satu kolom tidak cukup sebagai kunci JOIN. Anda bisa menambahkan kondisi tambahan setelah ON:

\`\`\`sql
-- Gabungkan transfer token dengan harga historis
-- Perlu cocokkan TANTO contract_address MAUPUN tanggalnya
SELECT
  tr.block_time,
  tr.symbol,
  tr.amount                       AS raw_amount,
  tr.amount / POWER(10, e20.decimals) AS token_amount,
  p.price                         AS harga_usd,
  tr.amount / POWER(10, e20.decimals) * p.price AS nilai_usd
FROM tokens.transfers tr
LEFT JOIN tokens.erc20 e20
  ON tr.contract_address = e20.contract_address
  AND tr.blockchain = e20.blockchain
LEFT JOIN prices.usd p
  ON tr.contract_address = p.contract_address
  AND DATE_TRUNC('hour', tr.block_time) = p.minute
  AND tr.blockchain = p.blockchain
WHERE tr.block_time >= NOW() - INTERVAL '1' DAY
  AND tr.symbol = 'USDC'
  AND tr.blockchain = 'ethereum'
LIMIT 20;
\`\`\`

## RIGHT JOIN — Semua Baris Kanan

RIGHT JOIN adalah kebalikan dari LEFT JOIN: mengembalikan semua baris dari tabel kanan. Dalam praktik, RIGHT JOIN hampir selalu bisa ditulis ulang sebagai LEFT JOIN dengan urutan tabel dibalik:

\`\`\`sql
-- Ini sama saja:
FROM tabel_a RIGHT JOIN tabel_b ON ...
-- Setara dengan:
FROM tabel_b LEFT JOIN tabel_a ON ...
\`\`\`

## Ringkasan: Kapan Menggunakan Jenis JOIN Apa

| Situasi | JOIN yang Digunakan |
|---------|---------------------|
| Hanya tampilkan baris yang ada di kedua tabel | INNER JOIN |
| Tampilkan semua data tabel utama + info tambahan (jika ada) | LEFT JOIN (paling umum!) |
| Tampilkan semua data dari kedua tabel (termasuk yang tidak cocok) | FULL OUTER JOIN |
| Bandingkan dua set data dengan NULL marking | FULL OUTER JOIN |

## Contoh Praktis di Dune

\`\`\`sql
-- Analisis: wallet labeled apa yang paling aktif trading di Uniswap?
SELECT
  l.name                          AS wallet_name,
  l.category                      AS kategori,
  COUNT(*)                        AS jumlah_swap,
  SUM(t.amount_usd)               AS total_volume_usd,
  AVG(t.amount_usd)               AS rata_rata_swap
FROM dex.trades t
INNER JOIN labels.addresses l
  ON t.taker = l.address
WHERE t.project = 'uniswap'
  AND t.blockchain = 'ethereum'
  AND t.block_time >= NOW() - INTERVAL '30' DAY
  AND t.amount_usd > 0
GROUP BY l.name, l.category
ORDER BY total_volume_usd DESC
LIMIT 20;
\`\`\`

## Tantangan Praktik

**Level 1 — Eksplorasi**

Jalankan query berikut dan amati hasilnya:

\`\`\`sql
SELECT
  t.hash,
  t.value / 1e18            AS eth,
  t."from"                  AS sender_address,
  COALESCE(l.name, 'Tidak Berlabel') AS sender_label,
  l.category                AS kategori,
  t.block_time
FROM ethereum.transactions t
LEFT JOIN labels.addresses l ON t."from" = l.address
WHERE t.block_time >= NOW() - INTERVAL '1' DAY
  AND t.value / 1e18 > 50
ORDER BY t.value DESC
LIMIT 20;
\`\`\`

Pertanyaan: Berapa persen transaksi yang pengirimnya memiliki label? Kategori apa yang paling sering muncul?

**Level 2 — Modifikasi**

Ubah query berikut agar menggunakan INNER JOIN (bukan LEFT JOIN) sehingga hanya menampilkan swap dari wallet yang sudah berlabel. Tambahkan juga kolom \`category\` dari tabel labels:

\`\`\`sql
SELECT
  t.block_time,
  t.token_bought_symbol       AS token,
  t.amount_usd,
  t.taker                     AS wallet,
  l.name                      AS wallet_name
FROM dex.trades t
LEFT JOIN labels.addresses l ON t.taker = l.address
WHERE t.blockchain = 'ethereum'
  AND t.block_time >= NOW() - INTERVAL '7' DAY
  AND t.amount_usd > 10000
ORDER BY t.amount_usd DESC
LIMIT 20;
\`\`\`

**Level 3 — Mandiri (Bonus)**

Tanpa melihat contoh, tulis query yang menggabungkan \`nft.trades\` dengan \`labels.addresses\` untuk menemukan 10 pembeli NFT terbesar (berdasarkan total nilai USD) yang memiliki label di Dune. Tampilkan nama label, kategori, jumlah pembelian, dan total nilai yang dibelanjakan dalam 30 hari terakhir.`;

const L_SUBQUERY = `# Subquery — Query di Dalam Query

> **TLDR:** Subquery adalah query SQL yang ditulis di dalam query lain — bisa di dalam WHERE, FROM, atau SELECT. Gunakan subquery untuk menyaring data berdasarkan hasil query lain, atau menggunakannya sebagai tabel sementara.

---

JOIN menggabungkan tabel berdasarkan kolom kunci yang cocok. Subquery adalah pendekatan yang berbeda: **menanamkan satu query di dalam query lain**. Bayangkan ini seperti kalimat bersarang: "Tampilkan transaksi dari wallet yang [pernah melakukan swap lebih dari 1 juta USD di Uniswap bulan lalu]." Bagian dalam kurung siku adalah subquery yang menghasilkan daftar wallet, dan query luar menggunakan daftar itu sebagai filter.

## Apa itu Subquery?

Subquery (juga disebut *nested query* atau *inner query*) adalah query SQL yang ditulis di dalam query lain. Query yang berisi subquery disebut *outer query* atau *main query*.

Analogi sehari-hari: Seperti instruksi bersarang — "Belikan saya semua produk yang harganya lebih murah dari [harga rata-rata produk di toko itu]." Bagian dalam kurung siku adalah subquery: pertama hitung dulu rata-rata harga, baru gunakan hasilnya sebagai filter.

## Kapan Subquery Digunakan?

1. **Filter dengan hasil agregasi** — "Tampilkan hanya wallet yang total volumenya di atas rata-rata"
2. **Menemukan data berdasarkan keanggotaan dalam set lain** — "Wallet yang pernah melakukan aksi X"
3. **Tabel turunan** — Buat tabel sementara dari query, lalu query lagi
4. **Perbandingan dengan nilai tunggal** — Bandingkan dengan total pasar atau rata-rata
5. **Ketika JOIN tidak cukup fleksibel** — Untuk logika yang memerlukan agregasi bertahap

## Subquery di Klausa WHERE

Subquery paling sering digunakan di WHERE untuk memfilter baris berdasarkan hasil query lain:

\`\`\`sql
-- Tampilkan transaksi ETH dari wallet yang pernah melakukan swap besar di Uniswap
SELECT
  "from"             AS wallet,
  hash               AS tx_hash,
  value / 1e18       AS eth_amount,
  block_time
FROM ethereum.transactions
WHERE block_time >= NOW() - INTERVAL '7' DAY
  AND "from" IN (
    -- Subquery: temukan daftar whale wallet dari Uniswap
    SELECT DISTINCT taker
    FROM dex.trades
    WHERE project = 'uniswap'
      AND amount_usd > 1000000                -- pernah swap lebih dari $1 juta
      AND block_time >= NOW() - INTERVAL '30' DAY
  )
ORDER BY block_time DESC
LIMIT 50;
\`\`\`

Cara membacanya: "Tampilkan transaksi ETH, tapi hanya dari wallet yang [ada dalam daftar yang dihasilkan subquery]."

\`\`\`sql
-- Wallet yang TIDAK pernah menggunakan Uniswap (menggunakan NOT IN)
SELECT
  "from"             AS wallet,
  COUNT(*)           AS jumlah_tx
FROM ethereum.transactions
WHERE block_time >= NOW() - INTERVAL '30' DAY
  AND "from" NOT IN (
    SELECT DISTINCT taker
    FROM dex.trades
    WHERE project = 'uniswap'
      AND block_time >= NOW() - INTERVAL '30' DAY
      AND taker IS NOT NULL     -- penting: NOT IN dengan NULL bermasalah!
  )
GROUP BY "from"
ORDER BY jumlah_tx DESC
LIMIT 20;
\`\`\`

## Subquery di Klausa FROM (Derived Table)

Subquery di FROM menciptakan "tabel sementara" yang bisa Anda query lebih lanjut. Tabel sementara ini disebut *derived table* atau *inline view*:

\`\`\`sql
-- Langkah 1: hitung total ETH per wallet
-- Langkah 2: kategorisasi berdasarkan total ETH
SELECT
  wallet,
  total_eth,
  CASE
    WHEN total_eth > 10000 THEN 'Mega Whale'
    WHEN total_eth > 1000  THEN 'Whale'
    WHEN total_eth > 100   THEN 'Large Holder'
    ELSE 'Normal'
  END AS kategori
FROM (
  -- Subquery: hitung total ETH per wallet
  SELECT
    "from"                AS wallet,
    SUM(value) / 1e18     AS total_eth,
    COUNT(*)              AS jumlah_tx
  FROM ethereum.transactions
  WHERE block_time >= NOW() - INTERVAL '90' DAY
    AND value > 0
  GROUP BY "from"
  HAVING SUM(value) / 1e18 > 100
) wallet_summary
ORDER BY total_eth DESC
LIMIT 50;
\`\`\`

Perhatikan bahwa subquery di FROM **harus diberi alias** (di sini: \`wallet_summary\`).

## Subquery di Klausa SELECT (Scalar Subquery)

Subquery di SELECT dieksekusi untuk setiap baris dan harus mengembalikan tepat satu nilai. Ini berguna untuk menambahkan nilai referensi seperti total pasar atau rata-rata global:

\`\`\`sql
-- Tampilkan volume setiap protokol beserta persentase market share-nya
SELECT
  project,
  SUM(amount_usd)                                          AS volume_protokol,
  (
    SELECT SUM(amount_usd)
    FROM dex.trades
    WHERE block_time >= NOW() - INTERVAL '7' DAY
      AND blockchain = 'ethereum'
  )                                                        AS total_pasar,
  ROUND(
    SUM(amount_usd) * 100.0 /
    (
      SELECT SUM(amount_usd)
      FROM dex.trades
      WHERE block_time >= NOW() - INTERVAL '7' DAY
        AND blockchain = 'ethereum'
    ),
    2
  )                                                        AS market_share_pct
FROM dex.trades
WHERE block_time >= NOW() - INTERVAL '7' DAY
  AND blockchain = 'ethereum'
GROUP BY project
ORDER BY volume_protokol DESC
LIMIT 10;
\`\`\`

Catatan: Subquery di SELECT yang sama dieksekusi berulang kali (sekali per baris). Ini bisa lambat. CTE (yang akan dipelajari di lesson berikutnya) adalah solusi yang lebih efisien.

## EXISTS — Cek Keberadaan Data

Operator EXISTS memeriksa apakah subquery mengembalikan setidaknya satu baris. Ini lebih cepat dari IN untuk kasus tertentu:

\`\`\`sql
-- Tampilkan wallet yang pernah melakukan swap DAN pernah melakukan transfer NFT
SELECT DISTINCT
  t."from"          AS wallet,
  COUNT(*)          AS jumlah_tx_eth
FROM ethereum.transactions t
WHERE t.block_time >= NOW() - INTERVAL '30' DAY
  AND EXISTS (
    SELECT 1
    FROM nft.trades n
    WHERE n.buyer = t."from"                   -- wallet yang sama
      AND n.block_time >= NOW() - INTERVAL '30' DAY
  )
GROUP BY t."from"
ORDER BY jumlah_tx_eth DESC
LIMIT 20;
\`\`\`

## Contoh Praktis di Dune

\`\`\`sql
-- Temukan "smart money": wallet yang membeli token sebelum harganya naik 2x
-- (Sederhananya: wallet yang swap di bawah harga rata-rata pasar hari itu)
SELECT
  wallet,
  token,
  jumlah_swap,
  total_volume_usd
FROM (
  SELECT
    taker                   AS wallet,
    token_bought_symbol     AS token,
    COUNT(*)                AS jumlah_swap,
    SUM(amount_usd)         AS total_volume_usd,
    AVG(amount_usd)         AS avg_swap_size
  FROM dex.trades
  WHERE blockchain = 'ethereum'
    AND block_time >= NOW() - INTERVAL '30' DAY
    AND amount_usd > 0
  GROUP BY taker, token_bought_symbol
) per_token_per_wallet
WHERE total_volume_usd > 100000    -- total volume lebih dari $100K
ORDER BY total_volume_usd DESC
LIMIT 20;
\`\`\`

## Ringkasan

| Posisi Subquery | Kegunaan | Catatan |
|----------------|----------|---------|
| \`WHERE ... IN (subquery)\` | Filter berdasarkan set nilai | Subquery mengembalikan satu kolom |
| \`WHERE NOT IN (subquery)\` | Filter pengecualian | Hati-hati dengan NULL! |
| \`WHERE EXISTS (subquery)\` | Cek keberadaan | Lebih efisien dari IN untuk kasus tertentu |
| \`FROM (subquery) alias\` | Tabel sementara | Wajib diberi alias |
| \`SELECT (subquery)\` | Nilai referensi per baris | Harus mengembalikan tepat satu nilai |

## Tantangan Praktik

**Level 1 — Eksplorasi**

Jalankan query berikut dan amati hasilnya:

\`\`\`sql
SELECT
  taker         AS wallet,
  COUNT(*)      AS jumlah_swap,
  SUM(amount_usd) AS total_volume
FROM dex.trades
WHERE blockchain = 'ethereum'
  AND block_time >= NOW() - INTERVAL '7' DAY
  AND taker IN (
    SELECT DISTINCT "from"
    FROM ethereum.transactions
    WHERE block_time >= NOW() - INTERVAL '7' DAY
      AND value / 1e18 > 10
  )
GROUP BY taker
ORDER BY total_volume DESC
LIMIT 20;
\`\`\`

Pertanyaan: Apa yang dilakukan subquery di sini? Bagaimana cara membaca logika query ini?

**Level 2 — Modifikasi**

Ubah query berikut agar menggunakan subquery di FROM untuk terlebih dahulu menghitung total ETH per wallet, kemudian di query luar hanya menampilkan wallet dengan total ETH lebih dari 50:

\`\`\`sql
SELECT
  "from"             AS wallet,
  SUM(value) / 1e18  AS total_eth
FROM ethereum.transactions
WHERE block_time >= NOW() - INTERVAL '30' DAY
  AND value > 0
GROUP BY "from"
HAVING SUM(value) / 1e18 > 50
ORDER BY total_eth DESC
LIMIT 20;
\`\`\`

Petunjuk: Bungkus query yang ada dalam tanda kurung sebagai subquery di FROM, beri alias, lalu tambahkan SELECT luar dengan WHERE untuk filter total_eth.

**Level 3 — Mandiri (Bonus)**

Tanpa melihat contoh, tulis query untuk menemukan wallet yang aktif di Uniswap (melakukan minimal 5 swap dalam 7 hari terakhir) DAN juga pernah melakukan transaksi ETH bernilai lebih dari 10 ETH dalam periode yang sama. Tampilkan alamat wallet, jumlah swap Uniswap, dan jumlah transaksi ETH besar.`;

const L_CTE = `# CTE dengan WITH — Query Bertahap yang Mudah Dibaca

> **TLDR:** CTE (Common Table Expression) adalah cara mendefinisikan query sementara bernama menggunakan kata kunci WITH. CTE membuat query kompleks multi-langkah menjadi mudah dibaca, di-debug, dan dipelihara.

---

Di lesson sebelumnya, kita belajar tentang subquery — cara menanamkan query di dalam query lain. Subquery berfungsi dengan baik untuk logika sederhana, namun saat query menjadi semakin kompleks dan bertingkat, subquery bisa menjadi sangat sulit dibaca dan di-debug. CTE hadir sebagai solusi: memberi nama pada setiap langkah query sehingga keseluruhan logika bisa dibaca seperti cerita yang mengalir.

## Apa itu CTE?

CTE (Common Table Expression) adalah **query sementara yang diberi nama**, didefinisikan di awal query menggunakan kata kunci WITH. CTE bukan tabel permanen — ia hanya ada selama query tersebut dieksekusi.

Analogi sehari-hari: CTE seperti resep masakan yang dipecah menjadi langkah-langkah bernama:
1. "Siapkan bumbu halus" (CTE pertama)
2. "Tumis bumbu hingga harum" (CTE kedua, menggunakan CTE pertama)
3. "Masak ayam bersama bumbu" (query final, menggunakan CTE kedua)

Setiap langkah diberi nama yang jelas, sehingga mudah dipahami dan dimodifikasi.

## Kapan CTE Digunakan?

1. **Query multi-langkah** — Ketika analisis memerlukan beberapa tahap transformasi
2. **Menghindari pengulangan** — Mendefinisikan sekali, digunakan berkali-kali
3. **Keterbacaan tim** — Membuat kode SQL yang bisa dipahami orang lain
4. **Debugging bertahap** — Bisa menjalankan setiap CTE secara terpisah untuk verifikasi
5. **Menggantikan subquery bertingkat** — Lebih bersih dari subquery nested tiga level ke dalam

## Sintaks Dasar

\`\`\`sql
WITH nama_cte AS (
  -- Query yang mendefinisikan CTE
  SELECT ...
  FROM ...
  WHERE ...
)

-- Query utama yang menggunakan CTE
SELECT *
FROM nama_cte
WHERE ...;
\`\`\`

## Perbandingan: Subquery Nested vs CTE

Lihat betapa besar perbedaan keterbacaannya:

\`\`\`sql
-- SUSAH DIBACA: subquery bertingkat
SELECT wallet, total_eth FROM (
  SELECT "from" AS wallet, SUM(value)/1e18 AS total_eth FROM (
    SELECT * FROM ethereum.transactions
    WHERE value > 0
      AND block_time >= NOW() - INTERVAL '30' DAY
  ) filtered
  GROUP BY "from"
) summary
WHERE total_eth > 100
ORDER BY total_eth DESC;

-- JAUH LEBIH MUDAH DIBACA: CTE
WITH filtered_txs AS (
  -- Langkah 1: ambil transaksi yang relevan
  SELECT "from", value
  FROM ethereum.transactions
  WHERE value > 0
    AND block_time >= NOW() - INTERVAL '30' DAY
),

wallet_summary AS (
  -- Langkah 2: hitung total per wallet
  SELECT
    "from"               AS wallet,
    SUM(value) / 1e18    AS total_eth,
    COUNT(*)             AS jumlah_tx
  FROM filtered_txs
  GROUP BY "from"
)

-- Langkah 3: filter dan tampilkan hasil akhir
SELECT wallet, total_eth, jumlah_tx
FROM wallet_summary
WHERE total_eth > 100
ORDER BY total_eth DESC
LIMIT 20;
\`\`\`

## Multiple CTE — Chain of Thought

Anda bisa mendefinisikan beberapa CTE berurutan, di mana CTE berikutnya bisa menggunakan CTE sebelumnya:

\`\`\`sql
WITH
-- Langkah 1: ambil data mentah DEX 30 hari terakhir
raw_trades AS (
  SELECT
    block_time,
    project,
    amount_usd,
    taker,
    blockchain
  FROM dex.trades
  WHERE block_time >= NOW() - INTERVAL '30' DAY
    AND blockchain = 'ethereum'
    AND amount_usd > 0
),

-- Langkah 2: hitung volume per protokol
protocol_volume AS (
  SELECT
    project,
    SUM(amount_usd)          AS total_volume,
    COUNT(*)                 AS trade_count,
    COUNT(DISTINCT taker)    AS unique_traders
  FROM raw_trades
  GROUP BY project
),

-- Langkah 3: hitung total seluruh pasar
total_market AS (
  SELECT SUM(total_volume) AS market_total
  FROM protocol_volume
)

-- Query final: gabungkan semua untuk market share analysis
SELECT
  p.project,
  p.total_volume,
  p.trade_count,
  p.unique_traders,
  ROUND(p.total_volume * 100.0 / t.market_total, 2) AS market_share_pct
FROM protocol_volume p
CROSS JOIN total_market t     -- CROSS JOIN karena total_market hanya 1 baris
ORDER BY p.total_volume DESC;
\`\`\`

## CTE yang Direferensikan Berkali-kali

Salah satu keunggulan CTE dibanding subquery: CTE yang sama bisa direferensikan lebih dari satu kali dalam query tanpa menduplikasi kode:

\`\`\`sql
WITH active_traders AS (
  SELECT DISTINCT taker AS wallet
  FROM dex.trades
  WHERE block_time >= NOW() - INTERVAL '30' DAY
    AND blockchain = 'ethereum'
    AND amount_usd > 1000
)

-- Gunakan active_traders dua kali:
-- 1. Hitung jumlah mereka
SELECT COUNT(*) AS total_active_traders
FROM active_traders

UNION ALL

-- 2. Hitung yang juga pernah transfer NFT
SELECT COUNT(DISTINCT at.wallet) AS active_traders_who_buy_nft
FROM active_traders at
WHERE EXISTS (
  SELECT 1 FROM nft.trades n
  WHERE n.buyer = at.wallet
    AND n.block_time >= NOW() - INTERVAL '30' DAY
);
\`\`\`

## CTE untuk Analisis Bertahap yang Kompleks

Berikut contoh nyata analisis yang memanfaatkan CTE untuk memecah logika kompleks:

\`\`\`sql
WITH
-- Data mentah: semua NFT sales 90 hari terakhir
nft_sales AS (
  SELECT
    block_time,
    buyer,
    seller,
    nft_contract_address  AS collection,
    amount_usd
  FROM nft.trades
  WHERE blockchain = 'ethereum'
    AND block_time >= NOW() - INTERVAL '90' DAY
    AND amount_usd > 0
),

-- Statistik per koleksi
collection_stats AS (
  SELECT
    collection,
    COUNT(*)             AS total_sales,
    SUM(amount_usd)      AS total_volume,
    MIN(amount_usd)      AS floor_price,
    AVG(amount_usd)      AS avg_price,
    MAX(amount_usd)      AS highest_sale,
    COUNT(DISTINCT buyer) AS unique_buyers
  FROM nft_sales
  GROUP BY collection
),

-- Hanya koleksi dengan aktivitas signifikan
top_collections AS (
  SELECT *
  FROM collection_stats
  WHERE total_sales >= 100
    AND total_volume >= 1000000
)

-- Tampilkan hasil akhir
SELECT
  collection,
  total_sales,
  ROUND(total_volume, 0)      AS total_volume_usd,
  ROUND(floor_price, 2)       AS floor_price_usd,
  ROUND(avg_price, 2)         AS avg_price_usd,
  unique_buyers,
  ROUND(total_volume / total_sales, 2) AS avg_sale_price
FROM top_collections
ORDER BY total_volume DESC
LIMIT 20;
\`\`\`

## Kapan Pakai CTE vs Subquery?

| Situasi | Rekomendasi |
|---------|-------------|
| Logika sederhana, satu level | Subquery bisa digunakan |
| Logika dua langkah atau lebih | CTE lebih baik |
| Perlu mereferensikan hasil yang sama berkali-kali | CTE wajib |
| Bekerja dalam tim atau perlu dokumentasi | CTE lebih baik |
| Debugging bertahap | CTE memudahkan (bisa jalankan tiap step) |

Di dunia analisis on-chain profesional, hampir semua query kompleks menggunakan CTE. Biasakan menulis CTE dari sekarang — kode Anda akan jauh lebih mudah dibaca dan diperbaiki nanti.

## Contoh Praktis di Dune

\`\`\`sql
-- Analisis: temukan wallet yang volume trading-nya turun lebih dari 50%
-- dibandingkan bulan sebelumnya
WITH
volume_bulan_ini AS (
  SELECT
    taker,
    SUM(amount_usd) AS volume
  FROM dex.trades
  WHERE blockchain = 'ethereum'
    AND block_time >= NOW() - INTERVAL '30' DAY
  GROUP BY taker
),

volume_bulan_lalu AS (
  SELECT
    taker,
    SUM(amount_usd) AS volume
  FROM dex.trades
  WHERE blockchain = 'ethereum'
    AND block_time BETWEEN NOW() - INTERVAL '60' DAY
                      AND NOW() - INTERVAL '30' DAY
  GROUP BY taker
)

SELECT
  COALESCE(a.taker, b.taker)     AS wallet,
  COALESCE(a.volume, 0)          AS volume_bulan_ini,
  COALESCE(b.volume, 0)          AS volume_bulan_lalu,
  ROUND(
    (COALESCE(a.volume, 0) - COALESCE(b.volume, 0)) * 100.0
    / NULLIF(b.volume, 0),
    1
  )                               AS pct_perubahan
FROM volume_bulan_ini a
FULL OUTER JOIN volume_bulan_lalu b ON a.taker = b.taker
WHERE b.volume > 100000             -- hanya yang bulan lalu aktif (lebih dari $100K)
ORDER BY pct_perubahan ASC          -- yang paling turun dulu
LIMIT 20;
\`\`\`

## Ringkasan

| Konsep | Sintaks | Kegunaan |
|--------|---------|----------|
| Definisi CTE | \`WITH nama AS (...)\` | Mendefinisikan query sementara bernama |
| Multiple CTE | \`WITH cte1 AS (...), cte2 AS (...)\` | Chain beberapa langkah |
| Referensi CTE | \`FROM nama_cte\` | Menggunakan CTE dalam query |
| CROSS JOIN | \`CROSS JOIN tabel_satu_baris\` | Menggabungkan dengan nilai global (total, avg) |

## Tantangan Praktik

**Level 1 — Eksplorasi**

Jalankan query berikut dan pahami setiap langkah CTE-nya:

\`\`\`sql
WITH
daily_volume AS (
  SELECT
    DATE_TRUNC('day', block_time) AS tanggal,
    SUM(amount_usd)               AS volume
  FROM dex.trades
  WHERE blockchain = 'ethereum'
    AND block_time >= NOW() - INTERVAL '30' DAY
  GROUP BY 1
),
stats AS (
  SELECT
    AVG(volume)   AS rata_rata,
    MAX(volume)   AS maksimum,
    MIN(volume)   AS minimum
  FROM daily_volume
)
SELECT
  d.tanggal,
  d.volume,
  s.rata_rata,
  ROUND((d.volume - s.rata_rata) * 100.0 / s.rata_rata, 1) AS pct_vs_rata_rata
FROM daily_volume d
CROSS JOIN stats s
ORDER BY d.tanggal;
\`\`\`

Pertanyaan: Apa yang dihitung setiap CTE? Mengapa digunakan CROSS JOIN?

**Level 2 — Modifikasi**

Tambahkan CTE ketiga pada query di bawah ini yang menghitung \`volume_7h_lalu\` (7 hari sebelum periode saat ini), sehingga query final bisa membandingkan volume minggu ini vs minggu lalu:

\`\`\`sql
WITH
volume_minggu_ini AS (
  SELECT
    project,
    SUM(amount_usd) AS volume
  FROM dex.trades
  WHERE blockchain = 'ethereum'
    AND block_time >= NOW() - INTERVAL '7' DAY
  GROUP BY project
)
SELECT * FROM volume_minggu_ini
ORDER BY volume DESC LIMIT 10;
\`\`\`

**Level 3 — Mandiri (Bonus)**

Tanpa melihat contoh, tulis query menggunakan CTE untuk menganalisis aktivitas NFT di Ethereum dalam 30 hari terakhir. Buat setidaknya 3 CTE: satu untuk data mentah, satu untuk statistik per koleksi, dan satu untuk menemukan koleksi yang mengalami kenaikan volume lebih dari 50% dibanding 30 hari sebelumnya.`;

const L_WINDOW = `# Window Functions — Analisis Per Baris Tanpa Kehilangan Detail

> **TLDR:** Window Function menghitung nilai berdasarkan sekelompok baris terkait (disebut "window"), tanpa menggabungkan baris tersebut menjadi satu. Hasilnya: setiap baris tetap ada, tapi memiliki nilai kalkulasi dari konteks yang lebih luas.

---

Di lesson sebelumnya, kita belajar bahwa GROUP BY menggabungkan banyak baris menjadi satu baris ringkasan per kelompok. Itu bagus untuk membuat laporan ringkasan. Namun, bagaimana jika Anda ingin melihat setiap transaksi individual, sekaligus tahu berapa persentase kontribusinya terhadap total volume hari itu? Atau melihat ranking setiap swap berdasarkan ukurannya? Atau menghitung perubahan volume dibanding hari sebelumnya? Untuk semua ini, Anda membutuhkan Window Function.

## Apa itu Window Function?

Window Function adalah fungsi SQL yang melakukan kalkulasi pada sekelompok baris yang terkait dengan baris saat ini (disebut "window" atau "jendela"), **tanpa menggabungkan baris-baris tersebut**. Jumlah baris dalam hasil tetap sama — tidak ada baris yang hilang.

Analogi sehari-hari: Bayangkan Anda melihat nilai ujian seluruh kelas. Window Function seperti menambahkan kolom "ranking di kelas" ke setiap baris nilai, tanpa menghilangkan data individual siswa. Setiap siswa tetap ada, tapi sekarang Anda tahu posisi mereka relatif terhadap yang lain.

## Kapan Window Function Digunakan?

1. **Peringkat (ranking)** — Siapa trader terbesar ke-1, ke-2, ke-3?
2. **Running total** — Volume DEX kumulatif dari awal bulan
3. **Perbandingan dengan nilai sebelumnya** — Volume hari ini vs kemarin (naik/turun berapa?)
4. **Persentase kontribusi** — Swap ini mewakili berapa persen total volume hari itu?
5. **Moving average** — Rata-rata bergerak 7 hari untuk trend yang lebih halus

## Sintaks Dasar — OVER()

Kata kunci \`OVER()\` adalah yang membedakan Window Function dari fungsi agregat biasa:

\`\`\`sql
SELECT
  block_time,
  project,
  amount_usd,
  -- Window Function: total semua baris (window kosong = semua baris)
  SUM(amount_usd) OVER ()          AS total_volume_hari_ini,
  -- Persentase kontribusi setiap swap
  amount_usd * 100.0 / SUM(amount_usd) OVER () AS pct_dari_total
FROM dex.trades
WHERE block_time >= NOW() - INTERVAL '1' DAY
  AND blockchain = 'ethereum'
  AND amount_usd > 0
LIMIT 30;
\`\`\`

Hasilnya: setiap baris masih ada, tapi kolom \`total_volume_hari_ini\` berisi angka yang sama di semua baris (total semua swap), dan \`pct_dari_total\` menunjukkan kontribusi setiap swap.

## PARTITION BY — Bagi Window Menjadi Kelompok

PARTITION BY membagi data menjadi partisi terpisah sebelum menghitung window function. Kalkulasi dilakukan per partisi, bukan untuk semua baris:

\`\`\`sql
SELECT
  block_time,
  project,
  amount_usd,
  -- Total per protokol (berbeda untuk setiap project)
  SUM(amount_usd) OVER (PARTITION BY project)   AS total_per_protokol,
  -- Total semua protokol (sama untuk semua baris)
  SUM(amount_usd) OVER ()                       AS total_semua_protokol,
  -- Market share setiap swap terhadap total protokolnya sendiri
  ROUND(
    amount_usd * 100.0 / SUM(amount_usd) OVER (PARTITION BY project),
    4
  )                                             AS pct_dalam_protokol
FROM dex.trades
WHERE block_time >= NOW() - INTERVAL '1' DAY
  AND blockchain = 'ethereum'
  AND amount_usd > 0
LIMIT 50;
\`\`\`

## ORDER BY dalam Window — Untuk Ranking dan Running Total

Menambahkan ORDER BY di dalam OVER() menciptakan window yang bergerak secara berurutan — ini dibutuhkan untuk running total, ranking, dan LAG/LEAD:

\`\`\`sql
-- Running total volume per hari
WITH daily_volume AS (
  SELECT
    DATE_TRUNC('day', block_time)  AS tanggal,
    SUM(amount_usd)                AS volume_harian
  FROM dex.trades
  WHERE block_time >= NOW() - INTERVAL '30' DAY
    AND blockchain = 'ethereum'
  GROUP BY 1
)
SELECT
  tanggal,
  volume_harian,
  SUM(volume_harian) OVER (ORDER BY tanggal) AS volume_kumulatif
FROM daily_volume
ORDER BY tanggal;
\`\`\`

## ROW_NUMBER, RANK, DENSE_RANK — Fungsi Peringkat

\`\`\`sql
WITH wallet_volume AS (
  SELECT
    taker                 AS wallet,
    SUM(amount_usd)       AS total_volume
  FROM dex.trades
  WHERE block_time >= NOW() - INTERVAL '30' DAY
    AND blockchain = 'ethereum'
  GROUP BY taker
)
SELECT
  wallet,
  total_volume,
  ROW_NUMBER() OVER (ORDER BY total_volume DESC)  AS row_num,
  RANK() OVER (ORDER BY total_volume DESC)        AS rank_val,
  DENSE_RANK() OVER (ORDER BY total_volume DESC)  AS dense_rank_val
FROM wallet_volume
LIMIT 20;
\`\`\`

Perbedaan saat ada nilai yang sama (tie):
| Wallet | Volume | ROW_NUMBER | RANK | DENSE_RANK |
|--------|--------|------------|------|------------|
| A | 1.000.000 | 1 | 1 | 1 |
| B | 900.000 | 2 | 2 | 2 |
| C | 900.000 | 3 | 2 | 2 |
| D | 800.000 | 4 | **4** | **3** |

- **ROW_NUMBER**: nomor unik meskipun nilai sama (B=2, C=3)
- **RANK**: nilai sama mendapat nomor sama, tapi melompat setelahnya (B=C=2, D=4)
- **DENSE_RANK**: nilai sama mendapat nomor sama, tidak melompat (B=C=2, D=3)

## Ranking Per Partisi

Gabungkan PARTITION BY dan ORDER BY untuk ranking dalam setiap kelompok:

\`\`\`sql
-- Temukan swap terbesar di setiap protokol (rank 1 per protokol)
WITH ranked_swaps AS (
  SELECT
    block_time,
    project,
    amount_usd,
    taker,
    RANK() OVER (
      PARTITION BY project           -- ranking terpisah per protokol
      ORDER BY amount_usd DESC       -- diurutkan dari terbesar
    ) AS rank_dalam_protokol
  FROM dex.trades
  WHERE block_time >= NOW() - INTERVAL '7' DAY
    AND blockchain = 'ethereum'
    AND amount_usd > 0
)
SELECT *
FROM ranked_swaps
WHERE rank_dalam_protokol = 1      -- hanya swap terbesar di masing-masing protokol
ORDER BY amount_usd DESC;
\`\`\`

## LAG dan LEAD — Mengakses Nilai Baris Lain

LAG mengakses nilai dari baris **sebelumnya**, LEAD dari baris **berikutnya**. Sangat berguna untuk menghitung perubahan dari waktu ke waktu:

\`\`\`sql
WITH daily_volume AS (
  SELECT
    DATE_TRUNC('day', block_time)  AS tanggal,
    SUM(amount_usd)                AS volume
  FROM dex.trades
  WHERE block_time >= NOW() - INTERVAL '30' DAY
    AND blockchain = 'ethereum'
  GROUP BY 1
)
SELECT
  tanggal,
  volume                                                        AS volume_hari_ini,
  LAG(volume) OVER (ORDER BY tanggal)                          AS volume_kemarin,
  volume - LAG(volume) OVER (ORDER BY tanggal)                 AS selisih_volume,
  ROUND(
    (volume - LAG(volume) OVER (ORDER BY tanggal)) * 100.0
    / NULLIF(LAG(volume) OVER (ORDER BY tanggal), 0),
    2
  )                                                            AS pct_perubahan
FROM daily_volume
ORDER BY tanggal;
\`\`\`

## Moving Average (Rata-Rata Bergerak)

Moving average menghaluskan fluktuasi harian untuk melihat tren yang lebih jelas:

\`\`\`sql
WITH daily_volume AS (
  SELECT
    DATE_TRUNC('day', block_time)  AS tanggal,
    SUM(amount_usd)                AS volume
  FROM dex.trades
  WHERE block_time >= NOW() - INTERVAL '90' DAY
    AND blockchain = 'ethereum'
  GROUP BY 1
)
SELECT
  tanggal,
  volume,
  -- Moving average 7 hari: rata-rata dari 6 hari sebelumnya + hari ini
  AVG(volume) OVER (
    ORDER BY tanggal
    ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
  ) AS moving_avg_7d
FROM daily_volume
ORDER BY tanggal;
\`\`\`

## Contoh Praktis di Dune

\`\`\`sql
-- Dashboard analisis DEX: semua metrik dalam satu query
WITH daily_stats AS (
  SELECT
    DATE_TRUNC('day', block_time)  AS tanggal,
    COUNT(*)                       AS jumlah_swap,
    SUM(amount_usd)                AS volume,
    COUNT(DISTINCT taker)          AS unique_traders
  FROM dex.trades
  WHERE blockchain = 'ethereum'
    AND block_time >= NOW() - INTERVAL '30' DAY
    AND amount_usd > 0
  GROUP BY 1
)
SELECT
  tanggal,
  jumlah_swap,
  volume,
  unique_traders,
  -- Running total
  SUM(volume) OVER (ORDER BY tanggal)     AS volume_kumulatif,
  -- Perbandingan dengan kemarin
  LAG(volume) OVER (ORDER BY tanggal)     AS volume_kemarin,
  ROUND(
    (volume - LAG(volume) OVER (ORDER BY tanggal)) * 100.0
    / NULLIF(LAG(volume) OVER (ORDER BY tanggal), 0),
    1
  )                                        AS pct_vs_kemarin,
  -- Moving average 7 hari
  ROUND(
    AVG(volume) OVER (
      ORDER BY tanggal
      ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
    ),
    0
  )                                        AS ma7d
FROM daily_stats
ORDER BY tanggal;
\`\`\`

## Ringkasan

| Fungsi | Kegunaan | Sintaks |
|--------|----------|---------|
| \`SUM() OVER()\` | Total semua baris | \`SUM(col) OVER ()\` |
| \`SUM() OVER(PARTITION BY)\` | Total per kelompok | \`SUM(col) OVER (PARTITION BY grp)\` |
| \`SUM() OVER(ORDER BY)\` | Running total | \`SUM(col) OVER (ORDER BY date)\` |
| \`ROW_NUMBER()\` | Nomor urut unik | \`ROW_NUMBER() OVER (ORDER BY col DESC)\` |
| \`RANK()\` | Ranking (melompat jika tie) | \`RANK() OVER (ORDER BY col DESC)\` |
| \`DENSE_RANK()\` | Ranking (tidak melompat) | \`DENSE_RANK() OVER (ORDER BY col DESC)\` |
| \`LAG(col)\` | Nilai baris sebelumnya | \`LAG(col) OVER (ORDER BY date)\` |
| \`LEAD(col)\` | Nilai baris berikutnya | \`LEAD(col) OVER (ORDER BY date)\` |
| \`AVG() OVER(ROWS BETWEEN)\` | Moving average | \`AVG(col) OVER (ORDER BY date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW)\` |

## Tantangan Praktik

**Level 1 — Eksplorasi**

Jalankan query berikut dan perhatikan perbedaan kolom \`rank_val\` dan \`dense_rank_val\` jika ada nilai yang sama:

\`\`\`sql
WITH protocol_volume AS (
  SELECT
    project,
    blockchain,
    SUM(amount_usd) AS total_volume
  FROM dex.trades
  WHERE block_time >= NOW() - INTERVAL '7' DAY
  GROUP BY project, blockchain
)
SELECT
  project,
  blockchain,
  total_volume,
  RANK() OVER (PARTITION BY blockchain ORDER BY total_volume DESC) AS rank_dalam_chain,
  DENSE_RANK() OVER (PARTITION BY blockchain ORDER BY total_volume DESC) AS dense_rank
FROM protocol_volume
ORDER BY blockchain, rank_dalam_chain
LIMIT 30;
\`\`\`

Pertanyaan: Apa perbedaan hasil RANK dan DENSE_RANK? Protokol apa yang berada di posisi 1 setiap chain?

**Level 2 — Modifikasi**

Tambahkan kolom \`pct_perubahan_volume\` pada query berikut yang menunjukkan persentase perubahan volume dibanding hari sebelumnya:

\`\`\`sql
WITH daily AS (
  SELECT
    DATE_TRUNC('day', block_time) AS tanggal,
    SUM(amount_usd) AS volume
  FROM dex.trades
  WHERE blockchain = 'ethereum'
    AND block_time >= NOW() - INTERVAL '14' DAY
  GROUP BY 1
)
SELECT tanggal, volume
FROM daily
ORDER BY tanggal;
\`\`\`

Petunjuk: Gunakan LAG(volume) OVER (ORDER BY tanggal) untuk mendapatkan volume kemarin.

**Level 3 — Mandiri (Bonus)**

Tanpa melihat contoh, tulis query untuk menghitung moving average 7 hari dari jumlah unique traders harian di Ethereum DEX dalam 60 hari terakhir. Tampilkan tanggal, unique traders harian, dan moving average 7 hari, diurutkan berdasarkan tanggal.`;

const L_DATE = `# Fungsi Tanggal dan Waktu di SQL

> **TLDR:** Hampir semua analisis on-chain memiliki dimensi waktu — volume harian, aktivitas mingguan, pertumbuhan bulanan. Pelajari cara memanipulasi timestamp, memfilter periode waktu, dan mengelompokkan data berdasarkan waktu di DuneSQL.

---

Hampir semua data blockchain memiliki dimensi waktu: setiap transaksi, swap, dan transfer memiliki \`block_time\`. Tanpa kemampuan memanipulasi tanggal dan waktu, analisis on-chain akan sangat terbatas. Lesson ini membahas fungsi-fungsi waktu yang paling sering digunakan, dari filter sederhana hingga analisis time series yang kompleks.

## Apa itu Tipe Data Waktu?

Di DuneSQL, data waktu tersimpan dalam tipe \`TIMESTAMP\` atau \`TIMESTAMP WITH TIME ZONE\`. Kolom \`block_time\` di hampir semua tabel Dune menggunakan tipe ini.

Analogi sehari-hari: Timestamp seperti cap waktu di struk belanja — bukan hanya tanggal, tapi juga jam, menit, dan detik secara presisi.

## Kapan Fungsi Waktu Digunakan?

1. **Filter rentang waktu** — Hanya data 7 atau 30 hari terakhir
2. **Agregasi per periode** — Volume per hari, per minggu, per bulan
3. **Analisis tren** — Pertumbuhan dari bulan ke bulan
4. **Analisis pola waktu** — Jam berapa paling banyak transaksi?
5. **Perbandingan periode** — Minggu ini vs minggu lalu

## NOW() — Waktu Saat Ini

\`NOW()\` mengembalikan timestamp saat ini. Ini adalah fungsi yang paling sering digunakan dalam filter waktu:

\`\`\`sql
SELECT
  NOW()                          AS waktu_sekarang,
  CURRENT_DATE                   AS hari_ini,
  CURRENT_TIMESTAMP              AS timestamp_sekarang;

-- Filter waktu yang sering dipakai:
-- 24 jam terakhir
WHERE block_time >= NOW() - INTERVAL '1' DAY

-- 7 hari terakhir
WHERE block_time >= NOW() - INTERVAL '7' DAY

-- 30 hari terakhir
WHERE block_time >= NOW() - INTERVAL '30' DAY

-- 90 hari terakhir
WHERE block_time >= NOW() - INTERVAL '90' DAY

-- 1 tahun terakhir
WHERE block_time >= NOW() - INTERVAL '1' YEAR
\`\`\`

Format INTERVAL di DuneSQL (Trino): \`INTERVAL 'n' UNIT\` — perhatikan tanda kutip pada angkanya.

## DATE_TRUNC — Bulatkan Timestamp ke Periode Tertentu

\`DATE_TRUNC\` membulatkan timestamp ke awal periode yang ditentukan. Ini adalah fungsi yang paling sering digunakan untuk agregasi time series:

\`\`\`sql
-- Contoh nilai yang dihasilkan untuk waktu '2024-03-15 14:32:07'
SELECT
  DATE_TRUNC('second', TIMESTAMP '2024-03-15 14:32:07') AS per_detik,     -- 2024-03-15 14:32:07
  DATE_TRUNC('minute', TIMESTAMP '2024-03-15 14:32:07') AS per_menit,     -- 2024-03-15 14:32:00
  DATE_TRUNC('hour',   TIMESTAMP '2024-03-15 14:32:07') AS per_jam,       -- 2024-03-15 14:00:00
  DATE_TRUNC('day',    TIMESTAMP '2024-03-15 14:32:07') AS per_hari,      -- 2024-03-15 00:00:00
  DATE_TRUNC('week',   TIMESTAMP '2024-03-15 14:32:07') AS per_minggu,    -- 2024-03-11 00:00:00 (Senin)
  DATE_TRUNC('month',  TIMESTAMP '2024-03-15 14:32:07') AS per_bulan,     -- 2024-03-01 00:00:00
  DATE_TRUNC('year',   TIMESTAMP '2024-03-15 14:32:07') AS per_tahun;     -- 2024-01-01 00:00:00
\`\`\`

Contoh penggunaan untuk time series analysis:

\`\`\`sql
-- Volume DEX per hari selama 30 hari terakhir
SELECT
  DATE_TRUNC('day', block_time)  AS tanggal,
  COUNT(*)                       AS jumlah_swap,
  SUM(amount_usd)                AS volume_usd,
  COUNT(DISTINCT taker)          AS unique_traders
FROM dex.trades
WHERE block_time >= NOW() - INTERVAL '30' DAY
  AND blockchain = 'ethereum'
GROUP BY DATE_TRUNC('day', block_time)
ORDER BY tanggal ASC;

-- Volume per minggu
SELECT
  DATE_TRUNC('week', block_time) AS minggu,
  SUM(amount_usd)                AS volume_usd
FROM dex.trades
WHERE block_time >= NOW() - INTERVAL '90' DAY
  AND blockchain = 'ethereum'
GROUP BY DATE_TRUNC('week', block_time)
ORDER BY minggu;

-- Volume per bulan
SELECT
  DATE_TRUNC('month', block_time) AS bulan,
  SUM(amount_usd)                 AS volume_usd
FROM dex.trades
WHERE block_time >= NOW() - INTERVAL '365' DAY
  AND blockchain = 'ethereum'
GROUP BY DATE_TRUNC('month', block_time)
ORDER BY bulan;
\`\`\`

## EXTRACT — Ambil Komponen Tertentu dari Timestamp

\`EXTRACT\` mengambil satu komponen dari timestamp (tahun, bulan, hari, jam, dll) sebagai angka:

\`\`\`sql
SELECT
  EXTRACT(year  FROM block_time) AS tahun,          -- 2024
  EXTRACT(month FROM block_time) AS bulan,          -- 1-12
  EXTRACT(day   FROM block_time) AS hari,           -- 1-31
  EXTRACT(hour  FROM block_time) AS jam,            -- 0-23
  EXTRACT(minute FROM block_time) AS menit,         -- 0-59
  EXTRACT(dow   FROM block_time) AS hari_minggu     -- 0=Minggu, 1=Senin, ..., 6=Sabtu
FROM ethereum.transactions
WHERE block_time >= NOW() - INTERVAL '1' DAY
LIMIT 10;

-- Analisis pola aktivitas per jam (kapan peak trading?)
SELECT
  EXTRACT(hour FROM block_time) AS jam_utc,
  COUNT(*)                      AS jumlah_swap,
  SUM(amount_usd)               AS volume_usd
FROM dex.trades
WHERE block_time >= NOW() - INTERVAL '7' DAY
  AND blockchain = 'ethereum'
GROUP BY EXTRACT(hour FROM block_time)
ORDER BY jam_utc;

-- Analisis pola per hari dalam seminggu
SELECT
  EXTRACT(dow FROM block_time) AS hari_minggu,  -- 0=Minggu, 1=Senin, ...
  COUNT(*)                     AS jumlah_swap,
  AVG(amount_usd)              AS rata_rata_swap
FROM dex.trades
WHERE block_time >= NOW() - INTERVAL '30' DAY
  AND blockchain = 'ethereum'
GROUP BY EXTRACT(dow FROM block_time)
ORDER BY hari_minggu;
\`\`\`

## Aritmatika Tanggal — Menghitung Selisih Waktu

\`\`\`sql
-- Selisih waktu antara dua timestamp (dalam detik)
SELECT
  hash,
  block_time,
  -- Contoh: berapa lama sejak transaksi ini?
  DATE_DIFF('second', block_time, NOW()) AS detik_lalu,
  DATE_DIFF('minute', block_time, NOW()) AS menit_lalu,
  DATE_DIFF('hour',   block_time, NOW()) AS jam_lalu,
  DATE_DIFF('day',    block_time, NOW()) AS hari_lalu
FROM ethereum.transactions
WHERE block_time >= NOW() - INTERVAL '1' DAY
LIMIT 10;

-- Tambahkan interval ke timestamp
SELECT
  block_time                              AS waktu_transaksi,
  block_time + INTERVAL '1' HOUR         AS satu_jam_kemudian,
  block_time - INTERVAL '24' HOUR        AS satu_hari_sebelumnya
FROM ethereum.transactions
WHERE block_time >= NOW() - INTERVAL '1' DAY
LIMIT 5;
\`\`\`

## Filter Periode Waktu yang Umum Digunakan

\`\`\`sql
-- Hari ini (dari awal hari UTC)
WHERE block_time >= DATE_TRUNC('day', NOW())

-- Kemarin
WHERE block_time >= DATE_TRUNC('day', NOW()) - INTERVAL '1' DAY
  AND block_time < DATE_TRUNC('day', NOW())

-- Minggu ini (Senin sebagai awal minggu)
WHERE block_time >= DATE_TRUNC('week', NOW())

-- Bulan ini
WHERE block_time >= DATE_TRUNC('month', NOW())

-- Bulan lalu
WHERE block_time >= DATE_TRUNC('month', NOW()) - INTERVAL '1' MONTH
  AND block_time < DATE_TRUNC('month', NOW())

-- Kuartal ini (Q1=Jan-Mar, Q2=Apr-Jun, dll)
WHERE block_time >= DATE_TRUNC('quarter', NOW())
\`\`\`

## Contoh Praktis di Dune

\`\`\`sql
-- Analisis tren volume DEX dengan perbandingan week-over-week
WITH weekly_volume AS (
  SELECT
    DATE_TRUNC('week', block_time) AS minggu,
    SUM(amount_usd)                AS volume
  FROM dex.trades
  WHERE blockchain = 'ethereum'
    AND block_time >= NOW() - INTERVAL '90' DAY
    AND amount_usd > 0
  GROUP BY 1
)
SELECT
  minggu,
  volume,
  LAG(volume) OVER (ORDER BY minggu)    AS volume_minggu_lalu,
  ROUND(
    (volume - LAG(volume) OVER (ORDER BY minggu)) * 100.0
    / NULLIF(LAG(volume) OVER (ORDER BY minggu), 0),
    2
  )                                      AS pct_wow_change
FROM weekly_volume
ORDER BY minggu;
\`\`\`

## Ringkasan

| Fungsi | Kegunaan | Contoh |
|--------|----------|--------|
| \`NOW()\` | Waktu saat ini | \`WHERE block_time >= NOW() - INTERVAL '7' DAY\` |
| \`DATE_TRUNC('day', ts)\` | Bulatkan ke awal hari | \`GROUP BY DATE_TRUNC('day', block_time)\` |
| \`DATE_TRUNC('month', ts)\` | Bulatkan ke awal bulan | \`GROUP BY DATE_TRUNC('month', block_time)\` |
| \`EXTRACT(hour FROM ts)\` | Ambil komponen jam | \`GROUP BY EXTRACT(hour FROM block_time)\` |
| \`DATE_DIFF('day', t1, t2)\` | Selisih dalam hari | \`DATE_DIFF('day', start_time, NOW())\` |
| \`INTERVAL '7' DAY\` | Interval waktu | \`NOW() - INTERVAL '7' DAY\` |

## Tantangan Praktik

**Level 1 — Eksplorasi**

Jalankan query berikut dan amati pola hasilnya:

\`\`\`sql
SELECT
  EXTRACT(hour FROM block_time)   AS jam_utc,
  COUNT(*)                        AS jumlah_swap,
  SUM(amount_usd)                 AS volume_usd,
  AVG(amount_usd)                 AS rata_rata_swap
FROM dex.trades
WHERE blockchain = 'ethereum'
  AND block_time >= NOW() - INTERVAL '7' DAY
  AND amount_usd > 0
GROUP BY EXTRACT(hour FROM block_time)
ORDER BY jam_utc;
\`\`\`

Pertanyaan: Jam berapa (UTC) volume trading paling tinggi? Jam berapa paling rendah? Pola ini mencerminkan waktu aktif di zona waktu mana?

**Level 2 — Modifikasi**

Ubah query berikut agar mengelompokkan data per minggu (bukan per hari) dan tambahkan kolom \`minggu_ke\` yang menunjukkan nomor minggu dalam tahun:

\`\`\`sql
SELECT
  DATE_TRUNC('day', block_time)  AS tanggal,
  COUNT(*)                       AS jumlah_tx,
  SUM(value) / 1e18              AS total_eth
FROM ethereum.transactions
WHERE block_time >= NOW() - INTERVAL '30' DAY
GROUP BY DATE_TRUNC('day', block_time)
ORDER BY tanggal;
\`\`\`

Petunjuk: Ganti \`'day'\` dengan \`'week'\`, dan tambahkan \`EXTRACT(week FROM block_time)\` sebagai kolom.

**Level 3 — Mandiri (Bonus)**

Tanpa melihat contoh, tulis query untuk membandingkan total volume DEX di Ethereum antara bulan ini dengan bulan lalu. Tampilkan nama bulan, total volume, dan persentase perubahan. Gunakan CTE untuk memisahkan data dua periode.`;

const L_STRING = `# Fungsi String dan Manipulasi Teks

> **TLDR:** Data on-chain banyak berisi teks — alamat wallet, nama token, label. Pelajari cara memanipulasi string: mengubah huruf besar/kecil, mengambil substring, menggabungkan teks, mengkonversi tipe data, dan menangani nilai NULL.

---

Di lesson sebelumnya kita belajar tentang fungsi tanggal — dimensi waktu dalam data on-chain. Dimensi penting lainnya adalah teks. Alamat Ethereum (seperti \`0x28C6c06298d514Db089934071355E5743bf21d60\`) adalah string teks. Nama token, label wallet, dan deskripsi protokol juga berupa teks. Fungsi string SQL memungkinkan Anda memanipulasi, membandingkan, dan mengekstrak informasi dari data teks ini.

## Apa itu Fungsi String?

Fungsi string adalah fungsi SQL yang beroperasi pada nilai bertipe teks (VARCHAR, TEXT, atau serupa). Fungsi ini memungkinkan Anda mengubah format, mencari pola, mengambil bagian tertentu, atau menggabungkan teks.

Analogi sehari-hari: Bayangkan fungsi string seperti alat pengedit teks — Anda bisa memotong, menggabungkan, mengubah huruf besar/kecil, atau mencari kata tertentu dalam sebuah kalimat.

## Kapan Fungsi String Digunakan?

1. **Normalisasi alamat** — Memastikan alamat selalu lowercase untuk perbandingan konsisten
2. **Pencarian label** — Mencari wallet yang namanya mengandung kata tertentu
3. **Ekstraksi prefix** — Mengambil 8 karakter pertama alamat untuk kategorisasi
4. **Konversi tipe** — Mengubah angka jadi teks atau sebaliknya
5. **Menangani NULL** — Menggantikan nilai kosong dengan teks default

## Fungsi String Dasar

\`\`\`sql
SELECT
  LOWER('0xABCDEF123456')               AS lowercase,       -- '0xabcdef123456'
  UPPER('0xabcdef123456')               AS uppercase,       -- '0XABCDEF123456'
  LENGTH('0x1234567890abcdef')          AS panjang,         -- 18
  SUBSTR('0xabcdef1234', 3, 6)          AS substring,       -- 'abcdef' (mulai pos 3, 6 karakter)
  CONCAT('Hello', ' ', 'World')         AS gabungan,        -- 'Hello World'
  '0x' || 'abcdef'                      AS concat_operator, -- '0xabcdef' (cara alternatif)
  REPLACE('0x1234abcd', '0x', '')       AS tanpa_prefix,    -- '1234abcd'
  TRIM('  spasi di kiri kanan  ')       AS trimmed,         -- 'spasi di kiri kanan'
  LTRIM('  spasi kiri  ')               AS ltrimmed,        -- 'spasi kiri  '
  RTRIM('  spasi kanan  ')              AS rtrimmed;        -- '  spasi kanan'
\`\`\`

## LOWER dan UPPER — Normalisasi Huruf

Alamat Ethereum bisa tersimpan dengan campuran huruf besar dan kecil (checksummed address). Selalu gunakan LOWER() untuk memastikan perbandingan yang konsisten:

\`\`\`sql
-- Normalisasi alamat untuk perbandingan
SELECT
  LOWER(CAST(address AS VARCHAR)) AS normalized_address,
  name,
  category
FROM labels.addresses
WHERE LOWER(name) LIKE '%binance%';  -- pencarian case-insensitive

-- Tanpa LOWER, perbandingan ini bisa gagal jika format alamat berbeda:
-- WHERE address = '0x28C6c06298d514Db089934071355E5743bf21d60'  -- bisa gagal
-- Lebih aman:
-- WHERE LOWER(CAST(address AS VARCHAR)) = LOWER('0x28C6c06298d514Db089934071355E5743bf21d60')
\`\`\`

## SUBSTR / SUBSTRING — Mengambil Bagian Teks

\`\`\`sql
-- Ambil 10 karakter pertama dari alamat (prefix untuk kategorisasi)
SELECT
  CAST(address AS VARCHAR)                AS full_address,
  SUBSTR(CAST(address AS VARCHAR), 1, 10) AS prefix_address,
  name
FROM labels.addresses
WHERE category = 'cex'
LIMIT 20;

-- Ambil karakter terakhir
SELECT
  tx_hash,
  SUBSTR(CAST(tx_hash AS VARCHAR), LENGTH(CAST(tx_hash AS VARCHAR)) - 5) AS suffix_hash
FROM ethereum.transactions
WHERE block_time >= NOW() - INTERVAL '1' DAY
LIMIT 10;
\`\`\`

## CONCAT — Menggabungkan Teks

\`\`\`sql
-- Membuat label pair trading (TOKEN_A/TOKEN_B)
SELECT
  token_bought_symbol || '/' || token_sold_symbol   AS pair,
  COUNT(*)                                          AS jumlah_swap,
  SUM(amount_usd)                                   AS volume
FROM dex.trades
WHERE block_time >= NOW() - INTERVAL '7' DAY
  AND blockchain = 'ethereum'
GROUP BY token_bought_symbol || '/' || token_sold_symbol
ORDER BY volume DESC
LIMIT 20;

-- CONCAT dengan LOWER untuk normalisasi
SELECT
  CONCAT('https://etherscan.io/tx/', CAST(hash AS VARCHAR)) AS etherscan_link,
  value / 1e18                                              AS eth
FROM ethereum.transactions
WHERE block_time >= NOW() - INTERVAL '1' DAY
  AND value / 1e18 > 100
LIMIT 10;
\`\`\`

## CAST — Konversi Tipe Data

CAST mengubah nilai dari satu tipe data ke tipe data lain. Ini sangat penting di DuneSQL karena banyak kolom blockchain disimpan sebagai tipe khusus:

\`\`\`sql
-- Konversi tipe data dasar
SELECT
  CAST('123'       AS BIGINT)      AS string_ke_integer,   -- 123
  CAST(123         AS VARCHAR)     AS integer_ke_string,   -- '123'
  CAST('2024-01-15' AS DATE)       AS string_ke_date,      -- 2024-01-15
  CAST(1.75        AS INTEGER)     AS float_ke_int,        -- 1 (dibulatkan ke bawah)
  CAST(1.75        AS DECIMAL(10,2)) AS presisi_dua;       -- 1.75

-- Konversi alamat (varbinary ke string)
SELECT
  CAST(address AS VARCHAR)  AS address_string,
  name
FROM labels.addresses
LIMIT 10;

-- TRY_CAST: seperti CAST tapi mengembalikan NULL jika gagal (tidak error)
SELECT
  TRY_CAST('abc' AS BIGINT)  AS akan_null,   -- NULL (bukan error)
  TRY_CAST('123' AS BIGINT)  AS berhasil;    -- 123
\`\`\`

## COALESCE — Menangani Nilai NULL

COALESCE mengembalikan argumen pertama yang bukan NULL. Ini adalah fungsi yang sangat sering digunakan untuk menggantikan NULL dengan nilai default:

\`\`\`sql
-- Gantikan NULL dengan nilai default
SELECT
  t."from"                              AS sender_address,
  COALESCE(l.name, 'Wallet Anonim')     AS sender_label,
  COALESCE(l.category, 'Tidak Dikategorikan') AS kategori,
  t.value / 1e18                        AS eth
FROM ethereum.transactions t
LEFT JOIN labels.addresses l ON t."from" = l.address
WHERE t.block_time >= NOW() - INTERVAL '1' DAY
  AND t.value / 1e18 > 50
ORDER BY t.value DESC
LIMIT 30;

-- COALESCE dengan beberapa fallback
SELECT
  COALESCE(nama_utama, nama_alternatif, 'Tidak Diketahui') AS nama_final
FROM beberapa_sumber;
\`\`\`

## NULLIF — Ubah Nilai Tertentu Menjadi NULL

NULLIF mengembalikan NULL jika dua nilai sama. Berguna untuk menghindari pembagian dengan nol:

\`\`\`sql
-- Menghindari division by zero
SELECT
  project,
  SUM(amount_usd)                              AS total_volume,
  COUNT(*)                                     AS jumlah_swap,
  -- Tanpa NULLIF: error jika COUNT(*) = 0
  -- Dengan NULLIF: mengembalikan NULL jika jumlah_swap = 0
  SUM(amount_usd) / NULLIF(COUNT(*), 0)       AS avg_swap
FROM dex.trades
WHERE block_time >= NOW() - INTERVAL '7' DAY
GROUP BY project
ORDER BY total_volume DESC;
\`\`\`

## LIKE dan ILIKE — Pencarian Pola (Pengingat)

Telah dibahas di lesson WHERE, namun berikut contoh khusus untuk data on-chain:

\`\`\`sql
-- Cari label yang mengandung kata tertentu (case-insensitive dengan LOWER)
SELECT address, name, category
FROM labels.addresses
WHERE LOWER(name) LIKE '%exchange%'   -- case-insensitive
   OR LOWER(name) LIKE '%cex%'
   OR LOWER(name) LIKE '%trading%';

-- Cari alamat berdasarkan pola karakter awal
SELECT
  CAST(address AS VARCHAR)  AS addr,
  name
FROM labels.addresses
WHERE CAST(address AS VARCHAR) LIKE '0x28%';
\`\`\`

## Contoh Praktis di Dune

\`\`\`sql
-- Analisis lengkap dengan normalisasi string
WITH labeled_swaps AS (
  SELECT
    t.block_time,
    t.project,
    t.token_bought_symbol || '/' || t.token_sold_symbol  AS trading_pair,
    t.amount_usd,
    t.taker,
    COALESCE(l.name, 'Wallet Anonim')                    AS trader_label,
    COALESCE(l.category, 'individual')                   AS trader_category
  FROM dex.trades t
  LEFT JOIN labels.addresses l ON t.taker = l.address
  WHERE t.blockchain = 'ethereum'
    AND t.block_time >= NOW() - INTERVAL '7' DAY
    AND t.amount_usd > 10000
)
SELECT
  trading_pair,
  trader_category,
  COUNT(*)              AS jumlah_swap,
  SUM(amount_usd)       AS total_volume,
  AVG(amount_usd)       AS rata_rata_swap
FROM labeled_swaps
GROUP BY trading_pair, trader_category
ORDER BY total_volume DESC
LIMIT 20;
\`\`\`

## Ringkasan

| Fungsi | Kegunaan | Contoh |
|--------|----------|--------|
| \`LOWER(str)\` | Ubah ke huruf kecil | \`LOWER(address)\` |
| \`UPPER(str)\` | Ubah ke huruf besar | \`UPPER(symbol)\` |
| \`LENGTH(str)\` | Panjang string | \`LENGTH(CAST(hash AS VARCHAR))\` |
| \`SUBSTR(str, pos, len)\` | Ambil substring | \`SUBSTR(addr, 1, 10)\` |
| \`CONCAT(a, b)\` atau \`a \|\| b\` | Gabungkan string | \`token_a \|\| '/' \|\| token_b\` |
| \`REPLACE(str, from, to)\` | Ganti teks | \`REPLACE(addr, '0x', '')\` |
| \`TRIM(str)\` | Hapus spasi di ujung | \`TRIM(name)\` |
| \`CAST(val AS type)\` | Konversi tipe | \`CAST(address AS VARCHAR)\` |
| \`COALESCE(a, b, c)\` | Nilai pertama non-NULL | \`COALESCE(name, 'Anonim')\` |
| \`NULLIF(a, b)\` | NULL jika a = b | \`NULLIF(count, 0)\` |

## Tantangan Praktik

**Level 1 — Eksplorasi**

Jalankan query berikut dan amati hasilnya:

\`\`\`sql
SELECT
  name,
  category,
  LOWER(name)                          AS name_lower,
  LENGTH(name)                         AS panjang_nama,
  SUBSTR(name, 1, 10)                  AS nama_10_char,
  COALESCE(category, 'Tidak Ada')      AS kategori_label
FROM labels.addresses
WHERE name IS NOT NULL
ORDER BY LENGTH(name) DESC
LIMIT 20;
\`\`\`

Pertanyaan: Label apa yang paling panjang? Kategori apa yang paling sering muncul?

**Level 2 — Modifikasi**

Ubah query berikut agar menambahkan kolom \`trading_pair\` yang menggabungkan \`token_bought_symbol\` dan \`token_sold_symbol\` dengan format "TOKEN_A/TOKEN_B", dan kolom \`trader_label\` yang menggantikan NULL dengan 'Anonim':

\`\`\`sql
SELECT
  block_time,
  project,
  token_bought_symbol,
  token_sold_symbol,
  amount_usd,
  taker
FROM dex.trades
WHERE blockchain = 'ethereum'
  AND block_time >= NOW() - INTERVAL '1' DAY
  AND amount_usd > 50000
ORDER BY amount_usd DESC
LIMIT 20;
\`\`\`

Petunjuk: Gunakan operator \`||\` untuk CONCAT dan COALESCE untuk menangani NULL setelah LEFT JOIN ke labels.addresses.

**Level 3 — Mandiri (Bonus)**

Tanpa melihat contoh, tulis query untuk menganalisis label wallet di Dune. Temukan kategori apa yang paling banyak memiliki label, dan untuk setiap kategori tampilkan: nama kategori, jumlah wallet berlabel, dan contoh nama label terpanjang di kategori tersebut. Gunakan fungsi string LENGTH, LOWER, dan COALESCE.`;

const L_CASE_WHEN = `# CASE WHEN — Logika Kondisional dalam SQL

> **TLDR:** CASE WHEN adalah cara menulis logika "jika...maka..." di SQL, seperti IF-ELSE di bahasa pemrograman. Gunakan untuk mengkategorikan data, membuat kolom baru berbasis kondisi, atau melakukan agregasi kondisional.

---

Kita sudah menguasai cara mengambil, menyaring, mengelompokkan, dan memanipulasi data. Namun, analisis on-chain yang bermakna sering membutuhkan logika kondisional: "Jika nilai transaksi lebih dari 1000 ETH, kategorikan sebagai Mega Whale; jika antara 100-1000 ETH, kategorikan sebagai Whale; dan seterusnya." CASE WHEN adalah cara SQL untuk mengekspresikan logika ini.

## Apa itu CASE WHEN?

CASE WHEN adalah ekspresi SQL yang mengevaluasi kondisi satu per satu dan mengembalikan nilai berdasarkan kondisi pertama yang terpenuhi. Seperti pernyataan IF-ELSEIF-ELSE di bahasa pemrograman, namun ditulis langsung dalam query SQL.

Analogi sehari-hari: CASE WHEN seperti aturan tarif pengiriman — "Jika berat di bawah 1 kg, harga Rp 10.000; jika 1-5 kg, harga Rp 25.000; jika di atas 5 kg, harga Rp 50.000."

## Kapan CASE WHEN Digunakan?

1. **Kategorisasi** — Mengkelompokkan nilai numerik ke dalam kategori (Small, Medium, Large, Whale)
2. **Transformasi label** — Mengubah kode menjadi label yang mudah dibaca
3. **Agregasi kondisional** — Menghitung SUM/COUNT hanya untuk kondisi tertentu
4. **Pivot tabel** — Mengubah baris menjadi kolom berdasarkan nilai kategori
5. **Penanganan kasus khusus** — Menangani edge case dan nilai tidak normal

## Sintaks Dasar

\`\`\`sql
CASE
  WHEN kondisi_1 THEN nilai_1
  WHEN kondisi_2 THEN nilai_2
  WHEN kondisi_3 THEN nilai_3
  ELSE nilai_default   -- jika tidak ada kondisi yang terpenuhi
END
\`\`\`

CASE WHEN selalu diakhiri dengan kata kunci \`END\`. Klausa \`ELSE\` bersifat opsional — jika tidak ditulis dan tidak ada kondisi yang cocok, hasilnya adalah NULL.

## Kategorisasi Nilai Numerik

Contoh paling umum: mengkategorikan nilai transaksi atau volume trading:

\`\`\`sql
-- Kategorisasi transaksi berdasarkan nilai ETH
SELECT
  hash,
  value / 1e18                        AS eth_amount,
  CASE
    WHEN value / 1e18 >= 10000 THEN 'Mega Whale (lebih dari 10K ETH)'
    WHEN value / 1e18 >= 1000  THEN 'Whale (1K-10K ETH)'
    WHEN value / 1e18 >= 100   THEN 'Large (100-1K ETH)'
    WHEN value / 1e18 >= 10    THEN 'Medium (10-100 ETH)'
    WHEN value / 1e18 >= 1     THEN 'Small (1-10 ETH)'
    ELSE 'Micro (kurang dari 1 ETH)'
  END                                  AS kategori_ukuran,
  block_time
FROM ethereum.transactions
WHERE block_time >= NOW() - INTERVAL '1' DAY
  AND value > 0
ORDER BY value DESC
LIMIT 50;
\`\`\`

\`\`\`sql
-- Kategorisasi trader DEX berdasarkan volume
SELECT
  taker                               AS wallet,
  SUM(amount_usd)                     AS total_volume,
  CASE
    WHEN SUM(amount_usd) >= 10000000 THEN 'Institutional (lebih dari $10M)'
    WHEN SUM(amount_usd) >= 1000000  THEN 'Large Trader ($1M-$10M)'
    WHEN SUM(amount_usd) >= 100000   THEN 'Medium Trader ($100K-$1M)'
    WHEN SUM(amount_usd) >= 10000    THEN 'Retail ($10K-$100K)'
    ELSE 'Micro (kurang dari $10K)'
  END                                  AS trader_kategori
FROM dex.trades
WHERE blockchain = 'ethereum'
  AND block_time >= NOW() - INTERVAL '30' DAY
GROUP BY taker
ORDER BY total_volume DESC
LIMIT 50;
\`\`\`

## CASE WHEN untuk Label dan Transformasi Teks

\`\`\`sql
-- Ubah kode hari dalam seminggu (0-6) menjadi nama hari
SELECT
  hash,
  block_time,
  CASE EXTRACT(dow FROM block_time)
    WHEN 0 THEN 'Minggu'
    WHEN 1 THEN 'Senin'
    WHEN 2 THEN 'Selasa'
    WHEN 3 THEN 'Rabu'
    WHEN 4 THEN 'Kamis'
    WHEN 5 THEN 'Jumat'
    WHEN 6 THEN 'Sabtu'
  END                                AS nama_hari,
  value / 1e18                       AS eth
FROM ethereum.transactions
WHERE block_time >= NOW() - INTERVAL '7' DAY
  AND value / 1e18 > 10
LIMIT 20;
\`\`\`

## Conditional Aggregation — Agregasi Berbasis Kondisi

Ini adalah teknik yang sangat powerful: menggunakan CASE WHEN di dalam fungsi agregat untuk menghitung nilai berbeda berdasarkan kondisi:

\`\`\`sql
-- Hitung volume per chain dalam satu baris (pivot)
SELECT
  DATE_TRUNC('day', block_time)                                              AS tanggal,
  SUM(CASE WHEN blockchain = 'ethereum' THEN amount_usd ELSE 0 END)         AS eth_volume,
  SUM(CASE WHEN blockchain = 'arbitrum' THEN amount_usd ELSE 0 END)         AS arb_volume,
  SUM(CASE WHEN blockchain = 'optimism' THEN amount_usd ELSE 0 END)         AS op_volume,
  SUM(CASE WHEN blockchain = 'polygon'  THEN amount_usd ELSE 0 END)         AS poly_volume,
  SUM(CASE WHEN blockchain = 'base'     THEN amount_usd ELSE 0 END)         AS base_volume
FROM dex.trades
WHERE block_time >= NOW() - INTERVAL '30' DAY
GROUP BY DATE_TRUNC('day', block_time)
ORDER BY tanggal;

-- Hitung jumlah swap berdasarkan ukuran
SELECT
  DATE_TRUNC('week', block_time)                                             AS minggu,
  COUNT(CASE WHEN amount_usd >= 1000000 THEN 1 END)                         AS swap_above_1m,
  COUNT(CASE WHEN amount_usd BETWEEN 100000 AND 999999 THEN 1 END)          AS swap_100k_1m,
  COUNT(CASE WHEN amount_usd BETWEEN 10000 AND 99999 THEN 1 END)            AS swap_10k_100k,
  COUNT(CASE WHEN amount_usd < 10000 THEN 1 END)                            AS swap_below_10k
FROM dex.trades
WHERE blockchain = 'ethereum'
  AND block_time >= NOW() - INTERVAL '30' DAY
  AND amount_usd > 0
GROUP BY DATE_TRUNC('week', block_time)
ORDER BY minggu;
\`\`\`

## UNION ALL — Menggabungkan Hasil Query

UNION ALL menggabungkan hasil dari beberapa query menjadi satu. Semua query harus memiliki jumlah dan tipe kolom yang sama:

\`\`\`sql
-- Bandingkan aktivitas dari berbagai chain
SELECT
  'ethereum'          AS chain,
  COUNT(*)            AS swap_count,
  SUM(amount_usd)     AS volume_usd,
  COUNT(DISTINCT taker) AS unique_traders
FROM dex.trades
WHERE blockchain = 'ethereum'
  AND block_time >= NOW() - INTERVAL '7' DAY

UNION ALL

SELECT
  'arbitrum'          AS chain,
  COUNT(*)            AS swap_count,
  SUM(amount_usd)     AS volume_usd,
  COUNT(DISTINCT taker) AS unique_traders
FROM dex.trades
WHERE blockchain = 'arbitrum'
  AND block_time >= NOW() - INTERVAL '7' DAY

UNION ALL

SELECT
  'polygon'           AS chain,
  COUNT(*)            AS swap_count,
  SUM(amount_usd)     AS volume_usd,
  COUNT(DISTINCT taker) AS unique_traders
FROM dex.trades
WHERE blockchain = 'polygon'
  AND block_time >= NOW() - INTERVAL '7' DAY

ORDER BY volume_usd DESC;
\`\`\`

Perbedaan UNION vs UNION ALL:
- **UNION**: menghapus duplikat baris (lebih lambat karena perlu proses deduplikasi)
- **UNION ALL**: mempertahankan semua baris termasuk duplikat (lebih cepat, lebih sering digunakan)

## INTERSECT dan EXCEPT

\`\`\`sql
-- INTERSECT: wallet yang aktif di Ethereum DAN Arbitrum (dua-duanya)
SELECT DISTINCT taker FROM dex.trades
WHERE blockchain = 'ethereum'
  AND block_time >= NOW() - INTERVAL '30' DAY

INTERSECT

SELECT DISTINCT taker FROM dex.trades
WHERE blockchain = 'arbitrum'
  AND block_time >= NOW() - INTERVAL '30' DAY;

-- EXCEPT: wallet di Ethereum tapi TIDAK di Arbitrum
SELECT DISTINCT taker FROM dex.trades
WHERE blockchain = 'ethereum'
  AND block_time >= NOW() - INTERVAL '30' DAY

EXCEPT

SELECT DISTINCT taker FROM dex.trades
WHERE blockchain = 'arbitrum'
  AND block_time >= NOW() - INTERVAL '30' DAY;
\`\`\`

## Contoh Praktis di Dune

\`\`\`sql
-- Analisis distribusi ukuran swap per protokol
SELECT
  project                                                          AS protokol,
  COUNT(*)                                                         AS total_swap,
  COUNT(CASE WHEN amount_usd >= 100000 THEN 1 END)                AS swap_besar,
  COUNT(CASE WHEN amount_usd >= 10000 AND amount_usd < 100000 THEN 1 END) AS swap_medium,
  COUNT(CASE WHEN amount_usd < 10000 THEN 1 END)                  AS swap_kecil,
  ROUND(
    COUNT(CASE WHEN amount_usd >= 100000 THEN 1 END) * 100.0 / COUNT(*),
    2
  )                                                                AS pct_swap_besar
FROM dex.trades
WHERE blockchain = 'ethereum'
  AND block_time >= NOW() - INTERVAL '7' DAY
  AND amount_usd > 0
GROUP BY project
HAVING COUNT(*) >= 100             -- hanya protokol dengan setidaknya 100 swap
ORDER BY total_swap DESC
LIMIT 10;
\`\`\`

## Ringkasan

| Konsep | Sintaks | Kegunaan |
|--------|---------|----------|
| CASE WHEN dasar | \`CASE WHEN cond THEN val ELSE def END\` | Logika kondisional |
| CASE WHEN disingkat | \`CASE kolom WHEN val THEN result END\` | Pencocokan nilai tetap |
| Conditional SUM | \`SUM(CASE WHEN cond THEN col ELSE 0 END)\` | Jumlahkan hanya yang memenuhi kondisi |
| Conditional COUNT | \`COUNT(CASE WHEN cond THEN 1 END)\` | Hitung hanya yang memenuhi kondisi |
| UNION ALL | \`query1 UNION ALL query2\` | Gabungkan hasil beberapa query |
| INTERSECT | \`query1 INTERSECT query2\` | Hanya baris yang ada di keduanya |
| EXCEPT | \`query1 EXCEPT query2\` | Baris di query1 tapi tidak di query2 |

## Tantangan Praktik

**Level 1 — Eksplorasi**

Jalankan query berikut dan perhatikan hasilnya:

\`\`\`sql
SELECT
  project,
  amount_usd,
  CASE
    WHEN amount_usd >= 1000000  THEN 'Mega Swap (lebih dari 1M)'
    WHEN amount_usd >= 100000   THEN 'Large Swap (100K-1M)'
    WHEN amount_usd >= 10000    THEN 'Medium Swap (10K-100K)'
    ELSE 'Small Swap (kurang dari 10K)'
  END                           AS swap_kategori,
  block_time
FROM dex.trades
WHERE blockchain = 'ethereum'
  AND block_time >= NOW() - INTERVAL '1' DAY
  AND amount_usd > 0
ORDER BY amount_usd DESC
LIMIT 30;
\`\`\`

Pertanyaan: Berapa persen transaksi yang masuk kategori "Large Swap" atau "Mega Swap"? Tambahkan query terpisah untuk menghitungnya.

**Level 2 — Modifikasi**

Tambahkan conditional aggregation pada query berikut untuk menghitung secara terpisah berapa volume dari swap kecil (kurang dari $10K) dan swap besar (lebih dari $100K) per hari:

\`\`\`sql
SELECT
  DATE_TRUNC('day', block_time)  AS tanggal,
  COUNT(*)                       AS total_swap,
  SUM(amount_usd)                AS total_volume
FROM dex.trades
WHERE blockchain = 'ethereum'
  AND block_time >= NOW() - INTERVAL '7' DAY
GROUP BY DATE_TRUNC('day', block_time)
ORDER BY tanggal;
\`\`\`

Petunjuk: Tambahkan \`SUM(CASE WHEN amount_usd < 10000 THEN amount_usd ELSE 0 END)\` dan kolom serupa untuk swap besar.

**Level 3 — Mandiri (Bonus)**

Tanpa melihat contoh, tulis query yang menggunakan UNION ALL untuk membandingkan statistik NFT trading di dua periode: 30 hari pertama dari 60 hari terakhir vs 30 hari terakhir. Tampilkan periode, total volume, jumlah penjualan, dan rata-rata harga per periode.`;

const L_DUNESQL = `# DuneSQL — Fitur Khusus Trino untuk Data Blockchain

> **TLDR:** DuneSQL menggunakan engine Trino (sebelumnya PrestoSQL), yang memiliki beberapa perbedaan sintaks dari SQL standar. Pelajari tipe data khusus blockchain, cara menangani alamat (varbinary), fungsi hex, dan fitur unik lainnya.

---

Sampai di sini, kita telah menguasai SQL standar yang berlaku di hampir semua platform. Sekarang saatnya memahami kekhususan DuneSQL — dialek SQL berbasis Trino yang digunakan Dune Analytics. Pemahaman tentang perbedaan ini akan membuat Anda lebih produktif dan menghindari error yang membingungkan.

## Apa itu DuneSQL / Trino?

Dune Analytics menggunakan **Trino** (sebelumnya bernama PrestoSQL) sebagai query engine-nya. Trino adalah distributed SQL engine yang mampu memproses data skala petabyte secara efisien — cocok untuk data blockchain yang terus tumbuh.

DuneSQL mengikuti standar SQL ANSI sebagian besar, namun memiliki beberapa perbedaan penting yang perlu Anda ketahui.

## Kapan Perlu Memahami Fitur DuneSQL Khusus?

1. **Menangani alamat Ethereum** — Tipe data varbinary, bukan string biasa
2. **Konversi hex** — Mengubah nilai hexadecimal ke desimal
3. **Filter interval waktu** — Sintaks INTERVAL berbeda dari PostgreSQL
4. **Approximate functions** — Fungsi cepat untuk data besar
5. **Array dan JSON** — Menangani data terstruktur yang tersimpan dalam kolom

## Perbedaan Sintaks dari PostgreSQL/MySQL

\`\`\`sql
-- INTERVAL: format Trino berbeda dari PostgreSQL
-- PostgreSQL: WHERE block_time >= NOW() - INTERVAL '7 days'
-- DuneSQL:    WHERE block_time >= NOW() - INTERVAL '7' DAY

-- Benar di DuneSQL:
WHERE block_time >= NOW() - INTERVAL '7' DAY
WHERE block_time >= NOW() - INTERVAL '1' MONTH
WHERE block_time >= NOW() - INTERVAL '1' YEAR

-- Salah (akan error di DuneSQL):
-- WHERE block_time >= NOW() - INTERVAL '7 days'  -- tidak ada tanda kutip di unit

-- STRING_AGG vs GROUP_CONCAT
-- DuneSQL menggunakan ARRAY_AGG, bukan GROUP_CONCAT
SELECT project, ARRAY_AGG(DISTINCT taker) AS all_traders
FROM dex.trades
WHERE block_time >= NOW() - INTERVAL '1' DAY
GROUP BY project
LIMIT 5;
\`\`\`

## Tipe Data Varbinary — Alamat dan Hash

Di DuneSQL, alamat Ethereum dan transaction hash disimpan sebagai **varbinary** (array byte), bukan string biasa. Ini memiliki implikasi penting:

\`\`\`sql
-- Perbandingan alamat: gunakan literal 0x tanpa tanda kutip
-- (Dune akan otomatis menginterpretasikan sebagai varbinary)
WHERE "from" = 0x28C6c06298d514Db089934071355E5743bf21d60

-- Atau konversi eksplisit:
WHERE "from" = from_hex('28C6c06298d514Db089934071355E5743bf21d60')

-- Konversi varbinary ke string untuk ditampilkan
SELECT
  CAST(address AS VARCHAR)           AS address_string,
  '0x' || LOWER(to_hex(address))     AS hex_string,
  name
FROM labels.addresses
LIMIT 10;

-- Perbandingan case-insensitive untuk alamat
WHERE LOWER(CAST("from" AS VARCHAR)) = LOWER('0x28C6c06298d514Db089934071355E5743bf21d60')
\`\`\`

## Fungsi Konversi Hex

\`\`\`sql
-- from_hex(): konversi hex string ke bytes
SELECT from_hex('deadbeef')          AS bytes_val;

-- to_hex(): konversi bytes ke hex string
SELECT to_hex(from_hex('deadbeef'))  AS hex_str;

-- bytearray_to_bigint(): bytes ke integer (untuk nilai numerik dalam hex)
-- Berguna untuk decode raw event log data

-- Contoh: decode nilai dari ethereum.logs
SELECT
  block_time,
  contract_address,
  topic0,
  data
FROM ethereum.logs
WHERE block_time >= NOW() - INTERVAL '1' DAY
LIMIT 5;
\`\`\`

## Approximate Functions — Untuk Data Besar

Dune memiliki tabel dengan ratusan juta hingga miliaran baris. Approximate functions memberikan hasil yang sangat mendekati akurat (error ~2%) namun jauh lebih cepat:

\`\`\`sql
-- COUNT(DISTINCT) vs approx_distinct: jauh lebih cepat untuk data besar
-- Exact (lambat untuk data besar):
SELECT COUNT(DISTINCT "from") AS exact_unique_senders
FROM ethereum.transactions
WHERE block_time >= NOW() - INTERVAL '30' DAY;

-- Approximate (jauh lebih cepat, ~98% akurat):
SELECT approx_distinct("from") AS approx_unique_senders
FROM ethereum.transactions
WHERE block_time >= NOW() - INTERVAL '30' DAY;

-- approx_percentile untuk median dan persentil
SELECT
  approx_percentile(value / 1e18, 0.5)  AS median_eth,      -- median (P50)
  approx_percentile(value / 1e18, 0.75) AS p75_eth,         -- persentil ke-75
  approx_percentile(value / 1e18, 0.90) AS p90_eth,         -- persentil ke-90
  approx_percentile(value / 1e18, 0.95) AS p95_eth,         -- persentil ke-95
  approx_percentile(value / 1e18, 0.99) AS p99_eth          -- persentil ke-99
FROM ethereum.transactions
WHERE block_time >= NOW() - INTERVAL '30' DAY
  AND value > 0;
\`\`\`

## TRY() — Menangani Error Secara Elegan

TRY() membungkus ekspresi yang mungkin error dan mengembalikan NULL alih-alih menyebabkan query gagal total:

\`\`\`sql
-- Tanpa TRY: jika ada satu baris yang error, seluruh query gagal
SELECT CAST(data AS BIGINT) FROM some_table;

-- Dengan TRY: baris yang error menjadi NULL, query tetap berjalan
SELECT TRY(CAST(data AS BIGINT)) AS safe_cast
FROM some_table;

-- TRY sangat berguna saat decode data yang mungkin tidak valid:
SELECT
  block_time,
  TRY(bytearray_to_bigint(data)) AS decoded_value
FROM ethereum.logs
WHERE contract_address = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
  AND block_time >= NOW() - INTERVAL '1' DAY
LIMIT 20;
\`\`\`

## Parameters — Query Interaktif

DuneSQL mendukung parameter query yang bisa diubah oleh pengguna tanpa mengedit kode:

\`\`\`sql
-- Gunakan {{nama_parameter}} untuk mendefinisikan parameter
SELECT
  DATE_TRUNC('day', block_time)    AS tanggal,
  blockchain,
  project,
  COUNT(*)                         AS jumlah_swap,
  SUM(amount_usd)                  AS volume
FROM dex.trades
WHERE block_time >= NOW() - INTERVAL '{{days}}' DAY   -- parameter: jumlah hari
  AND blockchain = '{{chain}}'                         -- parameter: nama chain
  AND amount_usd >= {{min_amount_usd}}                 -- parameter: nilai minimum
GROUP BY 1, 2, 3
ORDER BY 1, 5 DESC;
\`\`\`

Di Dune UI, parameter ini akan muncul sebagai input field yang bisa diisi oleh siapa saja yang melihat query.

## Tabel-Tabel Utama di Dune

\`\`\`sql
-- RAW TABLES — data mentah dari blockchain
ethereum.blocks             -- informasi setiap block
ethereum.transactions       -- semua transaksi (terbesar, paling sering dipakai)
ethereum.logs               -- semua event log smart contract
ethereum.traces             -- internal transactions (call tree)

-- DECODED TABLES — sudah didecode berdasarkan ABI kontrak
-- Format: {protocol}_{network}.{ContractName}_evt_{EventName}
uniswap_v3_ethereum.Pair_evt_Swap       -- swap events Uniswap V3
aave_v3_ethereum.Pool_evt_Supply        -- supply events Aave V3
aave_v3_ethereum.Pool_evt_Borrow        -- borrow events Aave V3

-- SPELLBOOK — abstraksi lintas protokol dan chain
dex.trades                  -- semua DEX swap (multi-chain, multi-protocol)
nft.trades                  -- semua NFT jual beli
tokens.transfers            -- semua ERC20 token transfer
tokens.erc20                -- metadata token (nama, simbol, desimal)
labels.addresses            -- label/nama wallet terkenal
prices.usd                  -- harga token historis dalam USD
\`\`\`

## Contoh Praktis di Dune

\`\`\`sql
-- Query lengkap memanfaatkan fitur DuneSQL
SELECT
  DATE_TRUNC('day', block_time)             AS tanggal,
  approx_distinct("from")                   AS est_unique_senders,  -- cepat
  COUNT(*)                                  AS total_tx,
  SUM(value) / 1e18                         AS total_eth,
  approx_percentile(value / 1e18, 0.5)      AS median_eth,
  approx_percentile(value / 1e18, 0.95)     AS p95_eth
FROM ethereum.transactions
WHERE block_time >= NOW() - INTERVAL '{{days}}' DAY
  AND value > 0
GROUP BY DATE_TRUNC('day', block_time)
ORDER BY tanggal;
\`\`\`

## Ringkasan Perbedaan DuneSQL vs PostgreSQL

| Fitur | PostgreSQL | DuneSQL (Trino) |
|-------|-----------|-----------------|
| Interval | \`INTERVAL '7 days'\` | \`INTERVAL '7' DAY\` |
| String agg | \`STRING_AGG(col, ',')\` | \`ARRAY_AGG(col)\` |
| Alamat Ethereum | String \`VARCHAR\` | Varbinary (literal \`0x...\`) |
| Approximate count | Tidak ada | \`approx_distinct(col)\` |
| Percentile | \`PERCENTILE_CONT(0.5)\` | \`approx_percentile(col, 0.5)\` |
| Safe cast | \`CAST(... AS ...)\` | \`TRY_CAST(... AS ...)\` |
| Parameter | Tidak ada | \`{{nama_parameter}}\` |

## Tantangan Praktik

**Level 1 — Eksplorasi**

Jalankan query berikut dan bandingkan hasilnya (perhatikan apakah nilainya mendekati sama):

\`\`\`sql
SELECT
  COUNT(DISTINCT taker)    AS exact_unique_traders,
  approx_distinct(taker)   AS approx_unique_traders,
  ABS(COUNT(DISTINCT taker) - approx_distinct(taker)) AS selisih,
  ROUND(
    ABS(COUNT(DISTINCT taker) - approx_distinct(taker)) * 100.0
    / COUNT(DISTINCT taker),
    3
  )                        AS pct_error
FROM dex.trades
WHERE blockchain = 'ethereum'
  AND block_time >= NOW() - INTERVAL '7' DAY;
\`\`\`

Pertanyaan: Berapa persen error dari approx_distinct? Apakah untuk kebutuhan analisis biasa, tingkat error ini bisa diterima?

**Level 2 — Modifikasi**

Ubah query berikut agar menggunakan parameter \`{{blockchain}}\` dan \`{{min_volume}}\` sehingga bisa dikonfigurasi tanpa mengubah kode:

\`\`\`sql
SELECT
  project,
  COUNT(*)        AS jumlah_swap,
  SUM(amount_usd) AS total_volume
FROM dex.trades
WHERE blockchain = 'ethereum'
  AND amount_usd >= 10000
  AND block_time >= NOW() - INTERVAL '7' DAY
GROUP BY project
ORDER BY total_volume DESC;
\`\`\`

**Level 3 — Mandiri (Bonus)**

Tanpa melihat contoh, tulis query yang menggunakan \`approx_percentile\` untuk menganalisis distribusi ukuran transaksi Ethereum (nilai ETH) dalam 30 hari terakhir. Tampilkan P10, P25, P50 (median), P75, P90, P95, dan P99. Jelaskan apa arti setiap persentil tersebut dalam konteks analisis transaksi.`;

const L_OPTIMIZE = `# Optimasi Query di Dune — Menulis Query yang Cepat dan Efisien

> **TLDR:** Query yang berjalan adalah awal. Query yang cepat adalah tujuan. Pelajari prinsip-prinsip optimasi untuk tabel miliaran baris: partition pruning, column pruning, filter awal sebelum JOIN, dan penggunaan approximate functions.

---

Kita sudah menguasai SQL standar dan fitur-fitur DuneSQL. Sekarang pertanyaannya bukan lagi "apakah query ini bisa berjalan?" — tetapi "bagaimana membuat query ini berjalan lebih cepat?" Tabel blockchain bisa memiliki miliaran baris. Query yang ditulis tanpa memperhatikan performa bisa memakan waktu menit bahkan timeout sama sekali. Lesson ini membahas teknik-teknik praktis untuk mengoptimasi query di Dune.

## Mengapa Optimasi Query Penting?

1. **Batas waktu (timeout)** — Dune memiliki batas waktu eksekusi. Query yang terlalu lambat akan gagal
2. **Kuota komputasi** — Setiap akun memiliki kredit komputasi terbatas per bulan
3. **User experience** — Dashboard dengan query lambat terasa tidak responsif
4. **Biaya** — Pada paket berbayar, komputasi berlebihan meningkatkan biaya

Tabel seperti \`ethereum.transactions\` berisi data dari genesis block (2015) hingga sekarang — **lebih dari satu miliar baris**. Tanpa optimasi, bahkan query sederhana bisa memindahkan terabyte data.

## Aturan #1 — Selalu Filter Berdasarkan Kolom Partisi

Dune menyimpan data dalam **partisi** berdasarkan waktu. Kolom partisi utama adalah \`block_time\` (atau \`block_date\` di beberapa tabel). Dengan menambahkan filter pada kolom ini, Dune hanya membaca partisi yang relevan — bukan seluruh tabel.

\`\`\`sql
-- SANGAT BURUK: scan miliaran baris dari genesis block!
SELECT COUNT(*) FROM ethereum.transactions
WHERE "from" = 0x28C6c06298d514Db089934071355E5743bf21d60;

-- BURUK: scan seluruh tabel tanpa filter waktu
SELECT "from", SUM(value) / 1e18 AS total_eth
FROM ethereum.transactions
GROUP BY "from"
ORDER BY total_eth DESC
LIMIT 10;

-- BAGUS: hanya scan partisi 30 hari terakhir
SELECT COUNT(*) FROM ethereum.transactions
WHERE "from" = 0x28C6c06298d514Db089934071355E5743bf21d60
  AND block_time >= NOW() - INTERVAL '90' DAY;

-- SANGAT BAGUS: filter ketat pada rentang waktu yang diperlukan
SELECT "from", SUM(value) / 1e18 AS total_eth
FROM ethereum.transactions
WHERE block_time >= NOW() - INTERVAL '30' DAY    -- hanya 30 hari
  AND value > 0
GROUP BY "from"
ORDER BY total_eth DESC
LIMIT 10;
\`\`\`

**Prinsip: Semakin sempit rentang waktu yang Anda query, semakin cepat query Anda berjalan.**

## Aturan #2 — Hindari SELECT *

\`SELECT *\` membaca semua kolom dari tabel. Tabel blockchain seperti \`ethereum.transactions\` bisa memiliki 50+ kolom. Sebagian besar tidak Anda butuhkan. Membaca kolom yang tidak diperlukan membuang bandwidth dan waktu:

\`\`\`sql
-- BURUK: membaca semua 50+ kolom
SELECT *
FROM ethereum.transactions
WHERE block_time >= NOW() - INTERVAL '7' DAY
  AND value / 1e18 > 100
LIMIT 100;

-- BAGUS: hanya kolom yang dibutuhkan
SELECT
  hash,
  "from",
  "to",
  value / 1e18   AS eth,
  block_time
FROM ethereum.transactions
WHERE block_time >= NOW() - INTERVAL '7' DAY
  AND value / 1e18 > 100
LIMIT 100;
\`\`\`

Menggunakan kolom spesifik alih-alih \`*\` memanfaatkan **column pruning** — Dune hanya membaca kolom yang diperlukan dari storage.

## Aturan #3 — Filter Sebelum JOIN

JOIN adalah operasi mahal. Selalu filter data seterlebih mungkin sebelum melakukan JOIN. Gunakan CTE untuk memfilter dulu, baru join:

\`\`\`sql
-- BURUK: join dulu, filter kemudian
SELECT t.hash, t.value / 1e18 AS eth, l.name
FROM ethereum.transactions t
LEFT JOIN labels.addresses l ON t."from" = l.address
WHERE t.block_time >= NOW() - INTERVAL '7' DAY
  AND t.value / 1e18 > 100;

-- BAGUS: filter dengan CTE terlebih dahulu, baru join ke dataset kecil
WITH large_txs AS (
  SELECT hash, "from", value
  FROM ethereum.transactions
  WHERE block_time >= NOW() - INTERVAL '7' DAY
    AND value / 1e18 > 100          -- filter agresif sebelum JOIN
)
SELECT
  lt.hash,
  lt.value / 1e18  AS eth,
  l.name           AS sender_label
FROM large_txs lt
LEFT JOIN labels.addresses l ON lt."from" = l.address;
\`\`\`

Dengan pendekatan kedua, JOIN hanya dilakukan pada ribuan baris (hasil filter), bukan jutaan baris sebelum filter.

## Aturan #4 — Gunakan Approximate Functions

Untuk data skala besar, fungsi approximate memberikan hasil yang sangat mendekati akurat (error ~2%) namun jauh lebih cepat dari fungsi exact:

\`\`\`sql
-- COUNT(DISTINCT) exact: lambat untuk data besar
SELECT COUNT(DISTINCT "from") AS exact_unique_senders
FROM ethereum.transactions
WHERE block_time >= NOW() - INTERVAL '30' DAY;

-- approx_distinct(): jauh lebih cepat, ~98% akurat
SELECT approx_distinct("from") AS approx_unique_senders
FROM ethereum.transactions
WHERE block_time >= NOW() - INTERVAL '30' DAY;

-- approx_percentile vs PERCENTILE_CONT
-- Untuk median/percentile pada dataset besar:
SELECT
  approx_percentile(value / 1e18, 0.50) AS median_eth,
  approx_percentile(value / 1e18, 0.95) AS p95_eth,
  approx_percentile(value / 1e18, 0.99) AS p99_eth
FROM ethereum.transactions
WHERE block_time >= NOW() - INTERVAL '30' DAY
  AND value > 0;
\`\`\`

Untuk analisis bisnis sehari-hari, selisih 2% ini hampir tidak pernah membuat perbedaan pada keputusan yang diambil.

## Aturan #5 — Batasi Data Sedini Mungkin

Terapkan filter paling selektif sedini mungkin dalam query Anda, idealnya langsung di CTE pertama:

\`\`\`sql
-- Struktur CTE yang efisien: filter ketat di awal
WITH
filtered_data AS (
  -- Langkah 1: hanya ambil data yang benar-benar diperlukan
  SELECT block_time, project, amount_usd, taker
  FROM dex.trades
  WHERE block_time >= NOW() - INTERVAL '7' DAY      -- filter waktu
    AND blockchain = 'ethereum'                      -- filter chain
    AND amount_usd >= 1000                           -- filter nilai minimum
    AND amount_usd IS NOT NULL                       -- filter NULL
),

aggregated AS (
  -- Langkah 2: agregasi pada dataset yang sudah kecil
  SELECT
    project,
    COUNT(*)           AS jumlah_swap,
    SUM(amount_usd)    AS total_volume
  FROM filtered_data
  GROUP BY project
)

SELECT * FROM aggregated ORDER BY total_volume DESC;
\`\`\`

## Aturan #6 — Gunakan Tabel Spellbook daripada Raw Tables

Tabel Spellbook (dex.trades, nft.trades, tokens.transfers) sudah dioptimasi, diindeks, dan di-aggregate. Menggunakan tabel ini jauh lebih efisien daripada decode sendiri dari raw tables:

\`\`\`sql
-- BURUK: decode manual dari ethereum.logs (sangat mahal)
SELECT
  block_time,
  contract_address,
  data
FROM ethereum.logs
WHERE block_time >= NOW() - INTERVAL '7' DAY
  AND topic0 = 0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822  -- Uniswap V2 Swap
LIMIT 100;

-- BAGUS: gunakan tabel Spellbook yang sudah terproses
SELECT
  block_time,
  project,
  amount_usd,
  taker
FROM dex.trades
WHERE block_time >= NOW() - INTERVAL '7' DAY
  AND blockchain = 'ethereum'
  AND project = 'uniswap'
LIMIT 100;
\`\`\`

## Checklist Query Optimal di Dune

Sebelum menjalankan query besar, periksa hal-hal berikut:

\`\`\`
Optimasi Fundamental:
[ ] Ada filter block_time dengan rentang waktu yang sesuai?
[ ] Tidak menggunakan SELECT * pada tabel besar?
[ ] Hanya membaca kolom yang benar-benar diperlukan?
[ ] Filter diterapkan sebelum JOIN?
[ ] Menggunakan LIMIT saat eksplorasi?

Optimasi Lanjutan:
[ ] Menggunakan approx_distinct untuk COUNT DISTINCT pada data besar?
[ ] Menggunakan Spellbook daripada raw tables jika tersedia?
[ ] CTE memfilter data sedini mungkin?
[ ] Subquery di FROM memiliki WHERE yang tepat?
[ ] Tidak melakukan kalkulasi berulang pada subquery di SELECT?
\`\`\`

## Contoh: Sebelum dan Sesudah Optimasi

\`\`\`sql
-- SEBELUM OPTIMASI: lambat, boros resource
SELECT
  *,
  (SELECT COUNT(*) FROM dex.trades WHERE taker = t.taker) AS total_swaps_ever
FROM dex.trades t
WHERE blockchain = 'ethereum'
ORDER BY amount_usd DESC
LIMIT 100;

-- SESUDAH OPTIMASI: cepat, efisien
WITH recent_large_swaps AS (
  -- Filter agresif: hanya 7 hari, hanya Ethereum, hanya kolom yang diperlukan
  SELECT
    block_time,
    project,
    amount_usd,
    taker,
    token_bought_symbol,
    token_sold_symbol
  FROM dex.trades
  WHERE blockchain = 'ethereum'
    AND block_time >= NOW() - INTERVAL '7' DAY
    AND amount_usd > 100000
),
trader_stats AS (
  -- Hitung statistik hanya untuk trader yang relevan
  SELECT
    taker,
    COUNT(*) AS total_swaps_7d,
    SUM(amount_usd) AS total_volume_7d
  FROM recent_large_swaps
  GROUP BY taker
)
SELECT
  s.block_time,
  s.project,
  s.token_bought_symbol || '/' || s.token_sold_symbol AS pair,
  s.amount_usd,
  ts.total_swaps_7d,
  ts.total_volume_7d
FROM recent_large_swaps s
JOIN trader_stats ts ON s.taker = ts.taker
ORDER BY s.amount_usd DESC
LIMIT 100;
\`\`\`

## Ringkasan

| Teknik Optimasi | Dampak | Cara Implementasi |
|----------------|--------|-------------------|
| Filter block_time | Sangat besar | Selalu tambahkan \`WHERE block_time >= ...\` |
| Hindari SELECT * | Besar | Sebutkan kolom spesifik |
| Filter sebelum JOIN | Besar | Gunakan CTE untuk filter dahulu |
| approx_distinct() | Sedang | Ganti COUNT(DISTINCT col) |
| Gunakan Spellbook | Sedang | Pilih dex.trades vs ethereum.logs |
| LIMIT saat eksplorasi | Kecil-Sedang | Tambahkan LIMIT 100 saat testing |

## Tantangan Praktik

**Level 1 — Eksplorasi**

Jalankan kedua query berikut dan bandingkan waktu eksekusinya:

Query A (tidak optimal):
\`\`\`sql
SELECT COUNT(DISTINCT "from") AS unique_senders
FROM ethereum.transactions
WHERE block_time >= NOW() - INTERVAL '30' DAY;
\`\`\`

Query B (optimal):
\`\`\`sql
SELECT approx_distinct("from") AS approx_unique_senders
FROM ethereum.transactions
WHERE block_time >= NOW() - INTERVAL '30' DAY;
\`\`\`

Pertanyaan: Berapa perbedaan waktu eksekusinya? Berapa persen error dari hasilnya?

**Level 2 — Modifikasi**

Optimalkan query berikut yang lambat:

\`\`\`sql
SELECT
  *
FROM ethereum.transactions t
LEFT JOIN labels.addresses l ON t."from" = l.address
WHERE t.value / 1e18 > 100
ORDER BY t.value DESC
LIMIT 50;
\`\`\`

Petunjuk: Tambahkan filter block_time, ganti SELECT *, dan gunakan CTE untuk filter sebelum JOIN.

**Level 3 — Mandiri (Bonus)**

Tulis ulang query analisis berikut menggunakan praktik terbaik optimasi: temukan 10 wallet dengan volume terbesar di Uniswap Ethereum dalam 90 hari terakhir. Query Anda harus menggunakan CTE, filter waktu, approximate functions (jika relevan), dan hanya memilih kolom yang diperlukan.`;

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

> **TLDR:** Dune Analytics adalah platform analisis data blockchain berbasis SQL terbesar di dunia. Dengan SQL yang sudah Anda pelajari, Anda bisa langsung menganalisis data dari 20+ blockchain secara real-time dan membuat dashboard publik.

---

Setelah menguasai SQL dari dasar hingga optimasi, kini saatnya menerapkannya pada platform yang paling banyak digunakan oleh analis on-chain profesional: Dune Analytics. Platform ini adalah tempat di mana komunitas analis blockchain dunia berbagi temuan, membangun dashboard, dan membuat data on-chain bisa dipahami oleh semua orang.

## Apa itu Dune Analytics?

Dune Analytics adalah **platform analisis data blockchain** yang memungkinkan siapa saja — dari pemula hingga profesional — menganalisis data on-chain menggunakan SQL. Dibuat pada 2018 oleh Fredrik Haga dan Mats Julian Olsen di Oslo, kini Dune menjadi rujukan utama komunitas DeFi, NFT, dan Web3.

Analogi yang tepat: Jika blockchain adalah database terbuka yang tersebar di ribuan node, maka Dune Analytics adalah **Google Sheets yang terhubung langsung ke blockchain** — Anda tidak perlu menjalankan node sendiri, tidak perlu decode data mentah, cukup tulis SQL dan dapatkan hasilnya.

## Mengapa Dune Populer?

1. **Gratis untuk akses dasar** — Siapa saja bisa mulai tanpa biaya
2. **Multi-chain** — Data dari 20+ blockchain dalam satu platform
3. **Real-time** — Data diperbarui hampir setiap menit
4. **Komunitas terbuka** — Ratusan ribu query dan dashboard publik bisa di-fork
5. **Spellbook** — Abstraksi tabel yang dikontribusi komunitas, sehingga analisis lebih mudah

## Cara Kerja Dune di Balik Layar

\`\`\`
Blockchain Nodes (Ethereum, Arbitrum, Polygon, dll.)
           |
           v
Dune Ingestion Layer
(membaca data dari node, decode transaksi)
           |
           v
Data Lake (menyimpan raw data dalam format columnar)
           |
           v
Decoding Layer
(decode ABI smart contract → decoded tables)
           |
           v
Spellbook (abstraksi lintas protokol → dex.trades, nft.trades, dll.)
           |
           v
Trino Query Engine (DuneSQL)
           |
           v
Visualisasi & Dashboard (Anda!)
\`\`\`

Proses ini terjadi otomatis dan terus-menerus. Anda hanya perlu menulis SQL — sisanya sudah ditangani oleh infrastruktur Dune.

## Navigasi Platform Dune

Saat pertama kali membuka Dune Analytics (dune.com):

**Menu Utama:**
- **New Query** (tombol +) — Buka SQL editor untuk mulai menulis query
- **My Creations** — Semua query, visualisasi, dan dashboard yang Anda buat
- **Discover** — Temukan query dan dashboard populer dari komunitas
- **Docs** — Dokumentasi tabel, syntax, dan API

**SQL Editor:**
- Area penulisan query di bagian atas
- Tombol "Run" untuk mengeksekusi query
- Tab "Results" untuk melihat tabel hasil
- Tab "New visualization" untuk membuat chart dari hasil query
- Panel kiri: daftar tabel yang tersedia (bisa dicari)

**Tips navigasi:**
1. Gunakan fitur search di panel kiri untuk menemukan tabel yang Anda butuhkan
2. Hover di nama kolom untuk melihat tipe datanya
3. Fork query populer dari komunitas sebagai titik awal

## Query Pertama di Dune

Mari kita mulai dengan query sederhana. Buka editor di Dune dan jalankan:

\`\`\`sql
-- Lihat 10 transaksi ETH terbesar yang terjadi hari ini
SELECT
  hash                    AS tx_hash,
  "from"                  AS pengirim,
  "to"                    AS penerima,
  value / 1e18            AS eth_amount,
  block_time              AS waktu
FROM ethereum.transactions
WHERE block_time >= NOW() - INTERVAL '1' DAY
  AND value > 0
ORDER BY value DESC
LIMIT 10;
\`\`\`

Jika berhasil, Anda akan melihat 10 transaksi terbesar dalam 24 jam terakhir. Coba juga:

\`\`\`sql
-- Volume DEX per protokol hari ini
SELECT
  project                        AS protokol,
  COUNT(*)                       AS jumlah_swap,
  SUM(amount_usd)                AS total_volume_usd
FROM dex.trades
WHERE block_time >= NOW() - INTERVAL '1' DAY
  AND blockchain = 'ethereum'
GROUP BY project
ORDER BY total_volume_usd DESC
LIMIT 10;
\`\`\`

## Fitur Fork — Belajar dari Komunitas

Salah satu fitur terbaik Dune adalah kemampuan "fork" query orang lain:

1. Temukan query menarik di Discover atau cari di Google "dune analytics [topik]"
2. Buka query tersebut
3. Klik tombol "Fork" di pojok kanan atas
4. Query disalin ke akun Anda dan bisa dimodifikasi

Ini adalah cara tercepat untuk belajar dan membangun analisis di atas fondasi yang sudah proven.

## Dune Wizard — Analis Top Komunitas

Dune memiliki program "Wizard" untuk analis terbaik di platform. Dashboard dari Wizard seperti:
- @hildobby (analisis komprehensif)
- @sixdegree (NFT dan DeFi analytics)
- @rchen8 (protokol-spesifik deep dive)

Mengikuti dan mem-fork karya mereka adalah cara belajar yang sangat efektif.

## Ringkasan

| Fitur | Deskripsi |
|-------|-----------|
| SQL Engine | DuneSQL berbasis Trino |
| Jumlah Chain | 20+ blockchain |
| Update Data | Hampir real-time (beberapa menit delay) |
| Komunitas | Ratusan ribu query dan dashboard publik |
| Model Harga | Gratis (basic) + berbayar untuk fitur premium |

## Tantangan Praktik

**Level 1 — Eksplorasi**

Buka Dune Analytics dan jalankan query berikut. Kemudian amati hasilnya selama beberapa menit dan jalankan ulang — apakah ada perubahan?

\`\`\`sql
SELECT
  DATE_TRUNC('hour', block_time)  AS jam,
  COUNT(*)                        AS jumlah_swap,
  SUM(amount_usd)                 AS volume_usd
FROM dex.trades
WHERE block_time >= NOW() - INTERVAL '6' HOUR
  AND blockchain = 'ethereum'
GROUP BY 1
ORDER BY 1;
\`\`\`

Pertanyaan: Jam berapa volume paling tinggi? Apakah data sudah terupdate hingga beberapa menit yang lalu?

**Level 2 — Modifikasi**

Fork query apapun yang menarik dari halaman Discover Dune. Ubah setidaknya dua parameter (misalnya blockchain, rentang waktu, atau token yang dianalisis) dan jalankan kembali. Amati bagaimana perubahan parameter mempengaruhi hasil.

**Level 3 — Mandiri (Bonus)**

Buat query baru dari awal untuk menjawab pertanyaan: "Apa 5 token ERC20 yang paling banyak ditransfer dalam 24 jam terakhir di Ethereum, berdasarkan jumlah transfer dan total volume USD?" Gunakan tabel \`tokens.transfers\`.`;

const L_DUNE_TABLES = `# Memahami Struktur Data Dune: Raw, Decoded, dan Spellbook

> **TLDR:** Data di Dune tersedia dalam tiga hierarki: Raw Tables (data mentah), Decoded Tables (sudah didecode berdasarkan ABI), dan Spellbook (abstraksi lintas protokol). Untuk sebagian besar analisis, gunakan Spellbook — data paling mudah digunakan dan sudah dinormalisasi.

---

Di lesson sebelumnya, kita sudah mengenal Dune Analytics dan mencoba query pertama. Sekarang saatnya memahami lebih dalam: dari mana data berasal, bagaimana strukturnya, dan tabel mana yang sebaiknya digunakan untuk berbagai jenis analisis. Pemahaman ini akan membuat Anda lebih efisien dan menghindari kesalahan umum.

## Tiga Hierarki Data di Dune

\`\`\`
Level 3 (Termudah):  Spellbook
                     dex.trades, nft.trades, tokens.transfers, dll.
                     - Multi-chain, multi-protocol, sudah dinormalisasi
                     - Gunakan ini untuk sebagian besar analisis

Level 2 (Menengah):  Decoded Tables
                     uniswap_v3_ethereum.Pair_evt_Swap
                     aave_v3_ethereum.Pool_evt_Supply
                     - Per kontrak, sudah didecode
                     - Gunakan untuk analisis protokol spesifik

Level 1 (Tersulit):  Raw Tables
                     ethereum.transactions, ethereum.logs, ethereum.traces
                     - Data mentah, perlu decode manual
                     - Gunakan hanya untuk research sangat mendalam
\`\`\`

## Level 1: Raw Tables — Data Mentah Blockchain

Raw tables berisi data persis seperti yang ada di blockchain — belum didecode, belum ditransformasi. Data event log tersimpan sebagai hex bytes, parameter transaksi sebagai calldata mentah.

\`\`\`sql
-- ethereum.transactions: semua transaksi
SELECT
  hash,
  "from",
  "to",
  value / 1e18    AS eth,
  gas_used,
  gas_price / 1e9 AS gas_gwei,
  block_time
FROM ethereum.transactions
WHERE block_time >= NOW() - INTERVAL '1' DAY
  AND value > 0
LIMIT 10;

-- ethereum.logs: semua event dari semua smart contract (dalam format raw hex)
SELECT
  block_time,
  contract_address,
  topic0,         -- keccak256 dari event signature
  topic1,         -- parameter pertama (indexed)
  topic2,         -- parameter kedua (indexed)
  data            -- parameter non-indexed (encoded hex)
FROM ethereum.logs
WHERE block_time >= NOW() - INTERVAL '1' DAY
  AND contract_address = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2  -- WETH
LIMIT 10;
\`\`\`

Data \`topic0\` dan \`data\` dalam ethereum.logs sangat sulit dibaca karena masih berformat hex. Di sinilah Decoded Tables sangat membantu.

## Level 2: Decoded Tables — Sudah Didecode

Ketika ABI (Application Binary Interface) sebuah smart contract disubmit ke Dune, sistem otomatis mendecode semua event dan function calls dari kontrak tersebut ke tabel yang mudah dibaca.

Format nama tabel decoded: \`{protocol}_{network}.{ContractName}_evt_{EventName}\`

\`\`\`sql
-- Uniswap V3 Swap events yang sudah terdecode
-- Jauh lebih mudah dibaca dari ethereum.logs!
SELECT
  evt_block_time     AS waktu,
  sender,
  recipient,
  amount0,           -- jumlah token 0 (positif = masuk, negatif = keluar)
  amount1,           -- jumlah token 1
  sqrtPriceX96,      -- harga saat swap
  liquidity,
  tick
FROM uniswap_v3_ethereum.Pair_evt_Swap
WHERE evt_block_time >= NOW() - INTERVAL '1' DAY
LIMIT 20;

-- Aave V3 Supply events
SELECT
  evt_block_time     AS waktu,
  reserve            AS token_address,
  user               AS depositor,
  onBehalfOf,
  amount,
  referralCode
FROM aave_v3_ethereum.Pool_evt_Supply
WHERE evt_block_time >= NOW() - INTERVAL '7' DAY
LIMIT 20;
\`\`\`

## Level 3: Spellbook — Abstraksi Lintas Protokol

Spellbook adalah repositori open-source yang berisi "model" SQL — query yang mengkompilasi data dari berbagai protokol ke dalam satu tabel yang terstandardisasi. Ini adalah tabel yang paling sering digunakan untuk analisis umum.

\`\`\`sql
-- dex.trades: semua DEX swap dari semua protokol dan chain
SELECT
  block_time,
  blockchain,
  project,
  version,
  token_bought_symbol   AS beli,
  token_sold_symbol     AS jual,
  amount_usd,
  taker                 AS wallet
FROM dex.trades
WHERE block_time >= NOW() - INTERVAL '7' DAY
  AND blockchain = 'ethereum'
  AND amount_usd > 10000
ORDER BY amount_usd DESC
LIMIT 20;

-- nft.trades: semua NFT sales dari semua marketplace dan chain
SELECT
  block_time,
  blockchain,
  trade_category,
  marketplace,
  buyer,
  seller,
  amount_usd,
  nft_contract_address,
  token_id
FROM nft.trades
WHERE block_time >= NOW() - INTERVAL '7' DAY
  AND blockchain = 'ethereum'
ORDER BY amount_usd DESC
LIMIT 20;

-- tokens.transfers: semua ERC20 token transfers
SELECT
  block_time,
  blockchain,
  symbol,
  "from",
  "to",
  amount,
  amount_usd
FROM tokens.transfers
WHERE block_time >= NOW() - INTERVAL '1' DAY
  AND blockchain = 'ethereum'
  AND symbol = 'USDC'
ORDER BY amount DESC
LIMIT 20;

-- prices.usd: harga historis token dalam USD (per menit)
SELECT
  minute                 AS waktu,
  symbol,
  price                  AS harga_usd
FROM prices.usd
WHERE minute >= NOW() - INTERVAL '24' HOUR
  AND blockchain = 'ethereum'
  AND symbol = 'ETH'
ORDER BY minute DESC
LIMIT 24;
\`\`\`

## Panduan Memilih Tabel

| Kebutuhan Analisis | Tabel yang Direkomendasikan |
|-------------------|----------------------------|
| Semua DEX swap multi-chain | \`dex.trades\` |
| Semua NFT sales multi-chain | \`nft.trades\` |
| Transfer token ERC20 | \`tokens.transfers\` |
| Metadata token (nama, desimal) | \`tokens.erc20\` |
| Label wallet terkenal | \`labels.addresses\` |
| Harga token historis | \`prices.usd\` |
| Analisis Uniswap V3 mendalam | \`uniswap_v3_ethereum.Pair_evt_Swap\` |
| Analisis Aave V3 mendalam | \`aave_v3_ethereum.Pool_evt_Supply\` |
| Data transaksi native ETH | \`ethereum.transactions\` |
| Raw event logs | \`ethereum.logs\` |

## Mencari Tabel di Dune

Di Dune UI, gunakan panel pencarian di sebelah kiri editor untuk menemukan tabel:
1. Ketik nama protokol (misalnya "uniswap" atau "aave")
2. Ketik jenis data yang dicari (misalnya "swap" atau "transfer")
3. Atau browse berdasarkan blockchain (ethereum, arbitrum, dll.)

\`\`\`sql
-- Cara cepat eksplorasi tabel baru: lihat 3 baris pertama
SELECT *
FROM dex.trades
LIMIT 3;

-- Atau gunakan DESCRIBE jika didukung:
-- DESCRIBE dex.trades;
\`\`\`

## Contoh Praktis — Menggabungkan Beberapa Level

\`\`\`sql
-- Analisis: volume trading WETH menggunakan Spellbook + metadata token
WITH weth_trades AS (
  SELECT
    block_time,
    project,
    amount_usd,
    taker,
    token_bought_symbol,
    token_sold_symbol
  FROM dex.trades
  WHERE blockchain = 'ethereum'
    AND block_time >= NOW() - INTERVAL '7' DAY
    AND (token_bought_symbol = 'WETH' OR token_sold_symbol = 'WETH')
    AND amount_usd > 0
)
SELECT
  project,
  COUNT(*)         AS jumlah_swap,
  SUM(amount_usd)  AS volume_weth_usd
FROM weth_trades
GROUP BY project
ORDER BY volume_weth_usd DESC
LIMIT 10;
\`\`\`

## Ringkasan

| Level | Tabel | Keunggulan | Kapan Digunakan |
|-------|-------|------------|-----------------|
| 3 - Spellbook | \`dex.trades\`, \`nft.trades\` | Mudah, multi-chain, normalized | Analisis umum (80% kasus) |
| 2 - Decoded | \`uniswap_v3_ethereum.Pair_evt_Swap\` | Detail penuh protokol | Analisis protokol spesifik |
| 1 - Raw | \`ethereum.logs\`, \`ethereum.transactions\` | Data paling mentah | Research mendalam, kontrak belum di-decode |

## Tantangan Praktik

**Level 1 — Eksplorasi**

Jalankan ketiga query berikut dan bandingkan kompleksitas datanya:

\`\`\`sql
-- Query 1: Raw logs (sulit dibaca)
SELECT block_time, contract_address, topic0, data
FROM ethereum.logs
WHERE block_time >= NOW() - INTERVAL '1' HOUR
LIMIT 3;

-- Query 2: Decoded table (lebih mudah)
SELECT evt_block_time, sender, recipient, amount0, amount1
FROM uniswap_v3_ethereum.Pair_evt_Swap
WHERE evt_block_time >= NOW() - INTERVAL '1' HOUR
LIMIT 3;

-- Query 3: Spellbook (paling mudah)
SELECT block_time, project, amount_usd, taker, token_bought_symbol
FROM dex.trades
WHERE block_time >= NOW() - INTERVAL '1' HOUR
LIMIT 3;
\`\`\`

Pertanyaan: Kolom mana yang paling mudah dipahami? Data apa yang ada di decoded tapi tidak ada di Spellbook (atau sebaliknya)?

**Level 2 — Modifikasi**

Ubah query berikut agar menganalisis chain selain Ethereum. Coba ganti \`'ethereum'\` dengan \`'arbitrum'\`, \`'polygon'\`, atau \`'base'\`:

\`\`\`sql
SELECT
  project,
  COUNT(*)         AS jumlah_swap,
  SUM(amount_usd)  AS total_volume
FROM dex.trades
WHERE blockchain = 'ethereum'
  AND block_time >= NOW() - INTERVAL '7' DAY
GROUP BY project
ORDER BY total_volume DESC
LIMIT 10;
\`\`\`

Apakah protokol yang dominan berbeda antar chain?

**Level 3 — Mandiri (Bonus)**

Tanpa melihat contoh, tulis query yang menggabungkan tiga tabel Spellbook: \`dex.trades\`, \`labels.addresses\`, dan \`prices.usd\`. Cari 10 swap WETH/USDC terbesar dalam 7 hari terakhir, tampilkan label wallet trader jika ada, dan harga ETH pada saat swap terjadi.`;

const L_DUNE_VIZ = `# Membuat Visualisasi di Dune Analytics

> **TLDR:** Setelah query berhasil dijalankan, Dune memungkinkan Anda membuat berbagai tipe visualisasi — line chart, bar chart, pie chart, counter, scatter plot — langsung dari hasil query tanpa coding tambahan.

---

Data yang tersimpan dalam tabel adalah satu hal. Data yang ditampilkan dalam grafik yang mudah dipahami adalah hal yang jauh lebih powerful. Di lesson sebelumnya, kita memahami struktur data Dune. Sekarang kita belajar cara mengubah data tersebut menjadi visualisasi yang bisa langsung dibagikan ke komunitas.

## Mengapa Visualisasi Penting?

1. **Komunikasi** — Tabel dengan ribuan baris sulit dipahami; grafik menyederhanakan insight
2. **Pattern recognition** — Tren, anomali, dan pola musiman terlihat jelas dalam grafik
3. **Sharing** — Visualisasi lebih mudah dibagikan ke media sosial atau dalam laporan
4. **Dashboard** — Beberapa visualisasi digabung menjadi dashboard komprehensif

## Tipe Visualisasi di Dune

| Tipe | Kapan Digunakan | Contoh Use Case |
|------|----------------|-----------------|
| **Line Chart** | Tren data seiring waktu | Volume DEX harian, harga token |
| **Bar Chart** | Perbandingan antar kategori | Volume per protokol, users per chain |
| **Area Chart** | Komposisi yang berubah seiring waktu | Stacked area untuk market share |
| **Pie / Donut** | Proporsi dari total | Market share DEX, distribusi chain |
| **Counter** | Satu angka penting | Total TVL, jumlah transaksi hari ini |
| **Table** | Detail data | Top 100 wallets, daftar transaksi terbesar |
| **Scatter Plot** | Korelasi antara dua variabel | Volume vs jumlah transaksi per wallet |

## Cara Membuat Visualisasi

Langkah-langkah membuat visualisasi di Dune:

1. Jalankan query hingga berhasil (ada hasil di tab "Results")
2. Klik tab **"New visualization"** di bawah area query
3. Pilih tipe chart yang diinginkan
4. Konfigurasi sumbu X, Y, warna, dan label
5. Beri nama visualisasi yang deskriptif
6. Klik "Add to query" untuk menyimpan

## Setup Line Chart — Volume Harian

Query yang ideal untuk line chart harus memiliki kolom waktu (untuk X-axis) dan nilai numerik (untuk Y-axis):

\`\`\`sql
-- Query untuk Line Chart: Volume DEX Ethereum harian
SELECT
  DATE_TRUNC('day', block_time)  AS tanggal,
  SUM(amount_usd)                AS volume_usd
FROM dex.trades
WHERE block_time >= NOW() - INTERVAL '90' DAY
  AND blockchain = 'ethereum'
  AND amount_usd > 0
GROUP BY DATE_TRUNC('day', block_time)
ORDER BY tanggal ASC;
\`\`\`

Konfigurasi chart:
- **X-axis**: kolom \`tanggal\`
- **Y-axis**: kolom \`volume_usd\`
- **Title**: "Volume DEX Ethereum — 90 Hari Terakhir"
- **Y-axis label**: "Volume (USD)"

## Setup Stacked Bar Chart — Market Share Per Protokol

\`\`\`sql
-- Query untuk Stacked Bar: Volume per protokol per minggu
SELECT
  DATE_TRUNC('week', block_time)  AS minggu,
  project,
  SUM(amount_usd)                 AS volume
FROM dex.trades
WHERE block_time >= NOW() - INTERVAL '90' DAY
  AND blockchain = 'ethereum'
  AND amount_usd > 0
GROUP BY DATE_TRUNC('week', block_time), project
ORDER BY minggu ASC;
\`\`\`

Konfigurasi chart:
- **X-axis**: kolom \`minggu\`
- **Y-axis**: kolom \`volume\`
- **Color by (Series)**: kolom \`project\`
- **Type**: Stacked Bar

## Setup Pie Chart — Market Share Saat Ini

\`\`\`sql
-- Query untuk Pie Chart: Market share DEX 30 hari terakhir
SELECT
  project,
  SUM(amount_usd)  AS volume
FROM dex.trades
WHERE block_time >= NOW() - INTERVAL '30' DAY
  AND blockchain = 'ethereum'
  AND amount_usd > 0
GROUP BY project
ORDER BY volume DESC
LIMIT 10;
\`\`\`

Konfigurasi chart:
- **Label**: kolom \`project\`
- **Value**: kolom \`volume\`

## Setup Counter — Angka Ringkasan

Counter adalah tipe visualisasi untuk menampilkan satu angka penting — sangat berguna sebagai "KPI card" di atas dashboard:

\`\`\`sql
-- Total volume 24 jam terakhir (untuk Counter)
SELECT
  ROUND(SUM(amount_usd) / 1000000000, 2) AS volume_miliar_usd
FROM dex.trades
WHERE block_time >= NOW() - INTERVAL '1' DAY
  AND blockchain = 'ethereum';
\`\`\`

Konfigurasi: Pilih kolom \`volume_miliar_usd\` sebagai nilai counter, tambahkan prefix/suffix jika diperlukan.

## Parameter Interaktif — Visualisasi yang Bisa Dikonfigurasi

Parameter membuat query Anda bisa dikonfigurasi oleh viewer tanpa edit kode:

\`\`\`sql
-- Query dengan parameter: user bisa pilih chain dan rentang hari
SELECT
  DATE_TRUNC('day', block_time)  AS tanggal,
  blockchain,
  project,
  SUM(amount_usd)                AS volume
FROM dex.trades
WHERE block_time >= NOW() - INTERVAL '{{days}}' DAY
  AND blockchain = '{{chain}}'
  AND amount_usd > 0
GROUP BY 1, 2, 3
ORDER BY 1 ASC;
\`\`\`

Di Dune UI, tambahkan parameter:
- \`{{days}}\`: Type = Number, Default = 30
- \`{{chain}}\`: Type = Text, Default = "ethereum", Options = "ethereum,arbitrum,polygon"

## Format Angka dan Label

Beberapa tips untuk membuat visualisasi lebih rapi:

\`\`\`sql
-- Gunakan ROUND untuk membatasi desimal
SELECT
  DATE_TRUNC('day', block_time)  AS tanggal,
  ROUND(SUM(amount_usd))         AS volume_usd,        -- tanpa desimal
  ROUND(COUNT(*) / 1000.0, 1)    AS jumlah_swap_ribu   -- dalam ribuan
FROM dex.trades
WHERE block_time >= NOW() - INTERVAL '30' DAY
  AND blockchain = 'ethereum'
GROUP BY 1
ORDER BY 1;
\`\`\`

## Contoh Praktis: Paket Visualisasi Lengkap

Berikut tiga query yang bisa menjadi satu set visualisasi dashboard sederhana:

\`\`\`sql
-- Visualisasi 1: Counter — Total volume hari ini
SELECT ROUND(SUM(amount_usd) / 1000000, 2) AS volume_juta_usd
FROM dex.trades
WHERE block_time >= NOW() - INTERVAL '1' DAY
  AND blockchain = 'ethereum';

-- Visualisasi 2: Line Chart — Tren 30 hari
SELECT
  DATE_TRUNC('day', block_time)  AS tanggal,
  SUM(amount_usd)                AS volume
FROM dex.trades
WHERE block_time >= NOW() - INTERVAL '30' DAY
  AND blockchain = 'ethereum'
GROUP BY 1 ORDER BY 1;

-- Visualisasi 3: Pie Chart — Market share hari ini
SELECT
  project,
  SUM(amount_usd)  AS volume
FROM dex.trades
WHERE block_time >= NOW() - INTERVAL '1' DAY
  AND blockchain = 'ethereum'
GROUP BY project
ORDER BY volume DESC
LIMIT 8;
\`\`\`

## Ringkasan

| Tipe Chart | Query yang Dibutuhkan | Konfigurasi Utama |
|-----------|----------------------|-------------------|
| Line Chart | Kolom waktu + nilai numerik | X=waktu, Y=nilai |
| Bar Chart | Kolom kategori + nilai | X=kategori, Y=nilai |
| Stacked Bar | Waktu + kategori + nilai | X=waktu, Y=nilai, Series=kategori |
| Pie Chart | Kolom label + nilai | Label=nama, Value=angka |
| Counter | Query menghasilkan 1 baris, 1 kolom | Pilih kolom nilai |
| Scatter | Dua kolom numerik | X=variabel1, Y=variabel2 |

## Tantangan Praktik

**Level 1 — Eksplorasi**

Jalankan query berikut, lalu buat Line Chart dari hasilnya:

\`\`\`sql
SELECT
  DATE_TRUNC('day', block_time)  AS tanggal,
  COUNT(*)                       AS jumlah_swap,
  SUM(amount_usd)                AS volume_usd,
  COUNT(DISTINCT taker)          AS unique_traders
FROM dex.trades
WHERE blockchain = 'ethereum'
  AND block_time >= NOW() - INTERVAL '30' DAY
GROUP BY 1
ORDER BY 1;
\`\`\`

Buat tiga visualisasi dari satu query ini: satu Line Chart untuk volume, satu untuk jumlah swap, dan satu Counter untuk total volume keseluruhan.

**Level 2 — Modifikasi**

Ubah query di atas agar bisa dikonfigurasi menggunakan parameter \`{{blockchain}}\` dan \`{{days}}\`. Buat chart yang sama, lalu tes dengan mengubah parameter ke "arbitrum" dan "60" hari.

**Level 3 — Mandiri (Bonus)**

Buat tiga query terpisah untuk komponen dashboard NFT marketplace: (1) Counter total volume 7 hari, (2) Line Chart volume harian 30 hari per marketplace, (3) Pie Chart market share berdasarkan volume. Pastikan semua menggunakan tabel \`nft.trades\`.`;

const L_DUNE_DASH = `# Menyusun Dashboard Profesional di Dune

> **TLDR:** Dashboard adalah kumpulan visualisasi yang disusun secara logis untuk menjawab satu pertanyaan analisis secara komprehensif. Dashboard yang baik memiliki hierarki informasi yang jelas: ringkasan di atas, detail di bawah.

---

Di lesson sebelumnya, kita belajar membuat visualisasi individual dari query. Sekarang saatnya menyusun visualisasi-visualisasi tersebut menjadi sebuah dashboard yang kohesif dan profesional. Dashboard yang baik adalah yang mampu menceritakan sebuah kisah data dari satu pandangan.

## Apa itu Dashboard di Dune?

Dashboard adalah koleksi visualisasi dan teks yang disusun dalam satu halaman. Dashboard bisa berisi berbagai tipe widget: chart, counter, tabel data, dan blok teks untuk penjelasan.

Di Dune, dashboard bisa:
- Bersifat publik (siapa saja bisa melihat) atau privat
- Diperbarui otomatis setiap kali ada data baru
- Dibagikan via URL unik
- Di-embed di website lain
- Di-fork oleh pengguna lain sebagai template

## Anatomi Dashboard yang Baik

Dashboard profesional biasanya memiliki struktur hierarki:

\`\`\`
[Judul & Deskripsi Dashboard]
[Parameter Filter Global (chain, periode waktu, protokol)]

[Row 1: KPI Counters]
Jumlah Metric A | Metric B | Metric C | Metric D

[Row 2: Tren Utama]
[Line Chart — Tren Waktu]    [Bar Chart — Distribusi]

[Row 3: Breakdown Detail]
[Stacked Area — Komposisi]   [Pie/Donut — Market Share]

[Row 4: Tabel Detail]
[Tabel dengan data granular — sortable, scrollable]
\`\`\`

## Cara Membuat Dashboard dari Nol

1. Klik **"Create"** di menu utama Dune
2. Pilih **"Dashboard"**
3. Beri nama yang deskriptif, misalnya "Ethereum DEX Overview"
4. Tambahkan deskripsi singkat tentang isi dashboard
5. Klik **"Add visualization"** untuk menambahkan chart dari query yang sudah ada
6. Atau klik **"Add text widget"** untuk menambahkan judul bagian atau penjelasan
7. Drag dan resize setiap widget sesuai tata letak yang diinginkan
8. Tambahkan **parameter global** untuk interaktivitas
9. Klik **"Publish"** untuk membuat dashboard bisa diakses publik

## Studi Kasus: DEX Analytics Dashboard

Berikut adalah contoh lengkap tiga query yang membentuk dashboard DEX Analytics:

\`\`\`sql
-- Metric 1: Counter — Total volume 24 jam terakhir
SELECT
  ROUND(SUM(amount_usd) / 1000000, 2)  AS volume_juta_usd,
  COUNT(*)                              AS jumlah_swap,
  COUNT(DISTINCT taker)                 AS unique_traders
FROM dex.trades
WHERE block_time >= NOW() - INTERVAL '1' DAY
  AND blockchain = 'ethereum';

-- Metric 2: Line Chart — Volume harian 30 hari terakhir
SELECT
  DATE_TRUNC('day', block_time)  AS tanggal,
  SUM(amount_usd)                AS volume_usd,
  COUNT(*)                       AS jumlah_swap
FROM dex.trades
WHERE block_time >= NOW() - INTERVAL '30' DAY
  AND blockchain = 'ethereum'
GROUP BY 1
ORDER BY 1 ASC;

-- Metric 3: Stacked Bar — Market share per protokol per minggu
SELECT
  DATE_TRUNC('week', block_time)  AS minggu,
  project,
  SUM(amount_usd)                 AS volume
FROM dex.trades
WHERE block_time >= NOW() - INTERVAL '90' DAY
  AND blockchain = 'ethereum'
  AND amount_usd > 0
GROUP BY 1, 2
ORDER BY 1 ASC;

-- Metric 4: Pie Chart — Market share 7 hari terakhir
SELECT
  project,
  SUM(amount_usd)  AS volume
FROM dex.trades
WHERE block_time >= NOW() - INTERVAL '7' DAY
  AND blockchain = 'ethereum'
GROUP BY project
ORDER BY volume DESC
LIMIT 8;

-- Metric 5: Tabel — Top 20 swap terbesar hari ini
SELECT
  block_time                    AS waktu,
  project,
  token_bought_symbol           AS beli,
  token_sold_symbol             AS jual,
  ROUND(amount_usd, 2)          AS nilai_usd,
  taker                         AS wallet
FROM dex.trades
WHERE block_time >= NOW() - INTERVAL '1' DAY
  AND blockchain = 'ethereum'
ORDER BY amount_usd DESC
LIMIT 20;
\`\`\`

## Tips Membuat Dashboard Berkualitas Tinggi

**1. Beri nama dan deskripsi yang jelas**
Judul dashboard harus langsung menjelaskan isinya: "Ethereum DEX Analytics — Volume, Market Share & Traders"

**2. Gunakan Text Widget untuk konteks**
Tambahkan teks penjelasan sebelum setiap bagian: "Volume harian menunjukkan tren aktivitas trading ETH mainnet..."

**3. Tata letak yang logis**
Informasi yang paling penting (total volume, jumlah users) di bagian atas. Detail dan breakdown di bawah.

**4. Konsistensi waktu**
Pastikan semua chart menggunakan rentang waktu yang sama jika dibandingkan satu sama lain. Gunakan parameter global untuk ini.

**5. Beri label pada sumbu**
Tambahkan label pada sumbu Y (misalnya "Volume (USD)" bukan hanya "volume_usd") agar lebih mudah dipahami.

**6. Warna konsisten**
Gunakan warna yang konsisten untuk entitas yang sama — misalnya Uniswap selalu pink, Curve selalu biru, di semua chart.

## Parameter Global Dashboard

Parameter global memungkinkan semua chart dalam dashboard berubah serentak ketika user mengubah filter:

\`\`\`sql
-- Semua query dalam dashboard menggunakan {{chain}} dan {{days}} yang sama
SELECT
  DATE_TRUNC('day', block_time)  AS tanggal,
  project,
  SUM(amount_usd)                AS volume
FROM dex.trades
WHERE block_time >= NOW() - INTERVAL '{{days}}' DAY
  AND blockchain = '{{chain}}'
GROUP BY 1, 2
ORDER BY 1;
\`\`\`

Di pengaturan dashboard, tambahkan parameter:
- \`{{chain}}\`: ethereum (default), arbitrum, polygon, optimism, base
- \`{{days}}\`: 7, 30, 90 (default: 30)

## Contoh Dashboard Populer untuk Dipelajari

Untuk inspirasi dan pembelajaran, fork dashboard berikut dari komunitas Dune:
- Cari "Ethereum DEX Overview" di Discover
- Cari "NFT Marketplace Analytics" untuk analisis NFT
- Cari "DeFi TVL Dashboard" untuk tracking TVL

## Ringkasan

| Elemen Dashboard | Tujuan |
|-----------------|--------|
| Judul dan deskripsi | Konteks dan tujuan dashboard |
| KPI Counters (baris atas) | Angka-angka paling penting secara sekilas |
| Line/Area Chart | Tren data dari waktu ke waktu |
| Bar/Pie Chart | Perbandingan dan proporsi |
| Tabel detail | Data granular untuk drill-down |
| Parameter global | Interaktivitas dan fleksibilitas |

## Tantangan Praktik

**Level 1 — Eksplorasi**

Buka salah satu dashboard populer di Discover Dune. Fork dashboard tersebut ke akun Anda, lalu:
- Identifikasi berapa query yang digunakan
- Perhatikan tata letak hierarki informasinya
- Coba ubah satu parameter dan amati bagaimana semua chart berubah

**Level 2 — Modifikasi**

Buat dashboard sederhana dengan 3-4 widget dari query-query yang sudah Anda buat di lesson sebelumnya. Pastikan dashboard memiliki:
- Satu Counter di atas
- Satu Line Chart tren
- Satu Pie atau Bar Chart breakdown
- Satu Text Widget penjelasan

**Level 3 — Mandiri (Bonus)**

Buat dashboard NFT Analytics dari awal dengan tema tertentu (misalnya: analisis OpenSea vs Blur vs LooksRare). Buat minimal 5 visualisasi berbeda yang menceritakan kisah lengkap tentang persaingan marketplace NFT. Publish dan share URL dashboard Anda.`;

const L_ERC20 = `# Analisis Token ERC20

> **TLDR:** Token ERC20 adalah standar token fungible di Ethereum. Gunakan tabel \`tokens.transfers\` untuk menganalisis transfer, volume, dan distribusi holder. Ingat: setiap token memiliki jumlah desimal yang berbeda (USDC = 6, ETH = 18).

---

Di Course sebelumnya, kita menguasai SQL dan platform Dune Analytics. Sekarang saatnya menerapkan semua itu untuk analisis on-chain yang nyata. Kita mulai dari fondasi ekosistem DeFi: token ERC20.

## Apa itu Token ERC20?

ERC20 (Ethereum Request for Comment 20) adalah **standar antarmuka token fungible** di Ethereum dan chain EVM lainnya. Hampir semua token DeFi yang Anda kenal — USDC, USDT, DAI, WETH, UNI, AAVE — adalah token ERC20.

"Fungible" berarti setiap unit token identik dan dapat dipertukarkan: 1 USDC selalu sama nilainya dengan 1 USDC lainnya (berbeda dengan NFT yang unik).

Setiap token ERC20 memiliki kontrak pintar yang mengimplementasikan beberapa fungsi standar, termasuk transfer (yang menghasilkan event Transfer yang bisa kita query di Dune).

## Desimal Token — Penting Sekali!

Tidak seperti ETH yang menggunakan 18 desimal, setiap token ERC20 bisa memiliki jumlah desimal yang berbeda:

| Token | Desimal | Konversi |
|-------|---------|---------|
| ETH/WETH | 18 | bagi dengan \`1e18\` |
| USDC | 6 | bagi dengan \`1e6\` |
| USDT | 6 | bagi dengan \`1e6\` |
| DAI | 18 | bagi dengan \`1e18\` |
| WBTC | 8 | bagi dengan \`1e8\` |
| UNI | 18 | bagi dengan \`1e18\` |

Tabel Spellbook \`tokens.transfers\` sudah menangani konversi ini secara otomatis dalam kolom \`amount\`. Tapi jika menggunakan data raw, Anda perlu membagi sendiri.

## Menganalisis Volume Transfer Token

\`\`\`sql
-- Volume transfer USDC per hari selama 30 hari terakhir
SELECT
  DATE_TRUNC('day', block_time)  AS tanggal,
  symbol,
  COUNT(*)                       AS jumlah_transfer,
  SUM(amount)                    AS total_usdc_transferred,
  SUM(amount_usd)                AS total_usd_value,
  COUNT(DISTINCT "from")         AS unique_senders,
  COUNT(DISTINCT "to")           AS unique_receivers
FROM tokens.transfers
WHERE block_time >= NOW() - INTERVAL '30' DAY
  AND blockchain = 'ethereum'
  AND symbol = 'USDC'
GROUP BY 1, 2
ORDER BY 1 ASC;
\`\`\`

## Menemukan Top Token Berdasarkan Volume

\`\`\`sql
-- Ranking token berdasarkan volume transfer 7 hari terakhir
SELECT
  symbol,
  COUNT(*)                       AS jumlah_transfer,
  SUM(amount_usd)                AS volume_usd,
  COUNT(DISTINCT "from")         AS unique_senders,
  AVG(amount_usd)                AS avg_transfer_usd
FROM tokens.transfers
WHERE block_time >= NOW() - INTERVAL '7' DAY
  AND blockchain = 'ethereum'
  AND amount_usd > 0
GROUP BY symbol
ORDER BY volume_usd DESC
LIMIT 20;
\`\`\`

## Analisis Distribusi Holder

Analisis distribusi holder menunjukkan seberapa terkonsentrasi atau tersebar kepemilikan sebuah token:

\`\`\`sql
-- Hitung net balance per wallet (received - sent) untuk USDC
WITH inflows AS (
  SELECT
    "to"            AS wallet,
    SUM(amount)     AS total_received
  FROM tokens.transfers
  WHERE blockchain = 'ethereum'
    AND symbol = 'USDC'
    AND block_time >= NOW() - INTERVAL '365' DAY
  GROUP BY "to"
),
outflows AS (
  SELECT
    "from"          AS wallet,
    SUM(amount)     AS total_sent
  FROM tokens.transfers
  WHERE blockchain = 'ethereum'
    AND symbol = 'USDC'
    AND block_time >= NOW() - INTERVAL '365' DAY
  GROUP BY "from"
),
net_balance AS (
  SELECT
    COALESCE(i.wallet, o.wallet)            AS wallet,
    COALESCE(i.total_received, 0)           AS total_received,
    COALESCE(o.total_sent, 0)               AS total_sent,
    COALESCE(i.total_received, 0) - COALESCE(o.total_sent, 0) AS net_balance
  FROM inflows i
  FULL OUTER JOIN outflows o ON i.wallet = o.wallet
)
SELECT
  CASE
    WHEN net_balance >= 10000000 THEN 'Mega Whale (lebih dari 10M USDC)'
    WHEN net_balance >= 1000000  THEN 'Whale (1M-10M USDC)'
    WHEN net_balance >= 100000   THEN 'Large (100K-1M USDC)'
    WHEN net_balance >= 10000    THEN 'Medium (10K-100K USDC)'
    WHEN net_balance > 0         THEN 'Small (kurang dari 10K USDC)'
    ELSE 'Net Sender (lebih banyak keluar)'
  END                            AS kategori_holder,
  COUNT(*)                       AS jumlah_wallet,
  SUM(net_balance)               AS total_net_usdc
FROM net_balance
WHERE net_balance > 0
GROUP BY 1
ORDER BY total_net_usdc DESC;
\`\`\`

## Smart Money Token Tracking

Melacak akumulasi token oleh wallet besar:

\`\`\`sql
-- Wallet mana yang paling banyak mengakumulasi WETH dalam 30 hari?
WITH accumulation AS (
  SELECT
    "to"                         AS wallet,
    SUM(amount)                  AS weth_accumulated
  FROM tokens.transfers
  WHERE blockchain = 'ethereum'
    AND symbol = 'WETH'
    AND block_time >= NOW() - INTERVAL '30' DAY
  GROUP BY "to"
)
SELECT
  a.wallet,
  a.weth_accumulated,
  COALESCE(l.name, 'Unlabeled') AS label,
  l.category
FROM accumulation a
LEFT JOIN labels.addresses l ON a.wallet = l.address
ORDER BY a.weth_accumulated DESC
LIMIT 20;
\`\`\`

## Analisis Velocity Token

Token velocity mengukur seberapa sering token berpindah tangan — indikator aktivitas ekonomi:

\`\`\`sql
-- Hitung berapa kali rata-rata USDC berpindah tangan per bulan
SELECT
  DATE_TRUNC('month', block_time)   AS bulan,
  COUNT(*)                          AS jumlah_transfer,
  SUM(amount_usd)                   AS total_volume_usd,
  -- Velocity = total volume / estimasi supply yang beredar
  ROUND(COUNT(*) / 1000.0, 1)       AS transfer_per_ribu
FROM tokens.transfers
WHERE blockchain = 'ethereum'
  AND symbol = 'USDC'
  AND block_time >= NOW() - INTERVAL '180' DAY
GROUP BY 1
ORDER BY 1;
\`\`\`

## Ringkasan

| Analisis | Tabel Utama | Metrik Kunci |
|----------|------------|--------------|
| Volume transfer | \`tokens.transfers\` | \`SUM(amount_usd)\`, \`COUNT(*)\` |
| Distribusi holder | \`tokens.transfers\` (aggregat) | Net balance per wallet |
| Top token | \`tokens.transfers\` | \`GROUP BY symbol ORDER BY volume\` |
| Smart money | \`tokens.transfers\` + \`labels\` | Wallet berlabel dengan akumulasi besar |
| Harga historis | \`prices.usd\` | \`price\` per \`minute\` |

## Tantangan Praktik

**Level 1 — Eksplorasi**

Jalankan query berikut dan amati pola hariannya:

\`\`\`sql
SELECT
  DATE_TRUNC('day', block_time)  AS tanggal,
  symbol,
  COUNT(*)                       AS transfers,
  SUM(amount_usd)                AS volume
FROM tokens.transfers
WHERE blockchain = 'ethereum'
  AND symbol IN ('USDC', 'USDT', 'DAI')
  AND block_time >= NOW() - INTERVAL '14' DAY
  AND amount_usd > 0
GROUP BY 1, 2
ORDER BY 1, 3 DESC;
\`\`\`

Pertanyaan: Stablecoin mana yang memiliki volume tertinggi? Apakah ada pola hari tertentu yang lebih aktif?

**Level 2 — Modifikasi**

Ubah query berikut untuk menganalisis token pilihan Anda (bukan USDC) dan tambahkan filter untuk mengecualikan transfer dari/ke exchange terpusat (gunakan LEFT JOIN ke labels.addresses dengan kategori 'cex'):

\`\`\`sql
SELECT
  "from"           AS sender,
  "to"             AS receiver,
  amount_usd,
  block_time
FROM tokens.transfers
WHERE blockchain = 'ethereum'
  AND symbol = 'USDC'
  AND block_time >= NOW() - INTERVAL '1' DAY
  AND amount_usd > 1000000
ORDER BY amount_usd DESC
LIMIT 20;
\`\`\`

**Level 3 — Mandiri (Bonus)**

Tanpa melihat contoh, buat analisis lengkap untuk satu token pilihan Anda (misalnya: UNI, LINK, atau AAVE). Analisis harus mencakup: (1) volume transfer harian 30 hari, (2) top 10 pengirim terbesar, (3) top 10 penerima terbesar, dan (4) perbandingan volume di hari kerja vs akhir pekan menggunakan CASE WHEN dan EXTRACT.`;

const L_NFT = `# Analisis NFT Marketplace

> **TLDR:** NFT (Non-Fungible Token) adalah aset digital yang unik dan tidak dapat dipertukarkan. Gunakan tabel \`nft.trades\` di Dune untuk menganalisis volume marketplace, floor price, distribusi buyer, dan deteksi wash trading.

---

Di lesson sebelumnya, kita menganalisis token ERC20 yang bersifat fungible — setiap unit identik. NFT memiliki karakteristik yang berbeda: setiap token bersifat **unik** dan **tidak dapat dipertukarkan**. Ini menciptakan pasar yang berbeda dengan dinamika analisis yang menarik.

## Apa itu NFT?

NFT (Non-Fungible Token) adalah aset digital dengan **identitas unik** yang disimpan di blockchain. Tidak seperti USDC di mana 1 USDC = 1 USDC, setiap NFT berbeda satu sama lain bahkan dalam koleksi yang sama.

Contoh: Dua CryptoPunk mungkin keduanya bernilai, tapi CryptoPunk #7523 dengan atribut langka bisa bernilai 100x lebih tinggi dari CryptoPunk #1000.

Karakteristik unik ini menciptakan pasar di mana **floor price**, **rarity**, dan **whale buyer** menjadi metrik yang sangat penting untuk dianalisis.

## Tabel Utama: nft.trades

\`\`\`sql
-- Eksplorasi struktur tabel nft.trades
SELECT *
FROM nft.trades
WHERE blockchain = 'ethereum'
  AND block_time >= NOW() - INTERVAL '1' DAY
LIMIT 5;
\`\`\`

Kolom-kolom penting di \`nft.trades\`:
- \`block_time\`: waktu transaksi
- \`buyer\`, \`seller\`: alamat pembeli dan penjual
- \`nft_contract_address\`: alamat kontrak koleksi
- \`token_id\`: ID unik NFT dalam koleksi
- \`amount_usd\`: nilai transaksi dalam USD
- \`amount_original\`: nilai dalam token asli (ETH, WETH, dll.)
- \`marketplace\`: platform (opensea, blur, x2y2, dll.)
- \`trade_category\`: jenis transaksi (buy, offer accepted, dll.)

## Analisis Volume per Marketplace

\`\`\`sql
-- Volume dan market share per marketplace per minggu
SELECT
  DATE_TRUNC('week', block_time)  AS minggu,
  marketplace,
  COUNT(*)                        AS jumlah_penjualan,
  SUM(amount_usd)                 AS volume_usd,
  AVG(amount_usd)                 AS avg_harga_usd,
  COUNT(DISTINCT buyer)           AS unique_buyers
FROM nft.trades
WHERE block_time >= NOW() - INTERVAL '90' DAY
  AND blockchain = 'ethereum'
  AND amount_usd > 0
GROUP BY 1, 2
ORDER BY 1, 4 DESC;
\`\`\`

## Tracking Floor Price Koleksi

Floor price adalah harga terendah NFT yang tersedia untuk dijual — indikator kesehatan koleksi:

\`\`\`sql
-- Track floor price koleksi per hari (gunakan MIN sebagai proxy floor price dari penjualan)
SELECT
  DATE_TRUNC('day', block_time)   AS tanggal,
  nft_contract_address            AS koleksi,
  COUNT(*)                        AS jumlah_penjualan,
  MIN(amount_usd)                 AS floor_price_proxy,    -- harga penjualan terendah
  AVG(amount_usd)                 AS avg_price_usd,
  MAX(amount_usd)                 AS highest_sale_usd,
  COUNT(DISTINCT buyer)           AS unique_buyers
FROM nft.trades
WHERE blockchain = 'ethereum'
  AND block_time >= NOW() - INTERVAL '90' DAY
  AND amount_usd > 0
  -- Ganti dengan contract address koleksi yang ingin Anda analisis
  -- AND nft_contract_address = 0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D
GROUP BY 1, 2
ORDER BY 1, 3 DESC
LIMIT 100;
\`\`\`

## Identifikasi Whale Buyer

\`\`\`sql
-- 20 pembeli NFT terbesar (berdasarkan total pengeluaran) dalam 30 hari
SELECT
  buyer,
  COUNT(*)                         AS total_pembelian,
  COUNT(DISTINCT nft_contract_address) AS jumlah_koleksi,
  SUM(amount_usd)                  AS total_pengeluaran_usd,
  AVG(amount_usd)                  AS avg_harga_per_nft,
  MAX(amount_usd)                  AS pembelian_terbesar
FROM nft.trades
WHERE block_time >= NOW() - INTERVAL '30' DAY
  AND blockchain = 'ethereum'
  AND amount_usd > 0
GROUP BY buyer
HAVING SUM(amount_usd) > 50000       -- hanya yang belanja lebih dari $50K
ORDER BY total_pengeluaran_usd DESC
LIMIT 20;
\`\`\`

## Deteksi Wash Trading

Wash trading adalah transaksi jual-beli fiktif antara wallet yang dikontrol oleh orang/entitas yang sama, untuk menciptakan volume palsu dan manipulasi ranking. Ini adalah masalah serius di pasar NFT:

\`\`\`sql
-- Deteksi wash trading: cari wallet yang membeli dari dirinya sendiri
WITH suspected_wash AS (
  SELECT
    buyer,
    seller,
    nft_contract_address,
    token_id,
    COUNT(*)                 AS transaction_count,
    SUM(amount_usd)          AS total_volume_usd
  FROM nft.trades
  WHERE blockchain = 'ethereum'
    AND block_time >= NOW() - INTERVAL '30' DAY
  GROUP BY buyer, seller, nft_contract_address, token_id
  HAVING COUNT(*) >= 2         -- NFT yang sama berpindah lebih dari sekali
)
SELECT
  buyer,
  seller,
  COUNT(DISTINCT nft_contract_address)  AS koleksi_berbeda,
  SUM(transaction_count)               AS total_transaksi,
  SUM(total_volume_usd)                AS total_volume_usd
FROM suspected_wash
WHERE buyer = seller                    -- buyer dan seller adalah wallet yang sama!
   OR buyer IN (SELECT seller FROM suspected_wash WHERE seller = buyer)
GROUP BY buyer, seller
ORDER BY total_volume_usd DESC
LIMIT 20;
\`\`\`

## Analisis Profitabilitas Trader

\`\`\`sql
-- Hitung profit/loss trader NFT: total penjualan - total pembelian
WITH buys AS (
  SELECT
    buyer            AS wallet,
    SUM(amount_usd)  AS total_beli
  FROM nft.trades
  WHERE blockchain = 'ethereum'
    AND block_time >= NOW() - INTERVAL '90' DAY
    AND amount_usd > 0
  GROUP BY buyer
),
sells AS (
  SELECT
    seller           AS wallet,
    SUM(amount_usd)  AS total_jual
  FROM nft.trades
  WHERE blockchain = 'ethereum'
    AND block_time >= NOW() - INTERVAL '90' DAY
    AND amount_usd > 0
  GROUP BY seller
)
SELECT
  COALESCE(b.wallet, s.wallet)            AS wallet,
  COALESCE(b.total_beli, 0)              AS total_beli,
  COALESCE(s.total_jual, 0)              AS total_jual,
  COALESCE(s.total_jual, 0) - COALESCE(b.total_beli, 0) AS profit_loss_usd,
  CASE
    WHEN COALESCE(s.total_jual, 0) > COALESCE(b.total_beli, 0) THEN 'Profit'
    WHEN COALESCE(s.total_jual, 0) < COALESCE(b.total_beli, 0) THEN 'Loss'
    ELSE 'Break Even'
  END                                     AS status
FROM buys b
FULL OUTER JOIN sells s ON b.wallet = s.wallet
WHERE COALESCE(b.total_beli, 0) > 10000   -- hanya trader signifikan
ORDER BY profit_loss_usd DESC
LIMIT 30;
\`\`\`

## Ringkasan

| Analisis | Metrik Kunci | Tabel |
|----------|-------------|-------|
| Volume marketplace | SUM(amount_usd), COUNT(*) | \`nft.trades\` |
| Floor price | MIN(amount_usd) per hari per koleksi | \`nft.trades\` |
| Whale buyers | Top buyer berdasarkan total pengeluaran | \`nft.trades\` |
| Wash trading | Buyer = Seller dalam NFT yang sama | \`nft.trades\` |
| Profitabilitas | Total jual - total beli per wallet | \`nft.trades\` |

## Tantangan Praktik

**Level 1 — Eksplorasi**

Jalankan query berikut dan amati pola volume antar marketplace:

\`\`\`sql
SELECT
  marketplace,
  COUNT(*)         AS jumlah_penjualan,
  SUM(amount_usd)  AS total_volume,
  AVG(amount_usd)  AS avg_harga,
  MIN(amount_usd)  AS harga_terendah,
  MAX(amount_usd)  AS harga_tertinggi
FROM nft.trades
WHERE blockchain = 'ethereum'
  AND block_time >= NOW() - INTERVAL '7' DAY
  AND amount_usd > 0
GROUP BY marketplace
ORDER BY total_volume DESC;
\`\`\`

Pertanyaan: Marketplace mana yang mendominasi volume? Apakah marketplace dengan volume terbesar juga memiliki harga rata-rata tertinggi?

**Level 2 — Modifikasi**

Ubah query floor price tracking di atas untuk menganalisis 5 koleksi NFT terbesar berdasarkan volume dalam 30 hari terakhir. Tampilkan nama koleksi (jika ada di labels), volume total, jumlah penjualan, dan floor price rata-rata.

**Level 3 — Mandiri (Bonus)**

Tanpa melihat contoh, tulis query untuk mengidentifikasi koleksi NFT yang mengalami kenaikan volume lebih dari 200% dalam 7 hari terakhir dibandingkan 7 hari sebelumnya. Gunakan CTE untuk memisahkan dua periode, lalu bandingkan.`;

const L_DEFI = `# Analisis Protokol DeFi

> **TLDR:** DeFi (Decentralized Finance) adalah ekosistem keuangan berbasis smart contract. Gunakan Dune untuk menganalisis DEX (Uniswap/Curve), lending (Aave/Compound), dan metrik utama seperti TVL, volume, dan APY.

---

Token ERC20 dan NFT sudah kita analisis di lesson sebelumnya. Sekarang kita masuk ke level berikutnya: protokol DeFi — ekosistem keuangan terdesentralisasi yang dibangun di atas smart contract. DeFi adalah salah satu use case blockchain yang paling inovatif dan membutuhkan analisis yang mendalam.

## Apa itu DeFi?

DeFi (Decentralized Finance) adalah protokol keuangan yang beroperasi sepenuhnya melalui smart contract — tanpa bank, tanpa perantara, tanpa izin. Siapa pun di seluruh dunia bisa mengakses layanan keuangan ini hanya dengan wallet crypto.

Kategori utama protokol DeFi:
1. **DEX (Decentralized Exchange)** — Tukar token tanpa perantara: Uniswap, Curve, Balancer
2. **Lending/Borrowing** — Pinjam dan pinjamkan aset: Aave, Compound, MakerDAO
3. **Yield Farming** — Dapatkan reward dengan menyediakan likuiditas
4. **Derivatives** — Perdagangan kontrak derivatif: dYdX, GMX, Synthetix
5. **Staking** — Kunci aset untuk mendapat reward: Lido, RocketPool

## Metrik Utama DeFi

**TVL (Total Value Locked)** adalah total nilai aset yang dikunci dalam sebuah protokol. Ini adalah metrik paling penting untuk mengukur ukuran dan kepercayaan terhadap protokol:

\`\`\`sql
-- Perbandingan protokol DEX berdasarkan volume 7 hari
SELECT
  project,
  COUNT(*)                       AS jumlah_swap,
  SUM(amount_usd)                AS volume_7d,
  AVG(amount_usd)                AS avg_swap_size,
  COUNT(DISTINCT taker)          AS unique_traders
FROM dex.trades
WHERE blockchain = 'ethereum'
  AND block_time >= NOW() - INTERVAL '7' DAY
  AND amount_usd > 0
GROUP BY project
ORDER BY volume_7d DESC
LIMIT 10;
\`\`\`

## Analisis Uniswap V3 — DEX Terbesar

\`\`\`sql
-- Top trading pairs di Uniswap V3
SELECT
  token_bought_symbol || '/' || token_sold_symbol   AS pair,
  COUNT(*)                                          AS jumlah_swap,
  SUM(amount_usd)                                   AS volume_usd,
  AVG(amount_usd)                                   AS avg_swap_usd,
  COUNT(DISTINCT taker)                             AS unique_traders
FROM dex.trades
WHERE block_time >= NOW() - INTERVAL '7' DAY
  AND project = 'uniswap'
  AND version = '3'
  AND blockchain = 'ethereum'
  AND amount_usd > 0
GROUP BY token_bought_symbol || '/' || token_sold_symbol
ORDER BY volume_usd DESC
LIMIT 20;

-- Distribusi ukuran swap di Uniswap
SELECT
  CASE
    WHEN amount_usd >= 1000000  THEN 'Mega (lebih dari $1M)'
    WHEN amount_usd >= 100000   THEN 'Large ($100K-$1M)'
    WHEN amount_usd >= 10000    THEN 'Medium ($10K-$100K)'
    WHEN amount_usd >= 1000     THEN 'Small ($1K-$10K)'
    ELSE 'Micro (kurang dari $1K)'
  END                          AS ukuran_kategori,
  COUNT(*)                     AS jumlah,
  SUM(amount_usd)              AS total_volume
FROM dex.trades
WHERE project = 'uniswap'
  AND blockchain = 'ethereum'
  AND block_time >= NOW() - INTERVAL '7' DAY
  AND amount_usd > 0
GROUP BY 1
ORDER BY total_volume DESC;
\`\`\`

## Analisis Aave V3 — Lending Protocol Terbesar

\`\`\`sql
-- Supply dan Borrow di Aave V3 per hari
SELECT
  DATE_TRUNC('day', evt_block_time)  AS tanggal,
  'Supply'                           AS action,
  COUNT(*)                           AS jumlah_transaksi,
  SUM(CAST(amount AS DOUBLE) / 1e6)  AS usdc_amount   -- USDC: 6 desimal
FROM aave_v3_ethereum.Pool_evt_Supply
WHERE reserve = 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48   -- USDC contract
  AND evt_block_time >= NOW() - INTERVAL '30' DAY
GROUP BY 1, 2

UNION ALL

SELECT
  DATE_TRUNC('day', evt_block_time)  AS tanggal,
  'Borrow'                           AS action,
  COUNT(*)                           AS jumlah_transaksi,
  SUM(CAST(amount AS DOUBLE) / 1e6)  AS usdc_amount
FROM aave_v3_ethereum.Pool_evt_Borrow
WHERE asset = 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
  AND evt_block_time >= NOW() - INTERVAL '30' DAY
GROUP BY 1, 2

ORDER BY tanggal, action;
\`\`\`

## Analisis Wallet DeFi Power User

Wallet yang menggunakan banyak protokol DeFi sering disebut "DeFi power user" atau "DeFi native":

\`\`\`sql
-- Temukan wallet yang menggunakan banyak protokol DeFi berbeda
SELECT
  taker                              AS wallet,
  COUNT(DISTINCT project)            AS jumlah_protokol_digunakan,
  COUNT(*)                           AS total_swap,
  SUM(amount_usd)                    AS total_volume,
  ARRAY_AGG(DISTINCT project)        AS protokol_list
FROM dex.trades
WHERE blockchain = 'ethereum'
  AND block_time >= NOW() - INTERVAL '30' DAY
  AND amount_usd > 0
GROUP BY taker
HAVING COUNT(DISTINCT project) >= 3  -- menggunakan minimal 3 protokol berbeda
ORDER BY jumlah_protokol_digunakan DESC, total_volume DESC
LIMIT 20;
\`\`\`

## Trend Dominasi DEX

\`\`\`sql
-- Bagaimana market share DEX berubah dari minggu ke minggu?
WITH weekly_market AS (
  SELECT
    DATE_TRUNC('week', block_time)   AS minggu,
    project,
    SUM(amount_usd)                  AS volume
  FROM dex.trades
  WHERE blockchain = 'ethereum'
    AND block_time >= NOW() - INTERVAL '90' DAY
    AND amount_usd > 0
  GROUP BY 1, 2
),
weekly_total AS (
  SELECT
    minggu,
    SUM(volume)                      AS total_volume
  FROM weekly_market
  GROUP BY minggu
)
SELECT
  wm.minggu,
  wm.project,
  wm.volume,
  wt.total_volume,
  ROUND(wm.volume * 100.0 / wt.total_volume, 2) AS market_share_pct
FROM weekly_market wm
JOIN weekly_total wt ON wm.minggu = wt.minggu
ORDER BY wm.minggu DESC, wm.volume DESC;
\`\`\`

## Ringkasan

| Protokol | Tabel Utama | Metrik |
|----------|------------|--------|
| Semua DEX | \`dex.trades\` | Volume, swap count, unique traders |
| Uniswap V3 spesifik | \`uniswap_v3_ethereum.Pair_evt_Swap\` | Liquidity, tick, sqrtPriceX96 |
| Aave V3 Supply | \`aave_v3_ethereum.Pool_evt_Supply\` | Amount, reserve, user |
| Aave V3 Borrow | \`aave_v3_ethereum.Pool_evt_Borrow\` | Amount, asset, borrower |

## Tantangan Praktik

**Level 1 — Eksplorasi**

Jalankan query berikut untuk memahami lanskap DEX saat ini:

\`\`\`sql
SELECT
  blockchain,
  project,
  COUNT(*)         AS swap_count,
  SUM(amount_usd)  AS volume,
  COUNT(DISTINCT taker) AS traders
FROM dex.trades
WHERE block_time >= NOW() - INTERVAL '7' DAY
  AND amount_usd > 0
GROUP BY blockchain, project
ORDER BY blockchain, volume DESC;
\`\`\`

Pertanyaan: Di chain mana Uniswap mendominasi? Di chain mana ada kompetisi yang lebih ketat?

**Level 2 — Modifikasi**

Ubah query top trading pairs di atas untuk menganalisis Curve Finance (bukan Uniswap). Curve terkenal dengan stablecoin swap. Apakah pair yang dominan di Curve berbeda dari Uniswap?

**Level 3 — Mandiri (Bonus)**

Tanpa melihat contoh, buat analisis untuk membandingkan efisiensi dua DEX: Uniswap V3 vs Curve. Bandingkan rata-rata ukuran swap, persentase swap di atas $100K, dan jumlah unique trader dalam 30 hari terakhir. Buat tabel perbandingan yang jelas.`;

const L_MEV = `# MEV — Memahami dan Mendeteksi Maximal Extractable Value

> **TLDR:** MEV adalah profit yang bisa diekstrak dari blockchain dengan mengontrol urutan transaksi dalam satu block. Bentuk utama MEV adalah arbitrage, sandwich attack, dan liquidation. Memahami MEV penting karena mempengaruhi biaya efektif setiap transaksi DeFi.

---

Di lesson DeFi sebelumnya, kita melihat ekosistem keuangan terdesentralisasi dari sudut pandang pengguna biasa. Namun ada sisi tersembunyi dari blockchain yang mempengaruhi setiap transaksi DeFi: MEV. Memahami MEV adalah kunci untuk memahami ekonomi Ethereum di level yang lebih dalam.

## Apa itu MEV?

**MEV (Maximal Extractable Value)** adalah nilai maksimum yang bisa diekstrak dari produksi block, di luar dari block reward dan gas fee standar, dengan cara mengontrol **urutan transaksi** dalam sebuah block.

Pihak yang bisa mengekstrak MEV:
- **Validator/Miner** — Memilih urutan transaksi dalam block
- **MEV Searcher** — Bot yang menemukan dan mengeksploitasi peluang MEV
- **Block Builder** — Menyusun block yang optimal untuk MEV

Analogi: Bayangkan Anda adalah kasir di supermarket yang bisa mengatur urutan antrian. Anda bisa memprioritaskan pelanggan yang membeli lebih banyak, atau bahkan "menyelip" untuk membeli sesuatu sendiri sebelum orang lain.

## Tiga Bentuk MEV Utama

### 1. Arbitrage — Selisih Harga Antar DEX

\`\`\`
Situasi: Harga ETH di Uniswap = $3.000, di Curve = $3.015

Strategi bot:
1. Beli ETH di Uniswap ($3.000)
2. Jual ETH di Curve ($3.015)
3. Profit = $15 per ETH (minus gas fee)
\`\`\`

\`\`\`sql
-- Mendeteksi arbitrage: wallet yang trading di 2 DEX berbeda dalam satu block
SELECT
  a.block_number,
  a.taker                               AS searcher,
  a.token_bought_symbol                 AS token,
  a.project                             AS buy_dex,
  b.project                             AS sell_dex,
  a.amount_usd                          AS buy_amount_usd,
  b.amount_usd                          AS sell_amount_usd,
  b.amount_usd - a.amount_usd          AS estimated_profit_usd
FROM dex.trades a
JOIN dex.trades b
  ON a.block_number = b.block_number
  AND a.taker = b.taker
  AND a.token_bought_symbol = b.token_sold_symbol
  AND a.project != b.project               -- DEX yang berbeda
WHERE a.block_time >= NOW() - INTERVAL '1' DAY
  AND b.block_time >= NOW() - INTERVAL '1' DAY
  AND a.blockchain = 'ethereum'
  AND b.blockchain = 'ethereum'
  AND b.amount_usd > a.amount_usd          -- ada profit
ORDER BY estimated_profit_usd DESC
LIMIT 20;
\`\`\`

### 2. Sandwich Attack — Front-run dan Back-run

\`\`\`
Situasi: User akan menukar ETH senilai besar ke USDC di Uniswap

Strategi bot:
1. FRONT-RUN: Bot beli USDC sebelum user (naikkan harga USDC)
2. User swap terjadi (user mendapat harga lebih buruk = slippage)
3. BACK-RUN: Bot jual USDC yang dibeli (ambil profit dari kenaikan harga)
\`\`\`

\`\`\`sql
-- Mendeteksi pola sandwich attack: 3 transaksi berurutan dalam block
WITH block_swaps AS (
  SELECT
    block_number,
    tx_hash,
    ROW_NUMBER() OVER (PARTITION BY block_number ORDER BY tx_index) AS tx_position,
    taker,
    token_bought_symbol,
    token_sold_symbol,
    amount_usd,
    project
  FROM dex.trades
  WHERE block_time >= NOW() - INTERVAL '1' DAY
    AND blockchain = 'ethereum'
    AND amount_usd > 0
)
SELECT
  s1.block_number,
  s1.taker                            AS suspected_attacker,
  s2.taker                            AS victim,
  s1.token_bought_symbol              AS token_attacked,
  s1.amount_usd                       AS frontrun_amount,
  s2.amount_usd                       AS victim_amount,
  s3.amount_usd                       AS backrun_amount,
  s3.amount_usd - s1.amount_usd       AS estimated_profit
FROM block_swaps s1
JOIN block_swaps s2
  ON s1.block_number = s2.block_number
  AND s2.tx_position = s1.tx_position + 1   -- s2 langsung setelah s1
  AND s1.token_bought_symbol = s2.token_bought_symbol  -- token yang sama
  AND s1.taker != s2.taker                  -- pembuat berbeda
JOIN block_swaps s3
  ON s2.block_number = s3.block_number
  AND s3.tx_position = s2.tx_position + 1   -- s3 langsung setelah s2
  AND s3.token_sold_symbol = s1.token_bought_symbol  -- jual token yang sama
  AND s3.taker = s1.taker                   -- sama dengan front-runner
WHERE s3.amount_usd > s1.amount_usd         -- ada profit
ORDER BY estimated_profit DESC
LIMIT 10;
\`\`\`

### 3. Liquidation — Likuidasi Posisi Under-collateralized

\`\`\`sql
-- Aktivitas liquidation di Aave V3
SELECT
  DATE_TRUNC('day', evt_block_time)         AS tanggal,
  COUNT(*)                                  AS jumlah_liquidasi,
  SUM(CAST(liquidatedCollateralAmount AS DOUBLE) / 1e18) AS collateral_eth
FROM aave_v3_ethereum.Pool_evt_LiquidationCall
WHERE evt_block_time >= NOW() - INTERVAL '30' DAY
GROUP BY 1
ORDER BY 1;
\`\`\`

## MEV dan Flashbots

Flashbots adalah infrastruktur yang mengubah cara MEV diekstrak di Ethereum. Alih-alih kompetisi gas fee yang tinggi (yang merugikan pengguna biasa), Flashbots memungkinkan MEV searcher mengirim "bundle" transaksi langsung ke validator secara private:

\`\`\`sql
-- Persentase block yang dibangun oleh builder tertentu (indikator Flashbots usage)
SELECT
  DATE_TRUNC('day', time)         AS tanggal,
  COUNT(*)                        AS total_blocks
FROM ethereum.blocks
WHERE time >= NOW() - INTERVAL '7' DAY
GROUP BY 1
ORDER BY 1;
\`\`\`

## Dampak MEV pada Pengguna Biasa

MEV berdampak nyata pada setiap pengguna DeFi:
1. **Price impact lebih buruk** — Sandwich attack menaikkan slippage Anda
2. **Gas fee lebih tinggi** — Kompetisi MEV mendorong gas fee naik
3. **Worse execution** — Order Anda dieksekusi di harga yang kurang optimal

Cara melindungi diri:
- Gunakan slippage tolerance rendah (tapi tidak terlalu rendah agar tidak gagal)
- Gunakan MEV-protected RPC seperti MEV Blocker atau Flashbots Protect
- Trade di saat network tidak terlalu padat

## Volume MEV di Ethereum

\`\`\`sql
-- Estimasi aktivitas arbitrage berdasarkan pola transaksi
SELECT
  DATE_TRUNC('day', block_time)            AS tanggal,
  COUNT(DISTINCT taker)                    AS unique_traders,
  COUNT(*)                                 AS total_swap,
  -- Swap yang terjadi dalam satu block oleh wallet yang sama (proxy for MEV)
  COUNT(CASE WHEN swap_in_block >= 2 THEN 1 END) AS potential_mev_swaps
FROM (
  SELECT
    block_time,
    taker,
    COUNT(*) OVER (PARTITION BY block_number, taker) AS swap_in_block
  FROM dex.trades
  WHERE blockchain = 'ethereum'
    AND block_time >= NOW() - INTERVAL '7' DAY
    AND amount_usd > 0
) t
GROUP BY 1
ORDER BY 1;
\`\`\`

## Ringkasan

| Jenis MEV | Mekanisme | Dampak pada User |
|-----------|-----------|-----------------|
| Arbitrage | Eksploitasi perbedaan harga antar DEX | Negatif kecil (membantu price discovery) |
| Sandwich Attack | Front-run + back-run transaksi user | Sangat negatif (slippage lebih tinggi) |
| Liquidation | Likuidasi posisi under-collateral | Netral (membantu protokol tetap solvent) |
| Backrunning | Masuk setelah transaksi besar | Negatif kecil |

## Tantangan Praktik

**Level 1 — Eksplorasi**

Jalankan query berikut untuk melihat bot-bot yang paling aktif di Ethereum (banyak transaksi dalam block yang sama adalah sinyal bot MEV):

\`\`\`sql
SELECT
  taker                              AS wallet,
  COUNT(DISTINCT block_number)       AS jumlah_block,
  COUNT(*)                           AS total_swap,
  ROUND(COUNT(*) * 1.0 / COUNT(DISTINCT block_number), 2) AS avg_swap_per_block,
  SUM(amount_usd)                    AS total_volume
FROM dex.trades
WHERE blockchain = 'ethereum'
  AND block_time >= NOW() - INTERVAL '1' DAY
  AND amount_usd > 0
GROUP BY taker
HAVING COUNT(*) > 50                -- sangat aktif
ORDER BY avg_swap_per_block DESC
LIMIT 20;
\`\`\`

Pertanyaan: Wallet mana yang paling mungkin adalah bot MEV? Tanda-tanda apa yang menunjukkan itu adalah bot?

**Level 2 — Modifikasi**

Ubah query arbitrage detection di atas untuk hanya menampilkan kasus di mana estimasi profit lebih dari $1.000 dan kedua DEX yang digunakan adalah Uniswap dan Curve (atau Uniswap dan SushiSwap).

**Level 3 — Mandiri (Bonus)**

Tanpa melihat contoh, buat analisis yang membandingkan gas fee rata-rata yang dibayar oleh wallet yang diduga bot MEV vs wallet biasa di Ethereum dalam 24 jam terakhir. Hipotesis: bot MEV membayar gas lebih tinggi untuk memastikan transaksi mereka masuk di posisi yang tepat dalam block.`;

const L_MULTICHAIN = `# Analisis Multi-Chain

> **TLDR:** Ekosistem blockchain modern tidak lagi hanya Ethereum — ada Arbitrum, Polygon, Optimism, Base, dan puluhan chain lainnya. Dune memungkinkan analisis lintas chain dalam satu query menggunakan tabel Spellbook yang sudah menyatukan data multi-chain.

---

Sampai di sini, sebagian besar analisis kita berfokus pada Ethereum mainnet. Namun ekosistem blockchain modern jauh lebih kompleks: likuiditas tersebar di banyak chain, user berpindah-pindah melalui bridge, dan setiap chain memiliki karakteristik unik. Saatnya scale up analisis kita ke level multi-chain.

## Mengapa Analisis Multi-Chain Penting?

1. **Gambaran ekosistem yang lengkap** — Volume DEX total, bukan hanya Ethereum
2. **Migrasi user** — Melihat ke mana user pindah saat fee Ethereum mahal
3. **Peluang arbitrage** — Perbedaan harga antar chain
4. **TVL competition** — Protokol bersaing untuk menarik likuiditas lintas chain
5. **Bridge activity** — Aliran aset antar ekosistem

## Tabel dex.trades — Multi-Chain dalam Satu Query

Tabel Spellbook \`dex.trades\` sudah mengandung data dari semua chain yang didukung Dune. Kolom \`blockchain\` memungkinkan analisis lintas chain:

\`\`\`sql
-- Volume DEX per chain dalam 7 hari terakhir
SELECT
  blockchain,
  COUNT(*)                       AS jumlah_swap,
  SUM(amount_usd)                AS volume_usd,
  COUNT(DISTINCT taker)          AS unique_traders,
  AVG(amount_usd)                AS avg_swap_size
FROM dex.trades
WHERE block_time >= NOW() - INTERVAL '7' DAY
  AND amount_usd > 0
GROUP BY blockchain
ORDER BY volume_usd DESC;
\`\`\`

## Perbandingan Chain Week-over-Week

\`\`\`sql
WITH volume_minggu_ini AS (
  SELECT
    blockchain,
    SUM(amount_usd)   AS volume
  FROM dex.trades
  WHERE block_time >= NOW() - INTERVAL '7' DAY
    AND amount_usd > 0
  GROUP BY blockchain
),
volume_minggu_lalu AS (
  SELECT
    blockchain,
    SUM(amount_usd)   AS volume
  FROM dex.trades
  WHERE block_time BETWEEN NOW() - INTERVAL '14' DAY
                        AND NOW() - INTERVAL '7' DAY
    AND amount_usd > 0
  GROUP BY blockchain
)
SELECT
  COALESCE(a.blockchain, b.blockchain)   AS blockchain,
  COALESCE(a.volume, 0)                  AS volume_minggu_ini,
  COALESCE(b.volume, 0)                  AS volume_minggu_lalu,
  ROUND(
    (COALESCE(a.volume, 0) - COALESCE(b.volume, 0)) * 100.0
    / NULLIF(b.volume, 0),
    2
  )                                       AS pct_perubahan
FROM volume_minggu_ini a
FULL OUTER JOIN volume_minggu_lalu b ON a.blockchain = b.blockchain
ORDER BY volume_minggu_ini DESC;
\`\`\`

## Analisis Protokol yang Sama di Chain Berbeda

Banyak protokol deploy di multiple chain. Berikut cara menganalisis performa Uniswap di semua chain:

\`\`\`sql
-- Uniswap di semua chain
SELECT
  blockchain,
  version,
  COUNT(*)                       AS swap_count,
  SUM(amount_usd)                AS total_volume,
  COUNT(DISTINCT taker)          AS unique_traders
FROM dex.trades
WHERE project = 'uniswap'
  AND block_time >= NOW() - INTERVAL '30' DAY
  AND amount_usd > 0
GROUP BY blockchain, version
ORDER BY total_volume DESC;
\`\`\`

## Analisis Bridge Activity

Bridge memindahkan aset antar chain. Memonitor bridge activity memberikan gambaran tentang aliran modal:

\`\`\`sql
-- Aktivitas bridge per hari (menggunakan tabel bridges jika tersedia)
SELECT
  DATE_TRUNC('day', block_time)    AS tanggal,
  blockchain                       AS source_chain,
  project                          AS bridge_protocol,
  COUNT(*)                         AS jumlah_bridge,
  SUM(amount_usd)                  AS volume_bridged
FROM bridges.transfers
WHERE block_time >= NOW() - INTERVAL '30' DAY
  AND amount_usd > 0
GROUP BY 1, 2, 3
ORDER BY 1 DESC, 5 DESC;
\`\`\`

## Tren Market Share Chain dari Waktu ke Waktu

\`\`\`sql
-- Bagaimana market share chain berubah selama 90 hari?
WITH weekly_volume AS (
  SELECT
    DATE_TRUNC('week', block_time)  AS minggu,
    blockchain,
    SUM(amount_usd)                 AS volume
  FROM dex.trades
  WHERE block_time >= NOW() - INTERVAL '90' DAY
    AND amount_usd > 0
    AND blockchain IN ('ethereum', 'arbitrum', 'polygon', 'optimism', 'base', 'bsc')
  GROUP BY 1, 2
),
weekly_total AS (
  SELECT minggu, SUM(volume) AS total
  FROM weekly_volume
  GROUP BY minggu
)
SELECT
  wv.minggu,
  wv.blockchain,
  wv.volume,
  ROUND(wv.volume * 100.0 / wt.total, 2) AS market_share_pct
FROM weekly_volume wv
JOIN weekly_total wt ON wv.minggu = wt.minggu
ORDER BY wv.minggu DESC, wv.volume DESC;
\`\`\`

## Wallet yang Aktif di Multiple Chain

\`\`\`sql
-- Temukan trader yang aktif di banyak chain (multi-chain native user)
SELECT
  taker                              AS wallet,
  COUNT(DISTINCT blockchain)         AS jumlah_chain,
  ARRAY_AGG(DISTINCT blockchain)     AS chain_list,
  COUNT(*)                           AS total_swap,
  SUM(amount_usd)                    AS total_volume
FROM dex.trades
WHERE block_time >= NOW() - INTERVAL '30' DAY
  AND amount_usd > 0
GROUP BY taker
HAVING COUNT(DISTINCT blockchain) >= 3     -- aktif di minimal 3 chain
ORDER BY jumlah_chain DESC, total_volume DESC
LIMIT 20;
\`\`\`

## Tantangan Analisis Multi-Chain

Beberapa hal yang perlu diperhatikan saat analisis multi-chain:

1. **Double counting di bridge** — Aset yang di-bridge bisa terhitung di dua chain
2. **Gas fee berbeda** — Gas fee di Ethereum jauh lebih mahal dari L2
3. **Harga yang berbeda** — Harga token bisa sedikit berbeda antar chain
4. **Data availability** — Tidak semua chain di-support Dune

## Ringkasan

| Metrik | Cara Menganalisis | Tabel |
|--------|-------------------|-------|
| Volume per chain | \`GROUP BY blockchain\` | \`dex.trades\` |
| Market share chain | Volume chain / total volume | \`dex.trades\` |
| Pertumbuhan chain | Week-over-week comparison | \`dex.trades\` + CTE |
| Bridge activity | Transfer antar chain | \`bridges.transfers\` |
| Multi-chain traders | \`COUNT(DISTINCT blockchain)\` | \`dex.trades\` |

## Tantangan Praktik

**Level 1 — Eksplorasi**

Jalankan query berikut dan amati hasilnya:

\`\`\`sql
SELECT
  blockchain,
  DATE_TRUNC('week', block_time)   AS minggu,
  SUM(amount_usd)                  AS volume
FROM dex.trades
WHERE block_time >= NOW() - INTERVAL '90' DAY
  AND amount_usd > 0
  AND blockchain IN ('ethereum', 'arbitrum', 'base', 'optimism', 'polygon')
GROUP BY 1, 2
ORDER BY 2, 3 DESC;
\`\`\`

Pertanyaan: Chain mana yang tumbuh paling cepat? Chain mana yang volume-nya menurun?

**Level 2 — Modifikasi**

Ubah query perbandingan week-over-week di atas untuk membandingkan periode bulan ini vs bulan lalu (bukan minggu ini vs minggu lalu). Tambahkan juga kategori "New Chain" untuk chain yang baru muncul di bulan ini.

**Level 3 — Mandiri (Bonus)**

Buat analisis komprehensif tentang ekosistem Layer 2 Ethereum (Arbitrum, Optimism, Base, zkSync, dll.) dalam 90 hari terakhir. Bandingkan: volume DEX, jumlah unique trader, rata-rata ukuran transaksi, dan tren pertumbuhan mingguan. Tampilkan dalam format yang bisa langsung dijadikan dashboard.`;

const L_WALLET = `# Wallet Clustering dan Smart Money Analysis

> **TLDR:** Wallet clustering adalah teknik untuk mengidentifikasi wallet yang mungkin dikontrol oleh entitas yang sama. Smart money tracking melacak pergerakan trader berpengalaman untuk mendapatkan sinyal pasar awal.

---

Analisis multi-chain memberikan gambaran besar tentang ekosistem. Sekarang kita zoom in ke level paling granular: analisis individual wallet. Siapa yang memindahkan pasar? Siapa yang selalu early ke protokol baru? Bagaimana mengidentifikasi apakah beberapa wallet adalah satu entitas?

## Apa itu Wallet Analysis?

Wallet analysis adalah proses menganalisis perilaku on-chain dari satu atau sekelompok alamat Ethereum untuk memahami:
- Pola trading dan timing
- Koneksi dengan wallet lain
- Afiliasi dengan entitas tertentu (exchange, fund, whale)
- Profitabilitas historis

## Smart Money — Siapa yang Wajib Diikuti?

"Smart money" merujuk pada wallet dari trader berpengalaman, hedge fund crypto, atau early investor yang track record profitabilnya terbukti. Pergerakan mereka sering menjadi sinyal awal tentang token atau protokol yang akan berkembang.

\`\`\`sql
-- Temukan wallet yang konsisten profitable dalam trading DEX
WITH trader_stats AS (
  SELECT
    taker                          AS wallet,
    COUNT(*)                       AS total_swap,
    COUNT(DISTINCT project)        AS protokol_digunakan,
    SUM(amount_usd)                AS total_volume,
    COUNT(DISTINCT token_bought_symbol) AS token_berbeda,
    MIN(block_time)                AS pertama_aktif,
    MAX(block_time)                AS terakhir_aktif
  FROM dex.trades
  WHERE blockchain = 'ethereum'
    AND block_time >= NOW() - INTERVAL '90' DAY
    AND amount_usd > 0
  GROUP BY taker
)
SELECT
  ts.wallet,
  ts.total_swap,
  ts.protokol_digunakan,
  ts.total_volume,
  ts.token_berbeda,
  COALESCE(l.name, 'Unlabeled') AS label,
  l.category
FROM trader_stats ts
LEFT JOIN labels.addresses l ON ts.wallet = l.address
WHERE ts.total_volume > 1000000    -- volume lebih dari $1 juta
  AND ts.protokol_digunakan >= 3   -- menggunakan setidaknya 3 protokol
  AND ts.total_swap >= 50          -- aktif trading
ORDER BY ts.total_volume DESC
LIMIT 20;
\`\`\`

## Melacak Pergerakan Smart Money

\`\`\`sql
-- Monitor aksi terbaru dari wallet yang diketahui sebagai smart money
SELECT
  t.block_time                         AS waktu,
  COALESCE(l.name, 'Unlabeled')        AS wallet_name,
  l.category                           AS kategori,
  t.project                            AS dex,
  t.token_bought_symbol                AS token_dibeli,
  t.token_sold_symbol                  AS token_dijual,
  ROUND(t.amount_usd, 2)               AS nilai_usd,
  t.taker                              AS wallet_address
FROM dex.trades t
INNER JOIN labels.addresses l ON t.taker = l.address
WHERE t.block_time >= NOW() - INTERVAL '7' DAY
  AND t.amount_usd > 10000
  AND t.blockchain = 'ethereum'
  AND l.category IN ('fund', 'institutional', 'smart money')  -- kategori yang relevan
ORDER BY t.amount_usd DESC
LIMIT 50;
\`\`\`

## Wallet Clustering — Menemukan Wallet Satu Entitas

Heuristik sederhana: jika wallet A sering mengirim ETH ke wallet B tepat sebelum B melakukan swap besar, kemungkinan keduanya adalah satu entitas:

\`\`\`sql
-- Temukan pola: wallet yang sering berinteraksi (kemungkinan satu entitas)
SELECT
  "from"                         AS wallet_pengirim,
  "to"                           AS wallet_penerima,
  COUNT(*)                       AS frekuensi_transfer,
  SUM(value) / 1e18              AS total_eth_dikirim,
  MIN(block_time)                AS transfer_pertama,
  MAX(block_time)                AS transfer_terakhir
FROM ethereum.transactions
WHERE block_time >= NOW() - INTERVAL '90' DAY
  AND value > 0
  AND "to" IS NOT NULL
GROUP BY "from", "to"
HAVING COUNT(*) > 10             -- lebih dari 10 kali transfer satu sama lain
ORDER BY frekuensi_transfer DESC
LIMIT 30;
\`\`\`

## Analisis Profil Wallet Lengkap

Buat profil komprehensif untuk satu wallet:

\`\`\`sql
-- Profil lengkap satu wallet (ganti alamat dengan wallet yang ingin dianalisis)
WITH target_wallet AS (
  SELECT 0x28C6c06298d514Db089934071355E5743bf21d60 AS wallet_address   -- ganti ini
),

eth_activity AS (
  SELECT
    COUNT(*)                     AS total_tx_eth,
    SUM(CASE WHEN "from" = tw.wallet_address THEN 1 ELSE 0 END) AS tx_sent,
    SUM(CASE WHEN "to" = tw.wallet_address THEN 1 ELSE 0 END) AS tx_received,
    SUM(CASE WHEN "from" = tw.wallet_address THEN value ELSE 0 END) / 1e18 AS eth_sent,
    SUM(CASE WHEN "to" = tw.wallet_address THEN value ELSE 0 END) / 1e18 AS eth_received
  FROM ethereum.transactions
  CROSS JOIN target_wallet tw
  WHERE ("from" = tw.wallet_address OR "to" = tw.wallet_address)
    AND block_time >= NOW() - INTERVAL '90' DAY
),

dex_activity AS (
  SELECT
    COUNT(*)                     AS total_swap,
    SUM(amount_usd)              AS total_dex_volume,
    COUNT(DISTINCT project)      AS protokol_digunakan
  FROM dex.trades
  CROSS JOIN target_wallet tw
  WHERE taker = tw.wallet_address
    AND block_time >= NOW() - INTERVAL '90' DAY
    AND amount_usd > 0
)

SELECT
  e.total_tx_eth,
  e.tx_sent,
  e.tx_received,
  ROUND(e.eth_sent, 4)           AS eth_sent,
  ROUND(e.eth_received, 4)       AS eth_received,
  d.total_swap,
  ROUND(d.total_dex_volume, 2)   AS dex_volume_usd,
  d.protokol_digunakan
FROM eth_activity e
CROSS JOIN dex_activity d;
\`\`\`

## Temukan Wallet Early Adopter

Wallet yang pertama kali berinteraksi dengan protokol baru sering adalah insider atau DeFi power user:

\`\`\`sql
-- 20 wallet pertama yang menggunakan Uniswap V3
SELECT
  taker                          AS wallet,
  MIN(block_time)                AS waktu_pertama_swap,
  COUNT(*)                       AS total_swap,
  SUM(amount_usd)                AS total_volume
FROM dex.trades
WHERE project = 'uniswap'
  AND version = '3'
  AND blockchain = 'ethereum'
GROUP BY taker
ORDER BY waktu_pertama_swap ASC
LIMIT 20;
\`\`\`

## Ringkasan

| Analisis | Tujuan | Teknik |
|----------|--------|--------|
| Smart money tracking | Ikuti trader berpengalaman | JOIN dex.trades + labels yang dikategorikan 'fund' |
| Wallet clustering | Identifikasi wallet satu entitas | Analisis pola transfer antar wallet |
| Profil wallet | Memahami perilaku satu wallet | UNION data dari berbagai tabel |
| Early adopter | Temukan insider/pioneer | ORDER BY waktu pertama interaksi |

## Tantangan Praktik

**Level 1 — Eksplorasi**

Pilih satu alamat wallet terkenal (misalnya alamat Vitalik: 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045), jalankan query berikut untuk menganalisis aktivitas DEX-nya:

\`\`\`sql
SELECT
  DATE_TRUNC('month', block_time)  AS bulan,
  project,
  COUNT(*)                         AS jumlah_swap,
  SUM(amount_usd)                  AS volume
FROM dex.trades
WHERE taker = 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045
  AND block_time >= NOW() - INTERVAL '365' DAY
  AND amount_usd > 0
GROUP BY 1, 2
ORDER BY 1 DESC, 4 DESC;
\`\`\`

Pertanyaan: Protokol apa yang paling sering digunakan? Apakah ada tren aktivitas yang menarik?

**Level 2 — Modifikasi**

Ubah query wallet clustering di atas untuk juga menyertakan label dari \`labels.addresses\` untuk kedua wallet (pengirim dan penerima). Tampilkan hanya pasangan wallet di mana setidaknya satu memiliki label.

**Level 3 — Mandiri (Bonus)**

Tanpa melihat contoh, buat "Smart Money Dashboard": temukan 10 wallet yang paling banyak mendapat profit dari trading NFT dalam 90 hari terakhir (total penjualan > total pembelian). Untuk setiap wallet, tampilkan label, total beli, total jual, dan profit. Gunakan CTE dan multiple JOIN.`;

const L_BITCOIN = `# Bitcoin On-Chain Analytics — Model UTXO

> **TLDR:** Bitcoin menggunakan model UTXO (Unspent Transaction Output) yang fundamental berbeda dari model Account Ethereum. Analisis Bitcoin memerlukan pemahaman tentang inputs/outputs, dan satuan terkecil adalah satoshi (1 BTC = 100 juta satoshi).

---

Semua analisis yang kita lakukan sampai sekarang menggunakan model Account — Ethereum, Arbitrum, dan chain EVM lainnya. Bitcoin, sebagai blockchain pertama dan terbesar, menggunakan paradigma yang sama sekali berbeda: model UTXO. Memahami perbedaan ini membuka perspektif baru dalam analisis on-chain.

## Apa itu Model UTXO?

UTXO (Unspent Transaction Output) adalah "koin digital" yang belum digunakan. Dalam Bitcoin:
- Setiap transaksi mengkonsumsi UTXO lama (inputs) dan menciptakan UTXO baru (outputs)
- Tidak ada konsep "saldo akun" — saldo Anda adalah jumlah semua UTXO yang Anda miliki
- Setiap kali Anda bertransaksi, Anda "membelanjakan" UTXO dan menerima kembalian sebagai UTXO baru

Analogi: UTXO seperti uang tunai fisik. Jika Anda punya lembar Rp 100.000 dan ingin membayar Rp 70.000, Anda serahkan lembar Rp 100.000 (input) dan menerima kembalian Rp 30.000 (output) plus output Rp 70.000 untuk penerima.

## Perbandingan Model UTXO vs Account

| Aspek | Bitcoin (UTXO) | Ethereum (Account) |
|-------|---------------|-------------------|
| Struktur data | Unspent outputs | Saldo akun |
| Transaksi | Consume inputs, create outputs | Tambah/kurangi saldo |
| Privacy | Lebih baik (address bisa baru setiap transaksi) | Lebih rendah (satu address) |
| Smart contract | Terbatas (Script) | Sangat powerful (Solidity) |
| Analisis saldo | Hitung semua UTXO wallet | Query saldo langsung |
| Satuan terkecil | Satoshi (1 BTC = 10⁸ satoshi) | Wei (1 ETH = 10¹⁸ wei) |

## Tabel Bitcoin di Dune

\`\`\`sql
-- Eksplorasi tabel utama Bitcoin
SELECT
  block_time,
  hash                AS tx_hash,
  input_count,
  output_count,
  input_value / 1e8   AS input_btc,
  output_value / 1e8  AS output_btc,
  fee / 1e8           AS fee_btc,
  is_coinbase         AS apakah_mining_reward
FROM bitcoin.transactions
WHERE block_time >= NOW() - INTERVAL '1' DAY
ORDER BY fee DESC
LIMIT 20;

-- Tabel inputs (UTXOs yang dikonsumsi)
SELECT
  block_time,
  tx_id,
  input_index,
  value / 1e8         AS input_btc,
  address             AS dari_address
FROM bitcoin.inputs
WHERE block_time >= NOW() - INTERVAL '1' DAY
LIMIT 20;

-- Tabel outputs (UTXOs yang dibuat)
SELECT
  block_time,
  tx_id,
  output_index,
  value / 1e8         AS output_btc,
  address             AS ke_address,
  spent               AS sudah_dipakai
FROM bitcoin.outputs
WHERE block_time >= NOW() - INTERVAL '1' DAY
LIMIT 20;
\`\`\`

## Analisis Fee dan Aktivitas Transaksi

\`\`\`sql
-- Statistik fee transaksi Bitcoin harian
SELECT
  DATE_TRUNC('day', block_time)   AS tanggal,
  COUNT(*)                        AS jumlah_tx,
  SUM(fee) / 1e8                  AS total_fee_btc,
  AVG(fee) / 1e8                  AS avg_fee_btc,
  -- Fee dalam satoshi per byte adalah metrik umum untuk Bitcoin
  approx_percentile(fee, 0.5)     AS median_fee_satoshi
FROM bitcoin.transactions
WHERE block_time >= NOW() - INTERVAL '30' DAY
  AND is_coinbase = FALSE          -- kecualikan mining reward
GROUP BY 1
ORDER BY 1;
\`\`\`

## Analisis Volume On-Chain Bitcoin

\`\`\`sql
-- Volume Bitcoin yang ditransfer per hari
SELECT
  DATE_TRUNC('day', block_time)   AS tanggal,
  SUM(output_value) / 1e8         AS total_btc_transferred,
  COUNT(*)                        AS jumlah_tx,
  SUM(fee) / 1e8                  AS total_fee_btc
FROM bitcoin.transactions
WHERE block_time >= NOW() - INTERVAL '30' DAY
  AND is_coinbase = FALSE
GROUP BY 1
ORDER BY 1;
\`\`\`

## Menganalisis UTXO Age Distribution (HODL Waves)

HODL Waves adalah visualisasi distribusi Bitcoin berdasarkan berapa lama UTXO tidak bergerak — salah satu analisis on-chain paling powerful untuk Bitcoin:

\`\`\`sql
-- UTXO yang sudah lama tidak bergerak (long-term holders / HODLers)
SELECT
  CASE
    WHEN DATE_DIFF('day', block_time, NOW()) <= 7     THEN '0-7 hari'
    WHEN DATE_DIFF('day', block_time, NOW()) <= 30    THEN '8-30 hari'
    WHEN DATE_DIFF('day', block_time, NOW()) <= 90    THEN '31-90 hari'
    WHEN DATE_DIFF('day', block_time, NOW()) <= 180   THEN '91-180 hari'
    WHEN DATE_DIFF('day', block_time, NOW()) <= 365   THEN '181 hari - 1 tahun'
    WHEN DATE_DIFF('day', block_time, NOW()) <= 730   THEN '1-2 tahun'
    ELSE 'Lebih dari 2 tahun'
  END                             AS usia_utxo,
  COUNT(*)                        AS jumlah_utxo,
  SUM(value) / 1e8                AS total_btc
FROM bitcoin.outputs
WHERE spent = FALSE               -- hanya UTXO yang belum dipakai (unspent)
GROUP BY 1
ORDER BY MIN(DATE_DIFF('day', block_time, NOW()));
\`\`\`

## Menganalisis Aktivitas Whale Bitcoin

\`\`\`sql
-- Transaksi Bitcoin terbesar hari ini
SELECT
  block_time,
  hash                            AS tx_hash,
  input_count,
  output_count,
  output_value / 1e8              AS total_btc,
  fee / 1e8                       AS fee_btc,
  ROUND(fee * 100.0 / NULLIF(output_value, 0), 4) AS fee_pct
FROM bitcoin.transactions
WHERE block_time >= NOW() - INTERVAL '1' DAY
  AND is_coinbase = FALSE
ORDER BY output_value DESC
LIMIT 20;
\`\`\`

## Ringkasan Perbedaan Analisis Bitcoin vs Ethereum

| Analisis | Bitcoin | Ethereum |
|----------|---------|---------|
| Transfer data | \`bitcoin.inputs\` dan \`bitcoin.outputs\` | \`ethereum.transactions\` |
| Saldo wallet | Jumlah semua unspent outputs | Langsung dari kolom saldo |
| Fee | \`fee / 1e8\` BTC | \`gas_used * gas_price / 1e18\` ETH |
| Token transfer | Tidak ada (hanya BTC native) | \`tokens.transfers\` untuk ERC20 |
| Smart contract | Sangat terbatas | \`ethereum.logs\` untuk events |

## Tantangan Praktik

**Level 1 — Eksplorasi**

Jalankan query berikut dan bandingkan dengan Ethereum:

\`\`\`sql
SELECT
  DATE_TRUNC('day', block_time)   AS tanggal,
  COUNT(*)                        AS jumlah_tx,
  SUM(output_value) / 1e8         AS volume_btc,
  AVG(fee) / 1e8                  AS avg_fee_btc
FROM bitcoin.transactions
WHERE block_time >= NOW() - INTERVAL '14' DAY
  AND is_coinbase = FALSE
GROUP BY 1
ORDER BY 1;
\`\`\`

Pertanyaan: Berapa rata-rata fee Bitcoin dalam BTC? Jika 1 BTC = $40.000, berapa fee dalam USD? Bandingkan dengan fee Ethereum.

**Level 2 — Modifikasi**

Ubah query HODL Waves di atas untuk menghitung persentase (bukan hanya jumlah absolut) dari total supply yang ada di setiap kategori usia UTXO. Tambahkan kolom \`pct_dari_total\`.

**Level 3 — Mandiri (Bonus)**

Tanpa melihat contoh, buat analisis perbandingan antara Bitcoin dan Ethereum selama 30 hari terakhir: jumlah transaksi per hari, total nilai yang ditransfer (dalam USD, asumsi harga), rata-rata fee (dalam USD), dan berikan interpretasi singkat tentang perbedaan karakteristik kedua blockchain.`;

const L_API = `# Dune API & Spellbook

**TLDR:** Dune API memungkinkan Anda mengambil hasil query secara programatik, mengintegrasikan data on-chain ke aplikasi, dan mengotomatisasikan analisis rutin menggunakan Python, JavaScript, atau bahasa lainnya.

---

Selama ini kita menganalisis data secara manual di Dune UI — menulis query, melihat chart, membangun dashboard. Analisis manual di Dune UI sudah powerful. Tapi bagaimana mengotomatisasikannya dengan API? Dune API hadir menjawab kebutuhan itu: ambil data langsung dari query Anda ke kode Anda.

---

## Apa itu Dune API?

Dune API adalah REST API yang memungkinkan Anda:
- **Menjalankan query** yang sudah dibuat di Dune secara programatik
- **Mengambil hasil** query dalam format JSON
- **Mengintegrasikan** data blockchain ke aplikasi, bot, atau pipeline data
- **Menjadwalkan** eksekusi query otomatis

Dune API menggunakan model berbasis **credits** — setiap eksekusi query mengonsumsi kredit. Query yang sudah di-cache lebih murah daripada eksekusi baru.

---

## Kapan Digunakan?

| Skenario | Mengapa API? |
|----------|-------------|
| Bot Discord/Telegram | Kirim data on-chain otomatis ke komunitas |
| Dashboard aplikasi | Tampilkan metrik DeFi real-time di web app |
| Alerting system | Notifikasi ketika whale wallet bergerak |
| Data pipeline | Sinkronkan data on-chain ke database internal |
| Riset otomatis | Jalankan ratusan query tanpa buka browser |

---

## Cara Menggunakan Dune API

### Langkah 1: Dapatkan API Key

1. Login ke [dune.com](https://dune.com)
2. Klik avatar profil → **Settings** → **API**
3. Klik **"Create new API key"**
4. Simpan key — hanya ditampilkan sekali

### Langkah 2: Pahami Struktur API

Dune API memiliki dua endpoint utama:

**Eksekusi Query:**
\`\`\`
POST https://api.dune.com/api/v1/query/{query_id}/execute
\`\`\`

**Ambil Hasil:**
\`\`\`
GET https://api.dune.com/api/v1/execution/{execution_id}/results
\`\`\`

**Atau langsung ambil hasil terbaru:**
\`\`\`
GET https://api.dune.com/api/v1/query/{query_id}/results
\`\`\`

### Langkah 3: Contoh dengan Python

**Install library:**
\`\`\`bash
pip install dune-client
\`\`\`

**Kode Python dasar:**
\`\`\`python
from dune_client.client import DuneClient
from dune_client.types import QueryParameter

# Inisialisasi client
dune = DuneClient(api_key="YOUR_API_KEY")

# Jalankan query dengan ID tertentu
# Contoh: Query volume DEX harian
query_id = 1234567
result = dune.get_latest_result(query_id)

# Akses data
for row in result.result.rows:
    print(row)
\`\`\`

**Contoh dengan parameter dinamis:**
\`\`\`python
from dune_client.query import QueryBase
from dune_client.types import QueryParameter

query = QueryBase(
    query_id=1234567,
    params=[
        QueryParameter.text_type("blockchain", "ethereum"),
        QueryParameter.number_type("min_amount_usd", 10000),
    ]
)

result = dune.run_query(query)
df = result.get_dataframe()
print(df.head())
\`\`\`

### Langkah 4: Contoh dengan JavaScript/Node.js

\`\`\`javascript
const DUNE_API_KEY = "YOUR_API_KEY";
const QUERY_ID = 1234567;

// Ambil hasil terbaru
const response = await fetch(
  \`https://api.dune.com/api/v1/query/\${QUERY_ID}/results\`,
  {
    headers: { "X-DUNE-API-KEY": DUNE_API_KEY }
  }
);

const data = await response.json();
console.log(data.result.rows);
\`\`\`

---

## Spellbook — Lapisan Abstraksi Data

Selain API, Dune memiliki **Spellbook**: repositori tabel abstraksi open-source yang dibangun komunitas.

### Apa itu Spellbook?

Spellbook adalah kumpulan **view dan tabel materialisasi** yang mengabstraksi data mentah menjadi tabel yang lebih mudah digunakan:

| Tabel Spellbook | Sumber Data | Kegunaan |
|----------------|-------------|---------|
| \`dex.trades\` | Berbagai DEX | Semua transaksi swap |
| \`nft.trades\` | OpenSea, Blur, dll | Semua transaksi NFT |
| \`tokens.erc20\` | Transfer events | Data token ERC20 |
| \`prices.usd\` | Berbagai sumber | Harga token historis |

### Kenapa Spellbook Penting?

Tanpa Spellbook, untuk menganalisis volume Uniswap V2 + V3 + fork lainnya, Anda harus:
1. Decode setiap kontrak secara terpisah
2. Normalisasi skema yang berbeda
3. Handle edge cases tiap protokol

Dengan Spellbook:
\`\`\`sql
SELECT
  block_date,
  project,
  SUM(amount_usd) AS volume_usd
FROM dex.trades
WHERE blockchain = 'ethereum'
  AND block_date >= NOW() - INTERVAL '30' DAY
GROUP BY 1, 2
ORDER BY 1, 3 DESC
\`\`\`

### Berkontribusi ke Spellbook

Spellbook adalah open-source di GitHub: \`duneanalytics/spellbook\`

Untuk berkontribusi:
1. Fork repositori
2. Tulis model dbt (SQL + YAML)
3. Tambah tests
4. Buat Pull Request

---

## Contoh Praktis: Bot Monitoring Whale

Query di Dune untuk mendeteksi whale (simpan sebagai query dengan ID tertentu):
\`\`\`sql
SELECT
  block_time,
  "from" AS whale_wallet,
  to AS recipient,
  value / 1e18 AS eth_amount,
  value / 1e18 * p.price AS usd_value
FROM ethereum.transactions t
JOIN prices.usd p ON p.symbol = 'ETH'
  AND p.minute = DATE_TRUNC('minute', t.block_time)
WHERE value / 1e18 > 100  -- lebih dari 100 ETH
  AND block_time >= NOW() - INTERVAL '1' HOUR
ORDER BY value DESC
\`\`\`

Script Python untuk monitoring:
\`\`\`python
import schedule
import time
from dune_client.client import DuneClient

dune = DuneClient(api_key="YOUR_KEY")
QUERY_ID = 1234567  # ganti dengan ID query Anda

def check_whales():
    result = dune.get_latest_result(QUERY_ID)
    rows = result.result.rows
    if rows:
        for whale in rows[:5]:
            print(f"WHALE: {whale['whale_wallet']} moved {whale['usd_value']:.0f} USD")

# Cek setiap 15 menit
schedule.every(15).minutes.do(check_whales)
while True:
    schedule.run_pending()
    time.sleep(1)
\`\`\`

---

## Rate Limits & Pricing

| Plan | Executions/bulan | Credits |
|------|-----------------|---------|
| Free | 10 | 2,500 |
| Plus | 100 | 25,000 |
| Premium | Unlimited | 500,000+ |

**Tips menghemat credits:**
- Gunakan \`get_latest_result\` bukan \`run_query\` jika data tidak harus real-time
- Set cache di query (\`max_age_hours\`) untuk menghindari eksekusi ulang
- Gunakan parameter query untuk satu query yang fleksibel

---

## Ringkasan

| Konsep | Penjelasan |
|--------|-----------|
| Dune API | REST API untuk akses programatik ke query Dune |
| Query ID | Nomor unik setiap query di Dune, ada di URL |
| Execution ID | ID untuk tracking eksekusi query yang sedang berjalan |
| dune-client | Library Python resmi untuk Dune API |
| Spellbook | Repositori tabel abstraksi open-source komunitas Dune |
| Credits | Mata uang API Dune, dikonsumsi per eksekusi query |

---

## Tantangan Praktik

**Level 1 — Eksplorasi:**
Buka Dune, temukan sebuah query publik yang menarik. Salin Query ID-nya (dari URL). Gunakan Dune API dengan Python atau curl untuk mengambil 5 baris pertama hasil query tersebut menggunakan endpoint \`GET /api/v1/query/{query_id}/results\`.

**Level 2 — Integrasi:**
Buat query di Dune yang menampilkan top 10 token berdasarkan volume 24 jam terakhir dari tabel \`dex.trades\` (filter blockchain = 'ethereum'). Kemudian buat script Python yang memanggil query ini setiap 1 jam dan menyimpan hasilnya ke file CSV dengan timestamp.

**Level 3 — Otomatisasi Penuh:**
Bangun sistem monitoring sederhana: buat query Dune yang mendeteksi transaksi besar (>$500K) di \`dex.trades\` dalam 1 jam terakhir. Buat script Python yang memanggil query setiap 30 menit via Dune API, memformat hasilnya (token, volume, DEX, wallet), dan mencetak alert ke konsol atau mengirim ke webhook Discord.
`;

const L_FOOTPRINT = `# Pengenalan Footprint Analytics

**TLDR:** Footprint Analytics adalah platform analisis blockchain yang menggabungkan antarmuka no-code yang intuitif dengan kemampuan SQL penuh, membuatnya ideal untuk analis yang ingin bergerak cepat antara eksplorasi visual dan query mendalam.

---

Dune adalah pilihan utama analisis on-chain dengan SQL. Namun tidak semua pertanyaan membutuhkan pendekatan yang sama. Footprint Analytics hadir dengan pendekatan berbeda: no-code + SQL — menggabungkan kecepatan eksplorasi visual dengan kedalaman analisis programatik dalam satu platform.

---

## Apa itu Footprint Analytics?

Footprint Analytics adalah platform analisis data blockchain yang dirancang untuk:
- **Kemudahan penggunaan**: Antarmuka drag-and-drop untuk membuat chart tanpa SQL
- **Fleksibilitas**: Mode SQL untuk analisis mendalam
- **Kolaborasi**: Dashboard publik yang dapat dibagikan komunitas
- **Multi-chain**: Mendukung 30+ blockchain secara native
- **Data abstraksi**: Tabel yang sudah dinormalisasi dan siap pakai

Footprint memposisikan diri sebagai alternatif yang lebih mudah diakses dibanding Dune, khususnya untuk pengguna yang belum familiar dengan SQL.

---

## Kapan Digunakan?

| Skenario | Footprint vs Dune |
|----------|-------------------|
| Eksplorasi cepat data NFT | Footprint lebih cepat (no-code) |
| Analisis DeFi mendalam | Keduanya bisa, Dune lebih fleksibel |
| Membuat laporan untuk komunitas | Footprint lebih mudah dibagikan |
| Query data mentah (raw logs) | Dune lebih unggul |
| Onboarding non-technical | Footprint lebih ramah pemula |

---

## Cara Menggunakan Footprint Analytics

### Langkah 1: Memahami Interface

Saat pertama membuka Footprint, Anda akan melihat:
- **Explore**: Jelajahi dataset yang tersedia
- **Dashboard**: Buat dan kelola dashboard
- **Charts**: Buat visualisasi individual
- **Tables**: Akses tabel data blockchain

### Langkah 2: Mengenal Struktur Data

Footprint mengorganisasi data dalam beberapa kategori:

**Protocol Tables:**
| Tabel | Isi |
|-------|-----|
| \`dex_protocol\` | Data DEX aggregated |
| \`lending_protocol\` | Data lending (Aave, Compound) |
| \`nft_marketplace\` | Data marketplace NFT |
| \`bridge_protocol\` | Data cross-chain bridges |

**Token Tables:**
| Tabel | Isi |
|-------|-----|
| \`token_daily_stats\` | Statistik harian per token |
| \`token_price\` | Harga historis token |
| \`token_transfer\` | Transfer token ERC20 |

**Chain Tables:**
| Tabel | Isi |
|-------|-----|
| \`transactions\` | Transaksi per chain |
| \`blocks\` | Data blok |
| \`addresses\` | Info alamat |

### Langkah 3: Mode No-Code

Di mode no-code, Anda bisa:
1. Pilih tabel data (misal: \`nft_marketplace\`)
2. Drag kolom ke X-axis dan Y-axis
3. Pilih tipe chart (bar, line, pie)
4. Tambah filter dan grup
5. Simpan sebagai chart atau tambahkan ke dashboard

### Langkah 4: Akses SQL Mode

Untuk query yang lebih kompleks, gunakan SQL Mode (dibahas detail di pelajaran berikutnya).

---

## Perbandingan Footprint vs Dune

| Aspek | Footprint | Dune |
|-------|-----------|------|
| Kemudahan | Tinggi (no-code ada) | Medium (SQL-first) |
| Fleksibilitas | Medium | Tinggi |
| Data mentah | Terbatas | Penuh |
| Multi-chain | 30+ chains | 10+ chains |
| Komunitas | Berkembang | Lebih besar |
| Pricing | Freemium | Freemium |
| API | Ya (terbatas) | Ya (lebih kuat) |
| Spellbook equiv | Protocol tables | Spellbook |

---

## Fitur Unggulan Footprint

### 1. Game Analytics
Footprint memiliki spesialisasi di GameFi — data player, NFT in-game, token ekonomi:
\`\`\`
Explorer → GameFi → pilih game → lihat metrics
\`\`\`

### 2. Cross-chain Comparison
Bandingkan metrik yang sama di beberapa chain sekaligus tanpa menulis UNION:
- Pilih metrik (misal: DEX volume)
- Centang beberapa chain
- Chart multi-chain otomatis terbentuk

### 3. NFT Analytics
Dashboard NFT yang komprehensif:
- Floor price tracking
- Volume per marketplace
- Holder distribution
- Whale activity

### 4. DeFi Protocol Dashboard
Setiap protokol DeFi besar memiliki halaman dedicated:
- TVL historis
- User growth
- Revenue
- Token metrics

---

## Contoh: Analisis Volume DEX di Footprint

Langkah no-code:
1. Buka Footprint → **Explore** → **DeFi**
2. Pilih dataset **"DEX Volume"**
3. Set filter: Chain = Ethereum, Period = Last 30 days
4. Drag \`date\` ke X-axis, \`volume_usd\` ke Y-axis
5. Group by \`protocol_name\`
6. Pilih chart tipe "Stacked Bar"
7. Klik **"Save"** → tambah ke dashboard

Hasilnya: chart volume DEX harian per protokol dalam 30 hari, tanpa satu baris SQL pun.

---

## Ekosistem dan Komunitas

Footprint memiliki fitur sosial:
- **Fork chart/dashboard** publik milik pengguna lain
- **Follow** analis favorit
- **Featured dashboards** yang dikurasi tim
- **NFT badges** untuk kontributor aktif

---

## Ringkasan

| Konsep | Penjelasan |
|--------|-----------|
| No-code mode | Buat chart dengan drag-and-drop, tanpa SQL |
| SQL mode | Query langsung ke database Footprint |
| Protocol tables | Tabel abstraksi per kategori protokol |
| Fork | Salin dan modifikasi chart/dashboard orang lain |
| GameFi analytics | Spesialisasi Footprint untuk data game blockchain |
| Multi-chain | Analisis lintas blockchain dalam satu query/chart |

---

## Tantangan Praktik

**Level 1 — Eksplorasi:**
Buka [Footprint Analytics](https://www.footprint.network). Temukan dashboard publik tentang NFT atau DeFi yang dibuat komunitas. Identifikasi: tabel apa yang digunakan, metric apa yang ditampilkan, dan chain apa yang dianalisis. Catat 3 insight menarik dari dashboard tersebut.

**Level 2 — Membuat Chart:**
Di Footprint, buat chart bar menggunakan mode no-code yang menampilkan total volume transaksi DEX per chain dalam 7 hari terakhir. Gunakan dataset \`dex_protocol\` atau yang setara. Tambahkan filter minimal satu kondisi (misal: hanya chain tier-1). Simpan chart dan bagikan link publiknya.

**Level 3 — Komparasi Platform:**
Buat analisis yang sama di Dune dan di Footprint: volume DEX harian Ethereum selama 30 hari terakhir. Di Dune gunakan tabel \`dex.trades\`. Di Footprint gunakan mode no-code. Bandingkan: waktu yang dibutuhkan, kemudahan, tampilan visualisasi, dan fleksibilitas kustomisasi. Tulis kesimpulan singkat platform mana yang lebih cocok untuk use case apa.
`;

const L_NOCODE = `# No-Code Dashboard di Footprint

**TLDR:** Fitur no-code Footprint Analytics memungkinkan siapapun membuat dashboard analitik blockchain yang profesional hanya dengan drag-and-drop — tanpa menulis satu baris SQL pun, dalam hitungan menit.

---

Kita sudah mengenal Footprint sebagai platform yang menggabungkan no-code dan SQL. Kini saatnya menguasai fitur andalannya: no-code dashboard builder. Dengan fitur ini, Anda bisa membangun dashboard analitik lengkap sebelum sempat membuka editor SQL.

---

## Apa itu No-Code Dashboard Builder?

No-code dashboard builder adalah antarmuka visual di Footprint yang memungkinkan Anda:
- **Memilih dataset** dari ratusan tabel blockchain yang sudah tersedia
- **Menarik kolom** ke area visualisasi tanpa menulis query
- **Mengkombinasikan** beberapa chart dalam satu dashboard interaktif
- **Menambah filter** global yang berlaku untuk semua chart sekaligus
- **Membagikan** dashboard ke publik atau tim dengan satu klik

Ini berbeda dari Dune di mana setiap visualisasi membutuhkan SQL query terlebih dahulu.

---

## Kapan Digunakan?

| Situasi | No-Code Cocok? |
|---------|---------------|
| Eksplorasi cepat data baru | Ya — lihat pola tanpa setup |
| Presentasi ke non-technical | Ya — visual langsung |
| Monitoring metrik rutin | Ya — set up sekali, pantau terus |
| Analisis dengan logika kompleks | Tidak — gunakan SQL mode |
| Custom calculation | Tidak — SQL lebih tepat |
| Riset untuk artikel | Ya untuk overview, SQL untuk detail |

---

## Cara Menggunakan No-Code Dashboard Builder

### Langkah 1: Membuat Chart Baru

1. Login ke Footprint Analytics
2. Klik tombol **"+ New"** di pojok kanan atas
3. Pilih **"Chart"**
4. Anda akan masuk ke Chart Editor

### Langkah 2: Memilih Dataset

Di panel kiri, pilih sumber data:

**Kategori utama:**
- **DeFi**: DEX, Lending, Yield Farming
- **NFT**: Marketplace, Collections, Minting
- **GameFi**: Games, Player stats, In-game tokens
- **Chain**: Transactions, Blocks, Addresses
- **Token**: Prices, Transfers, Holders

Contoh: pilih **NFT → NFT Marketplace Transactions**

### Langkah 3: Konfigurasi Visualisasi

Setelah dataset dipilih, Anda akan melihat:

**Area Kolom (kiri):** Semua kolom yang tersedia, contoh:
- \`block_date\` — tanggal transaksi
- \`marketplace\` — platform (OpenSea, Blur, dll)
- \`volume_usd\` — volume dalam USD
- \`trade_count\` — jumlah transaksi
- \`chain\` — blockchain

**Area Konfigurasi (tengah):**
- **X-Axis**: Drag \`block_date\` ke sini
- **Y-Axis**: Drag \`volume_usd\` ke sini
- **Group By**: Drag \`marketplace\` ke sini
- **Filter**: Klik "Add Filter" → pilih kolom dan kondisi

**Preview (kanan):** Chart langsung ter-update saat Anda mengubah konfigurasi

### Langkah 4: Memilih Tipe Chart

Footprint menyediakan berbagai tipe chart:

| Tipe | Cocok untuk |
|------|-------------|
| Line | Tren waktu (harga, volume) |
| Bar | Perbandingan antar kategori |
| Stacked Bar | Komposisi berubah seiring waktu |
| Pie/Donut | Proporsi (market share) |
| Area | Volume kumulatif |
| Scatter | Korelasi dua variabel |
| Number | Satu angka besar (KPI) |
| Table | Data tabular detail |

### Langkah 5: Menambah Filter

Filter membuat chart lebih fokus:

1. Klik **"Add Filter"** di panel kiri
2. Pilih kolom (misal: \`chain\`)
3. Pilih operator (misal: \`is\`)
4. Masukkan nilai (misal: \`ethereum\`)
5. Klik **"Apply"**

**Filter umum yang berguna:**
- \`block_date\` >= last 30 days
- \`chain\` = ethereum
- \`volume_usd\` > 1000
- \`marketplace\` in (OpenSea, Blur, X2Y2)

### Langkah 6: Membuat Dashboard

Setelah beberapa chart dibuat:

1. Klik **"+ New"** → **"Dashboard"**
2. Klik **"Add Chart"** → pilih chart yang sudah dibuat
3. Drag-resize chart sesuai tata letak yang diinginkan
4. Tambah **Text block** untuk judul dan penjelasan
5. Tambah **Filter global** yang berlaku ke semua chart

---

## Contoh: Dashboard NFT Marketplace

Langkah membuat dashboard lengkap NFT dalam 10 menit:

**Chart 1 — Volume Harian:**
- Dataset: NFT Marketplace Transactions
- X: block_date, Y: SUM(volume_usd)
- Group by: marketplace
- Tipe: Stacked Area
- Filter: last 30 days

**Chart 2 — Market Share:**
- Dataset: NFT Marketplace Transactions
- Y: SUM(volume_usd)
- Group by: marketplace
- Tipe: Pie Chart
- Filter: last 7 days

**Chart 3 — Trade Count:**
- Dataset: NFT Marketplace Transactions
- X: block_date, Y: COUNT(tx_hash)
- Group by: marketplace
- Tipe: Line

**Chart 4 — Top Collections:**
- Dataset: NFT Collection Stats
- Kolom: collection_name, volume_usd, trade_count
- Sort by: volume_usd DESC
- Tipe: Table
- Filter: last 24 hours

Gabungkan ke satu dashboard → tambah filter global **"blockchain"** → selesai.

---

## Tips Membuat Dashboard yang Baik

**Tata Letak:**
- Taruh angka KPI (Number chart) di bagian paling atas
- Line/Area chart untuk tren di tengah
- Tabel detail di bagian bawah
- Gunakan lebar penuh untuk chart tren utama

**Naming Convention:**
- Judul chart harus deskriptif: "Daily DEX Volume (Ethereum)" bukan "Chart 1"
- Sertakan satuan di judul: "(USD)", "($M)", "(# trades)"
- Tambahkan subtitle dengan periode data

**Filter Global:**
- Selalu tambahkan filter "Date Range" yang berlaku ke semua chart
- Filter "Blockchain" memudahkan komparasi multi-chain
- Jangan terlalu banyak filter — 2-3 filter global sudah cukup

---

## Berbagi dan Kolaborasi

Setelah dashboard selesai:

1. Klik **"Share"** di pojok kanan atas
2. Pilih visibility:
   - **Private**: Hanya Anda
   - **Unlisted**: Siapapun dengan link
   - **Public**: Terindeks dan dapat ditemukan
3. Salin link untuk dibagikan
4. Pengguna lain bisa **Fork** dashboard Anda untuk dimodifikasi

---

## Ringkasan

| Fitur | Fungsi |
|-------|--------|
| Chart Editor | Antarmuka visual untuk membuat chart tunggal |
| Dataset picker | Pilih sumber data dari ratusan tabel tersedia |
| Drag & drop | Konfigurasi axis dan grouping tanpa SQL |
| Filter | Batasi data berdasarkan kondisi tertentu |
| Dashboard builder | Gabungkan beberapa chart dalam satu halaman |
| Global filter | Filter yang berlaku ke semua chart dalam dashboard |
| Fork | Salin dashboard orang lain untuk dimodifikasi |

---

## Tantangan Praktik

**Level 1 — Chart Pertama:**
Di Footprint, buat sebuah line chart yang menampilkan total volume transaksi NFT harian (dalam USD) selama 30 hari terakhir menggunakan dataset NFT. Tambahkan filter agar hanya menampilkan data dari chain Ethereum. Simpan chart dengan judul yang deskriptif.

**Level 2 — Dashboard Lengkap:**
Buat dashboard "NFT Market Overview" yang berisi minimal 3 chart berbeda: (1) volume harian per marketplace sebagai stacked area chart, (2) market share marketplace bulan ini sebagai pie chart, dan (3) tabel top 10 koleksi NFT berdasarkan volume 7 hari terakhir. Tambahkan global filter untuk "Date Range". Buat dashboard publik dan salin link-nya.

**Level 3 — Dashboard DeFi Komprehensif:**
Buat dashboard "DeFi Pulse" yang memantau kesehatan ekosistem DeFi Ethereum. Dashboard harus berisi: TVL total, perubahan TVL mingguan (sebagai KPI number), TVL per protokol (top 10), volume DEX harian, dan jumlah user aktif per minggu. Gunakan hanya fitur no-code. Pastikan semua chart menggunakan data yang konsisten dan saling melengkapi. Tambahkan teks penjelasan di antara section yang berbeda.
`;

const L_SQL_FOOTPRINT = `# SQL Mode di Footprint Analytics

**TLDR:** SQL Mode di Footprint memberikan kekuatan query penuh layaknya Dune, namun dengan akses ke tabel abstraksi yang sudah dinormalisasi Footprint — sehingga Anda bisa langsung menulis analisis tanpa harus decode raw events terlebih dahulu.

---

No-code cocok untuk eksplorasi cepat dan membuat dashboard standar. Namun untuk analisis yang membutuhkan kalkulasi kustom, logika kompleks, atau penggabungan beberapa dataset, no-code tidak cukup. Untuk analisis mendalam, gunakan SQL Mode di Footprint — di sinilah kekuatan penuh platform terbuka.

---

## Apa itu SQL Mode di Footprint?

SQL Mode adalah antarmuka query berbasis teks di Footprint yang memungkinkan Anda:
- **Menulis SQL** langsung ke database Footprint
- **Mengakses tabel abstraksi** yang sudah dinormalisasi
- **Menggabungkan** beberapa tabel dengan JOIN
- **Membuat kalkulasi kustom** yang tidak bisa dilakukan di no-code
- **Menyimpan query** dan menggunakannya sebagai chart

Footprint menggunakan mesin SQL yang kompatibel dengan sintaks standar (mirip PostgreSQL/Presto), sehingga pengetahuan SQL yang sudah Anda pelajari sebelumnya dapat langsung diterapkan.

---

## Kapan Digunakan?

| Kebutuhan | No-Code | SQL Mode |
|-----------|---------|----------|
| Lihat tren dasar | Ya | Bisa, tapi overkill |
| Kalkulasi persentase | Tidak | Ya |
| Gabung dua dataset | Tidak | Ya |
| Filter kondisi kompleks | Terbatas | Penuh |
| Window functions | Tidak | Ya |
| CTE (WITH clause) | Tidak | Ya |
| Custom aggregation | Tidak | Ya |
| Debugging data | Tidak | Ya |

---

## Cara Menggunakan SQL Mode

### Langkah 1: Membuka SQL Editor

1. Di Footprint, klik **"+ New"** → **"Chart"**
2. Di Chart Editor, klik tombol **"SQL"** (atau "Switch to SQL") di bagian atas
3. Editor SQL akan muncul — Anda bisa mulai menulis query

### Langkah 2: Mengenal Tabel Footprint

Footprint memiliki tabel yang berbeda dari Dune. Berikut tabel utama:

**Tabel DeFi:**
| Tabel | Deskripsi |
|-------|-----------|
| \`dex_trades\` | Semua swap di DEX (Uniswap, Curve, dll) |
| \`lending_transactions\` | Deposit, borrow, repay, liquidation |
| \`liquidity_pool_stats\` | TVL dan fee per pool |
| \`protocol_daily_stats\` | Statistik harian per protokol |

**Tabel NFT:**
| Tabel | Deskripsi |
|-------|-----------|
| \`nft_trades\` | Semua transaksi jual-beli NFT |
| \`nft_collection_stats\` | Floor price, volume, holder count |
| \`nft_minting\` | Event minting baru |
| \`nft_transfers\` | Transfer NFT antar wallet |

**Tabel Token:**
| Tabel | Deskripsi |
|-------|-----------|
| \`token_price_daily\` | Harga penutupan harian |
| \`token_transfers\` | Transfer ERC20 |
| \`token_holder_stats\` | Distribusi holder |

**Tabel Chain:**
| Tabel | Deskripsi |
|-------|-----------|
| \`transactions\` | Transaksi on-chain |
| \`blocks\` | Data blok |
| \`addresses_stats\` | Statistik alamat |

### Langkah 3: Menulis Query Pertama

**Query sederhana — Volume DEX harian:**
\`\`\`sql
SELECT
  block_date,
  SUM(volume_usd) AS total_volume_usd,
  COUNT(*) AS trade_count
FROM dex_trades
WHERE chain = 'Ethereum'
  AND block_date >= CURRENT_DATE - INTERVAL '30' DAY
GROUP BY block_date
ORDER BY block_date DESC
\`\`\`

**Query dengan GROUP BY protokol:**
\`\`\`sql
SELECT
  protocol_name,
  SUM(volume_usd) AS total_volume_usd,
  COUNT(DISTINCT user_address) AS unique_traders
FROM dex_trades
WHERE chain = 'Ethereum'
  AND block_date >= CURRENT_DATE - INTERVAL '7' DAY
GROUP BY protocol_name
ORDER BY total_volume_usd DESC
LIMIT 10
\`\`\`

---

## Contoh Query Lanjutan

### 1. Analisis Market Share NFT Marketplace

\`\`\`sql
WITH total_volume AS (
  SELECT SUM(price_usd) AS grand_total
  FROM nft_trades
  WHERE chain = 'Ethereum'
    AND block_date >= CURRENT_DATE - INTERVAL '30' DAY
)
SELECT
  marketplace,
  SUM(price_usd) AS volume_usd,
  COUNT(*) AS trade_count,
  ROUND(
    SUM(price_usd) * 100.0 / (SELECT grand_total FROM total_volume),
    2
  ) AS market_share_pct
FROM nft_trades
WHERE chain = 'Ethereum'
  AND block_date >= CURRENT_DATE - INTERVAL '30' DAY
GROUP BY marketplace
ORDER BY volume_usd DESC
\`\`\`

### 2. Analisis TVL Lending Protocol dengan Tren

\`\`\`sql
SELECT
  block_date,
  protocol_name,
  tvl_usd,
  LAG(tvl_usd) OVER (
    PARTITION BY protocol_name
    ORDER BY block_date
  ) AS prev_tvl_usd,
  ROUND(
    (tvl_usd - LAG(tvl_usd) OVER (PARTITION BY protocol_name ORDER BY block_date))
    * 100.0
    / LAG(tvl_usd) OVER (PARTITION BY protocol_name ORDER BY block_date),
    2
  ) AS tvl_change_pct
FROM protocol_daily_stats
WHERE protocol_category = 'Lending'
  AND chain = 'Ethereum'
  AND block_date >= CURRENT_DATE - INTERVAL '14' DAY
ORDER BY block_date DESC, tvl_usd DESC
\`\`\`

### 3. Analisis Whale Activity di NFT

\`\`\`sql
SELECT
  buyer_address,
  COUNT(*) AS purchase_count,
  SUM(price_usd) AS total_spent_usd,
  AVG(price_usd) AS avg_price_usd,
  MAX(price_usd) AS max_single_purchase
FROM nft_trades
WHERE chain = 'Ethereum'
  AND block_date >= CURRENT_DATE - INTERVAL '7' DAY
  AND price_usd > 0
GROUP BY buyer_address
HAVING SUM(price_usd) > 100000  -- minimal $100K pembelian
ORDER BY total_spent_usd DESC
LIMIT 20
\`\`\`

### 4. Korelasi Harga Token dan Volume DEX

\`\`\`sql
SELECT
  d.block_date,
  SUM(d.volume_usd) AS dex_volume_usd,
  AVG(p.close_price) AS avg_eth_price
FROM dex_trades d
JOIN token_price_daily p
  ON p.token_symbol = 'ETH'
  AND p.chain = 'Ethereum'
  AND p.block_date = d.block_date
WHERE d.chain = 'Ethereum'
  AND d.block_date >= CURRENT_DATE - INTERVAL '90' DAY
GROUP BY d.block_date
ORDER BY d.block_date DESC
\`\`\`

---

## Perbedaan SQL Footprint vs SQL Dune

| Aspek | Footprint SQL | Dune SQL |
|-------|--------------|---------|
| Engine | PostgreSQL-compatible | Trino/DuneSQL |
| Tabel | Abstraksi (sudah dinormalisasi) | Raw + Spellbook |
| Backtick | Tidak diperlukan | Untuk reserved words |
| INTERVAL syntax | \`INTERVAL '30' DAY\` | \`INTERVAL '30' DAY\` |
| bytearray | Tidak ada | Ada (untuk hash) |
| 0x address | String biasa | varbinary |
| Date functions | DATE_TRUNC, CURRENT_DATE | DATE_TRUNC, NOW() |

**Keuntungan Footprint SQL:**
- Tabel lebih bersih, tidak perlu normalisasi manual
- Nama kolom intuitif (\`volume_usd\` bukan decode dari event data)
- Tidak perlu handle raw hex/bytes

**Keuntungan Dune SQL:**
- Akses data mentah yang lebih lengkap
- Spellbook dengan lebih banyak protokol
- Komunitas query yang lebih besar

---

## Tips SQL Mode Footprint

**1. Mulai dengan LIMIT:**
\`\`\`sql
SELECT * FROM nft_trades LIMIT 100
-- Selalu eksplorasi struktur tabel dulu
\`\`\`

**2. Cek nama kolom yang tersedia:**
\`\`\`sql
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'dex_trades'
ORDER BY ordinal_position
\`\`\`

**3. Handle NULL dengan COALESCE:**
\`\`\`sql
SELECT
  COALESCE(protocol_name, 'Unknown') AS protocol,
  SUM(COALESCE(volume_usd, 0)) AS volume
FROM dex_trades
GROUP BY 1
\`\`\`

**4. Gunakan filter tanggal dengan benar:**
\`\`\`sql
-- Cara yang benar di Footprint
WHERE block_date >= CURRENT_DATE - INTERVAL '30' DAY

-- Atau dengan cast eksplisit
WHERE block_date >= CAST(CURRENT_DATE - INTERVAL '30' DAY AS DATE)
\`\`\`

---

## Workflow Optimal: No-Code + SQL

Strategi terbaik di Footprint adalah menggabungkan keduanya:

1. **Eksplorasi** dengan no-code — lihat pola umum, identifikasi anomali
2. **Drill down** dengan SQL — kalkulasi detail, filter kompleks
3. **Visualisasi** gabungan dalam satu dashboard — chart no-code + chart SQL
4. **Share** ke komunitas

---

## Ringkasan

| Konsep | Penjelasan |
|--------|-----------|
| SQL Mode | Antarmuka query SQL di Footprint, PostgreSQL-compatible |
| Tabel abstraksi | Tabel Footprint yang sudah dinormalisasi, siap pakai |
| dex_trades | Tabel utama Footprint untuk data DEX |
| nft_trades | Tabel utama Footprint untuk data NFT marketplace |
| protocol_daily_stats | Statistik harian per protokol DeFi |
| COALESCE | Fungsi untuk handle nilai NULL |
| Workflow hybrid | Kombinasi no-code untuk overview + SQL untuk detail |

---

## Tantangan Praktik

**Level 1 — Query Dasar:**
Di SQL Mode Footprint, tulis query yang menampilkan top 5 DEX berdasarkan total volume USD dalam 7 hari terakhir di Ethereum. Gunakan tabel \`dex_trades\`, group by \`protocol_name\`, urutkan descending. Tampilkan juga jumlah trade dan rata-rata volume per trade.

**Level 2 — Analisis dengan CTE:**
Tulis query menggunakan CTE untuk menganalisis performa marketplace NFT. CTE pertama: hitung total volume per marketplace bulan ini. CTE kedua: hitung total volume bulan lalu. Query utama: tampilkan marketplace, volume bulan ini, volume bulan lalu, dan perubahan persentase. Urutkan berdasarkan volume bulan ini.

**Level 3 — Analisis Komprehensif:**
Buat analisis DeFi komprehensif di Footprint SQL yang menjawab pertanyaan: "Bagaimana hubungan antara harga ETH, volume DEX, dan TVL lending protocol dalam 90 hari terakhir?" Gunakan JOIN antara minimal 3 tabel (\`dex_trades\`, \`token_price_daily\`, dan \`protocol_daily_stats\`). Sertakan window functions untuk menghitung rolling average 7 hari. Jadikan hasil query sebagai chart dan masukkan ke dashboard Footprint Anda.
`;

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
