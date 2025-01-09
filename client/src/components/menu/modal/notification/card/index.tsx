import { Notification } from "../../../../../model/notification"

import "./styles.css"

export type NotificationProperties = Omit<Notification, "id" | "target">

export function NotificationCard({ title, body }: NotificationProperties) {
    return (
        <div className="notification-card-container">
            <div className="notification-card-header">
                { title }
            </div>
            <div className="notification-card-body">
                { body }
            </div>
        </div>
    )
}