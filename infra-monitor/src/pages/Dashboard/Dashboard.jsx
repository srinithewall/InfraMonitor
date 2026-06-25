import React from "react"
import {
  Server,
  Database,
  Users,
  AlertTriangle,
  TrendingUp,
  Activity,
  Bell
} from "lucide-react"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts"

import "./dashboard.css"


const queryData=[
  {day:"18 Jun",value:30000},
  {day:"19 Jun",value:39000},
  {day:"20 Jun",value:28000},
  {day:"21 Jun",value:46000},
  {day:"22 Jun",value:36000},
  {day:"23 Jun",value:60000},
  {day:"24 Jun",value:50000}
]


const metrics=[
  [Server,"Total Requests","12,543","↑18.7%"],
  [Database,"DB Queries","54,211","↑22.5%"],
  [Users,"Active Connections","21","↓4.5%"],
  [AlertTriangle,"Slow Queries","0",""]
]


const health=[
  ["Users","124"],
  ["Posts","2431"],
  ["Marketplace Listings","145"],
  ["Services","82"],
  ["Villages","12"],
  ["Events","18"],
  ["Chats","1256"]
]


const endpoints=[
  ["/api/posts",6321],
  ["/api/users",2145],
  ["/api/marketplace",1042],
  ["/api/services",541],
  ["/api/events",412]
]



const growth=[
  ["New Users","14 ↑27%"],
  ["New Posts","37 ↑15%"],
  ["New Listings","9 ↑12%"],
  ["New Services","6 ↑20%"]
]
const resources=[
  ["CPU","42%"],
  ["Memory","58%"],
  ["Disk","37%"]
]


export default function Dashboard(){

return (

<div className="dashboard">


<div className="top-grid">

{
metrics.map(([Icon,title,value,trend])=>

<Card
key={title}
icon={<Icon/>}
title={title}
value={value}
trend={trend}
/>

)
}

</div>



<div className="main-grid">


<Box title="Database Health" icon={<Database/>}>

{
health.map(item=>

<Row
key={item[0]}
text={item[0]}
value={item[1]}
/>

)
}

</Box>





<Box title="DB Queries Trend" icon={<Activity/>}>


<div className="chart">

<ResponsiveContainer>

<LineChart data={queryData}>

<CartesianGrid strokeDasharray="3 3"/>

<XAxis dataKey="day"/>

<YAxis/>

<Tooltip/>

<Line
dataKey="value"
stroke="#8b5cf6"
strokeWidth={3}
/>

</LineChart>

</ResponsiveContainer>

</div>


</Box>







<Box title="Top Endpoints" icon={<TrendingUp/>}>

{
endpoints.map(item=>

<Progress
key={item[0]}
name={item[0]}
value={item[1]}
/>

)
}

</Box>







<Box title="Growth Summary" icon={<TrendingUp/>}>

{
growth.map(item=>

<Row
key={item[0]}
text={item[0]}
value={item[1]}
/>

)
}

</Box>






<Box title="System Resources" icon={<Server/>}>

<div className="usage">

{
resources.map(item=>

<Circle
key={item[0]}
value={item[1]}
text={item[0]}
/>

)
}

</div>

</Box>






<Box title="Alerts" icon={<Bell/>}>


<p>🟢 Slow Queries = 0</p>

<p>🟢 Connections Normal</p>

<p>🟢 Database Healthy</p>


</Box>



</div>


</div>

)

}





function Card({icon,title,value,trend}){

return(

<div className="metric">

<div className="icon">
{icon}
</div>

<div>

<h3>{title}</h3>

<h2>{value}</h2>

<span>{trend}</span>

</div>

</div>

)

}





function Box({title,icon,children}){

return(

<div className="box">

<div className="title">

{icon}

<h3>{title}</h3>

</div>

{children}

</div>

)

}





function Row({text,value}){

return(

<div className="row">

<span>{text}</span>

<b>{value}</b>

</div>

)

}




function Progress({name,value}){

return(

<div className="progress">

<span>{name}</span>

<div className="bar">

<span style={{width:`${Math.min(value/80,100)}%`}}/>

</div>

<b>{value}</b>

</div>

)

}



function Circle({value,text}){

const percent=parseInt(value)

return(

<div>

<div
className="circle"
style={{
background:`conic-gradient(#8b5cf6 ${percent}%,#272033 ${percent}%)`
}}
>

<div className="circle-inner">
{value}
</div>

</div>

<p>{text}</p>

</div>

)

}