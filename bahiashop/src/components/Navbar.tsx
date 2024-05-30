"use client";

import { useState } from "react";
import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Icons } from "./Icons";
import { buttonVariants } from "./ui/button";
import Cart from "./Cart";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { useGlobalContext } from "@/context/StoreProvider"; // Importa el contexto global para obtener las categorías

const Navbar = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState(false);
    const { categories } = useGlobalContext(); // Obtén las categorías del contexto global

    // Función para manejar el cierre de sesión
    const handleSignOut = async () => {     
        await signOut();
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className="bg-white sticky z-50 top-0 inset-x-0 h-16">
            <header className="relative bg-white">
                <MaxWidthWrapper>
                    <div className="border-b border-gray-200">
                        <div className="flex h-16 items-center justify-between">
                            {/* Logo */}
                            <div className="ml-4 flex lg:ml-0">
                                <Link href="/">
                                    <Icons.logo className="h-14 w-17" />
                                </Link>
                            </div>

                            {/* Search and Select for large screens */}
                            <div className="hidden lg:flex flex-1 items-center justify-center space-x-4">
                                <div className="flex-1 max-w-48">
                                    <label htmlFor="search" className="sr-only">Buscar</label>
                                    <input
                                        type="text"
                                        id="search"
                                        name="search"
                                        className="block w-full pl-3 pr-10 py-2 text-base bg-gray-100 border border-gray-300 text-gray-700 focus:bg-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm rounded-md"
                                        placeholder="Buscar producto"
                                    />
                                </div>
                                <div className="flex-1 max-w-64">
                                    <label htmlFor="categories" className="sr-only">Categorías</label>
                                    <select
                                        id="categories"
                                        name="categories"
                                        defaultValue=""
                                        className="block w-full pl-3 pr-10 py-2 text-base bg-gray-100 border border-gray-300 text-gray-700 focus:bg-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm rounded-md"
                                    >

                                        <option value="" disabled hidden>Buscar por categoría</option>  

                                        {categories.map((category) => (
                                            <option key={category.id} value={category.id}>{category.nombre}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Right side: session buttons and cart */}
                            <div className="flex items-center space-x-4 lg:space-x-6">
                                {session ? (
                                    <button 
                                        onClick={handleSignOut}
                                        className={buttonVariants({
                                            variant: "ghost",
                                        })}
                                    >
                                        CERRAR SESIÓN
                                    </button>
                                ) : (
                                    <>
                                        <Link href='/SignIn' className={buttonVariants({ variant: "ghost" })}>
                                            INICIAR SESIÓN
                                        </Link>
                                        <span className="hidden lg:block h-6 w-px bg-gray-200" aria-hidden="true" />
                                        <Link href='/SignUp' className={buttonVariants({ variant: "ghost" })}>
                                            REGISTRARSE
                                        </Link>
                                    </>
                                )}
                                <div className="ml-4 flow-root lg:ml-6">
                                    <Cart />
                                </div>
                                <div className="lg:hidden ml-4">
                                    <button
                                        onClick={toggleMenu}
                                        className="p-2 rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                                    >
                                        <span className="sr-only">Open menu</span>
                                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </MaxWidthWrapper>
                {menuOpen && (
                    <div className="lg:hidden bg-white border-t border-gray-400">
                        <div className="pt-2 pb-3 space-y-1">
                            {/* Search Field and Categories Select */}
                            <div className="flex items-center px-4 space-x-2">
                                <div className="flex-1 max-w-64">
                                    <label htmlFor="search" className="sr-only">Buscar</label>
                                    <input
                                        type="text"
                                        id="search"
                                        name="search"
                                        className="block w-full pl-3 pr-10 py-2 text-base bg-gray-100 border border-gray-300 text-gray-700 focus:bg-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm rounded-md"
                                        placeholder="Buscar producto"
                                    />
                                </div>
                                <div className="flex-1 max-w-64">
                                    <label htmlFor="categories" className="sr-only">Categorías</label>
                                    <select
                                        id="categories"
                                        name="categories"
                                        defaultValue=""
                                        className="block w-full pl-3 pr-10 py-2 text-base bg-gray-100 border border-gray-300 text-gray-700 focus:bg-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm rounded-md"
                                    >

                                        <option value="" disabled hidden>Buscar por categoría</option>  

                                        {categories.map((category) => (
                                            <option key={category.id} value={category.id}>{category.nombre}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </header>
        </div>
    );
}

export default Navbar;
