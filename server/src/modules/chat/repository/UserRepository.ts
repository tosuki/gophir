import User from "../model/User"
import { Result } from "../../../lib/result"
import { Repository } from "./Repository"
import { logger } from "../../../logger"
import { inspect } from "util"

export interface UserRepository {
    save(socketId: string): Result<User>
    deleteUser(id: number): Result<number>
    getById(id: number): Result<User>
}

export default class UserRepositoryImpl extends Repository<User> implements UserRepository {
    public save(socketId: string): Result<User> {
        const previousUser = this.getLast()
        
        const user: User = {
            id: previousUser ? previousUser.id + 1 : 0,
            socketId,
        }
        
        this.values.push(user)
        logger.debug(`Length of the array is: ${this.values.length} and the array is ${inspect(this.values)}`)

        return { data: user }
 
    }

    public deleteUser(id: number): Result<number> {
        const index = this.getIndex(id, (user) => user.id)
        const user = this.values[index]
        
        if (!user) {
            return { error: "invalid_id" }
        }

        this.values.splice(index, 1)

        return { data: id }
    }

    public getById(id: number): Result<User> {
        const index = this.getIndex(id, (user) => user.id)

        if (index === -1) {
            return { error : "not_found" }
        }
        
        return { data: this.values[index] }
    }
}
