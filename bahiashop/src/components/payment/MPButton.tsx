import React, {useEffect, useRef, useState} from 'react';
import {useGlobalContext} from "@/context/StoreProvider";
import {usePaymentContext} from "@/context/MPProvider";
import Box from "@mui/material/Box";
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'


export default function MPButton() {
  
  const {cart} = useGlobalContext();
  const {getPreferenceId} = usePaymentContext();
  const [prefRequest, setPrefRequest] = useState<boolean>(false);
  
  
  const [preferenceId, setPreferenceId] = useState(null);
  
  
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
    });
    setPrefRequest(true)
  }, [cart]);
  
  
  return (
    // <Box component="form" noValidate  id={FORM_ID} method="GET" />
    <Box id="wallet_container">
      { preferenceId ?
        
        <Wallet initialization={{ preferenceId: preferenceId }} />
        // <a href={payURL??'#'}> Ir a pagar </a>
        
        :
        
        <p> Cargando... </p>
        
      }
    </Box>
  );
}