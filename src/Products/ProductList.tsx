import React from 'react';

const ProductList: React.FC = () => {
  return (
    <div>
      <h2>All Products</h2>
      <ul>
        {/* Static example - you can replace this with dynamic data later */}
        <li>Reusable Water Bottle</li>
        <li>Solar-powered Charger</li>
        <li>Biodegradable Cutlery</li>
      </ul>
    </div>
  );
};

export default ProductList;