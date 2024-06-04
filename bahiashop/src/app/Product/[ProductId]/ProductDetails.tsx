import React from 'react';
import { Product } from '@/context/StoreProvider'; // Importa la interfaz desde Product.tsx
import { FaShoppingCart } from 'react-icons/fa';

interface ProductDetailsProps {
    product: Product; // Usa la interfaz Product
}

const Horizontal = () => {
    return <hr className="w-[30%] my-2" />
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
                <img src={`/products/${product.image_path}`} />
            </div>
            <div>
                <h1 className="text-2xl font-medium text-slate-700">{product.name}</h1>  
                <Horizontal/>
                <div><span className="font-semibold">DETALLE:</span></div>
                <div className="text-justify">{product.details}</div>     
                <Horizontal/>
                <div><span className="font-semibold">DESCRIPCION:</span></div>
                <div className="text-justify">{product.description}</div>     
                <Horizontal/>
                <div>
                    <span className="font-semibold">CATEGORIA:</span>
                </div>
                <div className={product.stock > 0 ? "text-teal-400" : "text-rose-400"}>
                    {product.stock > 0 ? (
                        <strong>STOCK DISPONIBLE: {product.stock}</strong>
                    ) : (
                        <p>FUERA DE STOCK</p>
                    )}
                </div>
                <Horizontal/>
                <span className="font-semibold">CANTIDAD:</span>
                <Horizontal/>
                <button
                  className="w-full flex items-center justify-center space-x-2 rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                >
                  <FaShoppingCart /> {/* Ícono de carrito */}
                  <span>Agregar al carrito</span>
                </button>
            </div> 
        </div>
    );
};

export default ProductDetails;
