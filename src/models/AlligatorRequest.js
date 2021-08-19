import mongoose from "mongoose";

const preferredProductList = [
    {
        title: "후드티",
        description: "어떤 룩에도 잘 어울리고 싶다면"
    },
    {
        title: "스웻셔츠",
        description: "편안한 무드를 즐기고 싶다면"
    },
    {
        title: "카디건",
        description: "분위기를 내고 싶다면"
    },
    {
        title: "티셔츠",
        description: "나한테 잘 어울리는 티셔츠를 찾는다면"
    },
    {
        title: "슬랙스",
        description: "깔끔한 느낌을 주고 싶다면"
    },
    {
        title: "청바지",
        description: "손이 자주가는 바지를 찾고 싶다면"
    },
    {
        title: "스니커즈",
        description: "걸을 때도 생각나는 스니커즈를 찾는다면"
    }
]

const situations = [
    {
        title: "설렘 가득한 데이트",
        image: "",
        backgroundColor: "E8F2FA"
    },
    {
        title: "완벽한 첫인상, 소개팅",
        image: "",
        backgroundColor: "FDE4F0"
    },
    {
        title: "일상 속 편안한 룩",
        image: "",
        backgroundColor: "F1F1F1"
    },
    {
        title: "지루하지 않은 출근길",
        image: "",
        backgroundColor: "ECE5DF"
    },
    {
        title: "나와 함께 떠나는 여행",
        image: "",
        backgroundColor: "F7F7F8"
    },
    {
        title: "가볍게 뛰고 싶은 날",
        image: "",
        backgroundColor: "FBF9E9"
    },
    {
        title: "친구의 특별한 결혼식",
        image: "",
        backgroundColor: "F4F6F7"
    },
]

const AlligatorRequestSchema = new mongoose.Schema({
    situation: {
        type: String,
        enum: situations.map((situation) => {
            return situation['title']
        }),
    },
    preferredProduct: {
        type: String,
        enum: preferredProductList.map((product) => {
            return product['title']
        }),
    },
    meta: {
        age: {
            type: Number,
        },
        height: {
            type: Number,
        },
        width: {
            type: Number,
        },
        preferredPriceStart: {
            type: Number,
        },
        preferredPriceEnd: {
            type: Number
        },
        likeBrands: [{
            type: String
        }],
        hateBrands: [{
            type: String
        }],
        requirement: {
            type: String
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AlligatorUser"
    },
    previews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "AlligatorPreview"
    }],
    codies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "AlligatorCody"
    }]

}, { timestamp: true });

const AlligatorRequest = mongoose.model("AlligatorRequest", AlligatorRequestSchema);
export default AlligatorRequest;