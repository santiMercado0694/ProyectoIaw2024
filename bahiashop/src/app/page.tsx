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

  return (
    <MaxWidthWrapper>
        <ProductCard />
    </MaxWidthWrapper>
  );
}
