
function makeQueryPromise(connection){
    //take connection as a parameter
  return (
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
                
                
              });
          })
      )
}
  )
}

module.exports= makeQueryPromise;
  //don't need a .query since we are only exporting the function
    //not an object of functions
