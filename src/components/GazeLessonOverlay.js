import React from "react";

function GazeLessonOverlay({y, boxOffset}) {
  return (
    <div className="gaze-lesson-overlay">
      <div
				className='top-box'
				style={{
					position: 'absolute',
					height: window.innerHeight,
					top: y-boxOffset-window.innerHeight,
					width: '100%',
					background: 'linear-gradient(rgba(0,0,0,1), rgba(0,0,0,0))',
					zIndex: 100
				}}
			></div>
			<div
			className='bottom-box'
				style={{
					position: 'absolute',
					height: window.innerHeight,
					top: y+boxOffset,
					width: '100%',
					background: 'linear-gradient(rgba(0,0,0,0), rgba(0,0,0,1))',
					zIndex: 100
				}}
			></div>
    </div>
  )
}

export default GazeLessonOverlay;
