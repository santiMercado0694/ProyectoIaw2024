"use client"

import MaxWidthWrapper from "@/components/layouts/MaxWidthWrapper";
import { ProductCard } from "@/components/product/ProductCard";
import { useGlobalContext } from "@/context/StoreProvider";
import { useEffect, useState } from "react";
import Loader from "react-loader-spinner"; 
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"; 

export default function Home() {
  const { getProductsFromAPI, getCategories } = useGlobalContext();
  const [loading, setLoad] = useState(true);

  useEffect(() => {
    getProductsFromAPI();
    getCategories();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoad(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <MaxWidthWrapper>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={1000} 
          />
        </div>
      ) : (
        <div>
            <ProductCard />
        </div>
      )}  
    </MaxWidthWrapper>
  );
}
