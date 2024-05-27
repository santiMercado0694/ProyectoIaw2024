"use client"

import Link from "next/link"
import AddToCartButton from "./AddToCartButton";
import {Product} from '@/context/StoreProvider';

// import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {formatPrice} from "@/lib/utils";

const ProductCard = ( { product } : {product : Product} ) => {

  // TODO estilizar esto como corresponde
  
  //const theme = useTheme();
  
  return (
    <Card sx={{ display: 'flex' }} className="w-5/12 h-80 mt-4 mb-4 justify-around items-center">
      <Box sx={{ display: 'flex', flexDirection: 'column' }} >
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {product.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {formatPrice(product.price)}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }} className="justify-center">
          <AddToCartButton id={product.id} />
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: '50%', height: '60%' }}
        image={'/products/'+product.image_path}
        alt="prod img"
      />
    </Card>
  );
  
}

export default ProductCard
