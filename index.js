let express = require('express');
let my_route = require("./book");
let fs =require("fs")

let app = express()

let logger =(req,res, next)=>{
    let method =req.method
    let url= req.url
    let content_type= req.header("content-type")
    let agent = req.header("user-agent")
    let protocol = req.protocol
    let hostname = req.hostname
    let data= `[${method}] - ${url}-[${content_type}]-[${agent}]`
    
//console.log("Log: " +Date()+ "/n")
fs.appendFile("server.log", data, (err)=>{
    if(err) throw err
    resconsole.log("Server log saved")
})
next()
}

app.use(logger)
app.get("/", (req, res)=>{
    res.send("<h1> Hello, express routes example</h1>")
})
app.route("/hello")
.get((req, res)=>{
res.send("<h1>Hello ,Get")
})
.post((req, res)=>{
res.send("<h1>Hello ,Post")
})
.delete((req, res)=>{
res.send("<h1>Hello ,Delete")
})
.patch((req, res)=>{
res.send("<h1>Hello ,Patch")
})

app.use(my_route)
let SERVER_PORT = process.env.PORT || 8089
app.listen(SERVER_PORT)
console.log(`Server is running at ${SERVER_PORT}`)
//console.log(process.env)