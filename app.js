const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const router = require("./routes/auth");
const userRouter = require("./routes/user");
const postRouter = require("./routes/post");
const commentRouter = require("./routes/comment");


require("dotenv").config();

const app = express();

//Database
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Connected to dataBase"))
  .catch((err) => console.log("dataBase connection error", err));

//App Middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());

app.use("/api", router);
app.use("/api", userRouter);
app.use("/api", postRouter);
app.use("/api", commentRouter);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`connected to port ${port}`);
});
