const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const bodyparser = require("body-parser");
const port = 3000;
const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'securekey';

client.connect();
app.use(bodyparser.json());
app.use(cors());

// API for getting the password
app.get('/', async(req, res) => {
  const db = client.db(dbName);
  const collection = db.collection("passwords");
  const findResult = await collection.find({}).toArray();
  res.json(findResult);
});

// API for saving the password 
app.post('/', async(req, res) => {
  const password = req.body;
  const db = client.db(dbName);
  const collection = db.collection("passwords");
  const findResult = await collection.insertOne(password);
  res.send({success : true , result : findResult});
});

// API for deleting the passwords by id
app.delete('/', async(req, res) => {
  const password = req.body;
  const db = client.db(dbName);
  const collection = db.collection("passwords");
  const findResult = await collection.deleteOne(password);
  res.send({success : true , result : findResult});
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})