import { BitmexDriver } from "./bitmex-driver"
import { PrintDriver }  from "./print-driver"

export
class CallbackDriver{
	myDriver: BitmexDriver;
	printDriver: PrintDriver;
	lastPrice: number;
	lastValue: number;
	orderBook: {};
	quoteBook: {};	
	quoteList: Array<number>;
	quoteListIdx: number;
	quoteAmountAvg: number;
	debug: number;

	constructor(){
		this.myDriver = new BitmexDriver(this);
		this.printDriver = new PrintDriver();
		this.lastPrice = 0;
		this.lastValue = 0;
		this.quoteListIdx = 0;
		/*
		**@ 0: Print nothing
		**@ 1: Print orderBook
		**@ 2: Print qouteBook
		**@ 3: Print input data from orderBookInfo
		*/
		this.debug = 1;
		this.orderBook = {};
		this.quoteBook = {};
		this.quoteList = new Array<number>(10000);
	}


	tradeInfo(data: {}): void {
		this.lastPrice = data['price'];
		this.lastValue = data['size'];
	}


	orderBookInfo(data: []): void{
		let price: number;
		let size:  number;
		let quote:  number;
		let row:   {};
		if (this.debug == 3) {
			console.clear();
			console.log(data);
		}
		for (var i=0; i<data.length; i++){
			row = data[i];
			price = row['price'];
			size = row['size'];
			if (price in this.orderBook) {
				quote = this.orderBook[price] - size;
			} else {
				quote = size;
			}
			this.orderBook[price] = size;
			if (quote > 1000)
				this.addQuote(price, quote);
		}
		let sorted: number[][] = this.sortDictByKey(this.orderBook);

		if (this.debug == 1) {
			this.printDriver.printOrderBook(sorted, this.lastPrice, this.lastValue);
		}
	}


	addQuote(price: number, quote: number){
		if (!(quote in this.quoteList) && (quote < 1000000)){
			this.quoteList[this.quoteListIdx] = quote;
			this.quoteListIdx = (this.quoteListIdx + 1) % 10000;
		} else {
			new Promise((res, rej) => {
				console.clear();
				if (price in this.quoteBook){ this.quoteBook[price].push(quote); }
				else {
					this.quoteBook[price] = [quote];
					if (Object.keys(this.quoteBook).length >40){
						this.resetQuoteBook();
					}
				}
				if (this.debug == 2) {
					this.printDriver.printOrderBook(this.sortDictByKey(this.quoteBook), price, quote);
				}
				res(true);
			});
		}
	}


	resetQuoteBook(){
		for (let i=0; i<10; ++i){
			let min: number = 100000000;
			let key: string = null;
			let buf: number;
			let avg: number = 0;
			let sorted = this.sortDictByKey(this.quoteBook);
			for (let j=0; j<sorted.length; ++j){
				buf = sorted[j][1].length;
				avg += buf
				if (buf > this.quoteAmountAvg && this.quoteAmountAvg > 4){
					delete this.quoteBook[sorted[j][0]];
					continue;
				}
				if (buf <= min){
					if ( buf == min && Math.random() >0.5) {
						continue;
					}
					min = buf;
					key = sorted[j][0];
				}
			}
			this.quoteAmountAvg = avg/sorted.length;
			if (Math.max(this.quoteBook[key]) < 1000000){
				delete this.quoteBook[key];
			}
		}

	}


	sortDictByKey(data: {}): any{
		let sorted: any = Object.keys(data).map(function(key) {
		  return [key, data[key]];
		});

		sorted.sort(function(first, second) {
		  return second[0] - first[0];
		});

		return sorted;
	}
}
