import {CallbackDriver} from "./callback-driver"
import * as express from 'express'

const express = require('express');
const app = express();

const PORT= 8080;

app.get('/', (req, res) => {
	const test = new CallbackDriver();
	//res.send('Hello World!');
});

app.listen(PORT, () => {
	console.log('App is listening on port ${PORT}!');
});
