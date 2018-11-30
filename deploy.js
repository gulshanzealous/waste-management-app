const express = require('express')
const helmet = require('helmet')
const path = require('path')
const app = express()

app.use(helmet())

app.use(express.static("build"))

app.all('*',(req,res)=>{
	res.sendFile(path.join(__dirname,"build","index.html"))
});


const server = app.listen(3000,()=>{
    console.log(`server listening on ${server.address().port}`)
})
