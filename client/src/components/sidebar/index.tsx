import { useNavigate } from "react-router"

import "./styles.css"

export function SidebarComponent() {
  const navigate = useNavigate()

  return (
    <div className="sidebar-container">
      <div className="bottom-container">
        <div className="session-container">
          <div
            className="photo-card"
            onClick={() => navigate("/profile")}
          >
            
          </div>
          <div className="info-card">
            tosuki<span className="id">#001</span>
          </div>
        </div>
      </div>
    </div>
  )
}
