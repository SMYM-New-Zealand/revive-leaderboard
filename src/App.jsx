import './App.css'
import Card from './Card'
import { useEffect, useState } from 'react'

function App() {
  const [girlsData, setGirlsData] = useState([])
  const [boysData, setBoysData] = useState([])
  const [lastUpdated, setLastUpdated] = useState(null)
  const [boysTotal, setBoysTotal] = useState(0)
  const [girlsTotal, setGirlsTotal] = useState(0)

  const id = "1LsAtKHyktFznZR0GF0KmvLT1Y-7gAPM4wSKGVDSDqWg"
  const url = `https://docs.google.com/spreadsheets/d/${id}/gviz/tq?tqx=out:json`
  const fetchLeaderboard = async () => {
    try {
      const res = await fetch(url)
      const text = await res.text()
      const json = text.slice(text.indexOf('(') + 1, text.lastIndexOf(')'))
      const data = JSON.parse(json)

      const girls = []
      const boys = []

      data.table.rows.forEach(r => {
        const entry = {
          name: r.c[0]?.v || "",
          city: r.c[1]?.v || "",
          totalPoints: Number(r.c[r.c.length - 2]?.v || 0)
        }
        console.log(entry)
        const category = r.c[2]?.v || ""
        if (category === "Female") girls.push(entry)
        else if (category === "Male") boys.push(entry)
      })

     let tempDate = data.table.rows[1].c[data.table.rows[1].c.length - 1]?.f;
     setLastUpdated(tempDate)

      girls.sort((a, b) => b.totalPoints - a.totalPoints)
      boys.sort((a, b) => b.totalPoints - a.totalPoints)

      setGirlsData(girls.map((e, i) => ({ ...e, rank: i + 1 })))
      setBoysData(boys.map((e, i) => ({ ...e, rank: i + 1 })))
      setGirlsTotal(girls.reduce((sum, girl) => sum + girl.totalPoints, 0))
      setBoysTotal(boys.reduce((sum, boy) => sum + boy.totalPoints, 0))

    } catch (err) {
      console.error("Failed to fetch leaderboard:", err)
    }
  }

  useEffect(() => {
    fetchLeaderboard()
    const interval = setInterval(fetchLeaderboard, 5 * 60 * 1000) 
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="App">
      <h1 className='topheader'>Revive 2026 Leaderboards</h1>
      <h3>Last Updated: {lastUpdated}</h3>
      <div className="container">
        <div className="girls-container">
          <h1>Girls</h1>
          <h3>Total Points: {girlsTotal}</h3>
          {girlsData.map(entry => (
            <Card
              key={entry.rank}
              rank={entry.rank}
              name={entry.name}
              city={entry.city}
              pts={entry.totalPoints}
              color="#cc972d"
            />
          ))}
        </div>
        <div className="boys-container">
          <h1>Boys</h1>
          <h3>Total Points: {boysTotal}</h3>
          {boysData.map(entry => (
            <Card
              key={entry.rank}
              rank={entry.rank}
              name={entry.name}
              city={entry.city}
              pts={entry.totalPoints}
              color="#464831"
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default App