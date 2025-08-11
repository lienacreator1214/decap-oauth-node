import express from "express";
import { githubOAuthRouter } from "netlify-cms-oauth-provider-node";

const app = express();

/**
 * 需要的四個環境變數：
 * OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET
 * ORIGIN = https://你的帳號.github.io
 * COMPLETE_URL = https://你的-render-網址/callback
 */

app.use("/", githubOAuthRouter());

app.get("/", (_, res) => {
  res.send("Decap CMS OAuth provider up");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("OAuth server listening on", port));
