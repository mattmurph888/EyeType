import React from 'react';
import Level from './Level.js';


function LevelList({levels, selectLevel}) {

  return (
    <div className='level-grid'>
      {levels.map(level => {
        return <Level level={level} selectLevel={selectLevel} key={level.id}/>
      })}
    </div>
  )
}

export default LevelList