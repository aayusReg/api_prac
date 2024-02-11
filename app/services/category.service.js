const Joi = require("joi");
const CategoryModel = require("../model/category.model");
class CategoryService {
  validateCategory = (data) => {
    try {
      let CategorySchema = Joi.object({
        name: Joi.string().required(),
        slug: Joi.string(),
        image: Joi.string(),
        status: Joi.string().valid("active", "inactive").default("inactive"),
        brands: Joi.string().allow(null).empty(),
        parent_id: Joi.string().allow(null).empty(),
      });
      let response = CategorySchema.validate(data);
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
  registerCategory = async () => {
    try {
      let category_obj = new CategoryModel(this.data);
      return await category_obj.save();
    } catch (error) {
      throw error;
    }
  };
  getAllCount = async () => {
    let data = await CategoryModel.find();
    return data.length;
  };
  getAllCategory = async (skip, limit) => {
    return await CategoryModel.find()
      .populate("brands")
      .populate("parent_id")
      .skip(skip)
      .limit(limit);
  };
  getCategoryById = async (id) => {
    return await CategoryModel.findById(id)
      .populate("brands")
      .populate("parent_id");
  };
  deleteCategoryById = async (id) => {
    return await CategoryModel.findByIdAndDelete(id);
  };
  updateCategoryById = async (id) => {
    return await CategoryModel.findByIdAndUpdate(id, {
      $set: this.data,
    });
  };
}
module.exports = CategoryService;
