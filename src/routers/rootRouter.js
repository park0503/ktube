import express from "express"
import { reset } from "nodemon";
import { trending, search } from "../controllers/videoController";
import { getJoin, getLogin, postLogin, postJoin, finishGithubLogin } from "../controllers/userController";
import { publicOnlyMiddleware } from "../middleware";

const rootRouter = express.Router();



rootRouter.route("/").get(trending);
rootRouter.route("/join").all(publicOnlyMiddleware).get(getJoin).post(postJoin);
rootRouter.route("/login").all(publicOnlyMiddleware).get(getLogin).post(postLogin);
rootRouter.route("/search").get(search);
rootRouter.route("/github/callback").get(finishGithubLogin);
export default rootRouter;