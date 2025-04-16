import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-[#121212] border-t border-[#333] py-8">
      <div className="max-w-6xl mx-auto w-full px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Kids Manager</h3>
            <p className="text-sm text-gray-400">Sistema de gerenciamento do espaço Kids do Liber Mall</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase mb-3">Links Úteis</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-white hover:text-[#ff3366]">Sobre</a></li>
              <li><a href="#" className="text-sm text-white hover:text-[#ff3366]">Contato</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase mb-3">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-white hover:text-[#ff3366]">Privacidade</a></li>
              <li><a href="#" className="text-sm text-white hover:text-[#ff3366]">Termos</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[#333] text-sm text-gray-400">
          © {new Date().getFullYear()} Kids Manager. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
} 