import {createSelector} from 'reselect'

import {TRoutesState} from './routes-defaultState'

export const getRoutes = (state: TRoutesState) => state.data.routes

export const getIsLoading = (state: TRoutesState) => state.ui.isLoading

export const getOffset = (state: TRoutesState) => state.ui.offset

export const getLimit = (state: TRoutesState) => state.ui.limit


export const getRoutesPaginated = createSelector(
	getRoutes, getOffset, getLimit,
	(routes, offset, limit) => routes === null
		? null
		: routes.slice(offset, offset + limit)
)

export const getNumPages = createSelector(
	getRoutes, getLimit,
	(routes, limit) => routes === null
		? 0
		: Math.ceil(routes.length / limit)
)

export const getPageNumber = createSelector(
	getOffset, getLimit,
	(offset, limit) => Math.floor(offset / limit)
)

