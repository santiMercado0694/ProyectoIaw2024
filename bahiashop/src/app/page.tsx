"use client"

import MaxWidthWrapper from "@/components/layouts/MaxWidthWrapper";
import { ProductCard } from "@/components/product/ProductCard";
import SearchBar from "@/components/layouts/SearchBar";
import Link from "next/link";
import { useGlobalContext } from "@/context/StoreProvider";
import { useEffect, useState } from "react";
import Loader from "react-loader-spinner"; 
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"; 

export default function Home() {
  const { setSearch, getProductsByCategory } = useGlobalContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [load, setLoad] = useState(true);

  const setPaginationPage = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoad(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <MaxWidthWrapper>
       {load ? (
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
          <SearchBar
            setSearch={setSearch}
            getProductsByCategory={getProductsByCategory}
            setPaginationPage={setPaginationPage}
            actualPage={currentPage}
          />
          <div className="bg-gray-100">
            <ProductCard />
          </div>
        </div>
      )}
    </MaxWidthWrapper>
  );
}
