import { RegistrationForm } from "@/components/organisms/form";
import { AuthLayout } from "@/components/templates/authlayout";

export function CadastroPage() {
  return (
    <AuthLayout>
      <RegistrationForm />
    </AuthLayout>
  );
}
