import Video from "../models/Video";
import User from "../models/User";
import Comment from "../models/Comment";

export const trending = async (req, res) => {
    const videos = await Video.find({}).sort({ createdAt: "desc" }).populate("owner");
    return res.render("home", { pageTitle: "Home", videos });
};

export const watch = async (req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id).populate("owner").populate("comments");
    if (!video) {
        return res.status(404).render("404", { pageTitle: "Video not found." });
    }
    return res.render("videos/watch", { pageTitle: video.title, video });
}
export const edit = async (req, res) => {
    const {
        params: {
            id,
        },
        session: {
            user: {
                _id: currentUserId
            }
        }
    } = req;
    const video = await Video.findById(id);
    if (!video) {
        return res.status(404).render("404", { pageTitle: "Video not found." });
    }
    if (String(video.owner) !== currentUserId) {
        req.flash("error", "Not authorized");
        return res.status(403).redirect("/");
    }
    return res.render("videos/edit", { pageTitle: `Edit: ${video.title}`, video });
}

export const update = async (req, res) => {
    const {
        params: {
            id
        },
        body: {
            title, description, hashtags,
        },
        session: {
            user: {
                _id: currentUserId
            }
        }
    } = req;
    const video = await Video.findById(id);
    if (!video) {
        return res.status(404).render("404", { pageTitle: "Video not found." });
    }
    if (String(video.owner) !== currentUserId) {
        req.flash("error", "You are not hte owner of the video.");
        return res.status(403).redirect("/");
    }
    await Video.findByIdAndUpdate(id, {
        title,
        description,
        hashtags: Video.formatHashtags(hashtags),
    });
    req.flash("success", "Changes saved");
    return res.redirect(`/videos/${id}`);
}

export const search = async (req, res) => {
    const { keyword } = req.query;
    let videos = [];
    if (keyword) {
        videos = await Video.find({
            title: {
                $regex: new RegExp(`${keyword}$`, "i"),
            },
        }).populate("owner");
    }
    return res.render("search", { pageTitle: "Search", videos });
}
export const remove = async (req, res) => {
    const {
        params: { id },
        session: {
            user: {
                _id: currentUserId,
            }
        }
    } = req;
    const video = await Video.findById(id);
    if (!video) {
        return res.status(404).render("404", { pageTitle: "Video not found." });
    }
    if (String(video.owner) !== currentUserId) {
        return res.status(403).redirect("/");
    }
    const user = await User.findById(video.owner);
    await Video.findByIdAndDelete(id);
    user.videos.splice(user.videos.indexOf(id));
    await user.save();
    return res.redirect("/");
}
export const upload = (req, res) => {
    return res.render("videos/upload", {
        pageTitle: "Upload Video"
    });
}
export const create = async (req, res) => {
    const { user: { _id } } = req.session;
    const { video, thumb } = req.files;
    const { title, description, hashtags } = req.body;
    try {
        const newVideo = await Video.create({
            title,
            description,
            fileUrl: video[0].path,
            thumbUrl: thumb[0].path,
            hashtags: Video.formatHashtags(hashtags),
            owner: _id,
        });
        const user = await User.findById(_id);
        user.videos.push(newVideo._id);
        await user.save();
        return res.redirect(`/videos/${newVideo._id}`);
    } catch (error) {
        return res.render("videos/upload", {
            pageTitle: "Upload Video",
            errorMessage: error._message,
        });
    }
}

export const registerView = async (req, res, next) => {
    const { id } = req.params;
    const video = await Video.findById(id);
    if (!video) {
        return res.sendStatus(404)
    }
    video.meta.views = video.meta.views + 1;
    await video.save();
    return res.sendStatus(200);
};

export const createComment = async (req, res, next) => {
    const {
        session: { user },
        body: { text },
        params: { id }
    } = req;
    const video = await Video.findById(id);
    if (!video) {
        return res.sendStatus(404);
    }
    const comment = await Comment.create({
        text,
        video: id,
        owner: user._id
    });
    video.comments.push(comment._id);
    video.save();
    return res.status(201).json({ newCommentId: comment._id });
};

export const deleteComment = async (req, res, next) => {
    const {
        session: { user },
        params: { id }
    } = req;
    const comment = await Comment.findById(id);
    if (comment && comment.owner.toString() === user._id) {
        const video = await Video.findById(comment.video);
        if (!video) {
            return res.sendStatus(404);
        }
        await Comment.deleteOne({ _id: id });
        video.comments.pop(id);
        video.save()
        return res.sendStatus(200);
    } else {
        return res.sendStatus(404);
    }
};