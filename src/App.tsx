import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Layout } from './Layout';
import { SignInForm } from './SignInForm';
import { Authenticated, Unauthenticated } from 'convex/react';

import Home from './pages/Home';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/Checkout';
import OrdersPage from './pages/OrdersPage';
import ProfilePage from './pages/ProfilePage';
import ForumPage from './pages/ForumPage';
// import ChatPage from './pages/ChatPage'; // Ensure ChatPage is correctly defined if used

const App: React.FC = () => {
  return (
    <Router>
      <Layout
        menu={
          <Authenticated>
            <div className="user-menu-placeholder">
              Hello, user
            </div>
          </Authenticated>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/forum" element={<ForumPage />} />
          <Route
            path="/login"
            element={
              <Unauthenticated>
                <SignInForm />
              </Unauthenticated>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
