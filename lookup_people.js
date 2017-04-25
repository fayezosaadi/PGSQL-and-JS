const pg = require('pg');
const settings = require('./settings');

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

const input = process.argv[2];

client.connect((err) => {
  if (err) {
    return console.error('Connection Error', err);
    }
    client.query('SELECT * FROM famous_people WHERE first_name = $1::text or last_name = $1::text',[input], (err, result) => {
    if (err) {
      return console.error('error running query', err);
    }
  famousPeople(result);
  client.end();
  });
});

var famousPeople = function (result){
  var date = result.rows[0].birthdate.getDate();
  var month = result.rows[0].birthdate.getMonth()+1;
  var year = result.rows[0].birthdate.getFullYear();

  console.log ('Searching ...');
  console.log(`Found ${result.rows.length} person(s) by the name ${input}:`);
  console.log(`- ${result.rows[0].id}: ${result.rows[0].first_name} ${result.rows[0].last_name}, born '${year}-${month}-${date}'`);
}
