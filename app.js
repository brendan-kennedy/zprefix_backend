const express = require('express')
const morgan = require('morgan')
const cors = require('cors')


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

app.get('/', function(req,res) { 
    res.send('this is working')
})

app.get(`/blogs`, async function(req,res) { 
    knex
        .select('*')
        .from('blogs')
        .then(data => res.status(200).json(data))
        .catch(err => 
            res.status(404).json({message: 'data not found'})
            )
})



module.exports = app
