import React from 'react';
import Level from './Level.js';


function LevelList({levels, selectLevel}) {

  return (
    <div className='level-grid'>
      {levels.map((level,index )=> {
        return <Level level={level} selectLevel={selectLevel} id={index} key={index}/>
      })}
    </div>
  )
}

export default LevelList