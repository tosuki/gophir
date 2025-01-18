import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("profile", (table) => {
        table.increments("profileId").primary()
        table.string("description").defaultTo("You should put a description here")
        table.integer("authorId").notNullable()
        table.foreign("authorId").references("id").inTable("users")
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("profile")
}

