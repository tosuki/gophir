import User from "../model/User"
import { Result } from "../../../lib/result"
import { Repository } from "./Repository"

export interface UserRepository {
    save(socketId: string): Result<User>
    deleteUser(id: number): Result<number>
    getById(id: number): Result<User>
}

export default class UserRepositoryImpl extends Repository<User> implements UserRepository {
    public save(socketId: string): Result<User> {
        const user: User = {
            id: this.values.length,
            socketId,
        }
    
        this.values.push(user)

        return { data: user }
 
    }

    public deleteUser(id: number): Result<number> {
        const user = this.values[id - 1]

        if (!user) {
            return { error: "invalid_id" }
        }

        this.values.splice(id, 1)

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
