const MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
const uri = "mongodb+srv://admin:admin1234@cluster0-7qmuh.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
var conn = client.connect();

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    conn.then(client =>{
        client.db("db").collection("taller").find({}).toArray((err, data) => {
            res.send(data);
        });
    })
});

router.get("/:taller", (req, res) => {
    conn.then(client => {
        client.db("db").collection("taller").find({ _id: ObjectId(req.params.taller) }).toArray((err, data) => {
           
            res.send(data[0]);
        });
    });
});

router.post("/", (req, res) => {
    conn.then(client => {
        req.body["productos"] = [];
        req.body["servicios"] = [];
        client.db("db").collection("taller").insertOne(req.body);
        res.send("El taller ha sido creado");
    });
});
//DESDE ACA SE MANEJAN LOS PRODUCTOS DE UN TALLER

/* GET productos de un taller */


router.get('/:taller/productos', (req, res, next) => {
    conn.then(client => {
        client.db("db").collection("taller").find({ _id: ObjectId(req.params.taller) }).toArray((err, data) => {
            res.send(data[0]["productos"]);
        });
    });
});

/* POST productos de un taller */


router.post('/:taller/productos/', (req, res, next) => {
    conn.then(client => {
        client.db("db").collection("taller").find({ _id: ObjectId(req.params.taller) }).toArray((err, data) => {
            if (data.length === 0) {
                res.status(404).send("No existe ese taller");
            }
            else {
                client.db("db").collection("productos").insertOne(req.body).then(resp => {
                    client.db("db").collection("productos").find({ _id: ObjectId(resp.insertedId) }).toArray((err, data) => {
                        client.db("db").collection("taller").updateOne({ _id: ObjectId(req.params.taller) }, { $addToSet: { productos: data[0] } });
                        res.send("Se ha agregado un producto");
                    });
                });
            }
        });
    });
});

module.exports = router;