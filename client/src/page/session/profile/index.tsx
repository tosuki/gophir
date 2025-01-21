import { Header } from "../../../components/header"

import "./styles.css"

function ProfileDataWindow(properties: {
    title: string,
    data: string
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
                            data="test"
                        />
                        <ProfileDataWindow 
                            title="Created at"
                            data={ new Date().toISOString() }
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
                                <p>The description should be here you know?</p>
                            </div>
                        </div>
                    </div>                    
                </div>
            </div>
        </div>
    )
}
