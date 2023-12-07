import express from "express";
const router = express.Router();

import { submitAdoptionApplication } from "../controllers/adpotionApplication.controller.js";
import { reviewAdoptionApplication } from "../controllers/adminReview.controller.js";
import { notifyAdoptionStatus } from "../controllers/adoptionNotification.controller.js";
import { adminAuthorization } from "../middlewares/adminAuthorization.js";

// Route to submit adoption applications
router.post("/adoption-applications", submitAdoptionApplication);

// Route to review adoption applications by the admin
router.put("/admin/review", adminAuthorization, reviewAdoptionApplication);

// Route to notify users about the status of their adoption application
router.post("/notify-adoption-status", notifyAdoptionStatus);

export default router;
