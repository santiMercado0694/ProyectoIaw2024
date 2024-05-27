'use client'

import {Product} from "@/context/StoreProvider";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardContent from '@mui/material/CardContent';
import CardMedia from "@mui/material/CardMedia";
import {formatPrice} from "@/lib/utils";

const CartItem = ({ product } : {product : Product}) => {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined" className="mb-3" >
        <CardContent className="flex flex-row flex-grow justify-between">
          <Box className="w-1/3">
            <h1>{product.name}</h1>
            <Box className="flex flex-row justify-around">
              <h3>{product.quantity}</h3> <h3> x </h3> <h3>{formatPrice(product.price)}</h3>
            </Box>
          </Box>
          
          <CardMedia
            // className="border border-red-500"
            component="img"
            sx={{ width: '50%' }}
            image={'/products/'+product.image_path}
            alt="prod img"
          />
          
        </CardContent>
      </Card>
    </Box>
  )
};

export default CartItem;