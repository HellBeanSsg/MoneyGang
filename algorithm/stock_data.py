import pandas as pd
import os
import pymongo
import json


class stock_data:
    def __init__(self):
        host = open("host.txt", "r")
        host , port  = host.readlines()
        self.connection = pymongo.MongoClient('mongodb://' + host, int(port))
        self.db         = self.connection.yjs
        self.kospi_col  = self.db.kospi
        self.kosdaq_col = self.db.kosdaq
        self.stock_type = {"kospi": {"market_type": "stockMkt", "code": "KS"}, "kosdaq": {"market_type": "kosdaqMkt", "code": "KQ"}}
    
    def __del__(self):
        self.connection.close() 

    def __get_download_stock(self, stock_type):
        market_type = self.stock_type[stock_type]["market_type"]
        download_link = "http://kind.krx.co.kr/corpgeneral/corpList.do"
        download_link = download_link + "?method=download"
        download_link = download_link + "&marketType=" + market_type
        df = pd.read_html(download_link, header=0)[0]
        return df

    def __get_download(self, stock_type):
        code = self.stock_type[stock_type]["code"]
        df = self.__get_download_stock(stock_type)
        df.종목코드 = df.종목코드.map(("{:06d}." + code).format)
        return df

    def __df_to_json(self, data):
        bson = []
        for code in data['code']:
            body = {}
            line = data.loc[data['code'] == code]
            body['code'] = code
            body['name'] = line['name'].to_string().split()[1]
            body['list_date'] = line['list_date'].to_string().split()[1]
            bson.append(body)
        return bson

    def __rename_df(self, data):
        compaction = data.loc[:, ["회사명", "종목코드", "상장일"]]
        columns = {"회사명": "name", "종목코드": "code", "상장일": "list_date"}
        renamed = compaction.rename(columns=columns)
        return renamed

    def __refresh_col(self, market_name):
        col = eval("self." + market_name + "_col")
        if col.count() < 1000:
            col.delete_many({})
            df = self.__get_download(market_name)
            renamed = self.__rename_df(df)
            market_json = self.__df_to_json(renamed)
            col.insert(market_json)

    def get_company_list(self):
        self.__refresh_col("kospi")
        self.__refresh_col("kosdaq")
        kospi  = [{j:i[j] for j in i if j != '_id'} for i in self.kospi_col.find({})]
        kosdaq = [{j:i[j] for j in i if j != '_id'} for i in self.kosdaq_col.find({})]
        return kospi, kosdaq
