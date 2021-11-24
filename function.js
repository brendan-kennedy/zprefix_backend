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

function createNewBlog (blog_title,blog_text,blog_date, user_id){
return knex("blogs").insert({blog_title: blog_title, blog_text: blog_text, blog_date: blog_date, blog_user_id: user_id})
}

function editBlog (id,blog_title,blog_text,blog_date, user_id){
    return knex("blogs").update({blog_title: blog_title, blog_text: blog_text, blog_date: blog_date, blog_user_id: user_id})
    .where({id})    
}

module.exports = {createNewUser,retrieveUserPassword, createNewBlog, editBlog}