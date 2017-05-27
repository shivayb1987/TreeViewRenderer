import { FILTER_VIEW } from '../constants/ActionTypes';

const filter = (state = {}, action) => {
	switch (action.type) {
		case FILTER_VIEW:
			return state;
		default: 
			return state;
	}
}

export default filter;