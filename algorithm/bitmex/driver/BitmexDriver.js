"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BitmexDriver = void 0;
const BitMEXClient = require("bitmex-realtime-api");
const CallbackDriver_1 = require("./CallbackDriver");
const fs = require("fs");
class BitmexDriver {
    constructor() {
        this.lastQuoteTS = null;
        const key = this.getKey();
        this.callbackDriver = new CallbackDriver_1.CallbackDriver();
        this.bitmexClient = new BitMEXClient({ apiKeyID: key });
        this.bitmexClient.addStream("XBTUSD", "trade", (data) => {
            this.callbackDriver.tradeInfo(data[data.length - 1]);
        });
        this.bitmexClient.addStream("XBTUSD", "orderBookL2_25", (data) => {
            this.callbackDriver.orderBookInfo(data);
        });
    }
    getKey() {
        const keyFile = fs.readFileSync("key.txt");
        const key = keyFile.toString().split("\n")[0];
        return key;
    }
}
exports.BitmexDriver = BitmexDriver;
