<?php

namespace App\Http\Controllers;

use App\Models\GadaiEmas;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class GadaiEmasController extends Controller
{
    public function index()
    {
        $gadaiEmasList = GadaiEmas::latest()->paginate(15);
        return inertia('GadaiEmas/Index', compact('gadaiEmasList'));
    }

    public function create()
    {
        return inertia('GadaiEmas/Create');
    }

    public function store(Request $request)
    {
        Log::info('Received Gadai Emas store request', $request->all());
        
        $nilaiTaksiran = (int) preg_replace('/[^0-9]/', '', $request->nilai_taksiran);

        $data = $request->validate([
            'nomor_aplikasi' => 'required|string|unique:gadai_emas,nomor_aplikasi',
            'jenis_emas' => 'required|string',
            'berat_emas' => 'required|numeric|min:0.1|max:99999.999',
            'kadar_emas' => 'required|string',
            'no_cif' => 'nullable|string',
            'jangka_waktu' => 'required|string',
            'tgl_gadai' => 'required|date',
            'tgl_jatuh_tempo' => 'nullable|date|after:tgl_gadai',
            'tgl_lelang' => 'nullable|date|after:tgl_jatuh_tempo',
            'nilai_taksiran' => 'required|integer|min:10000',
            'nama_nasabah' => 'required|string',
            'tempat_lahir' => 'required|string',
            'tgl_lahir' => 'required|date',
            'nama_ibu_kandung' => 'required|string',
            'nik' => 'required_if:_action,submit|string|digits:16',
            'nomor_telepon' => 'required_if:_action,submit|string',
            'gadai_ulang_otomatis' => 'boolean',
            'tujuan_transaksi' => 'required|string',
            'sektor_ekonomi' => 'required|string',
            'rubrik_jaminan' => 'required|string',
            'tujuan_pinjaman' => 'nullable|string',
            'kepemilikan_usaha' => 'required|string',
            '_action' => 'required|in:draft,submit',
        ]);

        GadaiEmas::create([
            'nomor_aplikasi' => $data['nomor_aplikasi'],
            'jenis_emas' => $data['jenis_emas'],
            'berat_emas' => $data['berat_emas'],
            'kadar_emas' => $data['kadar_emas'],
            'no_cif' => $data['no_cif'] ?? null,
            'jangka_waktu' => $data['jangka_waktu'],
            'tgl_gadai' => $data['tgl_gadai'],
            'tgl_jatuh_tempo' => $data['tgl_jatuh_tempo'] ?? null,
            'tgl_lelang' => $data['tgl_lelang'] ?? null,
            'nilai_taksiran' => $nilaiTaksiran,
            'nama_nasabah' => $data['nama_nasabah'],
            'tempat_lahir' => $data['tempat_lahir'],
            'tgl_lahir' => $data['tgl_lahir'],
            'nama_ibu_kandung' => $data['nama_ibu_kandung'],
            'nik' => $data['nik'] ?? null,
            'nomor_telepon' => $data['nomor_telepon'] ?? null,
            'gadai_ulang_otomatis' => (bool) ($data['gadai_ulang_otomatis'] ?? false),
            'tujuan_transaksi' => $data['tujuan_transaksi'],
            'sektor_ekonomi' => $data['sektor_ekonomi'],
            'rubrik_jaminan' => $data['rubrik_jaminan'],
            'tujuan_pinjaman' => $data['tujuan_pinjaman'] ?? null,
            'kepemilikan_usaha' => $data['kepemilikan_usaha'],
            'status' => $data['_action'] === 'submit' ? 'submitted' : 'draft',
        ]);

        return to_route('gadai-emas.index')->with('success', 'Pengajuan berhasil disimpan.');
    }

    public function show(GadaiEmas $gadaiEmas)
    {
        return inertia('GadaiEmas/Show', compact('gadaiEmas'));
    }

    public function edit(GadaiEmas $gadaiEmas)
    {
        return inertia('GadaiEmas/Edit', compact('gadaiEmas'));
    }

    public function update(Request $request, GadaiEmas $gadaiEmas)
    {
        // Daftar field yang bisa di-update
        $updatableFields = [
            'nomor_aplikasi', 'jenis_emas', 'berat_emas', 'kadar_emas', 'no_cif',
            'jangka_waktu', 'tgl_gadai', 'tgl_jatuh_tempo', 'tgl_lelang',
            'nilai_taksiran', 'nama_nasabah', 'tempat_lahir', 'tgl_lahir',
            'nama_ibu_kandung', 'gadai_ulang_otomatis', 'tujuan_transaksi',
            'sektor_ekonomi', 'rubrik_jaminan', 'tujuan_pinjaman',
            'kepemilikan_usaha', 'nik', 'nomor_telepon'
        ];

        // Siapkan rules dan data untuk validasi
        $rules = [];
        $dataToValidate = [];

        foreach ($updatableFields as $field) {
            if ($request->has($field)) {
                $dataToValidate[$field] = $request->$field;
                
                switch ($field) {
                    case 'nomor_aplikasi':
                        $rules[$field] = 'required|string|unique:gadai_emas,nomor_aplikasi,' . $gadaiEmas->id;
                        break;
                    case 'berat_emas':
                        $rules[$field] = 'required|numeric|min:0.1|max:99999.999';
                        break;
                    case 'nilai_taksiran':
                        $rules[$field] = 'required|integer|min:10000';
                        break;
                    case 'tgl_gadai':
                        $rules[$field] = 'required|date';
                        break;
                    case 'tgl_jatuh_tempo':
                        $rules[$field] = 'nullable|date|after:tgl_gadai';
                        break;
                    case 'tgl_lelang':
                        $rules[$field] = 'nullable|date|after:tgl_jatuh_tempo';
                        break;
                    case 'nik':
                        $rules[$field] = 'required_if:_action,submit|string|digits:16';
                        break;
                    case 'nomor_telepon':
                        $rules[$field] = 'required_if:_action,submit|string';
                        break;
                    case 'gadai_ulang_otomatis':
                        $rules[$field] = 'boolean';
                        break;
                    default:
                        $rules[$field] = 'required|string';
                        break;
                }
            }
        }

        // Jika tidak ada field yang dikirim
        if (empty($dataToValidate)) {
            return to_route('gadai-emas.index')->with('info', 'Tidak ada perubahan data.');
        }

        // Validasi
        $validated = $request->validate($rules);

        // Bersihkan nilai taksiran jika ada
        if (isset($validated['nilai_taksiran'])) {
            $validated['nilai_taksiran'] = (int) preg_replace('/[^0-9]/', '', $validated['nilai_taksiran']);
        }

        // Update status jika _action dikirim
        if ($request->has('_action')) {
            $validated['status'] = $request->_action === 'submit' ? 'submitted' : 'draft';
        }

        // Lakukan update hanya pada field yang divalidasi
        $gadaiEmas->update($validated);

        return to_route('gadai-emas.index')->with('success', 'Data berhasil diperbarui.');
    }

    public function destroy(GadaiEmas $gadaiEmas)
    {
        $gadaiEmas->delete();
        return to_route('gadai-emas.index')->with('success', 'Data berhasil dihapus.');
    }
}