"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrintDriver = void 0;
class PrintDriver {
    constructor() {
        this.background = "\x1b[47m";
    }
    printOrderBook(book, price, value) {
        book.forEach((elem) => {
            let color;
            let msg;
            let tradePrice = (elem[0] === price);
            msg = this.formatting(elem, value, tradePrice);
            color = this.getColor(tradePrice);
            console.log(color, msg, this.background);
        });
    }
    getColor(coloring) {
        if (coloring) {
            return "\x1b[31m";
        }
        return "\x1b[30m";
    }
    formatting(row, value, printValue) {
        let msg;
        msg = row[0].toString().padEnd(10);
        msg += ",";
        msg += row[1].toString().padEnd(10);
        if (printValue) {
            msg += value.toString().padStart(10);
        }
        return msg;
    }
}
exports.PrintDriver = PrintDriver;
