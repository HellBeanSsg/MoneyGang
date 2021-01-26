"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BitmexDriver = void 0;
const BitMEXClient = require("bitmex-realtime-api");
const fs = require("fs");
class BitmexDriver {
    constructor(callbackDriver) {
        this.lastQuoteTS = null;
        const key = this.getKey();
        this.BitmexClient = new BitMEXClient({ apiKeyID: key });
        this.BitmexClient.addStream("XBTUSD", "trade", (data, symbol, tablename) => {
            callbackDriver.tradeInfo(data[data.length - 1]);
        });
        this.BitmexClient.addStream("XBTUSD", "orderBookL2_25", (data, symbol, tablename) => {
            callbackDriver.orderBookInfo(data);
        });
    }
    getKey() {
        const keyFile = fs.readFileSync("key.txt");
        const key = keyFile.toString().split("\n")[0];
        return key;
    }
}
exports.BitmexDriver = BitmexDriver;
