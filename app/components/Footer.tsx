import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-[#0A0A0B] border-t border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1">
            <Link href="/" className="text-xl font-bold text-white">
              Kids Manager
            </Link>
            <p className="mt-2 text-sm text-gray-400">
              Sistema de gerenciamento do espaço Kids do Liber Mall
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
              Links Úteis
            </h3>
            <ul className="mt-2 space-y-2">
              <li>
                <Link href="/about" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Sobre
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
              Legal
            </h3>
            <ul className="mt-2 space-y-2">
              <li>
                <Link href="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Privacidade
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Termos
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-white/5 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Liber Mall. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
} 