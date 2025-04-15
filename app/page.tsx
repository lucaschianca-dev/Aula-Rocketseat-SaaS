import Link from 'next/link';
import { auth } from './lib/auth';

export default async function Home() {
  const session = await auth();

  return (
    <section className="w-full min-h-[calc(100vh-64px)] flex items-center overflow-hidden bg-[#0A0A0B]">
      {/* Background com Formas */}
      <div className="absolute inset-0">
        {/* Gradiente Principal */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF3366]/20 via-transparent to-transparent" />
        
        {/* Formas Geométricas - Visíveis apenas em telas maiores */}
        <div className="hidden md:block">
          <div className="absolute top-[10%] left-[10%] w-64 h-64 rounded-full border border-pink-500/10"></div>
          <div className="absolute bottom-[10%] right-[10%] w-96 h-96 rounded-full border border-pink-500/10"></div>
          <div className="absolute top-[20%] right-[20%] w-32 h-32 border border-pink-500/10 rotate-45"></div>
          <div className="absolute bottom-[20%] left-[20%] w-48 h-48 border border-pink-500/10 -rotate-12"></div>
        </div>
        
        {/* Pontos decorativos */}
        <div className="absolute inset-0 hidden md:block" style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(255,99,102,0.1) 0%, rgba(255,99,102,0.1) 1px, transparent 1px),
            radial-gradient(circle at 80% 40%, rgba(255,99,102,0.1) 0%, rgba(255,99,102,0.1) 1px, transparent 1px),
            radial-gradient(circle at 40% 80%, rgba(255,99,102,0.1) 0%, rgba(255,99,102,0.1) 1px, transparent 1px),
            radial-gradient(circle at 70% 90%, rgba(255,99,102,0.1) 0%, rgba(255,99,102,0.1) 1px, transparent 1px)
          `
        }}></div>
      </div>
      
      {/* Content */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          {/* Texto Principal */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-pink-200 to-[#FF3366] bg-clip-text text-transparent leading-tight">
              Gerenciamento Rápido & Eficiente
            </h1>
            <div className="space-y-6 text-gray-400">
              <p className="text-lg sm:text-xl lg:text-2xl">
                Sistema completo para o espaço Kids do Liber Mall
              </p>
              <ul className="space-y-3 text-left inline-block text-sm sm:text-base">
                <li className="flex items-center">
                  <span className="text-[#FF3366] mr-2">•</span>
                  Controle total em tempo real
                </li>
                <li className="flex items-center">
                  <span className="text-[#FF3366] mr-2">•</span>
                  Gestão simplificada de acessos
                </li>
                <li className="flex items-center">
                  <span className="text-[#FF3366] mr-2">•</span>
                  Monitoramento automático de tempo
                </li>
              </ul>
              
              {!session && (
                <div className="mt-8 sm:mt-10">
                  <Link
                    href="/login"
                    className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-[#FF3366] to-[#FF4477] text-white font-medium hover:from-[#FF4477] hover:to-[#FF5588] transition-all duration-200 shadow-lg shadow-[#FF3366]/25"
                  >
                    Acessar Sistema
                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Feature Cards */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 w-full max-w-2xl lg:max-w-none mt-8 lg:mt-0">
            <div className="p-4 sm:p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all">
              <div className="w-12 h-12 rounded-full bg-[#FF3366]/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#FF3366]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-base sm:text-lg font-semibold mb-2 text-white">Controle de Tempo</div>
              <p className="text-sm sm:text-base text-gray-400">Monitore o tempo de uso de cada brinquedo automaticamente</p>
            </div>

            <div className="p-4 sm:p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all">
              <div className="w-12 h-12 rounded-full bg-[#FF3366]/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#FF3366]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="text-base sm:text-lg font-semibold mb-2 text-white">Gestão de Pagamentos</div>
              <p className="text-sm sm:text-base text-gray-400">Controle financeiro completo e simplificado</p>
            </div>

            <div className="p-4 sm:p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all sm:col-span-2 lg:col-span-1 xl:col-span-2">
              <div className="w-12 h-12 rounded-full bg-[#FF3366]/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[#FF3366]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div className="text-base sm:text-lg font-semibold mb-2 text-white">Relatórios Detalhados</div>
              <p className="text-sm sm:text-base text-gray-400">Acompanhamento completo das atividades do espaço</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
