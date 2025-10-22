import { RegistrationForm } from "@/components/organisms/form";
import { AuthLayout } from "@/components/templates/authlayout";

export default function CadastroPage() {
  return (
    <AuthLayout>
      <RegistrationForm />
    </AuthLayout>
  );
}