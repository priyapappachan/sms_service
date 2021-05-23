let app = require("express")();
let http = require("http").Server(app);
var bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const config = require("./src/config/config");
const routes = require("./src/routes/routes");

var port = 3000;

http.listen(port, function () {
  console.log("listening on port : " + port);
});

const sequelize = new Sequelize(config.db.dbUrl);
sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to database.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
app.use(routes);

