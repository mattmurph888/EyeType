import React, { useEffect, useState } from 'react';
import { useGazer, useUpdateGazePreview } from '../contexts/GazerContext';
import { useUpdateHasCalibrated } from '../contexts/HasCalibratedContex';

function Calibrator({ setCalibrating }) {
	const colors = [
		'rgba(255, 0, 0, 1)',
		'rgba(255, 0, 0, .6)',
		'rgba(255, 0, 0, .3)',
	]; // colors the callibrator button
	const [x, setX] = useState(0); // x pos of button
	const [y, setY] = useState(0); // y pos of button
	const [num, setNum] = useState(2); // number of times the button needs to be clicked
	const [curButton, setCurButton] = useState(0); // index of the button location
	const [buttonColor, setButtonColor] = useState(colors[0]); // updates the button color
	const setGazePreview = useUpdateGazePreview(); // allows us to see the prediction point and the face box
	const [buttonSize, setButtonSize] = useState(20);
	const setHasCalibrated = useUpdateHasCalibrated();

	// math that sets up the locations for the calibrator button
	let minX = 20;
	let minY = 20;
	let centerX = (window.innerWidth - buttonSize) / 2;
	let centerY = (window.innerHeight - minY - buttonSize) / 2 + minY;
	let maxX = window.innerWidth - 20 - buttonSize - 5;
	let maxY = window.innerHeight- 20 - buttonSize - 5;
	const [locations] = useState([
		[centerX, minY],
		[maxX, minY],
		[maxX, centerY],
		[maxX, maxY],
		[centerX, maxY],
		[minX, maxY],
		[minX, centerY],
		[minX, minY],
	]);

	// turns  gaze preview on when the calibrator is mounted and turn it off on unmount
	useEffect(() => {
		setGazePreview(true);
		setX(locations[curButton][0]);
		setY(locations[curButton][1]);
		return () => {
			setGazePreview(false);
		};
	}, []);

	// button's onclick function, updates button number and location. 
	// turns off the calibrator when done clicking the buttons
	function nextButton() {
		if (num > 0) {
			setButtonColor(colors[2 - (num - 1)]);
			setNum((num) => num - 1);
		} else {
			if (curButton + 1 < locations.length) {
				setButtonColor(colors[0]);
				setNum(2);
				setX(locations[curButton + 1][0]);
				setY(locations[curButton + 1][1]);
				setCurButton((curButton) => curButton + 1);
			} else {
				setHasCalibrated(true);
				setCalibrating(false);
			}
		}
	}

	return (
		<div className="calibrator">
			{/* still need to make this div look better. maybe add better instructions */}
			<div className="calibrate-text">
				<center>
				Center your eyes in the box!<br/>
				Click the red circles until you return to the lesson.
				</center>
			</div>
			<button
				onClick={nextButton}
				className="calibrate-button"
				style={{
					top: y,
					left: x,
					width: buttonSize,
					height: buttonSize,
					backgroundColor: buttonColor,
					borderRadius: buttonSize,
				}}
			>
				{num + 1}
			</button>
		</div>
	);
}

export default Calibrator;
