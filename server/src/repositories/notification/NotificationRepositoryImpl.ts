import { NotificationRepository } from "./NotificationRepository"
import { DatabaseProvider } from "../../provider/DatabaseProvider"
import type { Notification } from "src/model/Notification"

export class KnexPsqlNotificationRepositoryImpl implements NotificationRepository {
    private databaseProvider: DatabaseProvider

    constructor(databaseProvider: DatabaseProvider) {
        this.databaseProvider = databaseProvider
    }

    save(title: string, body: string, target: number): Promise<Notification> {
        throw new Error("Method not implemented.")
    }

    getByTargetId(targetId: number): Promise<Notification[]> {
        throw new Error("Method not implemented.")
    }

    delete(id: number) {
        throw new Error("Method not implemented.")
    }
}
