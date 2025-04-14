import Link from 'next/link';
import { auth } from '../lib/auth';
import { handleAuth } from '../actions/handle-auth';

export async function Navbar() {
    const session = await auth();
    const user = session?.user;

    return (
        <nav className="fixed top-0 w-full bg-white border-b border-gray-200 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center">
                            <span className="text-xl font-bold text-gray-900">Rocket SaaS</span>
                        </Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        {session ? (
                            <div className="flex items-center space-x-4">
                                <span className="text-gray-700">
                                    Olá, {user?.name || 'Usuário'}
                                </span>
                                <Link
                                    href="/dashboard"
                                    className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Dashboard
                                </Link>
                                <form action={handleAuth}>
                                    <button
                                        type="submit"
                                        className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700"
                                        style={{ cursor: "pointer" }}
                                    >
                                        Sair
                                    </button>
                                </form>
                            </div>
                        ) : (
                            <Link
                                href="/login"
                                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                            >
                                Entrar
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
} 