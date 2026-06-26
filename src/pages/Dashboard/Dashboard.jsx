import React from "react";
import { useDashboard } from "../../hooks/useDashboard";

import {
  Server,
  Database,
  Users,
  AlertTriangle,
  TrendingUp,
  Activity,
  Bell
} from "lucide-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import "./dashboard.css";

export default function Dashboard() {

  // ✅ API hook
  const { data, isLoading, isError } = useDashboard();

  // ✅ States
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;
  if (!data) return <div>No data</div>;

  // ✅ Dynamic data
  const metrics = [
    [Server, "Total Requests", data?.metrics?.totalRequests, ""],
    [Database, "DB Queries", data?.metrics?.dbQueries, ""],
    [Users, "Active Connections", data?.metrics?.activeConnections, ""],
    [AlertTriangle, "Slow Queries", data?.metrics?.slowQueries, ""]
  ];

  const health = Object.entries(data?.databaseHealth || {});

  const endpoints = data?.topEndpoints || [];

  const growth = [
    ["New Users", data?.growth?.newUsers],
    ["New Posts", data?.growth?.newPosts],
    ["New Listings", data?.growth?.newListings],
    ["New Services", data?.growth?.newServices]
  ];

  const resources = [
    ["CPU", data?.resources?.cpu + "%"],
    ["Memory", data?.resources?.memory + "%"],
    ["Disk", data?.resources?.disk + "%"]
  ];

  const queryData = data?.trend?.map(item => ({
    day: item.date,
    value: item.queries
  })) || [];

  return (
    <div className="dashboard">

      {/* ✅ TOP CARDS */}
      <div className="top-grid">
        {
          metrics.map(([Icon, title, value, trend]) => (
            <Card
              key={title}
              icon={<Icon />}
              title={title}
              value={value}
              trend={trend}
            />
          ))
        }
      </div>

      {/* ✅ MAIN GRID */}
      <div className="main-grid">

        {/* ✅ Database Health */}
        <Box title="Database Health" icon={<Database />}>
          {
            health.map(([key, value]) => (
              <Row key={key} text={key} value={value} />
            ))
          }
        </Box>

        {/* ✅ Chart */}
        <Box title="DB Queries Trend" icon={<Activity />}>
          <div className="chart">
            <ResponsiveContainer>
              <LineChart data={queryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line dataKey="value" stroke="#8b5cf6" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Box>

        {/* ✅ Endpoints */}
        <Box title="Top Endpoints" icon={<TrendingUp />}>
          {
            endpoints.map((item, index) => (
              <Progress
                key={index}
                name={item.endpoint}
                value={item.count}
              />
            ))
          }
        </Box>

        {/* ✅ Growth */}
        <Box title="Growth Summary" icon={<TrendingUp />}>
          {
            growth.map(([text, value]) => (
              <Row key={text} text={text} value={value} />
            ))
          }
        </Box>

        {/* ✅ Resources */}
        <Box title="System Resources" icon={<Server />}>
          <div className="usage">
            {
              resources.map(([text, value]) => (
                <Circle key={text} value={value} text={text} />
              ))
            }
          </div>
        </Box>

        {/* ✅ Alerts */}
        <Box title="Alerts" icon={<Bell />}>
          {
            data?.alerts?.map((alert, index) => (
              <p key={index}>🟢 {alert}</p>
            ))
          }
        </Box>

      </div>
    </div>
  );
}


/* ✅ SMALL COMPONENTS (unchanged mostly) */

function Card({ icon, title, value, trend }) {
  return (
    <div className="metric">
      <div className="icon">{icon}</div>
      <div>
        <h3>{title}</h3>
        <h2>{value}</h2>
        <span>{trend}</span>
      </div>
    </div>
  );
}

function Box({ title, icon, children }) {
  return (
    <div className="box">
      <div className="title">
        {icon}
        <h3>{title}</h3>
      </div>
      {children}
    </div>
  );
}

function Row({ text, value }) {
  return (
    <div className="row">
      <span>{text}</span>
      <b>{value}</b>
    </div>
  );
}

function Progress({ name, value }) {
  return (
    <div className="progress">
      <span>{name}</span>
      <div className="bar">
        <span style={{ width: `${Math.min(value / 80, 100)}%` }} />
      </div>
      <b>{value}</b>
    </div>
  );
}

function Circle({ value, text }) {
  const percent = parseInt(value);

  return (
    <div>
      <div
        className="circle"
        style={{
          background: `conic-gradient(#8b5cf6 ${percent}%, #272033 ${percent}%)`
        }}
      >
        <div className="circle-inner">{value}</div>
      </div>
      <p>{text}</p>
    </div>
  );
}