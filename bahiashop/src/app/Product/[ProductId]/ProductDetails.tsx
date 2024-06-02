import React from 'react';

interface ProductDetailsProps {
    product: any; 
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
    // Verifica que product no sea nulo antes de acceder a sus propiedades
    if (!product) {
        return <div>Loading...</div>; // Otra opción sería mostrar un mensaje de carga
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>{product.name}</div>
            <div>{product.details}</div>
        </div>
    );
};

export default ProductDetails;
