import express from "express";
import morgan from 'morgan';
import rootRouter from "./routers/rootRouter"
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import session from "express-session";
import MongoStore from "connect-mongo";
import { localsMiddleware } from "./middleware";
import apiRouter from "./routers/apiRouter";
import flash from "express-flash";



const app = express();
const logger = morgan("dev");

app.set("views", process.cwd() + "/src/views") // process.cwd() => root의 주소
app.set("view engine", "pug");

//ffmpeg 최신버전 보안상 이유로 corp 처리
app.use((req, res, next) => {
    res.header("Cross-Origin-Embedder-Policy", "require-corp");
    res.header("Cross-Origin-Opener-Policy", "same-origin");
    next();
});

app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
}));


app.use(flash());
app.use(localsMiddleware); //꼭 session middleware 이후에 와야 함.
//express에게 해당 path의 입력이 static이라고, 즉 유저에게 공개해달라고 알려줌.
app.use("/uploads", express.static("uploads"));

//이걸 추가 안하면 ffmpeg module을 지 혼자 못찾음
app.use("/assets", express.static("assets"), express.static("node_modules/@ffmpeg/core/dist"));


app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);
app.use("/api", apiRouter);
export default app;