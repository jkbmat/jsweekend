import {ActionCreator} from 'redux'

import {TRoute} from 'types/TFlight'


export enum EFlightsAction {
	SET_LOADING = 'SET_LOADING',
	SET_OFFSET = 'SET_OFFSET',

	SET_FLIGHTS = 'SET_FLIGHTS',
}

export type TFlightsAction = TSetIsLoadingAction | TSetOffsetAction | TSetFlightsAction


export const setFlights: ActionCreator<TSetFlightsAction> = (payload: TSetFlightsPayload) => ({
	type: EFlightsAction.SET_FLIGHTS,
	payload,
})

export interface TSetFlightsAction {
	type: EFlightsAction.SET_FLIGHTS,
	payload: TSetFlightsPayload,
}

export type TSetFlightsPayload = {
	value: Array<TRoute> | null,
}


export const setSearchValue: ActionCreator<TSetOffsetAction> = (payload: TSetOffestPayload) => ({
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

