import express from "express"
import { reset } from "nodemon";
import { trending, search } from "../controllers/vidoeController";
import { getJoin, getLogin, postLogin, postJoin } from "../controllers/userController";

const rootRouter = express.Router();



rootRouter.route("/").get(trending);
rootRouter.route("/join").get(getJoin).post(postJoin);
rootRouter.route("/login").get(getLogin).post(postLogin);
rootRouter.route("/search").get(search);

export default rootRouter;