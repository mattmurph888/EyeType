import React, { useState } from 'react'




// id, icon, stars, title
function Level({level, selectLevel, id}) {

  const [stars, setStars] = useState(level.stars);

  return (
    <div className='level' onClick={() => selectLevel(id)}>
      <div className="level-num">LEVEL {id+1}</div>
      <div className="level-icon">{level.icon}</div>
      <div className="level-stars">Speed: {level.speed.toFixed(0)}</div>
      <hr className='level-line'/>
      <div className="level-title">{level.title}</div>
    </div>
  )
}

export default Level