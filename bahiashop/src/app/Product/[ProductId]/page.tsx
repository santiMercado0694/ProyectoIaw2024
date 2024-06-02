"use client";

import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '@/context/StoreProvider';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import ProductDetails from './ProductDetails';

const Product = () => {
    const { getProductById, loading } = useGlobalContext();
    const [product, setProduct] = useState(null);
    const productId = '6'; // ID del producto que quieres obtener

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const fetchedProduct = await getProductById(productId);
                setProduct(fetchedProduct);
            } catch (error) {
                console.error('Error al obtener el producto:', error);
            }
        };

        fetchProduct();
    }, [getProductById, productId]);

    return (
        <div>
            <MaxWidthWrapper>
                {product ? (
                    <ProductDetails product={product} />
                ) : (
                    <div>Producto no encontrado</div>
                )}
            </MaxWidthWrapper>
        </div>
    );
};

export default Product;

