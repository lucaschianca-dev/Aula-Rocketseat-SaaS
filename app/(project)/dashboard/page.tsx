import { AdminOnly } from "@/app/components/AdminOnly";
import { auth } from "@/app/lib/auth";
import { db } from "@/app/lib/firebase";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Dashboard() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  // Verificar o papel do usuário do lado do servidor
  let userRole = 'employee'; // Papel padrão
  if (session?.user?.email) {
    const userDoc = await db
      .collection('users')
      .where('email', '==', session.user.email)
      .get();

    const userData = userDoc.docs[0]?.data();
    if (userData?.role) {
      userRole = userData.role;
    }
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-10">
      {/* Header Section */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white via-pink-200 to-[#FF3366] bg-clip-text text-transparent">
          Dashboard Kids
        </h1>
        <p className="text-sm sm:text-base text-gray-400 mt-2">
          Bem-vindo(a) de volta, {session?.user?.name || session?.user?.email}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="p-4 sm:p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#FF3366]/10 flex items-center justify-center">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF3366]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <span className="text-xl sm:text-2xl font-bold text-white">28</span>
          </div>
          <h3 className="text-sm sm:text-base text-white font-medium">Crianças Registradas</h3>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">Hoje</p>
        </div>

        <div className="p-4 sm:p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#FF3366]/10 flex items-center justify-center">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF3366]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-xl sm:text-2xl font-bold text-white">R$ 1.2k</span>
          </div>
          <h3 className="text-sm sm:text-base text-white font-medium">Faturamento</h3>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">Últimas 24h</p>
        </div>

        <div className="p-4 sm:p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#FF3366]/10 flex items-center justify-center">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF3366]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-xl sm:text-2xl font-bold text-white">45m</span>
          </div>
          <h3 className="text-sm sm:text-base text-white font-medium">Tempo Médio</h3>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">Por criança</p>
        </div>

        <div className="p-4 sm:p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#FF3366]/10 flex items-center justify-center">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF3366]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <span className="text-xl sm:text-2xl font-bold text-white">12</span>
          </div>
          <h3 className="text-sm sm:text-base text-white font-medium">Em Atividade</h3>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">Agora</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-6 mb-6 sm:mb-8">
        <button className="p-3 sm:p-4 rounded-xl bg-gradient-to-r from-[#FF3366] to-[#FF4477] text-white font-medium hover:from-[#FF4477] hover:to-[#FF5588] transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base">
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Novo Registro
        </button>

        <button className="p-3 sm:p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-white font-medium hover:bg-white/10 transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base">
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          Gerar Relatório
        </button>

        <button className="p-3 sm:p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-white font-medium hover:bg-white/10 transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base xs:col-span-2 sm:col-span-1">
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Configurações
        </button>
      </div>

      {/* Recent Activity */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Atividade Recente</h2>
        <div className="space-y-3 sm:space-y-4">
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="flex items-center justify-between p-3 sm:p-4 rounded-xl bg-white/5">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#FF3366]/10 flex items-center justify-center">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF3366]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm sm:text-base text-white font-medium">João Silva</h4>
                  <p className="text-xs sm:text-sm text-gray-400">Iniciou atividade no brinquedo X</p>
                </div>
              </div>
              <span className="text-xs sm:text-sm text-gray-400">Há 5 min</span>
            </div>
          ))}
        </div>
      </div>

      {/* Área Administrativa - visível apenas para admins */}
      {userRole === 'admin' && (
        <div className="mt-8">
          <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Área Administrativa</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            <Link 
              href="/admin/users"
              className="p-3 sm:p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-white font-medium hover:bg-white/10 transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              Gerenciar Usuários
            </Link>

            <button className="p-3 sm:p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-white font-medium hover:bg-white/10 transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base">
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Relatórios Avançados
            </button>

            <button className="p-3 sm:p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-white font-medium hover:bg-white/10 transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base">
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Configurações do Sistema
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
