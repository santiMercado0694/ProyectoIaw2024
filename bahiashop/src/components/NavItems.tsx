"use client"

import { useEffect, useRef, useState, ChangeEvent  } from "react"
import NavItem from "./NavItem"
import { useOnClickOutside } from "@/hooks/use-on-click-outside"
import {useGlobalContext} from "@/context/StoreProvider";
import Link from "next/link";

const NavItems = () => {
    const { categories } = useGlobalContext();
    const [selectedCategory, setSelectedCategory] = useState<string>("");

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.target.value);
    };

    return (
        <div className="flex gap-4 h-full items-center">
            <select
                value={selectedCategory}
                onChange={handleChange}
                className="block w-full max-w-xs p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
                <option value="" disabled>Categorias</option>
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.nombre}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default NavItems;