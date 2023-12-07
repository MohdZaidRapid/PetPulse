import express from "express";
const router = express.Router();
import passport from "passport";

import { submitAdoptionApplication } from "../controllers/adpotionApplication.controller.js";
import {
  reviewAdoptionApplication,
  listReviewAdoptionApplication,
} from "../controllers/adminReview.controller.js";
import { notifyAdoptionStatus } from "../controllers/adoptionNotification.controller.js";
import { adminAuthorization } from "../middlewares/adminAuthorization.js";
const authenticateMiddleware = passport.authenticate("jwt", { session: false });

// Route to submit adoption applications

router.get(
  "/listReviewAdoptionApplication",
  authenticateMiddleware,
  adminAuthorization,
  listReviewAdoptionApplication
);
router.post(
  "/adoption-applications",
  authenticateMiddleware,
  submitAdoptionApplication
);

// Route to review adoption applications by the admin
router.put(
  "/admin/review",
  authenticateMiddleware,
  adminAuthorization,
  reviewAdoptionApplication
);

// Route to notify users about the status of their adoption application
router.post(
  "/notify-adoption-status",
  authenticateMiddleware,
  adminAuthorization,
  notifyAdoptionStatus
);

export default router;
