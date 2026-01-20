// resources/js/Pages/GadaiEmas.jsx
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { useState } from "react";
import { Toaster, toast } from "sonner";

export default function GadaiEmas({ auth }) {
    // Generate tanggal hari ini dalam format YYYY-MM-DD
    const today = new Date().toISOString().split("T")[0];
    const autoNomor = "GE-" + today.replace(/-/g, "") + "-001";

    const [formData, setFormData] = useState({
        nomorAplikasi: "NEWer" + autoNomor,
        jenisEmas: "Emas Batangan",
        beratEmas: "",
        kadarEmas: "99.99%",
        noCif: "",
        jangkaWaktu: "6 Bulan",
        tglGadai: today, // ← format: YYYY-MM-DD
        tglJatuhTempo: "",
        tglLelang: "",
        nilaiTaksiran: "", // ← simpan sebagai angka (string), bukan "Rp ..."
        namaNasabah: "",
        tempatLahir: "",
        tglLahir: "",
        namaIbu: "",
        gadaiUlang: false,
        tujuanTransaksi: "",
        sektorEkonomi: "",
        rubrikJaminan: "Emas Murni",
        tujuanPinjaman: "",
        kepemilikanUsaha: "Pribadi",
    });

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    // Helper: bersihkan "Rp" dan titik dari nilai taksiran
    const cleanNilaiTaksiran = (val) => {
        return val.replace(/\D/g, ""); // hanya ambil digit
    };

    const handleSubmit = (isDraft = false, event) => {
        event?.preventDefault();
        if (!isDraft && !formData.namaNasabah) {
            toast.error("Nama Nasabah wajib diisi.");
            return;
        }

        // Siapkan payload: kirim nilai_taksiran sebagai angka
        const payload = {
            ...formData,
            nilaiTaksiran: cleanNilaiTaksiran(formData.nilaiTaksiran),
            _action: isDraft ? "draft" : "submit",
        };

        const promise = new Promise((resolve, reject) => {
            router.post("/gadai-emas/store", payload, {
                onSuccess: () => resolve(),
                onError: (errors) => {
                    const firstError = errors[Object.keys(errors)[0]];
                    reject(
                        new Error(
                            firstError ||
                                "Terjadi kesalahan saat mengirim data."
                        )
                    );
                },
            });
        });

        toast.promise(promise, {
            loading: `Sedang ${isDraft ? "menyimpan draft" : "mengajukan"}...`,
            success: isDraft
                ? "Draft berhasil disimpan!"
                : "Pengajuan gadai emas berhasil diajukan!",
            error: (err) => err.message,
        });
    };

    // Format angka ke Rupiah untuk tampilan
    const formatRupiah = (str) => {
        const clean = str.replace(/\D/g, "");
        return clean ? "Rp " + Number(clean).toLocaleString("id-ID") : "";
    };

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title="Pengajuan Gadai Emas" />
            <Toaster position="top-right" richColors />

            <div className="w-full max-w-[1200px] mx-auto transition-all">
                <h2 className="text-xs lg:text-sm font-bold text-slate-800 mb-4 border-l-4 border-amber-600 pl-3">
                    Pengajuan Gadai Emas
                </h2>

                {/* --- CARD UTAMA --- */}
                <div className="bg-white rounded-xl lg:rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-6">
                    <div className="bg-slate-50 px-4 lg:px-6 py-3 border-b border-slate-200 font-bold text-[10px] lg:text-xs text-slate-600 uppercase tracking-wider">
                        Informasi Gadai Emas
                    </div>

                    <div className="p-4 lg:p-8 grid grid-cols-1 lg:grid-cols-2 gap-x-12 xl:gap-x-16 gap-y-6 lg:gap-y-4">
                        {/* Kolom Kiri */}
                        <div className="space-y-4 lg:space-y-3">
                            <FormRow
                                label="Nomor Aplikasi"
                                value={formData.nomorAplikasi}
                                onChange={(val) =>
                                    handleChange("nomorAplikasi", val)
                                }
                                isYellow
                                disabled
                            />
                            <FormRow
                                label="Jenis Emas"
                                type="select"
                                options={[
                                    "Emas Batangan",
                                    "Perhiasan Emas",
                                    "Koin Emas",
                                ]}
                                value={formData.jenisEmas}
                                onChange={(val) =>
                                    handleChange("jenisEmas", val)
                                }
                            />
                            <FormRow
                                label="Berat Emas (gr)"
                                type="text"
                                placeholder="Contoh: 10.5"
                                value={formData.beratEmas}
                                onChange={(val) =>
                                    handleChange("beratEmas", val)
                                }
                                required={!formData.noCif}
                            />
                            <FormRow
                                label="Kadar Emas (%)"
                                type="select"
                                options={["99.99%", "95%", "90%", "75%"]}
                                value={formData.kadarEmas}
                                onChange={(val) =>
                                    handleChange("kadarEmas", val)
                                }
                            />

                            {/* Baris No CIF */}
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 lg:gap-3 pt-1 lg:pt-2">
                                <label className="w-full sm:w-32 text-[10px] lg:text-[11px] font-bold text-slate-500 shrink-0 uppercase tracking-tighter">
                                    No CIF
                                </label>
                                <div className="flex flex-1 gap-2 items-center min-w-0">
                                    <input
                                        type="text"
                                        value={formData.noCif}
                                        onChange={(e) =>
                                            handleChange(
                                                "noCif",
                                                e.target.value
                                            )
                                        }
                                        className="flex-1 h-9 border-slate-300 rounded-xl text-xs px-3 focus:ring-1 focus:ring-amber-500 shadow-sm bg-slate-50 min-w-0"
                                        placeholder="Cari atau isi manual"
                                    />
                                    <div className="flex gap-1 shrink-0">
                                        <button
                                            className="px-2 lg:px-4 py-1 bg-slate-100 border border-slate-200 rounded-lg text-[9px] lg:text-[10px] font-bold hover:bg-slate-200"
                                            onClick={() =>
                                                toast.info(
                                                    "Fitur Cari CIF belum tersedia"
                                                )
                                            }
                                        >
                                            Cari
                                        </button>
                                        <button
                                            className="px-2 lg:px-4 py-1 bg-slate-100 border border-slate-200 rounded-lg text-[9px] lg:text-[10px] font-bold hover:bg-slate-200"
                                            onClick={() =>
                                                toast.info(
                                                    "Fitur Tambah Nasabah belum tersedia"
                                                )
                                            }
                                        >
                                            Tambah
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <FormRow
                                label="Jangka Waktu"
                                type="select"
                                options={["3 Bulan", "6 Bulan", "12 Bulan"]}
                                value={formData.jangkaWaktu}
                                onChange={(val) =>
                                    handleChange("jangkaWaktu", val)
                                }
                            />
                            <FormRow
                                label="Tgl Gadai"
                                type="date"
                                value={formData.tglGadai}
                                onChange={(val) =>
                                    handleChange("tglGadai", val)
                                }
                                isYellow
                                disabled
                            />
                            <FormRow
                                label="Tgl Jatuh Tempo"
                                type="date"
                                value={formData.tglJatuhTempo}
                                onChange={(val) =>
                                    handleChange("tglJatuhTempo", val)
                                }
                                isYellow
                            />
                            <FormRow
                                label="Tgl Lelang"
                                type="date"
                                value={formData.tglLelang}
                                onChange={(val) =>
                                    handleChange("tglLelang", val)
                                }
                                isYellow
                            />
                            <FormRow
                                label="Nilai Taksiran"
                                type="currency"
                                value={formatRupiah(formData.nilaiTaksiran)}
                                onChange={(val) =>
                                    handleChange("nilaiTaksiran", val)
                                }
                                isYellow
                                disabled={false} // ← aktifkan edit jika perlu
                            />
                        </div>

                        {/* Kolom Kanan */}
                        <div className="space-y-4 lg:space-y-3">
                            <FormRow
                                label="Nama Nasabah"
                                value={formData.namaNasabah}
                                onChange={(val) =>
                                    handleChange("namaNasabah", val)
                                }
                                isYellow
                                required
                            />
                            <FormRow
                                label="Tempat Lahir"
                                value={formData.tempatLahir}
                                onChange={(val) =>
                                    handleChange("tempatLahir", val)
                                }
                                isYellow
                                required
                            />
                            <FormRow
                                label="Tanggal Lahir"
                                type="date"
                                value={formData.tglLahir}
                                onChange={(val) =>
                                    handleChange("tglLahir", val)
                                }
                                isYellow
                                required
                            />
                            <FormRow
                                label="Nama Ibu Kandung"
                                value={formData.namaIbu}
                                onChange={(val) => handleChange("namaIbu", val)}
                                isYellow
                                required
                            />

                            <div className="flex items-center gap-3 py-1 lg:pt-2">
                                <label className="w-32 text-[10px] lg:text-[11px] font-bold text-slate-500 shrink-0 uppercase tracking-tighter">
                                    Gadai Ulang
                                </label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={formData.gadaiUlang}
                                        onChange={(e) =>
                                            handleChange(
                                                "gadaiUlang",
                                                e.target.checked
                                            )
                                        }
                                        className="w-4 h-4 rounded border-slate-300 text-amber-600 focus:ring-amber-500 cursor-pointer"
                                    />
                                    <span className="text-[9px] text-slate-400 font-bold uppercase">
                                        Otomatis
                                    </span>
                                </div>
                            </div>

                            <FormRow
                                label="Tujuan Transaksi"
                                type="select"
                                options={[
                                    "---Pilih---",
                                    "Konsumsi",
                                    "Usaha",
                                    "Darurat",
                                ]}
                                value={formData.tujuanTransaksi}
                                onChange={(val) =>
                                    handleChange("tujuanTransaksi", val)
                                }
                                required
                            />
                            <FormRow
                                label="Sektor Ekonomi"
                                type="select"
                                options={[
                                    "---Pilih---",
                                    "Perdagangan",
                                    "Jasa",
                                    "Manufaktur",
                                ]}
                                value={formData.sektorEkonomi}
                                onChange={(val) =>
                                    handleChange("sektorEkonomi", val)
                                }
                                required
                            />
                            <FormRow
                                label="Rubrik Jaminan"
                                type="select"
                                options={["Emas Murni", "Emas Campuran"]}
                                value={formData.rubrikJaminan}
                                onChange={(val) =>
                                    handleChange("rubrikJaminan", val)
                                }
                                required
                            />
                            <FormRow
                                label="Tujuan Pinjaman"
                                type="select"
                                options={[
                                    "---Pilih---",
                                    "Modal Usaha",
                                    "Biaya Pendidikan",
                                    "Kesehatan",
                                ]}
                                value={formData.tujuanPinjaman}
                                onChange={(val) =>
                                    handleChange("tujuanPinjaman", val)
                                }
                                isLightYellow
                            />
                            <FormRow
                                label="Kepemilikan Usaha"
                                type="select"
                                options={["Pribadi", "Bersama", "Tidak Ada"]}
                                value={formData.kepemilikanUsaha}
                                onChange={(val) =>
                                    handleChange("kepemilikanUsaha", val)
                                }
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* --- TOMBOL AKSI BAWAH --- */}
                <div className="flex flex-col sm:flex-row gap-3 justify-start bg-slate-100/50 p-4 rounded-2xl border border-slate-200 mb-10">
                    <button
                        onClick={() => handleSubmit(false)}
                        className="w-full sm:w-auto px-8 py-2.5 bg-amber-600 text-white rounded-xl text-xs font-bold hover:bg-amber-700 transition-all shadow-lg shadow-amber-100 order-1 sm:order-2"
                    >
                        Ajukan Gadai
                    </button>
                    <button
                        onClick={() => handleSubmit(true)}
                        className="w-full sm:w-auto px-8 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all shadow-sm order-2 sm:order-1"
                    >
                        Simpan Draft
                    </button>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

// ─── Komponen FormRow Reusable ───────────────────────────────────────
function FormRow({
    label,
    value,
    onChange,
    placeholder,
    isYellow,
    isLightYellow,
    type = "text",
    options = [],
    required = false,
    disabled = false,
}) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 lg:gap-3">
            <label className="w-full sm:w-32 text-[10px] lg:text-[11px] font-bold text-slate-500 shrink-0 uppercase tracking-tighter">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="flex-1 relative min-w-0">
                {type === "select" ? (
                    <select
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        disabled={disabled}
                        className={`w-full h-9 border-slate-300 rounded-xl text-xs px-3 focus:ring-1 focus:ring-amber-500 transition-all ${
                            isLightYellow ? "bg-yellow-50" : "bg-slate-50"
                        }`}
                    >
                        {options.map((o) => (
                            <option key={o} value={o}>
                                {o}
                            </option>
                        ))}
                    </select>
                ) : type === "date" ? (
                    <input
                        type="date"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        disabled={disabled}
                        className={`w-full h-9 border-slate-300 rounded-xl text-xs px-3 focus:ring-1 focus:ring-amber-500 shadow-sm transition-all ${
                            isYellow
                                ? "bg-yellow-300/80 font-bold"
                                : "bg-slate-50"
                        }`}
                    />
                ) : type === "currency" ? (
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={placeholder}
                        disabled={disabled}
                        className={`w-full h-9 border-slate-300 rounded-xl text-xs px-3 focus:ring-1 focus:ring-amber-500 shadow-sm transition-all ${
                            isYellow
                                ? "bg-yellow-300/80 font-bold"
                                : "bg-slate-50"
                        }`}
                    />
                ) : (
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={placeholder}
                        disabled={disabled}
                        className={`w-full h-9 border-slate-300 rounded-xl text-xs px-3 focus:ring-1 focus:ring-amber-500 shadow-sm transition-all ${
                            isYellow
                                ? "bg-yellow-300/80 font-bold"
                                : "bg-slate-50"
                        }`}
                    />
                )}
                {required && !value && (
                    <span className="absolute -right-3.5 top-2 text-red-500 text-[10px] font-bold">
                        *
                    </span>
                )}
            </div>
        </div>
    );
}
