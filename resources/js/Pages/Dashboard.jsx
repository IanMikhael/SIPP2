import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title="Proses Pengajuan Gadai" />
            
            <div className="max-w-[1200px] mx-auto">
                <h2 className="text-sm font-bold text-slate-800 mb-4 border-l-4 border-teal-600 pl-3">Proses Pengajuan Gadai</h2>

                {/* --- CARD UTAMA: INFORMASI KREDIT --- */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-6">
                    <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 font-bold text-xs text-slate-600">Informasi Kredit</div>
                    
                    <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-4">
                        {/* Kolom Kiri */}
                        <div className="space-y-3">
                            <FormRow label="Nomor Aplikasi" value="0217663241614022" isYellow />
                            <FormRow label="Produk" type="select" options={['GADAI KCA', 'GADAI TABUNGAN']} />
                            <FormRow label="Fasilitas" type="select" options={['Reguler', 'Khusus']} />
                            
                            <div className="flex items-center gap-3 pt-2">
                                <label className="w-32 text-[11px] font-bold text-slate-500">No CIF</label>
                                <div className="flex-1 flex gap-2">
                                    <input type="text" className="flex-1 h-9 border-slate-300 rounded-xl text-xs" />
                                    <span className="text-[10px] font-bold text-red-500 self-center">*(ENTER)</span>
                                    <button className="px-4 py-1 bg-slate-100 border border-slate-200 rounded-lg text-[10px] font-bold hover:bg-slate-200">Cari</button>
                                    <button className="px-4 py-1 bg-slate-100 border border-slate-200 rounded-lg text-[10px] font-bold hover:bg-slate-200">Tambah</button>
                                </div>
                            </div>

                            <FormRow label="Jangka Waktu" type="select" options={['4 Bulan', '6 Bulan']} />
                            <FormRow label="Tgl Kredit" value="21-12-2025" isYellow />
                            <FormRow label="Tgl Jatuh Tempo" isYellow />
                            <FormRow label="Tgl Lelang" isYellow />
                            <FormRow label="Tarif Khusus" type="select" options={['---Pilih---']} />
                        </div>

                        {/* Kolom Kanan */}
                        <div className="space-y-3">
                            <FormRow label="Nama Nasabah" isYellow />
                            <FormRow label="Tempat Lahir" isYellow />
                            <FormRow label="Tanggal Lahir" isYellow />
                            <FormRow label="Nama Ibu Kandung" isYellow />
                            
                            <div className="flex items-center gap-3 pt-2">
                                <label className="w-32 text-[11px] font-bold text-slate-500">Gadai Ulang Otomatis</label>
                                <input type="checkbox" className="rounded border-slate-300 text-teal-600" />
                            </div>

                            <FormRow label="Tujuan Transaksi" type="select" options={['---Pilih---']} required />
                            <FormRow label="Sektor Ekonomi" type="select" options={['---Pilih---']} required />
                            <FormRow label="Rubrik Jaminan" type="select" options={['---Pilih---']} required />
                            <FormRow label="Tujuan Kredit" type="select" options={['---Pilih---']} isLightYellow />
                            <FormRow label="Kepemilikan Usaha" type="select" options={['---Pilih---']} required />
                        </div>
                    </div>
                </div>

                {/* --- TOMBOL AKSI BAWAH --- */}
                <div className="flex gap-3 justify-start bg-slate-100/50 p-4 rounded-2xl border border-slate-200">
                    <button className="px-8 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all shadow-sm">Simpan Draft</button>
                    <button className="px-8 py-2.5 bg-slate-200 border border-slate-300 rounded-xl text-xs font-bold hover:bg-slate-300 transition-all shadow-sm">Proses Lanjut</button>
                    <button className="px-8 py-2.5 bg-[#007d3a] text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-teal-100">Proses Lanjut</button>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

// Komponen Baris Form agar kodingan bersih
function FormRow({ label, value, isYellow, isLightYellow, type = 'text', options = [], required }) {
    return (
        <div className="flex items-center gap-3">
            <label className="w-32 text-[11px] font-bold text-slate-500">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="flex-1 relative">
                {type === 'select' ? (
                    <select className={`w-full h-9 border-slate-300 rounded-xl text-xs px-3 focus:ring-1 focus:ring-teal-500 ${isLightYellow ? 'bg-yellow-50' : 'bg-slate-50'}`}>
                        {options.map(o => <option key={o}>{o}</option>)}
                    </select>
                ) : (
                    <input 
                        type="text" 
                        defaultValue={value}
                        className={`w-full h-9 border-slate-300 rounded-xl text-xs px-3 focus:ring-1 focus:ring-teal-500 shadow-sm ${isYellow ? 'bg-yellow-300/80 font-bold' : 'bg-slate-50'}`}
                    />
                )}
                {required && <span className="absolute -right-4 top-2 text-red-500 text-[10px]">*</span>}
            </div>
        </div>
    );
}