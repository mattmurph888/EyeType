import React, { useState } from 'react';

function Overview({
	speed,
	accuracyInfo,
	time,
	looksDown,
	lesson,
	maxLesson,
	levelSelected,
	selectLevel,
	setPreviousData,

}) {
	const [nextButton] = useState(initNextButton());

	function initNextButton() {
		console.log(levelSelected, maxLesson);
		if (levelSelected >= maxLesson - 1) {
			return null;
		} else {
			return (
				<button className="next-level" onClick={() => incrementLevel(1)}>
					Next Level
				</button>
			);
		}
	}

	function incrementLevel(incrementVal) {
		setPreviousData(null);
		selectLevel((oldLevel) => oldLevel + incrementVal);
	}

	return (
		<div className="overview">
			<div className="overview-title">
				Lesson {levelSelected+1}: {lesson.title}{' '}
			</div>

			<div className="overview-data">
				<div className="overview-speed">
					{speed.toFixed(0)}
					<span>SPEED (wpm)</span>
				</div>
				<div className="overview-accuracy">
					{accuracyInfo.accuracy}%<span>ACCURACY</span>
				</div>
				<div className="overview-time">
					{(time / 1000).toFixed(0)}
					<span>TIME (secs)</span>
				</div>
				<div className="overview-looks">
					{looksDown}
					<span>Looks Down</span>
				</div>
			</div>

			<div className="overview-buttons">
				<button className="try-again" onClick={() => incrementLevel(0)}>
					Try Again
				</button>
				{nextButton}
			</div>
		</div>
	);
}

export default Overview;
