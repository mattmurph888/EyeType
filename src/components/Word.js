import React, { useRef, useEffect } from 'react';
import Letter from './Letter.js';
import { useIndexInfo, useUpdateIndexInfo } from '../contexts/IndexInfoContext.js';

function Word({ letters, rowIndex, wordIndex }) {
  const indexInfo = useIndexInfo();
  const setIndexInfo = useUpdateIndexInfo();
	const wordRef = useRef(); // word div element

	// updates letter and word index info
	function incrementWordIndexInfo() {
		let temp = { ...indexInfo };
		temp.letterIndex = 0;
		temp.wordIndex++;
		setIndexInfo(temp);
	}

	// calls incrementWordIndexInfo - maybe i can combine this and incrementWordIndexInfo()
	useEffect(() => {
		if (
			indexInfo.rowIndex === rowIndex &&
			indexInfo.wordIndex === wordIndex &&
			indexInfo.letterIndex >= letters.length
		) {
			incrementWordIndexInfo();
		}
	}, [indexInfo.letterIndex]);

	// add the box shadow over the top of the word
	useEffect(() => {
		if (indexInfo.rowIndex === rowIndex && indexInfo.wordIndex === wordIndex) {
			wordRef.current.style.boxShadow = '0px -1px rgba(0, 0, 0, 0.3)';
		} else {
			wordRef.current.style.boxShadow = 'none';
		}
	}, [indexInfo.wordIndex]);

	return (
		<div ref={wordRef} className="text-word">
			{letters.split('').map((letter, index) => (
				<Letter
					letter={letter}
					rowIndex={rowIndex}
					wordIndex={wordIndex}
					letterIndex={index}
					key={index}
				/>
			))}
		</div>
	);
}

export default Word;
