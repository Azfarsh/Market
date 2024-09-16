import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { generateHash, compareHash } from "./utils";

// Sign up mutation
export const signUp = mutation({
  args: { email: v.string(), password: v.string(), name: v.string() },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();
    
    if (existingUser) {
      throw new Error("Email already in use");
    }

    const passwordHash = await generateHash(args.password);
    const user = { 
      email: args.email, 
      passwordHash, 
      name: args.name,
      isAnonymous: false,
    };
    const userId = await ctx.db.insert("users", user);
    return { userId };
  },
});

// Sign in query
export const signIn = query({
  args: { email: v.string(), password: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();
    
    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isPasswordValid = await compareHash(args.password, user.passwordHash);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    return { userId: user._id };
  },
});

// Sign out mutation
export const signOut = mutation({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    // Logic for handling user sign out
    // If you have a session or token, you can invalidate or remove it here
    return { success: true, message: "User signed out successfully" };
  }
});

// Handle authentication
export const handleAuthenticate = async (runMutation: any, runQuery: any, email: string, password: string) => {
  try {
    const user = await runQuery(signIn, { email, password });
    return { success: true, token: "JWT_TOKEN" };  // Generate a token if needed
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "An unknown error occurred" };
  }
};

// Handle login
export const handleLogin = async (runMutation: any, runQuery: any, email: string, password: string) => {
  try {
    const user = await runQuery(signIn, { email, password });
    return { success: true, userId: user.userId };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "An unknown error occurred" };
  }
};

// Handle logout
export const handleLogout = async (runMutation: any, userId: string) => {
  try {
    await runMutation(signOut, { userId });
    return { success: true, message: "Logged out successfully" };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: "An unknown error occurred during logout" };
  }
};

// Export auth object that includes both signUp, signIn, and signOut
export const auth = {
  signUp,
  signIn,
  signOut,
  handleAuthenticate,
  handleLogin,
  handleLogout,
};
