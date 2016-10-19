/*
1. Write a program that fetches the first 5 accounts in the addressbook database
    2. For each account, console.log a line with the account's 
    ID and email, like this: #1:email@domain.com
        3. Use the colors NPM module with the .bold option to achieve this effect
*/

var promiseFuncs = require('./promise_funcs.js');
    //use .query for the getQueryPromise function

var fetchAccountsQuery = `
    select 
    id 
    ,email 
    from Account 
    order by id limit 5`;

promiseFuncs.query(fetchAccountsQuery)
.then(function(result){
    console.log(result);
})
.catch(function(err){
    console.log(err);
})