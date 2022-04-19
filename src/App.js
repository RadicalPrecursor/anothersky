import './App.css'
import starService from './services/stars'
import Star from './components/Star'
import { useEffect, useState } from 'react'

function App() {
  const [stars, setStars] = useState([])
  const [storedStars, setStoredStars] = useState([])
  const [starscapeId, setStarscapeId] = useState(0)
  const [showId, setShowId] = useState(false)
  const [sendId, setSendId] = useState(100)

  // Right now this is the piece checking to see what ID to assign
  // Should probably move this to lambda function
  useEffect(() => {
    generateSky();
    starService
      .scan()
      .then(dbContents => {
        setStoredStars(dbContents)
      })
  }, [])

  // Yay now this will go automatically on loading
  function generateSky() {
    let starList = []
    for (let i=0; i<5; i++){
      starList.push(new Star({id: i}))
    }
    setStars(starList)
    console.log(stars)
    console.log('stored stars')
    // Count winds up happening here to assign new ID
    console.log(storedStars.Count)
    setStarscapeId(storedStars.Count + 100)
    console.log(starscapeId)
  }

  const saveStars = (event) => {
    console.log('clicked the save button')
    const starData = {
      "operation": "create",
      "tableName": "anothersky-db",
      "payload": {
        "Item": {
          "id": starscapeId,
          "starData": JSON.stringify(stars)
        }
      }
    }
    starService
      .create(starData)
      .then(response => console.log(response))
    setShowId(true)
    console.log(showId)
  }

  // get id from user to request saved starscape
  const updateSendId = (event) => {
    event.preventDefault()
    setSendId(event.target.value)
    console.log(sendId)
  }

  // get starscape from db
  const retrieveSky = (event) => {
    event.preventDefault()
    starService
      .recall(sendId)
      .then(response => {
        setStars(JSON.parse(response.Item.starData))
      })
      .then(generateSky());
  }

  return (
    <div className="App">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1100px" height="700px"
          className="sky"
        >
          {stars.map( s =>
            <Star
              key={s.id}
              id={s.id}
              x={s.x}
              y={s.y}
              color={s.color}
              r={s.r}
            />
          )}
        </svg>
      </div>
      <div>
        <button onClick={generateSky}>
          summon stars
        </button>
      </div>
      <div>
        <button onClick={saveStars}> save stars </button>
        <p>
          Starscape Id: {starscapeId}
        </p>
      </div>
      <div>
        Look again?
        <form onSubmit={retrieveSky}>
          <div> Starscape Id: <input value={sendId} onChange={updateSendId} /> </div>
          <div> <button type="submit"> recall </button></div>
        </form>
      </div>
    </div>
  )
}

export default App;
