import React, { useState, useEffect } from 'react';
import './App.css';
import Lesson from './Lesson.js';
import LevelList from './LevelList.js';
import Overview from './Overview.js';


/*
Renders the main display for the app
swaps between the home level list display, the level display, and the overview display
*/

function App() {
  const [user, setUser] = useState('Guest');              // user data - eventually connect to database
  const [levelSelected, selectLevel] = useState(null);    // current level selected
  const [lessons, setLessons] = useState(LESSONS);        // holds all of the lesson data- eventually from database
  const [main, setMain] = useState(<LevelList levels={lessons} selectLevel={selectLevel} />); // determains what is displayed below the header
  const [previousData, setPreviousData] = useState(null); // hold the info from the level just played, showed in level overview

  // changes the main display when home button clicked, when a level is selected and when lessons are finished
  useEffect(handleMainChange,[levelSelected, previousData])

  // sets the display for everything under the header
  function handleMainChange() {
    if (levelSelected === null) {
      setMain(<LevelList levels={lessons} selectLevel={selectLevel} />);
    } else {
      if (previousData) {
        console.log("finished");
        setMain(<Overview 
          speed={previousData.speed}
          accuracyInfo={previousData.accuracyInfo}
          time={previousData.time}
        />)
      } else {
        setMain(<Lesson 
          lessons={lessons} 
          setLessons={setLessons}
          levelSelected={levelSelected}
          selectLevel={selectLevel}
          previousData={previousData}
          setPreviousData={setPreviousData}
        />);
      }
    }
  }

  // clears previous lesson data and clears selected level
  function handleHome() {
    setPreviousData(null)
    selectLevel(null);
  }

  return (
    <div className="App">

      <div className="header">
        <button onClick={handleHome} className="header-item header-icon">Home</button>
        <button className="header-item header-settings">settings</button>
        <button className="header-item header-user">{user}</button>
      </div>

      <div className="main-container">
        {main}
      </div>
      
    </div>
  );
}



// lesson data - eventually from database
const LESSONS = [
  {
    id: 1,
    text: "i Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    highScore: 0,
    prevAccuracy: 0,
    speed: 0,
    icon: ":D",
    title: "f & j"
  },
  {
    id: 2,
    text: "i Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    highScore: 0,
    prevAccuracy: 0,
    speed: 0,
    icon: ":D",
    title: "f & j"
  },
  {
    id: 3,
    text: "example text 3",
    highScore: 0,
    prevAccuracy: 0,
    speed: 0,
    icon: ":D",
    title: "f & j"
  },
  {
    id: 4,
    text: "fj",
    highScore: 0,
    prevAccuracy: 0,
    speed: 0,
    icon: ":D",
    title: "f & j"
  }
]


export default App;
