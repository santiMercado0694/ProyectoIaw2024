"use client"

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { ProductCard } from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import Link from "next/link";
import { useGlobalContext } from "@/context/StoreProvider";
import { useState } from "react";

export default function Home() {
  const { setSearch, getProductsByCategory } = useGlobalContext();
  const [currentPage, setCurrentPage] = useState(1);

  const setPaginationPage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <MaxWidthWrapper>
        <SearchBar
          setSearch={setSearch}
          getProductsByCategory={getProductsByCategory}
          setPaginationPage={setPaginationPage}
          actualPage={currentPage}
        />
        <div className="bg-gray-100">
          <ProductCard />
        </div>
      </MaxWidthWrapper>
    </>
  );
}
