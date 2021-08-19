import mongoose from "mongoose";
const AlligatorPreviewSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['sports', 'cityboy', 'minimul'],
    }
}, { timestamp: true });

const AlligatorPreview = mongoose.model("AlligatorPreview", AlligatorPreviewSchema);
export default AlligatorPreview;