"use client"

import MaxWidthWrapper from "@/components/layouts/MaxWidthWrapper";
import { ProductCard } from "@/components/product/ProductCard";
import { useGlobalContext } from "@/context/StoreProvider";
import { useEffect } from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"; 

export default function Home() {
  const { getProductsFromAPI, getCategories } = useGlobalContext();

  useEffect(() => {
    getProductsFromAPI();
    getCategories();
  }, []);

  return (
    <MaxWidthWrapper>
        <ProductCard />
    </MaxWidthWrapper>
  );
}
