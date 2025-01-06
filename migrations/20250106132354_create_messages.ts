import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("messages", (table) => {
        table.increments("id").primary()
        table.string("content").notNullable()
        table.dateTime("createdAt").notNullable()
        table.integer("authorId").notNullable()

        table.foreign("authorId").references("id").inTable("users")
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("messages")
}
