const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/blogDB");

const userSchema = mongoose.Schema({
  userName: String,
  name: String,
  age: Number,
  email: String,
  password: String,
  profilePic : {
    type: String,
    default: "default.jpg"
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
    },
  ],
});

module.exports = mongoose.model("user", userSchema);
