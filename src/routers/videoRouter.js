import express from "express"
import { watch, edit, remove, upload, update, create } from "../controllers/videoController";
import { protectorMiddleware, videoUpload } from "../middleware";

const videoRouter = express.Router();

videoRouter
    .route("/upload")
    .all(protectorMiddleware)
    .get(upload)
    .post(videoUpload.fields([
        { name: "video", maxCount: 1 }, { name: "thumb", maxCount: 1 }
    ]), create);
videoRouter.get("/:id([0-9a-f]{24})", watch);
videoRouter.route("/:id([0-9a-f]{24})/edit").all(protectorMiddleware).get(edit).post(update);
videoRouter.route("/:id([0-9a-f]{24})/delete").all(protectorMiddleware).get(remove);

export default videoRouter;