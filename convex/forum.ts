import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createForumPost = mutation({
  args: { 
    userId: v.id("users"),
    title: v.string(),
    content: v.string()
  },
  handler: async (ctx, args) => {
    const postId = await ctx.db.insert("forumPosts", {
      ...args,
      createdAt: new Date().toISOString(),
    });
    return { postId };
  },
});

export const getForumPosts = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("forumPosts")
      .order("desc")
      .take(20);
  },
});

export const addForumComment = mutation({
  args: { 
    postId: v.id("forumPosts"),
    userId: v.id("users"),
    content: v.string()
  },
  handler: async (ctx, args) => {
    const commentId = await ctx.db.insert("forumComments", {
      ...args,
      createdAt: new Date().toISOString(),
    });
    return { commentId };
  },
});

export const getForumComments = query({
  args: { postId: v.id("forumPosts") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("forumComments")
      .filter((q) => q.eq(q.field("postId"), args.postId))
      .order("asc")
      .collect();
  },
});