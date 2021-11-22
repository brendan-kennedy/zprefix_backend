const knex = require('knex')(require('./knexfile.js')[process.env.NODE_ENV|| "development"])

function createNewUser(username,encryptedPassword) {
return knex("users").insert({username: username, password: encryptedPassword})
} 

function retrieveUserPassword(username){
    return knex('users')
        .where({username})
        .select('password')
        .then((data) => data[0].password)
    }


module.exports = {createNewUser,retrieveUserPassword}