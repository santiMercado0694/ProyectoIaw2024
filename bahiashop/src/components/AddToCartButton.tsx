"use client"

import Button from "@mui/material/Button";
import {Product, useGlobalContext} from "@/context/StoreProvider";
import {Alert} from "@mui/material";

const AddToCartButton = ({ id } : {id : string} ) => {
    
    const { addProductCart, productos } = useGlobalContext();
    
    async function addToCart(id: string) {
        // TODO implementar lógica de agregar al carrito
        // console.log(`Agregado item ${id} al carrito`);
        
        const prod = productos.find(p => p.id === id );
        
        if (!prod)
        {
            // error message
            return (<Alert severity="error"> No se ha encontrado el producto </Alert>);
        }
        
        addProductCart(prod)
          .then(res => console.log(res))
          .catch(err => console.log(err))
    }

    // TODO estilizar esto como corresponde
    return (
        <Button variant="contained"
          className=""
          onClick={() => addToCart(id)}>
            Agregar al carrito
        </Button>
    )
}

export default AddToCartButton
