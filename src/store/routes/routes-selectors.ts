import {createSelector} from 'reselect'

import {TRoutesState} from './routes-defaultState'

export const getRoutes = (state: TRoutesState) => state.data.routes

export const getIsLoading = (state: TRoutesState) => state.ui.isLoading

export const getOffset = (state: TRoutesState) => state.ui.offset

export const getLimit = (state: TRoutesState) => state.ui.limit


export const getFlightsPaginated = createSelector(
	getRoutes, getOffset, getLimit,
	(flights, offset, limit) => flights === null
		? null
		: flights.slice(offset, offset + limit)
)