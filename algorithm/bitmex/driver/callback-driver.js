"use strict";
exports.__esModule = true;
exports.CallbackDriver = void 0;
var bitmex_driver_1 = require("./bitmex-driver");
var print_driver_1 = require("./print-driver");
var CallbackDriver = /** @class */ (function () {
    function CallbackDriver() {
        this.myDriver = new bitmex_driver_1.BitmexDriver(this);
        this.printDriver = new print_driver_1.PrintDriver();
        this.lastPrice = 0;
        this.lastValue = 0;
        this.quoteListIdx = 0;
        this.orderBook = {};
        this.quoteBook = {};
        this.quoteList = new Array(10000);
    }
    CallbackDriver.prototype.tradeInfo = function (data) {
        this.lastPrice = data['price'];
        this.lastValue = data['size'];
    };
    CallbackDriver.prototype.orderBookInfo = function (data) {
        var price;
        var size;
        var quote;
        var row;
        for (var i = 0; i < data.length; i++) {
            row = data[i];
            price = row['price'];
            size = row['size'];
            if (price in this.orderBook) {
                quote = this.orderBook[price] - size;
            }
            else {
                quote = 0;
            }
            this.orderBook[price] = size;
            if (quote > 1000)
                this.addQuote(price, quote);
        }
        var sorted = this.sortDictByKey(this.orderBook);
        this.printDriver.printOrderBook(sorted, this.lastPrice, this.lastValue);
    };
    CallbackDriver.prototype.addQuote = function (price, quote) {
        var _this = this;
        if (!(quote in this.quoteList) && (quote < 1000000)) {
            this.quoteList[this.quoteListIdx] = quote;
            this.quoteListIdx = (this.quoteListIdx + 1) % 10000;
        }
        else {
            new Promise(function (res, rej) {
                console.clear();
                if (price in _this.quoteBook) {
                    _this.quoteBook[price].push(quote);
                }
                else {
                    _this.quoteBook[price] = [quote];
                    if (Object.keys(_this.quoteBook).length > 40) {
                        _this.resetQuoteBook();
                    }
                }
                //this.printDriver.printOrderBook(this.sortDictByKey(this.quoteBook), price, quote);
                res(true);
            });
        }
    };
    CallbackDriver.prototype.resetQuoteBook = function () {
        for (var i = 0; i < 10; ++i) {
            var min = 100000000;
            var key = null;
            var buf = void 0;
            var avg = 0;
            var sorted = this.sortDictByKey(this.quoteBook);
            for (var j = 0; j < sorted.length; ++j) {
                buf = sorted[j][1].length;
                avg += buf;
                if (buf > this.quoteAmountAvg && this.quoteAmountAvg > 4) {
                    delete this.quoteBook[sorted[j][0]];
                    continue;
                }
                if (buf <= min) {
                    if (buf == min && Math.random() > 0.5) {
                        continue;
                    }
                    min = buf;
                    key = sorted[j][0];
                }
            }
            this.quoteAmountAvg = avg / sorted.length;
            if (Math.max(this.quoteBook[key]) < 1000000) {
                delete this.quoteBook[key];
            }
        }
    };
    CallbackDriver.prototype.sortDictByKey = function (data) {
        var sorted = Object.keys(data).map(function (key) {
            return [key, data[key]];
        });
        sorted.sort(function (first, second) {
            return second[0] - first[0];
        });
        return sorted;
    };
    return CallbackDriver;
}());
exports.CallbackDriver = CallbackDriver;
