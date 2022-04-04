import React, {useState, useEffect, useRef} from 'react';

function Key({id, char, charShift, code, inputCodes, colors, setColors}) {

  const keyRef = useRef();                    // key div element
  const keyColor = useRef(colors.curColor);   // key background color

  // handles keyboard animations on key presses
  useEffect(() => {
    if (inputCodes.includes(code)) {
      keyRef.current.style.transition = "none";
      keyRef.current.style.backgroundColor = colors.curColor;
      keyRef.current.style.transform = "translateY(1px)";
    } else {
      keyRef.current.style.transition = "background-color 0.5s";
      keyRef.current.style.backgroundColor = "white";
      keyRef.current.style.transform = "translateY(0px)";
    }
  }, [inputCodes][colors]);

  return (
    <div ref={keyRef} className={`keyboard-key ${code}`}>
      <div>{charShift}</div>
      <div>{code.slice(0,3)==="Key" ? null : char}</div>
    </div>
  )
}

export default Key