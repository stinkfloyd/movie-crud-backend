exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('movies').del()
    .then(function () {
      // Inserts seed entries
      return knex('movies').insert([{
            id: 1,
            title: 'The Shawshank Redemption',
            director: 'Frank Darabont',
            year: 1994,
            rating: 5,
            poster_url: 'http://placekitten.com/g/200/300'
          },
          {
            id: 2,
            title: 'Pulp Fiction',
            director: 'Quentin Tarantino',
            year: 1994,
            rating: 5,
            poster_url: 'http://placekitten.com/g/200/300'
          },
          {
            id: 3,
            title: 'How to Train Your Dragon',
            director: 'Dean DeBlois',
            year: 2010,
            rating: 5,
            poster_url: 'http://placekitten.com/g/200/300'
          },
          {
            id: 4,
            title: 'Emoji Movie',
            director: 'Tony Leondis',
            year: 2017,
            rating: 3,
            poster_url: 'http://placekitten.com/g/200/300'
          },
          {
            id: 5,
            title: '50 Shades of Grey',
            director: 'Victor Rasuk',
            year: 2015,
            rating: 1,
            poster_url: 'http://placekitten.com/g/200/300'
          }
        ])
        .then(function () {
          // Moves id column (PK) auto-incrementer to correct value after inserts
          return knex.raw("SELECT setval('movies_id_seq', (SELECT MAX(id) FROM movies))")
        })
    })
}