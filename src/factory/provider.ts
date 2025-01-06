import * as knex from "knex"
import knexConfiguration from "../../knexfile"

import { EncryptProvider, BCryptEncryptProvider } from "../provider/EncryptProvider"
import { PassportEncoder, JWTEncoder } from "../usecase/session/JwtEncoder"
import { DatabaseProvider, KnexPsqlProviderImpl } from "../provider/DatabaseProvider"

import environment from "../env"

export const createDatabaseProvider = (): DatabaseProvider => {
    const queryBuilder = knex(knexConfiguration)

    return new KnexPsqlProviderImpl(queryBuilder)
}

export const createEncryptProvider = (): EncryptProvider => new BCryptEncryptProvider()
export const createPassportEncoder = (): PassportEncoder => {
    return new JWTEncoder(environment.JWT_SECRET, 72*60*60*1000)
}
