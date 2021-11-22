  exports.up = function(knex) {
        return knex.schema.createTable('blogs',table => {
            table.increments('id')
            table.string('title')
            table.string('password')
        })
      };
      
      exports.down = function(knex) {
        return knex.schema.dropTableIfExists("blogs")
      };
