// resources/js/Pages/GadaiEmas/components/GadaiForm.jsx
import FormRow from "./FormRow";
import DateInput from "./DateInput";

const formatRupiah = (num) => {
    if (!num && num !== 0) return "Rp 0";
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(num);
};

const parseRupiah = (str) => {
    if (!str) return 0;
    const clean = str.replace(/[^0-9]/g, "");
    return clean === "" ? 0 : parseInt(clean, 10);
};

export default function GadaiForm({ formData, setFormData, errors, isEdit, onSubmit, onCancel }) {
    const handleChange = (field, value) =>
        setFormData((prev) => ({ ...prev, [field]: value }));

    return (
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="bg-slate-50 px-4 py-3 border-b font-bold text-xs text-slate-600 uppercase">
                Informasi Gadai Emas
            </div>
            <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-4">
                {/* Kolom Kiri */}
                <div className="space-y-4">
                    {isEdit && (
                        <FormRow
                            label="Nomor Aplikasi"
                            value={formData.nomorAplikasi}
                            isYellow
                            disabled
                        />
                    )}
                    <FormRow
                        label="Jenis Emas"
                        type="select"
                        options={["Emas Batangan", "Perhiasan Emas", "Koin Emas"]}
                        value={formData.jenisEmas}
                        onChange={(v) => handleChange("jenisEmas", v)}
                        error={errors.jenisEmas}
                    />
                    <FormRow
                        label="Berat Emas (gr)"
                        placeholder="Contoh: 10.5"
                        value={formData.beratEmas}
                        onChange={(v) => handleChange("beratEmas", v)}
                        required
                        error={errors.beratEmas}
                    />
                    <FormRow
                        label="Kadar Emas (%)"
                        type="select"
                        options={["99.99%", "95%", "90%", "75%"]}
                        value={formData.kadarEmas}
                        onChange={(v) => handleChange("kadarEmas", v)}
                        error={errors.kadarEmas}
                    />

                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <label className="w-32 text-[11px] font-bold text-slate-500 uppercase">No CIF</label>
                        <input
                            type="text"
                            value={formData.noCif}
                            onChange={(e) => handleChange("noCif", e.target.value)}
                            className="flex-1 h-9 border border-slate-300 rounded-xl text-xs px-3 bg-slate-50"
                            placeholder="Cari atau isi manual"
                        />
                    </div>

                    <FormRow
                        label="Jangka Waktu"
                        type="select"
                        options={["3 Bulan", "6 Bulan", "12 Bulan"]}
                        value={formData.jangkaWaktu}
                        onChange={(v) => handleChange("jangkaWaktu", v)}
                        error={errors.jangkaWaktu}
                    />

                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                        <label className="w-32 text-[11px] font-bold text-slate-500">Tgl Gadai</label>
                        <DateInput
                            value={formData.tglGadai}
                            onChange={(v) => handleChange("tglGadai", v)}
                            error={errors.tglGadai}
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                        <label className="w-32 text-[11px] font-bold text-slate-500">Tgl Jatuh Tempo</label>
                        <DateInput
                            value={formData.tglJatuhTempo}
                            onChange={(v) => handleChange("tglJatuhTempo", v)}
                            error={errors.tglJatuhTempo}
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                        <label className="w-32 text-[11px] font-bold text-slate-500">Tgl Lelang</label>
                        <DateInput
                            value={formData.tglLelang}
                            onChange={(v) => handleChange("tglLelang", v)}
                            error={errors.tglLelang}
                        />
                    </div>

                    <FormRow
                        label="Nilai Taksiran"
                        value={formatRupiah(formData.nilaiTaksiran)}
                        onChange={(v) => handleChange("nilaiTaksiran", parseRupiah(v))}
                        isYellow
                    />
                </div>

                {/* Kolom Kanan */}
                <div className="space-y-4">
                    <FormRow
                        label="Nama Nasabah"
                        value={formData.namaNasabah}
                        onChange={(v) => handleChange("namaNasabah", v)}
                        isYellow
                        required
                        error={errors.namaNasabah}
                    />
                    <FormRow
                        label="Tempat Lahir"
                        value={formData.tempatLahir}
                        onChange={(v) => handleChange("tempatLahir", v)}
                        isYellow
                        required
                        error={errors.tempatLahir}
                    />
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                        <label className="w-32 text-[11px] font-bold text-slate-500">Tanggal Lahir</label>
                        <DateInput
                            value={formData.tglLahir}
                            onChange={(v) => handleChange("tglLahir", v)}
                            error={errors.tglLahir}
                        />
                    </div>
                    <FormRow
                        label="Nama Ibu Kandung"
                        value={formData.namaIbu}
                        onChange={(v) => handleChange("namaIbu", v)}
                        isYellow
                        required
                        error={errors.namaIbu}
                    />

                    <div className="flex items-center gap-2">
                        <label className="w-32 text-[11px] font-bold text-slate-500 uppercase">Gadai Ulang</label>
                        <input
                            type="checkbox"
                            checked={formData.gadaiUlang}
                            onChange={(e) => handleChange("gadaiUlang", e.target.checked)}
                            className="w-4 h-4 text-amber-600 rounded border-slate-300"
                        />
                        <span className="text-[9px] text-slate-400 font-bold uppercase">Otomatis</span>
                    </div>

                    <FormRow
                        label="Tujuan Transaksi"
                        type="select"
                        options={["---Pilih---", "Konsumsi", "Usaha", "Darurat"]}
                        value={formData.tujuanTransaksi}
                        onChange={(v) => handleChange("tujuanTransaksi", v)}
                        required
                        error={errors.tujuanTransaksi}
                    />
                    <FormRow
                        label="Sektor Ekonomi"
                        type="select"
                        options={["---Pilih---", "Perdagangan", "Jasa", "Manufaktur"]}
                        value={formData.sektorEkonomi}
                        onChange={(v) => handleChange("sektorEkonomi", v)}
                        required
                        error={errors.sektorEkonomi}
                    />
                    <FormRow
                        label="Rubrik Jaminan"
                        type="select"
                        options={["Emas Murni", "Emas Campuran"]}
                        value={formData.rubrikJaminan}
                        onChange={(v) => handleChange("rubrikJaminan", v)}
                        required
                        error={errors.rubrikJaminan}
                    />
                    <FormRow
                        label="Tujuan Pinjaman"
                        type="select"
                        options={["---Pilih---", "Modal Usaha", "Biaya Pendidikan", "Kesehatan"]}
                        value={formData.tujuanPinjaman}
                        onChange={(v) => handleChange("tujuanPinjaman", v)}
                        isLightYellow
                        error={errors.tujuanPinjaman}
                    />
                    <FormRow
                        label="Kepemilikan Usaha"
                        type="select"
                        options={["Pribadi", "Bersama", "Tidak Ada"]}
                        value={formData.kepemilikanUsaha}
                        onChange={(v) => handleChange("kepemilikanUsaha", v)}
                        required
                        error={errors.kepemilikanUsaha}
                    />
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-start bg-slate-100/50 p-4 rounded-2xl border border-slate-200 mt-6">
                <button
                    onClick={() => onSubmit(false)}
                    className="w-full sm:w-auto px-6 py-2 bg-amber-600 text-white rounded-lg text-xs font-bold hover:bg-amber-700"
                >
                    {isEdit ? "Simpan Perubahan" : "Ajukan Gadai"}
                </button>
                <button
                    onClick={() => onSubmit(true)}
                    className="w-full sm:w-auto px-6 py-2 bg-white border border-slate-300 rounded-lg text-xs font-bold hover:bg-slate-50"
                >
                    Simpan Draft
                </button>
                <button
                    onClick={onCancel}
                    className="w-full sm:w-auto px-6 py-2 bg-slate-200 border border-slate-300 rounded-lg text-xs font-bold hover:bg-slate-300"
                >
                    Batal
                </button>
            </div>
        </div>
    );
}