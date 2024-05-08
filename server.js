const express = require('express');
const path = require('path');
require('dotenv').config()

const PORT = process.env.PORT || 5000;

const app = express();

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://raphaelg0:r7S9oB9z6nndHNoB@cluster0.objvoj1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
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

app.get('/api/edt', async (_, res) => {
    await client.connect();
    const dbMain = client.db("test");
    const collectionMain = dbMain.collection("main");
    const cursor = collectionMain.find({})
    let randUser = "User"+String(Math.floor(Math.random()*1000));
    console.log(randUser);
    collectionMain.updateOne(
        // Filtre pour trouver le document où ajouter l'utilisateur
        { },
        // Mise à jour en utilisant l'opérateur $push pour ajouter l'utilisateur à la liste "Users"
        { $push: { Users: randUser } }
    );
    res.send({
        msg: randUser,
    })
})

app.get('/api/init', async (_, res) => {
    await client.connect();
    const dbMain = client.db("test");
    const collectionMain = dbMain.collection("main");
    const cursor = collectionMain.find({})
    let randUser = "User"+String(Math.floor(Math.random()*1000));
    const document = await collectionMain.findOne({ Users: { $exists: true } });
    res.send(document['Users'])
})

app.get('/*', (_, res) => {
    res.sendFile(path.join(__dirname, './client/dist/index.html'))
})

app.listen(PORT, () => {
    console.log(`Le serveur est lancé sur le port: ${PORT}`);
})

/*
async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
      
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  */