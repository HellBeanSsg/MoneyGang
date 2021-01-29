/* DB_Schema */
const studentsch    = require("./DB_TestSchema.js");
const hellbeanssg   = studentsch();

module.exports = () => {
    return {
        find_all : () => {
            return new Promise((resolve, reject) => {
                hellbeanssg.find({}, {}, (error, member) => {
                    if(error){
                        resolve(error);
                    }else{
                        resolve(member);
                    }
                });
            });
        },
        find_by_name : (arg1) => {
            return new Promise((resolve, reject) => {
                hellbeanssg.find({Name : arg1}, {}, (error, member) => {
                    if(error){
                        resolve(error);
                    }else{
                        resolve(member);
                    }
                });
            });
        },
        find_by_Age : (arg1) => {
            return new Promise((resolve, reject) => {
                hellbeanssg.find({Age : arg1}, {}, (error, member) => {
                    if(error){
                        resolve(error);
                    }else{
                        resolve(member);
                    }
                });
            });
        },
        insert_one : (Name, Age) => {
            return new Promise((resolve, reject) => {
                const newhellbeanssg = new hellbeanssg({Name : Name, Age : Age});
                newhellbeanssg.save(function(error, data){
                    if(error){
                        resolve("Save Failed!");
                    }else{
                        resolve("Save Success!");
                    }
                });
            });
        },
        insert_many : (Name, Age) => {
            return new Promise((resolve, reject) => {
                const newhellbeanssg = new hellbeanssg({Name : Name, Age : Age});
                newhellbeanssg.save(function(error, data){
                    if(error){
                        resolve("Save Failed!");
                    }else{
                        resolve("Save Success!");
                    }
                });
            });
        }
    };
};