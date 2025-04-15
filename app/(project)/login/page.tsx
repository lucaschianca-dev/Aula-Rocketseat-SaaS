import { handleAuth } from "@/app/actions/handle-auth";
import { auth } from "@/app/lib/auth";
import { redirect } from "next/navigation";

export default async function Login() {
  const session = await auth();
  const user = session?.user;

  if (user) {
    redirect("/");
  }

  return (
    <section className="w-full min-h-[calc(100vh-64px)] flex items-stretch">
      {/* Left Side */}
      <div className="hidden lg:flex flex-1 relative bg-gradient-to-br from-[#E91E63] to-[#1E1E1E] items-center justify-center overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0">
          {/* Circles */}
          <div className="absolute top-[10%] left-[10%] w-64 h-64 rounded-full border border-white/10"></div>
          <div className="absolute bottom-[10%] right-[10%] w-96 h-96 rounded-full border border-white/10"></div>
          
          {/* Rectangles */}
          <div className="absolute top-[20%] right-[20%] w-32 h-32 border border-white/10 rotate-45"></div>
          <div className="absolute bottom-[20%] left-[20%] w-48 h-48 border border-white/10 -rotate-12"></div>
          
          {/* Filled Shapes */}
          <div className="absolute top-1/4 right-1/3 w-24 h-24 bg-white/5 rounded-lg rotate-12"></div>
          <div className="absolute bottom-1/3 left-1/4 w-32 h-32 bg-white/5 rounded-full"></div>
          
          {/* Decorative Points */}
          <div className="absolute inset-0" style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.1) 1px, transparent 1px),
              radial-gradient(circle at 80% 40%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.1) 1px, transparent 1px),
              radial-gradient(circle at 40% 80%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.1) 1px, transparent 1px),
              radial-gradient(circle at 70% 90%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.1) 1px, transparent 1px)
            `
          }}></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-white max-w-lg px-8">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-8">
            <span className="text-sm font-medium">Kids Manager</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Gerencie o espaço Kids com facilidade
          </h1>
          <p className="text-base lg:text-lg text-white/80">
            Controle de acesso, pagamentos e tempo de uso dos brinquedos em uma única plataforma.
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-[#0A0A0B]">
        <div className="w-full max-w-md space-y-6 sm:space-y-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Bem-vindo de volta
            </h2>
            <p className="mt-2 text-sm sm:text-base text-gray-400">
              Faça login para continuar
            </p>
          </div>

          <form action={handleAuth}>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-3 px-4 py-3 text-white bg-[#18181B] rounded-lg hover:bg-[#27272A] transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continuar com Google
            </button>
          </form>
        </div>
      </div>
    </section>
  );
} 
