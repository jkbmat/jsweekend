import iassign from 'immutable-assign'

import {defaultState, TRoutesState} from './routes-defaultState'
import {ERoutesAction, TRoutesAction} from './routes-actions'

export default (state: TRoutesState = defaultState, action: TRoutesAction): TRoutesState => {
	switch (action.type) {
		case ERoutesAction.SET_ROUTES:
			return iassign(state, (s) => s.data.routes, () => action.payload.value)

		case ERoutesAction.SET_OFFSET:
			return iassign(state, (s) => s.ui.offset, () => action.payload.value)

		case ERoutesAction.SET_LOADING:
			return iassign(state, (s) => s.ui.isLoading, () => action.payload.value)


		default:
			return state
	}
}