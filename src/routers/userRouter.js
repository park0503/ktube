import express from "express"
import { getEdit, postEdit, remove, see, logout, startGithubLogin, finishGithubLogin, getChangePassword, postChangePassword } from "../controllers/userController";
import { protectorMiddleware, publicOnlyMiddleware } from "../middleware";

const userRouter = express.Router();

userRouter.route("/logout").get(protectorMiddleware, logout);
userRouter.route("/:id(\\d+)").get(see);
userRouter.route("/edit").all(protectorMiddleware).get(getEdit).post(postEdit);
userRouter.route("/:id(\\d+)/delete").get(remove);
userRouter.route("/github/start").get(publicOnlyMiddleware, startGithubLogin);
userRouter.route("/github/callback").get(publicOnlyMiddleware, finishGithubLogin);
userRouter.route("/change-password").all(protectorMiddleware).get(getChangePassword).post(postChangePassword);
export default userRouter;