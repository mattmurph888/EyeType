import React, { useContext, useState } from 'react';

const AccuracyInfoContext = React.createContext();
const UpdateAccuracyInfoContext = React.createContext();

export function useAccuracyInfo() {
	return useContext(AccuracyInfoContext);
}

export function useUpdateAccuracyInfo() {
	return useContext(UpdateAccuracyInfoContext);
}

export function AccuracyInfoProvider({ children }) {
	const [accuracyInfo, setAccuracyInfo] = useState({
		numCorrect: 0,
		numTotal: 0,
		accuracy: 'Start!!!',
	});

	return (
		<AccuracyInfoContext.Provider value={accuracyInfo}>
			<UpdateAccuracyInfoContext.Provider value={setAccuracyInfo}>
				{children}
			</UpdateAccuracyInfoContext.Provider>
		</AccuracyInfoContext.Provider>
	);
}