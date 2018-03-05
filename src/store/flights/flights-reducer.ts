import iassign from 'immutable-assign'

import {defaultState, TFlightsState} from './flights-defaultState'
import {EFlightsAction, TFlightsAction} from './flights-actions'

export default (state: TFlightsState = defaultState, action: TFlightsAction): TFlightsState => {
	switch (action.type) {
		case EFlightsAction.SET_FLIGHTS:
			return iassign(state, (s) => s.data.flights, () => action.payload.value)

		case EFlightsAction.SET_OFFSET:
			return iassign(state, (s) => s.ui.offset, () => action.payload.value)

		case EFlightsAction.SET_LOADING:
			return iassign(state, (s) => s.ui.isLoading, () => action.payload.value)


		default:
			return state
	}
}