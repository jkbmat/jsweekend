import * as React from 'react'
import {Provider} from 'react-redux'

import store from 'store/store'

import Header from 'components/general/Header/Header'
import Body from 'components/general/Body/Body'

import './App.css'


export default class App extends React.Component {
	render () {
		return (
			<Provider store={store}>
				<div className='App'>
					<Header/>
					<Body/>
				</div>
			</Provider>
		)
	}
}