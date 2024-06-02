"use client"

import { ShoppingCart } from "lucide-react"
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet"
import { Separator } from "../ui/separator"
import { formatPrice } from "@/lib/utils"
import Link from "next/link"
import { buttonVariants } from "../ui/button"
import Image from "next/image"
import {Product, useGlobalContext} from "@/context/StoreProvider";
import CartItem from "@/components/cart/CartItem";

const Cart = () => {
  
  //const { cart } = useGlobalContext();
  
  const cart : Product[] = [
    {
      id: "1",
      name: "Product 1",
      stock: 4,
      price: 10.99,
      quantity: 3,
      image_path: "",
      rating: 3
    },
    {
      id: "2",
      name: "Product 2",
      stock: 4,
      price: 12.99,
      quantity: 1,
      image_path: "",
      rating: 3
    },
    {
      id: "3",
      name: "Product 3",
      stock: 6,
      price: 11.99,
      quantity: 2,
      image_path: "",
      rating: 2
    },
    // Add more products as needed
  ];
  
  let sum = 0;
  cart.forEach(p => sum += p.price * p.quantity);
  
  return (
    <Sheet>
      <SheetTrigger className="group -m-2 flex items-center p-2">
        <ShoppingCart
          aria-hidden="true"
          className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
        />
        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
          {cart.length}
        </span>
      </SheetTrigger>
      <SheetContent className="fkex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle>Cart ({cart.length})</SheetTitle>
        </SheetHeader>
        {cart.length > 0 ? (
          <>
            <div className="lex w-full flex-col pr-6">
              {/* PROXIMAMENTE: LOGICA DEL CART
                            cart items*/}
              { cart.map( (product : any) => (
                <CartItem key={product.id} product={product} />
              ))}
            
            </div>
            <div className="space-y-4 pr-6">
              <Separator />
              <div className="space-y-1.5 text-sm">
                <div className="flex">
                  <span className="flex-1">Envio</span>
                  <span>Gratis</span>
                </div>
                <div className="flex">
                  <span className="flex-1">
                      Precio
                  </span>
                  <span>{formatPrice(sum)}</span>
                </div>
                <div className="flex">
                  <span className="flex-1">
                      Total
                  </span>
                  <span>{formatPrice(sum)}</span>
                </div>
              </div>
              
              <SheetFooter>
                <SheetTrigger asChild>
                  <Link href="/payment" className={buttonVariants({
                    className: "w-full",
                  })}>
                    Finalizar Compra
                  </Link>
                </SheetTrigger>
              </SheetFooter>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-1">
            <div
              aria-hidden="true"
              className="relative mb-4 h-60 w-60 text-muted-foreground">
              <Image
                src= "/EmptyCart.webp"
                fill
                alt=" empty shopping cart"
              />
            </div>
            <div className="text-xl font-semibold"> Tu carrito esta vacio</div>
            <SheetTrigger asChild>
              <Link href="/products" className={buttonVariants({
                variant: "link",
                size: "sm",
                className: "text-sm text-muted-foreground",
              })}>
                Descubre nuestros mejores productos
              </Link>
            </SheetTrigger>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}

export default Cart
