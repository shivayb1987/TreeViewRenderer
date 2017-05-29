import { RECEIVE_TREE, FILTER_VIEW, TOGGLE_NODE } from '../constants/ActionTypes';

const filter = (root, str) => {
	function setFlag ({ node }) {
		callback(node, str);
		node.children.forEach(setFlag);
	}

	setFlag(root)
}

const callback = (node, str) => {
	if (node.description.match(str)) {
		node["shown"] = true;
	} else {
		node["shown"] = false;
	}
}

const filter2 = ({ node }, str) => {
	return node.children.map(child => filter(child, str));
}

const markNodesHidden = nodes => {
	nodes.forEach(({ node }) => {
		node["hide"] = !node["hide"];
		// node["highlight"] = !node["highlight"];
	});
}

const findSubtree = ({ node }, nodeName) => {
	if (node.description === nodeName) {
		// node["highlight"] = true;
		markNodesHidden(node.children);
		return;
	}
	node["highlight"] = false;
	for (let i=0; i<node.children.length; i++) {
		let child = node.children[i];
		let { node: {description } } = child;
		if (description === nodeName) {
			markNodesHidden(child.node.children);
			return;
		}
		findSubtree(child, nodeName);
	}
};

const tree = (state = [], action) => {
	switch (action.type) {
		case RECEIVE_TREE:
			return [
				...state,
				...action.tree.tree
			];
		case FILTER_VIEW:
			let { filterText } = action;
			let stateCopy = state.slice();
			let root = { "node": { id: "0", description: "root", children: stateCopy }};
			filter(root, filterText);
			return stateCopy;
		case TOGGLE_NODE:
			let { nodeName } = action;
			let newState = state.slice();
			newState.forEach(node => findSubtree(node, nodeName));
			return newState;
		default:
			return state;
	}
};

const findFilteredNodes = ({ node }) => {
	if (node["shown"] === void 0 || !!node["shown"]) {
		return [node];
	}

	if (!node.children.length) {
		return [];
	}
	
	let nodes = [];
	for (let i=0; i<node.children.length; i++) {
		let child = node.children[i];
		let { node: { description }} = child;
		let result = findFilteredNodes(child);
		if (result && result.length) {
			nodes.push.apply(nodes, result);
		}
	}
	return nodes;
};

export const getFilteredNodes = state => {
	let tree = {"node": {id: "0", description: "root", children: state}};
	let result = state.map(node => findFilteredNodes(node));
	let filteredArr = result.filter(arr => !!arr.length);
	let nodes = [];
	filteredArr.forEach(nodeArr => {
		nodes.push(...nodeArr.map(arr => ({ "node": arr })));
	})
	return nodes;
}

export default tree;