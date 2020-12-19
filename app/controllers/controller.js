const Tag = require("../models/model.js");

const resCallback = (res, err, data, defaultErrMessage = null) => {
  if (err) {
    if (err.kind === "not_found") {
      res.status(404).send({
        message: `Not found 'Tag'`
      });
    } else {
      res.status(500).send({
        message:
          defaultErrMessage || err.message || "Internal server error"
      });
    }
  } else {
    res.send(data);
  }
};

// Create and Save a new tag
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
 
  // Save Tag in the database
  Tag.create(req.body, (err, data) => resCallback(res, err, data, "Some error occurred while creating the 'Tag'."));
};

// Update a Tag identified by the TagId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Tag.updateById(req.body, (err, data) => resCallback(res, err, data, "Error updating 'Tag' with TagId " + req.body.id));
};

// Delete a Tag with the specified TagId in the request
exports.delete = (req, res) => {
  Tag.remove(req.body.id, (err, data) => resCallback(res, err, data, "Could not delete 'Tag' with TagId " + req.body.id));
};
