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
        this.quoteBook = {};
    }
    CallbackDriver.prototype.tradeInfo = function (data) {
        this.lastPrice = data['price'];
        this.lastValue = data['size'];
    };
    CallbackDriver.prototype.orderBookInfo = function (data) {
        console.clear();
        var orderBook = {};
        data.forEach(function (row) { orderBook[row['price']] = row['size']; });
        var sorted = this.sortDictByKey(orderBook);
        this.printDriver.printOrderBook(sorted, this.lastPrice, this.lastValue);
    };
    CallbackDriver.prototype.quoteInfo = function (data) {
        console.clear();
        var row;
        for (var i = 0; i < data.length; i++) {
            row = data[i];
            var bidPrice = row['bidPrice'];
            var askPrice = row['askPrice'];
            var bidSize = row['bidSize'];
            var askSize = row['askSize'];
            if (bidPrice in this.quoteBook) {
                this.quoteBook[bidPrice] += bidSize;
            }
            else {
                this.quoteBook[bidPrice] = bidSize;
            }
            if (askPrice in this.quoteBook) {
                this.quoteBook[bidPrice] -= askSize;
            }
            else {
                this.quoteBook[askPrice] = -askSize;
            }
        }
        var sorted = this.sortDictByKey(this.quoteBook);
        this.printDriver.printOrderBook(sorted, this.lastPrice, this.lastValue);
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
