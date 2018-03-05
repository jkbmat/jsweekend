import {ActionCreator, Dispatch} from 'redux'

import {apiGetFlights} from 'api/flights'

import {getDate, getLocation} from 'store/search/search-selectors'

import {areNotNull} from 'utils/areNotNull'

import {ESearchInputField, TSearchState} from 'store/search/search-defaultState'
import {TStoreState} from 'store/store'
import {ThunkAction} from 'redux-thunk'
import {Moment} from 'moment'
import {TLocation} from 'types/TLocation'
import {TRoute, TRouteRaw} from 'types/TRoute'


export enum EFlightsAction {
	SET_LOADING = '@routes/SET_LOADING',
	SET_OFFSET = '@routes/SET_OFFSET',

	SET_ROUTES = '@routes/SET_ROUTES',
}

export type TFlightsAction = TSetIsLoadingAction | TSetOffsetAction | TSetRoutesAction


export const setRoutes: ActionCreator<TSetRoutesAction> = (payload: TSetRoutesPayload) => ({
	type: EFlightsAction.SET_ROUTES,
	payload,
})

export interface TSetRoutesAction {
	type: EFlightsAction.SET_ROUTES,
	payload: TSetRoutesPayload,
}

export type TSetRoutesPayload = {
	value: Array<TRoute> | null,
}


export const setOffset: ActionCreator<TSetOffsetAction> = (payload: TSetOffestPayload) => ({
	type: EFlightsAction.SET_OFFSET,
	payload,
})

export interface TSetOffsetAction {
	type: EFlightsAction.SET_OFFSET,
	payload: TSetOffestPayload,
}

export type TSetOffestPayload = {
	value: number,
}


export const setIsLoading: (payload: TSetIsLoadingPayload) => TSetIsLoadingAction = (payload) => ({
	type: EFlightsAction.SET_LOADING,
	payload,
})

export interface TSetIsLoadingAction {
	type: EFlightsAction.SET_LOADING,
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

		const route = processRoute((await apiGetFlights({from, to, dateFrom: date, dateTo: date.clone().add(1, 'days')})).data)
		dispatch(setRoutes({value: route}))

		dispatch(setIsLoading({value: false}))


		function processRoute (rawRoute: TRouteRaw): TRoute {
			return rawRoute as TRoute
		}
	}