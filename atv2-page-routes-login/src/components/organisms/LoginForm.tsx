import { useState } from "react";
import LabeledInput from "../molecules/LabeledInput";
import LabeledCheckbox from "../molecules/LabeledCheckbox";
import Button from "../atoms/Button";





export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form className="sm:mx-auto sm:w-full sm:max-w-sm space-y-6 bg-white p-8 rounded shadow">
        <div className="flex justify-center">
            <img src="/Sample_User_Icon.png" alt="user" className="h-20" />
        </div>
        <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900">
            Faça login e aproveite!
        </h2>

        <LabeledInput
            label="Email"
            name="email"
            type="email"
            placeholder="nome@dominio.com"
            required
            autoComplete="email"
        />

        <LabeledInput
            label="Senha"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="digite sua senha"
            required
            autoComplete="current-password"
        />
        <div className="flex items-center justify-between mb-10">
            <LabeledCheckbox
                label="Mostrar senha"
                checked={showPassword}
                onChange={() => setShowPassword((v) => !v)}
            />
            <a href="#" className="text-sm font-semibold text-indigo-600 hover:text-indigo-500">
            esqueci a senha
            </a>
        </div>
    
        <Button>
            Fazer login
        </Button>

        <p className="mt-8 text-center text-sm text-gray-500">
            Não é membro?{" "}
            <a href="#" className="font-semibold text-xs text-indigo-600 hover:text-indigo-500">
            Experimente 14 dias de plano gratuitamente
            </a>
        </p>
    </form>
  );
}