import {TLocation} from 'types/TLocation'
import {ActionCreator} from 'redux'
import {Moment} from 'moment'

import {ESearchInputField} from './search-defaultState'

export enum ESearchAction {
	SET_LOADING = 'SET_LOADING',
	SET_SELECTED_SUGGESTION = 'SET_SELECTED_SUGGESTION',

	SET_LOCATION = 'SET_LOCATION',
	SET_SEARCH_VALUE = 'SET_SEARCH_VALUE',
	SET_SUGGESTIONS = 'SET_SUGGESTIONS',
	SET_DATE = 'SET_DATE',
}

export type TSearchAction = TSetValueAction | TSetSearchValueAction | TSetSuggestionsAction | TSetIsLoadingAction
	| TSetSelectedSuggestionAction | TSetDateAction


export const setValue: ActionCreator<TSetValueAction> = (payload: TSetValuePayload) => ({
	type: ESearchAction.SET_LOCATION,
	payload,
})

export interface TSetValueAction {
	type: ESearchAction.SET_LOCATION,
	payload: TSetValuePayload,
}

export type TSetValuePayload = {
	field: ESearchInputField,
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
	field: ESearchInputField,
	value: string,
}


export const setDate: ActionCreator<TSetDateAction> = (payload: TSetDatePayload) => ({
	type: ESearchAction.SET_DATE,
	payload,
})

export interface TSetDateAction {
	type: ESearchAction.SET_DATE,
	payload: TSetDatePayload,
}

export type TSetDatePayload = {
	field: ESearchInputField | null,
	value: Moment | null,
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
	field: ESearchInputField,
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
	field: ESearchInputField,
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
	field: ESearchInputField,
	value: boolean,
}

