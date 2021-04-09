// In this file you can configure migrate-mongo

const config = {
  mongodb: {
    url: "mongodb://localhost:27017",
    databaseName: "bank-account",
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  },
  migrationsDir: "migrations",
  changelogCollectionName: "changelog",
  migrationFileExtension: ".js"
};

// Return the config as a promise
module.exports = config;