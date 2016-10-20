
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
            //make our string of types an array so that we can meddle
            //with it
        name = name.map(function(type){
            return indent + type;
        })
            //use a map inside of the map to give each string an
            //indent in front of it
        row['group_concat(ab.name)'] = name;
            //make the object value the new array with indents
        return [row.id, row.email, row['group_concat(ab.name)']];
            //return all our data as an array
            //so that we can use a forEach to console.log everything
    }).forEach(function(row){
        console.log("#" + row[0] + " : " + row[1]);
            //give our id values pound symbols and separate our
            //email addresses with a colon
        console.log(row[2].join('\n'));
            //join our array of strings with a new line
            //as the separator
         console.log("");
            //add a space in between each entry
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