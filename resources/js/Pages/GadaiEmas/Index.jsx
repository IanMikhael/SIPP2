// resources/js/Pages/GadaiEmas/Index.jsx
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";
import { Toaster, toast } from "sonner";

export default function GadaiEmasIndex({ auth, gadaiEmasList }) {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    // Filter data di frontend (opsional — bisa dipindah ke backend)
    const filteredData = gadaiEmasList.data.filter((item) => {
        const matchesSearch =
            item.nomor_aplikasi.toLowerCase().includes(search.toLowerCase()) ||
            (item.nama_nasabah &&
                item.nama_nasabah.toLowerCase().includes(search.toLowerCase()));
        const matchesStatus =
            statusFilter === "all" || item.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleDelete = (id, nomor) => {
        if (!confirm(`Yakin hapus pengajuan ${nomor}?`)) return;

        router.delete(`/gadai-emas/${id}`, {
            onSuccess: () => {
                toast.success("Data berhasil dihapus");
            },
            onError: () => {
                toast.error("Gagal menghapus data");
            },
        });
    };

    // Format Rupiah
    const formatRupiah = (angka) => {
        if (!angka && angka !== 0) return "-";
        return "Rp " + Number(angka).toLocaleString("id-ID");
    };

    // Cek apakah jatuh tempo ≤ 3 hari
    const isJatuhTempoDekat = (tglJatuhTempo) => {
        if (!tglJatuhTempo) return false;
        const today = new Date();
        const jatuhTempo = new Date(tglJatuhTempo);
        const diffTime = jatuhTempo - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays >= 0 && diffDays <= 3;
    };

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title="Daftar Pengajuan Gadai Emas" />
            <Toaster position="top-right" richColors />

            <div className="w-full max-w-[1400px] mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                    <h2 className="text-xs lg:text-sm font-bold text-slate-800 border-l-4 border-amber-600 pl-3">
                        Daftar Pengajuan Gadai Emas
                    </h2>
                    <Link
                        href="/gadai-emas/create"
                        className="px-4 py-2 bg-amber-600 text-white text-xs font-bold rounded-lg hover:bg-amber-700 shadow-sm whitespace-nowrap"
                    >
                        + Ajukan Baru
                    </Link>
                </div>

                {/* Filter & Search */}
                <div className="bg-white rounded-xl p-4 mb-6 border border-slate-200">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="text-[10px] text-slate-500 uppercase tracking-tight block mb-1">
                                Cari Nomor/Nasabah
                            </label>
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Contoh: GE-2026 atau Budi"
                                className="w-full h-9 border-slate-300 rounded-lg text-xs px-3 focus:ring-1 focus:ring-amber-500"
                            />
                        </div>
                        <div>
                            <label className="text-[10px] text-slate-500 uppercase tracking-tight block mb-1">
                                Status
                            </label>
                            <select
                                value={statusFilter}
                                onChange={(e) =>
                                    setStatusFilter(e.target.value)
                                }
                                className="w-full h-9 border-slate-300 rounded-lg text-xs px-3 focus:ring-1 focus:ring-amber-500"
                            >
                                <option value="all">Semua</option>
                                <option value="draft">Draft</option>
                                <option value="submitted">Diajukan</option>
                                <option value="approved">Disetujui</option>
                                <option value="rejected">Ditolak</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Tabel Data */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    {filteredData.length === 0 ? (
                        <div className="p-8 text-center text-slate-500">
                            Tidak ada data pengajuan.
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-slate-200 text-xs">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th className="px-4 py-2 text-left text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                                            No
                                        </th>
                                        <th className="px-4 py-2 text-left text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                                            Nomor
                                        </th>
                                        <th className="px-4 py-2 text-left text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                                            Nasabah
                                        </th>
                                        <th className="px-4 py-2 text-left text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                                            Jenis
                                        </th>
                                        <th className="px-4 py-2 text-left text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                                            Berat (gr)
                                        </th>
                                        <th className="px-4 py-2 text-left text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                                            Tgl Jatuh Tempo
                                        </th>
                                        <th className="px-4 py-2 text-left text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                                            Nilai Taksiran
                                        </th>
                                        <th className="px-4 py-2 text-left text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-4 py-2 text-left text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {filteredData.map((item, index) => (
                                        <tr
                                            key={item.id}
                                            className={
                                                isJatuhTempoDekat(
                                                    item.tgl_jatuh_tempo,
                                                )
                                                    ? "bg-orange-50"
                                                    : "hover:bg-slate-50"
                                            }
                                        >
                                            <td className="px-4 py-2">
                                                {index + 1}
                                            </td>
                                            <td className="px-4 py-2 font-mono font-bold">
                                                {item.nomor_aplikasi}
                                            </td>
                                            <td className="px-4 py-2">
                                                {item.nama_nasabah || "-"}
                                            </td>
                                            <td className="px-4 py-2">
                                                {item.jenis_emas}
                                            </td>
                                            <td className="px-4 py-2">
                                                {item.berat_emas}
                                            </td>
                                            <td
                                                className={`px-4 py-2 ${isJatuhTempoDekat(item.tgl_jatuh_tempo) ? "text-orange-600 font-bold" : ""}`}
                                            >
                                                {item.tgl_jatuh_tempo || "-"}
                                            </td>
                                            <td className="px-4 py-2">
                                                {formatRupiah(
                                                    item.nilai_taksiran,
                                                )}
                                            </td>
                                            <td className="px-4 py-2">
                                                <span
                                                    className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                                                        item.status === "draft"
                                                            ? "bg-gray-200 text-gray-800"
                                                            : item.status ===
                                                                "submitted"
                                                              ? "bg-blue-100 text-blue-800"
                                                              : item.status ===
                                                                  "approved"
                                                                ? "bg-green-100 text-green-800"
                                                                : "bg-red-100 text-red-800"
                                                    }`}
                                                >
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-2">
                                                <div className="flex gap-1">
                                                    <Link
                                                        href={`/gadai-emas/${item.id}`}
                                                        className="px-2 py-1 bg-slate-100 text-[10px] rounded hover:bg-slate-200"
                                                    >
                                                        Lihat
                                                    </Link>
                                                    <Link
                                                        href={`/gadai-emas/${item.id}/edit`}
                                                        className="px-2 py-1 bg-slate-100 text-[10px] rounded hover:bg-slate-200"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                item.id,
                                                                item.nomor_aplikasi,
                                                            )
                                                        }
                                                        className="px-2 py-1 bg-red-100 text-[10px] text-red-700 rounded hover:bg-red-200"
                                                    >
                                                        Hapus
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {gadaiEmasList.last_page > 1 && (
                    <div className="mt-4 flex justify-center">
                        <nav className="inline-flex rounded-md shadow-sm">
                            {gadaiEmasList.links.map((link, i) => (
                                <button
                                    key={i}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                    onClick={() =>
                                        link.url && router.get(link.url)
                                    }
                                    disabled={!link.url}
                                    className={`px-3 py-1 text-xs ${
                                        link.active
                                            ? "bg-amber-600 text-white"
                                            : link.url
                                              ? "text-slate-700 hover:bg-slate-100"
                                              : "text-slate-400 cursor-not-allowed"
                                    }`}
                                />
                            ))}
                        </nav>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
