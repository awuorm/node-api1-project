const express = require("express")
const cors = require("cors")
const server = express()
const db = require("./data/db")

 server.use(cors())
 server.use(express.json())

server.get("api/users/:id",getUser)
server.get("/api/users",getAllUsers)
server.get("*",handleRequest)


function getUser(req,res)  {
    const { id } = req.params;
    db.findById(id)
      .then(data => {
          res.json(data)
          console.log("response from user endpoint",data)
      })  
      .catch(error => {
          console.log("error from user endpoint",error)
      })
}

function getAllUsers(req,res) {
    db.find()
      .then(data => {
          console.log("response from users endpoint",data)
          res.json(data)
      } ) 
      .catch(error => {
          console.log("error from server",error)
          res.json(error)
      }) 
}

function handleRequest(req,res) {
    res.json("Hello from server!")
}






server.listen(process.env.PORT || 3000, () => {
    console.log("listening" + (process.env.PORT || 3000))
} )