import { auth } from "@/app/lib/auth";
import { db } from "@/app/lib/firebase";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function UsersPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  // Verificar se o usuário é admin
  let isAdmin = false;
  if (session?.user?.email) {
    const userDoc = await db
      .collection('users')
      .where('email', '==', session.user.email)
      .get();

    const userData = userDoc.docs[0]?.data();
    isAdmin = userData?.role === 'admin';
  }

  // Se não for admin, não permite acesso
  if (!isAdmin) {
    redirect("/dashboard");
  }

  // Buscar todos os usuários
  const usersSnapshot = await db.collection('users').get();
  const users = usersSnapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      email: data.email,
      name: data.name,
      role: data.role || 'employee',
      image: data.image,
    };
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-10">
      {/* Header Section */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white via-pink-200 to-[#FF3366] bg-clip-text text-transparent">
            Gerenciamento de Usuários
          </h1>
          <Link 
            href="/dashboard" 
            className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all text-sm sm:text-base"
          >
            Voltar ao Dashboard
          </Link>
        </div>
        <p className="text-sm sm:text-base text-gray-400 mt-2">
          Gerencie os usuários e suas permissões
        </p>
      </div>

      {/* Users Table */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="py-3 px-3 sm:px-4 text-left text-xs sm:text-sm font-medium text-gray-400">Usuário</th>
                <th className="py-3 px-3 sm:px-4 text-left text-xs sm:text-sm font-medium text-gray-400">Email</th>
                <th className="py-3 px-3 sm:px-4 text-left text-xs sm:text-sm font-medium text-gray-400">Função</th>
                <th className="py-3 px-3 sm:px-4 text-left text-xs sm:text-sm font-medium text-gray-400">Ações</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="py-2 sm:py-3 px-3 sm:px-4">
                    <div className="flex items-center gap-2 sm:gap-3">
                      {user.image && (
                        <img 
                          src={user.image} 
                          alt={user.name || 'User'} 
                          className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover"
                        />
                      )}
                      <span className="text-white text-xs sm:text-sm truncate max-w-[100px] sm:max-w-full">{user.name || 'N/A'}</span>
                    </div>
                  </td>
                  <td className="py-2 sm:py-3 px-3 sm:px-4 text-white text-xs sm:text-sm truncate max-w-[120px] sm:max-w-full">{user.email}</td>
                  <td className="py-2 sm:py-3 px-3 sm:px-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium ${
                      user.role === 'admin' 
                        ? 'bg-pink-500/20 text-pink-300' 
                        : 'bg-blue-500/20 text-blue-300'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="py-2 sm:py-3 px-3 sm:px-4">
                    <div className="space-x-2">
                      <form action={`/api/admin/set-role?userId=${user.id}&role=${user.role === 'admin' ? 'employee' : 'admin'}`} method="post">
                        <button 
                          type="submit"
                          style={{ 'cursor': 'pointer' }}
                          className={`px-2 sm:px-3 py-1 rounded-md text-[10px] sm:text-xs font-medium ${
                            user.role === 'admin'
                              ? 'bg-gray-700 hover:bg-gray-600 text-white'
                              : 'bg-pink-500/20 hover:bg-pink-500/30 text-pink-300'
                          }`}
                        >
                          {user.role === 'admin' ? 'Remover Admin' : 'Tornar Admin'}
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
        <h2 className="text-base sm:text-lg font-medium text-white mb-3 sm:mb-4">Instruções:</h2>
        <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-400">
          <li>• <strong>Admin:</strong> Acesso completo ao sistema, pode gerenciar usuários e configurações</li>
          <li>• <strong>Employee:</strong> Acesso ao dashboard e funções básicas do sistema</li>
          <li>• Para testar, você também pode acessar: <code className="px-1 py-0.5 bg-white/10 rounded text-[10px] sm:text-xs">/api/setup/admin?action=list</code></li>
        </ul>
      </div>
    </div>
  );
} 