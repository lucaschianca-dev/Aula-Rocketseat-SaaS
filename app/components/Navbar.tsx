import Link from 'next/link';
import { auth } from '../lib/auth';
import { handleAuth } from '../actions/handle-auth';

export async function Navbar() {
    const session = await auth();

    return (
        <nav className="fixed top-0 w-full bg-[#0A0A0B]/80 backdrop-blur-sm border-b border-white/10 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center">
                            <span className="text-xl font-bold bg-gradient-to-r from-white to-pink-200 bg-clip-text text-transparent">
                                Kids Manager
                            </span>
                        </Link>
                    </div>

                    <div className="flex items-center">
                        {session ? (
                            <div className="flex items-center space-x-4">
                                <span className="hidden sm:inline bg-gradient-to-r from-[#FF3366] via-[#FF4477] to-pink-200 bg-clip-text text-transparent font-medium">
                                    Olá, {session?.user?.name}
                                </span>
                                <Link
                                    href="/dashboard"
                                    className="text-gray-300 hover:text-white transition-colors px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Dashboard
                                </Link>
                                <form action={handleAuth}>
                                    <button
                                        type="submit"
                                        className="group relative px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-white text-sm font-medium transition-all duration-300 hover:cursor-pointer overflow-hidden"
                                    >
                                        <span className="relative z-10">Sair</span>
                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[#FF3366]/80 via-[#FF1744]/80 to-[#FF4081]/80"></div>
                                    </button>
                                </form>
                            </div>
                        ) :
                            <Link
                                href="/login"
                                className="px-4 py-2 rounded-full bg-[#FF3366] text-white hover:bg-[#FF4477] transition-colors"
                            >
                                Entrar
                            </Link>
                        }
                    </div>
                </div>
            </div>
        </nav>
    );
} 