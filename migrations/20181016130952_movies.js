exports.up = function (knex, Promise) {
  return knex.schema.createTable('movies', function (table) {
    // TABLE COLUMN DEFINITIONS HERE
    table.increments()
    table.string('title', 255).notNullable().defaultTo('')
    table.string('director', 255).notNullable().defaultTo('')
    table.integer('year', 4).notNullable().defaultTo(0)
    table.integer('rating', 1).notNullable().defaultTo(3)
    table.string('poster_url').notNullable().defaultTo('http://placekitten.com/g/200/300')
    table.timestamps(true, true)
  })
}
exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('movies')
}