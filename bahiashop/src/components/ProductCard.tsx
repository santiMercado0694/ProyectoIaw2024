"use client";

import { Card } from "flowbite-react";
import { useGlobalContext } from "@/context/StoreProvider";

export function ProductCard() {
  const { productos } = useGlobalContext();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {productos.map(producto => (
        <Card
          key={producto.id}
          className="max-w-sm transform transition duration-300 hover:scale-105 hover:shadow-lg"
          imgAlt={producto.name}
          imgSrc={`/products/${producto.image_path}`}
        >
          <a href="#">
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
              {producto.name}
            </h5>
          </a>
          <div className="text-gray-700 dark:text-gray-300 mb-2">
            {producto.details}
          </div>
          <div className="flex flex-col items-start justify-between space-y-2">
            <span className="text-3xl font-bold text-gray-900 dark:text-white mb-3">${producto.price}</span>
            <a
              href="#"
              className="w-full rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
            >
              Agregar al carrito
            </a>
          </div>
        </Card>
      ))}
    </div>
  );
}
