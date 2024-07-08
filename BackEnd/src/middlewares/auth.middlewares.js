const userModel = require("../models/user-model.js");
const { asyncHandler, APIError, APIResponce } = require("../utils/index.js");
const jwt = require('jsonwebtoken')

const verifyJWT = asyncHandler(async (req, _ , next)=>{

  try {
  const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

  if(!token){
    throw new APIError(401, "Unauthorized requist");
  }

  const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

  const user = await userModel.findById(decodedToken?._id).select("-password -refreshToken")

  if (!user) {

      throw new APIError(401, "Invalid Access Token")
  }
  
  req.user = user;

  next()

} catch (error) {
  throw new APIError(401, error?.message || "Invalid access token")
}   
})

module.exports = {verifyJWT}