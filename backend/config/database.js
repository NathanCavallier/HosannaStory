const { Sequelize } = require("sequelize");

// Récupérer les informations de connexion à la base de données
const config = require("./config.json")[process.env.NODE_ENV || "development"];

// Création d'une instance Sequelize avec SQLite comme base de données
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    dialectOptions: config.dialectOptions,
  }
);

// Tester la connexion
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connection to SQLite has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

testConnection();

module.exports = sequelize;
