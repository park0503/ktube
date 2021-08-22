import express from "express"
import { watch, edit, remove, upload, update, create } from "../controllers/vidoeController";
import { prot, protectorMiddleware } from "../middleware";

const videoRouter = express.Router();

videoRouter.route("/upload").all(protectorMiddleware).get(upload).post(create);
videoRouter.get("/:id([0-9a-f]{24})", watch);
videoRouter.route("/:id([0-9a-f]{24})/edit").all(protectorMiddleware).get(edit).post(update);
videoRouter.route("/:id([0-9a-f]{24})/delete").all(protectorMiddleware).get(remove);

export default videoRouter;