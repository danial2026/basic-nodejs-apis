// load domains
const ItemSchema = require('../domains/item-schema');

// uuid generator
const { v4: uuidv4 } = require("uuid");

// use an array as the database
const database = [];

// get all list items
exports.getAllItems = async function() {
    // returns all items
    return database;
}

// add to list
exports.addToList = async function(title) {
    const newObj = new ItemSchema();
    newObj.Id = uuidv4();
    newObj.Title = title;
    newObj.CreatedAt = Date.now();

    database.push(newObj);

    return  database.length;
}


// delete item by id
exports.deleteById = async function(itemId) {
    var itemPos = database.map(function(x) {return x.id; }).indexOf(itemId);
    database.splice(itemPos, 1)
    
    return itemPos;
}