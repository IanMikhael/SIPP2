import { useState } from 'react';

export default function AuthenticatedLayout({ user, children }) {
    const displayUser = user || { name: 'REDI VANHAR' };

    return (
        <div className="flex min-h-screen bg-[#f4f7f6] font-sans antialiased text-slate-700">
            {/* --- SIDEBAR KIRI (Sama persis tata letaknya) --- */}
            <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-screen sticky top-0 overflow-hidden">
                <div className="p-3">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Shortcut</label>
                    <div className="flex gap-1 mt-1">
                        <input type="text" defaultValue="41010" className="flex-1 h-8 border-slate-300 text-xs rounded-lg bg-slate-50" />
                        <button className="px-3 bg-slate-200 text-[10px] font-bold rounded-lg hover:bg-slate-300">Cari</button>
                    </div>
                </div>

                <div className="bg-slate-100 px-4 py-2 border-y border-slate-200 text-[10px] font-bold text-slate-500 uppercase">Pilih Menu</div>
                
                <nav className="flex-1 overflow-y-auto p-2 space-y-0.5 text-xs custom-scrollbar">
                    {['Kredit', 'Tabungan', 'Treasury', 'Pegadaian Poin', 'Agen', 'Digital Services', 'Transaksi', 'Pemasaran', 'Kredit Bermasalah'].map((item) => (
                        <div key={item} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg cursor-pointer transition-all ${item === 'Kredit Bermasalah' ? 'bg-teal-50 text-teal-700 border border-teal-100 font-bold' : 'hover:bg-slate-50'}`}>
                            <span className="text-[10px] text-slate-400">▶</span> {item}
                        </div>
                    ))}
                    {/* Submenu simulasi */}
                    <div className="ml-6 space-y-1 mt-1 text-[11px] text-slate-500 opacity-80">
                        <p className="hover:text-teal-600 cursor-pointer">List Bank Rekanan</p>
                        <p className="hover:text-teal-600 cursor-pointer">Taksir Ulang Barang</p>
                    </div>
                </nav>
            </aside>

            {/* --- AREA KONTEN UTAMA --- */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* HEADER HIJAU (Sama persis tata letaknya) */}
                <header className="bg-gradient-to-r from-[#007d3a] to-[#2d5a27] text-white p-4 shadow-md">
                    <div className="flex justify-between items-start mb-3">
                        <div className="flex gap-4 items-center">
                            <div className="bg-white p-1 rounded-xl shadow-inner w-14 h-14 flex items-center justify-center">
                                <img src="/images/logo-pegadaian.png" alt="Logo" className="w-12" />
                            </div>
                            <div>
                                <h1 className="text-lg font-bold leading-tight tracking-tight">Passion (Pegadaian Application Support System Integrated Online)</h1>
                                <p className="text-[10px] opacity-80 uppercase tracking-widest font-medium">Anda Login sebagai {displayUser.name} ** (TGL EXPIRED USER: 20-Januari-2026)</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            {['Klik cabang Mobile', '10503 - CP PALEMBANG', 'TugasKu (3)', 'Ganti Password', 'Keluar'].map((btn) => (
                                <button key={btn} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border border-white/20 hover:bg-white/10 transition-all ${btn === 'Keluar' ? 'bg-red-600 border-none' : 'bg-black/20'}`}>
                                    {btn}
                                </button>
                            ))}
                        </div>
                    </div>
                </header>

                <main className="p-6 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}