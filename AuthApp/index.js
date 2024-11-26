const express = require("express")
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 4000

app.use(express.json());

require("./Config/database").dbConnect();

const user = require("./Routes/user");
app.use("/api/v1", user)

app.listen(PORT, ()=>{
    console.log(`Server Started at port -${PORT}`)
})