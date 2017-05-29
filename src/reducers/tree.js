import { RECEIVE_TREE, 
	FILTER_VIEW, 
	TOGGLE_NODE, 
	EXPAND_ALL, 
	COLLAPSE_ALL } from '../constants/ActionTypes';

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
	});
}

const markShown = (nodes = [], flag) => {
	nodes.forEach(({ node }) => {
		node["hide"] = flag;
		node.children.forEach((child) => markShown([child], flag))
	});
}

const findSubtree = ({ node }, nodeName) => {
	if (node.description === nodeName) {
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
		case EXPAND_ALL:
			let expandState = state.slice();
			expandState.forEach(({node }) => markShown(node.children, false));
			return expandState;
		case COLLAPSE_ALL:
			let collapseState = state.slice();
			collapseState.forEach(({node }) => markShown(node.children, true));
			return collapseState;
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

export const isExpanded = state => {
	for (let i=0; i<state.children.length; i++) {
		let { node } = state.children[i];
		if (node["hide"]) {
			return false;
		}
	}
	return true;
}

export default tree;