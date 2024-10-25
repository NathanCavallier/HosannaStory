const { Sequelize: sequelize } = require("sequelize");
const msRestNodeAuth = require("ms-rest-nodeauth");
require("dotenv").config();
const config = require("./config/config.json")[
  process.env.NODE_ENV || "development"
];

async function getAccessToken() {
  try {
    const credentials = await msRestNodeAuth.loginWithUsernamePassword(
      process.env.AZURE_USERNAME,
      process.env.AZURE_PASSWORD,
      {
        clientId: process.env.AZURE_CLIENT_ID,
        tenantId: process.env.AZURE_TENANT_ID,
      }
    );
    const tokenResponse = await credentials.getToken();
    return tokenResponse.accessToken;
  } catch (error) {
    console.error("Error obtaining access token:", error);
    throw error;
  }
}

async function initializeSequelize() {
  const accessToken = await getAccessToken();

  const sequelize = new sequelize(
    config.database,
    config.username,
    config.password,
    {
      host: config.host,
      dialect: config.dialect,
      dialectOptions: {
        options: {
          encrypt: true,
          enableArithAbort: true,
          accessToken: accessToken,
        },
      },
    }
  );

  // Tester la connexion
  async function testConnection() {
    try {
      await sequelize.authenticate();
      console.log("Connection to Azure SQL has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }

  testConnection();
}

initializeSequelize();

module.exports = sequelize;
