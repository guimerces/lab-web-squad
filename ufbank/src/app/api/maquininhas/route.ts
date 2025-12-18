import { NextResponse } from "next/server";

let maquininhas: any[] = [];

export async function GET() {
  return NextResponse.json(maquininhas);
}

export async function POST(request: Request) {
  const body = await request.json();

  const novaMaquininha = {
    id: Date.now(),
    marca: body.marca,
    modelo: body.modelo,
    numeroSerie: body.numeroSerie,
    tipo: body.tipo,
    status: body.status,
    dataAquisicao: body.dataAquisicao,
  };

  maquininhas.push(novaMaquininha);

  return NextResponse.json(novaMaquininha, { status: 201 });
}
