import {ActionCreator, Dispatch} from 'redux'

import {apiGetAirlines} from 'api/airlines'

import {TSearchState} from 'store/search/search-defaultState'
import {TStoreState} from 'store/store'
import {ThunkAction} from 'redux-thunk'
import {TAirline} from 'types/TAirline'


export enum EGeneralAction {
	SET_AIRLINES = '@general/SET_AIRLINES',

	SET_LOADING = '@general/SET_LOADING',
}

export type TGeneralAction = TSetAirlinesAction | TSetIsLoadingAction


export const setAirlines: ActionCreator<TSetAirlinesAction> = (payload: TSetAirlinesPayload) => ({
	type: EGeneralAction.SET_AIRLINES,
	payload,
})

export interface TSetAirlinesAction {
	type: EGeneralAction.SET_AIRLINES,
	payload: TSetAirlinesPayload,
}

export type TSetAirlinesPayload = {
	value: Array<TAirline>,
}


export const setIsLoading: ActionCreator<TSetIsLoadingAction> = (payload: TSetIsLoadingPayload) => ({
	type: EGeneralAction.SET_LOADING,
	payload,
})

export interface TSetIsLoadingAction {
	type: EGeneralAction.SET_LOADING,
	payload: TSetIsLoadingPayload,
}

export type TSetIsLoadingPayload = {
	value: boolean | number,
}


export const loadAirlines: () => ThunkAction<Promise<TSetAirlinesAction>, TStoreState, void> = () =>
	async (dispatch: Dispatch<TSearchState>) => {
		const airlines = await apiGetAirlines()

		return dispatch(setAirlines({value: airlines.map((airline) => ({
			code: airline.id,
			name: airline.name,
		}))}))
	}