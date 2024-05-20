"use client"

import { Button} from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { useState } from "react";

export default function Signin(): JSX.Element {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const handleLogin = () => {
      // Aquí puedes agregar la lógica de autenticación con tu backend
      console.log("Email:", email);
      console.log("Password:", password);
    };
  
    return (
      <section className="h-full bg-neutral-100 dark:bg-neutral-700">
        <div className="container h-full p-10">
          <div className="flex h-full items-center justify-center text-neutral-800 dark:text-neutral-200">
            <div className="w-full max-w-lg">
              <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
                <div className="p-8">
                  <h1 className="text-xl font-semibold mb-6">
                    Inicia sesión en tu cuenta
                  </h1>
                  <form>
                    <Input
                      type="email"
                      placeholder="Correo electrónico"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mb-4"
                    />
                    <Input
                      type="password"
                      placeholder="Contraseña"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="mb-6"
                    />
                    <Button
                      variant="ghost" 
                      onClick={handleLogin}
                    >
                      Iniciar sesión
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
