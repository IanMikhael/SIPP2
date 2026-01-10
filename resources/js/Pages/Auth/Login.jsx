import { useEffect, useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';

export default function Login({ status }) {
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => { reset('password'); };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <div className="flex min-h-screen font-sans antialiased bg-slate-100/50 items-center justify-center p-4">
            <Head title="Masuk Ke Akun" />

            {/* Max-width dikecilkan ke 3xl agar lebih proporsional */}
            <div className="flex flex-col md:flex-row w-full max-w-3xl bg-white shadow-2xl shadow-slate-200/50 overflow-hidden rounded-3xl border border-slate-100">
                
                {/* Bagian Kiri: Form Login */}
                <div className="w-full md:w-[55%] p-8 md:p-10 flex flex-col justify-center">
                    
                    {/* --- BAGIAN LOGO PEGADAIAN --- */}
                    <div className="flex items-center justify-start -ml-14 mb-2 overflow-hidden h-16">
                        <img 
                            src="/images/logo-pegadaian.png" 
                            alt="Logo Pegadaian" 
                            className="h-24 w-auto object-contain scale-[3.5] origin-left transform-gpu"
                        />
                    </div>

                    <h1 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight mb-1">Selamat Datang</h1>
                    <p className="text-slate-400 mb-6 text-xs md:text-sm">Silakan masuk untuk mengelola akun Anda.</p>

                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <label className="text-[10px] font-bold text-slate-400 ml-1 uppercase tracking-[0.1em]">Alamat Email</label>
                            <TextInput
                                id="email"
                                type="email"
                                value={data.email}
                                className="mt-1 block w-full bg-slate-50/50 border-slate-200 rounded-2xl h-10 px-4 text-xs focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition shadow-sm"
                                placeholder="nama@perusahaan.com"
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            <InputError message={errors.email} className="mt-1 text-[10px]" />
                        </div>

                        <div>
                            <div className="flex justify-between items-center">
                                <label className="text-[10px] font-bold text-slate-400 ml-1 uppercase tracking-[0.1em]">Kata Sandi</label>
                                <Link href={route('password.request')} className="text-[10px] text-teal-600 hover:text-teal-700 font-bold">Lupa sandi?</Link>
                            </div>
                            
                            <div className="relative mt-1">
                                <TextInput
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={data.password}
                                    className="block w-full bg-slate-50/50 border-slate-200 rounded-2xl h-10 pl-4 pr-10 text-xs focus:ring-1 focus:ring-teal-500 focus:border-teal-500 transition shadow-sm"
                                    placeholder="••••••••"
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-300 hover:text-teal-600 transition-colors"
                                >
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            <InputError message={errors.password} className="mt-1 text-[10px]" />
                        </div>

                        <div className="pt-3">
                            <button
                                disabled={processing}
                                className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-2xl font-bold text-xs shadow-lg shadow-teal-100 transition-all active:scale-[0.97] disabled:opacity-50"
                            >
                                {processing ? 'Memproses...' : 'Masuk Akun'}
                            </button>
                        </div>
                    </form>

                    <p className="mt-6 text-center text-xs text-slate-400 md:hidden">
                        Belum terdaftar? <Link href={route('register')} className="text-teal-600 font-bold">Daftar</Link>
                    </p>
                </div>

                {/* Bagian Kanan: Sign Up Panel */}
                <div className="hidden md:flex w-[45%] bg-gradient-to-br from-teal-500 to-teal-700 p-8 flex-col items-center justify-center text-white text-center relative">
                    <div className="absolute top-[-10%] right-[-10%] w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
                    <div className="absolute bottom-[-10%] left-[-10%] w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
                    
                    <h2 className="text-xl font-bold mb-3 z-10">Baru di Sini?</h2>
                    <p className="text-[11px] text-teal-50/80 mb-6 leading-relaxed z-10 max-w-[180px]">
                        Dapatkan akses penuh ke seluruh layanan kami dengan mendaftar akun.
                    </p>
                    <Link
                        href={route('register')}
                        className="px-8 py-2 border border-white/30 bg-white/10 backdrop-blur-sm rounded-2xl font-bold text-[11px] hover:bg-white hover:text-teal-700 transition-all active:scale-95 shadow-lg z-10"
                    >
                        Buat Akun Baru
                    </Link>
                </div>
            </div>
        </div>
    );
}