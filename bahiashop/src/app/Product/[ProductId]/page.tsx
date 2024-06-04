"use client"

import React, { useEffect, useState } from 'react';
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

    return (
        <div>
            <MaxWidthWrapper>
                {loading ? (
                    <div>Cargando...</div>
                ) : product ? (
                    <ProductDetails product={product} />
                ) : (
                    <div>Producto no encontrado</div>
                )}
            </MaxWidthWrapper>
        </div>
    );
};

export default Producto;
