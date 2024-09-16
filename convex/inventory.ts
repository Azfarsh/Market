import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Mutation to update product quantity
export const updateProductQuantity = mutation({
  args: {
    productId: v.id("products"),
    quantity: v.number(),
  },
  handler: async (ctx, args) => {
    const { productId, quantity } = args;
    
    const existingProduct = await ctx.db.get(productId);
    if (!existingProduct) {
      throw new Error("Product not found");
    }
    
    await ctx.db.patch(productId, { quantity });
  },
});

// Query to get product quantity
export const getProductQuantity = query({
  args: { productId: v.id("products") },
  handler: async (ctx, args) => {
    const product = await ctx.db.get(args.productId);
    return product ? product.quantity : null;
  },
});

// Query to check availability of a product
export const checkAvailability = query({
  args: {
    productId: v.id("products"),
    requestedQuantity: v.number(),
  },
  handler: async (ctx, args) => {
    const product = await ctx.db.get(args.productId);
    if (!product) {
      return false;
    }
    return product.quantity >= args.requestedQuantity;
  },
});