const express = require("express");
const path = require("path");
const app = express();
const userModel = require("./models/user");

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));


app.get("/", (req, res)=>{
    res.render('app');
})

app.post("/create", async (req, res)=>{
    const {name, email, image} = req.body;
    let createduser = await userModel.create({
        name:name,
        email:email,
        image:image,
    })

    res.redirect("/read");
})

app.get("/read", async(req, res)=>{
    let allusers = await userModel.find({});
    res.render("read", {users: allusers});
})

app.get("/delete/:id", async(req, res)=>{
    await userModel.findByIdAndDelete({_id:req.params.id})
    res.redirect("/read")
})

app.get("/edit/:id", async(req, res)=>{
    const user = await userModel.findOne({_id:req.params.id})
    res.render("edit", {user})
})

app.post("/edit/:id", async(req, res)=>{
    const {name, email, image} = req.body;
    await userModel.findByIdAndUpdate({_id:req.params.id}, {name, email, image})
    res.redirect("/read")
})

app.listen("3000", ()=>{
    console.log("Server Started...");
})