import './App.css'
import Card from './Card'
import { useEffect, useState } from 'react'

function App() {
  const [teenData, setTeenData] = useState([])
  const [youthData, setYouthData] = useState([])

  const id = "16sF1nIZLOu3ev4soFttJKJe2b8Dvij8bEp_40APM72E"
  const url = `https://docs.google.com/spreadsheets/d/${id}/gviz/tq?tqx=out:json`

  const fetchLeaderboard = async () => {
    try {
      const res = await fetch(url)
      const text = await res.text()
      const json = text.slice(text.indexOf('(') + 1, text.lastIndexOf(')'))
      const data = JSON.parse(json)

      const teens = []
      const youth = []

      data.table.rows.forEach(r => {
        const entry = {
          name: r.c[0]?.v || "",
          city: r.c[1]?.v || "",
          totalPoints: Number(r.c[r.c.length - 1]?.v || 0)
        }
        const category = r.c[2]?.v?.toLowerCase() || ""
        if (category === "teen" || category === "teens") teens.push(entry)
        else if (category === "youth") youth.push(entry)
      })

      teens.sort((a, b) => b.totalPoints - a.totalPoints)
      youth.sort((a, b) => b.totalPoints - a.totalPoints)

      setTeenData(teens.map((e, i) => ({ ...e, rank: i + 1 })))
      setYouthData(youth.map((e, i) => ({ ...e, rank: i + 1 })))

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
      <h1>Revive 2025 LeaderBoards</h1>
      <div className="container">
        <div className="teen-container">
          <h2>Teens</h2>
          {teenData.map(entry => (
            <Card
              key={entry.rank}
              rank={entry.rank}
              name={entry.name}
              city={entry.city}
              pts={entry.totalPoints}
            />
          ))}
        </div>
        <div className="youth-container">
          <h2>Youth</h2>
          {youthData.map(entry => (
            <Card
              key={entry.rank}
              rank={entry.rank}
              name={entry.name}
              city={entry.city}
              pts={entry.totalPoints}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default App