import React from 'react';
import PropTypes from 'prop-types';

function renderTree (node, nodeIndex, onClick, isExpanded) {
	let { id, description, children = [], hide = false, highlight = false } = node;
	let hasChildren = children.length > 0;
	let expanded = isExpanded(node);
	return (
		<ul style={{ "display": hide ? "none": "block",
			"cursor": children.length ? "pointer": "default" }} key={`node-${nodeIndex}-${id}`} 
			onClick={onClick}>
			<li key={`node-${nodeIndex}-${id}`}>
				<div style={{"color": expanded ? "" : "cornflowerblue", "fontWeight": "500"}}>{ description }</div>
				{ hasChildren ? (
					children.map(nodeObj => (
						renderTree(nodeObj.node, nodeIndex, onClick, isExpanded)
					))
				) : "" }
			</li>
		</ul>
	);
}

const Tree = ({ root, onClick, expandAll, collapseAll, isExpanded }) => (
	<div>
		<div style={{"margin": "10px 0 0 0",
			"fontSize": "11px",
			"fontStyle": "italic",
			"color": "cornflowerblue",
			"cursor": "pointer"}}>
			<span onClick={expandAll}>Expand All</span>&nbsp; &nbsp;&nbsp; &nbsp;
			<span onClick={collapseAll}>Collapse All</span>
		</div>
		{ root.map(({ node } , i) => renderTree(node, i, onClick, isExpanded)) }
	</div>
)

Tree.propTypes = {
	node: PropTypes.shape({
		id: PropTypes.string,
		description: PropTypes.string,
		children: PropTypes.array
	})
}

export default Tree;