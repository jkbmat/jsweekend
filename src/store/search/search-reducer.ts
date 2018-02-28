import {defaultState, TSearchState} from './search-defaultState'
import {ESearchAction, TSearchAction} from './search-actions'

export default (state: TSearchState = defaultState, action: TSearchAction): TSearchState => {
	switch (action.type) {
		case ESearchAction.SET_VALUE:
			return {...state, data: {...state.data, [action.payload.field]: {...state.data[action.payload.field], value: action.payload.value}}}

		case ESearchAction.SET_SUGGESTIONS:
			return {...state, data: {...state.data, [action.payload.field]: {...state.data[action.payload.field], suggestions: action.payload.value}}}

		case ESearchAction.SET_LOADING:
			return {...state, ui: {...state.ui, [action.payload.field]: {...state.ui[action.payload.field], isLoading: action.payload.value}}}

		default:
			return state
	}
}