<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use App\Models\GadaiEmas;
use Carbon\Carbon;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        // Ambil data notifikasi hanya jika user login
        $notifications = [
            'jatuh_tempo' => [],
            'lelang' => [],
        ];

        if ($request->user()) {
            $today = Carbon::today();

            // Notifikasi jatuh tempo (1-3 hari ke depan)
            $notifications['jatuh_tempo'] = GadaiEmas::where('status', 'submitted')
                ->whereBetween('tgl_jatuh_tempo', [$today, $today->copy()->addDays(3)])
                ->orderBy('tgl_jatuh_tempo')
                ->limit(5)
                ->get()
                ->map(fn ($g) => [
                    'id' => $g->id,
                    'nomor_aplikasi' => $g->nomor_aplikasi,
                    'nama_nasabah' => $g->nama_nasabah,
                    'tgl_jatuh_tempo' => $g->tgl_jatuh_tempo->format('Y-m-d'),
                    'message' => "Pengajuan {$g->nomor_aplikasi} jatuh tempo dalam " . 
                                max(0, $today->diffInDays($g->tgl_jatuh_tempo, false)) . " hari",
                ])
                ->values();

            // Notifikasi barang lelang (kemarin, hari ini, besok)
            $notifications['lelang'] = GadaiEmas::where('status', 'submitted')
                ->whereBetween('tgl_lelang', [$today->copy()->subDay(), $today->copy()->addDay()])
                ->orderBy('tgl_lelang')
                ->limit(5)
                ->get()
                ->map(fn ($g) => [
                    'id' => $g->id,
                    'nomor_aplikasi' => $g->nomor_aplikasi,
                    'nama_nasabah' => $g->nama_nasabah,
                    'tgl_lelang' => $g->tgl_lelang->format('Y-m-d'),
                    'message' => "Barang {$g->nomor_aplikasi} dilelang " . 
                                ($g->tgl_lelang->isToday() ? 'hari ini' : 
                                 ($g->tgl_lelang->isYesterday() ? 'kemarin' : 'besok')),
                ])
                ->values();
        }

        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user(),
            ],
            'notifications' => $notifications, // ← tambahkan di sini
        ]);
    }
}