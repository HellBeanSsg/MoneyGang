/* DB_Schema */
const testsch   = require("./DB_TestSchema.js");
const testmodel = testsch();

module.exports = () => {
    return {
        findyear : (year) => {
            return new Promise((resolve, reject) => {
                testmodel.find({Year : year}, {_id : 1, Price : 1, OCvalue : 1}, (error, data) => {
                    if(error) reject(error);
                    else resolve(data);
                })
            })  
        },
        findmonth : (year, month) => {
            return new Promise((resolve, reject) => {
                testmodel.find({Year : year, Month : month}, {_id : 1, Price : 1, OCvalue : 1}, (error, data) => {
                    if(error) reject(error);
                    else resolve(data);
                })
            });
        },
        findday : (year, month, day) => {
            return new Promise((resolve, reject) => {
                testmodel.find({Year : year, Month : month, Day : day},
                                {_id : 1, Price : 1, OCvalue : 1}, (error, data) => {
                    if(error) reject(error);
                    else resolve(data);
                })
            });
        },
        findhour : (year, month, day, hour) => {
            return new Promise((resolve, reject) => {
                testmodel.find({Year : year, Month : month, Day : day, Hour : hour},
                                {_id : 1, Price : 1, OCvalue : 1}, (error, data) => {
                    if(error) reject(error);
                    else resolve(data);
                })
            });
        },
        findminute : (year, month, day, hour, minute) => {
            return new Promise((resolve, reject) => {
                testmodel.find({Year : year, Month : month, Day : day, Hour : hour, Minute : minute},
                                {_id : 1, Price : 1, OCvalue : 1}, (error, data) => {
                    if(error) reject(error);
                    else resolve(data);
                })
            });
        },
        findsecond : (year, month, day, hour, minute, second) => {
            return new Promise((resolve, reject) => {
                testmodel.find({Year : year, Month : month, Day : day, Hour : hour, Minute : minute, Second : second},
                                {_id : 1, Price : 1, OCvalue : 1}, (error, data) => {
                    if(error) reject(error);
                    else resolve(data);
                })
            });
        },
        opinsert : (date, price) => {
            let parsed = date.split("_");
            let modeling =  {
                _id         : date,
                Year        : parsed[0],
                Month       : parsed[1],
                Day         : parsed[2],
                Hour        : parsed[3],
                Minute      : parsed[4],
                Second      : parsed[5],
                Price       : price,
                OCvalue     : 0
            };
            const newtestmodel = new testmodel(modeling);
            newtestmodel.save((error, data) => {
                if(error) return(error);
                else return(data);
            });
        },
        cpinsert : (date, price) => {
            let parsed = date.split("_");
            let modeling =  {
                _id         : date,
                Year        : parsed[0],
                Month       : parsed[1],
                Day         : parsed[2],
                Hour        : parsed[3],
                Minute      : parsed[4],
                Second      : parsed[5],
                Price       : price,
                OCvalue     : 1
            };
            const newtestmodel = new testmodel(modeling);
            newtestmodel.save((error, data) => {
                if(error) return(error);
                else return(data);
            });
        }
    };
};
