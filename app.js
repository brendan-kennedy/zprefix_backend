const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bcrypt = require('bcrypt')
const { 
    createNewUser,
    retrieveUserPassword,
    createNewBlog,
    editBlog
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
    methods: ["GET", 'PATCH',' POST','DELETE']
  }))

  app.use(express.json())

//test of the server

app.get('/', function(req,res) { 
    res.send('this is working')
})


//displays all blogs in database

app.get(`/blogs`, async function(req,res) { 
    knex
        .select('*')
        .from('blogs')
        .then(data => res.status(200).json(data))
        .catch(err => 
            res.status(404).json({message: 'data not found'})
            )
})

//displays one blog at a time

app.get(`/blogs/:id`, async function(req,res) { 
    let {id} = req.params
    knex
        .select('*')
        .from('blogs')
        .where('id',id)
        .then(data => res.status(200).json(data))
        .catch(err => 
            res.status(404).json({message: 'data not found'})
            )
})

//makes a new blog post for a specific user

app.post('/blogs/new', (req,res) => { 
    let {body} = req
    let {blog_title, blog_text,blog_date,blog_user_id} = body
        createNewBlog(blog_title, blog_text,blog_date, blog_user_id)

            .then((data) => res.status(200).json('New Blog Created'))
            .catch((err) => res.status(501).json(err))
    
        .catch((err) => res.status(504).json(err))
    })

//edits a current blog    
app.patch('/blogs/:id', (req,res) => { 
    let {id} = req.params
    let {body} = req
    let {blog_title, blog_text,blog_date,blog_user_id} = body
        editBlog(id,blog_title, blog_text,blog_date, blog_user_id)
            .then((data) => res.status(200).json('blog edited'))
            .catch((err) => res.status(501).json(err))
    
        .catch((err) => res.status(504).json(err))
    })

    //delete blog post

    app.delete(`/blogs/:id`, function(req,res) { 
        let {id} = req.params
        knex
            .delete('*')
            .from('blogs')
            .where('id',id)
            .then(data => res.status(200).json('blog deleted'))
            .catch(err => 
                res.status(404).json({message: 'blog not found'})
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

app.get(`/users/:id/blogs`, async function(req,res) { 
    const {id} = req.params
    console.log(id)
    knex
        .select('*')
        .from('blogs')
        .where('blog_user_id',id)
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

app.post('/login/:username', (req,res) => { 
    let {body} = req
    let {username, password} = body
        retrieveUserPassword(username).then((encryptedPassword) => {
            compare(password, encryptedPassword)
            .then((isMatch => {
                if(isMatch) res.status(200).json("Correct Password")
                else res.status(504).json("Incorrect Password")
            }))
            .catch((err) => res.status(505).json(err))
        })
})

app.get('/login/:username', (req,res) => { 
    const {username} = req.params
    
    knex
        .select('*')
        .from('users')
        .where('username',username)
        .then(data => res.status(200).json(data))
        .catch(err => 
            res.status(404).json({message: 'data not found'})
            )
})

app.get('/users/:id', (req,res) => { 
    const {id} = req.params
    
    knex
        .select('*')
        .from('users')
        .where('id',id)
        .then(data => res.status(200).json(data))
        .catch(err => 
            res.status(404).json({message: 'data not found'})
            )
})

module.exports = app
