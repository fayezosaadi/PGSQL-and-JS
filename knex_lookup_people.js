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

const input = process.argv[2];

knex('famous_people').where('first_name', input).orWhere('last_name', input).asCallback((err, rows) => {
  if(err){
    console.log(err)
  }
famousPeople(rows)
});
knex.destroy(()=> {
  console.log('closed connection')
});


var famousPeople = function (rows){
  var date = rows[0].birthdate.getDate();
  var month = rows[0].birthdate.getMonth()+1;
  var year = rows[0].birthdate.getFullYear();
  console.log ('Searching ...');
  console.log(`Found ${rows.length} person(s) by the name ${input}:`);
  console.log(`- ${rows[0].id}: ${rows[0].first_name} ${rows[0].last_name}, born '${year}-${month}-${date}'`);
}