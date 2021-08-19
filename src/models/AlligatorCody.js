import mongoose from "mongoose";
const AlligatorCodySchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    review: {
        codyRating: {
            type: Number
        },
        productRating: {
            stype: Number
        },
        opinion: {
            type: String
        }
    },
    influencerId: {
        type: Number
    },
    request: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AlligatorRequest"
    },
    recommendedProducts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "AlligatorCodyProduct"
        }
    ]

}, { timestamp: true });

const AlligatorCody = mongoose.model("AlligatorCody", AlligatorCodySchema);
export default AlligatorCody;