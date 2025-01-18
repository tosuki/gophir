import { ProfileRepository } from "./ProfileRepository"
import { DatabaseProvider } from "../../provider/DatabaseProvider"

import { Profile } from "../../model/Profile"

export class KnexPostgresRepositoryImpl implements ProfileRepository {
    private queryBuilder: DatabaseProvider
    
    constructor(databaseProvider: DatabaseProvider) {
        this.queryBuilder = databaseProvider
    }

    save(authorId: number, description: string): Promise<Profile> {
        return this.queryBuilder.save<Profile>("profile", {
            authorId,
            description
        })
    }

    getByAuthorId(authorId: number): Promise<Profile | null> {
        return this.queryBuilder.findFirst<Profile>("profile", {
            authorId
        })
    }

    async editProfile(authorId: number, profile: Partial<Omit<Profile, "authorId">>) {
        throw new Error("TO-DO")
    }
}
