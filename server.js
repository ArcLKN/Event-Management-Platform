const express = require('express');
const path = require('path');
require('dotenv').config()

const PORT = process.env.PORT || 5000;
const MongoDbPassword = process.env.MONGOPASSWORD;

const app = express();

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://raphaelg0:${MongoDbPassword}@cluster0.objvoj1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    
  } catch (error) {
    console.error("Error initializing data:", error);
    } 
}
run().catch(console.dir);


app.use(express.json());

app.use(express.static('client/dist'));

// Add new event to database
app.post('/api/newEvent', async function(req, res) {
  const eventData = req.body;
  await client.connect();
    const dbMain = client.db("test");
    const collectionMain = dbMain.collection("main");
    await collectionMain.updateOne(
      // Filtre pour trouver le document où ajouter l'utilisateur
      { "Users": { $elemMatch: { "firstname": 'Raphael', "lastname": 'Greiner' } } },
      // Mise à jour en utilisant l'opérateur $push pour ajouter l'utilisateur à la liste "Users"
      { $push: { "Users.$.events": eventData } }
  );
})

// Get user's events from database
app.get('/api/edt', async (_, res) => {
    await client.connect();
    const dbMain = client.db("test");
    const collectionMain = dbMain.collection("main");
    const matchingUser = await collectionMain.findOne({ "Users": { $elemMatch: { "firstname": 'Raphael', "lastname": 'Greiner' } } }, { projection: { "Users.$": 1 } });
    const events = matchingUser.Users[0]?.events || [];
    res.send({
        msg: events,
    })
})

app.get('/api/init', async (_, res) => {
  await client.connect();
  const dbMain = client.db("test");
  const collectionMain = dbMain.collection("main");
  const matchingUser = await collectionMain.findOne({ "Users": { $elemMatch: { "firstname": 'Raphael', "lastname": 'Greiner' } } }, { projection: { "Users.$": 1 } });
  const events = matchingUser.Users[0]?.events || [];
  res.send({
      msg: events,
  })
})

app.get('/*', (_, res) => {
    res.sendFile(path.join(__dirname, './client/dist/index.html'))
})

app.listen(PORT, () => {
    console.log(`Le serveur est lancé sur le port: ${PORT}`);
})