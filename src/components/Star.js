export function CreateStar(id) {
  // generate coordinates
  let starX = Math.random()*1340;
  let starY = Math.random()*740;
  // size
  let starR = (Math.random()**3)*1.2;
  // color logic
  let c = Math.random();
  let starColor = '';
  if (c < 0.86) { starColor = "white" }
  else if (c < 0.88) { starColor = "#E04200" }
  else if (c < 0.9) { starColor = "#F59A26" }
  else if (c < 0.95) { starColor = "#FFDC62" }
  else { starColor = "#BEECFF" }
  // put it all together
  const star = {
    id: id, x: starX, y: starY, r: starR, color: starColor
  };
  return star;
}

export function DrawStar(star) {
  // my handlers work, yay
  // not sure they'll actually be used in the 'final' version
  function handleStarHover() {
    console.log(star.id);
  }
  function handleStarClick() {
    console.log('clicked', star.color, 'star')
  }
  return (
  <g
    onMouseEnter={handleStarHover}
    onClick={handleStarClick}
    >
    <circle
      id={star.id}
      cx={star.x}
      cy={star.y}
      r={star.r}
      fill={star.color}
    />
  </g>
  )
}
