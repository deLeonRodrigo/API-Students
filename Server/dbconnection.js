const MongoClient = require('mongodb').MongoClient;
const urlDB = "mongodb://localhost:27017";
var assert = require('assert');
var db;
var _students;

function openConnection(){
    MongoClient.connect(urlDB, function(err, db) {
        assert.equal(null, err);
        db = db.db('Students');
        console.log("Connected successfully to server");
    });
}

function insert(data){
    MongoClient.connect(urlDB, function(err, db) {
        db = db.db('students');
        db.collection('students').insertOne(data, (err, result) => {
            if (err) return console.log(err);
        })
    })
}

function closeConnection(){
    db.close();
}

function get(){
    MongoClient.connect(urlDB, function(err, db) {
        db = db.db('students');
        db.collection('students').find().toArray((err, result) => {
            console.log('data has been fetched');
            _students = result;
        })
    })
}

module.exports.openConnection = openConnection;
module.exports.closeConnection = closeConnection;
module.exports.insert = insert;
module.exports.get = get;
module.exports.students = () => {
    return _students;
};