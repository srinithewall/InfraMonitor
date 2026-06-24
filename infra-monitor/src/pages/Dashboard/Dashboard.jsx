import React from "react"
import { Activity, Database, Users, Clock } from "lucide-react"
import "./dashboard.css"

const Dashboard = () => {
  return (
    <div className="dashboard-container">

      <div className="card">
        <div className="card-header">
          <Activity size={18} />
          <h3>Total Requests</h3>
        </div>
        <p>0</p>
      </div>

      <div className="card">
        <div className="card-header">
          <Database size={18} />
          <h3>DB Queries</h3>
        </div>
        <p>0</p>
      </div>

      <div className="card">
        <div className="card-header">
          <Users size={18} />
          <h3>Active Connections</h3>
        </div>
        <p>0</p>
      </div>

      <div className="card">
        <div className="card-header">
          <Clock size={18} />
          <h3>Slow Queries</h3>
        </div>
        <p>0</p>
      </div>

    </div>
  )
}

export default Dashboard