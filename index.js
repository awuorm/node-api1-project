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
        if (data === Number(0)) {
            res.status(404).json({ message: "The user with the specified ID does not exist." })
            }
            if (req.name || req.bio === undefined) {
            res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
            console.log("response from edit",data)
            }
            else if ( data !== Number(0)) {
            res.status(200).json({response: "user has been edited successfully",editedUser: user})
            console.log("response from edit user endpoint",data)
            }
      })
      .catch(error => {
            res.status(500).json({ error: "The user information could not be modified." });
          console.log("error from edit endpoint",error)
      })
}

function deleteUser(req,res) {
    const {id} = req.params;
    db.remove(id)
    .then(data => {
        if (data === Number(0)) {
            res.status(404).json({ message: "The user with the specified ID does not exist." })
            }
            else if ( data !== Number(0)) {
            res.json({response: "user has been removed successfully"})
            console.log("response from user endpoint",data)
            }
    })
    .catch(error => {
        res.status(500).json({ error: "The user could not be removed" });
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
      .then(data => {
          console.log("posted data",data)   
          res.status(201).json({newUSer:user})
        })
        .catch(error => {
            if (req.name || req.bio === undefined) {
                  res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
              }
              else if (error.code !== "SQLITE_CONSTRAINT") {
                   res.status(500).json({errorMessage:error.code,error: "There was an error while saving the user to the database"});
              }
            console.log("error from post endpoint",error)
        })
}

// {
//     "bio": "Not Tarzan's Wife, another Jane", 
//    " created_at": "Mon Aug 14 2017 12:50:16 GMT-0700 (PDT)",
//       "name": "Mildred",
//       "named": "Mildred"
  
//   }

function getUser(req,res)  {
    const { id } = req.params;
    db.findById(id)
      .then(data => {
          if (data === undefined) {
          res.status(404).json({ message: "The user with the specified ID does not exist." })
          }
          else if ( data !== undefined) {
          res.json(data)
          console.log("response from user endpoint",data)
          }
      })  
      .catch(error => {
        res.status(500).json({ error: "The users information could not be retrieved." })
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
          res.status(500).json({ error: "The users information could not be retrieved." })
      }) 
}

function handleRequest(req,res) {
    res.json("Hello from server!")
}






server.listen(process.env.PORT || 3000, () => {
    console.log("listening" + (process.env.PORT || 3000))
} )