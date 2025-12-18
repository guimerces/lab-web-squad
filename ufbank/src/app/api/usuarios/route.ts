import { NextResponse } from "next/server";

let usuarios: any[] = [];

export async function GET() {
  return NextResponse.json(usuarios);
}

export async function POST(request: Request) {
  const body = await request.json();

  const novoUsuario = {
    id: Date.now(),
    nome: body.nome,
    email: body.email,
    senha: body.senha,
  };

  usuarios.push(novoUsuario);

  return NextResponse.json(novoUsuario, { status: 201 });
}
