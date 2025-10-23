"use client";

import { useState } from 'react';
import { FormField } from '@/components/molecules/formfield';
import { PasswordField } from '@/components/molecules/password-field';
import { Button } from '@/components/atoms/button';
import Image from 'next/image';
import Cadastro from '@/assets/images/caderneta.png';

export function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dados do formulário:", formData);
    alert("Cadastro enviado!");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex justify-center">
        <Image
          src={Cadastro}
          alt=""
          width={80}
          height={80}
          priority
        />
      </div>
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-500">Cadastre-se</h2>

      <FormField
        label="Nome Completo"
        type="text"
        name="name"
        placeholder="Seu nome"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <FormField
        label="E-mail"
        type="email"
        name="email"
        placeholder="voce@email.com"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <PasswordField
        label="Senha"
        name="password"
        placeholder="••••••••"
        value={formData.password}
        onChange={handleChange}
        required
      />
      
      <div className="mt-6">
        <Button type="submit">
          Cadastrar
        </Button>
      </div>
    </form>
  );
}