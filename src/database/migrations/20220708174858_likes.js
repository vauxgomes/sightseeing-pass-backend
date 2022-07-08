exports.up = function (knex) {
  console.log('Migration: LIKES')

  return knex.schema.createTable('likes', (table) => {
    table.increments('id').primary()

    table.boolean('like').notNullable()

    table.integer('location_id').notNullable()
    table.foreign('location_id').references('locations.id').onDelete('CASCADE')

    table.integer('user_id').notNullable()
    table.foreign('user_id').references('users.id').onDelete('CASCADE')

    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now())
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('likes')
}
