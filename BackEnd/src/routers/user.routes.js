const { Router } = require('express')
const { signUp , login } = require('../controller/user.controller.js')


const router = Router()

router.route('/login').post(login)
router.route("/sign-up").post(signUp);


module.exports = {router}


