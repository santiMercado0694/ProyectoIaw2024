"use client";

import Link from "next/link";
import MaxWidthWrapper from "@/components/layouts/MaxWidthWrapper";
import { Card } from "flowbite-react";
import Image from "next/image";

const AdminPanel = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white my-8">
        ADMINISTRACIÓN DE BAHÍA SHOP
      </h1>
      <MaxWidthWrapper className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link href="/admin/Products">
          <Card className="max-w-sm transform transition duration-300 hover:scale-105 hover:shadow-lg">
            <div>
              <h5 className="text-xl font-semibold tracking-tight text-center text-gray-900 dark:text-white">
                PRODUCTOS
              </h5>
              <Image
                src="/AdminProductos.webp"
                alt="{producto.name}"
                width={400}
                height={200}
                style={{ height: "300px" }} 
              />
            </div>
          </Card>
        </Link>
        <Link href="/admin/Categories">
          <Card className="max-w-sm transform transition duration-300 hover:scale-105 hover:shadow-lg">
            <div>
              <h5 className="text-xl font-semibold tracking-tight text-center text-gray-900 dark:text-white">
                CATEGORIAS
              </h5>
              <Image
                src="/AdminCategorias.webp"
                alt="{producto.name}"
                width={400}
                height={200}
                style={{ height: "300px" }} 
              />
            </div>
          </Card>
        </Link>
        <Link href="/admin/Users">
          <Card className="max-w-sm transform transition duration-300 hover:scale-105 hover:shadow-lg">
            <div>
              <h5 className="text-xl font-semibold tracking-tight text-center text-gray-900 dark:text-white">
                USUARIOS
              </h5>
              <Image
                src="/AdminUsuarios.webp"
                alt="{producto.name}"
                width={400}
                height={200}
                style={{ height: "300px" }} 
              />
            </div>
          </Card>
        </Link>
      </MaxWidthWrapper>
    </div>
  );
};

export default AdminPanel;
