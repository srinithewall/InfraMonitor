import { Calendar, ChevronDown, Clock3, Menu, RefreshCw } from "lucide-react";

import "./navbar.css"

export default function Navbar() {
  return (
    <header className="navbar">
      {/* Left Section */}
      <div className="navbar-left">
        <button className="icon-btn">
          LOGO
        </button>

        <div>
          <h1 className="project-title">
            Infra Monitor Project - A
          </h1>

          <p className="project-subtitle">
            Real-time overview of infrastructure and application metrics
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="navbar-right">
        {/* Date Selector */}
        <button className="filter-btn">
          <Calendar size={16} />

          <span>24 Jun 2026</span>

          <ChevronDown size={16} />
        </button>

        {/* Period Selector */}
        <button className="filter-btn">
          <Clock3 size={16} />

          <span>Today</span>

          <ChevronDown size={16} />
        </button>

        {/* Refresh */}
        <button className="refresh-btn">
          <RefreshCw size={18} />
        </button>
      </div>
    </header>
  );
}