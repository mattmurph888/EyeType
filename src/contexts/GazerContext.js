import React, { useContext, useState, useEffect } from 'react';

const GazerContext = React.createContext();
const GazeDataContext = React.createContext();
const GazeTimeContext = React.createContext();
const UpdateGazePreviewContext = React.createContext();

export function useGazer() {
	return useContext(GazerContext);
}

export function useGazeData() {
	return useContext(GazeDataContext);
}

export function useGazeTime() {
	return useContext(GazeTimeContext);
}

export function useUpdateGazePreview() {
	return useContext(UpdateGazePreviewContext);
}

export function GazerProvider({ children }) {
	const [gazer, setGazer] = useState(window.webgazer);
	const [gazeData, setGazeData] = useState();
	const [gazeTime, setGazeTime] = useState();
	const [gazePreview, setGazePreview] = useState(false);

	useEffect(() => {
		window.saveDataAcrossSessions = true;
	}, []);

	// when the gaze preview is turned on, move the face box to the center of the screen
	useEffect(() => {
		gazer.showVideo(gazePreview);
		gazer.showPredictionPoints(gazePreview);
		if (gazeData) {
			let w = window.innerWidth;
			let h = window.innerHeight;
			gazer.setVideoViewerSize(w/4,h/4);
			let videoContainer = document.getElementById('webgazerVideoContainer');
			videoContainer.style.top = `${(h-(h/4))/2}px`;
			videoContainer.style.left = `${(w-(w/4))/2}px`;
			console.log('pos ', videoContainer.style.width);
		}
	}, [gazePreview]);

	// the actual set up for webgazer, starts collecting data
	useEffect(() => {
		gazer
			.setGazeListener((data, timestamp) => {
				setGazeData(data);
				setGazeTime(timestamp);
			})
			.begin();
	}, [gazer]);

	return (
		<GazerContext.Provider value={gazer}>
			<GazeDataContext.Provider value={gazeData}>
				<GazeTimeContext.Provider value={gazeTime}>
					<UpdateGazePreviewContext.Provider value={setGazePreview}>
						{children}
					</UpdateGazePreviewContext.Provider>
				</GazeTimeContext.Provider>
			</GazeDataContext.Provider>
		</GazerContext.Provider>
	);
}
