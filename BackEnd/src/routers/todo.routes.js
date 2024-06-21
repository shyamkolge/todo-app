const { Router } = require('express')
const { signUp } = require('../controller/user.controller.js')


const router = Router()

router.route('/login').post()
router.route("/sign-up").post(signUp);


module.exports = {router}


