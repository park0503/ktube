import mongoose from "mongoose"

mongoose.connect("mongodb://127.0.0.1:27017", { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection;

const handleOpen = () => console.log("✔Connected to DB");
const handleError = () => console.log("❌DB Error", error)
db.on("error", handleError); //여러번 발생 가능
db.once("open", handleOpen) // 한 번만 발생 가능