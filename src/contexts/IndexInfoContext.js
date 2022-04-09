import React, { useContext, useState } from 'react';

const IndexInfoContext = React.createContext();
const UpdateIndexInfoContext = React.createContext();

export function useIndexInfo() {
	return useContext(IndexInfoContext);
}

export function useUpdateIndexInfo() {
	return useContext(UpdateIndexInfoContext);
}

export function IndexInfoProvider({ children }) {
	const [indexInfo, setIndexInfo] = useState({
		rowIndex: 0,
		wordIndex: 0,
		letterIndex: 0,
	});

	return (
		<IndexInfoContext.Provider value={indexInfo}>
			<UpdateIndexInfoContext.Provider value={setIndexInfo}>
				{children}
			</UpdateIndexInfoContext.Provider>
		</IndexInfoContext.Provider>
	);
}
