import {CallbackDriver} from "./CallbackDriver";
import * as express from "express";

const app = express();

const PORT= 8080;

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.listen(PORT, () => {
});
const test = new CallbackDriver();
