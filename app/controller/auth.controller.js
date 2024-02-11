const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

class AuthController{
    constructor(){

    }
    registerUser=async(req,res,next)=>{
        try {
         let body=req.body
         if(req.file){
            body.image=req.file.filename
         }   
         
        } catch (error) {
            
        }
    }
    loginUser=async(req,res,next)=>{
        try {
            
        } catch (error) {
            
        }
    }
}