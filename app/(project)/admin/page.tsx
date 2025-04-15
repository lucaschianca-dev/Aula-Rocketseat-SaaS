import { AdminGuard } from "@/app/components/AdminGuard";

export default function AdminPage() {
    return (
      <AdminGuard>
        <div>Conteúdo administrativo aqui</div>
      </AdminGuard>
    );
  }