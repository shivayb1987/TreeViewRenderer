import React from 'react';
import { connect } from 'react-redux';
import Tree from '../components/Tree';
import { getFilteredNodes } from '../reducers/tree';

const TreeContainer = ({ root = [] }) => (
	<Tree
		root={root}/>
)

const mapStateToProps = state => ({
	root: getFilteredNodes(state.tree)
})

const mapDispatchToProps = dispatch => ({})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TreeContainer);