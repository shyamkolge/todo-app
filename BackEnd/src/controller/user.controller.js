const userModel = require("../models/user-model.js");
const { asyncHandler, APIError, APIResponce } = require("../utils/index.js");


const generateTokens = async (userId) => {
  try {
    const user = await userModel.findById(userId);

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.log("user.controller :: generateTokens :: error :: ", error);
  }
};


const signUp = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

    if ([name, email, password].some((field) => field?.trim() === "")) {
      throw new APIError(400, "All fields are required");
    }

    const userExists = await userModel.findOne({ email });
    

    if (userExists) {
      throw new APIError(409, "User already Exits");
    }

    const user = await userModel.create({
      name,
      email,
      password,
    });

    const userCreated = await userModel.findById(user._id).select("-password -refreshToken");

    if (!userCreated) {
      throw new APIError(500, "Something went wrong while creating User..!");
    }

    res.json(new APIResponce(200, userCreated, "User register successfully"));
 
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  
    if ([ email, password ].some((field) => field?.trim() === "")) {
      throw new APIError(400, "All fields are required");
    }

    const isUserExistes = await userModel.findOne({email})

    if (!isUserExistes) {
      throw new APIError(401, "No user found..!");
    }

    const isPasswordCorrect = await isUserExistes.isPasswordCorrect(password)

    if (!isPasswordCorrect) {
      throw new APIError(401, "Invalid Password..!");
    }


    const { accessToken , refreshToken } = await generateTokens(isUserExistes._id);

    const loginedUser =  await userModel.findById(isUserExistes._id).select("-password -refreshToken");

    const options = {
      httpOnly : true,
      secure : true
    }

    res.cookie('accessToken' , accessToken).cookie('refreshToken' , refreshToken).json(
      new APIResponce(200, loginedUser, "User register successfully")
    )

});

module.exports = { signUp , login};
