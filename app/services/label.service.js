const Joi = require("joi");
const LabelModel = require("../model/label.model");
class LabelService {
  validateLabel = (data) => {
    try {
      let LabelSchema = Joi.object({
        title: Joi.string().required(),
        link: Joi.string(),
        type: Joi.string().valid("brand", "banner").default("banner"),
        image: Joi.string(),
        status: Joi.string().valid("active", "inactive").default('inactive'),
      });
      let response = LabelSchema.validate(data);
      if (response.error) {
        throw response.error.details[0].message;
      } else {
        this.data = data;
      }
    } catch (error) {
      console.log("Validation error: ", error);
      throw error;
    }
  };
  registerLabel = async () => {
    try {
      let label_obj = new LabelModel(this.data);
      return await label_obj.save();
    } catch (error) {
      throw error;
    }
  };
  getAllCount=async(type)=>{
    let data= await LabelModel.find({
        type:type
    })
    return data.length
  }
  getAllLabel=async(type,skip,limit)=>{
    let filter={
        type:type
    }
       return await LabelModel.find(filter).skip(skip).limit(limit)
  }
}
module.exports = LabelService;
