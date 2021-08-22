import express from "express"
import { getEdit, postEdit, remove, see, logout, startGithubLogin, finishGithubLogin } from "../controllers/userController";
import { protectorMiddleware, publicOnlyMiddleware } from "../middleware";

const userRouter = express.Router();

userRouter.route("/logout").get(protectorMiddleware, logout);
userRouter.route("/:id(\\d+)").get(see);
userRouter.route("/edit").all(protectorMiddleware).get(getEdit).post(postEdit);
userRouter.route("/:id(\\d+)/delete").get(remove);
userRouter.route("/github/start").get(publicOnlyMiddleware, startGithubLogin);
userRouter.route("/github/callback").get(publicOnlyMiddleware, finishGithubLogin);
export default userRouter;