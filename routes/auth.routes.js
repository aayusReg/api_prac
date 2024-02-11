const AuthController = require('../app/controller/auth.controller')
const uploader = require('../app/middleware/uploader.middleware')

const router=require('express').Router()
const auth_ctrl=new AuthController()
router.post('/register',uploader.single('image'),auth_ctrl.registerUser)
router.post('/login',auth_ctrl.loginUser)
module.exports=router
