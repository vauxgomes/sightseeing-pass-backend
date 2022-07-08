exports.up = function (knex) {
  console.log('Migration: CHECKINS')

  return knex.schema.createTable('checkins', (table) => {
    table.increments('id').primary()

    table.integer('location_id').notNullable()
    table.foreign('location_id').references('locations.id').onDelete('CASCADE')

    table.integer('user_id').notNullable()
    table.foreign('user_id').references('users.id').onDelete('CASCADE')

    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now())
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('checkins')
}
