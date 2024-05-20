"use client"

import { Button} from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { useState } from "react";

export default function Signup(): JSX.Element {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    // Aquí puedes agregar la lógica de registro con tu backend
    console.log("Nombre:", firstName);
    console.log("Apellido:", lastName);
    console.log("Email:", email);
    console.log("Contraseña:", password);
  };

  return (
    <section className="h-full bg-neutral-100 dark:bg-neutral-700">
      <div className="container h-full p-10">
        <div className="flex h-full items-center justify-center text-neutral-800 dark:text-neutral-200">
          <div className="w-full max-w-lg">
            <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
              <div className="p-8">
                <h1 className="text-xl font-semibold mb-6">
                  Crea tu cuenta
                </h1>
                <form>
                  <Input
                    type="text"
                    placeholder="Nombre"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="mb-4"
                  />
                  <Input
                    type="text"
                    placeholder="Apellido"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="mb-4"
                  />
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
                    variant="ghost" // Cambié el valor de variant a "primary" para un botón de registro
                    onClick={handleSignup}
                  >
                    Registrarse
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
