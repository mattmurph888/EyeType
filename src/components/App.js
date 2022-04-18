import React, { useState, useEffect } from 'react';
import './App.css';
import { AccuracyInfoProvider } from '../contexts/AccuracyInfoContext';
import { ColorsProvider } from '../contexts/ColorsContext';
import { IndexInfoProvider } from '../contexts/IndexInfoContext';
import { InputProvider } from '../contexts/InputContext';
import Lesson from './Lesson.js';
import LevelList from './LevelList.js';
import Overview from './Overview.js';
import { GazerProvider } from '../contexts/GazerContext';
import Calibrator from './Calibrator';

/*
notes:

*/

/*
Renders the main display for the app
swaps between the home level list display, the level display, and the overview display
*/

function App() {
	const [calibrating, setCalibrating] = useState(false);
	const [user, setUser] = useState('Guest'); // user data - eventually connect to database
	const [levelSelected, selectLevel] = useState(null); // current level selected
	const [lessons, setLessons] = useState(LESSONS); // holds all of the lesson data- eventually from database
	const [main, setMain] = useState(
		<LevelList
			levels={lessons}
			selectLevel={selectLevel}
		/>
	); // determains what is displayed below the header
	const [previousData, setPreviousData] = useState(null); // hold the info from the level just played, showed in level overview
	const [loaded, setLoaded] = useState(false);

	// changes the main display when home button clicked, when a level is selected and when lessons are finished
	useEffect(handleMainChange, [levelSelected, previousData]);

	// sets the display for everything under the header
	function handleMainChange() {
		console.log(levelSelected);
		if (levelSelected === null) {
			setMain(<LevelList levels={lessons} selectLevel={selectLevel} />);
		} else {
			if (previousData) {
				setMain(
					<Overview
						speed={previousData.speed}
						accuracyInfo={previousData.accuracyInfo}
						time={previousData.time}
						lesson={lessons[levelSelected]}
						maxLesson={lessons.length}
						levelSelected={levelSelected}
						selectLevel={selectLevel}
						setPreviousData={setPreviousData}
					/>
				);
			} else {
				setMain(
					<Lesson
						lessons={lessons}
						setLessons={setLessons}
						levelSelected={levelSelected}
						selectLevel={selectLevel}
						previousData={previousData}
						setPreviousData={setPreviousData}
					/>
				);
			}
		}
	}

	// clears previous lesson data and clears selected level
	function handleHome() {
		setPreviousData(null);
		selectLevel(null);
		setCalibrating(false);
	}

	function toggleCalibrating() {
		console.log('toggled')
		setCalibrating(calibrating => !calibrating);
	}

	useEffect(() => {
		const scriptTag = document.createElement('script');
		scriptTag.src = 'https://webgazer.cs.brown.edu/webgazer.js?';
		scriptTag.addEventListener('load', ()=>setLoaded(true));
		document.body.appendChild(scriptTag);
	}, [])

	if (loaded) {
		return (
			<div className="App">
				<div className="header">
					<button onClick={handleHome} className="header-item header-home">
						Home
					</button>
					<div className="header-item header-level">
						{levelSelected !== null ? lessons[levelSelected].title : null}
					</div>
					<button
						className="header-item header-calibrate"
						onClick={toggleCalibrating}
					>
						calibrate
					</button>
					<button className="header-item header-settings">settings</button>
					<button className="header-item header-user">{user}</button>
				</div>

				<div className="main-container">
					<GazerProvider>
						<InputProvider>
							<IndexInfoProvider>
								<ColorsProvider>
									<AccuracyInfoProvider>
										{calibrating ? <Calibrator setCalibrating={setCalibrating}/> : null}
										{main}
									</AccuracyInfoProvider>
								</ColorsProvider>
							</IndexInfoProvider>
						</InputProvider>
					</GazerProvider>
				</div>
			</div>
		);
	} else {
		return (<>loading</>);
	}
}

// lesson data - eventually from database
const LESSONS = [
	{
		text: 'There is nothing wrong with a life of peace and prosperity. I suggest you think about what it is you want from your life.',
		highScore: 0,
		prevAccuracy: 0,
		speed: 0,
		icon: ':D',
		title: 'Peace and Prosperity',
	},
	{
		text: 'Failure is only the opportunity to begin again.',
		highScore: 0,
		prevAccuracy: 0,
		speed: 0,
		icon: ':D',
		title: 'Failure',
	},
	{
		text: 'Sometimes, the best way to solve your own problems is to help someone else.',
		highScore: 0,
		prevAccuracy: 0,
		speed: 0,
		icon: ':D',
		title: 'Help',
	},
	{
		text: 'It is important to draw wisdom from many different places. If we take it from only one place, it becomes rigid and stale.',
		highScore: 0,
		prevAccuracy: 0,
		speed: 0,
		icon: ':D',
		title: 'Wisdom',
	},
	{
		text: 'Pride is not the opposite of shame, but its source. True humility is the only antidote to shame.',
		highScore: 0,
		prevAccuracy: 0,
		speed: 0,
		icon: ':D',
		title: 'Pride',
	},
	{
		text: 'Life happens wherever you are, whether you make it or not.',
		highScore: 0,
		prevAccuracy: 0,
		speed: 0,
		icon: ':D',
		title: 'Life',
	},
	{
		text: 'In the darkest times, hope is something you give yourself. That is the meaning of inner strength.',
		highScore: 0,
		prevAccuracy: 0,
		speed: 0,
		icon: ':D',
		title: 'Hope',
	},
	{
		text: 'All good things come to an end.',
		highScore: 0,
		prevAccuracy: 0,
		speed: 0,
		icon: ':D',
		title: 'Good Things',
	},
	{
		text: 'fj',
		highScore: 0,
		prevAccuracy: 0,
		speed: 0,
		icon: ':D',
		title: 'test level',
	},
];

export default App;
