import React from 'react';
import { connect } from 'react-redux';
import Tree from '../components/Tree';
import { getFilteredNodes, isExpanded } from '../reducers/tree';
import { showHideNode, expandAll, collapseAll } from '../actions';

const TreeContainer = ({ root = [], showHideNode, expandAll, collapseAll, isExpanded }) => (
	<Tree
		root={root}
		onClick={showHideNode}
		expandAll={expandAll}
		collapseAll={collapseAll}
		isExpanded={isExpanded} />
)

const mapStateToProps = state => ({
	root: getFilteredNodes(state.tree)
})

const mapDispatchToProps = dispatch => ({
	showHideNode: evt => {
		evt.stopPropagation();
		dispatch(showHideNode(evt.target.innerText || ""))
	},
	expandAll: evt => {
		evt.stopPropagation();
		dispatch(expandAll());
	},
	collapseAll: evt => {
		evt.stopPropagation();
		dispatch(collapseAll());
	},
	isExpanded: node => isExpanded(node)
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TreeContainer);