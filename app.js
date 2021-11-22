const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bcrypt = require('bcrypt')
const { 
    createNewUser,
    retrieveUserPassword
} = require ('./function') 

const saltRounds = 10
const {hash, compare} = bcrypt; 

const app = express() 
const port = process.env.PORT || 8080
const knex = require('knex')(require('./knexfile.js')[process.env.NODE_ENV|| "development"])

app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`)
})


app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'))
app.use(
  cors({
    origin: "*",
    methods: "GET"
  }))

  app.use(express.json())

//test of the server

app.get('/', function(req,res) { 
    res.send('this is working')
})


//gives out the blogs of the user in question

app.get(`/blogs`, async function(req,res) { 
    knex
        .select('*')
        .from('blogs')
        .then(data => res.status(200).json(data))
        .catch(err => 
            res.status(404).json({message: 'data not found'})
            )
})

//gives out the user data


app.get(`/users`, async function(req,res) { 
    knex
        .select('*')
        .from('users')
        .then(data => res.status(200).json(data))
        .catch(err => 
            res.status(404).json({message: 'data not found'})
            )
})

//creates a new user

app.post('/make', (req,res) => { 
    let {body} = req
    let {username, password} = body
    
        console.log(username)
        console.log(password)
    hash(password, saltRounds)
        .then((encryptedPassword) => {
            createNewUser(username,encryptedPassword)
                .then((data)=> res.status(201).json('New User Created'))
                .catch((err) => res.status(501).json(err))
        })
        .catch((err) => res.status(504).json(err))
})

//compares the password of someone trying to login 

app.post('/login', (req,res) => { 
    let {body} = req
    let {username, password} = body
        retrieveUserPassword(username).then((encryptedPassword) => {
            compare(password, encryptedPassword)
            .then((isMatch => {
                if(isMatch) res.status(200).json("Correct Password")
                else res.status(404).json("Incorrect Password")
            }))
            .catch((err) => res.status(405).json(err))
        })
})

module.exports = app
