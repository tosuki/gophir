import { ProfileRepository } from "./ProfileRepository"
import { DatabaseProvider } from "../../provider/DatabaseProvider"

import { Profile } from "../../model/Profile"

export class ProfileRepositoryImpl implements ProfileRepository {
    private queryBuilder: DatabaseProvider
    
    constructor(databaseProvider: DatabaseProvider) {
        this.queryBuilder = databaseProvider
    }

    save(authorId: number, description: string): Promise<Profile> {
        return this.queryBuilder.save("profile", {
            value: { authorId, description }
        })
    }

    getByAuthorId(authorId: number): Promise<Profile | null> {
        return this.queryBuilder.findFirst<Profile>("profile", {
            where: { authorId }
        })
    }

    editProfile(authorId: number, profile: Partial<Omit<Profile, "authorId">>): Promise<any> {
        return this.queryBuilder.edit<Profile>("profile", {
            where: {
                authorId: authorId,
            },
            value: profile
        })
    }
}
