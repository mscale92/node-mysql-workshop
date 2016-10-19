//

var mysql = require('mysql');
var promiseFuncs = require('./promise_funcs.js');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'mscale92',
  password : '',
  database : 'addressbook'
});

var databaseFetchQuery = `show databases`;

// connection.query(databaseFetchQuery, function(err, result){
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log(JSON.stringify(result, null, 4));
//     }
//     connection.end()
// })

function getQueryPromise(query){
    return(
        new Promise(function(resolve, reject){
            //put the asynchronous function here
            //with the param value
                //like request using a url
            connection.query(query, function(err, result) {
              
              if(err){
                  reject(err);
              }
              
              else{
                  resolve(JSON.stringify(result, null, 4))
              }
            });
        })
    )
}

promiseFuncs.query(databaseFetchQuery)
.then(function(result){
    console.log(result);
    // connection.end();
})
.catch(function(err){
    console.log(err);
})