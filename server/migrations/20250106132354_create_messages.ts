import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("messages", (table) => {
        table.increments("messageId").primary()
        table.string("content").notNullable()
        table.dateTime("createdAt").notNullable().defaultTo(knex.fn.now())
        table.integer("authorId").notNullable()

        table.foreign("authorId").references("id").inTable("users")
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("messages")
}
