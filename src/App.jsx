import './App.css'
import Card from './Card'

function App() {
  return (
    <div className="App">
      <h1>
        Revive 2025 LeaderBoards
      </h1>
      <div class="container">
          <div class="teen-container">
            <h1>Teens</h1>
            <Card rank={1} name={"John Smith"} city={"Auckland"} pts={100}/>
          </div>
          <div class="youth-container">
            <h1>Youth</h1>
            <Card rank={1} name={"John Smith"} city={"Auckland"} pts={100}/>
          </div>
      </div>
    </div>
  )
}
export default App
