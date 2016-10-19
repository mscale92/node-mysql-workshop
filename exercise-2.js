/*
1. Write a program that fetches the first 5 accounts in the addressbook database
    2. For each account, console.log a line with the account's 
    ID and email, like this: #1:email@domain.com
        3. Use the colors NPM module with the .bold option to achieve this effect
*/

require("colors");
var Table = require('cli-table');
var promiseFuncs = require('./promise_funcs.js');
    //use .query for the getQueryPromise function

//mods

var table = new Table({
    head: ['id'.blue.bold, 'email'.blue.bold]
  , colWidths: [10, 50]
});
//my table dimensions and colors
    //head refers to column names
    //the colWidths refers to the width of the columns

var fetchAccountsQuery = `
    select 
    id 
    ,email 
    from Account 
    order by id limit 5`;
//my query

promiseFuncs.query(fetchAccountsQuery)
.then(function(result){

    result.map(function(obj){
        obj.id = obj.id.toString();
        //if we want to use colors,
            //we need a string
        return [obj.id.green.bold, obj.email];
        //remove the key names from our sql data
            //if we don't, the table will interpret
            //our column names as values, uh oh!
    }).forEach(function(row){
        table.push(row);
        //add the rows to the table
    })
    
    console.log(table.toString());
        //print our table array as a string
    
})
.catch(function(err){
    console.log(err);
})