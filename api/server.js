// BUILD YOUR SERVER HERE
const express = require('express')
const User = require('./users/model')
const server = express()
server.use(express.json())

server.get('/', (req, res) => {
    res.status(200).json({ message: 'here' })
  })

  server.post('/api/users', (req,res)=> {
    const newUser = req.body
    if(!newUser.name || !newUser.bio){
      res.status(400).json({ message: "Please provide name and bio for the user" })
    }else{
      User.insert(newUser)
      .then(user => {
        res.status(201).json(user)
      })
      .catch(err=>{
        console.log(err)
        res.status(500).json({ message: "There was an error while saving the user to the database" })
      })
    }
  })

  server.get('/api/users/:id', (req, res) => {
    console.log('this is the id', req.params.id)
    User.findById(req.params.id)
      .then(user => {
        console.log(user)
        if (user) {
          res.status(200).json(user)
        } else {
          console.log('methings this is it')
        res.status(404).json( {message: "The user with the specified ID does not exist" })
        }
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({ message: "The user information could not be retrieved" })
      })
  })

  server.get('/api/users', (req, res) => {
    User.find(req.params.id)
      .then(users => {
        res.status(200).json(users)
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({ message: "The users information could not be retrieved" })
      })
  })

  
  server.put('/api/users/:id', async (req,res)=> {
    const {id} = req.params
    const changes = req.body

    try{
        const updatedUser = await User.update(id, changes)
            if (!changes.name || !changes.bio) {
                res.status(400).json({message: "Please provide name and bio for the user"})
            } else if (!updatedUser){
                res.status(404).json({message: "The user with the specified ID does not exist"})
            }else {
                res.status(200).json(updatedUser)
            }
        }
    catch (err) {
        res.status(500).json({message: err.message})
    }
})

  server.delete('/api/users/:id', (req, res) => {
    User.remove(req.params.id)
      .then(user => {
        if (user) {
          res.status(200).json(user)
        } else {
          res.status(404).json({ message: "The user with the specified ID does not exist" })
        }
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({ message: "The user could not be removed" })
      })
  })


module.exports = server; // EXPORT YOUR SERVER instead of {}
