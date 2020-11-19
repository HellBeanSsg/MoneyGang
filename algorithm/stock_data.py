import pandas as pd
import os
import pymongo
import json


##
# @brief Get companies listed at kospi&kosdaq
# If there were no datas in db, then crawling from krx
class company_data:
    ##
    # @brief Make a connection with database.
    # Create inner variable with stock_type
    #
    # @return None
    def __init__(self) -> None:
        host_info = open("host.txt", "r")
        host, port = host_info.readlines()
        self.connection = pymongo.MongoClient("mongodb://" + host, int(port))
        self.db = self.connection.yjs
        self.kospi_col = self.db.kospi
        self.kosdaq_col = self.db.kosdaq
        self.stock_type = {
            "kospi": {"market_type": "stockMkt", "code": "KS"},
            "kosdaq": {"market_type": "kosdaqMkt", "code": "KQ"},
        }
        host_info.close()
        return None

    ##
    # @brief Disconnect with database
    #
    # @return None
    def __del__(self) -> None:
        self.connection.close()
        return None

    ##
    # @brief Crawling companies from krx.
    #
    # @param stock_type Want to crawling: "kospi" or "kosdaq"
    #
    # @return All companies listed at kwx.
    def __crawling_stock(self, stock_type: str) -> pd.DataFrame:
        market_type = self.stock_type[stock_type]["market_type"]
        download_link = "http://kind.krx.co.kr/corpgeneral/corpList.do"
        download_link = download_link + "?method=download"
        download_link = download_link + "&marketType=" + market_type
        df = pd.read_html(download_link, header=0)[0]
        return df

    ##
    # @brief Download specific market datas.
    #
    # @param stock_type Want to download: "kospi" or "kosdaq".
    #
    # @return Market datas.
    def __get_download(self, stock_type: str) -> pd.DataFrame:
        code = self.stock_type[stock_type]["code"]
        df = self.__crawling_stock(stock_type)
        df.종목코드 = df.종목코드.map(("{:06d}." + code).format)
        return df

    ##
    # @brief Convert dataframe to json.
    #
    # @param data Want to convert.
    #
    # @return List composed with json datas.
    def __df_to_json(self, data):
        bson = []
        for code in data["code"]:
            body = {}
            line = data.loc[data["code"] == code]
            body["code"] = code
            body["name"] = line["name"].to_string().split()[1]
            body["list_date"] = line["list_date"].to_string().split()[1]
            bson.append(body)
        return bson

    ##
    # @brief Renaming Dataframe column kor to eng.
    #
    # @param pd.DataFrame Want to rename.
    #
    # @return Renamed Dataframe.
    def __rename_df(self, data: pd.DataFrame) -> pd.DataFrame:
        compaction = data.loc[:, ["회사명", "종목코드", "상장일"]]
        columns = {"회사명": "name", "종목코드": "code", "상장일": "list_date"}
        renamed = compaction.rename(columns=columns)
        return renamed

    ##
    # @brief Refresh database if datas were not exist or crashed.
    #
    # @param market_name Want to refresh: "kospi" or "kosdaq".
    #
    # @return 1 if refresh or 0.
    def __refresh_col(self, market_name: str) -> None:
        col = eval("self." + market_name + "_col")
        if col.count() < 1000:
            col.delete_many({})
            df = self.__get_download(market_name)
            renamed = self.__rename_df(df)
            market_json = self.__df_to_json(renamed)
            col.insert(market_json)
            return True
        return False

    ##
    # @brief Get all companies listed at kospi&kosdaq.
    #
    # @return companies list listed at kospi&kosdaq.
    def get_company_list(self) -> list:
        self.__get_download("kospi")
        self.__refresh_col("kospi")
        self.__refresh_col("kosdaq")
        kospi = [{j: i[j] for j in i if j != "_id"} for i in self.kospi_col.find({})]
        kosdaq = [{j: i[j] for j in i if j != "_id"} for i in self.kosdaq_col.find({})]
        return kospi, kosdaq
