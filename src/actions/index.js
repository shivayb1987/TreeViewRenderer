import server from '../api/server';
import * as types from '../constants/ActionTypes';

const receiveTree = tree => ({
	type: types.RECEIVE_TREE,
	tree
})

export const getTree = () => (dispatch) => {
	server.getTree(tree => {
		dispatch(receiveTree(tree));
	});
}

export const filterView = filter => ({
	type: types.FILTER_VIEW,
	filterText: filter
})

export const showHideNode = nodeName => ({
	type: types.TOGGLE_NODE,
	nodeName
})

export const expandAll = () => ({
	type: types.EXPAND_ALL
})

export const collapseAll = () => ({
	type: types.COLLAPSE_ALL
})