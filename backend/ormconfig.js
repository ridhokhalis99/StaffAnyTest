require("dotenv").config();

// We can setup multiple DB connections here
module.exports = [
  {
    name: "default",
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || "hapi-boilerplate",
    entities:
      process.env.NODE_ENV === "production"
        ? ["dist/src/database/default/entity/*.js"]
        : ["src/database/default/entity/*.ts"],
    synchronize: true,
    logging: false,
    migrations:
      process.env.NODE_ENV === "production"
        ? ["dist/src/database/default/migration/**/*.js"]
        : ["src/database/default/migration/**/*.ts"],
    cli: {
      migrationsDir:
        process.env.NODE_ENV === "production"
          ? "dist/src/database/default/migration"
          : "src/database/default/migration",
    },
  },
];
