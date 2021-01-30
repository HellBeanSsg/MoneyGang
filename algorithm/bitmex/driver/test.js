"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BitmexDriver_1 = require("./BitmexDriver");
const express = require("express");
const app = express();
const PORT = 8080;
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.listen(PORT, () => {
});
const test = new BitmexDriver_1.BitmexDriver();
