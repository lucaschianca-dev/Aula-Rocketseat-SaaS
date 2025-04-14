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
    <div>
      <form action={handleAuth}>
      <button type="submit" style={{cursor: "pointer"}}>Signin with Google</button>
      </form>
    </div>
  );
} 
