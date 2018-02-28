import {TLocation} from 'types/TLocation'
import {ActionCreator} from 'redux'

export enum ESearchAction {
	SET_LOADING = 'SET_LOADING',

	SET_VALUE = 'SET_VALUE',
	SET_SUGGESTIONS = 'SET_SUGGESTIONS',
}

export type TSearchAction = TSetValueAction | TSetSuggestionsAction | TSetIsLoadingAction


export const setValue: ActionCreator<TSetValueAction> = (payload: TSetValuePayload) => ({
	type: ESearchAction.SET_VALUE,
	payload,
})

export interface TSetValueAction {
	type: ESearchAction.SET_VALUE,
	payload: TSetValuePayload,
}

export type TSetValuePayload = {
	field: 'to' | 'from'
	value: string,
}


export const setSuggestions: ActionCreator<TSetSuggestionsAction> = (payload: TSetSuggestionsPayload) => ({
	type: ESearchAction.SET_SUGGESTIONS,
	payload,
})

export interface TSetSuggestionsAction {
	type: ESearchAction.SET_SUGGESTIONS,
	payload: TSetSuggestionsPayload,
}

export type TSetSuggestionsPayload = {
	field: 'to' | 'from'
	value: Array<TLocation>,
}


export const setIsLoading: ActionCreator<TSetIsLoadingAction> = (payload: TSetIsLoadingPayload) => ({
	type: ESearchAction.SET_LOADING,
	payload,
})

export interface TSetIsLoadingAction {
	type: ESearchAction.SET_LOADING,
	payload: TSetIsLoadingPayload,
}

export type TSetIsLoadingPayload = {
	field: 'to' | 'from'
	value: boolean,
}

