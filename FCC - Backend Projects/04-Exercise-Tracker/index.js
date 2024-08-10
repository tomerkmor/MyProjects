const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose')
const { Schema } = mongoose; // Correctly import Schema
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })

app.use(cors())
app.use(express.static('public'))

// Basic Configuration
app.use(express.json())
  // helps us to make sure we can access req.body
app.use(express.urlencoded({extended: true})) 

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

const LogSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: new Date()
  }
})

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  count: {
    type: Number,
    default: 0
  },
  log: [LogSchema]
})
const User = mongoose.model('User', UserSchema)

app.post('/api/users', async (req,res) => {
  try{
    const username = await req.body.username
    const exists = await User.findOne({username: username})

    if(!exists){
      const newUser = new User({
        username: username,
        count: 0, 
        log: []
      })

      const addedUser = await User.create(newUser)
      res.json({
        username: username,
        _id: newUser._id
      }) 
      console.log("USER CREATED!")

    }else{ // the user exists
      console.log("username already exists.")
      res.json({username: exists.username, _id: exists._id})
    }
  }catch (err){
    res.status(500).send(err.message);
  }
})


app.post('/api/users/:_id/exercises', async (req,res) => {
  try{
    const id = req.params._id
    const { description, duration, date} = await req.body

    const user = await User.findOne({_id: id})
    if(!user){
      return res.status(404).json({msg: `No User with id of: ${id} was found`})
    } 
    const newLog = {
      description: description, 
      duration: parseInt(duration), 
      date: date ? new Date(date) : new Date()
    }

    user.log.push(newLog)
    user.count += 1
    await user.save()

    res.status(200).json({
      _id: user._id,
      username: user.username,
      date: new Date(date).toDateString(),
      duration: newLog.duration,
      description: newLog.description
    })
  }catch(err){
    console.log(err)
  }
})


app.get('/api/users', async (req,res) => {
  const users = await User.find({}).select("_id username")

  if (!users) {
    res.send("No users");
  } else {
    res.json(users);
  }
})


app.get('/api/users/:_id/logs', async (req,res) => {
  const id = req.params._id
  const { from, to, limit} = req.query
 
  // Convert 'from' and 'to' query parameters to Date objects
  const fromDate = from ? new Date(from) : null
  const toDate = to ? new Date(to) : null
  const limitNumber = limit ? parseInt(limit, 10) : undefined;

  try{
    const user = await User.findOne({_id: id})
    if(!user){
      return res.status(404).json({msg: `No User with id of: ${id} was found`})
    }

    let filteredLogs = user.log

    if(fromDate){
      filteredLogs = filteredLogs.filter(log => log.date >= fromDate)
    }

    if(toDate){
      filteredLogs = filteredLogs.filter(log => log.date <= toDate)
    }

    if(limitNumber){
      filteredLogs = filteredLogs.slice(0,limitNumber)
    }

   
    const modifiedLogs = filteredLogs.map((log) => ({
      description: log.description,
      duration: log.duration,
      date: log.date.toDateString()
    }))


     
    res.json({
      _id: user._id,
      username: user.username,
      count: user.count,
      log: modifiedLogs
    })
    
  }catch(error){
    res.send(error)
  }
})

const port = process.env.PORT || 3000;
const start = async () => {
  try {
      await mongoose.connect(process.env.MONGO_URI) // (invoking the dotenv package)
      app.listen(port, console.log(`Server is listening on port ${port}`))
  } catch (error) {
      console.log(error)
  }
}

start()