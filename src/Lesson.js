import React, {setState, useEffect, useRef, useState} from 'react';
import Key from './Key.js';
import Row from './Row.js';
import Overview from './Overview.js';

function Lesson({lessons, setLessons, levelSelected, selectLevel, previousData, setPreviousData}) {

  const [input, setInput] = useState(null);           // holds the keypress data
  const [inputCodes, setInputCodes] = useState([]);   // stack of currently pressed keycodes
  const [time, setTime] = useState(0);                // time spent on lesson from first key press 
  const [timerOn, setTimerOn] = useState(false);      // bool is the lesson timer running?
  const [speed, setSpeed] = useState(0);              // wpm of the level just played, resets with home button
  const [numLetters, setNumLetters] = useState(0);    // number of letters typed so far in level
  const [started, setStarted] = useState(false);      // was the lesson started?
  let rows = setRows();                               // initializes the text rows for the lesson wndow

  // holds the colors used for keys, letters, and holds curColor -> correct/incorrect key press
  const [colors, setColors] = useState({
    red: "rgba(230, 92, 92, 0.7)",
    yellow: "rgba(223, 230, 92, 0.7)",
    green: "rgba(99, 230, 92, 0.7)",
    curColor: null
  });

  // {number of characters correctly typed, number of total key presses, correct/incorrect}
  const [accuracyInfo, setAccuracyInfo] = useState({
    numCorrect: 0,
    numTotal: 0,
    accuracy: 'Start!!!'
  });
  
  // track the row, word, and letter currently being typed
  const [indexInfo, setIndexInfo] = useState({
    rowIndex:0,
    wordIndex:0,
    letterIndex:0
  });

  // adds/removes keydown/keyup event listeners
  useEffect (() => {
    window.addEventListener('keydown', handleKeyPress)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, []);

  // updates numLetters - number of letters typed in current level
  useEffect (() => {
    if (timerOn && indexInfo.letterIndex !== 0) {
      setNumLetters(oldNum => oldNum+1);
    }
  }, [indexInfo.letterIndex]);

  // upsdate the speed - rolling wpm displayed in main
  useEffect (() => {
    if (numLetters > 1) { 
      setSpeed((numLetters/5)/(time/60000));
    }
  }, [numLetters]);

  // turns off the timer when the level is complete
  useEffect (() => {
    if (indexInfo.rowIndex >= rows.length) {
      setTimerOn(false);
    }
  }, [indexInfo.rowIndex]);

  // starts and updates time - 10 milliseconds every 10 milliseconds
  useEffect (() => {
    let interval = null;
    if (timerOn) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval)
    }

    return () => clearInterval(interval);
  }, [timerOn]);

  // updates lessons data and level just played datat - eventually add database update here
  useEffect (() => {
    if (!timerOn && started) {
      let tempLessonData = [...lessons];
      if (speed > tempLessonData[levelSelected-1].speed){
        tempLessonData[levelSelected-1].speed = speed;
      }
      setLessons(tempLessonData);
      handlePreviousDataChange();
    }
  }, [timerOn]);

  // starts timerOn/started and updates input/inputCodes
  function handleKeyPress(e) {
    if (!started) {
      setStarted(true);
      setTimerOn(true);
    }
    setInput(e.key);
    setInputCodes(oldInput => !oldInput.includes(e.code) ? [...oldInput, e.code] : [...oldInput]);
  }

  // updates input/inputCodes
  function handleKeyUp(e) {
    setInput(null);
    setInputCodes(oldInput => oldInput.filter(item => item !== e.code));
  }

  // updates previousData to be displayed on the level overview page
  function handlePreviousDataChange() {
      let tempData = {
        finished: true,
        speed: speed,
        accuracyInfo: accuracyInfo,
        time: time
      }
      console.log(tempData)
      setPreviousData(tempData);
  }

  // creates all the key components for the keyboard
  const KEYBOARD_ROWS = KEYBOARD.map((row,i) => (
    row.keys.map((item,j) => (
      <Key 
        {...item} 
        inputCodes={inputCodes}  
        key={item.code} 
        colors={colors}
        setColors={setColors}
      />
    ))
  ));

  function setRows () {
    let textWords = lessons[levelSelected-1].text.split(" ");
    textWords = textWords.map(word => (word = word + " "));
    let lastItem = textWords.pop();
    lastItem = lastItem.slice(0,lastItem.length-1);
    textWords.push(lastItem);
  
    let textRows = [[]];
    let maxRowIndex = 30;
    let curRowIndex = 0;
    let curRow = 0;
    for (let word = 0; word < textWords.length; word++ ) {
      let curWord = textWords[word];
      if (curWord.length + curRowIndex <= maxRowIndex) {
        textRows[curRow].push(curWord);
        curRowIndex += curWord.length;
      } else {
        textRows.push([]);
        curRow++;
        textRows[curRow].push(curWord);
        curRowIndex = curWord.length;
      }
    }
    // console.log(textRows);
    return textRows;
  }

  return (
    <div className="lesson">
      <div className="lesson-top">
        <div className="lesson-window">
          {rows.map((row,index) => (
            <Row 
              words={row} 
              rowIndex={index} 
              input={input} 
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
      </div>

      <div className="lesson-bottom">
        
        <div className="lesson-bottom-left">
          EyeType
        </div>

        <div className="lesson-keyboard">
          {KEYBOARD_ROWS.map((row,i) => (
            <div className={`keyboard-row row${i}`} key={i}>
              {row.map(item => item)}
            </div>
          ))}
        </div>

        <div className="lesson-data">
          <div className="lesson-accuracy">
            <div className="lesson-accuracy-data">{accuracyInfo.accuracy}</div>
            <div className="lesson-accuracy-text">Accuracy</div>
          </div>
          <div className="lesson-speed">
            <div className="lesson-speed-data">{speed.toFixed(0)}</div>
            <div className="lesson-speed-text">WPM</div>
          </div>
          <div className="lesson-focus">
            <div className="lesson-focus-data">{time/1000}</div>
            <div>{numLetters}</div>
            <div className="lesson-focus-text">timerOn</div>
          </div>
        </div>
      </div>

    </div>
  )
}

// holds the layout for the keyboard
const KEYBOARD = [
  {row: 0, keys: [
    {id:0, char:'`', charShift:'~', code:"Backquote"},
    {id:1, char:'1', charShift:'!', code:"Digit1"},
    {id:2, char:'2', charShift:'@', code:"Digit2"},
    {id:3, char:'3', charShift:'#', code:"Digit3"},
    {id:4, char:'4', charShift:'$', code:"Digit4"},
    {id:5, char:'5', charShift:'%', code:"Digit5"},
    {id:6, char:'6', charShift:'^', code:"Digit6"},
    {id:7, char:'7', charShift:'&', code:"Digit7"},
    {id:8, char:'8', charShift:'*', code:"Digit8"},
    {id:9, char:'9', charShift:'(', code:"Digit9"},
    {id:10, char:'0', charShift:')', code:"Digit0"},
    {id:11, char:'-', charShift:'_', code:"Minus"},
    {id:12, char:'=', charShift:'+', code:"Equal"},
    {id:13, char:'Backspace', charShift:null, code:"Backspace"}
  ]},
  {row: 1, keys: [
    {id:0, char:'Tab', charShift:null, code:"Tab"},
    {id:1, char:'q', charShift:'Q', code:"KeyQ"},
    {id:2, char:'w', charShift:'W', code:"KeyW"},
    {id:3, char:'e', charShift:'E', code:"KeyE"},
    {id:4, char:'r', charShift:'R', code:"KeyR"},
    {id:5, char:'t', charShift:'T', code:"KeyT"},
    {id:6, char:'y', charShift:'Y', code:"KeyY"},
    {id:7, char:'u', charShift:'U', code:"KeyU"},
    {id:8, char:'i', charShift:'I', code:"KeyI"},
    {id:9, char:'o', charShift:'O', code:"KeyO"},
    {id:10, char:'p', charShift:'P', code:"KeyP"},
    {id:11, char:'[', charShift:'{', code:"BracketLeft"},
    {id:12, char:']', charShift:'}', code:"BracketRight"},
    {id:13, char:'\\', charShift:'|', code:"Backslash"}
  ]},
  {row: 2, keys: [
    {id:0, char:'CapsLock', charShift:null, code:"CapsLock"},
    {id:1, char:'a', charShift:'A', code:"KeyA"},
    {id:2, char:'s', charShift:'S', code:"KeyS"},
    {id:3, char:'d', charShift:'D', code:"KeyD"},
    {id:4, char:'f', charShift:'F', code:"KeyF"},
    {id:5, char:'g', charShift:'G', code:"KeyG"},
    {id:6, char:'h', charShift:'H', code:"KeyH"},
    {id:7, char:'j', charShift:'J', code:"KeyJ"},
    {id:8, char:'k', charShift:'K', code:"KeyK"},
    {id:9, char:'l', charShift:'L', code:"KeyL"},
    {id:10, char:';', charShift:':', code:"Semicolon"},
    {id:11, char:"'", charShift:'"', code:"Quote"},
    {id:12, char:'Enter', charShift:null, code:"Enter"}
  ]},
  {row: 3, keys: [
    {id:0, char:'Shift', charShift:null, code:"ShiftLeft"},
    {id:1, char:'z', charShift:'Z', code:"KeyZ"},
    {id:2, char:'x', charShift:'X', code:"KeyX"},
    {id:3, char:'c', charShift:'C', code:"KeyC"},
    {id:4, char:'v', charShift:'V', code:"KeyV"},
    {id:5, char:'b', charShift:'B', code:"KeyB"},
    {id:6, char:'n', charShift:'N', code:"KeyN"},
    {id:7, char:'m', charShift:'M', code:"KeyM"},
    {id:8, char:',', charShift:'<', code:"Comma"},
    {id:9, char:'.', charShift:'>', code:"Period"},
    {id:10, char:'/', charShift:'?', code:"Slash"},
    {id:11, char:'Shift', charShift:null, code:"ShiftRight"}
  ]},
  {row: 4, keys: [
    {id:0, char:'Control', charShift:null, code:"ControlLeft"},
    {id:1, char:'Alt', charShift:null, code:"AltLeft"},
    {id:2, char:' ', charShift:null, code:"Space"},
    {id:3, char:'Alt', charShift:null, code:"AltRight"},
    {id:4, char:'Arrows', charShift:null, code:"Arrows"}
  ]},
];






export default Lesson