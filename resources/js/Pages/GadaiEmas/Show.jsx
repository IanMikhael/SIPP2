// resources/js/Pages/GadaiEmas/Show.jsx
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export default function GadaiEmasShow({ auth, gadaiEmas }) {
    // Format Rupiah
    const formatRupiah = (angka) => {
        return "Rp " + Number(angka).toLocaleString("id-ID");
    };

    // Format tanggal Indonesia
    const formatDate = (dateString) => {
        if (!dateString) return "-";
        return format(new Date(dateString), "dd MMMM yyyy", { locale: id });
    };

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title={`Detail Pengajuan - ${gadaiEmas.nomor_aplikasi}`} />

            <div className="w-full max-w-[1200px] mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                    <h2 className="text-xs lg:text-sm font-bold text-slate-800 border-l-4 border-amber-600 pl-3">
                        Detail Pengajuan: {gadaiEmas.nomor_aplikasi}
                    </h2>
                    <div className="flex gap-2">
                        <Link
                            href={`/gadai-emas/${gadaiEmas.id}/edit`}
                            className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700"
                        >
                            Edit
                        </Link>
                        <Link
                            href="/gadai-emas"
                            className="px-4 py-2 bg-slate-600 text-white text-xs font-bold rounded-lg hover:bg-slate-700"
                        >
                            Kembali
                        </Link>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    {/* Informasi Gadai Emas */}
                    <div className="p-6 border-b border-slate-200 bg-slate-50">
                        <h3 className="font-bold text-slate-700 text-sm mb-3">
                            Informasi Gadai Emas
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <InfoItem
                                label="Nomor Aplikasi"
                                value={gadaiEmas.nomor_aplikasi}
                            />
                            <InfoItem
                                label="Jenis Emas"
                                value={gadaiEmas.jenis_emas}
                            />
                            <InfoItem
                                label="Berat Emas"
                                value={`${gadaiEmas.berat_emas} gr`}
                            />
                            <InfoItem
                                label="Kadar Emas"
                                value={gadaiEmas.kadar_emas}
                            />
                            <InfoItem
                                label="Jangka Waktu"
                                value={gadaiEmas.jangka_waktu}
                            />
                            <InfoItem
                                label="Tanggal Gadai"
                                value={formatDate(gadaiEmas.tgl_gadai)}
                            />
                            <InfoItem
                                label="Tanggal Jatuh Tempo"
                                value={formatDate(gadaiEmas.tgl_jatuh_tempo)}
                            />
                            <InfoItem
                                label="Tanggal Lelang"
                                value={formatDate(gadaiEmas.tgl_lelang)}
                            />
                            <InfoItem
                                label="Nilai Taksiran"
                                value={formatRupiah(gadaiEmas.nilai_taksiran)}
                            />
                            <InfoItem
                                label="Rubrik Jaminan"
                                value={gadaiEmas.rubrik_jaminan}
                            />
                            <InfoItem
                                label="Tujuan Pinjaman"
                                value={gadaiEmas.tujuan_pinjaman || "-"}
                            />
                            <InfoItem
                                label="Status"
                                value={
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs font-bold ${
                                            gadaiEmas.status === "draft"
                                                ? "bg-gray-200 text-gray-800"
                                                : gadaiEmas.status ===
                                                    "submitted"
                                                  ? "bg-blue-100 text-blue-800"
                                                  : gadaiEmas.status ===
                                                      "approved"
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-red-100 text-red-800"
                                        }`}
                                    >
                                        {gadaiEmas.status}
                                    </span>
                                }
                            />
                        </div>
                    </div>

                    {/* Data Nasabah */}
                    <div className="p-6 border-b border-slate-200">
                        <h3 className="font-bold text-slate-700 text-sm mb-3">
                            Data Nasabah
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <InfoItem
                                label="Nama Nasabah"
                                value={gadaiEmas.nama_nasabah}
                            />
                            <InfoItem
                                label="Tempat Lahir"
                                value={gadaiEmas.tempat_lahir}
                            />
                            <InfoItem
                                label="Tanggal Lahir"
                                value={formatDate(gadaiEmas.tgl_lahir)}
                            />
                            <InfoItem
                                label="Nama Ibu Kandung"
                                value={gadaiEmas.nama_ibu_kandung}
                            />
                            <InfoItem
                                label="No CIF"
                                value={gadaiEmas.no_cif || "-"}
                            />
                            <InfoItem
                                label="NIK"
                                value={gadaiEmas.nik || "-"}
                            />
                            <InfoItem
                                label="Nomor Telepon"
                                value={gadaiEmas.nomor_telepon || "-"}
                            />
                        </div>
                    </div>

                    {/* Opsi Tambahan */}
                    <div className="p-6">
                        <h3 className="font-bold text-slate-700 text-sm mb-3">
                            Opsi Tambahan
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <InfoItem
                                label="Gadai Ulang Otomatis"
                                value={
                                    gadaiEmas.gadai_ulang_otomatis
                                        ? "Ya"
                                        : "Tidak"
                                }
                            />
                            <InfoItem
                                label="Tujuan Transaksi"
                                value={gadaiEmas.tujuan_transaksi}
                            />
                            <InfoItem
                                label="Sektor Ekonomi"
                                value={gadaiEmas.sektor_ekonomi}
                            />
                            <InfoItem
                                label="Kepemilikan Usaha"
                                value={gadaiEmas.kepemilikan_usaha}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function InfoItem({ label, value }) {
    return (
        <div className="flex">
            <span className="font-bold text-slate-600 w-48">{label}:</span>
            <span className="text-slate-800">{value}</span>
        </div>
    );
}
