import { Knex } from "knex"

const configurations: Knex.Config = {
  client: "pg",
  connection: {
    host: "0.0.0.0",
    port: 5432,
    // user: environment.POSTGRES_USER,
    // database: environment.POSTGRES_DATABASE,
    // password: environment.POSTGRES_PASSWORD,
    user: "postgres",
    database: "gophir",
    password: "root"
  },
  migrations: {
    directory: "./migrations",
  },
  seeds: {
    directory: "./seeds"
  }
}

export default configurations
