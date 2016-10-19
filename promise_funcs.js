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
