import {TLocation} from 'types/TLocation'
import {ActionCreator} from 'redux'

export enum ESearchAction {
	SET_LOADING = 'SET_LOADING',
	SET_SELECTED_SUGGESTION = 'SET_SELECTED_SUGGESTION',

	SET_LOCATION = 'SET_LOCATION',
	SET_SEARCH_VALUE = 'SET_SEARCH_VALUE',
	SET_SUGGESTIONS = 'SET_SUGGESTIONS',
}

export type TSearchAction = TSetValueAction | TSetSearchValueAction | TSetSuggestionsAction | TSetIsLoadingAction
	| TSetSelectedSuggestionAction


export const setValue: ActionCreator<TSetValueAction> = (payload: TSetValuePayload) => ({
	type: ESearchAction.SET_LOCATION,
	payload,
})

export interface TSetValueAction {
	type: ESearchAction.SET_LOCATION,
	payload: TSetValuePayload,
}

export type TSetValuePayload = {
	field: 'to' | 'from'
	value: TLocation | null,
}


export const setSearchValue: ActionCreator<TSetSearchValueAction> = (payload: TSetSearchValuePayload) => ({
	type: ESearchAction.SET_SEARCH_VALUE,
	payload,
})

export interface TSetSearchValueAction {
	type: ESearchAction.SET_SEARCH_VALUE,
	payload: TSetSearchValuePayload,
}

export type TSetSearchValuePayload = {
	field: 'to' | 'from'
	value: string,
}


export const setSelectedSuggestion: ActionCreator<TSetSelectedSuggestionAction> = (payload: TSetSelectedSuggestionPayload) => ({
	type: ESearchAction.SET_SELECTED_SUGGESTION,
	payload,
})

export interface TSetSelectedSuggestionAction {
	type: ESearchAction.SET_SELECTED_SUGGESTION,
	payload: TSetSelectedSuggestionPayload,
}

export type TSetSelectedSuggestionPayload = {
	field: 'to' | 'from'
	value: number | null,
}


export const setSuggestions = (payload: TSetSuggestionsPayload): TSetSuggestionsAction => ({
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


export const setIsLoading: (payload: TSetIsLoadingPayload) => TSetIsLoadingAction = (payload) => ({
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

