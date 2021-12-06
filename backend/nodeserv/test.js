const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://willtree8:I5AMZgyX8SWUtbQu@cluster0.xqec2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object   
  console.log("connected")
  client.close();
});