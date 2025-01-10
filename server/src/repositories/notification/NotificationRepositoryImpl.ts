import { NotificationRepository } from "./NotificationRepository"
import { DatabaseProvider } from "../../provider/DatabaseProvider"
import type { Notification } from "src/model/Notification"

import { isDatabaseError } from "../../library/error/DatabaseError"
import { number } from "zod"

export class KnexPsqlNotificationRepositoryImpl implements NotificationRepository {
    private databaseProvider: DatabaseProvider

    constructor(databaseProvider: DatabaseProvider) {
        this.databaseProvider = databaseProvider
    }

    save(title: string, body: string, target: number): Promise<Notification> {
        return this.databaseProvider.save<Notification>("notifications", {
            title,
            body,
            target
        })
    }

    getByTargetId(targetId: number): Promise<Notification[]> {
        return this.databaseProvider.findMany<Notification>("notifications", {
            target: targetId
        })
    }

    delete(id: number, targetId: number) {
        return this.databaseProvider.delete("notifications", {
            id: id,
            targetId: number
        })
    }
}
