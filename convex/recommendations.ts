import { query } from "./_generated/server";
import { v } from "convex/values";

export const getRecommendations = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    // Get user's purchase history
    const userOrders = await ctx.db
      .query("orders")
      .filter(q => q.eq(q.field("userId"), args.userId))
      .collect();

    // Get user's profile (though we won't use preferences as they don't exist in the current schema)
    const userProfile = await ctx.db.get(args.userId);

    // Collect product IDs from user's purchase history
    const purchasedProductIds = userOrders.flatMap(order => order.items.map(item => item.productId));

    // Get all products
    const allProducts = await ctx.db.query("products").collect();

    // Simple scoring system
    const scoredProducts = allProducts.map(product => {
      let score = 0;

      // Increase score for products the user has purchased before
      if (purchasedProductIds.includes(product._id)) {
        score += 2;
      }

      // You could add more scoring criteria here based on the available product attributes
      // For example, if you have a 'popularity' or 'rating' field, you could use that

      return { ...product, score };
    });

    // Sort products by score and return top 10
    return scoredProducts
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
      .map(({ score, ...product }) => product);
  },
});