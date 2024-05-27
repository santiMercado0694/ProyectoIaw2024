"use client"

import { useEffect, useRef, useState } from "react"
import NavItem from "./NavItem"
import { useOnClickOutside } from "@/hooks/use-on-click-outside"
import {useGlobalContext} from "@/context/StoreProvider";
import Link from "next/link";
import Loading from "@/components/Loading";

const NavItems = () => {
    
    const {categories} = useGlobalContext();

    /*const [activeIndex, setActiveIndex] = useState<null | number>(null)
    const isAnyOpen = activeIndex !== null
    const navRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setActiveIndex(null)
            }
        }
    
        document.addEventListener('keydown', handler)
    
        return () => {
            document.removeEventListener('keydown', handler)
        }
    }, [])

    useOnClickOutside(navRef, () => setActiveIndex(null))*/
    
    if(categories.length < 1)
    {
        return (<Loading></Loading>);
    }
    
    return <div className="flex gap-4 h-full"> {/*ref={navRef}>*/}
        {categories.map((category, i) => {
            return (
              <Link key={category.id} href={'/products?id=' + category.id} className=" flex min-w-20 justify-center items-center" >
                  <h1 className="">
                    {category.nombre}
                  </h1>
              </Link>
            )
        })}
    </div>
}

export default NavItems