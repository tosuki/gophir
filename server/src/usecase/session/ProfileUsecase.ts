import { ProfileRepository } from "../../repositories/profile/ProfileRepository"
import { UserRepository } from "../../repositories/user/UserRepository"
import { PassportEncoder } from "./JwtEncoder"

import { Session } from "../../model/Session"
import { Profile } from "../../model/Profile"

export class ProfileUsecase {
    private profileRepository: ProfileRepository
    private userRepository: UserRepository
    private passportEncoder: PassportEncoder

    constructor(
        userRepository: UserRepository,
        profileRepository: ProfileRepository,
        passportEncoder: PassportEncoder,
    ) {
        this.userRepository = userRepository
        this.profileRepository = profileRepository
        this.passportEncoder = passportEncoder
    }

    getProfile(passport: string): Promise<Profile> {
        throw new Error("TO-DO")
    }
}
