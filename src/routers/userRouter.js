import express from "express"
import { edit, remove, see, logout } from "../controllers/userController";

const userRouter = express.Router();

userRouter.route("/logout").get(logout);
userRouter.route("/:id(\\d+)").get(see);
userRouter.route("/:id(\\d+)/edit").get(edit);
userRouter.route("/:id(\\d+)/delete").get(remove);


export default userRouter;