import { useState } from "react"
import { Calendar, ChevronDown, Clock3, RefreshCw } from "lucide-react"
import DatePicker from "react-datepicker"

import "./navbar.css"
import "react-datepicker/dist/react-datepicker.css"

export default function Navbar() {

  // ✅ STATE
  const [startDate, setStartDate] = useState(new Date())
  const [openDate, setOpenDate] = useState(false)

  const [period, setPeriod] = useState("Today")
  const [openPeriod, setOpenPeriod] = useState(false)

  // ✅ REFRESH ACTION
  const handleRefresh = () => {
    console.log("Refreshing data...")
    window.location.reload()
  }

  return (
    <header className="navbar">

      {/* LEFT */}
      <div className="navbar-left">
        <div className="logo">IM</div>

        <div>
          <h1 className="project-title">
            Infra Monitor 
          </h1>

          <p className="project-subtitle">
            Overview of infrastructure and application metrics
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="navbar-right">

        {/* DATE DROPDOWN */}
        <div className="dropdown">

          <button
            className="filter-btn"
            onClick={() => setOpenDate(!openDate)}
          >
            <Calendar size={16} />
            <span>{startDate.toDateString()}</span>
            <ChevronDown size={16} />
          </button>

          {openDate && (
            <div className="dropdown-panel">
             <DatePicker
                selected={startDate}
                onChange={(date) => {
                    setStartDate(date)
                    setOpenDate(false)
                }}
                inline
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
            />
            </div>
          )}
        </div>

        {/* PERIOD DROPDOWN */}
        <div className="dropdown">

          <button
            className="filter-btn"
            onClick={() => setOpenPeriod(!openPeriod)}
          >
            <Clock3 size={16} />
            <span>{period}</span>
            <ChevronDown size={16} />
          </button>

          {openPeriod && (
            <div className="dropdown-panel small">
              {["Today", "Last 7 Days", "Last 30 Days"].map((item) => (
                <div
                  key={item}
                  className="dropdown-item"
                  onClick={() => {
                    setPeriod(item)
                    setOpenPeriod(false)
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* REFRESH BUTTON */}
        <button className="refresh-btn" onClick={handleRefresh}>
          <RefreshCw size={18} />
        </button>

      </div>
    </header>
  )
}