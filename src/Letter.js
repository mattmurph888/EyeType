import React, {useEffect, useRef} from 'react'

function Letter({letter, rowIndex, wordIndex, letterIndex, indexInfo, input, setIndexInfo, colors, setColors, accuracyInfo, setAccuracyInfo}) {
  
  const letterRef = useRef();                               // letter div element
  const ignore = ['Shift', 'CapsLock', 'Control', 'Alt'];   // keys that should be ignored by data collection

  // updates the current letter's color
  function handleColorChange(color) {
    let tempColors = {...colors}
    tempColors.curColor = color;
    setColors(tempColors);
  }

  // updates letter index info
  function incrementLetterIndexInfo() {
    let temp = {...indexInfo};
    temp.letterIndex++;
    setIndexInfo(temp);
  }

  // updates num correct/incorrect and accuracy
  function handleAccuracyInfoChange(info) {
    let temp = {...accuracyInfo};
    info.map(item => temp[item]++);
    temp.accuracy = ((temp.numCorrect / temp.numTotal) * 100).toFixed(0);
    setAccuracyInfo(temp);
  }

  // handles key press, color changes, calls incrementLetterIndexInfo
  useEffect(() => {
    async function colorText() {
      if (indexInfo.rowIndex === rowIndex && 
        indexInfo.wordIndex === wordIndex && 
        indexInfo.letterIndex === letterIndex &&
        !ignore.includes(input) && 
        input ) {
          if (input === letter ) {
            if (letterRef.current.style.backgroundColor == colors.red) {
              letterRef.current.style.backgroundColor = colors.yellow;
              await handleColorChange(colors.yellow);
            } else {
              letterRef.current.style.backgroundColor = colors.green;
              await handleColorChange(colors.green);
            }
            await incrementLetterIndexInfo();
            await handleAccuracyInfoChange(['numTotal','numCorrect'])
          } else {
            letterRef.current.style.backgroundColor = colors.red;
            await handleColorChange(colors.red);
            await handleAccuracyInfoChange(['numTotal'])
          }
      }
    }
    colorText();
  }, [input]);

  // handles box shadow display under letter
  useEffect(() => {
    if (indexInfo.rowIndex === rowIndex && 
      indexInfo.wordIndex === wordIndex &&
      indexInfo.letterIndex === letterIndex) {
        letterRef.current.style.boxShadow = '0px 3px rgba(0, 0, 0, 1)';
    } else {
      letterRef.current.style.boxShadow = 'none';
    }
  }, [indexInfo]);

  return (
    <div ref={letterRef} className='text-letter'>{letter}</div>
  )
}

export default Letter