import Link from "next/link";
import { Button } from "@/components/atoms/button";

export default function HomePage() {
  return (
    <main className="home-container">
      <h1>Bem-vindo ao UFBank</h1>
      <p>Sua fintech universitária</p>

      <div className="flex gap-4">
        <Link href="/cadastro">
          <Button>Cadastrar usuário</Button>
        </Link>

        <Link href="/maquininha">
          <Button>Cadastrar maquininha</Button>
        </Link>

        <Link href="/valores">
          <Button>Configurar valores da maquininha</Button>
        </Link>
      </div>
    </main>
  );
}
