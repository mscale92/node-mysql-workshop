//
var promiseFuncs = require('./promise_funcs.js');
    //use .query for the getQueryPromise function

//mods

var queryAllNames = `
    select
    a.id 
    ,email 
    ,group_concat(ab.name) 
    from Account a 
    left join AddressBook ab on (ab.accountId = a.id) 
    group by a.id
`;
//the query
    //left join means that the join will include every column of the
    //joined values, even if there is a null
        //this means that despite id 5 not having an addressbook
        //it will still be included because it is shared between
        //the two tables
    //the left term comes from the left table, the from table
        //this tables values will all be shared
        //if they do not have a matched value, if there is a null, in
        //the selected columns of the right table, join table, then
        //those values will appear null

var indent = '     ';

promiseFuncs.query(queryAllNames)
.then(function(result){
    
    result.map(function(row){
        if(row['group_concat(ab.name)'] === null){
            var emptyAB = [indent + "--no address books--"];
            row['group_concat(ab.name)'] = emptyAB;
            return row;
        }
        //since we're using a Left Join, we'll get some null values
            //in case this happens, can't split a null,
            //we replace the null value with an array that
            //contains a string, with indent, saying no address books
        else{
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
            return row;
                //return all our data as an array
                //so that we can use a forEach to console.log everything
        }
    }).forEach(function(row){
        console.log("#" + row.id + " : " + row.email);
            //give our id values pound symbols and separate our
            //email addresses with a colon
        console.log(row['group_concat(ab.name)'].join('\n'));
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