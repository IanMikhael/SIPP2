<?php

namespace Database\Seeders;

use App\Models\GadaiEmas;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class GadaiEmasSeeder extends Seeder
{
    public function run()
    {
        // Kosongkan dulu (opsional)
        GadaiEmas::truncate();

        $today = Carbon::today();
        $nasabah = [
            'Ahmad Fauzi',
            'Siti Aminah',
            'Budi Santoso',
            'Dewi Lestari',
            'Rudi Hermawan',
        ];

        // 🔸 1. Data dengan jatuh tempo mendekati (1-3 hari lagi)
        foreach (range(1, 3) as $i) {
            $jatuhTempo = $today->copy()->addDays($i);
            $lelang = $jatuhTempo->copy()->addDays(7); // lelang 7 hari setelah jatuh tempo

            GadaiEmas::create([
                'nomor_aplikasi' => 'GE-' . $today->format('Ymd') . '-' . str_pad($i, 3, '0', STR_PAD_LEFT),
                'jenis_emas' => 'Emas Batangan',
                'berat_emas' => 10.5 + $i,
                'kadar_emas' => '99.99%',
                'no_cif' => 'CIF00' . $i,
                'jangka_waktu' => '6 Bulan',
                'tgl_gadai' => $today->copy()->subMonths(6),
                'tgl_jatuh_tempo' => $jatuhTempo,
                'tgl_lelang' => $lelang,
                'nilai_taksiran' => 125000000 + ($i * 10000000),
                'nama_nasabah' => $nasabah[$i - 1],
                'tempat_lahir' => 'Jakarta',
                'tgl_lahir' => '1990-01-01',
                'nama_ibu_kandung' => 'Ibu ' . $nasabah[$i - 1],
                'gadai_ulang_otomatis' => false,
                'tujuan_transaksi' => 'Usaha',
                'sektor_ekonomi' => 'Perdagangan',
                'rubrik_jaminan' => 'Emas Murni',
                'tujuan_pinjaman' => 'Modal Usaha',
                'kepemilikan_usaha' => 'Pribadi',
                'status' => 'submitted',
            ]);
        }

        // 🔸 2. Data dengan tanggal lelang HARI INI
        GadaiEmas::create([
            'nomor_aplikasi' => 'GE-' . $today->format('Ymd') . '-004',
            'jenis_emas' => 'Perhiasan Emas',
            'berat_emas' => 8.2,
            'kadar_emas' => '95%',
            'no_cif' => 'CIF004',
            'jangka_waktu' => '3 Bulan',
            'tgl_gadai' => $today->copy()->subMonths(3)->subDays(10), // lewat jatuh tempo
            'tgl_jatuh_tempo' => $today->copy()->subDays(10),
            'tgl_lelang' => $today, // 🔥 LELANG HARI INI
            'nilai_taksiran' => 85000000,
            'nama_nasabah' => 'Rina Wijaya',
            'tempat_lahir' => 'Bandung',
            'tgl_lahir' => '1985-05-15',
            'nama_ibu_kandung' => 'Ibu Rina',
            'gadai_ulang_otomatis' => false,
            'tujuan_transaksi' => 'Darurat',
            'sektor_ekonomi' => 'Jasa',
            'rubrik_jaminan' => 'Emas Campuran',
            'tujuan_pinjaman' => 'Kesehatan',
            'kepemilikan_usaha' => 'Tidak Ada',
            'status' => 'submitted',
        ]);

        // 🔸 3. Data dengan tanggal lelang BESOK
        GadaiEmas::create([
            'nomor_aplikasi' => 'GE-' . $today->format('Ymd') . '-005',
            'jenis_emas' => 'Koin Emas',
            'berat_emas' => 5.0,
            'kadar_emas' => '99.99%',
            'no_cif' => 'CIF005',
            'jangka_waktu' => '12 Bulan',
            'tgl_gadai' => $today->copy()->subMonths(12)->subDays(1),
            'tgl_jatuh_tempo' => $today->copy()->subDays(1),
            'tgl_lelang' => $today->copy()->addDay(), // 🔥 LELANG BESOK
            'nilai_taksiran' => 62000000,
            'nama_nasabah' => 'Eko Prasetyo',
            'tempat_lahir' => 'Surabaya',
            'tgl_lahir' => '1992-08-22',
            'nama_ibu_kandung' => 'Ibu Eko',
            'gadai_ulang_otomatis' => false,
            'tujuan_transaksi' => 'Konsumsi',
            'sektor_ekonomi' => 'Manufaktur',
            'rubrik_jaminan' => 'Emas Murni',
            'tujuan_pinjaman' => 'Biaya Pendidikan',
            'kepemilikan_usaha' => 'Bersama',
            'status' => 'submitted',
        ]);

        // 🔸 4. Data DRAFT (tidak muncul di notifikasi)
        GadaiEmas::create([
            'nomor_aplikasi' => 'GE-' . $today->format('Ymd') . '-006',
            'jenis_emas' => 'Emas Batangan',
            'berat_emas' => 15.0,
            'kadar_emas' => '99.99%',
            'no_cif' => null,
            'jangka_waktu' => '6 Bulan',
            'tgl_gadai' => $today,
            'tgl_jatuh_tempo' => $today->copy()->addMonths(6),
            'tgl_lelang' => null,
            'nilai_taksiran' => 187500000,
            'nama_nasabah' => 'User Draft',
            'tempat_lahir' => 'Jakarta',
            'tgl_lahir' => '1990-01-01', // ← HARUS DIISI
            'nama_ibu_kandung' => 'Ibu Draft',
            'gadai_ulang_otomatis' => false,
            'tujuan_transaksi' => 'Usaha',
            'sektor_ekonomi' => 'Perdagangan',
            'rubrik_jaminan' => 'Emas Murni',
            'tujuan_pinjaman' => 'Modal Usaha',
            'kepemilikan_usaha' => 'Pribadi',
            'status' => 'draft',
        ]);

        $this->command->info('✅ ' . GadaiEmas::count() . ' data Gadai Emas berhasil di-seed!');
    }
}