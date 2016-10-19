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
                  var dataArray = JSON.stringify(result, null, 4);
                  resolve(JSON.parse(dataArray));
                  //parse our nice and tidy string so that 
                    //we can use our array of table data
              }
              connection.end();
              //for mods the connection needs to be ended within the function
            });
        })
    )
}

module.exports.query = getQueryPromise;
