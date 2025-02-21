const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.get("/", (req, res)=>{
    fs.readdir('./files', (err, files)=>{
        res.render('Home', {files: files});
    })
})

app.post("/create", (req, res)=>{
    fs.writeFile(`./files/${req.body.title.split(" ").join('')}.txt`, req.body.details, (err)=>{
        res.redirect("/");
    })
})

app.get("/files/:filename", (req, res)=>{
    fs.readFile(`./files/${req.params.filename}`, "utf-8", (err, fileData)=>{
        res.render("Show", {filename: req.params.filename, fileData: fileData})
    })
})

app.get("/rename/:filename", (req, res)=>{
       res.render("Rename", {filename: req.params.filename})
})

app.post("/rename", (req, res)=>{
    fs.rename(`./files/${req.body.old}`, `./files/${req.body.new}`, (err)=>{
        res.redirect("/")
    })
})

app.listen(3000, ()=>{
    console.log("App is runnig...");
})