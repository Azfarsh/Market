import React from 'react';
import ProductCard from '../Products/ProductCard';

type Product = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  sustainabilityScore: number;
  stock: number;
};

interface RecommendedProductsProps {
  products: Product[];
}

const RecommendedProducts: React.FC<RecommendedProductsProps> = ({ products }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default RecommendedProducts;