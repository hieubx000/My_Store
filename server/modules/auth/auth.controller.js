const User = require("../user/user");

exports.createOrUpdateUser = async (req, res) => {
  const { name, picture, email } = req.user;

  const user = await User.findOneAndUpdate({ email }, { name, picture }, { new: true });

  if (user) {
    // console.log("USER UPDATED", user);
    res.json(user);
  } else {
    const newUser = await new User({
      email,
      name: name ?? email.split("@")[0],
      picture: picture ?? "https://firebasestorage.googleapis.com/v0/b/ecommerce-62fba.appspot.com/o/user.png?alt=media&token=bc8dc5bb-237f-497d-b59c-9672753d778b",
    }).save();
    // console.log("USER CREATED", newUser);
    res.json(newUser);
  }
};

exports.currentUser = async (req, res) => {
  User.findOne({ email: req.user.email }).exec((err, user) => {
    if (err) throw new Error(err);
    res.json(user);
  });
};
