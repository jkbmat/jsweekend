import iassign from 'immutable-assign'

import {defaultState, TSearchState} from './search-defaultState'
import {ESearchAction, TSearchAction} from './search-actions'

export default (state: TSearchState = defaultState, action: TSearchAction): TSearchState => {
	switch (action.type) {
		case ESearchAction.SET_VALUE:
			return iassign(state, (s) => s.data[action.payload.field].value, () => action.payload.value)

		case ESearchAction.SET_SEARCH_VALUE:
			return iassign(state, (s) => s.data[action.payload.field].searchValue, () => action.payload.value)

		case ESearchAction.SET_SUGGESTIONS:
			return iassign(state, (s) => s.data[action.payload.field].suggestions, () => action.payload.value)

		case ESearchAction.SET_LOADING:
			return iassign(state, (s) => s.ui[action.payload.field].isLoading, () => action.payload.value)

		case ESearchAction.SET_SELECTED_SUGGESTION:
			return iassign(state, (s) => s.ui[action.payload.field].selectedSuggestion, () => action.payload.value)

		default:
			return state
	}
}