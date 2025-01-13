import {
    createContext,
    useContext,
    useState,
    type ReactNode
} from "react"

import { Notification } from "../model/notification"

export type NotificationContextProperties = {
    states: {
        notifications: Notification[]
    }
    dispatchers: {
        addNotification: (notification: Notification) => unknown
        deleteNotification: (id: number) => unknown
    }
}

const Context = createContext<NotificationContextProperties>(
    {} as NotificationContextProperties
)

/**
 * Stack = last in, first out (lifo)
 * Queue = (first in, first out) (FIFO)
 * Array = whatever, fast read, limited insert
 * LinkedList = fast insert, slow read
 */

export function NotificationProvider({ children }: { children: ReactNode }) {
    const [notifications, setNotifications] = useState<Notification[]>([])

    const addNotification = (notification: Notification) => {
        setNotifications((previousNotificationsState) => {
            previousNotificationsState.push(notification)

            return previousNotificationsState
        })
    }

    const deleteNotification = (id: number) => {
        const notificationIndex = notifications.findIndex((notification) => {
            return notification.id === id
        })

        if (notificationIndex >= 0) {
            return setNotifications((previousNotificationsState) => {
                previousNotificationsState.splice(notificationIndex, 1)

                return previousNotificationsState
            })
        }
    }

    return (
        <Context.Provider value={{
            states: {
                notifications,
            },
            dispatchers: {
                addNotification,
                deleteNotification
            }
        }}>
            { children }
        </Context.Provider>
    )
}

export const useNotification = () => useContext(Context)
