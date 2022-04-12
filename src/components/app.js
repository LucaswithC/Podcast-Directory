import { h } from 'preact';
import { Router } from 'preact-router';
import createStore from "redux-zero";
import { Provider, connect } from "redux-zero/react";
import { hasTouch } from 'detect-touch';

import store from "../components/redux/store"

import Header from './header.js';
import Footer from './footer.js';

// Code-splitting is automated for `routes` directory
import Home from '../routes/home';
import Details from './Details.js';

const App = () => { return (
	typeof window !== 'undefined' && 
	<Provider store={store}>
	<div id="app" class={hasTouch && "touch-device"}>
		{/* <Header /> */}
		<Router>
			<Home path="/" />
		</Router>
		<Details />
		<Footer />
	</div>
	</Provider>
)}

export default App;
