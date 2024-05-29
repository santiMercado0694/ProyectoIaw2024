// https://nextjs.org/learn/dashboard-app/adding-search-and-pagination me lo robé de acá
'use client';
 
// import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
 
import {usePathname, useRouter, useSearchParams} from "next/navigation";

export default function Search({ placeholder }: { placeholder: string }) {
  
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams();
  
  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set('s', term);
    let path: string = pathname;
    path += '?' + params.toString();
    router.push(path);
    
    // TODO actualizar búsqueda de productos en base al parámetro s
  }
 
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Buscar
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />
      {/* <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}
    </div>
  );
}