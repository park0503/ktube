import mongoose from "mongoose";
const AlligatorCodyProductSchema = new mongoose.Schema({
    position: {
        zIndex: {
            type: Number
        },
        width: {
            type: Number
        },
        height: {
            type: Number
        },
        left: {
            type: Number
        },
        right: {
            type: Number
        }
    },
    cody: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AlligatorCody"
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AlligatorProduct"
    },
}, { timestamp: true });

const AlligatorCodyProduct = mongoose.model("AlligatorCodyProduct", AlligatorCodyProductSchema);
export default AlligatorCodyProduct;