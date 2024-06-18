import {Cart} from "@/context/StoreProvider";


const PaymentProduct = ({item} : {item: Cart}) => {
  
  return (
    
    <div className="flex w-1/2 h-20 items-center justify-center border border-black">
      {item.name} | {item.quantity} x {item.price}
    </div>
    
  );
}

export default PaymentProduct;