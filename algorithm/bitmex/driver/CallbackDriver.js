"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallbackDriver = void 0;
const BitmexDriver_1 = require("./BitmexDriver");
const PrintDriver_1 = require("./PrintDriver");
class CallbackDriver {
    constructor() {
        this.myDriver = new BitmexDriver_1.BitmexDriver(this);
        this.printDriver = new PrintDriver_1.PrintDriver();
        this.lastPrice = 0;
        this.lastValue = 0;
        this.quoteAmountAvg = 40;
        this.orderBook = new Map();
        this.quoteBook = new Map();
    }
    tradeInfo(data) {
        this.lastPrice = data.get("price");
        this.lastValue = data.get("size");
    }
    orderBookInfo(data) {
        let price;
        let size;
        let quote;
        data.forEach((row) => {
            price = row["price"];
            size = row["size"];
            if (price in this.orderBook) {
                quote = this.orderBook.get(String(price)) - size;
            }
            else {
                quote = size;
            }
            this.orderBook.set(String(price), size);
            if (quote > 1000) {
                this.addQuote(price, quote);
            }
        });
        //let sorted: number[][] = this.sortDictByKey(this.orderBook);
        //this.printDriver.printOrderBook(sorted, this.lastPrice, this.lastValue);
    }
    addQuote(price, quote) {
        if (price in this.quoteBook) {
            this.quoteBook.get(String(price)).push(quote);
        }
        else {
            this.quoteBook.set(String(price), [quote]);
        }
        if (Object.keys(this.quoteBook).length > 40) {
            this.resetQuoteBook();
        }
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
                    this.quoteBook.delete(String(elem[0]));
                    return;
                }
                if (rowLength < min) {
                    min = rowLength;
                    key = elem[0];
                }
            });
            this.quoteAmountAvg = (avg / sorted.length);
            if (Math.max(...this.quoteBook.get(String(key))) < 1000000) {
                this.quoteBook.delete(String(key));
            }
        }
    }
    sortDictByKey(data) {
        let sorted = Object.keys(data).map(function (key) {
            return [key, data.get(String(key))];
        });
        sorted.sort(function (first, second) {
            return second[0] - first[0];
        });
        return sorted;
    }
}
exports.CallbackDriver = CallbackDriver;
