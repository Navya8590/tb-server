require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./routes/router')
require('./config/connection')

const tbserver = express()

tbserver.use(cors())
tbserver.use(express.json())
tbserver.use(router)
tbserver.use('/uploads',express.static('./uploads'))

const PORT = 3000 || process.env.PORT

tbserver.listen(PORT,()=>{
    console.log(`travel blog server started at port : ${PORT} and waiting for client request!!!`);
})


// http://localhost:3000/ - get
tbserver.get('/',(req,res)=>{
    res.status(200).send(`<h1 style="color:red">travel blog server started  and waiting for client request</h1>`)
})