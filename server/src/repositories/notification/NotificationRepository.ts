import { Notification } from "../../model/Notification"

export interface NotificationRepository {
    save(title: string, body: string, target: number): Promise<Notification>
    getByTargetId(targetId: number): Promise<Notification[]>
    delete(id: number)
}
