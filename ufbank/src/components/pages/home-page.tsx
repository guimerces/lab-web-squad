import Link from "next/link";
import { Button } from "@/components/atoms/button";

export default function HomePage() {
  return (
    <main className="home-container">
      <h1>Bem-vindo ao UFBank</h1>
      <p>Sua fintech universitária</p>

      <Link href="/cadastro">
        <Button>Cadastrar usuário</Button>
      </Link>
    </main>
  );
}
