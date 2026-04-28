import convexCascadingDelete from "@00akshatsinha00/convex-cascading-delete/convex.config";
import resend from "@convex-dev/resend/convex.config.js";
import { defineApp } from "convex/server";

const app = defineApp();

app.use(convexCascadingDelete);
app.use(resend);

export default app;
