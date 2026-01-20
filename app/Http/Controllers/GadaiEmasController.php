<?php

namespace App\Http\Controllers;

use App\Models\GadaiEmas;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class GadaiEmasController extends Controller
{
    public function index(Request $request)
    {
        $gadaiEmasList = GadaiEmas::latest()->paginate(15);
        return Inertia::render('GadaiEmas/Index', compact('gadaiEmasList'));
       
    }

    public function create()
    {
        return Inertia::render('GadaiEmas/Create');
    }

    public function store(Request $request)
    {
        Log::info('Received Gadai Emas store request', $request->all());
        $nilaiTaksiran = (int) preg_replace('/[^0-9]/', '', $request->nilaiTaksiran);

        $data = $request->validate([
            'nomorAplikasi' => 'required|string|unique:gadai_emas,nomor_aplikasi',
            'jenisEmas' => 'required|string',
            'beratEmas' => 'required|numeric|min:0.1|max:99999.999',
            'kadarEmas' => 'required|string',
            'noCif' => 'nullable|string',
            'jangkaWaktu' => 'required|string',
            'tglGadai' => 'required|date',
            'tglJatuhTempo' => 'nullable|date|after:tglGadai',
            'tglLelang' => 'nullable|date|after:tglJatuhTempo',
            'nilaiTaksiran' => 'required|integer|min:10000',
            'namaNasabah' => 'required|string', 
            'tempatLahir' => 'required|string', 
            'tglLahir' => 'required|date',      
            'namaIbu' => 'required|string',     
            'gadaiUlang' => 'boolean',
            'tujuanTransaksi' => 'required|string',
            'sektorEkonomi' => 'required|string',
            'rubrikJaminan' => 'required|string',
            'tujuanPinjaman' => 'nullable|string',
            'kepemilikanUsaha' => 'required|string',
            '_action' => 'required|in:draft,submit',
        ]);

        GadaiEmas::create([
            'nomor_aplikasi' => $data['nomorAplikasi'],
            'jenis_emas' => $data['jenisEmas'],
            'berat_emas' => $data['beratEmas'],
            'kadar_emas' => $data['kadarEmas'],
            'no_cif' => $data['noCif'] ?? null,
            'jangka_waktu' => $data['jangkaWaktu'],
            'tgl_gadai' => $data['tglGadai'], 
            'tgl_jatuh_tempo' => $data['tglJatuhTempo'] ?? null,
            'tgl_lelang' => $data['tglLelang'] ?? null,
            'nilai_taksiran' => $nilaiTaksiran,
            'nama_nasabah' => $data['namaNasabah'],
            'tempat_lahir' => $data['tempatLahir'],
            'tgl_lahir' => $data['tglLahir'],
            'nama_ibu_kandung' => $data['namaIbu'],
            'gadai_ulang_otomatis' => (bool) ($data['gadaiUlang'] ?? false),
            'tujuan_transaksi' => $data['tujuanTransaksi'],
            'sektor_ekonomi' => $data['sektorEkonomi'],
            'rubrik_jaminan' => $data['rubrikJaminan'],
            'tujuan_pinjaman' => $data['tujuanPinjaman'] ?? null,
            'kepemilikan_usaha' => $data['kepemilikanUsaha'],
            'status' => $data['_action'] === 'submit' ? 'submitted' : 'draft',
        ]);

        return to_route('gadai-emas.create')->with('success', 'Gadai Emas application saved successfully.');
    }

    public function show(GadaiEmas $gadaiEmas)
    {
        return Inertia::render('GadaiEmas/Show', [
            'gadaiEmas' => $gadaiEmas,
        ]);
    }

   
}