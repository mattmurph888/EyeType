import React, { useEffect, useRef } from 'react';
import { useColors } from '../contexts/ColorsContext';

function Key({ id, char, charShift, code, inputCodes}) {
	const colors = useColors();
	const keyRef = useRef(); // key div element

	// handles keyboard animations on key presses
	useEffect(() => {
		if (inputCodes.includes(code)) {
			keyRef.current.style.transition = 'none';
			keyRef.current.style.backgroundColor = colors.curColor;
			keyRef.current.style.transform = 'translateY(1px)';
		} else {
			keyRef.current.style.transition = 'background-color 0.5s';
			keyRef.current.style.backgroundColor = 'white';
			keyRef.current.style.transform = 'translateY(0px)';
		}
	}, [inputCodes, colors, code]);

	return (
		<div ref={keyRef} className={`keyboard-key ${code}`}>
			<div>{charShift}</div>
			<div>{code.slice(0, 3) === 'Key' ? null : char}</div>
		</div>
	);
}

export default Key;
