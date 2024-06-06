'use client'

import {DataType} from "@/components/admin_panel/ValuesPanel";
import {useGlobalContext} from "@/context/StoreProvider";
import React, {useEffect, useState} from "react";

interface Props {
  onUpdateKey: any,
  onUpdateId: any
}

const KeysPanel = (prop:Props) => {
  
  const {productos, categories, users} = useGlobalContext();
  
  const keys: string[] = Object.keys(DataType).filter(key => isNaN(Number(key)));
  
  const [list, setList] = useState<any[]>(productos);
  const [key, setKey] = useState<string>("Product");
  
  useEffect(() => {
    internalSetList(key, true);
  },[productos, categories, users]);
  
  function internalSetList(val: string, force:boolean = false) {
    if(val == key) {
      if (!force)
        return;
    }
    else {
      prop.onUpdateId('');
    }
    
    switch (val as keyof typeof DataType) {
      case "Product":
        setList(productos);
        break;
      case "Category":
        setList(categories);
        break;
      case "User":
        setList(users);
        break;
    }
    setKey(val);
  }
  
  function internalUpdateKey(e: React.ChangeEvent<HTMLSelectElement>) {
    let val = e.target.value;
    prop.onUpdateKey(val);
    internalSetList(val);
    (document.getElementById('dataID') as HTMLSelectElement).selectedIndex = 0;
  }
  
  
  return (
    <div className="flex flex-col h-100 w-1/4 ">
      
      <div>
        <select
          id="dataType"
          name="dataTypes"
          onChange={internalUpdateKey}
          className="block w-full pl-3 pr-10 py-2 text-base bg-gray-200 border border-gray-300 text-gray-700 focus:bg-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm rounded-md"
        >
          { keys.map(type =>  (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>
      
      <div className="h-full">
        <select
          multiple
          id="dataID"
          onChange={(evt) => prop.onUpdateId(evt.target.value)}
          className="block w-full h-full mt-2 pl-3 pr-10 py-2 text-base bg-gray-200 border border-gray-300 text-gray-700 focus:bg-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm rounded-md"
        >
          {
            list.map((item : any) => {
              let code = item.name ?? item.nombre;
              let id = item.id ?? item.user_id;
              return (<option key={code} value={id}>{code}</option>)
            })
          }
        </select>
      </div>
      
      
    </div>
  )
};

export default KeysPanel;