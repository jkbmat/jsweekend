import iassign from 'immutable-assign'

import {defaultState, TGeneralState} from './general-defaultState'
import {EGeneralAction, TGeneralAction} from './general-actions'

export default (state: TGeneralState = defaultState, action: TGeneralAction): TGeneralState => {
	switch (action.type) {
		case EGeneralAction.SET_AIRLINES:
			return iassign(state, (s) => s.data.airlines, () => action.payload.value)

		case EGeneralAction.SET_LOADING:
			let newLoadingLevel = state.ui.loadingLevel

			if (typeof action.payload.value === 'number') {
				newLoadingLevel = action.payload.value
			} else {
				newLoadingLevel = action.payload.value ? newLoadingLevel + 1 : newLoadingLevel - 1
			}

			return iassign(state, (s) => s.ui.loadingLevel, () => newLoadingLevel)


		default:
			return state
	}
}