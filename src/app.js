import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import passportPort from "./utils/jwtStrategy.js";
import { Server } from "socket.io";
import http from "http";

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: "*" });

let likes = 0;

io.on("connection", (socket) => {
  socket.emit("likeupdate", likes);
  socket.on("liked", () => {
    likes++;
    socket.emit("likeupdate", likes);
    socket.broadcast.emit("likeupdate", likes);
  });
});

// io.listen(3000);

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
app.use(passportPort.initialize());

app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// routes
import userRouter from "./routes/user.routes.js";
import virtualPetRoutes from "./routes/pets.routes.js";
import petAdoptionRoutes from "./routes/petAdoption.routes.js";
import AdoptionPetRoutes from './routes/adoptionPet.routes.js'

app.use("/api/v1/users", userRouter);

app.use("/api/v1/virtualpets", virtualPetRoutes);

app.use("/api/v1/adoption", petAdoptionRoutes);

app.use("/api/v1/pet-apotion",AdoptionPetRoutes)

// http://localhost:8000/api/v1/users/register

export { server };
