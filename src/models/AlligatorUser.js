import mongoose from "mongoose";
const AlligatorUserSchema = new mongoose.Schema({
    musinsaAccount: {
        type: String,
        required: true,
    },
    musinsaPassword: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        unique: true,
    },
    requests: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "AlligatorRequest",
        },
    ],
    orderedProducts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "AlligatorProduct"
        }
    ]
}, { timestamp: true });

const AlligatorUser = mongoose.model("AlligatorUser", AlligatorUserSchema);
export default AlligatorUser;