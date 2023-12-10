import { Router } from "express";
const router = Router();
import passport from "passport";

import {
  addVirtualPet,
  getAllVirtualPets,
} from "../controllers/pet.controller.js";
import { adminAuthorization } from "../middlewares/adminAuthorization.js";
import { deleteVirtualPet } from "../controllers/deletePet.controller.js";

const authenticateMiddleware = passport.authenticate("jwt", { session: false });

// Route to get all virtual pets
router.get("/virtual-pets", getAllVirtualPets);

// Route to add a new virtual pet
router.post("/virtual-pets", authenticateMiddleware, addVirtualPet);

router.delete("/virtual-pets/:petId",authenticateMiddleware,deleteVirtualPet);

export default router;
