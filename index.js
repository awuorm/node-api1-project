const express = require("express")
const cors = require("cors")
const server = express()
const db = require("./data/db")

 server.use(cors())
 server.use(express.json())

 server.post("/api/users",postUser)
server.get("/api/users/:id",getUser)
server.get("/api/users",getAllUsers)
server.get("*",handleRequest)

function postUser(req,res) {
    const user = {
        bio: req.body.bio,  
        created_at: Date(Date.now()), 
        name: req.body.name
      }
      db.insert(user)
        .then(data => {
            console.log("posted data",data)
            res.json(data)
            
        })
        .catch(error => {
            console.log("error from post endpoint",error)
        })

}

// function createNewHub(req, res) {
//     const hub = {
//       name: req.body.name,
//       created_at: 'now',
//     }
  
//     db.add(hub)
//       .then(data => {
//         console.log(data);
//       })
//       .catch(error => {
//         console.log(error);
//       })
//   }

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