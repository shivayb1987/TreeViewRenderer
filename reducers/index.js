import { combineReducers } from 'redux'
import tree from './tree';
import filter from './filter';

export default combineReducers({
	tree,
	filter
});

