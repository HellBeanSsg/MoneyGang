import { BitmexDriver } from "./BitmexDriver";
import { PrintDriver }  from "./PrintDriver";

export
class CallbackDriver{
	myDriver: BitmexDriver;
	printDriver: PrintDriver;
	lastPrice: number;
	lastValue: number;
	orderBook: {};
	quoteBook: {};	
	quoteAmountAvg: number;

	constructor(){
		this.myDriver = new BitmexDriver(this);
		this.printDriver = new PrintDriver();
		this.lastPrice = 0;
		this.lastValue = 0;
		this.quoteAmountAvg = 40;
		this.orderBook = {};
		this.quoteBook = {};
	}


	tradeInfo(data: {}): void {
		this.lastPrice = data["price"];
		this.lastValue = data["size"];
	}


	orderBookInfo(data: []): void{
		let price: number;
		let size:  number;
		let quote:  number;
		data.forEach((row) => {
			price = row["price"];
			size = row["size"];
			if (price in this.orderBook) {
				quote = this.orderBook[String(price)] - size;
			} else {
				quote = size;
			}
			this.orderBook[String(price)] = size;
			if (quote > 1000) {
				this.addQuote(price, quote);
			}
		});
		let sorted: number[][] = this.sortDictByKey(this.orderBook);

		this.printDriver.printOrderBook(sorted, this.lastPrice, this.lastValue);
	}


	addQuote(price: number, quote: number): void{
		if (price in this.quoteBook) {
			this.quoteBook[String(price)].push(quote);
		} else {
			this.quoteBook[String(price)] = [quote];
		}
		if (Object.keys(this.quoteBook).length >40){
			this.resetQuoteBook();
		}
		//this.printDriver.printOrderBook(this.sortDictByKey(this.quoteBook), price, quote);
	}


	resetQuoteBook(): void{
		for (let i=0; i<10; ++i){
			let min: number = 1000;
			let key: string = null;
			let rowLength: number;
			let avg: number = 0;
			let sorted = this.sortDictByKey(this.quoteBook);
			sorted.forEach((elem) => {
				rowLength = elem[1].length;
				avg += rowLength;
				if (rowLength > this.quoteAmountAvg && this.quoteAmountAvg > 4){
					delete this.quoteBook[String(elem[0])];
					return;
				}
				if (rowLength < min){
					min = rowLength;
					key = elem[0];
				}
			});

			this.quoteAmountAvg = (avg/sorted.length);
			if (Math.max(this.quoteBook[String(key)]) < 1000000){
				delete this.quoteBook[String(key)];
			}
		}

	}


	sortDictByKey(data: {}): any{
		let sorted: any = Object.keys(data).map(function(key) {
			return [key, data[String(key)]];
		});

		sorted.sort(function(first, second) {
			return second[0] - first[0];
		});

		return sorted;
	}
}
