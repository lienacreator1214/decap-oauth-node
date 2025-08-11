import express from "express";
import { createHandlers } from "netlify-cms-oauth-provider-node";

const app = express();

/*
  需要的環境變數（全部必填）——會在 Render 上填：
  ORIGIN             = https://lienacreator1214.github.io
  COMPLETE_URL       = https://<你的 render 網址>/callback
  OAUTH_CLIENT_ID    = <GitHub OAuth App 的 client id>
  OAUTH_CLIENT_SECRET= <GitHub OAuth App 的 client secret>
*/

const { begin, complete } = createHandlers({}, { useEnv: true });

// CMS 會打 base_url + /auth 開始流程
app.get("/auth", async (req, res, next) => {
  try { res.redirect(await begin(req.query.state)); }
  catch (e) { next(e); }
});

// GitHub 會回到 /callback，這裡把 token 傳回 CMS
app.get("/callback", async (req, res, next) => {
  try { res.send(await complete(req.query.code, req.query)); }
  catch (e) { next(e); }
});

// 健康檢查
app.get("/", (_, res) => res.send("Decap OAuth up"));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("listening on", port));
