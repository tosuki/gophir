import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    // const hasTable = knex.schema.hasTable("users")

    // if (!hasTable) {
    return knex.schema.createTable("users", (table) => {
            table.increments("id").primary().unique()
            table.string("username").unique().notNullable()
            table.string("password").notNullable()
            table.dateTime("createdAt").notNullable().defaultTo(knex.fn.now())
        })
    // }
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists("users")
}
