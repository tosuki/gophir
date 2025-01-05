import * as knex from "knex"
import configurations from "../../knexfile"

export function createDatabase(): knex.Knex {
    return knex(configurations)
}
