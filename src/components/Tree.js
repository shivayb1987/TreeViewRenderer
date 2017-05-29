import React from 'react';
import PropTypes from 'prop-types';

function renderTree (node, nodeIndex, onClick) {
	let { id, description, children = [], hide = false, highlight = false } = node;
	let hasChildren = children.length > 0;
	return (
		<ul style={{ "display": hide ? "none": "block", "cursor": children.length ? "pointer": "default" }} key={`node-${nodeIndex}-${id}`} 
			onClick={onClick}>
			<li key={`node-${nodeIndex}-${id}`}>
				<div style={{"color": "cornflowerblue", "fontWeight": "500"}}>{ description }</div>
				{ hasChildren ? (
					children.map(nodeObj => (
						renderTree(nodeObj.node, nodeIndex, onClick)
					))
				) : "" }
			</li>
		</ul>
	);
}

const Tree = ({ root, onClick }) => (
	<div>
		{ root.map(({ node } , i) => renderTree(node, i, onClick)) }
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