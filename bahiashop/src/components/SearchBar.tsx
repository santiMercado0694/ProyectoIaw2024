"use client";

import { useGlobalContext } from "@/context/StoreProvider";

const SearchBar = () => {
  const { categories } = useGlobalContext(); // Obtén las categorías del contexto global

  return (
    <div className="bg-gray-100 p-4">
      <div className="flex items-center justify-center space-x-4">
        <div className="flex-1 max-w-48">
          <label htmlFor="search" className="sr-only">Buscar</label>
          <input
            type="text"
            id="search"
            name="search"
            className="block w-full pl-3 pr-10 py-2 text-base bg-gray-200 border border-gray-300 text-gray-700 focus:bg-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm rounded-md"
            placeholder="Buscar producto"
          />
        </div>
        <div className="flex-1 max-w-64">
          <label htmlFor="categories" className="sr-only">Categorías</label>
          <select
            id="categories"
            name="categories"
            defaultValue=""
            className="block w-full pl-3 pr-10 py-2 text-base bg-gray-200 border border-gray-300 text-gray-700 focus:bg-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm rounded-md"
          >
            <option value="" disabled hidden>Buscar por categoría</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>{category.nombre}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
