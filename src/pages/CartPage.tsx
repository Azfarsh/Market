import React from 'react';
import { CartItem } from '../types'; // Import CartItem type
import { useNavigate } from 'react-router-dom'; // Updated to useNavigate

// Sample cart items (mock data)
const mockCartItems: CartItem[] = [
  { id: 1, name: 'Sample Item 1', price: 19.99 },
  { id: 2, name: 'Sample Item 2', price: 29.99 },
];

const CartPage: React.FC = () => {
  const navigate = useNavigate(); // Replaced useHistory with useNavigate

  // Function to handle "Proceed to Checkout" button
  const handleCheckout = () => {
    // Navigate to checkout page
    navigate('/checkout');
  };

  return (
    <div className="container mx-auto px-4">
      <header className="bg-green-600 text-white py-6 px-6 rounded-b-lg shadow-md mb-8">
        <h1 className="text-4xl font-bold">Your Cart</h1>
      </header>

      <section className="my-12">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold mb-6">Items in Cart</h2>

          {mockCartItems.length === 0 ? (
            <p className="text-gray-600">Your cart is empty.</p>
          ) : (
            <ul>
              {mockCartItems.map((item) => (
                <li key={item.id} className="flex justify-between mb-4 p-4 border-b">
                  <div>{item.name}</div>
                  <div>${item.price.toFixed(2)}</div>
                </li>
              ))}
            </ul>
          )}

          {mockCartItems.length > 0 && (
            <>
              <div className="flex justify-between mt-6 text-xl font-semibold">
                <span>Total:</span>
                <span>
                  ${mockCartItems.reduce((total, item) => total + item.price, 0).toFixed(2)}
                </span>
              </div>

              <button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mt-6"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </button>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default CartPage;
