import {TLocation} from 'types/TLocation'
import {ActionCreator, Dispatch} from 'redux'
import {Moment} from 'moment'

import {apiGetLocationSuggestions} from 'api/location'

import {getSearchValue} from 'store/search/search-selectors'

import {ESearchInputField, TSearchState} from './search-defaultState'
import {ThunkAction} from 'redux-thunk'
import {TStoreState} from 'store/store'


export enum ESearchAction {
	SET_LOADING = '@@search/SET_LOADING',
	SET_SELECTED_SUGGESTION = '@@search/SET_SELECTED_SUGGESTION',
	SET_FOCUSED_FIELD = '@@search/SET_FOCUSED_FIELD',

	SET_LOCATION = '@@search/SET_LOCATION',
	SET_SEARCH_VALUE = '@@search/SET_SEARCH_VALUE',
	SET_SUGGESTIONS = '@@search/SET_SUGGESTIONS',
	SET_DATE = '@@search/SET_DATE',
}

export type TSearchAction = TSetValueAction | TSetSearchValueAction | TSetSuggestionsAction | TSetIsLoadingAction
	| TSetSelectedSuggestionAction | TSetDateAction | TSetFocusedFieldAction


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


export const setFocusedField: (payload: TSetFocusedFieldPayload) => TSetFocusedFieldAction = (payload) => ({
	type: ESearchAction.SET_FOCUSED_FIELD,
	payload,
})

export interface TSetFocusedFieldAction {
	type: ESearchAction.SET_FOCUSED_FIELD,
	payload: TSetFocusedFieldPayload,
}

export type TSetFocusedFieldPayload = {
	value: ESearchInputField | null,
}


export const loadSuggestions: (payload: TLoadSuggestionsPayload) => ThunkAction<void, TStoreState, void> = (payload) =>
	async (dispatch: Dispatch<TSearchState>, getState: () => TStoreState) => {
		const {field} = payload

		dispatch(setIsLoading({field, value: true}))

		const suggestions = (await apiGetLocationSuggestions(getSearchValue(getState().modules.search, field))).locations
		dispatch(setSuggestions({field, value: suggestions}))

		dispatch(setIsLoading({field, value: false}))
	}

export type TLoadSuggestionsPayload = {
	field: ESearchInputField,
}