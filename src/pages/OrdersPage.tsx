import React, { useState } from 'react';

// Define the Order type
type OrderStatus = 'Delivered' | 'Shipped' | 'Processing';

interface Order {
  id: string;
  date: string;
  total: number;
  status: OrderStatus;
}

// Mock data
const mockOrders: Order[] = [
  { id: '1', date: '2024-03-15T10:00:00Z', total: 150.99, status: 'Delivered' },
  { id: '2', date: '2024-03-10T14:30:00Z', total: 75.50, status: 'Shipped' },
  { id: '3', date: '2024-03-05T09:15:00Z', total: 200.00, status: 'Processing' },
];

// Components
const Header: React.FC = () => (
  <header className="bg-green-600 text-white py-6 px-6 rounded-b-lg shadow-md mb-8">
    <h1 className="text-4xl font-bold">Your Orders</h1>
  </header>
);

// Helper function
const getStatusColor = (status: OrderStatus): string => {
  switch (status) {
    case 'Delivered':
      return 'bg-green-100 text-green-800';
    case 'Shipped':
      return 'bg-blue-100 text-blue-800';
    case 'Processing':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const OrderItem: React.FC<{ order: Order }> = ({ order }) => (
  <li className="mb-4 p-4 border-b hover:bg-gray-50 transition-colors duration-150 ease-in-out">
    <div className="flex justify-between items-center">
      <div>
        <div className="font-semibold">Order ID: {order.id}</div>
        <div>Date: {new Date(order.date).toLocaleDateString()}</div>
        <div>Total: ${order.total.toFixed(2)}</div>
      </div>
      <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
        {order.status}
      </div>
    </div>
  </li>
);

const OrderList: React.FC<{ orders: Order[] }> = ({ orders }) => (
  <ul>
    {orders.map(order => (
      <OrderItem key={order.id} order={order} />
    ))}
  </ul>
);

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Simulating data fetching
  React.useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // In a real application, you would fetch data from an API here
        // For now, we'll just use a timeout to simulate an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setOrders(mockOrders);
      } catch (err) {
        setError('Failed to fetch orders. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <Header />
      <section className="my-12">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold mb-6">Order History</h2>
          {isLoading ? (
            <div className="text-center">Loading orders...</div>
          ) : error ? (
            <div className="text-red-500 text-center">{error}</div>
          ) : orders.length > 0 ? (
            <OrderList orders={orders} />
          ) : (
            <div className="text-center text-gray-500">No orders found.</div>
          )}
        </div>
      </section>
    </div>
  );
};

export default OrdersPage;