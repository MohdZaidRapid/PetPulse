import { AdoptionApplication } from "../models/adoptionApplication.model.js";
import { User } from "../models/user.model.js"; // Assuming you have a User model
import { sendMail } from "../utils/sendNotification.js";

// Controller to notify users about the status of their adoption application
const notifyAdoptionStatus = async (req, res) => {
  try {
    const { userId, applicationId, status } = req.body;

    // Assuming you have a function to send notifications (e.g., sendNotification function)
    // This function should be implemented based on your notification system (email, push notification, etc.)

    const user = await User.findById(userId);
    const application = await AdoptionApplication.findById(applicationId);

    if (!user || !application) {
      return res
        .status(404)
        .json({ error: "User or adoption application not found" });
    }

    // Send a notification to the user about the adoption application status
    await sendMail(
      user?.email,
      `Adoption Application Status Update for ${application.virtualPet}`,
      `Your adoption application for ${application.virtualPet} is ${status}.`
    );

    res.json({ message: "Notification sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { notifyAdoptionStatus };
