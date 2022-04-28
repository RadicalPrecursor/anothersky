import './App.css'
import starService from './services/stars'
import Save from './components/Save';
import Footer from './components/Footer';
import { CreateStar, DrawStar } from './components/Star'
import { useEffect, useState, useRef } from 'react'
import NewSky from './components/NewSky';
import Recall from './components/Recall';

function App() {
  const [stars, setStars] = useState([])
  const skyNameRef = useRef();

  useEffect(() => {
    generateSky();
  }, [])

  // Yay now this will go automatically on loading
  function generateSky() {
    let starList = []
    for (let i=0; i<4000; i++){
      starList.push(CreateStar(i))
    }
    setStars(starList)
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
  }

  return (
    <div className="App">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1350px" height="750px"
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
      <Recall submitHandler={retrieveSky} skyNameRef={skyNameRef} />
      <Save stars={stars}/>
      <NewSky clickHandler={generateSky} />
      <Footer />
    </div>
  )
}

export default App;
