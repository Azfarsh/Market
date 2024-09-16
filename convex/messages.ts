import { getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Query to list forum posts with author names
export const listForumPosts = query({
  args: {},
  handler: async (ctx) => {
    // Query the forumPosts table for the most recent 100 posts.
    const posts = await ctx.db.query("forumPosts").order("desc").take(100);

    // Add author's name or email to each post.
    return Promise.all(
      posts.map(async (post) => {
        const user = await ctx.db.get(post.userId);  // Get the user by userId from users table
        if (!user) {
          return { ...post, author: "Unknown user" };
        }
        const { name, email } = user;
        return { ...post, author: name ?? email };  // Add name or email to post data
      })
    );
  },
});

// Mutation to create a forum post
export const createForumPost = mutation({
  args: {
    title: v.string(),
    content: v.string(),
  },
  handler: async (ctx, { title, content }) => {
    const userId = await getAuthUserId(ctx);  // Get authenticated user ID
    if (!userId) {
      throw new Error("User not authenticated");
    }

    // Insert a new post into the forumPosts table
    await ctx.db.insert("forumPosts", {
      title,
      content,
      userId,
      createdAt: new Date().toISOString(),  // Add creation timestamp
    });
  },
});

// Query to list orders for a user
export const listOrders = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("User not authenticated");
    }

    // Query orders by the userId from the orders table
    return await ctx.db.query("orders").filter(q => q.eq(q.field("userId"), userId)).take(100);
  },
});

// Mutation to create an order
export const createOrder = mutation({
  args: {
    items: v.array(
      v.object({
        productId: v.id("products"),
        quantity: v.number(),
      })
    ),
  },
  handler: async (ctx, { items }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("User not authenticated");
    }

    // Calculate the total amount based on the product prices and quantities
    let totalAmount = 0;
    for (const item of items) {
      const product = await ctx.db.get(item.productId);
      if (!product) {
        throw new Error(`Product with id ${item.productId} not found`);
      }
      totalAmount += product.price * item.quantity;
    }

    // Insert the order into the orders table
    await ctx.db.insert("orders", {
      userId,
      items,
      totalAmount,
      status: "pending",
      createdAt: new Date().toISOString(),  // Add creation timestamp
    });
  },
});

// Query to get product details
export const getProduct = query({
  args: { productId: v.id("products") },
  handler: async (ctx, { productId }) => {
    // Get product details from the products table
    return await ctx.db.get(productId);
  },
});

// Mutation to update product quantity (for inventory management)
export const updateProductQuantity = mutation({
  args: {
    productId: v.id("products"),
    quantity: v.number(),
  },
  handler: async (ctx, { productId, quantity }) => {
    // Update the product quantity in the products table
    await ctx.db.patch(productId, { quantity });
  },
});
