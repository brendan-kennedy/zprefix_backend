exports.seed = function(knex) { 

    return knex('blogs').del()
        .then(function() { 
            return knex('blogs').insert([
                {blog_title: 'test title', blog_text: 'Here is some random text.', blog_date: '1/1/2022', blog_user_id: '1'}
            ])
        })
}