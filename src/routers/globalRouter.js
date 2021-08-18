import express from "express"
import { reset } from "nodemon";
import { trending, search } from "../controllers/vidoeController";
import { join, login } from "../controllers/userController";

const globalRouter = express.Router();



globalRouter.route("/").get(trending);
globalRouter.route("/join").get(join);
globalRouter.route("/login").get(login);
globalRouter.route("/search").get(search);

export default globalRouter;