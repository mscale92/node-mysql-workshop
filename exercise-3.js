//

require("colors");
var wrap = require('word-wrap');
var promiseFuncs = require('./promise_funcs.js');
    //use .query for the getQueryPromise function

//mods


var emailNamesQ = `
    select 
    a.id 
    ,email 
    ,ab.name 
    from Account a 
    join AddressBook ab on (ab.accountId = a.id);
`;
//my query that selects the accounts from Account
    //and the name values from AddressBook

var Table = require('cli-table');
var table = new Table();

// wrap(str, {indent: '      '});

promiseFuncs.query(emailNamesQ)
.then(function(result){
    // console.log(result);
    
    // var test = result.reduce(function(merge, row){
    //     if(merge[row.id]){
    //         merge[row.id].name += ", " + row.name;
    //         return merge;
    //     }
    //     else{
    //         merge[row.id] = row;
    //         return merge;
    //     }
        
    // }, {})
    var sorted = []
    
    result.reduce(function(copy, row, idx, array){
       
        if(copy.id === row.id){
            if(idx === (array.length -1)){
                copy.name += ", " + row.name;
                sorted.push(copy);
                return copy;
            }
            copy.name += ", " + row.name;
            return copy;
        }
        else{
            if(idx === (array.length -1)){
            
                sorted.push(row);
                return row;
            }
            sorted.push(copy);
            return row;
        }
    })
    
    console.log(sorted);
    sorted.forEach(function(row){
        console.log(row.id
        + " : " + row.email);
        console.log(wrap(row.name, {indent: '      '}));
    })
})
.catch(function(err){
    console.log(err);
})