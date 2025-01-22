import { useEffect, useState } from "react"
import { Header } from "../../../components/header"

import { useSession } from "../../../hooks/session"
import { getProfile } from "../../../services/profile"
import { toast } from "react-hot-toast"

import { Profile } from "../../../model/profile"

import "./styles.css"

function ProfileDataWindow(properties: {
    title: string,
    data: any
}) {
    return (
        <div className="profile-data-container">
            <div className="profile-data-container-header">
                <h1>{ properties.title  }</h1>
            </div>
            <div className="profile-data-container-body">
                { properties.data }
            </div>
        </div>
    )
}

export function ProfilePage() {
    const { session } = useSession()
    const [profile, _] = useState<Profile | null>(null)
    
    useEffect(() => {
        if (!session.data) {
            return console.log("Waiting for session be loaded")
        }

        getProfile(session.data!.username).then((result) => {
            console.log(result)
        }).catch((error) => {
            console.log("An handled error occurred on fetching profile: ", error)
            toast.error("An unhandled error occured, check the console for more information!")
        })
    }, [])

    return (
        <div className="page-container">
            <Header />
            <div className="profile-page-container">
                <div className="profile-container">
                    <div className="left">
                        <div className="profile-picture-container">
                        </div>
                        <ProfileDataWindow 
                            title="Username"
                            data={ session.data!.username }
                        />
                        <ProfileDataWindow 
                            title="Created at"
                            data={ session.data!.createdAt.toLocaleString()  }
                        />
                    </div>
                    <div className="right">
                        <div className="profile-description-container">
                            <div className="profile-description-container-header">
                                <h1>Description</h1>
                                <button className="edit-button">
                                    Edit
                                </button>
                            </div>
                            <div className="profile-description-container-body">
                                <p>{ profile ? profile.description : "There should be something here, but i don't know what xD" }</p>
                            </div>
                        </div>
                    </div>                    
                </div>
            </div>
        </div>
    )
}
