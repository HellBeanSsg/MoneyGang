import { BitmexDriver } from "./BitmexDriver";
import { PrintDriver }  from "./PrintDriver";

export
class CallbackDriver{
	printDriver: PrintDriver;
	lastPrice: number;
	lastValue: number;
	orderBook: Map<String, number>;
	quoteBook: Map<String, Array<number>>;	
	quoteAmountAvg: number;
	traceQuoteThreshold: number;

	constructor(){
		this.printDriver = new PrintDriver();
		this.lastPrice = 0;
		this.lastValue = 0;
		this.quoteAmountAvg = 40;
		this.traceQuoteThreshold = 100;
		this.orderBook = new Map<String, number>();
		this.quoteBook = new Map<String, Array<number>>();
	}


	tradeInfo(data: Map<String, number>): void {
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
				quote = this.orderBook.get(String(price))! - size;
			} else {
				quote = size;
			}
			this.orderBook.set(String(price), size);
			if (quote > this.traceQuoteThreshold) {
				this.addQuote(price, quote);
			}
		});
		//this.printDriver.printOrderBook(this.sortDictByKey(this.orderBook), this.lastPrice, this.lastValue);
	}


	addQuote(price: number, quote: number): void{
		if (price in this.quoteBook) {
			this.quoteBook.get(String(price))!.push(quote);
		} else {
			this.quoteBook.set(String(price), [quote]);
		}
		if (Object.keys(this.quoteBook).length >40){
			this.resetQuoteBook();
		}
		this.printDriver.printOrderBook(this.sortDictByKey(this.quoteBook), price, quote);
	}


	resetQuoteBook(): void{
		for (let i=0; i<10; ++i){
			let min: number = 1000;
			let key: string = "";
			let rowLength: number;
			let avg: number = 0;
			let sorted = this.sortDictByKey(this.quoteBook);
			sorted.forEach((elem: Array<any>) => {
				rowLength = elem[1].length;
				avg += rowLength;
				if (rowLength > this.quoteAmountAvg && this.quoteAmountAvg > 4){
					this.quoteBook.delete(String(elem[0]));
					return;
				}
				if (rowLength < min){
					min = rowLength;
					key = elem[0];
				}
			});

			this.quoteAmountAvg = (avg/sorted.length);
			if (Math.max(...this.quoteBook.get(String(key))!) < 1000000){
				this.quoteBook.delete(String(key));
			}
		}

	}


	sortDictByKey(data: Map<String, any>): any{
		let sorted: any = Array.from(data.keys()).map((key) => [key, data.get(String(key))]);
		sorted.sort(function(first: Array<any>, second: Array<any>) {
			return second[0] - first[0];
		});

		return sorted;
	}
}
