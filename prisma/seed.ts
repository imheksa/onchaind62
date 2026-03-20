import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const curriculum = [
  {
    title: "SQL Fundamentals",
    slug: "sql-fundamentals",
    description: "Pelajari SQL dari dasar hingga mahir. Mulai dari SELECT, JOIN, hingga Window Functions dan Query Optimization yang digunakan analis on-chain profesional.",
    icon: "🗄️",
    level: "Beginner",
    order: 1,
    modules: [
      {
        title: "Pengantar SQL Dasar",
        slug: "pengantar-sql-dasar",
        order: 1,
        lessons: [
          {
            title: "Apa itu Database Relasional?",
            slug: "apa-itu-database-relasional",
            order: 1,
            content: `# Apa itu Database Relasional?

Database relasional adalah sistem penyimpanan data yang mengorganisir informasi ke dalam **tabel** yang saling berhubungan.

## Konsep Dasar

- **Database**: Kumpulan data yang terorganisir
- **Tabel**: Struktur data dengan baris dan kolom (seperti spreadsheet)
- **Baris (Row)**: Satu record/entri data
- **Kolom (Column)**: Satu atribut/field dari data

## SQL vs NoSQL vs Blockchain Data

| Jenis | Contoh | Kegunaan |
|-------|--------|----------|
| SQL | PostgreSQL, MySQL | Data terstruktur, relasional |
| NoSQL | MongoDB, Redis | Data fleksibel, tidak terstruktur |
| Blockchain | Dune, Footprint | Data on-chain, immutable |

## Contoh Tabel

Bayangkan tabel \`transactions\` seperti ini:

| tx_hash | from_address | to_address | value | block_number |
|---------|-------------|------------|-------|-------------|
| 0xabc.. | 0x123.. | 0x456.. | 1.5 ETH | 17000000 |
| 0xdef.. | 0x789.. | 0xabc.. | 0.5 ETH | 17000001 |

Inilah bentuk dasar data blockchain yang akan kita query!`,
          },
          {
            title: "Anatomi Query SQL: SELECT, FROM, WHERE",
            slug: "anatomi-query-sql",
            order: 2,
            content: `# Anatomi Query SQL: SELECT, FROM, WHERE

## Struktur Dasar Query

\`\`\`sql
SELECT kolom1, kolom2
FROM nama_tabel
WHERE kondisi;
\`\`\`

## SELECT - Memilih Kolom

\`\`\`sql
-- Semua kolom
SELECT * FROM transactions;

-- Kolom tertentu
SELECT tx_hash, value, block_time
FROM ethereum.transactions;

-- Dengan alias
SELECT
  tx_hash AS hash,
  value / 1e18 AS eth_value
FROM ethereum.transactions;
\`\`\`

## WHERE - Filter Data

\`\`\`sql
-- Operator perbandingan
SELECT * FROM transactions
WHERE value > 1000000000000000000; -- > 1 ETH

-- BETWEEN
SELECT * FROM transactions
WHERE block_time BETWEEN '2024-01-01' AND '2024-12-31';

-- IN
SELECT * FROM tokens
WHERE symbol IN ('ETH', 'USDC', 'WBTC');

-- LIKE (pattern matching)
SELECT * FROM labels
WHERE address LIKE '0x1%';
\`\`\`

## ORDER BY - Mengurutkan

\`\`\`sql
-- Ascending (default)
SELECT * FROM transactions
ORDER BY block_time ASC;

-- Descending (terbaru dulu)
SELECT * FROM transactions
ORDER BY block_time DESC;

-- Multiple kolom
SELECT * FROM transactions
ORDER BY value DESC, block_time ASC;
\`\`\`

## LIMIT - Membatasi Hasil

\`\`\`sql
-- Ambil 100 transaksi terbaru
SELECT * FROM ethereum.transactions
ORDER BY block_time DESC
LIMIT 100;
\`\`\``,
          },
        ],
        quiz: {
          questions: [
            {
              text: "Apa fungsi dari klausa WHERE dalam SQL?",
              options: ["Memilih kolom yang ingin ditampilkan", "Memfilter baris berdasarkan kondisi tertentu", "Mengurutkan hasil query", "Menggabungkan dua tabel"],
              answer: 1,
              order: 1,
            },
            {
              text: "Query mana yang benar untuk mengambil 10 transaksi dengan nilai ETH terbesar?",
              options: [
                "SELECT * FROM transactions LIMIT 10 ORDER BY value;",
                "SELECT * FROM transactions ORDER BY value DESC LIMIT 10;",
                "SELECT TOP 10 * FROM transactions ORDER BY value DESC;",
                "SELECT * FROM transactions WHERE LIMIT = 10;",
              ],
              answer: 1,
              order: 2,
            },
            {
              text: "Operator mana yang digunakan untuk mencari nilai dalam range tertentu?",
              options: ["BETWEEN", "IN", "LIKE", "EXISTS"],
              answer: 0,
              order: 3,
            },
            {
              text: "Apa perbedaan utama antara SQL dan Blockchain data?",
              options: [
                "SQL lebih cepat dari blockchain data",
                "Blockchain data menggunakan NoSQL",
                "Blockchain data bersifat immutable dan on-chain, SQL untuk data relasional terstruktur",
                "Tidak ada perbedaan",
              ],
              answer: 2,
              order: 4,
            },
            {
              text: "Apa fungsi ORDER BY ASC?",
              options: ["Mengurutkan dari terbesar ke terkecil", "Mengurutkan dari terkecil ke terbesar", "Memfilter data ascending", "Mengelompokkan data"],
              answer: 1,
              order: 5,
            },
          ],
        },
      },
      {
        title: "Agregasi & Group BY",
        slug: "agregasi-group-by",
        order: 2,
        lessons: [
          {
            title: "Fungsi Agregat: COUNT, SUM, AVG, MAX, MIN",
            slug: "fungsi-agregat",
            order: 1,
            content: `# Fungsi Agregat

Fungsi agregat melakukan perhitungan pada sekumpulan baris dan mengembalikan satu nilai.

## COUNT - Menghitung Baris

\`\`\`sql
-- Total transaksi
SELECT COUNT(*) AS total_transaksi
FROM ethereum.transactions;

-- Hitung distinct address
SELECT COUNT(DISTINCT from_address) AS unique_senders
FROM ethereum.transactions;
\`\`\`

## SUM - Total Nilai

\`\`\`sql
-- Total volume transfer dalam ETH
SELECT SUM(value) / 1e18 AS total_eth
FROM ethereum.transactions
WHERE block_time >= CURRENT_DATE - INTERVAL '30' DAY;
\`\`\`

## AVG, MAX, MIN

\`\`\`sql
SELECT
  AVG(value) / 1e18 AS avg_eth,
  MAX(value) / 1e18 AS max_eth,
  MIN(value) / 1e18 AS min_eth
FROM ethereum.transactions
WHERE value > 0;
\`\`\`

## GROUP BY - Mengelompokkan Data

\`\`\`sql
-- Volume per hari
SELECT
  DATE_TRUNC('day', block_time) AS hari,
  COUNT(*) AS jumlah_tx,
  SUM(value) / 1e18 AS total_eth
FROM ethereum.transactions
WHERE block_time >= NOW() - INTERVAL '7' DAY
GROUP BY DATE_TRUNC('day', block_time)
ORDER BY hari;
\`\`\`

## HAVING - Filter Setelah Agregasi

\`\`\`sql
-- Address yang melakukan lebih dari 100 transaksi
SELECT
  from_address,
  COUNT(*) AS tx_count
FROM ethereum.transactions
GROUP BY from_address
HAVING COUNT(*) > 100
ORDER BY tx_count DESC;
\`\`\`

> **Perbedaan WHERE vs HAVING:**
> - WHERE memfilter **baris** sebelum agregasi
> - HAVING memfilter **grup** setelah agregasi`,
          },
        ],
        quiz: {
          questions: [
            {
              text: "Apa perbedaan antara WHERE dan HAVING dalam SQL?",
              options: [
                "Tidak ada perbedaan, keduanya sama",
                "WHERE memfilter baris sebelum agregasi, HAVING memfilter grup setelah agregasi",
                "HAVING lebih cepat dari WHERE",
                "WHERE hanya bisa digunakan dengan SELECT *",
              ],
              answer: 1,
              order: 1,
            },
            {
              text: "Query mana yang menghitung jumlah transaksi unik per address pengirim?",
              options: [
                "SELECT from_address, SUM(*) FROM transactions GROUP BY from_address;",
                "SELECT from_address, COUNT(*) FROM transactions GROUP BY from_address;",
                "SELECT COUNT(from_address) FROM transactions;",
                "SELECT from_address FROM transactions COUNT(*);",
              ],
              answer: 1,
              order: 2,
            },
            {
              text: "Fungsi apa yang digunakan untuk menghitung rata-rata nilai transaksi?",
              options: ["SUM()", "COUNT()", "AVG()", "MEAN()"],
              answer: 2,
              order: 3,
            },
            {
              text: "Bagaimana cara memfilter grup yang memiliki COUNT(*) lebih dari 10?",
              options: [
                "WHERE COUNT(*) > 10",
                "HAVING COUNT(*) > 10",
                "FILTER COUNT(*) > 10",
                "GROUP BY COUNT(*) > 10",
              ],
              answer: 1,
              order: 4,
            },
            {
              text: "COUNT(DISTINCT address) berbeda dengan COUNT(address) karena...",
              options: [
                "COUNT(DISTINCT) lebih lambat",
                "COUNT(DISTINCT) menghitung nilai unik saja, bukan semua baris",
                "COUNT(DISTINCT) tidak bisa digunakan dalam GROUP BY",
                "Tidak ada perbedaan",
              ],
              answer: 1,
              order: 5,
            },
          ],
        },
      },
    ],
  },
];

async function main() {
  console.log("🌱 Seeding database...");

  for (const courseData of curriculum) {
    const { modules, ...courseFields } = courseData;

    const course = await prisma.course.upsert({
      where: { slug: courseFields.slug },
      create: courseFields,
      update: courseFields,
    });

    console.log(`✅ Course: ${course.title}`);

    for (const moduleData of modules) {
      const { lessons, quiz, ...moduleFields } = moduleData;

      const module = await prisma.module.upsert({
        where: { courseId_slug: { courseId: course.id, slug: moduleFields.slug } },
        create: { ...moduleFields, courseId: course.id },
        update: { ...moduleFields },
      });

      console.log(`  📖 Module: ${module.title}`);

      for (const lessonData of lessons) {
        const lesson = await prisma.lesson.upsert({
          where: { moduleId_slug: { moduleId: module.id, slug: lessonData.slug } },
          create: { ...lessonData, moduleId: module.id },
          update: { ...lessonData },
        });
        console.log(`    📝 Lesson: ${lesson.title}`);
      }

      if (quiz) {
        const quizRecord = await prisma.quiz.upsert({
          where: { moduleId: module.id },
          create: { moduleId: module.id },
          update: {},
        });

        for (const q of quiz.questions) {
          await prisma.question.create({
            data: { ...q, quizId: quizRecord.id },
          }).catch(() => {}); // skip if already exists
        }
        console.log(`    📊 Quiz dengan ${quiz.questions.length} soal`);
      }
    }
  }

  console.log("✨ Seeding selesai!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
