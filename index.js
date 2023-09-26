const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000 
const app = express();
const multer = require("multer")

const upload =  multer({dest : "./image/"})

//middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send("hello server");
});
 
app.post("/", upload.single("image"), (req, res) => {
    const data = req.file
    console.log(data && "file up");
    res.send(data )
})

app.listen(port, () => {
    console.log(`server is run on ${port} port`);
});