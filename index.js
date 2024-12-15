const express = require('express');
const cors = require('cors')
const req = require('express/lib/request')
const { MongoClient, ServerApiVersion } = require('mongodb')
require('dotenv').config()

const port = process.env.PORT || 5000
const app = express()

app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@cluster0.wr4sb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})
app.get('/', (req, res) => {
  res.send('Hello Runng SoloSphere Server....')
})
async function run() {
  try {
    // Send a ping to confirm a successful connection
    // await client.db('admin').command({ ping: 1 })
    
    const jobsCollection = client.db('soloSphereDb').collection('allJobs');
    // get the data from client side and send the data to database 
    app.post('/add-job', async (req, res)=>{
      const jobData = req.body;
      const result = await jobsCollection.insertOne(jobData);
      res.send(result)
    })

    console.log(
      'Hey Juabyer You successfully connected to MongoDB!'
    )


  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch(console.dir)
app.listen(port, () => console.log(`Server running on port ${port}`))
