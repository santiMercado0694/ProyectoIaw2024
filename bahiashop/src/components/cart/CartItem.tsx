"use client";

import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Cart } from "@/context/StoreProvider";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import { useGlobalContext } from "@/context/StoreProvider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CldImage } from "next-cloudinary";

interface CartItemProps {
  product: Cart;
  user_id?: string;
}

const CartItem: React.FC<CartItemProps> = ({ product, user_id }) => {
  const { removeProductFromCart, updateCartItemQuantity } = useGlobalContext();
  const [quantity, setQuantity] = useState(1);

  const handleEditQuantity = () => {
    if (user_id) {
      updateCartItemQuantity(user_id, product.cart_item_id, quantity);
      toast.success(`Se edito la cantidad de ${product.name} en el carrito`, {
        position: "top-left",
        style: {
          width: "300px",
          fontSize: "1rem",
        },
      });
    }
    console.log("Agregando producto al carrito");
  };

  const handleRemove = () => {
    if (user_id) {
      removeProductFromCart(user_id, product.cart_item_id);
      toast.success(`Se elimino ${product.name} del carrito`, {
        position: "top-left",
        style: {
          width: "300px",
          fontSize: "1rem",
        },
      });
    }
  };

  const incrementQuantity: () => void = () => {
    if (quantity <= product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined" className="mb-3">
        <CardContent className="flex flex-col items-center">
          <Box className="w-full mb-2">
            <strong>
              <h1>{product.name}</h1>
            </strong>
            <h3>
              {product.quantity} x ${product.price.toLocaleString()}
            </h3>
              <div className="text-teal-400 py-1">
                <strong>STOCK DISPONIBLE: {product.stock}</strong>
              </div>  
              <div className="flex items-center space-x-2">
                <span className="font-semibold">MODIFICAR:</span>
                <div className="flex items-center space-x-2">
                  <button
                    className="bg-gray-200 px-1 py-0.5 rounded-md"
                    onClick={decrementQuantity}
                    disabled={quantity === 1}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    max={product.stock}
                    value={quantity}
                    className="w-14 px-2 py-1 border border-gray-300 rounded-md text-center"
                    readOnly
                  />
                  <button
                    className="bg-gray-200 px-1 py-0.5 rounded-md"
                    onClick={incrementQuantity}
                    disabled={quantity === product.stock}
                  >
                    +
                  </button>
                  <button
                    className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 focus:outline-none"
                    onClick={handleEditQuantity}
                  >
                    <FaEdit />
                  </button>
                </div>
              </div>
          </Box>

          <CardContent sx={{ width: "50%", marginBottom: "10px" }}>
            <CldImage
              src={product.image_path}
              alt={product.name}
              width={300}
              height={200}
            />
            <div className="flex justify-center items-center px-20">
              <button
                className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 focus:outline-none"
                onClick={handleRemove}
              >
                <FaTrash />
              </button>
            </div>
          </CardContent>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CartItem;
