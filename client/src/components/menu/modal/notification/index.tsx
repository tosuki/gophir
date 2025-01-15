import { useEffect } from "react"
import { useNotification } from "../../../../hooks/notification"
import { toast } from "react-hot-toast"

import { getNotifications } from "../../../../services/notification"
import { createModal, ToggleModalFunction } from "../prototype"

import { NotificationCard } from "./card"

import "./styles.css"
import { useSession } from "../../../../hooks/session"

export function NotificationModal({ toggleModal, data }: {
    toggleModal: ToggleModalFunction,
}) {
    const notificationContext = useNotification()
    const { session, setPassport } = useSession()

    useEffect(() => {
        getNotifications(session.passport).then((result) => {
            if (result.error) {
                if (result.error.code === "invalid_token" || result.error.code === "expired_token") {
                    setPassport("")
                    toast.error("You session has expired, please authenticate again to continue using our platform!")
                } else {
                    toast.error(result.error.message)
                }

                return console.log(result.error)
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

export function createNotificationModal() {
    return createModal({
        Content: NotificationModal,
    })
}