"use strict";
exports.__esModule = true;
exports.PrintDriver = void 0;
var PrintDriver = /** @class */ (function () {
    function PrintDriver() {
        this.background = "\x1b[47m";
    }
    PrintDriver.prototype.printOrderBook = function (book, price, value) {
        var _this = this;
        book.forEach(function (elem) {
            var color;
            var msg;
            var tradePrice = (elem[0] == price);
            msg = _this.formatting(elem, value, tradePrice);
            color = _this.getColor(tradePrice);
            console.log(color, msg, _this.background);
        });
    };
    PrintDriver.prototype.getColor = function (coloring) {
        if (coloring) {
            return "\x1b[31m";
        }
        else {
            return "\x1b[30m";
        }
    };
    PrintDriver.prototype.formatting = function (row, value, printValue) {
        var msg;
        msg = row[0].toString().padEnd(10);
        msg += ',';
        msg += row[1].toString().padEnd(10);
        if (printValue) {
            msg += value.toString().padStart(10);
        }
        return msg;
    };
    return PrintDriver;
}());
exports.PrintDriver = PrintDriver;
