import { handleAuth } from "@/app/actions/handle-auth";
import { auth } from "@/app/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await auth();
  console.log(session);

  if (!session) {
    redirect("/login");
  }

  return (
    <div>
      <h1>Protected Dashboard</h1>
      <p>{session?.user?.email ? session?.user?.email : "Usuario nao esta logado"}</p>
      {
        session?.user?.email && (
          <form action={handleAuth}>
          <button type="submit" style={{cursor: "pointer"}}>Logout</button>
          </form>
        )

      }
      <Link href="/pagamentos">Pagamentos</Link>
    </div>
  );
}
