import { Password } from "@convex-dev/auth/providers/Password";
import { convexAuth } from "@convex-dev/auth/server";
import type { DataModel } from "./_generated/dataModel";
import { resend } from "./helpers/email";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [Password],
  callbacks: {
    afterUserCreatedOrUpdated: async (ctx, { userId }) => {
      const user: DataModel["users"]["document"] = await ctx.db.get(userId);
      await resend.sendEmail(ctx, {
        from: "Next-Convex <next-convex@prazakl.cz>",
        to: user.email,
        subject: "Welcome to the app 👋",
        html: `
          <div>
            <h1>Welcome!</h1>
            <p>Thanks for signing up, ${user.name ?? user.email}.</p>
          </div>
        `,
      });
    },
  },
});
