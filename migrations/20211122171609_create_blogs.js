  exports.up = function(knex) {
        return knex.schema.createTable('blogs',table => {
            table.increments('id')
            table.string('blog_title')
            table.string('blog_text')
            table.string('blog_date')
            table.integer('blog_user_id')
        })
      };
      
      exports.down = function(knex) {
        return knex.schema.dropTableIfExists("blogs")
      };
