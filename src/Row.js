import React, {useEffect, useRef} from 'react';
import Word from './Word.js';


function Row({words, rowIndex, input, indexInfo, setIndexInfo, colors, setColors, accuracyInfo, setAccuracyInfo}) {

  const rowRef = useRef();  // row div element

  // updates word and row index info
  function incrementRowIndexInfo () {
    let temp = {...indexInfo}
    temp.wordIndex = 0;
    temp.rowIndex++;
    setIndexInfo(temp);
  }

  // calls incrementRowIndexInfo - maybe i can combine this and incrementRowIndexInfo()
  useEffect(() => {
    if (indexInfo.rowIndex === rowIndex && 
      indexInfo.wordIndex >= words.length) {
        incrementRowIndexInfo();
    }
  }, [indexInfo.wordIndex]);

  // scrolls the lesson window to keep the current row in the center
  useEffect(() => {
    if (indexInfo.rowIndex === rowIndex) {
        rowRef.current.scrollIntoView({
          behavior: 'auto',
          block: 'center',
          inline: 'center'
        });
    }
  }, [indexInfo.rowIndex]);

  return (
    <div ref={rowRef} className='text-row'>
      {words.map((word,index) => (
        <Word 
          letters={word} 
          rowIndex={rowIndex} 
          input={input} 
          wordIndex={index} 
          indexInfo={indexInfo} 
          setIndexInfo={setIndexInfo}
          colors={colors}
          key={index} 
          setColors={setColors}
          accuracyInfo={accuracyInfo}
          setAccuracyInfo={setAccuracyInfo}
        />
      ))}
    </div>
  )
}

export default Row