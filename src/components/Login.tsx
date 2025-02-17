import { useMutation } from "@tanstack/react-query";
import { userLogin } from "../utils/api";
import { useState } from "react";

export function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const mutation = useMutation({
    mutationFn: userLogin,
    onSuccess: (data) => {
      onLoginSuccess(data.data.token);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      username,
      password,
    });
  };

  return (
    <div className="grid place-items-center h-screen bg-background">
      <div className="flex flex-col gap-4 p-4">
        <h1 className="text-4xl text-center font-bold">Bem-vindo a AgriSoft</h1>
        <p>Por favor preencha os campos abaixo com as suas credenciais</p>
        <div>
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-3">
              <label htmlFor="email">Seu email:</label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                id="username"
                type="text"
                name="username"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-3">
              <label htmlFor="password">Sua palavra-passe:</label>
              <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                id="password"
                type="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {mutation.status === "error" && (
              <p className="text-red-500 text-sm">Credenciais inválidas</p>
            )}

            <button
              className="flex justify-center h-10 w-full rounded-md border border-input bg-black text-white px-3 py-2 text-base cursor-pointer"
              type="submit"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
