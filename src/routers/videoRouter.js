import express from "express"
import { watch, edit, remove, upload, update, create } from "../controllers/vidoeController";

const videoRouter = express.Router();

videoRouter.route("/upload").get(upload).post(create);
videoRouter.get("/:id([0-9a-f]{24})", watch);
videoRouter.route("/:id([0-9a-f]{24})/edit").get(edit).post(update);
videoRouter.route("/:id([0-9a-f]{24})").get(remove);

export default videoRouter;