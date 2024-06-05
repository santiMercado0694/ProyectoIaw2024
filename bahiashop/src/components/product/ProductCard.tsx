import React, { useState, useEffect } from "react";
import { Card } from "flowbite-react";
import { useGlobalContext } from "@/context/StoreProvider";
import { Pagination } from "../layouts/Pagination";
import SearchBar from "../layouts/SearchBar"; // Importa el SearchBar aquí
import { FaShoppingCart } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export function ProductCard() {
  const { productos, setSearch,search, getProductsFromAPI, getProductsByCategory } = useGlobalContext();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    setCurrentPage(1); 
  }, [search]);

  const filteredProducts = search
    ? productos.filter(product => product.name.toLowerCase().includes(search.toLowerCase()))
    : productos;

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const router = useRouter();

  const handleClick = (product: any ) => {
    router.push(`/Product/${product.id}`);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleAddToCart = (id: number) => {
    console.log(`Agregando producto al carrito: ${id}`);
  };

  return (
    <div>
      <SearchBar
        setSearch={setSearch}
        getProductsByCategory={getProductsByCategory}
        setPaginationPage={handlePageChange}
        actualPage={currentPage}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentProducts.map(producto => (
            <Card
              key={producto.id}
              className="max-w-sm transform transition duration-300 hover:scale-105 hover:shadow-lg"
              imgAlt={producto.name}
              imgSrc={`/products/${producto.image_path}`}
            >
              <div>
                <h5 
                  className="text-xl font-semibold tracking-tight text-center text-gray-900 dark:text-white transition duration-300 transform hover:scale-125 cursor-pointer"
                  onClick={() => handleClick(producto)}
                >
                  {producto.name}
                </h5>
              </div>
              <div 
                className="text-gray-700 dark:text-gray-300 mb-2 text-center"
              >
                {producto.details}
              </div>
              <div className="flex flex-col items-start justify-between space-y-2">
                <span className="text-3xl font-bold text-gray-900 dark:text-white mb-3">${producto.price.toLocaleString()}</span>
                <button
                  className="w-full flex items-center justify-center space-x-2 rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                  onClick={() => handleAddToCart(parseInt(producto.id))}
                >
                  <FaShoppingCart /> {/* Ícono de carrito */}
                  <span>Agregar al carrito</span>
                </button>
              </div>
            </Card>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}