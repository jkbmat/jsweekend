import {createSelector} from 'reselect'

import {TFlightsState} from './flights-defaultState'

export const getFlights = (state: TFlightsState) => state.data.flights

export const getIsLoading = (state: TFlightsState) => state.ui.isLoading

export const getOffset = (state: TFlightsState) => state.ui.offset

export const getLimit = (state: TFlightsState) => state.ui.limit


export const getFlightsPaginated = createSelector(
	getFlights, getOffset, getLimit,
	(flights, offset, limit) => flights === null
		? null
		: flights.slice(offset, offset + limit)
)