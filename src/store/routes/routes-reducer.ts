import iassign from 'immutable-assign'

import {defaultState, TRoutesState} from './routes-defaultState'
import {EFlightsAction, TFlightsAction} from './routes-actions'

export default (state: TRoutesState = defaultState, action: TFlightsAction): TRoutesState => {
	switch (action.type) {
		case EFlightsAction.SET_ROUTES:
			return iassign(state, (s) => s.data.routes, () => action.payload.value)

		case EFlightsAction.SET_OFFSET:
			return iassign(state, (s) => s.ui.offset, () => action.payload.value)

		case EFlightsAction.SET_LOADING:
			return iassign(state, (s) => s.ui.isLoading, () => action.payload.value)


		default:
			return state
	}
}