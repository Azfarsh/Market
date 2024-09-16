import { httpRouter } from "convex/server";
import { handleAuthenticate, handleLogin, handleLogout } from "./auth";
import { httpAction } from "./_generated/server";

const http = httpRouter();

http.route({
  path: "/authenticate",
  method: "POST",
  handler: httpAction( async (ctx, request) => {
    const { email, password } = await request.json();
    const response = await handleAuthenticate(ctx.runMutation, ctx.runQuery, email, password);
    return new Response(JSON.stringify(response), {
      status: response.success ? 200 : 401,
      headers: { "Content-Type": "application/json" },
    });
  }),
});

http.route({
  path: "/login",
  method: "POST",
  handler: httpAction(async(ctx, request) => {
    const { email, password } = await request.json();
    const response = await handleLogin(ctx.runMutation, ctx.runQuery, email, password);
    return new Response(JSON.stringify(response), {
      status: response.success ? 200 : 401,
      headers: { "Content-Type": "application/json" },
    });
  }),
});

http.route({
  path: "/logout",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const { token } = await request.json();
    await handleLogout(ctx.runMutation, token);
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }),
});

export default http;