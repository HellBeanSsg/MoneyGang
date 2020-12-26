import {BitmexDriver} from  "./driver"


class Test{
	myDriver: BitmexDriver;
	constructor(){
		this.myDriver = new BitmexDriver(this.tradeInfo, this.orderBookInfo);
	}

	tradeInfo(data: {}): void {
		//console.log('trade info');
		//console.log(data);

	}


	orderBookInfo(data: []): void{
		const orderBook = {};
		data.forEach(function(row){
			orderBook[row['price']]= row['size'];
		});
		var items = Object.keys(orderBook).map(function(key) {
		  return [key, orderBook[key]];
		});

		// Sort the array based on the second element
		items.sort(function(first, second) {
		  return second[0] - first[0];
		});

		console.clear();
		items.forEach(function(item){console.log(item);});
	}

}


const test = new Test();
