/* configuration */
const express       = require("express");
const dbcrud        = require("../DB/DB_crud.js");
const db            = dbcrud();
const customfunc    = require("../function.js");
const func          = customfunc();

/* router */
const routes        = express.Router;
const router        = routes();

let preprice        = null;
let presecond       = null;
let preminute       = null;

router.post("/read", async (req, res) => {
    let oyear       = null, cyear       = null;
    let omonth      = null, cmonth      = null;
    let oday        = null, cday        = null;
    let ohour       = null, chour       = null;
    let ominute     = null, cminute     = null;
    let osecond     = null, csecond     = null;
    let odate       = req.body.ODate.split("_");
    let cdate       = req.body.CDate.split("_");
    let i           = 0;
    odate.forEach((element) => {
        switch(i){
            case 0:
                oyear   = element;
            case 1:
                omonth  = element;
            case 2:
                oday    = element;
            case 3:
                ohour   = element;
            case 4:
                ominute = element;
            case 5:
                osecond = element;
            default:
                i++;
        }
    });
    i = 0;
    cdate.forEach((element) => {
        switch(i){
            case 0:
                cyear   = element;
            case 1:
                cmonth  = element;
            case 2:
                cday    = element;
            case 3:
                chour   = element;
            case 4:
                cminute = element;
            case 5:
                csecond = element;
            default:
                i++;
        }
    });
    if(odate.length === 1){
        let promise1 = null, promise2 = null;
        let loop    = Number(cyear) - Number(oyear);
        let year    = null;
        for (i = 0; i < loop; i++) {
            promise1 = new Promise((resolve) => {
                let result = [];
                year = String(Number(oyear) + i);
                promise2 = db.findyear(year);
                promise2.then((data) => {
                    data.sort(func.jsonsort);
                    result.push(func.pushtojson(data));
                    resolve(result);
                });
            });
        }
        promise1.then((data) => { console.log(data) });
    }
    else if(odate.length === 2){
        let promise1 = null, promise2 = null;
        let loop    = Number(cmonth) - Number(omonth);
        let year    = oyear;
        let month   = null;
        for (i = 0; i < loop; i++) {
            promise1 = new Promise((resolve) => {
                let result = [];
                month = Number(omonth) + i;
                if(month < 10) month = "0" + String(month);
                promise2 = db.findmonth(year, month);
                promise2.then((data) => {
                    data.sort(func.jsonsort);
                    result.push(func.pushtojson(data));
                    resolve(result);
                });
            });
        }
        promise1.then((data) => { console.log(data) });
    }
    else if(odate.length === 3){
        let promise1 = null, promise2 = null;
        let loop    = Number(cday) - Number(oday);
        let year    = oyear;
        let month   = omonth;
        let day     = null;
        for (i = 0; i < loop; i++) {
            promise1 = new Promise((resolve) => {
                let result = [];
                day = Number(oday) + i;
                if(day < 10) day = "0" + String(day);
                promise2 = db.findday(year, month, day);
                promise2.then((data) => {
                    data.sort(func.jsonsort);
                    result.push(func.pushtojson(data));
                    resolve(result);
                });
            });
        }
        promise1.then((data) => { console.log(data) });
    }
    else if(odate.length === 4){
        let promise1 = null, promise2 = null;
        let loop    = Number(chour) - Number(ohour);
        let year    = oyear;
        let month   = omonth;
        let day     = oday;
        let hour    = null;
        for (i = 0; i < loop; i++) {
            promise1 = new Promise((resolve) => {
                let result = [];
                hour = Number(ohour) + i;
                if(hour < 10) hour = "0" + String(hour);
                const promise = db.findhour(year, month, day, hour);
                promise.then((data) => {
                    data.sort(func.jsonsort);
                    result.push(func.pushtojson(data));
                    resolve(result);
                });
            });
        }
        promise1.then((data) => { console.log(data) });
    }
    else if(odate.length === 5){
        let promise1 = null, promise2 = null;
        let loop    = Number(cminute) - Number(ominute);
        let year    = oyear;
        let month   = omonth;
        let day     = oday;
        let hour    = ohour;
        let minute  = null;
        for (i = 0; i < loop; i++) {
            promise1 = new Promise((resolve) => {
                let result = [];
                minute = Number(ominute) + i;
                if(minute < 10) minute = "0" + String(minute);
                promise2 = db.findminute(year, month, day, hour, minute);
                promise2.then((data) => {
                    data.sort(func.jsonsort);
                    result.push(func.pushtojson(data));
                    resolve(result);
                });
            });
        }
        promise1.then((data) => { console.log(data) });
    }
    else{
        let promise1 = null, promise2 = null;
        let loop    = Number(csecond) - Number(osecond);
        let year    = oyear;
        let month   = omonth;
        let day     = oday;
        let hour    = ohour;
        let minute  = ominute;
        let second  = null;
        for (i = 0; i < loop; i++) {
            promise1 = new Promise((resolve) => {
                let result = [];
                second = Number(osecond) + i;
                if (second < 10) second = "0" + String(second);
                promise2 = db.findsecond(year, month, day, hour, minute, second);
                promise2.then((data) => {
                    data.sort(func.jsonsort);
                    result.push(func.pushtojson(data));
                    resolve(result);
                });
            });
        }
        promise1.then((data) => { console.log(data) });
    }
});

router.post("/insert", async (req, res) => {
    let date    = req.body.Date.split("_");
    let year    = null;
    let month   = null;
    let day     = null;
    let hour    = null;
    let minute  = null;
    let second  = null;
    let i       = 0;
    date.forEach((element) => {
        switch(i){
            case 1:
                year    = element;
            case 2:
                month   = element;
            case 3:
                day     = element;
            case 4:
                hour    = element;
            case 5:
                minute  = element;
            case 6:
                second  = element;
            default:
                i++;
        }
    });

    date = year + "_" + month + "_" + day + "_" + hour + "_" + minute + "_" + second; 

    price = req.body.Price;

    /* 서버 실행시 한번만 실행됨 */
    if(!preprice)  preprice  = price;
    if(!preminute) preminute = minute;
    if(!presecond) {
        presecond = second;
        db.opinsert(date + "_0", price);
    }
    else {
        if (presecond !== second) {
            if (preminute !== minute) {
                let tmpsecond = Number(second) + 60;
                let tmpdate = year + "_" + month + "_" + day + "_" + hour; 
                while (tmpsecond - 1 > Number(presecond)) {
                    if(tmpsecond - 1 > 59){
                        if(tmpsecond - 61 < 10){
                            tmpsecond--;
                            db.opinsert(tmpdate + "_" + minute + "_0" + (tmpsecond - 60) + "_0", preprice);
                            db.cpinsert(tmpdate + "_" + minute + "_0" + (tmpsecond - 60) + "_1", preprice);
                        }
                        else{
                            tmpsecond--;
                            db.opinsert(tmpdate + "_" + minute + "_" + (tmpsecond - 60) + "_0", preprice);
                            db.cpinsert(tmpdate + "_" + minute + "_" + (tmpsecond - 60) + "_1", preprice);
                        }
                    }
                    else{
                        tmpsecond--;
                        db.opinsert(tmpdate + "_" + preminute + "_" + tmpsecond + "_0", preprice);
                        db.opinsert(tmpdate + "_" + preminute + "_" + tmpsecond + "_1", preprice);
                    }
                }
            }
            else {
                let tmpsecond = Number(second);
                let tmpdate = year + "_" + month + "_" + day + "_" + hour + "_" + minute; 
                while (tmpsecond - 1 > Number(presecond)) {
                    if(tmpsecond - 1 < 10){
                        tmpsecond--;
                        db.opinsert(tmpdate + "_0" + tmpsecond + "_0", preprice);
                        db.cpinsert(tmpdate + "_0" + tmpsecond + "_1", preprice);
                    }
                    else{
                        tmpsecond--;
                        db.opinsert(tmpdate + "_" + tmpsecond + "_0", preprice);
                        db.cpinsert(tmpdate + "_" + tmpsecond + "_1", preprice);
                    }
                }
            }
            db.opinsert(date + "_0", price);
            presecond = second;
            preminute = minute;
            preprice  = price;
        }
        else if(presecond === second) {
            db.cpinsert(date + "_1", price);
            preprice = price;
        }
    }
    res.send("OK");
});

router.post("/insert/many", async (req, res) => {
    req.body.forEach((element) => {
        if(!(!element.Age || !element.Name)){
            db.insert(element);
        }
    });
    res.json("result");
});

module.exports = router;
