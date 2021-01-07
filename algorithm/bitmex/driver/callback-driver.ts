import { BitmexDriver } from "./bitmex-driver"
import { PrintDriver }  from "./print-driver"

export
class CallbackDriver{
	myDriver: BitmexDriver;
	printDriver: PrintDriver;
	lastPrice: number;
	lastValue: number;
	quoteBook: {};

	constructor(){
		this.myDriver = new BitmexDriver(this);
		this.printDriver = new PrintDriver();
		this.lastPrice = 0;
		this.lastValue = 0;
		this.quoteBook = {};
	}


	tradeInfo(data: {}): void {
		this.lastPrice = data['price'];
		this.lastValue = data['size'];
	}


	orderBookInfo(data: []): void{
		console.clear();
		let orderBook: {} = {};

		data.forEach(function(row){ orderBook[row['price']] = row['size']; });
		let sorted: number[][] = this.sortDictByKey(orderBook);

		this.printDriver.printOrderBook(sorted, this.lastPrice, this.lastValue);
	}


	quoteInfo(data: Array<{}>): void{
		console.clear();
		let row: {};
		for(var i=-1; i<data.length; i++){
			row = data[i];
			let bidPrice: number = row['bidPrice'];
			let askPrice: number = row['askPrice'];
			let bidSize:  number = row['bidSize'];
			let askSize:  number = row['askSize'];

			if (bidPrice in this.quoteBook) {
				this.quoteBook[bidPrice] += bidSize;
			} else {
				this.quoteBook[bidPrice] = bidSize;
			}

			if (askPrice in this.quoteBook) {
				this.quoteBook[bidPrice] -= askSize;
			} else {
				this.quoteBook[askPrice] = -askSize;
			}
		}

		let sorted: number[][] = this.sortDictByKey(this.quoteBook);

		this.printDriver.printOrderBook(sorted, this.lastPrice, this.lastValue);
	}


	sortDictByKey(data: {}): number[][]{
		let sorted: number[][] = Object.keys(data).map(function(key) {
		  return [key, data[key]];
		});

		sorted.sort(function(first, second) {
		  return second[0] - first[0];
		});

		return sorted;
	}
}
