import React, { useContext, useState } from 'react';

const ColorsContext = React.createContext();
const UpdateColorsContext = React.createContext();

export function useColors() {
	return useContext(ColorsContext);
}

export function useUpdateColors() {
	return useContext(UpdateColorsContext);
}

export function ColorsProvider({ children }) {
	const [colors, setColors] = useState({
		red: 'rgba(230, 92, 92, 0.7)',
		yellow: 'rgba(223, 230, 92, 0.7)',
		green: 'rgba(99, 230, 92, 0.7)',
		curColor: null,
	});

	return (
		<ColorsContext.Provider value={colors}>
			<UpdateColorsContext.Provider value={setColors}>
				{children}
			</UpdateColorsContext.Provider>
		</ColorsContext.Provider>
	);
}