import {createStructuredSelector} from 'reselect'

import {ESearchInputField, TSearchState} from './search-defaultState'
import {TLocation} from 'types/TLocation'
import {Moment} from 'moment'

export const getLocation = (state: TSearchState, field: ESearchInputField) => state.data[field].location

export const getSearchValue = (state: TSearchState, field: ESearchInputField) => state.data[field].searchValue

export const getSuggestions = (state: TSearchState, field: ESearchInputField) => state.data[field].suggestions

export const getDate = (state: TSearchState, field: ESearchInputField | null) => {
	return field === null ? state.data.date : state.data[field].date
}

export const getIsLoading = (state: TSearchState, field: ESearchInputField) => state.ui[field].isLoading

export const getFocusedField = (state: TSearchState) => state.ui.focusedField

export const getSelectedSuggestion = (state: TSearchState, field: ESearchInputField) => state.ui[field].selectedSuggestion

export const getFieldInfo: (state: TSearchState, field: ESearchInputField) => TFieldInfo = createStructuredSelector({
	location: getLocation,
	searchValue: getSearchValue,
	suggestions: getSuggestions,
	isLoading: getIsLoading,
	selectedSuggestion: getSelectedSuggestion,
	date: getDate,
})

export type TFieldInfo = {
	location: TLocation | null,
	searchValue: string,
	suggestions: Array<TLocation>,
	isLoading: boolean,
	selectedSuggestion: number | null,
	date: Moment | null,
}