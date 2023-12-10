import { User } from "../models/user.model.js";
import { VirtualPet } from "../models/virtualPet.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
// Controller to get all virtual pets
const getAllVirtualPets = async (req, res) => {
  try {
    // Extract query parameters from the request
    const {
      species,
      breed,
      minAge,
      maxAge,
      minHappiness,
      maxHappiness,
      minHealth,
      maxHealth,
    } = req.query;

    // Build the filter object based on the provided parameters
    const filter = {};
    if (species) filter.species = species;
    if (breed) filter.breed = breed;
    if (minAge) filter.age = { $gte: minAge };
    if (maxAge) filter.age = { ...filter.age, $lte: maxAge };
    if (minHappiness) filter.happiness = { $gte: minHappiness };
    if (maxHappiness)
      filter.happiness = { ...filter.happiness, $lte: maxHappiness };
    if (minHealth) filter.health = { $gte: minHealth };
    if (maxHealth) filter.health = { ...filter.health, $lte: maxHealth };

    const totalCount = await VirtualPet.countDocuments(filter);

    // Apply pagination based on query parameters (skip and limit)
    const skip = req.query.skip ? parseInt(req.query.skip) : 0;
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;

    const virtualPets = await VirtualPet.find(filter)
      .populate("owner")
      .skip(skip)
      .limit(limit);

    res
      .status(201)
      .json(
        new ApiResponse(201, { totalCount, virtualPets }, "All virtuals pets")
      );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller to add a new virtual pet
const addVirtualPet = async (req, res) => {
  try {
    // console.log(req.user);
    // const newPets = req.body.map((pet) => ({
    //   ...pet,
    //   owner: req.user._id,
    // }));

    const { name, species, breed, age, description, happiness, health } =
      req.body;
    const newPet = await VirtualPet({
      name,
      species,
      breed,
      age,
      description,
      happiness,
      health,
    });
    newPet.owner = req.user._id;
    await newPet.save();

    await User.findByIdAndUpdate(
      req.user._id,
      { $push: { adoptedPets: newPet._id } },
      { new: true }
    );
    res.status(201).json(newPet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { getAllVirtualPets, addVirtualPet };
//
