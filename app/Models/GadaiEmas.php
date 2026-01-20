<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class GadaiEmas extends Model
{
     use HasFactory;

    protected $fillable = [
        'nomor_aplikasi',
        'jenis_emas',
        'berat_emas',
        'kadar_emas',
        'no_cif',
        'jangka_waktu',
        'tgl_gadai',
        'tgl_jatuh_tempo',
        'tgl_lelang',
        'nilai_taksiran',
        'nama_nasabah',
        'tempat_lahir',
        'tgl_lahir',
        'nama_ibu_kandung',
        'gadai_ulang_otomatis',
        'tujuan_transaksi',
        'sektor_ekonomi',
        'rubrik_jaminan',
        'tujuan_pinjaman',
        'kepemilikan_usaha',
        'status'
    ];

    protected $casts = [
        'tgl_gadai' => 'date',
        'tgl_jatuh_tempo' => 'date',
        'tgl_lelang' => 'date',
        'gadai_ulang_otomatis' => 'boolean',
        'nilai_taksiran' => 'integer',
    ];

}
