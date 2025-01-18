import { Profile } from "../../model/Profile"

export interface ProfileRepository {
    save(authorId: number, description: string): Promise<Profile>
    getByAuthorId(authorId: number): Promise<Profile | null>
    editProfile(authorId: number, profile: Partial<Omit<Profile, "authorId">>)
}

