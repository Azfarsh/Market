export interface Product {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    price: number;
    sustainabilityScore: number;
    stock: number;
  }
  
  export interface ForumPost {
    id: string;
    title: string;
    author: string;
    preview: string;
  }
  export type Order = {
    id: string;
    date: string; // ISO date string
    total: number; // Order total amount
    // Add more fields as needed
  };
  // src/types.ts
export interface CartItem {
  id: number | string;  // Unique identifier for the cart item
  name: string;         // Name of the cart item
  price: number;        // Price of the cart item
}
