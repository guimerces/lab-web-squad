"use client";

import { useState } from "react";
import { FormField } from "@/components/molecules/formfield";
import { SelectField } from "@/components/molecules/select-field";
import { Button } from "@/components/atoms/button";
import Image from "next/image";
import Cadastro from "@/assets/images/caderneta.png";

export function MaquininhaForm() {
  const [formData, setFormData] = useState({
    marca: "",
    modelo: "",
    numeroSerie: "",
    tipo: "",
    status: "",
    dataAquisicao: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch("/api/maquininhas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    alert("Cadastro de maquininha realizado com sucesso!");
    setFormData({
      marca: "",
      modelo: "",
      numeroSerie: "",
      tipo: "",
      status: "",
      dataAquisicao: "",
    });
  };

  const marcas = [
    { value: "stone", label: "Stone" },
    { value: "pagseguro", label: "PagSeguro" },
    { value: "cielo", label: "Cielo" },
    { value: "getnet", label: "GetNet" },
    { value: "rede", label: "Rede" },
    { value: "outra", label: "Outra" },
  ];

  const tipos = [
    { value: "wifi", label: "Wi-Fi" },
    { value: "bluetooth", label: "Bluetooth" },
    { value: "gprs", label: "GPRS" },
    { value: "ethernet", label: "Ethernet" },
  ];

  const statusOptions = [
    { value: "ativa", label: "Ativa" },
    { value: "inativa", label: "Inativa" },
    { value: "manutencao", label: "Em Manutenção" },
  ];

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex justify-center">
        <Image src={Cadastro} alt="" width={80} height={80} priority />
      </div>
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-500">
        Cadastro de Maquininha
      </h2>

      <SelectField
        label="Marca"
        name="marca"
        value={formData.marca}
        onChange={handleChange}
        options={marcas}
        required
      />

      <FormField
        label="Modelo"
        type="text"
        name="modelo"
        placeholder="Ex: TEF 1.0, Mini, etc."
        value={formData.modelo}
        onChange={handleChange}
        required
      />

      <FormField
        label="Número de Série"
        type="text"
        name="numeroSerie"
        placeholder="Digite o número de série"
        value={formData.numeroSerie}
        onChange={handleChange}
        required
      />

      <SelectField
        label="Tipo de Conexão"
        name="tipo"
        value={formData.tipo}
        onChange={handleChange}
        options={tipos}
        required
      />

      <SelectField
        label="Status"
        name="status"
        value={formData.status}
        onChange={handleChange}
        options={statusOptions}
        required
      />

      <FormField
        label="Data de Aquisição"
        type="date"
        name="dataAquisicao"
        value={formData.dataAquisicao}
        onChange={handleChange}
      />

      <div className="mt-6">
        <Button type="submit">Cadastrar Maquininha</Button>
      </div>
    </form>
  );
}
