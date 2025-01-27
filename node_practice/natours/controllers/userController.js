exports.getAllUsers = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined! Please use /users instead",
  });
};

exports.createUser = (req, res) => {
  res.send("Done");
};

exports.getUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined! Please use /users instead",
  });
};

exports.updateUser = (req, res) => {
  res.send("Done");
};

exports.deleteUser = (req, res) => {
  res.send("Done");
};
