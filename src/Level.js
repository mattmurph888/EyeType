import React, { useState } from 'react'




// id, icon, stars, title
function Level({level, selectLevel}) {

  const [stars, setStars] = useState(level.stars);

  return (
    <div className='level' onClick={() => selectLevel(level.id)}>
      <div className="level-num">{level.id}</div>
      <div className="level-icon">{level.icon}</div>
      <div className="level-stars">{level.speed.toFixed(0)}</div>
      <hr className='level-line'/>
      <div className="level-title">{level.title}</div>
    </div>
  )
}

export default Level