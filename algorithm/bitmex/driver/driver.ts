const BitMEXClient = require('bitmex-realtime-api')
const fs = require('fs')

export
class BitmexDriver{
	BitmexClient: typeof BitMEXClient;
	
	constructor(tradeInfo: ({})=>void, orderBookInfo: ([]) => void){
		const key = this.getKey();
		this.BitmexClient = new BitMEXClient({apiKeyID: key});
		this.BitmexClient.addStream('XBTUSD', 'trade', (data, symbol: string, tablename: string) => {tradeInfo(data[data.length-1]);});
		this.BitmexClient.addStream('XBTUSD', 'orderBookL2_25', (data, symbol: string, tablename: string) => {orderBookInfo(data);});
	}

	private getKey(): string {
		const keyFile = fs.readFileSync('key.txt');
		const key = keyFile.toString().split('\n');
		return key;
	}

}
