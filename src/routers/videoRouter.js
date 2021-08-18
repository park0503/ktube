import express from "express"
import { watch, edit, remove, upload, update, create } from "../controllers/vidoeController";

const videoRouter = express.Router();

videoRouter.route("/upload").get(upload).post(create);
videoRouter.route("/:id(\\d+)").get(watch);
videoRouter.route("/:id(\\d+)/edit").get(edit).post(update);
videoRouter.route("/:id(\\d+)/delete").get(remove);

export default videoRouter;