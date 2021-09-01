import express from "express";
import morgan from 'morgan';
import rootRouter from "./routers/rootRouter"
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import session from "express-session";
import MongoStore from "connect-mongo";
import { localsMiddleware } from "./middleware";



const app = express();
const logger = morgan("dev");

app.set("views", process.cwd() + "/src/views")
app.set("view engine", "pug");

app.use(logger);
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
}));

app.use(localsMiddleware); //꼭 session middleware 이후에 와야 함.
//express에게 해당 path의 입력이 static이라고, 즉 유저에게 공개해달라고 알려줌.
app.use("/uploads", express.static("uploads"));
app.use("/assets", express.static("assets"));
app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

export default app;