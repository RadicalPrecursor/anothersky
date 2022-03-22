import './App.css'
import React from 'react'
import starService from './services/stars'
import { useState, useEffect } from 'react'

import axios from 'axios'

// const Display = ({col}) => {
//   return (
//     <p>
//       {col.id} {col.color}
//     </p>
//   )
// }

// const CountItems = (itemList) => {
//   console.log(itemList);
//   console.log(typeof(itemList));
//   console.log(Object.values(itemList)[0]);
//   let itemCount = Object.values(itemList)[0].length;
//   return (
//     <p>
//       Currently {itemCount} items in database.
//     </p>
//   )
// }

// const App = () => {
//   const [colors, setColors] = useState([])
//   const [colorCount, setColorCount] = useState(100)
//   const [newColor, setNewColor] = useState(
//     'add a color here'
//   )
//   const [testNum, setTestNum] = useState(
//     'number goes here'
//   )

//   useEffect(() => {
//     colorService
//       .getAll()
//       .then(colors => {
//         setColors(colors)
//       })
//   }, [])

//   //console.log('render', colors.length, 'colors')

  // const dbTest = (event) => {
  //   event.preventDefault();
  //   const testData = {
  //     "operation": "create",
  //     "tableName": "anothersky-db",
      // "payload": {
      //   "Item": {
      //     "id": parseInt(testNum),
      //     "number": parseInt(testNum),
      //     "thing": "other thing",
      //     "aList": ["a", "list", "of", "stuff"],
      //     "numberList": [1, 2, 3, 4]
      //   }
      // }
  //   }
  //   console.log(testData)


class Star {
  constructor(id) {
    this.x = Math.random()*1090;
    this.y = Math.random()*690;
    this.d = Math.random()*5;
    let c = Math.random();
    if (c < 0.4) {
      this.color = "white"
    }
    else if (c < 0.55) {
      this.color = "red"
    }
    else if (c < 0.7) {
      this.color = "orange"
    }
    else if (c < 0.85) {
      this.color = "yellow"
    }
    else {
      this.color = "blue"
    }
    this.id = id;
  }
}

function DrawStar(props) {
  const x = props.x;
  const y = props.y;
  const color = props.color;
  const d = props.d;

  return (
      <circle cx={props.x} cy={props.y} r={props.d} fill={props.color}/>
  )
}

const App = () => {
  const [stars, setStars] = React.useState([])
  const [storedStars, setStoredStars] = React.useState([])
  const [starscapeId, setStarscapeId] = React.useState(0)
  const [showId, setShowId] = React.useState(false)
  const [sendId, setSendId] = React.useState(100)

  useEffect(() => {
    starService
      .scan()
      .then(dbContents => {
        setStoredStars(dbContents)
      })
      console.log('scan complete')
  }, [])

  const handleCreateClick = (event) => {
    let starList = []
    for (let i=0; i<200; i++){
      starList.push(new Star(i))
    }
    setStars(starList)
    console.log('stored stars')
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

  const updateSendId = (event) => {
    event.preventDefault()
    setSendId(event.target.value)
    console.log(sendId)
  }

  const retrieveSky = (event) => {
    event.preventDefault()
    starService
      .recall(sendId)
      .then(response => {
        setStars(JSON.parse(response.Item.starData))
      })
  }

  return (
    <div className="App">
      <div>
        <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${window.width} ${window.height}`}
      className="sky"
        >
          {stars.map( s =>
        <DrawStar key={s.id} x={s.x} y={s.y} color={s.color} d={s.d} />)}
        </svg>
      </div>
      <div>
        <button onClick={handleCreateClick}>
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
