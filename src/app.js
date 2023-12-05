import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import axios from "axios";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(
  express.json({
    limit: "16kb",
  })
);
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// routes
import userRouter from "./routes/user.routes.js";

app.use("/api/v1/users", userRouter);

app.get("/api/pet-trivia", async (req, res) => {
  try {
    const response = await axios.get(
      "https://opentdb.com/api.php?amount=5&category=27&type=multiple"
    );
    const triviaData = response.data.results;
    res.json({ trivia: triviaData });
  } catch (error) {
    console.error("Error fetching pet trivia:", error.message);
    res.status(500).json({ error: "Failed to fetch pet trivia" });
  }
});

// http://localhost:8000/api/v1/users/register

export { app };
