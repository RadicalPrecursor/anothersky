import starService from '../services/stars';
import { useRef } from 'react';

function Save(props) {
    const skyNameRef = useRef();
    const saveStars = (event) => {
        event.preventDefault();
        console.log('clicked the save button')
        const skyName = skyNameRef.current.value;
        let d = new Date()
        const starData = {
            "operation": "create",
            "id": d.getTime(),
            "skyName": skyName,
            "starData": JSON.stringify(props.stars)
        }
        starService
        .create(starData)
        .then(response => console.log(response))
    }

  return (
      <div>
      <form onSubmit={saveStars}>
        <div>name your sky? <input type='text' required id='name' ref={skyNameRef} /></div>
        <button type='submit'> save stars</button>
      </form>
    </div>
  )
}

export default Save;
