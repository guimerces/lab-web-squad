"use client";

import { useState } from "react";
import { FormField } from "@/components/molecules/formfield";
import { SelectField } from "@/components/molecules/select-field";
import { Button } from "@/components/atoms/button";
import Image from "next/image";
import Cadastro from "@/assets/images/caderneta.png";

const marcas = [
  { value: "stone", label: "Stone" },
  { value: "pagseguro", label: "PagSeguro" },
  { value: "cielo", label: "Cielo" },
  { value: "getnet", label: "GetNet" },
  { value: "rede", label: "Rede" },
  { value: "outra", label: "Outra" },
];

const planos = [
  { value: "d1", label: "Antecipado (D+1)" },
  { value: "d14", label: "Quinzenal (D+14)" },
  { value: "d30", label: "Mensal (D+30)" },
];

const RateSection = ({
  title,
  chargedName,
  costName,
  formData,
  handleChange,
  tarifaFixa,
}: any) => {
  const valCharged = parseFloat(formData[chargedName]) || 0;
  const valCost = parseFloat(formData[costName]) || 0;

  const spreadPct = (valCharged - valCost).toFixed(2);
  const isProfit = valCharged >= valCost;
  const isZero = valCharged === 0 && valCost === 0;

  const valorSimulado = 100;
  const lucroBrutoReais = (valorSimulado * (valCharged - valCost)) / 100;
  const custoFixo = parseFloat(tarifaFixa) || 0;
  const lucroLiquidoReais = lucroBrutoReais - custoFixo;

  return (
    <div className="border-b border-gray-100 pb-4 mb-4 last:border-0">
      <div className="flex justify-between items-start mb-2">
        <h4 className="text-sm font-bold text-gray-700 mt-1">{title}</h4>

        {!isZero && (
          <div className="flex flex-col items-end">
            <span
              className={`text-xs font-mono font-bold px-2 py-1 rounded-full mb-1 ${
                isProfit
                  ? "bg-blue-100 text-blue-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              Spread: {spreadPct}%
            </span>

            {custoFixo > 0 && (
              <span
                className={`text-[10px] font-bold ${
                  lucroLiquidoReais > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                Lucro Real (em R$ 100): R$ {lucroLiquidoReais.toFixed(2)}
              </span>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="Taxa do Cliente"
          type="number"
          name={chargedName}
          placeholder="0.00"
          value={formData[chargedName]}
          onChange={handleChange}
          step="0.01"
          required
        />
        <div className="relative">
          <FormField
            label="Taxa de Custo"
            type="number"
            name={costName}
            placeholder="0.00"
            value={formData[costName]}
            onChange={handleChange}
            step="0.01"
            required
          />
        </div>
      </div>
    </div>
  );
};

export function ValoresForm() {
  const [formData, setFormData] = useState({
    marca: "",
    modelo: "",
    planoRecebimento: "d1",
    tarifaFixa: "",

    debitoCobrado: "",
    debitoCusto: "",
    creditoVistaCobrado: "",
    creditoVistaCusto: "",
    credito2x6Cobrado: "",
    credito2x6Custo: "",
    credito7x12Cobrado: "",
    credito7x12Custo: "",

    precoVenda: "",
    precoAluguel: "",
  });

  const handleMarcaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const novaMarca = e.target.value;
    setFormData((prev) => ({
      ...prev,
      marca: novaMarca,
      modelo: "",
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch("/api/valores", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    alert("Configuração de taxas salva com sucesso!");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex justify-center">
        <Image src={Cadastro} alt="" width={80} height={80} priority />
      </div>
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-500">
        Cadastro de Valores das Maquininhas
      </h2>

      <div className="bg-white p-4 rounded-md border border-gray-200 mb-6 shadow-sm">
        <h3 className="text-sm font-bold text-gray-800 mb-3 uppercase tracking-wide">
          1. Identificação do Equipamento
        </h3>
        <div className="grid grid-cols-1 gap-4">
          <SelectField
            label="Marca"
            name="marca"
            value={formData.marca}
            onChange={handleMarcaChange}
            options={marcas}
            required
          />

          <FormField
            label="Modelo"
            type="text"
            name="modelo"
            placeholder="Ex: Ton T3 Smart"
            value={formData.modelo}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="bg-white p-4 rounded-md border border-blue-100 mb-6 shadow-sm">
        <h3 className="text-sm font-bold text-gray-800 mb-3 uppercase tracking-wide">
          2. Tipo de Recebimento e Tarifa
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <SelectField
            label="Plano de Recebimento"
            name="planoRecebimento"
            value={formData.planoRecebimento}
            onChange={handleChange}
            options={planos}
            required
          />
          <FormField
            label="Tarifa Fixa (R$)"
            type="number"
            name="tarifaFixa"
            placeholder="0.00"
            value={formData.tarifaFixa}
            onChange={handleChange}
            step="0.01"
            required
          />
        </div>
      </div>

      <div className="bg-white p-4 rounded-md border border-gray-200 shadow-sm mb-6">
        <h3 className="text-sm font-bold text-gray-800 mb-3 uppercase tracking-wide">
          3. Taxas por Tipo de Pagamento
        </h3>

        <RateSection
          title="Débito"
          chargedName="debitoCobrado"
          costName="debitoCusto"
          formData={formData}
          handleChange={handleChange}
          tarifaFixa={formData.tarifaFixa}
        />
        <RateSection
          title="Crédito à Vista"
          chargedName="creditoVistaCobrado"
          costName="creditoVistaCusto"
          formData={formData}
          handleChange={handleChange}
          tarifaFixa={formData.tarifaFixa}
        />
        <RateSection
          title="Crédito Parcelado (2x - 6x)"
          chargedName="credito2x6Cobrado"
          costName="credito2x6Custo"
          formData={formData}
          handleChange={handleChange}
          tarifaFixa={formData.tarifaFixa}
        />
        <RateSection
          title="Crédito Parcelado (7x - 12x)"
          chargedName="credito7x12Cobrado"
          costName="credito7x12Custo"
          formData={formData}
          handleChange={handleChange}
          tarifaFixa={formData.tarifaFixa}
        />
      </div>

      <div className="bg-white p-4 rounded-md border border-gray-200 mb-6 shadow-sm">
        <h3 className="text-sm font-bold text-gray-800 mb-3 uppercase tracking-wide">
          4. Custos da Maquininha
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            label="Preço de Venda (R$)"
            type="number"
            name="precoVenda"
            placeholder="0.00"
            value={formData.precoVenda}
            onChange={handleChange}
            step="0.01"
            required
          />
          <FormField
            label="Preço de Aluguel (R$)"
            type="number"
            name="precoAluguel"
            placeholder="0.00"
            value={formData.precoAluguel}
            onChange={handleChange}
            step="0.01"
            required
          />
        </div>
      </div>

      <div className="mt-4">
        <Button type="submit">Cadastrar Valor da Maquininha</Button>
      </div>
    </form>
  );
}
