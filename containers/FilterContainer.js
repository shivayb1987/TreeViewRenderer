import React from 'react';
import { connect } from 'react-redux';
import { filterView } from '../actions';
import Filter from '../components/Filter';

const FilterContainer = ({onSubmit}) => (
	<Filter 
		onSubmit={onSubmit}/>
)

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
	onSubmit: evt => {
		let inputField = evt.target.querySelector('input');
		let filterText = !!inputField ? inputField.value : "";
		filterText = filterText.replace(/[*$?^&]/g, '');
		dispatch(filterView(filterText));
	}
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(FilterContainer);