import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  //  get user details from frontend
  // validation not empty
  // check if user is already exists :username email
  // check for images, check for avatar
  // upload them to cloudinary,avatar
  // create user object - create entry in db
  // remove password and refresh token field from response
  // check for user creation
  // return res

  const { role, email, username, password } = req.body;
  // console.log("email: ", email);

  if ([email, username, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  // console.log(req.files);
  const avatarLocalPath = req.files?.avatar[0]?.path;
  // const coverImageLocalPath = req.files?.coverImage[0]?.path;
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }
  const avatar = await uploadOnCloudinary(avatarLocalPath);

  const user = await User.create({
    email,
    password,
    username: username.toLowerCase(),
    avatar: avatar.url,
    role: role,
  });

  const createUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createUser) {
    throw new ApiError(500, "Something went wrong while registering user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createUser, "User registered successfully"));
});

const loginUser = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    throw new ApiError(
      404,
      "No user found with this email or you entered wrong email"
    );
  }

  const token = await user.generateAuthToken();
  // res.
  return res.status(200).json(new ApiResponse(200, "Bearer " + token, "token"));
});

const userProfile = asyncHandler(async (req, res, next) => {
  // const user = req.user;
  const user = await User.find({}).populate("adoptedPets");
  // console.log(user);
  res.status(200).json(new ApiResponse(200, user, "user"));
});
export { registerUser, loginUser, userProfile };
