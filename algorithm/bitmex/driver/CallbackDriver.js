"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallbackDriver = void 0;
const PrintDriver_1 = require("./PrintDriver");
class CallbackDriver {
    constructor() {
        this.lastPrice = 0;
        this.lastValue = 0;
        this.quoteAmountAvg = 4;
        this.traceQuoteThreshold = 100000;
        this.emergenceQuoteThreshold = 10000000;
        this.quoteList = new Map();
        this.printDriver = new PrintDriver_1.PrintDriver();
        this.orderBook = new Map();
        this.quoteBook = new Map();
    }
    tradeInfo(data) {
        this.lastPrice = data["price"];
        this.lastValue = data["size"];
    }
    orderBookInfo(data) {
        let price;
        let size;
        let quote;
        data.forEach((row) => {
            price = row["price"];
            size = row["size"];
            if (this.orderBook.has(price)) {
                quote = Math.abs(this.orderBook.get(price) - size);
                if (quote > this.traceQuoteThreshold) {
                    this.addQuote(price, quote);
                }
            }
            this.orderBook.set(price, size);
        });
        console.clear();
        this.printDriver.printOrderBook(this.sortDictByKey(this.orderBook), this.lastPrice, this.lastValue);
    }
    addQuote(price, quote) {
        if (this.quoteList.has(price)) {
            if (!this.quoteBook.has(price)) {
                this.quoteBook.set(price, new Array());
            }
            this.quoteBook.get(price).push(quote);
        }
        else {
            this.quoteList.set(price, 1);
        }
        if (this.quoteBook.size > 40) {
            this.resetQuoteBook();
        }
        //console.clear();
        //this.printDriver.printOrderBook(this.sortDictByKey(this.quoteBook), price, quote);
    }
    resetQuoteBook() {
        for (let i = 0; i < 10; ++i) {
            let min = 1000;
            let key = "";
            let rowLength;
            let avg = 0;
            let sorted = this.sortDictByKey(this.quoteBook);
            sorted.forEach((elem) => {
                rowLength = elem[1].length;
                avg += rowLength;
                if (rowLength > this.quoteAmountAvg && this.quoteAmountAvg > 4) {
                    this.quoteBook.delete(parseFloat(elem[0]));
                    this.quoteList.delete(parseFloat(elem[0]));
                    return;
                }
                if (rowLength < min) {
                    min = rowLength;
                    key = elem[0];
                }
            });
            this.quoteAmountAvg = (avg / sorted.length);
            if (Math.max(...this.quoteBook.get(parseFloat(key))) < this.emergenceQuoteThreshold) {
                this.quoteBook.delete(parseFloat(key));
                this.quoteList.delete(parseFloat(key));
            }
        }
    }
    sortDictByKey(data) {
        let sorted = Array.from(data.keys()).map((key) => [key, data.get(key)]);
        sorted.sort(function (first, second) {
            return second[0] - first[0];
        });
        return sorted;
    }
}
exports.CallbackDriver = CallbackDriver;
