/* DB_Schema */
const studentsch    = require("./DB_TestSchema.js");
const HellBeanSsg   = studentsch();

module.exports = () => {
    return {
        findall : () => {
            return new Promise((resolve) => {
                HellBeanSsg.find({}, {}, (error, member) => {
                    if(error){
                        resolve(error);
                    }else{
                        resolve(member);
                    }
                });
            });
        },
        findbyname : (arg1) => {
            return new Promise((resolve) => {
                HellBeanSsg.find({Name : arg1}, {}, (error, member) => {
                    if(error){
                        resolve(error);
                    }else{
                        resolve(member);
                    }
                });
            });
        },
        findbyAge : (arg1) => {
            return new Promise((resolve) => {
                HellBeanSsg.find({Age : arg1}, {}, (error, member) => {
                    if(error){
                        resolve(error);
                    }else{
                        resolve(member);
                    }
                });
            });
        },
        insert : (Name, Age) => {
            return new Promise((resolve) => {
                const newhellbeanssg = new HellBeanSsg(
                    {
                        Name : Name,
                        Age : Age
                    }
                );
                newhellbeanssg.save(function(error, data){
                    if(error){
                        resolve("Save Failed!");
                    }else{
                        resolve(["Save Success!", data]);
                    }
                });
            });
        }
    };
};