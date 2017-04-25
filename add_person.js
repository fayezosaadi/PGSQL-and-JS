const settings = require('./settings');

var knex = require('knex')({
  client: 'pg',
  connection: {
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
  }
});

const firstName = process.argv[2];
const lastName = process.argv[3];
const dateOfBirth = process.argv[4];




knex('famous_people').insert({first_name: firstName, last_name: lastName, birthdate: dateOfBirth}) .asCallback((err, rows) => {
  if(err){
    console.log(err)
  }
  console.log('data successfully inserted.')
});

knex.destroy(()=> {
  console.log('closed connection')
});




