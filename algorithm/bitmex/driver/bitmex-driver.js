"use strict";
exports.__esModule = true;
exports.BitmexDriver = void 0;
var BitMEXClient = require("bitmex-realtime-api");
var fs = require("fs");
var BitmexDriver = /** @class */ (function () {
    function BitmexDriver(callbackDriver) {
        this.lastQuoteTS = null;
        var key = this.getKey();
        this.BitmexClient = new BitMEXClient({ apiKeyID: key });
        this.BitmexClient.addStream('XBTUSD', 'trade', function (data, symbol, tablename) {
            callbackDriver.tradeInfo(data[data.length - 1]);
        });
        this.BitmexClient.addStream('XBTUSD', 'orderBookL2_25', function (data, symbol, tablename) {
            callbackDriver.orderBookInfo(data);
        });
        /*
        this.BitmexClient.addStream('XBTUSD', 'quote', (data: [], symbol: string, stablename: string) => {
            for(var i=data.length-1; i>=0; i--){
                if (data[i]['timestamp'] == this.lastQuoteTS) { break; }
            }
            this.lastQuoteTS = data[data.length-1]['timestamp'];
            callbackDriver.quoteInfo(data.slice(i,data.length));
        });
        */
    }
    BitmexDriver.prototype.getKey = function () {
        var keyFile = fs.readFileSync('key.txt');
        var key = keyFile.toString().split('\n')[0];
        return key;
    };
    return BitmexDriver;
}());
exports.BitmexDriver = BitmexDriver;
