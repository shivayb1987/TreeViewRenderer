import React from 'react';
import TreeContainer from './TreeContainer';
import FilterContainer from './FilterContainer';

const App = () => {
	return (
		<div style={{
				"marginLeft": "100px",
			    "marginTop": "50px"}}>
			<FilterContainer/>
			<TreeContainer/>
		</div>
	);
};

export default App;