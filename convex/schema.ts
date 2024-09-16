import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// Define the schema
export default defineSchema({
  // Users table
  users: defineTable({
    name: v.string(),
    email: v.string(),
    passwordHash: v.string(),
    image: v.optional(v.string()),
    emailVerificationTime: v.optional(v.number()),
    phone: v.optional(v.string()),
    phoneVerificationTime: v.optional(v.number()),
    isAnonymous: v.optional(v.boolean()),
  }).index("by_email", ["email"]),

  // ForumPosts table
  forumPosts: defineTable({
    userId: v.id("users"),  // Reference to the users collection
    title: v.string(),
    content: v.string(),
    createdAt: v.string(),
  }),

  // ForumComments table
  forumComments: defineTable({
    postId: v.id("forumPosts"),  // Reference to the forumPosts collection
    userId: v.id("users"),       // Reference to the users collection
    content: v.string(),
    createdAt: v.string(),
  }),

  // Products table
  products: defineTable({
    name: v.string(),
    description: v.string(),
    price: v.number(),
    quantity: v.number(),
    imageUrl: v.optional(v.string()),
  }),

  //Orders table
  orders: defineTable({
    userId: v.id("users"),
    items: v.array(
      v.object({
        productId: v.id("products"),
        quantity: v.number(),
      })
    ),
    totalAmount: v.number(),
    status: v.string(),
    createdAt: v.string(),
  }).index("by_userId", ["userId"])
});
