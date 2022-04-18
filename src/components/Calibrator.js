import React, {useEffect, useState} from "react";

function Calibrator({setCalibrating}) {

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [num, setNum] = useState(6);
 
  useEffect(() => {
    randomLocation();
  }, [])

  function randomLocation() {
    if (num > 1) {
      let minHeight = 25;
      let maxHeight = window.innerHeight;
      let buttonHeight = 30;
      let maxWidth = window.innerWidth;
      let buttonWidth = 30;
      setX(Math.random() * (maxWidth-buttonWidth));
      setY(Math.random() * (maxHeight-minHeight-buttonHeight));
      setNum(num => num-1)
    } else {
      setCalibrating(false);
    }
  }

  return (
    <div className="calibrator">
      <button onClick={randomLocation} className="calibrate-button" style={{top:y, right:x}}>Click Me<br/>{num}</button> 
    </div>
  )
}

export default Calibrator;
