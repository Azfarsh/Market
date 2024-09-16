import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Define the Product type
interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  sustainabilityScore: number;
  stock: number;
}

// Mock data (replace with API call in production)
const mockProducts: Record<string, Product> = {
  '1': {
    id: '1',
    name: 'Eco-Friendly Water Bottle',
    description: 'Durable, BPA-free water bottle made from recycled materials.',
    imageUrl: '/api/placeholder/300/200',
    price: 19.99,
    sustainabilityScore: 85,
    stock: 10,
  },
  '2': {
    id: '2',
    name: 'Organic Cotton T-Shirt',
    description: 'Soft, breathable t-shirt made from 100% organic cotton.',
    imageUrl: '/api/placeholder/300/200',
    price: 24.99,
    sustainabilityScore: 90,
    stock: 15,
  },
};

// Components
const Header: React.FC<{ productName: string }> = ({ productName }) => (
  <header className="bg-green-600 text-white py-6 px-6 rounded-b-lg shadow-md mb-8">
    <h1 className="text-4xl font-bold">{productName}</h1>
  </header>
);

const ProductImage: React.FC<{ imageUrl: string; altText: string }> = ({ imageUrl, altText }) => (
  <img src={imageUrl} alt={altText} className="w-full md:w-1/2 h-auto rounded-lg shadow-md mb-4 md:mb-0" />
);

const ProductInfo: React.FC<{ product: Product }> = ({ product }) => (
  <div className="w-full md:w-1/2 md:pl-8">
    <p className="text-lg mb-4">{product.description}</p>
    <p className="text-xl font-semibold mb-4">${product.price.toFixed(2)}</p>
    <p className="text-md mb-4">Sustainability Score: {product.sustainabilityScore}</p>
    <p className="text-md mb-4">Stock: {product.stock}</p>
    <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-200">
      Add to Cart
    </button>
  </div>
);

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Simulating API call with setTimeout
        await new Promise(resolve => setTimeout(resolve, 500));
        const fetchedProduct = mockProducts[productId || ''];
        if (fetchedProduct) {
          setProduct(fetchedProduct);
        } else {
          throw new Error('Product not found');
        }
      } catch (err) {
        setError('Failed to fetch product details. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (isLoading) {
    return <div className="text-center py-8">Loading product details...</div>;
  }

  if (error || !product) {
    return <div className="text-center py-8 text-red-500">{error || 'Product not found'}</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <Header productName={product.name} />
      <section className="my-12 flex flex-col md:flex-row">
        <ProductImage imageUrl={product.imageUrl} altText={product.name} />
        <ProductInfo product={product} />
      </section>
    </div>
  );
};

export default ProductDetailPage;