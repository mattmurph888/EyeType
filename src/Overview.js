import React from 'react';

function Overview({speed, accuracyInfo, time, lesson, levelSelected}) {

  return (
    <div className='overview'>
      <div className="overview-title">Lesson {levelSelected}: {lesson.title}</div>
      <div className="overview-speed">SPEED: {speed.toFixed(0)}wpm</div>
      <div className="overview-accuracy">ACCURACY: {accuracyInfo.accuracy}%</div>
      <div className="overview-time">TIME: {(time/1000).toFixed(0)} secs</div>
    </div>
  )
}

export default Overview