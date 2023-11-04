const users = require("../utils/user");

module.exports = (req, res) => {
  const { email, password } = req.query;
  let access = false;

 
  users.forEach((user) => {
    if (user.email === email && user.password === password) {
      access = true;
    }
  });

 
  res.status(200).json({ access });
};