import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    fileUrl: { type: String, required: true },
    thumbUrl: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true, trim: true, maxLength: 80 },
    createdAt: { type: Date, required: true, default: Date.now, trim: true, minLength: 20 },
    hashtags: [{ type: String, trim: true }],
    meta: {
        views: { type: Number, default: 0, required: true },
        rating: { type: Number, default: 0, required: true },
    },
    owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: `User` },
});

videoSchema.static("formatHashtags", (hashtags) => {
    return hashtags.split(",").map((word) => (word.startsWith("#") ? word : `#${word}`));
});

const Video = mongoose.model("Video", videoSchema);
export default Video;