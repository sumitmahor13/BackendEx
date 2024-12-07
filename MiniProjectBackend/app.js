const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("./models/user");
const postModel = require("./models/post");
const multerConfig = require("./config/multerConfig")
const path = require("path");
const upload = require("./config/multerConfig");

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.get("/profile/upload", isLoggedIn, (req, res) => {
  res.render("ProfileUpload");
});

app.post("/upload", isLoggedIn, upload.single("image"), async(req, res) => {
  let user = await userModel.findOne({email:req.user.email});
  user.profilePic = req.file.filename;
  await user.save();
  res.redirect("/profile");
});

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/profile", isLoggedIn, async(req, res) =>{          //Profile is gonna protected route (yaha pr isLoggedIn ko mention kia h jo ki ek function neeche likha hai)
  const user = await userModel.findOne({email: req.user.email}).populate("posts");
  res.render("profile", {user})
})

app.post("/post", isLoggedIn, async(req, res) =>{          //Profile is gonna protected route (yaha pr isLoggedIn ko mention kia h jo ki ek function neeche likha hai)
  const user = await userModel.findOne({email: req.user.email})
  const {content} =  req.body

  if(content === ""){
    return res.redirect("/profile")
  }

  const post = await postModel.create({
    user:user._id,
    content:content,
  })

  user.posts.push(post._id);
  await user.save();
  res.redirect("/profile")
})



app.post("/register", async (req, res) => {
  const { userName, name, email, password, age } = req.body;

  const user = await userModel.findOne({ email });
  if (user) return res.status(500).send("User Already Exists..");

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      const user = await userModel.create({
        userName,
        name,
        age,
        email,
        password: hash,
      });

      const token = jwt.sign({ email: email, userid: user._id }, "shhhhh");
      res.cookie("token", token);
      res.send("Registerd successfully");
    });
  });
});

app.post("/login", async (req, res) => {
  const {email, password} = req.body;

  const user = await userModel.findOne({ email });
  if (!user) return res.status(500).send("Pehle ja register kar khudko");

  bcrypt.compare(password, user.password, (err, result) => {
    if(result) {
      const token = jwt.sign({ email: email, userid: user._id }, "shhhhh");
      res.cookie("token", token);
      res.status(200).redirect("/profile");
    }
    else res.redirect("/login");
  });
});

app.get("/logout", (req, res)=>{
    res.cookie("token", "");
    res.redirect("/login")
})

app.get("/like/:id", isLoggedIn, async (req, res)=>{
  const post = await postModel.findOne({_id: req.params.id}).populate("user");

  if(post.likes.indexOf(req.user.userid) === -1){
    post.likes.push(req.user.userid);
  }else{
    post.likes.splice(post.likes.indexOf(req.user.userid), 1);
  }

  await post.save();
  res.redirect("/profile");
  
})

app.get("/update/:id", isLoggedIn, async(req, res)=>{
  const post = await postModel.findOne({_id: req.params.id}).populate("user")
  res.render("edit",{post})
})


app.post("/update/:id", isLoggedIn ,async(req, res)=>{
  const{content} = req.body;
  const post = await postModel.findOneAndUpdate({_id:req.params.id}, {content})
  res.redirect("/profile")
})

app.get("/delete/:id", isLoggedIn, async(req, res)=>{
  // const post = await postModel.findOne({_id:req.params.id});
  const post = await postModel.findOneAndDelete({_id:req.params.id});
  res.redirect("/profile")
})



function isLoggedIn(req, res, next){
  if(req.cookies.token == ""){
    res.redirect("/login")
  }else{
    let data = jwt.verify(req.cookies.token, "shhhhh");
    req.user = data; 
    next();
  }
}

//App Listning
app.listen(3000, () => {
  console.log("App Started...");
});
