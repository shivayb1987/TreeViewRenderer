import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Filter extends Component {
	componentDidMount() {
		document.addEventListener('keydown', (ev) => {
			let key;
			let isShift;
			if (window.event) {
				key = window.event.keyCode;
				isShift = !!window.event.shiftKey; // typecast to boolean
			} else {
				key = ev.which;
				isShift = !!ev.shiftKey;
			}
			if (key === 13) { //Enter key;
				this.props.onSubmit(ev);
			}
		});	
	}

	componentWillUnmount() {
		document.removeEventListener('keydown');
	}
	
	render() {
		let { onSubmit } = this.props;
		return (
			<form onSubmit={(e) => {
				e.preventDefault();
				onSubmit(e);
			}}>
				<input 
					type="text" 
					style={{
						"fontSize": "14px",
						"lineHeight": "24px",
						"outline": "none",
						"border": "1px solid rgba(128, 128, 128, 0.58)",
						"width": "175px"}} 
					placeholder="Search Tree"/>
				<input type="submit" value="Search" style={{
					"fontSize": "14px",
					"cursor": "pointer",
					"outline": "none",
					"border": "1px solid",
					"padding": "4px 15px",
					"backgroundColor": "rgba(225, 225, 225, 0.5)"}}/>
			</form>
		);
	}

}

Filter.propTypes = {
	onSubmit: PropTypes.func.isRequired
}

export default Filter;