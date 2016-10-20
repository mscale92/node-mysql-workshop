
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
//query

var indent = '     ';

promiseFuncs.query(nameQuery)
.then(function(result){
    
    result.map(function(row){
        var name = row['group_concat(ab.name)'].split(',');
        row['group_concat(ab.name)'] = name;
        return [row.id, row.email, row['group_concat(ab.name)']];
    }).forEach(function(row){
       
        console.log("#" + row[0] + " : " + row[1]);
        console.log(row[2].join('\n'));
         console.log("");
    })
    // have the strings become an array so that they are grouped together
})
.catch(function(err){
    console.log(err);
})

/*
// Here is an example usage:
  rows.forEach(function(row) {
    console.log('#' + row.id + ': ' + row.email);
  });
  // This code will output lines like:
  // #1: john@smith.com
  // #2: abc@def.com
  // #5: xx@yy.com
*/