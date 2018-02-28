import {TSearchState} from './search-defaultState'

export const getValue = (state: TSearchState, field: 'from' | 'to') => state.data[field].value

export const getSuggestions = (state: TSearchState, field: 'from' | 'to') => state.data[field].suggestions

export const getIsLoading = (state: TSearchState, field: 'from' | 'to') => state.ui[field].isLoading