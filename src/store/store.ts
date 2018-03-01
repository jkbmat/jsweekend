import {combineReducers, createStore} from 'redux'

import searchReducer from 'store/search/search-reducer'

import searchState, {TSearchState} from 'store/search/search-defaultState'


const reducer = combineReducers({
	modules: combineReducers({
		search: searchReducer,
	})
})

const defaultState = {
	modules: {
		search: searchState,
	}
}

export interface TStoreState {
	modules: {
		search: TSearchState,
	}
}

const w: Window & {__REDUX_DEVTOOLS_EXTENSION__?: any} = window

export default createStore(reducer, defaultState, w.__REDUX_DEVTOOLS_EXTENSION__ && w.__REDUX_DEVTOOLS_EXTENSION__())