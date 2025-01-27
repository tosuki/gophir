import { ProfileRepository } from "../../repositories/profile/ProfileRepository"
import { UserRepository } from "../../repositories/user/UserRepository"

import { Profile } from "../../model/Profile"

import { ProfileError } from "../../library/error/ProfileError"
import { isDatabaseError } from "../../library/error/DatabaseError"

export class ProfileUsecase {
    private profileRepository: ProfileRepository
    private userRepository: UserRepository

    constructor(
        userRepository: UserRepository,
        profileRepository: ProfileRepository,
    ) {
        this.userRepository = userRepository
        this.profileRepository = profileRepository
    }

    public async setProfile(authorId: number, description: string): Promise<Profile> {
        try {
            const profileSet = await this.profileRepository.editProfile(authorId, { description })
            
            if (!profileSet) {
                throw new ProfileError("invalid_profile", "There is no profile created for that id", profileSet)
            }
            
            return profileSet
        } catch (error: any) {
            throw error
        }
    }

    async createProfile(authorId: number, description: string): Promise<Profile> {
        try {
            const profile = await this.profileRepository.save(authorId, description)
            
            return profile
        } catch (error: any) {
            if (isDatabaseError(error)) {
                switch (error.code) {
                    case "foreign_key_violation":
                        throw new ProfileError("invalid_session", `${authorId} doesn't exist in our database`, error)
                    case "unique_constraint":
                        throw new ProfileError("conflict", `${authorId} already got a profile created in our database`)
                    default:
                        throw error
                }
            }

            throw error
        }
    }

    async getProfile(username: string): Promise<Profile> {
        try {
            const user = await this.userRepository.getByUsername(username)
            
            if (!user) {
                   throw new ProfileError("invalid_username", "That user doesn't exist in our database") 
            }

            const profile = await this.profileRepository.getByAuthorId(user.id)
            
            if (!profile) {
                throw new ProfileError("invalid_profile", "The user doesn't have a profile registered in our database")
            }

            return profile       
        } catch (error: any) {
            throw error
        } 
    }
}
