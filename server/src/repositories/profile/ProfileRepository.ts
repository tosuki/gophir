import { Profile } from "../../model/Profile"
import { User } from "../../model/User"

export interface ProfileRepository {
    save(authorId: number, description: string): Promise<Profile>
    getByAuthorId(authorId: number): Promise<Profile & {
        author: Omit<User, "password"> 
    } | null>
    editProfile(authorId: number, profile: Partial<Omit<Profile, "authorId">>)
}

