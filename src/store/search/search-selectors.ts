import {createStructuredSelector} from 'reselect'

import {TSearchState} from './search-defaultState'
import {TLocation} from '../../types/TLocation'

export const getValue = (state: TSearchState, field: 'from' | 'to') => state.data[field].value

export const getSearchValue = (state: TSearchState, field: 'from' | 'to') => state.data[field].searchValue

export const getSuggestions = (state: TSearchState, field: 'from' | 'to') => state.data[field].suggestions

export const getIsLoading = (state: TSearchState, field: 'from' | 'to') => state.ui[field].isLoading

export const getSelectedSuggestion = (state: TSearchState, field: 'from' | 'to') => state.ui[field].selectedSuggestion

export const getFieldInfo: (state: TSearchState, field: 'from' | 'to') => TFieldInfo = createStructuredSelector({
	value: getValue,
	searchValue: getSearchValue,
	suggestions: getSuggestions,
	isLoading: getIsLoading,
	selectedSuggestion: getSelectedSuggestion,
})

export type TFieldInfo = {
	value: TLocation | null,
	searchValue: string,
	suggestions: Array<TLocation>,
	isLoading: boolean,
	selectedSuggestion: number | null,
}