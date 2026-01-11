// import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
// import { Head } from '@inertiajs/react';

// export default function Dashboard({ auth }) {
//     return (
//         <AuthenticatedLayout user={auth?.user}>
//             <Head title="Proses Pengajuan Gadai" />
            
//             <div className="max-w-[1200px] mx-auto px-2 sm:px-0">
//                 <h2 className="text-xs lg:text-sm font-bold text-slate-800 mb-4 border-l-4 border-teal-600 pl-3">
//                     Proses Pengajuan Gadai
//                 </h2>

//                 {/* --- CARD UTAMA --- */}
//                 <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-6">
//                     <div className="bg-slate-50 px-4 lg:px-6 py-3 border-b border-slate-200 font-bold text-[10px] lg:text-xs text-slate-600 uppercase tracking-wider">
//                         Informasi Kredit
//                     </div>
                    
//                     {/* Grid yang otomatis tumpuk (1 kolom) di mobile, dan 2 kolom di desktop */}
//                     <div className="p-4 lg:p-8 grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-6 lg:gap-y-4">
                        
//                         {/* Kolom Kiri */}
//                         <div className="space-y-4 lg:space-y-3">
//                             <FormRow label="Nomor Aplikasi" value="0217663241614022" isYellow />
//                             <FormRow label="Produk" type="select" options={['GADAI KCA', 'GADAI TABUNGAN']} />
//                             <FormRow label="Fasilitas" type="select" options={['Reguler', 'Khusus']} />
                            
//                             {/* Baris No CIF yang Fleksibel */}
//                             <div className="flex flex-col sm:flex-row sm:items-center gap-2 lg:gap-3 pt-1 lg:pt-2">
//                                 <label className="w-full sm:w-32 text-[10px] lg:text-[11px] font-bold text-slate-500 shrink-0">
//                                     No CIF
//                                 </label>
//                                 <div className="flex flex-1 gap-2 items-center">
//                                     <input type="text" className="flex-1 h-9 border-slate-300 rounded-xl text-xs px-3 focus:ring-1 focus:ring-teal-500 shadow-sm bg-slate-50" />
//                                     <span className="hidden md:inline text-[10px] font-bold text-red-500 shrink-0">*(ENTER)</span>
//                                     <div className="flex gap-1 shrink-0">
//                                         <button className="px-3 lg:px-4 py-1 bg-slate-100 border border-slate-200 rounded-lg text-[9px] lg:text-[10px] font-bold hover:bg-slate-200 transition-colors">Cari</button>
//                                         <button className="px-3 lg:px-4 py-1 bg-slate-100 border border-slate-200 rounded-lg text-[9px] lg:text-[10px] font-bold hover:bg-slate-200 transition-colors">Tambah</button>
//                                     </div>
//                                 </div>
//                             </div>

//                             <FormRow label="Jangka Waktu" type="select" options={['4 Bulan', '6 Bulan']} />
//                             <FormRow label="Tgl Kredit" value="21-12-2025" isYellow />
//                             <FormRow label="Tgl Jatuh Tempo" isYellow />
//                             <FormRow label="Tgl Lelang" isYellow />
//                             <FormRow label="Tarif Khusus" type="select" options={['---Pilih---']} />
//                         </div>

//                         {/* Kolom Kanan */}
//                         <div className="space-y-4 lg:space-y-3">
//                             <FormRow label="Nama Nasabah" isYellow />
//                             <FormRow label="Tempat Lahir" isYellow />
//                             <FormRow label="Tanggal Lahir" isYellow />
//                             <FormRow label="Nama Ibu Kandung" isYellow />
                            
//                             <div className="flex items-center gap-3 py-1 lg:pt-2">
//                                 <label className="w-32 text-[10px] lg:text-[11px] font-bold text-slate-500 shrink-0">
//                                     Gadai Ulang Otomatis
//                                 </label>
//                                 <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500 cursor-pointer" />
//                             </div>

//                             <FormRow label="Tujuan Transaksi" type="select" options={['---Pilih---']} required />
//                             <FormRow label="Sektor Ekonomi" type="select" options={['---Pilih---']} required />
//                             <FormRow label="Rubrik Jaminan" type="select" options={['---Pilih---']} required />
//                             <FormRow label="Tujuan Kredit" type="select" options={['---Pilih---']} isLightYellow />
//                             <FormRow label="Kepemilikan Usaha" type="select" options={['---Pilih---']} required />
//                         </div>
//                     </div>
//                 </div>

//                 {/* --- TOMBOL AKSI BAWAH RESPONSIVE (Menyusun ke bawah di Mobile) --- */}
//                 <div className="flex flex-col sm:flex-row gap-3 justify-start bg-slate-100/50 p-4 rounded-2xl border border-slate-200 mb-10 transition-all">
//                     <button className="w-full sm:w-auto px-8 py-2.5 bg-[#007d3a] text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-teal-100 order-1 sm:order-2">
//                         Proses Lanjut
//                     </button>
//                     <button className="w-full sm:w-auto px-8 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all shadow-sm order-2 sm:order-1">
//                         Simpan Draft
//                     </button>
//                 </div>
//             </div>
//         </AuthenticatedLayout>
//     );
// }

// // Komponen Baris Form yang Cerdas
// function FormRow({ label, value, isYellow, isLightYellow, type = 'text', options = [], required }) {
//     return (
//         <div className="flex flex-col sm:flex-row sm:items-center gap-1 lg:gap-3">
//             <label className="w-full sm:w-32 text-[10px] lg:text-[11px] font-bold text-slate-500 shrink-0">
//                 {label} {required && <span className="text-red-500">*</span>}
//             </label>
//             <div className="flex-1 relative group">
//                 {type === 'select' ? (
//                     <select className={`w-full h-9 border-slate-300 rounded-xl text-xs px-3 focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition-all cursor-pointer ${isLightYellow ? 'bg-yellow-50' : 'bg-slate-50'}`}>
//                         {options.map(o => <option key={o}>{o}</option>)}
//                     </select>
//                 ) : (
//                     <input 
//                         type="text" 
//                         defaultValue={value}
//                         className={`w-full h-9 border-slate-300 rounded-xl text-xs px-3 focus:ring-1 focus:ring-teal-500 focus:border-teal-500 shadow-sm transition-all ${isYellow ? 'bg-yellow-300/80 font-bold' : 'bg-slate-50'}`}
//                     />
//                 )}
//                 {required && <span className="absolute -right-4 top-2 text-red-500 text-[10px] font-bold animate-pulse">*</span>}
//             </div>
//         </div>
//     );
// }

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title="Proses Pengajuan Gadai" />
            
            <div className="w-full max-w-[1200px] mx-auto transition-all">
                <h2 className="text-xs lg:text-sm font-bold text-slate-800 mb-4 border-l-4 border-teal-600 pl-3">
                    Proses Pengajuan Gadai
                </h2>

                {/* --- CARD UTAMA --- */}
                <div className="bg-white rounded-xl lg:rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-6">
                    <div className="bg-slate-50 px-4 lg:px-6 py-3 border-b border-slate-200 font-bold text-[10px] lg:text-xs text-slate-600 uppercase tracking-wider">
                        Informasi Kredit
                    </div>
                    
                    {/* Grid yang otomatis tumpuk (1 kolom) di mobile, dan 2 kolom di desktop */}
                    <div className="p-4 lg:p-8 grid grid-cols-1 lg:grid-cols-2 gap-x-12 xl:gap-x-16 gap-y-6 lg:gap-y-4">
                        
                        {/* Kolom Kiri */}
                        <div className="space-y-4 lg:space-y-3">
                            <FormRow label="Nomor Aplikasi" value="0217663241614022" isYellow />
                            <FormRow label="Produk" type="select" options={['GADAI KCA', 'GADAI TABUNGAN']} />
                            <FormRow label="Fasilitas" type="select" options={['Reguler', 'Khusus']} />
                            
                            {/* Baris No CIF RESPONSIVE */}
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 lg:gap-3 pt-1 lg:pt-2">
                                <label className="w-full sm:w-32 text-[10px] lg:text-[11px] font-bold text-slate-500 shrink-0 uppercase tracking-tighter">
                                    No CIF
                                </label>
                                <div className="flex flex-1 gap-2 items-center min-w-0">
                                    <input type="text" className="flex-1 h-9 border-slate-300 rounded-xl text-xs px-3 focus:ring-1 focus:ring-teal-500 shadow-sm bg-slate-50 min-w-0" />
                                    <span className="hidden xl:inline text-[9px] font-bold text-red-500 shrink-0">*(ENTER)</span>
                                    <div className="flex gap-1 shrink-0">
                                        <button className="px-2 lg:px-4 py-1 bg-slate-100 border border-slate-200 rounded-lg text-[9px] lg:text-[10px] font-bold hover:bg-slate-200">Cari</button>
                                        <button className="px-2 lg:px-4 py-1 bg-slate-100 border border-slate-200 rounded-lg text-[9px] lg:text-[10px] font-bold hover:bg-slate-200">Tambah</button>
                                    </div>
                                </div>
                            </div>

                            <FormRow label="Jangka Waktu" type="select" options={['4 Bulan', '6 Bulan']} />
                            <FormRow label="Tgl Kredit" value="21-12-2025" isYellow />
                            <FormRow label="Tgl Jatuh Tempo" isYellow />
                            <FormRow label="Tgl Lelang" isYellow />
                            <FormRow label="Tarif Khusus" type="select" options={['---Pilih---']} />
                        </div>

                        {/* Kolom Kanan */}
                        <div className="space-y-4 lg:space-y-3">
                            <FormRow label="Nama Nasabah" isYellow />
                            <FormRow label="Tempat Lahir" isYellow />
                            <FormRow label="Tanggal Lahir" isYellow />
                            <FormRow label="Nama Ibu Kandung" isYellow />
                            
                            <div className="flex items-center gap-3 py-1 lg:pt-2">
                                <label className="w-32 text-[10px] lg:text-[11px] font-bold text-slate-500 shrink-0 uppercase tracking-tighter">
                                    Gadai Ulang
                                </label>
                                <div className="flex items-center gap-2">
                                    <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500 cursor-pointer" />
                                    <span className="text-[9px] text-slate-400 font-bold uppercase">Otomatis</span>
                                </div>
                            </div>

                            <FormRow label="Tujuan Transaksi" type="select" options={['---Pilih---']} required />
                            <FormRow label="Sektor Ekonomi" type="select" options={['---Pilih---']} required />
                            <FormRow label="Rubrik Jaminan" type="select" options={['---Pilih---']} required />
                            <FormRow label="Tujuan Kredit" type="select" options={['---Pilih---']} isLightYellow />
                            <FormRow label="Kepemilikan Usaha" type="select" options={['---Pilih---']} required />
                        </div>
                    </div>
                </div>

                {/* --- TOMBOL AKSI BAWAH (Menumpuk di Mobile) --- */}
                <div className="flex flex-col sm:flex-row gap-3 justify-start bg-slate-100/50 p-4 rounded-2xl border border-slate-200 mb-10">
                    <button className="w-full sm:w-auto px-8 py-2.5 bg-[#007d3a] text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-teal-100 order-1 sm:order-2">
                        Proses Lanjut
                    </button>
                    <button className="w-full sm:w-auto px-8 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all shadow-sm order-2 sm:order-1">
                        Simpan Draft
                    </button>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function FormRow({ label, value, isYellow, isLightYellow, type = 'text', options = [], required }) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 lg:gap-3">
            <label className="w-full sm:w-32 text-[10px] lg:text-[11px] font-bold text-slate-500 shrink-0 uppercase tracking-tighter">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="flex-1 relative min-w-0">
                {type === 'select' ? (
                    <select className={`w-full h-9 border-slate-300 rounded-xl text-xs px-3 focus:ring-1 focus:ring-teal-500 transition-all ${isLightYellow ? 'bg-yellow-50' : 'bg-slate-50'}`}>
                        {options.map(o => <option key={o}>{o}</option>)}
                    </select>
                ) : (
                    <input 
                        type="text" 
                        defaultValue={value}
                        className={`w-full h-9 border-slate-300 rounded-xl text-xs px-3 focus:ring-1 focus:ring-teal-500 shadow-sm transition-all ${isYellow ? 'bg-yellow-300/80 font-bold' : 'bg-slate-50'}`}
                    />
                )}
                {required && <span className="absolute -right-3.5 top-2 text-red-500 text-[10px] font-bold">*</span>}
            </div>
        </div>
    );
}