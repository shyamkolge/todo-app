const { Router } = require('express')
const { signUp , login, refreshAccessToken, getCurrentUser, logoutUser } = require('../controller/user.controller.js')
const {verifyJWT} = require('../middlewares/auth.middlewares.js')


const router = Router()

router.route('/login').post(login)
router.route("/sign-up").post(signUp);
router.route('/logout').post(verifyJWT, logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/getCurrent-user").get(verifyJWT, getCurrentUser)

module.exports = {router}


