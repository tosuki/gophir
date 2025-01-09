import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("notifications", (table) => {
        table.increments("id").primary()
        table.integer("target").notNullable()
        table.string("title").notNullable()
        table.string("body").notNullable()
        table.datetime("createdAt").defaultTo(knex.fn.now())
        table.foreign("target").references("id").inTable("users")
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("notifications")
}

