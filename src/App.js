import './App.css'
import starService from './services/stars'
import Save from './components/Save';
import { CreateStar, DrawStar } from './components/Star'
import { useEffect, useState, useRef } from 'react'

function App() {
  const [stars, setStars] = useState([])
  const skyNameRef = useRef();

  useEffect(() => {
    generateSky();
  }, [])

  // Yay now this will go automatically on loading
  function generateSky() {
    let starList = []
    for (let i=0; i<2000; i++){
      starList.push(CreateStar(i))
    }
    setStars(starList)
    console.log('sky was generated with these stars')
    console.log(stars)
  }

  // get starscape by name
  function retrieveSky(event) {
    event.preventDefault()
    const skyName = skyNameRef.current.value;
    starService
      .recall(skyName)
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
            <DrawStar
              key={s.id}
              id={s.id}
              x={s.x}
              y={s.y}
              r={s.r}
              color={s.color}
            />
          )}
        </svg>
      </div>
      <div>
        <button onClick={generateSky}>
          new sky
        </button>
      </div>
      <Save stars={stars}/>
      <div>
      <form onSubmit={retrieveSky}>
        <div>Name: <input type='text' required id='sky-name' ref={skyNameRef} /> </div>
        <div> <button type="submit"> recall </button></div>
      </form>
      </div>
    </div>
  )
}

export default App;
