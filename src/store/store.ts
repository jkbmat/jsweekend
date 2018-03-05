import {applyMiddleware, combineReducers, compose, createStore} from 'redux'
import thunk from 'redux-thunk'

import searchReducer from 'store/search/search-reducer'
import flightsReducer from 'store/flights/flights-reducer'

import searchState, {TSearchState} from 'store/search/search-defaultState'
import flightsState, {TFlightsState} from 'store/flights/flights-defaultState'


const reducer = combineReducers({
	modules: combineReducers({
		search: searchReducer,
		flights: flightsReducer,
	})
})

const defaultState = {
	modules: {
		search: searchState,
		flights: flightsState,
	}
}

export interface TStoreState {
	modules: {
		search: TSearchState,
		flights: TFlightsState,
	}
}

const w: Window & {__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: any} = window
const composeEnhancers = w.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default createStore(reducer, defaultState, composeEnhancers(applyMiddleware(thunk)))