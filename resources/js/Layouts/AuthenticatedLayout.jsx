// resources/js/Layouts/AuthenticatedLayout.jsx
import { useState } from "react";
import { usePage, Link } from "@inertiajs/react";

const menuItems = [
    { name: "Dashboard", route: "/dashboard" },
    { name: "Gadai Emas", route: "/gadai-emas" },
    { name: "Barang Lelang", route: "" },
    { name: "Kredit", route: "/kredit" },
    { name: "Tabungan", route: "/tabungan" },
    { name: "Treasury", route: "/treasury" },
    { name: "Pegadaian Poin", route: "/pegadaian-poin" },
    { name: "Agen", route: "/agen" },
    { name: "Digital Services", route: "/digital-services" },
    { name: "Transaksi", route: "/transaksi" },
    { name: "Pemasaran", route: "/pemasaran" },
    { name: "Kredit Bermasalah", route: "/kredit-bermasalah" },
];

export default function AuthenticatedLayout({ user, children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isNotifModalOpen, setIsNotifModalOpen] = useState(false);
    const displayUser = user || { name: "REDI VANHAR" };
    const currentUrl = usePage().url;

    // 🔸 NOTIFIKASI TERPADU: JATUH TEMPO + BARANG LELANG
    const dummyNotifications = {
        jatuh_tempo: [
            {
                id: 1,
                type: "jatuh_tempo",
                message:
                    "Pengajuan GE-20260119-001 (Budi Santoso) jatuh tempo dalam 2 hari",
                date: "2026-01-21",
                read: false,
            },
            {
                id: 2,
                type: "jatuh_tempo",
                message:
                    "Pengajuan GE-20260118-005 (Siti Aminah) jatuh tempo besok!",
                date: "2026-01-20",
                read: false,
            },
        ],
        lelang: [
            {
                id: 1,
                type: "lelang",
                message:
                    "Barang GE-20260115-003 (Ahmad Fauzi) siap dilelang hari ini!",
                date: "2026-01-19",
                read: false,
            },
            {
                id: 2,
                type: "lelang",
                message: "Barang GE-20260110-007 (Dewi Lestari) dilelang besok",
                date: "2026-01-20",
                read: false,
            },
        ],
    };

    const totalUnread = [
        ...dummyNotifications.jatuh_tempo,
        ...dummyNotifications.lelang,
    ].filter((n) => !n.read).length;

    const isActive = (route) => {
        return currentUrl === route;
    };

    return (
        <div className="flex min-h-screen bg-[#f4f7f6] font-sans antialiased text-slate-700 overflow-x-hidden">
            {/* --- OVERLAY SIDEBAR MOBILE --- */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            {/* --- SIDEBAR RESPONSIVE --- */}
            <aside
                className={`
                fixed lg:sticky top-0 left-0 z-50 h-screen bg-white border-r border-slate-200 flex flex-col transition-transform duration-300
                w-64 ${
                    isSidebarOpen
                        ? "translate-x-0"
                        : "-translate-x-full lg:translate-x-0"
                }
            `}
            >
                <div className="p-3">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                        Shortcut
                    </label>
                    <div className="flex gap-1 mt-1">
                        <input
                            type="text"
                            defaultValue="41010"
                            className="flex-1 h-8 border-slate-300 text-xs rounded-lg bg-slate-50 outline-none focus:ring-1 focus:ring-teal-500 px-2"
                        />
                        <button className="px-3 bg-slate-200 text-[10px] font-bold rounded-lg hover:bg-slate-300">
                            Cari
                        </button>
                    </div>
                </div>

                <div className="bg-slate-100 px-4 py-2 border-y border-slate-200 text-[10px] font-bold text-slate-500 uppercase">
                    Pilih Menu
                </div>

                <nav className="flex-1 overflow-y-auto p-2 space-y-0.5 text-xs custom-scrollbar">
                    {menuItems.map((item) => {
                        const active = isActive(item.route);
                        return (
                            <a
                                key={item.name}
                                href={item.route}
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                                    active
                                        ? "bg-teal-50 text-teal-700 border border-teal-100 font-bold"
                                        : "text-slate-700 hover:bg-slate-50"
                                }`}
                            >
                                <span className="text-[10px] text-slate-400">
                                    ▶
                                </span>{" "}
                                {item.name}
                            </a>
                        );
                    })}
                </nav>
            </aside>

            {/* --- AREA KONTEN UTAMA --- */}
            <div className="flex-1 flex flex-col min-w-0">
                <header className="bg-gradient-to-r from-[#007d3a] to-[#2d5a27] text-white shadow-md sticky top-0 z-30">
                    <div className="px-4 py-3 lg:px-6 flex justify-between items-center border-b border-white/10">
                        <div className="flex gap-3 items-center overflow-hidden">
                            <button
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                className="lg:hidden p-1.5 hover:bg-white/10 rounded-lg shrink-0"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                    />
                                </svg>
                            </button>
                            <div className="bg-white p-1 rounded-xl w-10 h-10 lg:w-14 lg:h-14 flex items-center justify-center shrink-0 shadow-sm">
                                <img
                                    src="/images/logo-pegadaian.png"
                                    alt="Logo"
                                    className="w-8 lg:w-12"
                                />
                            </div>
                            <div className="overflow-hidden">
                                <h1 className="text-[10px] lg:text-lg font-bold leading-tight truncate tracking-tight">
                                    Passion (Pegadaian Application Support
                                    System)
                                </h1>
                                <p className="text-[8px] lg:text-[10px] opacity-70 truncate uppercase font-medium">
                                    Login: {displayUser.name}
                                </p>
                            </div>
                        </div>
                        <div className="hidden lg:block text-right shrink-0">
                            <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest leading-none">
                                CP PALEMBANG • 10503
                            </p>
                            <p className="text-[8px] opacity-50 italic">
                                EXP: 20-Januari-2026
                            </p>
                        </div>
                    </div>

                    <div className="flex overflow-x-auto no-scrollbar px-4 py-2 gap-1.5 items-center bg-black/5">
                        {[
                            "Klik cabang Mobile",
                            "10503 - CP PALEMBANG",
                            "TugasKu (3)",
                        ].map((btn) => (
                            <button
                                key={btn}
                                className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-[9px] lg:text-[10px] font-bold border border-white/20 transition-all shrink-0 bg-white/10 hover:bg-white/20`}
                            >
                                {btn}
                            </button>
                        ))}

                        {/* --- TOMBOL NOTIFIKASI TERPADU --- */}
                        <button
                            onClick={() => setIsNotifModalOpen(true)}
                            className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-[9px] lg:text-[10px] font-bold border border-white/20 transition-all shrink-0 bg-white/10 hover:bg-white/20 relative ${
                                totalUnread > 0
                                    ? "text-yellow-300 animate-pulse"
                                    : "text-white"
                            }`}
                        >
                            Notifikasi ({totalUnread})
                            {totalUnread > 0 && (
                                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                            )}
                        </button>

                        {["Ganti Password", "Keluar"].map((btn) => (
                            <button
                                key={btn}
                                className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-[9px] lg:text-[10px] font-bold border border-white/20 transition-all shrink-0
                                    ${
                                        btn === "Keluar"
                                            ? "bg-red-600 border-none hover:bg-red-700"
                                            : "bg-white/10 hover:bg-white/20"
                                    }`}
                            >
                                {btn}
                            </button>
                        ))}
                    </div>
                </header>

                <main className="p-3 lg:p-6 overflow-y-auto">{children}</main>
            </div>

            {/* --- MODAL NOTIFIKASI TERPADU --- */}
            {isNotifModalOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-black/50 z-50"
                        onClick={() => setIsNotifModalOpen(false)}
                    ></div>
                    <div className="fixed top-16 right-4 lg:right-6 w-full max-w-md lg:max-w-sm bg-white rounded-xl shadow-2xl z-50 border border-slate-200 overflow-hidden">
                        {/* Header Modal */}
                        <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex justify-between items-center">
                            <h3 className="font-bold text-slate-700 text-sm">
                                Notifikasi Sistem
                            </h3>
                            <button
                                onClick={() => setIsNotifModalOpen(false)}
                                className="text-slate-400 hover:text-slate-600"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Konten Notifikasi */}
                        <div className="max-h-[70vh] overflow-y-auto">
                            {/* Bagian: Jatuh Tempo */}
                            {dummyNotifications.jatuh_tempo.length > 0 && (
                                <div className="p-4 border-b border-slate-100">
                                    <h4 className="font-bold text-orange-600 text-xs mb-2 flex items-center gap-1">
                                        ⚠️ Jatuh Tempo Mendekati
                                    </h4>
                                    <div className="space-y-2">
                                        {dummyNotifications.jatuh_tempo.map(
                                            (notif) => (
                                                <div
                                                    key={notif.id}
                                                    className="p-2 bg-orange-50 rounded border-l-4 border-orange-400"
                                                >
                                                    <p className="text-xs text-slate-700">
                                                        {notif.message}
                                                    </p>
                                                    <p className="text-[9px] text-slate-500 mt-1">
                                                        {new Date(
                                                            notif.date,
                                                        ).toLocaleDateString(
                                                            "id-ID",
                                                        )}
                                                    </p>
                                                </div>
                                            ),
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Bagian: Barang Lelang */}
                            {dummyNotifications.lelang.length > 0 && (
                                <div className="p-4">
                                    <h4 className="font-bold text-red-600 text-xs mb-2 flex items-center gap-1">
                                        🔥 Barang Siap Lelang
                                    </h4>
                                    <div className="space-y-2">
                                        {dummyNotifications.lelang.map(
                                            (notif) => (
                                                <div
                                                    key={notif.id}
                                                    className="p-2 bg-red-50 rounded border-l-4 border-red-400"
                                                >
                                                    <p className="text-xs text-slate-700">
                                                        {notif.message}
                                                    </p>
                                                    <p className="text-[9px] text-slate-500 mt-1">
                                                        {new Date(
                                                            notif.date,
                                                        ).toLocaleDateString(
                                                            "id-ID",
                                                        )}
                                                    </p>
                                                </div>
                                            ),
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Tidak Ada Notifikasi */}
                            {dummyNotifications.jatuh_tempo.length === 0 &&
                                dummyNotifications.lelang.length === 0 && (
                                    <div className="p-6 text-center text-slate-500 text-sm">
                                        Tidak ada notifikasi
                                    </div>
                                )}
                        </div>

                        {/* Footer */}
                        <div className="px-4 py-2 bg-slate-50 text-right border-t border-slate-100">
                            <Link
                                href="/gadai-emas"
                                className="text-[10px] text-teal-600 font-bold hover:underline"
                                onClick={() => setIsNotifModalOpen(false)}
                            >
                                Kelola Pengajuan →
                            </Link>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
