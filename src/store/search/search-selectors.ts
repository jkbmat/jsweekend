import {createStructuredSelector} from 'reselect'

import {TSearchState} from './search-defaultState'
import {TLocation} from '../../types/TLocation'

export const getValue = (state: TSearchState, field: 'from' | 'to') => state.data[field].value

export const getSuggestions = (state: TSearchState, field: 'from' | 'to') => state.data[field].suggestions

export const getIsLoading = (state: TSearchState, field: 'from' | 'to') => state.ui[field].isLoading

export const getFrom: (state: TSearchState, field: 'from' | 'to') => TFieldInfo = createStructuredSelector({
	value: getValue,
	suggestions: getSuggestions,
	isLoading: getIsLoading,
})

export type TFieldInfo = {
	value: string,
	suggestions: Array<TLocation>,
	isLoading: boolean,
}