import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import UserRoute from "./routes/UserRoute.js";

dotenv.config();

const app = express();

(async () => {
  await db.sync();
})();

app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: "auto",
    },
  })
);
app.use(
  cors({
    credentials: true,
    origin: "https://kampus-merdeka-software-engineering.github.io/front-end-capstone-project-section-balikpapan-group-7/",
  })
);

app.use(express.json());
app.use(UserRoute);

app.listen(process.env.APP_PORT, () => {
  console.log(`Server is running on ..`);
});
