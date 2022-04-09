import React, { useEffect, useRef } from 'react';
import Word from './Word.js';
import { useIndexInfo, useUpdateIndexInfo } from '../contexts/IndexInfoContext.js';

function Row({ words, rowIndex }) {
	const indexInfo = useIndexInfo();
	const setIndexInfo = useUpdateIndexInfo();
	const rowRef = useRef(); // row div element

	// updates word and row index info
	function incrementRowIndexInfo() {
		let temp = { ...indexInfo };
		temp.wordIndex = 0;
		temp.rowIndex++;
		setIndexInfo(temp);
	}

	// calls incrementRowIndexInfo - maybe i can combine this and incrementRowIndexInfo()
	useEffect(() => {
		if (
			indexInfo.rowIndex === rowIndex &&
			indexInfo.wordIndex >= words.length
		) {
			incrementRowIndexInfo();
		}
	}, [indexInfo.wordIndex]);

	// scrolls the lesson window to keep the current row in the center
	useEffect(() => {
		if (indexInfo.rowIndex === rowIndex) {
			rowRef.current.scrollIntoView({
				behavior: 'auto',
				block: 'center',
				inline: 'center',
			});
		}
	}, [indexInfo.rowIndex]);

	return (
		<div ref={rowRef} className="text-row">
			{words.map((word, index) => (
				<Word
					letters={word}
					rowIndex={rowIndex}
					wordIndex={index}
					key={index}
				/>
			))}
		</div>
	);
}

export default Row;
