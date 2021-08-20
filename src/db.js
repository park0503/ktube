import mongoose from "mongoose"

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true, })

const db = mongoose.connection;

const handleOpen = () => console.log("✔Connected to DB");
const handleError = (error) => console.log("❌DB Error", error)
db.on("error", handleError); //여러번 발생 가능
db.once("open", handleOpen) // 한 번만 발생 가능