// app/(project)/admin/users/page.tsx
import AdminGuard from "@/app/components/AdminGuard";
import { getAllUsers } from "@/app/lib/userHelpers";
import { updateUserRole } from "@/app/actions/update-user-role";
import Image from "next/image";

export default async function AdminUsers() {
  const users = await getAllUsers();

  return (
    <AdminGuard>
      <div className="min-h-screen flex flex-col bg-[#0d0d0d]">
        {/* Cabeçalho */}
        <header className="py-6 px-4 border-b border-gray-800">
          <div className="max-w-6xl mx-auto text-white">
            <h1 className="text-3xl font-bold">
              Gerenciamento de <span className="text-[#FF3366]">Usuários</span>
            </h1>
            <p className="text-gray-400 mt-1">Gerencie os usuários e suas permissões</p>
          </div>
        </header>

        {/* Conteúdo principal */}
        <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
          {/* Tabela de usuários */}
          <div className="bg-[#121212] rounded-md border border-gray-800 overflow-hidden mb-6">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-900">
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
              <tbody className="divide-y divide-gray-800">
                {users.map(user => (
                  <tr key={user.getId()} className="hover:bg-gray-900">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-[#333] flex items-center justify-center mr-3">
                          {user.getProfileImage() ? (
                            <Image src={user.getProfileImage()} alt={user.getName()} width={32} height={32} className="rounded-full" />
                          ) : (
                            <span className="text-xs text-gray-400">
                              {user.getName().charAt(0) || '?'}
                            </span>
                          )}
                        </div>
                        <div className="text-sm font-medium text-white">{user.getName()}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {user.getEmail()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.getRole() === 'admin' ? (
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-[#712738] text-[#ff3366]">
                          admin
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-[#333] text-gray-300">
                          {user.getRole()}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {user.getRole() === 'admin' ? (
                        <form action={updateUserRole}>
                          <input type="hidden" name="userId" value={user.getId()} />
                          <input type="hidden" name="newRole" value="employee" />
                          <button type="submit" className="px-3 py-1 bg-gray-700 rounded text-white text-xs hover:bg-gray-600 transition">
                            Remover Admin
                          </button>
                        </form>
                      ) : (
                        <form action={updateUserRole}>
                          <input type="hidden" name="userId" value={user.getId()} />
                          <input type="hidden" name="newRole" value="admin" />
                          <button type="submit" className="px-3 py-1 bg-gray-700 rounded text-white text-xs hover:bg-gray-600 transition">
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

          {/* Instruções */}
          <div className="bg-[#121212] rounded-md border border-gray-800 p-6">
            <h2 className="text-lg font-medium text-white mb-4">Instruções:</h2>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <span className="font-semibold text-white">• Admin:</span> Acesso completo ao sistema, pode gerenciar usuários e configurações
              </li>
              <li>
                <span className="font-semibold text-white">• Employee:</span> Acesso ao dashboard e funções básicas do sistema
              </li>
              <li>
                <span className="font-semibold text-white">• Para testar:</span> /api/setup/admin?action=list
              </li>
            </ul>
          </div>
        </main>
      </div>
    </AdminGuard>
  );
}