const userModel = require("../models/user-model.js");
const { asyncHandler, APIError, APIResponce } = require("../utils/index.js");
const jwt = require("jsonwebtoken");

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

  const userCreated = await userModel
    .findById(user._id)
    .select("-password -refreshToken");

  if (!userCreated) {
    throw new APIError(500, "Something went wrong while creating User..!");
  }

  res.json(new APIResponce(200, userCreated, "User register successfully"));
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if ([email, password].some((field) => field?.trim() === "")) {
    throw new APIError(400, "All fields are required");
  }

  const isUserExistes = await userModel.findOne({ email });

  if (!isUserExistes) {
    throw new APIError(401, "No user found..!");
  }

  const isPasswordCorrect = await isUserExistes.isPasswordCorrect(password);

  if (!isPasswordCorrect) {
    throw new APIError(402, "Invalid Password..!");
  }

  const { accessToken, refreshToken } = await generateTokens(isUserExistes._id);

  const loginedUser = await userModel
    .findById(isUserExistes._id)
    .select("-password -refreshToken");

  const options = {
    httpOnly: true,
    secure: true,
  };

  res
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new APIResponce(
        200,
        { user: loginedUser, accessToken: accessToken },
        "User register successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await userModel.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new APIResponce(200, {}, "User Loged Out Successfully"))
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req?.cookies?.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new APIError(401, "unauthorized request");
  }
  // console.log(`incomingRefreshToken : ${incomingRefreshToken}`)
  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    // console.log(`decodedToken : ${decodedToken}`)

    const user = await userModel.findById(decodedToken?._id);

    if (!user) {
      throw new APIError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new APIError(401, "Refresh token is expired or used");
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, refreshToken } = await generateTokens(user._id);
    // console.log(`accesstoken  = ${accessToken} and refreshtoken : ${newRefreshToken}`)
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .send(
        new APIResponce(
          200,
          { accessToken, refreshToken: refreshToken },
          "Access token refreshed"
        )
      );
  } catch (error) {
    throw new APIError(401, "Invalid refresh token");
  }
});



const getCurrentUser = asyncHandler(async (req, res) => {
  const user = req?.user;
  if (!user) {
    throw new APIError(401, "user not found");
  }
  return res
    .status(200)
    .json(new APIResponce(200, user, "user fetched successfully !"));
});

module.exports = {
  signUp,
  login,
  refreshAccessToken,
  getCurrentUser,
  logoutUser,
};
