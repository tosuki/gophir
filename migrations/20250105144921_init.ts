import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    const hasTable = knex.schema.hasTable("users")

    if (!hasTable) {
        knex.schema.createTable("users", (table) => {
            table.increments()
            table.string("username").unique().notNullable()
            table.string("password").notNullable()
            table.dateTime("createdAt").notNullable()
        })
    }
}


export async function down(knex: Knex): Promise<void> {
    knex.schema.dropTableIfExists("users")
}
