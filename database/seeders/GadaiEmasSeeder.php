<?php

namespace Database\Seeders;

use App\Models\GadaiEmas;
use Illuminate\Database\Seeder;

class GadaiEmasSeeder extends Seeder
{
    public function run()
    {
        // Data 1: Draft (belum diajukan)
        GadaiEmas::create([
            'nomor_aplikasi' => 'GA-260119-DRAFT1',
            'jenis_emas' => 'Emas Batangan',
            'berat_emas' => 10.5,
            'kadar_emas' => '99.99%',
            'no_cif' => 'CIF123456',
            'jangka_waktu' => '6 Bulan',
            'tgl_gadai' => '2026-01-19',
            'tgl_jatuh_tempo' => '2026-07-19',
            'tgl_lelang' => '2026-08-19',
            'nilai_taksiran' => 12500000,
            'nama_nasabah' => 'Sergio Pratama',
            'tempat_lahir' => 'Jakarta',
            'tgl_lahir' => '1995-08-22',
            'nama_ibu_kandung' => 'Ibu Sari',
            'gadai_ulang_otomatis' => false,
            'tujuan_transaksi' => 'Usaha',
            'sektor_ekonomi' => 'Perdagangan',
            'rubrik_jaminan' => 'Emas Murni',
            'tujuan_pinjaman' => 'Modal Usaha',
            'kepemilikan_usaha' => 'Pribadi',
            'status' => 'draft',
        ]);

        // Data 2: Sudah diajukan
        GadaiEmas::create([
            'nomor_aplikasi' => 'GA-260118-SUBMIT1',
            'jenis_emas' => 'Perhiasan Emas',
            'berat_emas' => 7.25,
            'kadar_emas' => '95%',
            'no_cif' => 'CIF789012',
            'jangka_waktu' => '3 Bulan',
            'tgl_gadai' => '2026-01-18',
            'tgl_jatuh_tempo' => '2026-04-18',
            'tgl_lelang' => '2026-05-18',
            'nilai_taksiran' => 8200000,
            'nama_nasabah' => 'Dewi Lestari',
            'tempat_lahir' => 'Bandung',
            'tgl_lahir' => '1988-03-14',
            'nama_ibu_kandung' => 'Ibu Lina',
            'gadai_ulang_otomatis' => true,
            'tujuan_transaksi' => 'Darurat',
            'sektor_ekonomi' => 'Jasa',
            'rubrik_jaminan' => 'Emas Campuran',
            'tujuan_pinjaman' => 'Kesehatan',
            'kepemilikan_usaha' => 'Tidak Ada',
            'status' => 'submitted',
        ]);

        $this->command->info('✅ 2 data Gadai Emas berhasil di-seed!');
    }
}