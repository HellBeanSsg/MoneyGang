import BitMEXClient = require("bitmex-realtime-api")
import { CallbackDriver } from "./callback-driver"
import fs = require('fs')

export
class BitmexDriver{
	BitmexClient: typeof BitMEXClient;
	lastQuoteTS: String = null;

	constructor(callbackDriver: CallbackDriver){
		const key = this.getKey();
		this.BitmexClient = new BitMEXClient({apiKeyID: key});
		this.BitmexClient.addStream('XBTUSD', 'trade', (data: [], symbol: string, tablename: string) => {
			callbackDriver.tradeInfo(data[data.length-1]);
		});
		this.BitmexClient.addStream('XBTUSD', 'orderBookL2_25', (data: [], symbol: string, tablename: string) => {
			callbackDriver.orderBookInfo(data);
		});
		this.BitmexClient.addStream('XBTUSD', 'quote', (data: [], symbol: string, stablename: string) => {
			for(var i=data.length-1; i>=0; i--){
				if (data[i]['timestamp'] == this.lastQuoteTS) { break; }
			}
			this.lastQuoteTS = data[data.length-1]['timestamp'];
			callbackDriver.quoteInfo(data.slice(i,data.length));
		});
	}


	private getKey(): string {
		const keyFile = fs.readFileSync('key.txt');
		const key = keyFile.toString().split('\n')[0];
		return key;
	}
}
