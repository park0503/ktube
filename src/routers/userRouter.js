import express from "express"
import { getEdit, postEdit, remove, see, logout, startGithubLogin, finishGithubLogin, getChangePassword, postChangePassword, phoneCertification } from "../controllers/userController";
import { avatarUpload, protectorMiddleware, publicOnlyMiddleware } from "../middleware";

const userRouter = express.Router();

userRouter.route("/logout").get(protectorMiddleware, logout);
userRouter.route("/:id([0-9a-f]{24})").get(see);
userRouter.route("/edit").all(protectorMiddleware).get(getEdit).post(avatarUpload.single('avatar'), postEdit);
userRouter.route("/:id([0-9a-f]{24})/delete").get(remove);
userRouter.route("/github/start").get(publicOnlyMiddleware, startGithubLogin);
userRouter.route("/github/callback").get(publicOnlyMiddleware, finishGithubLogin);
userRouter.route("/change-password").all(protectorMiddleware).get(getChangePassword).post(postChangePassword);
export default userRouter;