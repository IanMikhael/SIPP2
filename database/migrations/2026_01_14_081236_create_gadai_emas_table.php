<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('gadai_emas', function (Blueprint $table) {
            $table->id();
            $table->string('nomor_aplikasi')->unique();
            $table->string('jenis_emas');
            $table->decimal('berat_emas', 8, 3); // max 99999.999 gr
            $table->string('kadar_emas');
            $table->string('no_cif')->nullable();
            $table->string('jangka_waktu');
            $table->date('tgl_gadai');
            $table->date('tgl_jatuh_tempo')->nullable();
            $table->date('tgl_lelang')->nullable();
            $table->bigInteger('nilai_taksiran'); // dalam rupiah (tanpa koma)

            // Data nasabah
            $table->string('nama_nasabah');
            $table->string('tempat_lahir');
            $table->date('tgl_lahir');
            $table->string('nama_ibu_kandung');
            $table->string('nik')->nullable(); // NIK 16 digit
            $table->string('nomor_telepon')->nullable();

            // Opsi
            $table->boolean('gadai_ulang_otomatis')->default(false);
            $table->string('tujuan_transaksi');
            $table->string('sektor_ekonomi');
            $table->string('rubrik_jaminan');
            $table->string('tujuan_pinjaman')->nullable();
            $table->string('kepemilikan_usaha');

            // Status
            $table->enum('status', ['draft', 'submitted', 'approved', 'rejected'])->default('draft');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('gadai_emas');
    }
};
