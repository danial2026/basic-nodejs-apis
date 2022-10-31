var config = require('../config/config.json');
var inputValidators = require('../utils/input-validators');
var listController = require('../controller/list-controller');

const express = require('express');
const cors = require('cors');


// express app
var app = module.exports = express.Router();

// enabling CORS for all requests
app.use(
    cors({
        origin: config.allowedOrigin,
        methods: ["GET", "POST"]
    })
);

// endpoint that returns all item
app.get('/list', async function(req, res) {
    const databaseRes = await listController.getAllItems();
    if (!databaseRes) {
        return res.status(400).send({
            message: "database not defined",
        });
    }
    return res.status(200).send(databaseRes);
});

// endpoint for adding an itam
app.post('/list', async function(req, res) {
    const title = inputValidators.basicInputCheck(req.body.title)
    // check if the input validator has set the statusCode
    if (res.statusCode === 400) {
        return
    }
    const databaseRes = listController.addToList(title)
    if (!databaseRes || databaseRes==0) {
        return res.status(404).send({
            message: "database not defined",
        });
    }
    return res.status(200).send({
        message: "added successfully",
    });
});

// endpoint for deleting an itam
app.delete('/list', async function(req, res) {
    const id = inputValidators.basicInputCheck(req.query.id)
    // check if the input validator has set the statusCode
    if (res.statusCode === 400) {
        return
    }
    const databaseRes = listController.deleteById(id)
    if (!databaseRes) {
        return res.status(404).send({
            message: "item not found",
        });
    }
    return res.status(200).send({
        message: "removed successfully",
    });
});