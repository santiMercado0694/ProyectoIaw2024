'use client'

import {useEffect, useState} from "react";
import {Product, Category, User, useGlobalContext} from "@/context/StoreProvider";
import {Button} from "@/components/ui/button";

interface Props {
  dataType: DataType,
  itemId: string,
  onSend: any,
  onDelete: any,
  onAdd: any
}

const ValuesPanel = (prop : Props) => {
  
  const [data, setData] = useState<DataType>(DataType.Product);
  const [item, setItem] = useState<Product | Category | User>();
  
  const { getProductById, getCategoryById, getUserById } = useGlobalContext();
  
  useEffect(() => {
    setData(prop.dataType);
    
    if(!prop.itemId) return;
    
    switch (data) {
      case DataType.Product:
        getProductById(prop.itemId)
          .then(res => setItem(res))
          .catch(err => {});
        break;
      case DataType.Category:
        getCategoryById(prop.itemId)
          .then(res => setItem(res))
          .catch(err => {});
        break;
      case DataType.User:
        getUserById(prop.itemId)
          .then(res => setItem(res))
          .catch(err => {});
        break;
    }
    
  }, [prop.dataType, prop.itemId])
  
  function getFormData() : string[] {
    let array : string[] = [];
    let i = 0;
    
    values[data].forEach(e => {
      let input : HTMLInputElement = document.getElementById(e) as HTMLInputElement;
      array[i++] = input.value;
    })
    
    return array;
  }
  
  return (
    <div className="flex flex-col h-100 w-2/3 pt-10 bg-gray-100 rounded-md">
      { values[data].map(value => {
        
        return (
        <div key={`${value}_div`} className="flex flex-row justify-around mb-2 ">
          <h3 className="w-1/5 flex justify-end items-center">{value}</h3>
          
          <input
            className="w-2/3 rounded-md border-gray-400"
            id={value}
            /* @ts-ignore*/
            key={`${data}x${item?(item.id??item.user_id):'-1'}_${value}_input`}
            type="text"
            name={value}
            /* @ts-ignore*/
            defaultValue={item ? item[value] : ''}
          />
        </div>
      )})}
      
      <div className="w-1/3 flex flex-row self-end mt-7 mr-20 justify-around">
        <Button variant="destructive" onClick={() => prop.onDelete()}> Eliminar </Button>
        <Button variant="default" onClick={() => prop.onSend(getFormData())}> Actualizar </Button>
        { data != DataType.User ?
          (<Button variant="default" onClick={() => prop.onAdd(getFormData()) }> Agregar </Button>)
          :
          ''
        }
      </div>
    </div>
  )
};


enum DataType {
  Product,
  Category,
  User
}

const values = [

  ['name', 'category_id', 'details', 'description', 'stock', 'price', 'image_path' ],
  ['nombre' ],
  ['nombre', 'apellido', 'email', 'rol' ]
  
]


export {DataType, ValuesPanel, values};