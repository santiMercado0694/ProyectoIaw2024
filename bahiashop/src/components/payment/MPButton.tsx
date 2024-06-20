import React, {useEffect, useRef, useState} from 'react';
import {useGlobalContext} from "@/context/StoreProvider";
import {usePaymentContext} from "@/context/MPProvider";
import Box from "@mui/material/Box";
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import {useRouter} from "next/navigation";
import {useSession} from "next-auth/react";


export default function MPButton() {
  
  const router = useRouter();
  const { data: session } = useSession();
  const {cart, clearCartByUserId} = useGlobalContext();
  const {getPreferenceId} = usePaymentContext();
  const [prefRequest, setPrefRequest] = useState<boolean>(false);
  
  
  const [preferenceId, setPreferenceId] = useState(null);
  const [paymentUrl, setPaymentUrl] = useState(null);
  
  
  useEffect(() => {
    
    if(prefRequest) return;
    
    if (cart.length < 1) return;
    
    initMercadoPago(`${process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY}`)
    
    let items : any[] = [];
    
    cart.map(it => items.push({
      title: it.name,
      quantity: it.quantity,
      unit_price: it.price
    }))
    
    
    getPreferenceId(items).then((result : any) => {
      setPreferenceId(result.id);
      setPaymentUrl(result.init_point);
    });
    setPrefRequest(true)
  }, [cart]);
  
  function goHome() {
    if(!session) return;
    clearCartByUserId(session.user.user_id).then(() => {
      router.push('/');
      router.refresh();
    })
    
  }
  
  
  return (
    // <Box component="form" noValidate  id={FORM_ID} method="GET" />
    <Box id="wallet_container">
      { paymentUrl ?
        
        <a role="button" className="btn btn-primary align-middle" target="_blank" href={paymentUrl} onClick={goHome} > Ir a pagar </a>
        
        :
        
        <p> Cargando... </p>
        
      }
    </Box>
  );
}