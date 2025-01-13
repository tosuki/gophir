import { createModal, ToggleModalFunction } from "../prototype"
import { Notification } from "../../../../model/notification"

import { NotificationCard } from "./card"

import "./styles.css"

export function NotificationModal({ toggleModal }: {
    toggleModal: ToggleModalFunction
}) {
    return (
        <div className="notification-modal-container">
            <div className="header">
                <h1>Notification</h1>
                <button 
                    onClick={ toggleModal }
                    className="close-button"
                />
            </div>
            <div className="body">
                <NotificationCard 
                    title="Welcome"
                    body="This is the first notification"
                />
                <NotificationCard 
                    title="Alert"
                    body="Something important happened"
                />
                <NotificationCard 
                    title="Reminder"
                    body="Don't forget to check your tasks"
                />
                <NotificationCard 
                    title="Update"
                    body="Your profile has been updated successfully"
                />
                <NotificationCard 
                    title="Welcome"
                    body="This is the first notification"
                />
                <NotificationCard 
                    title="Reminder"
                    body="Don't forget to check your tasks"
                />
                <NotificationCard 
                    title="Reminder"
                    body="Don't forget to check your tasks"
                />
                <NotificationCard 
                    title="Reminder"
                    body="Don't forget to check your tasks"
                />
                {/* <button className="close-button" onClick={ toggleModal }>
                    <TO DO>
                </button> */}
            </div>
        </div>
    )
}

export function createNotificationModal(notifications: Notification[]) {
    return createModal({
        Content: NotificationModal
    })
}