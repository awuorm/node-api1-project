const express = require("express")
const cors = require("cors")
const server = express()
const db = require("./data/db")

 server.use(cors())
 server.use(express.json())

 server.put("/api/users/:id",editUser)
 server.get("/api/users/:id",getUser)
 server.delete("/api/users/:id",deleteUser)
 server.get("/api/users",getAllUsers)
 server.post("/api/users",postUser)
server.get("*",handleRequest)

function editUser(req,res) {
    const {id} = req.params;
    const user = {
        bio: req.body.bio,  
        created_at: Date(Date.now()), 
        name: req.body.name
      }
    db.update(id,user)
      .then(data => {
          res.json(data)
          console.log("response from edit endpoint",data)
      })
      .catch(error => {
          console/log("error from edit endpoint",error)
      })
}

function deleteUser(req,res) {
    const {id} = req.params;
    db.remove(id)
    .then(data => {
        res.json(data)
        console.log("removed user",data)
    })
    .catch(error => {
        console.log("error from remove endpoint",error)
    })
}

function postUser(req,res) {
    const user = {
        bio: req.body.bio,  
        created_at: Date(Date.now()), 
        name: req.body.name
      }
      db.insert(user)
      res.json(user)
        .then(data => {
            console.log("posted data",data)   
        })
        .catch(error => {
            console.log("error from post endpoint",error)
        })
}


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