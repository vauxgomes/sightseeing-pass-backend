exports.up = function (knex) {
  console.log('Migration: LOCATIONS')

  return knex.schema.createTable('locations', (table) => {
    table.increments('id').primary()

    table.string('title', 255).notNullable()
    table.text('description').notNullable()
    table.string('address', 255).notNullable()

    table.decimal('latitude')
    table.decimal('longitude')

    table.integer('num_likes').notNullable().defaultTo(0)
    table.integer('num_comments').notNullable().defaultTo(0)

    table.integer('user_id').notNullable()
    table.foreign('user_id').references('users.id').onDelete('CASCADE')

    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now())
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('locations')
}
