const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000 
const app = express();
const multer = require("multer");
const { MongoClient } = require('mongodb');

const upload =  multer({dest : "./image/"})

//middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send("hello server");
});

const url = 'mongodb://127.0.0.1:27017'; 

async function run() {
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log('Connected to MongoDB');
    const taskDB = client.db("tasks")
    const task = taskDB.collection("todo")

    app.get("/task", async (req, res) => {
      const result = await task.find().toArray()
      res.json(result)
    })

    app.post("/task", async (req, res) => {
      const data = req.body;
      data.time = new Date()
      console.log(data);
      const result = await task.insertOne(data)
      res.send(result)
    })
   
  } finally {
    // Ensures that the client will close when you finish/error
  }
}

run().catch(err => {
  console.log(err);
});
 
app.post("/", upload.single("image"), (req, res) => {
    const data = req.file
    console.log(data && "file up");
    res.send(data )
})

app.listen(port, () => {
    console.log(`server is run on ${port} port`);
});