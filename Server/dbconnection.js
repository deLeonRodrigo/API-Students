const MongoClient = require('mongodb').MongoClient;
const urlDB = "mongodb://localhost:27017";
var assert = require('assert');
var ObjectID = require('mongodb').ObjectID; 
var db;
var _students;

function deleteStudent(data){
    MongoClient.connect(urlDB, function(err, db) {
        db = db.db('students');
        db.collection('students').deleteOne(
            {'_id': ObjectID(data._Id)},
            (err, result) => {
            if (err) return console.log(err);
        })
    })
}

function openConnection(){
    MongoClient.connect(urlDB, function(err, db) {
        assert.equal(null, err);
        db = db.db('students');
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

function update(data){
    MongoClient.connect(urlDB, function(err, db) {
        db = db.db('students');
        db.collection('students').update(
            {'_id': ObjectID(data._Id)} ,
            data, (err, result) => {
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
module.exports.delete = deleteStudent;
module.exports.update = update;
module.exports.students = () => {
    return _students;
};