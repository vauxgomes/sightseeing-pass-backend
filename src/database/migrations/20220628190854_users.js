exports.up = function (knex) {
  console.log('Migration: USERS')

  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary()

    table.string('name', 255).notNullable()
    table.string('email', 50).unique().notNullable()
    table.string('password', 100).notNullable()
    table.integer('access').notNullable().defaultTo(0)

    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now())
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('users')
}
