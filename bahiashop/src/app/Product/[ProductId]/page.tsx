"use client"

import React, { useEffect, useState } from 'react';
import Loader from "react-loader-spinner"; 
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"; 
import { useGlobalContext, Product } from '@/context/StoreProvider';
import MaxWidthWrapper from '@/components/layouts/MaxWidthWrapper';
import ProductDetails from './ProductDetails';
import { useParams } from 'next/navigation';

const Producto = () => {
    const { getProductById, loading } = useGlobalContext();
    const [product, setProduct] = useState<Product | null>(null); // Estado del producto, puede ser Product o null
    const { ProductId } = useParams<{ ProductId: string }>();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const fetchedProduct = await getProductById(ProductId);
                setProduct(fetchedProduct); // Establece el producto obtenido
            } catch (error) {
                console.error('Error al obtener el producto:', error);
            }
        };

        if (!product) { // Agregamos esta condición para cargar el producto solo una vez
            fetchProduct();
        }
    }, [ProductId, getProductById, product]); // Agregamos product como dependencia

    if(loading) {
        <Loader 
            type="Puff"
            color="#00BFFF"
            height={100} 
            width={100} 
        />
    }

    return (
        <div>
            <MaxWidthWrapper>
                {product ? (
                    <ProductDetails product={product} />
                ) : (
                    <div> </div>
                )}
            </MaxWidthWrapper>
        </div>
    );
};

export default Producto;
