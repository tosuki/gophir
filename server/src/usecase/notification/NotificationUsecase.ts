import type { NotificationRepository } from "../../repositories/notification/NotificationRepository"
import type { Notification } from "../../model/Notification"

import { NotificationError } from "../../library/error/NotificationError"

import { isDatabaseError } from "../../library/error/DatabaseError"
import { logger } from "../../library/logger"

import type { AuthUseCase } from "../session/AuthUseCase"
import { EventEmitter } from "events"

export class NotificationUsecase {
    private notificationRepository: NotificationRepository
    private authUsecase: AuthUseCase
    private eventEmitter: EventEmitter

    constructor(notificationRepository: NotificationRepository, authUsecase: AuthUseCase) {
        this.notificationRepository = notificationRepository        
        this.authUsecase = authUsecase
        this.eventEmitter = new EventEmitter()
    }

    async notify(targetId: number, title: string, body: string): Promise<Notification> {
        try {
            const notification = await this.notificationRepository.save(title, body, targetId)

            this.eventEmitter.emit("notification", notification)
            return notification
        } catch (error: any) {
            if (isDatabaseError(error) && error.code === "foreign_key_violation") {
                throw new NotificationError("invalid_target_id", `The user of id ${targetId} doesn't not exist in our database`, error)
            }

            throw error
        }
    }

    getNotifications(targetId: number): Promise<Notification[]> {
        return this.notificationRepository.getByTargetId(targetId)
    }

    onNotification(callback: (notification: Notification) => unknown) {
        this.eventEmitter.on("notification", callback)
    }

    async deleteNotification(passport: string, notificationId: number) {
        try {
            const profile = await this.authUsecase.getProfile(passport)
            
            await this.notificationRepository.delete(notificationId, profile.id)
        } catch (error: any) {
            throw error
        }
    }
}