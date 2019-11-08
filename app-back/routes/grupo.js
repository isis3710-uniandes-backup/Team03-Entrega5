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
        client.db("db").collection("grupo").find({}).toArray((err, data) => {
            res.send(data);
        });
    })
});

router.get("/:grupo", (req, res) => {
    conn.then(client => {
        client.db("db").collection("grupo").find({ _id: ObjectId(req.params.grupo) }).toArray((err, data) => {
            res.send(data[0]);
        });
    });
});

router.post("/", (req, res) => {
    conn.then(client => {
        req.body["miembros"] = [];
        req.body["publicaciones"] = []
        client.db("db").collection("grupo").insertOne(req.body);
        res.send("El grupo ha sido creado");
    });
});

//DESDE ACA SE MANEJAN LAS PUBLICACIONES DE UN GRUPO

/* GET publicaciones de un grupo */


router.get('/:grupo/publicaciones', (req, res, next) => {
    conn.then(client => {
        client.db("db").collection("grupo").find({ _id: ObjectId(req.params.grupo) }).toArray((err, data) => {
            res.send(data[0]["publicaciones"]);
        });
    });
});

/* POST publicaciones de un grupo */


router.post('/:grupo/publicaciones/', (req, res, next) => {
    conn.then(client => {
        client.db("db").collection("grupo").find({ _id: ObjectId(req.params.grupo) }).toArray((err, data) => {
            if (data.length === 0) {
                res.status(404).send("No existe ese grupo");
            }
            else {
                client.db("db").collection("publicacion").insertOne(req.body).then(resp => {
                    client.db("db").collection("publicacion").find({ _id: ObjectId(resp.insertedId) }).toArray((err, data) => {
                        client.db("db").collection("grupo").updateOne({ _id: ObjectId(req.params.grupo) }, { $addToSet: { publicaciones: data[0] } });
                        res.send("Se ha agregado una publicacion");
                    });
                });
            }
        });
    });
});

router.put("/:grupo/", (req,res) => {
    conn.then(client => { 
        console.log(req.params.grupo);
        client.db("db").collection("grupo").find({ _id: ObjectId(req.params.grupo) }).toArray((err, data) => {
      res.send(data[0]); 
            // client.db("db").collection("grupo").updateOne( {_id: ObjectId(req.params.grupo) }, { $set: req.body });
       
    });
});
});

module.exports = router;