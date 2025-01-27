import { ProfileRepository } from "./ProfileRepository"
import { DatabaseProvider } from "../../provider/DatabaseProvider"

import { Profile } from "../../model/Profile"
import { User } from "../../model/User"
import {ProfileError} from "src/library/error/ProfileError"

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
            const columns = await this.queryBuilder.findFirstWithReference<Profile, User>("profile", {
                referenceTable: "users",
                referenceKey: "authorId",
                referenceTo: "id",
                where: {
                    authorId: authorId,
                },
                select: ["profile.*", "users.id", "users.createdAt", "users.id", "users.username"]
            })
            
            return columns ? {
                author: {
                    id: columns.id,
                    username: columns.username,
                    createdAt: columns.createdAt
                },
                authorId: columns.id,
                profileId: columns.profileId,
                description: columns.description,
            } : null
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
