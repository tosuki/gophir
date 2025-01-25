import { ProfileRepository } from "./ProfileRepository"
import { DatabaseProvider } from "../../provider/DatabaseProvider"

import { Profile } from "../../model/Profile"
import { User } from "../../model/User"

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

    async getByAuthorId(authorId: number): Promise<Profile | null> {
        try {
            const { createdAt, username, id, ...profile  } = await this.queryBuilder.findFirstWithReference<Profile, User>("profile", {
                referenceTable: "users",
                referenceKey: "authorId",
                referenceTo: "id",
                where: {
                    authorId: authorId,
                },
                select: ["profile.*", "users.id", "users.createdAt", "users.id", "users.username"]
            })

            return {
                author: {
                    id,
                    username,
                    createdAt
                },
                ...profile,
            }
        } catch (error: any) {
            throw error
        }
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
