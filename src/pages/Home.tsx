import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../Products/ProductCard';
import SearchBar from '../Search/SearchBar';
import ForumList from '../Forum/ForumList';

// Types
type Product = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  sustainabilityScore: number;
  stock: number;
};

type ForumPost = {
  id: string;
  title: string;
  author: string;
  preview: string;
};

type User = {
  name: string;
};

// Mock data
const mockUser: User = {
  name: 'Eco Enthusiast',
};

const mockProducts: Product[] = [
  // ... (keep the existing mock products data)
];

const mockForumPosts: ForumPost[] = [
  // ... (keep the existing mock forum posts data)
];

// Components
const Header: React.FC = () => (
  <header className="bg-green-600 text-white py-6 px-6 rounded-b-lg shadow-md mb-8">
    <h1 className="text-4xl font-bold">Sustainable Living Marketplace</h1>
    <p className="mt-2 text-lg">Connecting eco-friendly sellers with conscious consumers</p>
  </header>
);

const Navigation: React.FC<{ user: User }> = ({ user }) => (
  <nav className="mb-8">
    <div className="flex justify-between items-center">
      <p className="text-lg">Welcome, <span className="font-semibold">{user.name}</span>!</p>
      <div>
        <Link
          to="/profile"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-4"
        >
          My Profile
        </Link>
        <Link
          to="/cart"
          className="bg-green-100 text-green-800 px-4 py-2 rounded hover:bg-green-200"
        >
          Cart (0)
        </Link>
      </div>
    </div>
  </nav>
);

const ProductSection: React.FC<{ title: string; products: Product[] }> = ({ title, products }) => (
  <section className="my-12">
    <h2 className="text-3xl font-semibold mb-6">{title}</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  </section>
);

const ForumSection: React.FC<{ posts: ForumPost[] }> = ({ posts }) => (
  <section className="my-12">
    <h2 className="text-3xl font-semibold mb-6">Sustainability Community</h2>
    <div className="bg-green-50 p-8 rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold mb-4">Recent Forum Posts</h3>
      <ForumList posts={posts} />
      <Link
        to="/forum"
        className="mt-6 inline-block bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 text-lg"
      >
        Join the Discussion
      </Link>
    </div>
  </section>
);

const Footer: React.FC = () => (
  <footer className="mt-16 bg-gray-100 py-8 px-4 rounded-t-lg">
    <div className="max-w-4xl mx-auto text-center">
      <p className="text-gray-600 mb-4">
        Join our mission to promote sustainable living and eco-friendly products.
      </p>
      <p className="text-gray-500">© 2024 Sustainable Living Marketplace. All rights reserved.</p>
    </div>
  </footer>
);

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log('Searching for:', query);
    // TODO: Implement search logic here when backend is ready
  };

  return (
    <div className="container mx-auto px-4">
      <Header />
      <Navigation user={mockUser} />
      <SearchBar onSearch={handleSearch} />
      <ProductSection title="Featured Eco-Friendly Products" products={mockProducts} />
      <ProductSection title="Recommended for You" products={mockProducts.slice(3, 9)} />
      <ForumSection posts={mockForumPosts} />
      <Footer />
    </div>
  );
};

export default Home;