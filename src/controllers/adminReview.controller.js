import { AdoptionApplication } from "../models/adoptionApplication.model.js";

// Controller to review and update adoption applications by the admin

export const listReviewAdoptionApplication = async (req, res) => {
  try {
    const listAllReviewAdoptionApplication = await AdoptionApplication.find();
    return res.status(201).json(listAllReviewAdoptionApplication);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const reviewAdoptionApplication = async (req, res) => {
  try {
    const { applicationId, status } = req.body;

    const application = await AdoptionApplication.findById(applicationId);

    if (!application) {
      return res.status(404).json({ error: "Adoption application not found" });
    }

    // Assuming user is authenticated and Passport.js adds the user to the request object
    const adminUser = req.user;

    if (!adminUser || adminUser.role !== "admin") {
      return res
        .status(403)
        .json({ error: "Unauthorized - Admin access required" });
    }

    application.status = status;
    await application.save();

    res.json({
      application,
      message: "Adoption application reviewed successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
