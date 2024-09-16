import React from 'react';
import { Link } from 'react-router-dom';

type Product = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  sustainabilityScore: number;
  stock: number;
};

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-2">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
          <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
            Eco Score: {product.sustainabilityScore}%
          </span>
        </div>
        <Link 
          to={`/products/${product.id}`}
          className="mt-4 block text-center bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          View Product
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;