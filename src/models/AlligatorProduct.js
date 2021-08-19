import mongoose from "mongoose";
const AlligatorProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    originalPrice: {
        type: Number,
    },
    codyImage: {
        type: String,
    },
    detailImages: [{
        type: String,
    }],
    bannerImages: [{
        type: String,
    }],
    mainImage: {
        type: String,
    },
    tags: [{
        type: String
    }],
    musinsaId: {
        type: Number
    }
}, { timestamp: true });

const AlligatorProduct = mongoose.model("AlligatorProduct", AlligatorProductSchema);
export default AlligatorProduct;