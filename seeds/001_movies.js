exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('movies').del()
    .then(function () {
      // Inserts seed entries
      return knex('movies').insert([{
            id: 1,
            title: 'The Shawshank Redemption',
            director: 'Frank Darabont',
            year: 1994
          },
          {
            id: 2,
            title: 'Pulp Fiction',
            director: 'Quentin Tarantino',
            year: 1994
          },
          {
            id: 3,
            title: 'How to Train Your Dragon',
            director: 'Dean DeBlois',
            year: 2010
          }
        ])
        .then(function () {
          // Moves id column (PK) auto-incrementer to correct value after inserts
          return knex.raw("SELECT setval('movies_id_seq', (SELECT MAX(id) FROM movies))")
        })
    })
}