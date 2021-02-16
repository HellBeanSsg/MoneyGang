import mongoose from "mongoose";
import config from "../configuration.js";
const schema = mongoose.Schema;
export default class mongo {
    constructor() {
        this.connection = null;
        this.models = {};
        this.model = null;
    }

    connect() {
        mongoose.connect(
            config.DB_host,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        );
        let connection = mongoose.connection;
        this.connection = connection;
        return this.connection;
    }

    setTestModel() {
        const test = schema({
            _id: "string",
            Year: "string",
            Month: "string",
            Day: "string",
            Hour: "string",
            Minute: "string",
            Second: "string",
            Price: "number",
            OCvalue: "number"
        }, {
            versionKey: false
        });
        this.models["testmodel"] = mongoose.model("member", test);
    }

    getModel(modelName) {
        return this.models[modelName];
    }

    findyear(modelName, year) {
        return new Promise((resolve, reject) => {
            this.models[modelName].find(
                {
                    Year: year
                },
                {
                    _id: 1,
                    Price: 1,
                    OCvalue: 1
                },
                (error, data) => {
                    if (error) { reject(error); }
                    else { resolve(data); }
                }
            );
        });
    }

    findmonth(modelName, year, month) {
        return new Promise((resolve, reject) => {
            this.models[modelName].find(
                {
                    Year: year,
                    Month: month
                },
                {
                    _id: 1,
                    Price: 1,
                    OCvalue: 1
                }, (error, data) => {
                    if (error) { reject(error); }
                    else { resolve(data); }
                }
            );
        });
    }

    findday(modelName, year, month, day) {
        return new Promise((resolve, reject) => {
            this.models[modelName].find(
                {
                    Year: year,
                    Month: month,
                    Day: day
                },
                {
                    _id: 1,
                    Price: 1,
                    OCvalue: 1
                },
                (error, data) => {
                    if (error) { reject(error); }
                    else { resolve(data); }
                }
            );
        });
    }

    findhour(modelName, year, month, day, hour) {
        return new Promise((resolve, reject) => {
            this.models[modelName].find(
                {
                    Year: year,
                    Month: month,
                    Day: day,
                    Hour: hour
                },
                {
                    _id: 1,
                    Price: 1,
                    OCvalue: 1
                }, (error, data) => {
                    if (error) { reject(error); }
                    else { resolve(data); }
                }
            );
        });
    }

    findminute(modelName, year, month, day, hour, minute) {
        return new Promise((resolve, reject) => {
            this.models[modelName].find(
                {
                    Year: year,
                    Month: month,
                    Day: day,
                    Hour: hour,
                    Minute: minute
                },
                {
                    _id: 1,
                    Price: 1,
                    OCvalue: 1
                }, (error, data) => {
                    if (error) { reject(error); }
                    else { resolve(data); }
                }
            );
        });
    }

    findsecond(modelName, year, month, day, hour, minute, second) {
        return new Promise((resolve, reject) => {
            this.models[modelName].find(
                {
                    Year: year,
                    Month: month,
                    Day: day,
                    Hour: hour,
                    Minute: minute,
                    Second: second
                },
                {
                    _id: 1,
                    Price: 1,
                    OCvalue: 1
                }, (error, data) => {
                    if (error) { reject(error); }
                    else { resolve(data); }
                }
            );
        });
    }

    opinsert(date, price) {
        let parsed = date.split("_");
        let modeling = {
            _id: date,
            Year: parsed[0],
            Month: parsed[1],
            Day: parsed[2],
            Hour: parsed[3],
            Minute: parsed[4],
            Second: parsed[5],
            Price: price,
            OCvalue: 0
        };
        const newmodel = new this.models[modelName](modeling);
        newmodel.save((error, data) => {
            if (error) { return (error); }
            else { return (data); }
        });
    }

    cpinsert(date, price) {
        let parsed = date.split("_");
        let modeling = {
            _id: date,
            Year: parsed[0],
            Month: parsed[1],
            Day: parsed[2],
            Hour: parsed[3],
            Minute: parsed[4],
            Second: parsed[5],
            Price: price,
            OCvalue: 1
        };
        const newmodel = new this.models[modelName](modeling);
        newmodel.save((error, data) => {
            if (error) { return (error); }
            else { return (data); }
        });
    }
}
