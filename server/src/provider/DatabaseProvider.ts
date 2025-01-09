import type { Knex } from "knex";
import { DatabaseError } from "../library/error/DatabaseError"
import { CriticalError } from "../library/error/CriticalError";

export interface DatabaseProvider {
    disconnect(): Promise<void>
    getAll<T>(table: string, limit: number, offset: number, select?: (keyof T)[]): Promise<T[]>
    findFirst<T>(table: string, where: Partial<T>, returning?: (keyof T)[]): Promise<T | undefined>
    save<T>(table: string, value: any, returning?: (keyof T)[]): Promise<any>
    findMany<T>(table: string, where: Partial<T>, select?: (keyof T)[]): Promise<any[]>
    delete<T>(table: string, where: Partial<T>): Promise<void>
}

export class KnexPsqlProviderImpl implements DatabaseProvider {
    private queryBuilder: Knex

    constructor(queryBuilder: Knex) {
        this.queryBuilder = queryBuilder
    }

    getAll<T>(table: string, limit: number, offset: number, select?: (keyof T)[]): Promise<T[]> {
        return (this.queryBuilder(table)
                .limit(limit)
                .offset(offset)
                .select(select ? select as string[] : "*")) as unknown as Promise<T[]>
                
    }

    async findFirst<T>(table: string, where: Partial<T>, returning?: (keyof T)[]): Promise<T | undefined> {
        return this.queryBuilder(table)
            .where(where)
            .select(returning as string[] || "*")
            .first()
    }

    async save<T>(table: string, value: any, returning: (keyof T)[] = []): Promise<any> {
        try {
            const row = await new Promise((resolve, reject) => {
                this.queryBuilder(table)
                    .returning(returning.length ? returning as string[] : "*")
                    .insert(value)
                    .on("query-error", (error) => {
                        reject(error)
                    })
                    .then((row) => {
                        resolve(row)
                    })
                    .catch((error) => {
                        reject(error)
                    })
            })

            return row
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

    async findMany<T>(table: string, where: Partial<T>, select: (keyof T)[]): Promise<any[]> {
        return this.queryBuilder(table)
            .select(select ? select : "*")
            .where(where)
    }

    delete<T>(table: string, where: Partial<T>): Promise<void> {
        return this.queryBuilder(table)
            .where(where)
            .delete() 
    }

    disconnect(): Promise<void> {
        return this.queryBuilder.destroy()
    }
}