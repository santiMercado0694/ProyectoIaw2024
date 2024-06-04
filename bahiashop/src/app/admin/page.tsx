'use client'


import MaxWidthWrapper from "@/components/layouts/MaxWidthWrapper";
import KeysPanel from "@/components/admin_panel/KeysPanel";
import {DataType, ValuesPanel} from "@/components/admin_panel/ValuesPanel";
import {useGlobalContext} from "@/context/StoreProvider";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";

const AdminPanel = () => {
  
  const router = useRouter();
  
  useEffect(() => {
    getProductsFromAPI();
  })
  
  const [currentType, setcurrentType] = useState<DataType>(DataType.Product);
  const [id, setId] = useState<string>('');
  const {
    updateProduct, updateCategory, updateUser,
    deleteProduct, deleteCategory, deleteUser,
    createProduct, createCategory,
    getProductsFromAPI, getCategories, getUsers } = useGlobalContext();
  
  function updateId(e: React.ChangeEvent<HTMLSelectElement>) {
    const newId = e.target.value;
    setId(newId);
  }
  
  function updateKey(type:string) {
    setcurrentType(DataType[type as keyof typeof DataType]);
  }
  
  function deleteItem() {
    
    let promise;
    
    switch (currentType) {
      case DataType.Product:
        promise = deleteProduct(id);
        break;
      case DataType.Category:
        promise = deleteCategory(id);
        break;
      case DataType.User:
        promise = deleteUser(id);
        break;
    }
    
    
    promise
      .then( (val) => {
        getProductsFromAPI();
        getCategories();
        getUsers();
        }
      ).catch( (err) => {
      // on error
    });
    
  }
  
  function updateItem(newValues:string[]) {
    
    let promise;
    
    switch (currentType) {
      case DataType.Product:
        // ['Nombre', 'Categoría', 'Detalle', 'Descripción', 'Stock', 'Precio', 'Imágen' ]
        promise = updateProduct(id, {
          name: newValues[0],
          details: newValues[1],
          description: newValues[2],
          price: +newValues[5],
          stock: +newValues[4],
          category_id: +newValues[3],
          image_path: newValues[6]
        });
        break;
      case DataType.Category:
        // ['Nombre' ]
        promise = updateCategory(id, newValues[0]);
        break;
      case DataType.User:
        // ['Nombre', 'Apellido', 'Email', 'Rol' ]
        promise = updateUser({
          user_id: id,
          nombre: newValues[0],
          apellido: newValues[1],
          email: newValues[2],
          rol: newValues[3]
        });
        break;
    }
    
    promise
      .then( (val) => {
        getProductsFromAPI();
        getCategories();
        getUsers();
      }
    ).catch( (err) => {
        // on error
    });
    
  }
  
  function createItem(newValues:string[]) {
    
    let promise;
    
    switch (currentType) {
      case DataType.Product:
        // ['Nombre', 'Categoría', 'Detalle', 'Descripción', 'Stock', 'Precio', 'Imágen' ]
        promise = createProduct({
          name: newValues[0],
          details: newValues[1],
          description: newValues[2],
          price: +newValues[5],
          stock: +newValues[4],
          category_id: +newValues[3],
          image_path: newValues[6]
        });
        break;
      case DataType.Category:
        // ['Nombre' ]
        promise = createCategory(newValues[0]);
        break;
      case DataType.User:
        return; // nunca deberia llegar a este caso igual
    }
    
    promise
      .then( (val) => {
        getProductsFromAPI();
        getCategories();
        getUsers();
      }
      ).catch( (err) => {
      // on error
    });
    
    
  }
  
  
  return (
    <MaxWidthWrapper className="flex flex-row h-screen justify-around mt-5 p-4 ">
      
      <KeysPanel onUpdateKey={updateKey} onUpdateId={updateId} />
      
      <ValuesPanel dataType={currentType} itemId={id} onDelete={deleteItem} onSend={updateItem} onAdd={createItem} />
      
    </MaxWidthWrapper>
  );
};

export default AdminPanel;