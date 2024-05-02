import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import rootRouter from "./routes/root.route.js";
import questionRoute from "./routes/quiz/question.route.js";
import quizRoute from "./routes/quiz/quiz.route.js"
import optionRoute from "./routes/quiz/option.route.js"
import roleRoute from "./routes/user/role.route.js"
import userRoute from "./routes/user/user.route.js"
import authRoute from "./routes/user/auth.route.js"
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", rootRouter);
app.use("/question", questionRoute);
app.use("/quiz",quizRoute);
app.use("/option",optionRoute);
app.use("/role",roleRoute);
app.use("/user",userRoute);
app.use("/auth",authRoute);


export default app

