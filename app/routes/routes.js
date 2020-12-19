module.exports = app => {
  const controller = require("../controllers/controller.js");
  
  app.post("/update", controller.update);
  app.post("/add", controller.create);
  app.post("/delete", controller.delete);
  
};
