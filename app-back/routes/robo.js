const MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
const uri = "mongodb+srv://admin:Admin1234@cluster0-7qmuh.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
var conn = client.connect();

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    conn.then(client =>{
        client.db("db").collection("robos").find({}).toArray((err, data) => {
            res.send(data);
        });
    })
});

/* GET robos de un usuario */
router.get('/:user', function(req, res) {
    conn.then(client =>{
        client.db("db").collection("robos").find({user:req.params.user}).toArray((err, data) => {
            res.send(data);
        });
    })
});


router.post("/", (req, res) => {
    conn.then(client => {
        client.db("db").collection("robos").insertOne(req.body);
        res.send("El robo ha sido registrado");
    });
});

module.exports = router;