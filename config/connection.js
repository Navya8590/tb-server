const mongoose = require('mongoose')

const connection_string = process.env.CONNECTIONSRING

mongoose.connect(connection_string).then((res)=>{
    console.log("MONGODB ATLAS CONNECTED SUCCESSFULLY WITH TBSERVER");
}).catch(err=>{
    console.log("MONGODB ATLAS CONNECTION FAILED!!!");
    console.log(err);
    
})