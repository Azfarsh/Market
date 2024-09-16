import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Updated Product interface to match the actual database schema
interface Product {
  name: string;
  description: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  createdAt: string;
}

export const createProduct = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    price: v.number(),
    quantity: v.number(),
    imageUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const product: Product = {
      ...args,
      createdAt: new Date().toISOString(),
    };
    const productId = await ctx.db.insert("products", product);
    return productId;
  },
});

export const getProducts = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("products")
      .order("desc")
      .collect();
  },
});

export const getProductById = query({
  args: { id: v.id("products") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const updateProduct = mutation({
  args: {
    id: v.id("products"),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    price: v.optional(v.number()),
    quantity: v.optional(v.number()),
    imageUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updateFields } = args;
    await ctx.db.patch(id, updateFields);
  },
});

export const deleteProduct = mutation({
  args: { id: v.id("products") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

// Updated schema definition
export default {
  products: {
    name: v.string(),
    description: v.string(),
    price: v.number(),
    quantity: v.number(),
    imageUrl: v.optional(v.string()),
    createdAt: v.string(),
  },
  // ... other tables
};