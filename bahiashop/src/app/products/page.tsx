'use client'

import ProductCard from '@/components/ProductCard';
import Search from '@/components/Search';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { useSearchParams} from 'next/navigation'
import { useEffect } from 'react'

import {Product, useGlobalContext} from "@/context/StoreProvider";

const Products = () => {
  
  const params = useSearchParams()
  const id:string|null = params?.get('id');
  
  useEffect(() => {
    
    if (id)
      getProductsByCategory(id).then();
    else
      getProductsFromAPI().then();
    
  });
  
  const { productos, getProductsByCategory, getProductsFromAPI } = useGlobalContext();
    
  
  return (
    <div>
      
      <><br/><br/><br/></>
      
      <MaxWidthWrapper>
        <Search placeholder="Buscar..." />
      </MaxWidthWrapper>
      
      <MaxWidthWrapper className="flex flex-row justify-between flex-wrap">
        { productos.map( (product : Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </MaxWidthWrapper>
    </div>
  );
};

export default Products;