import { Router } from "express";
import passport from "passport";
import {
  loginUser,
  registerUser,
  userProfile,
} from "../controllers/user.controller.js";

import { upload } from "../middlewares/multer.middleware.js";

const authenticateMiddleware = passport.authenticate("jwt", { session: false });

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    // {
    //   name: "coverImage",
    //   maxCount: 1,
 // maxcount:2
    // },
  ]),
  registerUser
);

// registerUser.
router.route("/login").post(loginUser);

router.route("/profile").get(authenticateMiddleware, userProfile);

export default router;
