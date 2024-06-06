import React, { useState, useEffect } from "react";
import { Card } from "flowbite-react";
import { useGlobalContext } from "@/context/StoreProvider";
import { Pagination } from "../layouts/Pagination";
import SearchBar from "../layouts/SearchBar";
import { FaShoppingCart } from 'react-icons/fa';
import { MdAddShoppingCart } from "react-icons/md";
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image'; 

export function ProductCard() {
  const { productos, setSearch, search,
    getProductsByCategory, addProductCart,
    alertSuccess, alertError} = useGlobalContext();
  const { data: session } = useSession();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const router = useRouter();

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

  const handleClick = (product: any) => {
    router.push(`/Product/${product.id}`);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleAddToCart = (event: React.MouseEvent<HTMLButtonElement>, id_producto: string, producto_name: string) => {
    event.stopPropagation();
    if (session && session.user && session.user.user_id) {
      addProductCart(session.user.user_id, id_producto, 1)
        .then( () => {
          alertSuccess(`Se agrego ${producto_name} al carrito`);
          }
        )
    } else {
      router.push("/SignIn");
    }
  };

  const handleBuyNow = (event: React.MouseEvent<HTMLButtonElement>, id: number) => {
    event.stopPropagation();
    if (session && session.user && session.user.user_id) {
      router.push("/payment");
      console.log(`Comprando producto: ${id}`);
    } else {
      router.push("/SignIn");
    }
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
            >
              <div>
                <h5 
                  className="text-xl font-semibold tracking-tight text-center text-gray-900 dark:text-white transition duration-300 transform hover:scale-125 cursor-pointer"
                  onClick={() => handleClick(producto)}
                >
                  {producto.name}
                </h5>
                <Image
                  src={`/products/${producto.image_path}`}
                  alt={producto.name}
                  width={300}
                  height={200}
                />
                <div 
                  className="text-gray-700 dark:text-gray-300 mb-2 text-center"
                >
                  {producto.details}
                </div>
                <div className="flex flex-col items-start justify-between space-y-2">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white mb-3">${producto.price.toLocaleString()}</span>
                  <div className={producto.stock > 0 ? "text-teal-400" : "text-rose-400"}>
                    {producto.stock > 0 ? (
                        <strong>STOCK DISPONIBLE: {producto.stock}</strong>
                    ) : (
                        <strong>SIN STOCK DISPONIBLE </strong>
                    )}
                  </div>
                  {producto.stock > 0 && (
                    <>
                      <button
                        className="w-full flex items-center justify-center space-x-2 rounded-lg bg-red-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300"
                        onClick={(event) => handleBuyNow(event, parseInt(producto.id))}
                      >
                        <FaShoppingCart style={{ fontSize: "1rem" }} /> 
                        <span>Comprar ahora</span>
                      </button>
                      <button
                        className="w-full flex items-center justify-center space-x-2 rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                        onClick={(event) => handleAddToCart(event, producto.id, producto.name)}
                      >
                        <MdAddShoppingCart style={{ fontSize: "1.2rem" }} />
                        <span>Agregar al carrito</span>
                      </button>
                    </>
                  )}
                </div>
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
