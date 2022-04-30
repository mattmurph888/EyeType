import React, { useContext, useState } from 'react';

const HasCalibratedContext = React.createContext();
const UpdateHasCalibratedContext = React.createContext();

export function useHasCalibrated() {
	return useContext(HasCalibratedContext);
}

export function useUpdateHasCalibrated() {
	return useContext(UpdateHasCalibratedContext);
}

export function HasCalibratedProvider({ children }) {
	const [hasCalibrated, setHasCalibrated] = useState(false);

	return (
		<HasCalibratedContext.Provider value={hasCalibrated}>
			<UpdateHasCalibratedContext.Provider value={setHasCalibrated}>
				{children}
			</UpdateHasCalibratedContext.Provider>
		</HasCalibratedContext.Provider>
	);
}