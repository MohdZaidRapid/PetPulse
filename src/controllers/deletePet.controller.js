import { VirtualPet } from "../models/virtualPet.model.js"; // Adjust the path as needed
import { User } from "../models/user.model.js"; // Adjust the path as needed

const deleteVirtualPet = async (req, res) => {
  try {
    const petIdToDelete = req.params.petId;

    // Find the virtual pet to be deleted
    const deletedPet = await VirtualPet.findById(petIdToDelete);

    if (!deletedPet) {
      return res.status(404).json({ error: "Virtual pet not found" });
    }

    // Check if the logged-in user is an admin
    if (req.user.role !== "admin") {
      // If not an admin, check if the user is the owner of the pet
      if (deletedPet.owner.toString() !== req.user._id.toString()) {
        return res.status(403).json({
          error: "Permission denied. You are not the owner of this pet.",
        });
      }
    }

    // Remove the virtual pet ID from the adoptedPets array in the user document
    await User.findByIdAndUpdate(
      deletedPet.owner,
      { $pull: { adoptedPets: deletedPet._id } },
      { new: true }
    );

    // Delete the virtual pet
    await VirtualPet.findByIdAndDelete(petIdToDelete);

    res.status(200).json({ message: "Virtual pet deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { deleteVirtualPet };
