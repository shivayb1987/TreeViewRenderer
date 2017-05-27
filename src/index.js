import React from 'react';
import { render } from 'react-dom'
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createLogger from 'redux-logger';
import reducer from './reducers';
import { getTree } from './actions';
import App from './containers/App';

let middlewares = [ thunk ];
if (process.env.NODE_ENV !== "production") {
	middlewares.push(createLogger());
}
const store = createStore(
	reducer, 
	applyMiddleware(...middlewares)
);

store.dispatch(getTree());

render(
	<Provider store={store}>
		<App/>
	</Provider>,
	document.getElementById('root')
);