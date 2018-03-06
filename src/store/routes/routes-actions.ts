import {ActionCreator, Dispatch} from 'redux'
import * as moment from 'moment'

import {apiGetFlights} from 'api/flights'

import {getDate, getLocation} from 'store/search/search-selectors'

import {areNotNull} from 'utils/areNotNull'

import {ESearchInputField, TSearchState} from 'store/search/search-defaultState'
import {TStoreState} from 'store/store'
import {ThunkAction} from 'redux-thunk'
import {Moment} from 'moment'
import {TAirport, TLocation} from 'types/TLocation'
import {TRoute, TFlightsRaw, TFlight} from 'types/TRoute'
import {apiGetLocation} from 'api/location'


export enum ERoutesAction {
	SET_LOADING = '@@@routes/SET_LOADING',
	SET_OFFSET = '@@routes/SET_OFFSET',

	SET_ROUTES = '@@routes/SET_ROUTES',
}

export type TRoutesAction = TSetIsLoadingAction | TSetOffsetAction | TSetRoutesAction


export const setRoutes: ActionCreator<TSetRoutesAction> = (payload: TSetRoutesPayload) => ({
	type: ERoutesAction.SET_ROUTES,
	payload,
})

export interface TSetRoutesAction {
	type: ERoutesAction.SET_ROUTES,
	payload: TSetRoutesPayload,
}

export type TSetRoutesPayload = {
	value: Array<TRoute> | null,
}


export const setOffset: ActionCreator<TSetOffsetAction> = (payload: TSetOffestPayload) => ({
	type: ERoutesAction.SET_OFFSET,
	payload,
})

export interface TSetOffsetAction {
	type: ERoutesAction.SET_OFFSET,
	payload: TSetOffestPayload,
}

export type TSetOffestPayload = {
	value: number,
}


export const setIsLoading: (payload: TSetIsLoadingPayload) => TSetIsLoadingAction = (payload) => ({
	type: ERoutesAction.SET_LOADING,
	payload,
})

export interface TSetIsLoadingAction {
	type: ERoutesAction.SET_LOADING,
	payload: TSetIsLoadingPayload,
}

export type TSetIsLoadingPayload = {
	value: boolean,
}


export const loadFlights: () => ThunkAction<void, TStoreState, void> = () =>
	async (dispatch: Dispatch<TSearchState>, getState: () => TStoreState) => {
		const searchState = getState().modules.search

		let from = getLocation(searchState, ESearchInputField.FROM) as TLocation
		let to = getLocation(searchState, ESearchInputField.TO) as TLocation
		let date = getDate(searchState, null) as Moment

		if (!areNotNull(from, to, date)) {
			throw new Error('Could not find routes: Search values are invalid.')
		}

		dispatch(setIsLoading({value: true}))

		const route = await processRoutes(await apiGetFlights({from, to, dateFrom: date, dateTo: date.clone().add(1, 'days')}), getState())
		dispatch(setRoutes({value: route}))

		dispatch(setIsLoading({value: false}))
	}

async function processRoutes (rawRoutes: TFlightsRaw, state: TStoreState): Promise<Array<TRoute>> {
	const ret = [] as Array<TRoute>

	const airportCache: Map<string, Promise<TAirport>> = new Map()

	const airlines = state.modules.general.data.airlines
	const airportPromises = [] as Array<Promise<void>>
	const data = rawRoutes.data

	if (airlines === null) {
		throw new Error('Could not process flights: Airlines are not loaded.')
	}

	const routePromises = data.map((rawRoute) => {
		const route = {} as TRoute

		route.price = rawRoute.price
		route.flights = []

		rawRoute.route.forEach((rawFlight) => {
			const flight = {} as TFlight
			route.flights.push(flight)

			const airline = airlines.find((a) => a.code === rawFlight.airline)
			if (airline === undefined) {
				throw new Error(`Could not process flights: Airline ${rawFlight.airline} does not exist.`)
			}

			flight.airline = airline
			flight.departureTime = moment(rawFlight.dTimeUTC)
			flight.arrivalTime = moment(rawFlight.aTimeUTC)

			airportPromises.push(new Promise((resolve) => {
				if (airportCache.has(rawFlight.flyFrom)) {
					(airportCache.get(rawFlight.flyFrom) as Promise<TAirport>).then((airport) => {
						flight.fromAirport = airport

						resolve()
					})

					return
				}

				const locationPromise = apiGetLocation(rawFlight.flyFrom).then((airport) => {
					if (!airport.locations || !airport.locations.length) {
						throw new Error(`Could not process flights: Airport ${rawFlight.flyFrom} does not exist.`)
					}

					return airport.locations[0] as TAirport
				})

				airportCache.set(rawFlight.flyFrom, locationPromise)

				locationPromise.then((airport) => {
					flight.fromAirport = airport

					return resolve()
				})
			}))

			airportPromises.push(new Promise((resolve) => {
				if (airportCache.has(rawFlight.flyTo)) {
					(airportCache.get(rawFlight.flyTo) as Promise<TAirport>).then((airport) => {
						flight.toAirport = airport

						resolve()
					})

					return
				}

				const locationPromise = apiGetLocation(rawFlight.flyTo).then((airport) => {
					if (!airport.locations || !airport.locations.length) {
						throw new Error(`Could not process flights: Airport ${rawFlight.flyTo} does not exist.`)
					}

					return airport.locations[0] as TAirport
				})

				airportCache.set(rawFlight.flyTo, locationPromise)

				locationPromise.then((airport) => {
					flight.toAirport = airport

					return resolve()
				})
			}))
		})

		return Promise.all(airportPromises).then(() => {
			ret.push(route)
		})
	})

	await Promise.all(routePromises)

	return ret
}