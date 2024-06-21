const userModel = require("../models/user-model.js");
const { asyncHandler , APIError, APIResponce } = require('../utils/index.js')

const signUp = asyncHandler(async (req, res) => {

  const { name, email, password } = req.body;

  if ([name, email, password].some((field) => field?.trim() === "")) {
    throw new APIError(400, "All fields are required");
  }

  const userExists = await userModel.findOne({email});

  if (userExists) {
    throw new APIError(409, "User already Exits");
  }


  const user = await userModel.create({
       name,
       email,
       password
  })

  const userCreated = await userModel.findById(user._id).select('-password');

  if (!userCreated) {
    throw new APIError(500 , "Something went wrong while creating User..!")
  }

  res.json(
    new APIResponce(200, userCreated, "User register successfully" )
  )

});


module.exports = {signUp}