const Joi=require('joi')

class UserService{
    validateUser=(data)=>{
        try {
            let userSchema=Joi.object({
                name:Joi.string().required(),
                address:Joi.string().required(),
                password:Joi.string().required(),
                email:Joi.string().email().required(),
                role:Joi.string().valid('seller','customer','admin').default('customer'),
                image:Joi.string(),
                status:Joi.string().valid('active','inactive'),
            })
            let response=userSchema.validate(data)
            if(response.error){
                throw response.error.details[0].message
            }else{
                this.data=data
            }
        } catch (error) {
            console.log('Validation error: ',error)
            throw error
        }
    }
}


module.exports=UserService