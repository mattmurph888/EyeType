import React from 'react';

function Overview({speed, accuracyInfo, time}) {

  return (
    <div className='Overview'>
      <div className="Overview-speed">speed: {speed.toFixed(0)}wpm</div>
      <div className="Overview-accuracy">accuracy: {accuracyInfo.accuracy}%</div>
      <div className="Overview-time">time: {(time/1000).toFixed(0)} secs</div>
    </div>
  )
}

export default Overview