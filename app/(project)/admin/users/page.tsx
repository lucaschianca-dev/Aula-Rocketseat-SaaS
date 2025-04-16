// app/(project)/admin/users/page.tsx
import AdminGuard from "@/app/components/AdminGuard";
import { getAllUsers } from "@/app/lib/userHelpers";
import { updateUserRole } from "@/app/actions/update-user-role";
import Image from "next/image";

export default async function AdminUsers() {
  const users = await getAllUsers();
  
  return (
    <AdminGuard>
      <div className="min-h-screen flex flex-col bg-[#0d0d0d] relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-[#FF3366]/10 via-[#0d0d0d] to-[#0d0d0d]"></div>
          
          <div className="absolute top-20 left-[10%] w-64 h-64 rounded-full border border-[#FF3366]/10 opacity-30"></div>
          <div className="absolute bottom-40 right-[5%] w-96 h-96 rounded-full border border-[#FF3366]/5 opacity-20"></div>
          <div className="absolute top-[30%] right-[20%] w-32 h-32 border border-[#FF3366]/10 rotate-45 opacity-20"></div>
          <div className="absolute bottom-[35%] left-[15%] w-48 h-48 border border-[#FF3366]/10 -rotate-12 opacity-15"></div>
          
          <div className="absolute top-[25%] right-[40%] w-2 h-2 bg-[#FF3366]/20 rounded-full blur-sm"></div>
          <div className="absolute top-[45%] left-[30%] w-1 h-1 bg-[#FF3366]/30 rounded-full blur-sm"></div>
          <div className="absolute bottom-[30%] right-[25%] w-2 h-2 bg-[#FF3366]/20 rounded-full blur-sm"></div>
          
          <div className="absolute top-[10%] left-[25%] w-24 h-24 bg-[#FF3366]/5 rounded-lg rotate-12 opacity-20"></div>
          <div className="absolute bottom-[20%] right-[15%] w-32 h-32 bg-[#FF3366]/5 rounded-full opacity-20"></div>
        </div>

        <div className="relative z-10">
          <header className="py-6 px-4">
            <div className="max-w-6xl mx-auto text-white">
              <h1 className="text-3xl font-bold">
                Gerenciamento de <span className="text-[#FF3366]">Usuários</span>
              </h1>
              <p className="text-gray-400 mt-1">Gerencie os usuários e suas permissões</p>
            </div>
          </header>

          <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
            <div className="bg-[#121212] rounded-md border border-gray-800 overflow-hidden mb-6 backdrop-blur-sm bg-opacity-80">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-[#331520]/80">
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
                <tbody className="divide-y divide-[#3f1a25]">
                  {users.map(user => (
                    <tr key={user.getId()} className="hover:bg-[#331520]/50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-[#3f1a25] flex items-center justify-center mr-3">
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
                          <span className="w-24 px-2 py-1 text-xs font-semibold rounded-full bg-[#712738] text-[#ff3366] inline-block text-center">
                            admin
                          </span>
                        ) : (
                          <span className="w-24 px-2 py-1 text-xs font-semibold rounded-full bg-[#1a2a3f] text-[#4dabf7] inline-block text-center">
                            {user.getRole()}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {user.getRole() === 'admin' ? (
                          <form action={updateUserRole}>
                            <input type="hidden" name="userId" value={user.getId()} />
                            <input type="hidden" name="newRole" value="employee" />
                            <button 
                              type="submit" 
                              className="w-32 px-3 py-1 bg-[#4a1c27] rounded text-white text-xs hover:bg-[#5f232f] transition text-center"
                            >
                              Remover Admin
                            </button>
                          </form>
                        ) : (
                          <form action={updateUserRole}>
                            <input type="hidden" name="userId" value={user.getId()} />
                            <input type="hidden" name="newRole" value="admin" />
                            <button 
                              type="submit" 
                              className="w-32 px-3 py-1 bg-[#4a1c27] rounded text-white text-xs hover:bg-[#5f232f] transition text-center"
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
            
            <div className="bg-[#121212] rounded-md border border-gray-800 p-6 backdrop-blur-sm bg-opacity-80">
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
      </div>
    </AdminGuard>
  );
}