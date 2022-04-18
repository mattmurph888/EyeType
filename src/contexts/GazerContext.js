import React, { useContext, useState, useEffect } from 'react';

const GazerContext = React.createContext();
const GazeDataContext = React.createContext();
const GazeTimeContext = React.createContext();

export function useGazer() {
	return useContext(GazerContext)
}

export function useGazeData() {
	return useContext(GazeDataContext);
}

export function useGazeTime() {
	return useContext(GazeTimeContext);
}

export function GazerProvider({ children }) {
	const [gazer, setGazer] = useState(window.webgazer);
	const [gazeData, setGazeData] = useState();
	const [gazeTime, setGazeTime] = useState();
	window.saveDataAcrossSessions = true;

	useEffect(() => {
		// setGazer(window.webgazer);
		console.log(gazer);
		gazer
			.setGazeListener((data, timestamp) => {
				setGazeData(data);
				setGazeTime(timestamp);
			})
			.begin();
	}, [gazer]);

	gazer.showVideoPreview(false);

	return (
		<GazerContext.Provider value={gazer}>
				<GazeDataContext.Provider value={gazeData}>
					<GazeTimeContext.Provider value={gazeTime}>
						{children}
					</GazeTimeContext.Provider>
				</GazeDataContext.Provider>
		</GazerContext.Provider>
	);
}
