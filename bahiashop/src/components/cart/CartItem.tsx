'use client'

import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { Cart } from '@/context/StoreProvider';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useGlobalContext } from '@/context/StoreProvider';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {CldImage} from "next-cloudinary";

interface CartItemProps {
  product: Cart;
  user_id?: string;
}

const CartItem: React.FC<CartItemProps> = ({ product, user_id }) => {
  const { removeProductFromCart } = useGlobalContext();

  const handleRemove = () => {
    if (user_id) {
      removeProductFromCart(user_id, product.cart_item_id);
      toast.success(`Se elimino ${product.name} del carrito`, {
        position: 'top-left',
        style: {
          width: '300px',
          fontSize: '1rem', 
        },
      });
    }
  };

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined" className="mb-3">
        <CardContent className="flex flex-col items-center">
          <Box className="w-full mb-2">
            <h1>{product.name}</h1>
            <h3>{product.quantity} x ${product.price.toLocaleString()}</h3>
          </Box>

          <CardContent sx={{ width: '50%', marginBottom: '10px' }} >
            <CldImage
              src={product.image_path}
              alt={product.name}
              width={300}
              height={200}
            />
          </CardContent>

          <button
            className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 focus:outline-none"
            onClick={handleRemove}
          >
            <FaTrash />
          </button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CartItem;

