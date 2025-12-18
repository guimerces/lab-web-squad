import { NextResponse } from "next/server";

let valores: any[] = [];

export async function GET() {
  return NextResponse.json(valores);
}

export async function POST(request: Request) {
  const body = await request.json();

  const novoValor = {
    id: Date.now(),
    ...body,
  };

  valores.push(novoValor);

  return NextResponse.json(novoValor, { status: 201 });
}
