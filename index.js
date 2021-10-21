const express = require('express')

const app = express()

app.use(express.static('public'))

var port;
if(process.env.PORT != undefined){
  port=process.env.PORT;
}
else {
  port='3001';
}

app.listen(port, 
  function(){
    console.log('App listening on port '+port)
  }
)