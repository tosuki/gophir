import type { NotificationRepository } from "../../repositories/notification/NotificationRepository"
import type { Notification } from "../../model/Notification"

import { NotificationError } from "../../library/error/NotificationError"

import { isDatabaseError } from "../../library/error/DatabaseError"
import { isAuthError } from "../../library/error/AuthError"

import type { AuthUseCase } from "../session/AuthUseCase"

export class NotificationUsecase {
    private notificationRepository: NotificationRepository
    private authUsecase: AuthUseCase

    constructor(notificationRepository: NotificationRepository, authUsecase: AuthUseCase) {
        this.notificationRepository = notificationRepository        
        this.authUsecase = authUsecase
    }

    async notify(targetId: number, title: string, body: string): Promise<Notification> {
        try {
            const notification = await this.notificationRepository.save(title, body, targetId)

            return notification
        } catch (error: any) {
            if (isDatabaseError(error) && error.code === "foreign_key_violation") {
                throw new NotificationError("invalid_target_id", `The user of id ${targetId} doesn't not exist in our database`, error)
            }

            throw error
        }
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