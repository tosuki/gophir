import { useEffect } from "react"
import { useNotification } from "../../../../hooks/notification"
import { toast } from "react-hot-toast"

import { getNotifications } from "../../../../services/notification"
import { createModal, ToggleModalFunction } from "../prototype"

import { NotificationCard } from "./card"

import "./styles.css"

export type NotificationModalProperties = {
    passport: string
}

export function NotificationModal({ toggleModal, data }: {
    toggleModal: ToggleModalFunction,
    data?: NotificationModalProperties
}) {
    const notificationContext = useNotification()

    useEffect(() => {
        getNotifications(data!.passport).then((result) => {
            if (result.error) {
                console.log(result.error)
                return toast.error(result.error.message)
            }

            notificationContext.dispatchers.setNotifications(result.data)
        }).catch((error) => {
            console.log(error)
            toast.error("Unhandled error, check the console for more information")
        })
    }, [])

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
                { notificationContext.states.notifications.map((notification) => {
                    return (
                        <NotificationCard 
                            title={ notification.title }
                            body={ notification.body }
                        />
                    )
                })}
            </div>
        </div>
    )
}

export function createNotificationModal(passport: string) {
    return createModal<NotificationModalProperties>({
        Content: NotificationModal,
        data: {
            passport
        }
    })
}