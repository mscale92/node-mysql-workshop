
require("colors");
var wrap = require('word-wrap');
var promiseFuncs = require('./promise_funcs.js');
    //use .query for the getQueryPromise function

//mods


var nameQuery = `
    select 
    a.id 
    ,email 
    ,group_concat(ab.name) 
    from Account a 
    join AddressBook ab on (ab.accountId = a.id) 
    group by a.id`;


promiseFuncs.query(nameQuery)
.then(function(result){
    
    var test = result.map(function(row){
        var name = row['group_concat(ab.name)'].split(',');
        row['group_concat(ab.name)'] = name;
        return [row.id, row.email, row['group_concat(ab.name)']];
    });
    console.log(test);
})
.catch(function(err){
    console.log(err);
})