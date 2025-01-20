import type { Knex } from "knex";
import { DatabaseError } from "../library/error/DatabaseError"
import { CriticalError } from "../library/error/CriticalError";

export type DatabaseEditOptions <T> = {
    where?: Partial<T>
    returning?: (keyof T)[]
    value: Partial<T>
}

export type DatabaseSaveOptions <T> = {
    value: Partial<T>,
    returning?: (keyof T)[]
    createIfNull?: boolean
}

export type DatabaseDeleteOptions <T> = {
    where?: Partial<T>
}

export type DatabaseSelectPaginator <T> =
    | { limit: number, offset: number, orderBy?: keyof T }
    | { limit: never, offset: never, orderBy?: keyof T }

export type DatabaseSelectOptions <T> = {
    where?: Partial<T>
    select?: (keyof T)[]
}

export type DatabaseSelectManyWithReference <T, K> = DatabaseSelectPaginator<T> & {
    referenceTable: string,
    referenceKey: (keyof T)
    referenceTo: keyof K
   
    select?: string[]
}

export interface DatabaseProvider {
    disconnect(): Promise<void>
    selectAll<T>(table: string, paginator: DatabaseSelectPaginator<T>, select?: (keyof T)[]): Promise<T[]>
    findFirst<T>(table: string, options: DatabaseSelectOptions<T>): Promise<T | undefined>
    save<T>(table: string, options: DatabaseSaveOptions<T>): Promise<any>
    findMany<T>(table: string, options: DatabaseSelectOptions<T>): Promise<any[]>
    delete<T>(table: string, options: DatabaseDeleteOptions<T>): Promise<void>
    selectWithReference<T, K>(table: string, options: DatabaseSelectManyWithReference<T, K>): Promise<any[]>
    edit<T>(table: string, options: DatabaseEditOptions<T>): Promise<any>
}

export class KnexPsqlProviderImpl implements DatabaseProvider {
    private queryBuilder: Knex

    constructor(queryBuilder: Knex) {
        this.queryBuilder = queryBuilder
    }

    
    async edit<T>(table: string, options: DatabaseEditOptions<T>): Promise<any> {
        try {
            const rows = new Promise((resolve, reject) => {
                this.queryBuilder(table)
                    .returning(options.returning ? options.returning as string[] : "*")
                    .where(options.where)
                    .update(options.value)
                    .on("query-error", (error) => {
                        reject(error)
                    })
                    .then((rows) => resolve(rows))
                    .catch((error) => reject(error))
            })

            return rows[0]
        } catch (error: any) {
            throw error
        }
    }

    selectWithReference<T, K>(table: string, options: DatabaseSelectManyWithReference<T, K>): Promise<any[]> {
        return this.queryBuilder(table)
            .join(options.referenceTable, options.referenceKey as string, "=", options.referenceTo as string)
            .select(options.select ? options.select as string[] : "*")
            .limit(options.limit)
            .offset(options.offset)
    }

    selectAll<T>(table: string, paginator: DatabaseSelectPaginator<T>, select?: (keyof T)[]): Promise<T[]> {
        return (this.queryBuilder(table)
                .limit(paginator.limit)
                .offset(paginator.offset)
                .orderBy(paginator.orderBy)
                .select(select ? select as string[] : "*")) as unknown as Promise<T[]>
                
    }

    async findFirst<T>(table: string, options: DatabaseSelectOptions<T>): Promise<T | undefined> {
        return this.queryBuilder(table)
            .where(options.where)
            .select(options.select ? options.select as string[] : "*")
            .first()
    }

    async save<T>(table: string, options: DatabaseSaveOptions<T>): Promise<any> {
        try {
            const row = await new Promise((resolve, reject) => {
                this.queryBuilder(table)
                    .returning(options.returning ? options.returning as string[] : "*")
                    .insert(options.value)
                    .on("query-error", (error) => {
                        reject(error)
                    })
                    .then((rows) => {
                        resolve(rows)
                    })
                    .catch((error) => {
                        reject(error)
                    })
            })

            return row[0]
        } catch (error: any) {
            if (error.code) {
                switch (error.code) {
                    case "23503":
                        throw new DatabaseError("foreign_key_violation", "Foreign key violation", error)
                    case "23505":
                    throw new DatabaseError("unique_constraint", "Unique constraint violation", error.cause)
                    case "22004":
                        throw new DatabaseError("null_value", "null value not allowed", error)
                }
            }
            
            throw new CriticalError("database_error", "Unhandled database error", error)
        }
    }

    async findMany<T>(table: string, options: DatabaseSelectOptions<T>): Promise<any[]> {
        return this.queryBuilder(table)
            .select(options.select ? options.select as string[] : "*")
            .where(options.where!)
    }

    delete<T>(table: string, options: DatabaseDeleteOptions<T>): Promise<void> {
        return this.queryBuilder(table)
            .where(options.where)
            .delete()
    }

    disconnect(): Promise<void> {
        return this.queryBuilder.destroy()
    }
}
