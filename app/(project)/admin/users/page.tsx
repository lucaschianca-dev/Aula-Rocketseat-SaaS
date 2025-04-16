// app/admin/users/page.tsx
import AdminGuard from "@/app/components/AdminGuard";
import { getAllUsers } from "@/app/lib/userHelpers";
import { updateUserRole } from "@/app/actions/update-user-role";
import Link from "next/link";
import Image from "next/image";

export default async function AdminUsers() {
  // Busca os usuários do banco de dados
  const users = await getAllUsers();

  return (
    <AdminGuard>
      <div className="min-h-screen flex flex-col">
        {/* Conteúdo principal */}
        <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-8">
          {/* Cabeçalho da página */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-semibold">
                Gerenciamento de <span className="text-[#FF3366]">Usuários</span>
              </h1>
              <p className="text-gray-400 text-sm mt-1">Gerencie os usuários e suas permissões</p>
            </div>
            <Link 
              href="/dashboard" 
              className="px-4 py-2 bg-[#121212] border border-[#333] rounded-md text-sm text-white hover:bg-[#1a1a1a] transition"
            >
              Voltar ao Dashboard
            </Link>
          </div>

          {/* Tabela de usuários */}
          <div className="bg-[#121212] rounded-md border border-[#333] overflow-hidden mb-6">
            <table className="min-w-full divide-y divide-[#333]">
              <thead>
                <tr className="bg-[#1a1a1a]">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Usuário
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Função
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#333]">
                {users.map((user: any) => (
                  <tr key={user.id} className="hover:bg-[#1a1a1a]">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-[#333] flex items-center justify-center mr-3">
                          {user.image ? (
                            <Image 
                              src={user.image} 
                              alt={user.name || ''} 
                              width={32} 
                              height={32} 
                              className="rounded-full"
                            />
                          ) : (
                            <span className="text-xs text-gray-400">
                              {user.name?.charAt(0) || '?'}
                            </span>
                          )}
                        </div>
                        <div className="text-sm font-medium text-white">{user.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.role === 'admin' ? (
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-[#712738] text-[#ff3366]">
                          admin
                        </span>
                      ) : (
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-[#333] text-gray-300">
                          {user.role || 'employee'}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {user.role === 'admin' ? (
                        <form action={updateUserRole}>
                          <input type="hidden" name="userId" value={user.id} />
                          <input type="hidden" name="newRole" value="employee" />
                          <button 
                            type="submit"
                            className="px-3 py-1 bg-[#333] rounded text-white text-xs hover:bg-[#444] transition"
                          >
                            Remover Admin
                          </button>
                        </form>
                      ) : (
                        <form action={updateUserRole}>
                          <input type="hidden" name="userId" value={user.id} />
                          <input type="hidden" name="newRole" value="admin" />
                          <button 
                            type="submit"
                            className="px-3 py-1 bg-[#333] rounded text-white text-xs hover:bg-[#444] transition"
                          >
                            Tornar Admin
                          </button>
                        </form>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Seção de instruções */}
          <div className="bg-[#121212] rounded-md border border-[#333] p-6 mb-6">
            <h2 className="text-lg font-medium text-white mb-4">Instruções:</h2>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <span className="font-semibold text-white">• Admin:</span> Acesso completo ao sistema, pode gerenciar usuários e configurações
              </li>
              <li>
                <span className="font-semibold text-white">• Employee:</span> Acesso ao dashboard e funções básicas do sistema
              </li>
              <li>
                <span className="font-semibold text-white">• Para testar:</span> você também pode acessar: <span className="text-[#ff3366]">/api/setup/admin?secret=1234</span>
              </li>
            </ul>
          </div>
        </main>
      </div>
    </AdminGuard>
  );
}