exports.up = function (knex, Promise) {
  return knex.schema.createTable('movies', function (table) {
    // TABLE COLUMN DEFINITIONS HERE
    table.increments()
    table.string('title', 255).notNullable()
    table.string('director', 255).notNullable().defaultTo('')
    table.integer('year', 4).notNullable().defaultTo(0)
    table.timestamps(true, true)
  })
}
exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('movies')
}