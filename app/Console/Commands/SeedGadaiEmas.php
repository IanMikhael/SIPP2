<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class SeedGadaiEmas extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'seed:gadai-emas';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Seed sample data for Gadai Emas';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $gadaiEmasList = [
            [
                'id' => 'de6b3e8e-1234-5678-9012-345678901001',
                'nomorAplikasi' => 'GE-20260118-001',
                'jenisEmas' => 'Emas Batangan',
                'beratEmas' => '10.5',
                'kadarEmas' => '99.99%',
                'noCif' => '001234567890',
                'jangkaWaktu' => '6 Bulan',
                'tglGadai' => '18-01-2026',
                'tglJatuhTempo' => '18-07-2026',
                'tglLelang' => '25-07-2026',
                'nilaiTaksiran' => 'Rp 12.500.000',
                'namaNasabah' => 'BUDI SANTOSO',
                'tempatLahir' => 'Palembang',
                'tglLahir' => '15-06-1980',
                'namaIbu' => 'SITI NURHALIZA',
                'gadaiUlang' => false,
                'tujuanTransaksi' => 'Usaha',
                'sektorEkonomi' => 'Perdagangan',
                'rubrikJaminan' => 'Emas Murni',
                'tujuanPinjaman' => 'Modal Usaha',
                'kepemilikanUsaha' => 'Pribadi',
                'status' => 'submitted',
                'created_at' => '2026-01-18 09:30:00',
                'updated_at' => '2026-01-18 09:30:00',
            ],
            [
                'id' => 'de6b3e8e-1234-5678-9012-345678901002',
                'nomorAplikasi' => 'GE-20260118-002',
                'jenisEmas' => 'Perhiasan Emas',
                'beratEmas' => '25.75',
                'kadarEmas' => '95%',
                'noCif' => '002345678901',
                'jangkaWaktu' => '3 Bulan',
                'tglGadai' => '17-01-2026',
                'tglJatuhTempo' => '17-04-2026',
                'tglLelang' => '24-04-2026',
                'nilaiTaksiran' => 'Rp 24.200.000',
                'namaNasabah' => 'SITI AMINAH',
                'tempatLahir' => 'Jakarta',
                'tglLahir' => '22-08-1985',
                'namaIbu' => 'HAJI NURDIN',
                'gadaiUlang' => true,
                'tujuanTransaksi' => 'Konsumsi',
                'sektorEkonomi' => 'Jasa',
                'rubrikJaminan' => 'Emas Campuran',
                'tujuanPinjaman' => 'Biaya Pendidikan',
                'kepemilikanUsaha' => 'Tidak Ada',
                'status' => 'draft',
                'created_at' => '2026-01-17 14:15:00',
                'updated_at' => '2026-01-17 14:15:00',
            ],
        ];

        // Simpan ke cache yang lebih permanen
        cache()->put('gadai_emas_list', $gadaiEmasList, now()->addDays(30));

        $this->info('✅ Gadai Emas data seeded successfully!');
        $this->line('');
        $this->table(
            ['No. Aplikasi', 'Nama Nasabah', 'Status', 'Jenis Emas'],
            array_map(fn($item) => [
                $item['nomorAplikasi'],
                $item['namaNasabah'],
                $item['status'],
                $item['jenisEmas'],
            ], $gadaiEmasList)
        );
        
        $this->info('');
        $this->info('Data tersimpan di cache dan dapat diakses di /gadai-emas');
    }
}
