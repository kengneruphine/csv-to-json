// Import required module csvtojson and mongodb packages
const csvtojson = require("csvtojson");
const mongodb = require("mongodb");


let url = "mongodb://localhost:27017/employment";

let dbConn;
mongodb.MongoClient.connect(url, {
    useUnifiedTopology: true,
}).then((client) => {
    console.log("DB Connected!");
    dbConn = client.db();
}).catch(err => {
    console.log("DB Connection Error: ${err.message}");
});

//csv file name
const fileName = "sample.csv";

let arrayToInsert = [];

csvtojson().fromFile(fileName).then(source =>{
    //fetching that data from each row
    for (let i  = 0; i<source.length; i++){
        let oneRow ={
            firstName: source[i]["Firstname"],
            lastName: source[i]["Lastname"],
            city:source[i]["City"],
            salary: source[i]["Salary"]
        };
        arrayToInsert.push(oneRow);
    }

    //inserting into the table employees

    let collectionName= 'employees';
    let collection = dbConn.collection(collectionName);
    collection.insertMany(arrayToInsert, (err, result)=>{
        if(err) console.log(err);
        if (result){
            console.log("import csv into database successfully");
        }
    });

});