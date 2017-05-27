import React from 'react';
import PropTypes from 'prop-types';

function renderTree (node, nodeIndex) {
	let { id, description, children = [] } = node;
	let hasChildren = children.length > 0;
	return (
		<ul key={`node-${nodeIndex}-${id}`}>
			<li key={`node-${nodeIndex}-${id}`}>
				<div style={{"color": "cornflowerblue", "fontWeight": "500"}}>{ description }</div>
				{ hasChildren ? (
					children.map(nodeObj => (
						renderTree(nodeObj.node)
					))
				) : "" }
			</li>
		</ul>
	);
}

const Tree = ({ root }) => (
	<div>
		{ root.map(({ node } , i) => renderTree(node, i)) }
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