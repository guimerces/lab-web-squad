import { MaquininhaForm } from "@/components/organisms/maquininha-form";
import { AuthLayout } from "@/components/templates/authlayout";

export function MaquininhaPage() {
  return (
    <AuthLayout>
      <MaquininhaForm />
    </AuthLayout>
  );
}

