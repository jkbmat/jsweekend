import {applyMiddleware, combineReducers, compose, createStore} from 'redux'
import thunk from 'redux-thunk'

import searchReducer from 'store/search/search-reducer'
import routesReducer from 'store/routes/routes-reducer'

import searchState, {TSearchState} from 'store/search/search-defaultState'
import flightsState, {TRoutesState} from 'store/routes/routes-defaultState'


const reducer = combineReducers({
	modules: combineReducers({
		search: searchReducer,
		routes: routesReducer,
	})
})

const defaultState: TStoreState = {
	modules: {
		search: searchState,
		routes: flightsState,
	}
}

export interface TStoreState {
	modules: {
		search: TSearchState,
		routes: TRoutesState,
	}
}

const w: Window & {__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: any} = window
const composeEnhancers = w.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default createStore(reducer, defaultState, composeEnhancers(applyMiddleware(thunk)))