const slugify = require("slugify");
const LabelService = require("../services/label.service");
class LabelController {
  constructor() {
    this.label_svc = new LabelService();
  }
  registerLabel = async (req, res, next) => {
    try {
      let data = req.body;
      if (req.file) {
        data.image = req.file.filename;
      }
      data.type = req.params.type;

      if (!data.link || data.link == "null") {
        data.link = slugify(data.title, {
          lower: true,
        });
      }

      this.label_svc.validateLabel(data);
      let createLabel = await this.label_svc.registerLabel();
      res.json({
        result: createLabel,
        status: true,
        msg: "label stored",
      });
    } catch (error) {
      console.log("register label error ", error);
      next({
        status: 400,
        msg: error,
      });
    }
  };
  getAllLabel = async (req, res, next) => {
    try {
      let paginate = {
        all_count: await this.label_svc.getAllCount(req.params.type),
        per_page: req.query.per_page ?? 10,
        current_page: req.query.page ?? 1,
      };

      let skip = (paginate.current_page - 1) * paginate.per_page;
      let data = await this.label_svc.getAllLabel(
        req.params.type,
        skip,
        paginate.per_page
      );
      if (data) {
        res.json({
          result: data,
          status: true,
          paginate: paginate,
          msg: `${data[0].type} fetched`,
        });
      }
    } catch (error) {
      console.log("get label error ", error);
      next({
        status: 400,
        msg: error,
      });
    }
  };
  getLabel = async (req, res, next) => {
    try {
      let data = await this.label_svc.getLabelById(
        req.params.type,
        req.params.id
      );
      if (data) {
        res.json({
          status: true,
          result: data,
          msg: `${data[0].type} fetched`,
        });
      } else {
        next({
          status: 404,
          msg: "data does not exist",
        });
      }
    } catch (error) {
      console.log("get label error: ", error);
      next({
        status: 400,
        msg: error,
      });
    }
  };
  deleteLabel = async (req, res, next) => {
    try {
      let data = await this.label_svc.deleteLabelById(req.params.id);
      console.log(data);
      if (data) {
        res.json({
          status: true,
          result: data,
          msg: `${data.type} is delted`,
        });
      } else {
        next({
          status: 404,
          msg: `not found`,
        });
      }
    } catch (error) {
      console.log("delete label ", error);
      next({
        status: 400,
        msg: error,
      });
    }
  };
  updateLabel = async (req, res, next) => {
    try {
    } catch (error) {}
  };
}

module.exports = LabelController;
