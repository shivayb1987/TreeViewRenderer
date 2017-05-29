import React from 'react';
import { connect } from 'react-redux';
import Tree from '../components/Tree';
import { getFilteredNodes } from '../reducers/tree';
import { showHideNode } from '../actions';

const TreeContainer = ({ root = [], showHideNode }) => (
	<Tree
		root={root}
		onClick={showHideNode}/>
)

const mapStateToProps = state => ({
	root: getFilteredNodes(state.tree)
})

const mapDispatchToProps = dispatch => ({
	showHideNode: evt => {
		evt.stopPropagation();
		dispatch(showHideNode(evt.target.innerText || ""))
	}
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TreeContainer);