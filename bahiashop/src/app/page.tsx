import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { ProductCard } from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import Link from "next/link";

export default function Home() {
  return (
    <>
    <MaxWidthWrapper >
    <SearchBar/>
      <div className="bg-gray-100 ">
        
        <ProductCard/>
      </div>

    </MaxWidthWrapper>

    </>
  )
}