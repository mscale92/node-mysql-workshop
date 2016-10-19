var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'mscale92',
  password : '',
  database : 'addressbook'
});


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
              connection.end();
              //for mods the connection needs to be ended within the function
            });
        })
    )
}

module.exports.query = getQueryPromise;
