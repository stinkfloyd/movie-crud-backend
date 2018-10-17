// Define DB connections for different environments
module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/movie-crud'
  },
  test: {},
  production: {
    client: 'pg',
    connection: `postgres://akghebbwcobgpz:077bf61735f1f27a367a410d667bd6b7cd4ee6fd39a92a8c3979c9972f8a1676@ec2-54-221-225-11.compute-1.amazonaws.com:5432/dfp63bf08rmced`
  }
}