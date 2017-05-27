import { RECEIVE_TREE, FILTER_VIEW } from '../constants/ActionTypes';

const filter = (root, str) => {
	// if (!!node.description.match(str)) {
	// 	node["show"] = true;
	// 	return [node];
	// } else {
	// 	node["show"] = false;
	// }

	// if (!node.children.length) {
	// 	node["show"] = false;
	// 	return [];
	// }
	
	// for (let i=0; i<node.children.length; i++) {
	// 	let child = node.children[i];
	// 	let { node: { description }} = child;
	// 	let result = filter(child, str);
	// 	if (result && result.length) {
	// 		result["show"] = true;
	// 	} else {
	// 		result["show"] = false;
	// 	}
	// }
	// if (node["show"] === void 0) {
	// 	node["show"] = false;
	// }
	// return [node];
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

const tree = (state = [], action) => {
	switch (action.type) {
		case RECEIVE_TREE:
			return [
				...state,
				...action.tree.tree
			];
		case FILTER_VIEW:
			let { filterText } = action;
			// if (filterText !== 0 && !filterText) {
			// 	return state;
			// }
			let stateCopy = state.slice();
			let root = { "node": { id: "0", description: "root", children: stateCopy }};
			filter(root, filterText);
			// result = result.filter(arr => !!arr.length).map(arr => ({ "node": arr[0] }));
			return stateCopy;
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
	
	for (let i=0; i<node.children.length; i++) {
		let child = node.children[i];
		let { node: { description }} = child;
		let result = findFilteredNodes(child);
		if (result && result.length) {
			return result;
		}
	}
	return [];
};

export const getFilteredNodes = state => {
	let tree = {"node": {id: "0", description: "root", children: state}};
	let result = state.map(node => findFilteredNodes(node));
	return result.filter(arr => !!arr.length).map(arr => ({ "node": arr[0] }));
}

export default tree;