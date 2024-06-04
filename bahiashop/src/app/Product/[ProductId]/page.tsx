"use client"

import React, { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { useGlobalContext, Product } from '@/context/StoreProvider';
import MaxWidthWrapper from '@/components/layouts/MaxWidthWrapper';
import ProductDetails from './ProductDetails';
import { useParams } from 'next/navigation';
import { TrendingUpIcon } from 'lucide-react';

const Producto = () => {
  const { getProductById, loading } = useGlobalContext();
  const [product, setProduct] = useState<Product | null>(null);
  const { ProductId } = useParams<{ ProductId: string }>();
  const [load, setLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoad(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const fetchedProduct = await getProductById(ProductId);
        setProduct(fetchedProduct);
      } catch (error) {
        console.error('Error al obtener el producto:', error);
      }
    };

    if (!product) {
      fetchProduct();
    }
  }, [ProductId, getProductById, product]);

  return (
    <MaxWidthWrapper>
      {load ? (
        <div className="flex justify-center items-center h-screen">
          <Loader type="Puff" color="#00BFFF" height={100} width={100} timeout={1000} />
        </div>
      ) : product ? (
        <ProductDetails product={product} />
      ) : (
        <div> </div>
      )}
    </MaxWidthWrapper>
  );
};

export default Producto;
