import type { NotificationRepository } from "src/repositories/notification/NotificationRepository";

export class NotificationUsecase {
    private notificationRepository: NotificationRepository

    constructor(notificationRepository: NotificationRepository) {
        this.notificationRepository = notificationRepository        
    }

    notify(targetId: number, title: string, body: string) {
        throw 
    }

    deleteNotification(id: number) {

    }
}