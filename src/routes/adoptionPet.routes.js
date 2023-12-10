// routes.js

import express from "express";
import { adoptPet } from "../controllers/adoptionPet.controller.js";
import { authenticateMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Adopt Pet Route
router.post("/user/adopt", authenticateMiddleware, adoptPet);

export default router;
