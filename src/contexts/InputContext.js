import React, { useContext, useState } from 'react';

const InputContext = React.createContext();
const UpdateInputContext = React.createContext();

export function useInput() {
	return useContext(InputContext);
}

export function useUpdateInput() {
	return useContext(UpdateInputContext);
}

export function InputProvider({ children }) {
	const [input, setInput] = useState(null);

	return (
		<InputContext.Provider value={input}>
			<UpdateInputContext.Provider value={setInput}>
				{children}
			</UpdateInputContext.Provider>
		</InputContext.Provider>
	);
}
