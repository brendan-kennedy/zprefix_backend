const knex = require ('knex')

function createNewUser(username,encryptedPassword) {
return knex("users").insert({username,encryptedPassword})
} 

function retrieveUserPassword(username){
    return knex('users')
        .where({username})
        .select('encryptedPassword')
        .then((data) => data[0].encryptedPassword)
    }


module.exports = {createNewUser,retrieveUserPassword}