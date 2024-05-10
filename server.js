const express = require('express');
const path = require('path');
require('dotenv').config()

const PORT = process.env.PORT || 5000;
const MongoDbPassword = process.env.MONGOPASSWORD;

const app = express();

const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = `mongodb+srv://raphaelg0:${MongoDbPassword}@cluster0.objvoj1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

console.log("Will create a MongoClient whatever that is!")
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
console.log("MongoDB password retrieved from environment variables:", MongoDbPassword);

// See if connexion to db works.
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    
  } catch (error) {
    console.log("DOMMAGE");
    console.error("Error initializing data:", error);
    } 
}
console.log("Trying to connect to MongoDB");
run().catch(console.dir);


app.use(express.json());

app.use(express.static('client/dist'));

// Add new event to database.
app.post('/api/newEvent', async function(req, res) {
  const eventData = req.body;
  await client.connect();
    const dbMain = client.db("test");
    const collectionMain = dbMain.collection("Users");
    await collectionMain.updateOne(
      // Filtre pour trouver le document où ajouter l'utilisateur
      { "firstname": 'Raphael', "lastname": 'Greiner' },
      // Mise à jour en utilisant l'opérateur $push pour ajouter l'utilisateur à la liste "Users"
      { $push: { "events": eventData } }
  );
})

// Delete event from database.
app.post('/api/deleteEvent', async function(req, res) {
  const eventData = req.body;
  await client.connect();
  const dbMain = client.db("test");
  const collectionMain = dbMain.collection("Users");
  collectionMain.updateOne(
    { events: { $elemMatch: { "id": eventData['id'] } } },
    { $pull: { events: { "id": eventData['id'] } } },
    (err, result) => {
        if (err) {
            console.error('Erreur lors de la suppression de l\'événement :', err);
            client.close();
            return;
        }

        if (result.modifiedCount === 1) {
            console.log('Événement supprimé avec succès');
        } else {
            console.log('L\'événement n\'a pas été trouvé ou n\'a pas été supprimé');
        }

        // Fermer la connexion
        client.close();
    }
  );
})

// Get user's events from database.
app.get('/api/edt', async (_, res) => {
    await client.connect();
    const dbMain = client.db("test");
    const collectionMain = dbMain.collection("Users");
    const matchingUser = await collectionMain.findOne({ "firstname": 'Raphael', "lastname": 'Greiner' });
    const events = matchingUser.events || [];
    res.send({
        msg: events,
    })
})

app.get('/*', (_, res) => {
    res.sendFile(path.join(__dirname, './client/dist/index.html'))
})

app.listen(PORT, () => {
    console.log(`Server is on port: ${PORT}`);
})