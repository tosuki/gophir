import { NotificationRepository } from "./NotificationRepository"
import { DatabaseProvider } from "../../provider/DatabaseProvider"
import type { Notification } from "src/model/Notification"

export class NotificationRepositoryImpl implements NotificationRepository {
    private databaseProvider: DatabaseProvider

    constructor(databaseProvider: DatabaseProvider) {
        this.databaseProvider = databaseProvider
    }

    save(title: string, body: string, target: number): Promise<Notification> {
        return this.databaseProvider.save<Notification>("notifications", {
            value: { title, body, target }
        })
    }

    getByTargetId(targetId: number): Promise<Notification[]> {
        return this.databaseProvider.findMany<Notification>("notifications", {
            where: {
                target: targetId
            }
        })
    }

    delete(id: number, targetId: number) {
        return this.databaseProvider.delete("notifications", { where: {
            id: id,
            targetId: targetId
        }})
    }
}
