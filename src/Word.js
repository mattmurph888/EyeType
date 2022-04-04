import React, {useRef, useEffect} from 'react';
import Letter from './Letter.js';

function Word({letters, rowIndex, input, wordIndex, indexInfo, setIndexInfo, colors, setColors, accuracyInfo, setAccuracyInfo}) {

  const wordRef = useRef(); // word div element

  // updates letter and word index info
  function incrementWordIndexInfo () {
    let temp = {...indexInfo}
    temp.letterIndex = 0;
    temp.wordIndex++;
    setIndexInfo(temp);
  }

  // calls incrementWordIndexInfo - maybe i can combine this and incrementWordIndexInfo()
  useEffect(() => {
    if (indexInfo.rowIndex === rowIndex && 
      indexInfo.wordIndex === wordIndex && 
      indexInfo.letterIndex >= letters.length) {
        incrementWordIndexInfo();
    }
  }, [indexInfo.letterIndex]);

  // add the box shadow over the top of the word
  useEffect(() => {
    if (indexInfo.rowIndex === rowIndex && 
      indexInfo.wordIndex === wordIndex) {
        wordRef.current.style.boxShadow = '0px -1px rgba(0, 0, 0, 0.3)';
    } else {
      wordRef.current.style.boxShadow = 'none';
    }
  }, [indexInfo.wordIndex]);

  return (
    <div ref={wordRef} className='text-word'>
      {letters.split('').map((letter,index) => 
        <Letter 
          letter={letter} 
          rowIndex={rowIndex} 
          input={input} 
          wordIndex={wordIndex} 
          letterIndex={index} 
          indexInfo={indexInfo} 
          setIndexInfo={setIndexInfo}
          colors={colors}
          setColors={setColors}
          input={input} 
          key={index} 
          accuracyInfo={accuracyInfo}
          setAccuracyInfo={setAccuracyInfo}
        /> 
      )}
    </div>
  )
}

export default Word