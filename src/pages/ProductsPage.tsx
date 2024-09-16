import React, { useState, useEffect } from 'react';
import ProductCard from '../Products/ProductCard';
import SearchBar from '../Search/SearchBar';

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

// Mock data
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Bamboo Toothbrush',
    description: 'Eco-friendly toothbrush made from sustainable bamboo.',
    imageUrl: '/api/placeholder/300/200',
    price: 5.99,
    sustainabilityScore: 95,
    stock: 100,
  },
  {
    id: '2',
    name: 'Reusable Water Bottle',
    description: 'Stainless steel water bottle, perfect for reducing plastic waste.',
    imageUrl: '/api/placeholder/300/200',
    price: 15.99,
    sustainabilityScore: 90,
    stock: 75,
  },
  {
    id: '3',
    name: 'Organic Cotton T-shirt',
    description: 'Comfortable t-shirt made from 100% organic cotton.',
    imageUrl: '/api/placeholder/300/200',
    price: 24.99,
    sustainabilityScore: 85,
    stock: 50,
  },
  // Add more mock products as needed
];

// Components
const Header: React.FC = () => (
  <header className="bg-green-600 text-white py-6 px-6 rounded-b-lg shadow-md mb-8">
    <h1 className="text-4xl font-bold">Products</h1>
  </header>
);

const ProductGrid: React.FC<{ products: Product[] }> = ({ products }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
    {products.map(product => (
      <ProductCard key={product.id} product={product} />
    ))}
  </div>
);

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Simulating API call with setTimeout
        await new Promise(resolve => setTimeout(resolve, 500));
        setProducts(mockProducts);
      } catch (err) {
        setError('Failed to fetch products. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log('Searching for:', query);
    // In a real application, you might want to trigger an API call here
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4">
      <Header />

      <SearchBar onSearch={handleSearch} />

      <section className="my-12">
        <h2 className="text-3xl font-semibold mb-6">All Products</h2>
        {isLoading ? (
          <div className="text-center">Loading products...</div>
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : filteredProducts.length > 0 ? (
          <ProductGrid products={filteredProducts} />
        ) : (
          <div className="text-center text-gray-500">No products found matching your search.</div>
        )}
      </section>
    </div>
  );
};

export default ProductsPage;