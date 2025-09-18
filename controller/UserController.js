const User = require("../models/UserModel");

const GetAllUser = async (req, res) => {
  const user = await User.findAll();
};
