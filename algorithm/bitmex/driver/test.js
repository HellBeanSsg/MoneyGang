"use strict";
exports.__esModule = true;
var driver_1 = require("./driver");
var Test = /** @class */ (function () {
    function Test() {
        this.myDriver = new driver_1.BitmexDriver(this);
    }
    Test.prototype.tradeInfo = function (data) {
        //console.log('trade info');
        //console.log(data);
    };
    Test.prototype.orderBookInfo = function (data) {
        var orderBook = {};
        data.forEach(function (row) {
            orderBook[row['price']] = row['size'];
        });
        var items = Object.keys(orderBook).map(function (key) {
            return [key, orderBook[key]];
        });
        // Sort the array based on the second element
        items.sort(function (first, second) {
            return second[0] - first[0];
        });
        console.clear();
        items.forEach(function (item) { console.log(item); });
    };
    return Test;
}());
var test = new Test();
