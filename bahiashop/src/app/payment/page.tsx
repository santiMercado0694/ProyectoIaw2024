'use client'

import MaxWidthWrapper from "@/components/layouts/MaxWidthWrapper";
import {useEffect} from "react";
import MPButton from "@/components/payment/MPButton";
import {MPProvider} from "@/context/MPProvider";
import {useGlobalContext} from "@/context/StoreProvider";
import PaymentProduct from "@/components/payment/PaymentProduct";

const Payment = () => {
  
  const {cart} = useGlobalContext();
  
  return (
    <MPProvider>
      <MaxWidthWrapper className="flex flex-col lg:flex-row h-screen" >
      
        <div className="flex flex-col w-2/3 pt-10 items-center border border-green-500">
          {cart.map( item => (
            <PaymentProduct key={item.cart_item_id} item={item} />
          ))}
        </div>
        
        <div className="flex w-1/3 pt-20 justify-center border border-red-600">
          <MPButton></MPButton>
        </div>
      
      </MaxWidthWrapper>
    </MPProvider>
  );
};

export default Payment;