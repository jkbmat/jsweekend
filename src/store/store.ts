import {applyMiddleware, combineReducers, compose, createStore} from 'redux'
import thunk from 'redux-thunk'

import searchReducer from 'store/search/search-reducer'
import routesReducer from 'store/routes/routes-reducer'
import generalReducer from 'store/general/general-reducer'

import searchState, {TSearchState} from 'store/search/search-defaultState'
import flightsState, {TRoutesState} from 'store/routes/routes-defaultState'
import generalState, {TGeneralState} from 'store/general/general-defaultState'


const reducer = combineReducers({
	modules: combineReducers({
		search: searchReducer,
		routes: routesReducer,
		general: generalReducer,
	})
})

const defaultState: TStoreState = {
	modules: {
		search: searchState,
		routes: flightsState,
		general: generalState,
	}
}

export interface TStoreState {
	modules: {
		search: TSearchState,
		routes: TRoutesState,
		general: TGeneralState,
	}
}

const w: Window & {__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: any} = window
const composeEnhancers = w.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default createStore(reducer, defaultState, composeEnhancers(applyMiddleware(thunk)))