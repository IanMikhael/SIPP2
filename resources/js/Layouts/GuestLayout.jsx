import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        // Background Gelap Khas Gen-Z dengan Animasi Glow
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-[#020617] relative overflow-hidden">
            
            {/* Efek Cahaya Dekoratif */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[120px]"></div>

            <div className="z-10 transition-transform hover:scale-110 duration-500">
                <Link href="/">
                    <ApplicationLogo className="w-20 h-20 fill-current text-purple-500 drop-shadow-[0_0_15px_rgba(168,85,247,0.6)]" />
                </Link>
            </div>

            {/* Kotak Form dengan Efek Kaca (Glassmorphism) */}
            <div className="z-10 w-full sm:max-w-md mt-6 px-8 py-10 bg-white/[0.03] backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden sm:rounded-3xl">
                {children}
            </div>
        </div>
    );
}