import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getUserProfile = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.userId);
  },
});

export const updateUserProfile = mutation({
  args: { 
    userId: v.id("users"),
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    preferences: v.optional(v.array(v.string()))
  },
  handler: async (ctx, args) => {
    const { userId, ...updateFields } = args;
    await ctx.db.patch(userId, updateFields);
    return { success: true };
  },
});
// Define the User type based on the expected user properties
export interface User {
  id: string;         // Unique identifier for the user
  name?: string;      // Optional user name
  email?: string;     // Optional user email
  preferences?: string[]; // Optional user preferences
  // Add any other properties you expect on the user object
}
