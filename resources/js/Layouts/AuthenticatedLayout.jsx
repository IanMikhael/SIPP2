import { useState } from 'react';

export default function AuthenticatedLayout({ user, children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const displayUser = user || { name: 'REDI VANHAR' };

    return (
        <div className="flex min-h-screen bg-[#f4f7f6] font-sans antialiased text-slate-700 overflow-x-hidden">
            
            {/* --- OVERLAY SIDEBAR MOBILE --- */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            {/* --- SIDEBAR RESPONSIVE (Desktop tetap, Mobile Sembunyi) --- */}
            <aside className={`
                fixed lg:sticky top-0 left-0 z-50 h-screen bg-white border-r border-slate-200 flex flex-col transition-transform duration-300
                w-64 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                <div className="p-3">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Shortcut</label>
                    <div className="flex gap-1 mt-1">
                        <input type="text" defaultValue="41010" className="flex-1 h-8 border-slate-300 text-xs rounded-lg bg-slate-50 outline-none focus:ring-1 focus:ring-teal-500 px-2" />
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
                </nav>
            </aside>

            {/* --- AREA KONTEN UTAMA --- */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* HEADER HIJAU DUA BARIS (Baris 2 bisa digeser di Mobile) */}
                <header className="bg-gradient-to-r from-[#007d3a] to-[#2d5a27] text-white shadow-md sticky top-0 z-30">
                    {/* Baris Atas: Logo & Nama App */}
                    <div className="px-4 py-3 lg:px-6 flex justify-between items-center border-b border-white/10">
                        <div className="flex gap-3 items-center overflow-hidden">
                            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden p-1.5 hover:bg-white/10 rounded-lg shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>
                            </button>
                            <div className="bg-white p-1 rounded-xl w-10 h-10 lg:w-14 lg:h-14 flex items-center justify-center shrink-0 shadow-sm">
                                <img src="/images/logo-pegadaian.png" alt="Logo" className="w-8 lg:w-12" />
                            </div>
                            <div className="overflow-hidden">
                                <h1 className="text-[10px] lg:text-lg font-bold leading-tight truncate tracking-tight">Passion (Pegadaian Application Support System)</h1>
                                <p className="text-[8px] lg:text-[10px] opacity-70 truncate uppercase font-medium">Login: {displayUser.name}</p>
                            </div>
                        </div>
                        <div className="hidden lg:block text-right shrink-0">
                            <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest leading-none">CP PALEMBANG • 10503</p>
                            <p className="text-[8px] opacity-50 italic">EXP: 20-Januari-2026</p>
                        </div>
                    </div>

                    {/* Baris Bawah: Tombol Aksi (Horizontal Scroll di Mobile agar tidak kelebaran) */}
                    <div className="flex overflow-x-auto no-scrollbar px-4 py-2 gap-1.5 items-center bg-black/5">
                        {['Klik cabang Mobile', '10503 - CP PALEMBANG', 'TugasKu (3)', 'Ganti Password', 'Keluar'].map((btn) => (
                            <button 
                                key={btn} 
                                className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-[9px] lg:text-[10px] font-bold border border-white/20 transition-all shrink-0
                                    ${btn === 'Keluar' ? 'bg-red-600 border-none hover:bg-red-700' : 'bg-white/10 hover:bg-white/20'}`}
                            >
                                {btn}
                            </button>
                        ))}
                    </div>
                </header>

                <main className="p-3 lg:p-6 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}