import { ProfileRepository } from "./ProfileRepository"
import { DatabaseProvider } from "../../provider/DatabaseProvider"

import { Profile } from "../../model/Profile"

export class KnexPostgresRepositoryImpl implements ProfileRepository {
    private queryBuilder: DatabaseProvider
    
    constructor(databaseProvider: DatabaseProvider) {
        this.queryBuilder = databaseProvider
    }

    async save(authorId: number, description: string): Promise<Profile> {
        throw new Error("TO-DO")
    }

    async getByAuthorId(authorId: number): Promise<Profile | null> {
        throw new Error("TO-DO")
    }

    async editProfile(authorId: number, profile: Partial<Omit<Profile, "authorId">>) {
        throw new Error("TO-DO")
    }
}
