"use client"

import React, { useState, useContext, useEffect, ReactNode } from 'react';


export interface Category {
  id: string;
  nombre: string;
}

export interface Product {
  id: string;
  name: string;
  details: string;
  description: string;
  price: number;
  stock: number;
  category_id: string;
  image_path: string;
  rating: number;
}


interface User {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  rol: string;
}

interface AppContextProps {
  loading: boolean;
  productos: Product[];
  cart: Product[];
  categories: Category[];
  search: string;
  users: User[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  getProductsFromAPI: () => Promise<void>;
  getProductsByCategory: (id: string) => Promise<void>;
  addProductCart: (product: Omit<Product, 'quantity'>) => Promise<void>;
  updateProductStock: (id: string, stock: number) => Promise<void>;
  updateProductQuantity: (id: string, quantity: number) => Promise<void>;
  deleteCart: () => Promise<void>;
  deleteProductCart: (id: string) => Promise<void>;
  getUsers: () => Promise<void>;
  getUserByName: (name: string) => Promise<void>;
  getUserByEmail: (email: string) => Promise<void>;
  addUser: (user: Omit<User, 'id' | 'rol'> & { password: string }) => Promise<void>;
  updateUser: (user: Omit<User, 'rol'>) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  authenticateUser: (email: string, password: string) => Promise<void>;
}

// Crear el contexto
const AppContext = React.createContext<AppContextProps | undefined>(undefined);

// Crear el proveedor
const AppProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [productos, setProductos] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");

  const getProductsFromAPI = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
      if (!response.ok) {
        throw new Error('Error al obtener los productos');
      }
      const data = await response.json();
      setProductos(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getProductsByCategory = async (id: string) => {
    try {
      setLoading(true);
      const url = id === 'all' 
        ? `${process.env.NEXT_PUBLIC_API_URL}/products` 
        : `${process.env.NEXT_PUBLIC_API_URL}/products/category/${id}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Error al obtener los productos por categoría');
      }
      const data = await response.json();
      setProductos(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const addProductCart = async (product: Omit<Product, 'quantity'>) => {
    try {
      const data = { ...product, quantity: 1 };
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Error al agregar producto al carrito');
      }
      await getCartFromAPI();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getCartFromAPI = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart`);
      if (!response.ok) {
        throw new Error('Error al obtener el carrito');
      }
      const data = await response.json();
      setCart(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProductQuantity = async (id: string, quantity: number) => {
    try {
      const data = { id, quantity };
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/update`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Error al actualizar la cantidad del producto');
      }
      await getCartFromAPI();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const updateProductStock = async (id: string, stock: number) => {
    try {
      const data = { id, stock };
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/update`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Error al actualizar el stock del producto');
      }
      await getProductsFromAPI();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const deleteProductCart = async (id: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/delete/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Error al eliminar el producto del carrito');
      }
      await getCartFromAPI();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const deleteCart = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/delete`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Error al eliminar el carrito');
      }
      await getCartFromAPI();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getCategoriesFromAPI = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
      if (!response.ok) {
        throw new Error('Error al obtener las categorías');
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Métodos de usuario
  const getUsers = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`);
      if (!response.ok) {
        throw new Error('Error al obtener usuarios');
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getUserByName = async (name: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${name}`);
      if (!response.ok) {
        throw new Error('Error al obtener usuario por nombre');
      }
      const data = await response.json();
      setUsers([data]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getUserByEmail = async (email: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/email/${email}`);
      if (!response.ok) {
        throw new Error('Error al obtener usuario por email');
      }
      const data = await response.json();
      setUsers([data]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const addUser = async (user: Omit<User, 'id' | 'rol'> & { password: string }) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        throw new Error('Error al añadir usuario');
      }
      const data = await response.json();
      setUsers(prevUsers => [...prevUsers, data]);
      console.log('Success:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const updateUser = async (user: Omit<User, 'rol'>) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/update`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        throw new Error('Error al actualizar usuario');
      }
      await getUsers();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const deleteUser = async (id: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/delete/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Error al eliminar usuario');
      }
      await getUsers();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const authenticateUser = async (email: string, password: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/authenticate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        throw new Error('Error al autenticar usuario');
      }
      const data = await response.json();
      localStorage.setItem('token', data.token);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    getProductsFromAPI();
    getCartFromAPI();
    getCategoriesFromAPI();
    getUsers();
  }, []);

  return (
    <AppContext.Provider value={{
      loading,
      productos,
      cart,
      search,
      categories,
      users,
      getProductsFromAPI,
      setCategories,
      setSearch,
      getProductsByCategory,
      addProductCart,
      updateProductStock,
      updateProductQuantity,
      deleteCart,
      deleteProductCart,
      getUsers,
      getUserByName,
      getUserByEmail,
      addUser,
      updateUser,
      deleteUser,
      authenticateUser
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useGlobalContext must be used within an AppProvider');
  }
  return context;
};

export { AppContext, AppProvider };
