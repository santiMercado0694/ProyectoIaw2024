"use client";

import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Icons } from "./Icons";
import NavItems from "./NavItems";
import { buttonVariants } from "./ui/button";
import Cart from "./Cart";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';

const Navbar = () => {
    const { data: session } = useSession();
    const router = useRouter();

    // Función para manejar el cierre de sesión
    const handleSignOut = async () => {     
        await signOut();
    };

    return (
        <div className="bg-white sticky z-50 top-0 inset-x-0 h-16">
            <header className="relative bg-white">
                <MaxWidthWrapper>
                    <div className="border-b border-gray-200">
                        <div className="flex h-16 items-center">
                            {/* PROXIMAMENTE: Movile nav */}

                            <div className="ml-4 flex lg:ml-0">
                                <Link href="/">
                                    <Icons.logo className="h-14 w-17" />
                                </Link>
                            </div>

                            <div className="hidden z-50 lg:ml-8 lg:block lg:self-stretch">
                                <NavItems />
                            </div>

                            <div className="ml-auto flex items-center">
                                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                    {session ? (
                                        <>
                                            <button 
                                                onClick={handleSignOut}
                                                className={buttonVariants({
                                                    variant: "ghost",
                                                })}
                                            >
                                                CERRAR SESIÓN
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <Link href='/SignIn' className={buttonVariants({ variant: "ghost" })}>
                                                INICIAR SESIÓN
                                            </Link>
                                            <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                                            <Link href='/SignUp' className={buttonVariants({ variant: "ghost" })}>
                                                REGISTRARSE
                                            </Link>
                                        </>
                                    )}
                                    <div className="ml-4 flow-root lg:ml-6">
                                        <Cart />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </MaxWidthWrapper>
            </header>
        </div>
    );
}

export default Navbar;
