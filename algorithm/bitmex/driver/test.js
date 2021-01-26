//import {CallbackDriver} from "./callback-driver"
//import * as express from 'express'
var express = require('express');
var app = express();
var PORT = 8080;
app.get('/', function (req, res) {
    //const test = new CallbackDriver();
    res.send('Hello World!');
});
app.listen(PORT, function () {
    console.log('App is listening on port ${PORT}!');
});
