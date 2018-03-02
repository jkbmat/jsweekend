import {TLocation} from 'types/TLocation'

const searchFieldUIDefaultState = {
	isLoading: false,
	selectedSuggestion: 1,
}

const searchFieldDataDefaultState = {
	location: null,
	searchValue: '',
	suggestions: [],
}

export const defaultState: TSearchState = {
	ui: {
		from: searchFieldUIDefaultState,
		to: searchFieldUIDefaultState,
	},
	data: {
		from: searchFieldDataDefaultState,
		to: searchFieldDataDefaultState,
	},
}

export type TSearchState = {
	ui: {
		from: TSearchFieldUI,
		to: TSearchFieldUI,
	},
	data: {
		from: TSearchFieldData,
		to: TSearchFieldData,
	},
}

export type TSearchFieldUI = {
	isLoading: boolean,
	selectedSuggestion: number | null,
}

export type TSearchFieldData = {
	location: TLocation | null,
	searchValue: string,
	suggestions: Array<TLocation>,
}

export enum ESearchInputField {
	FROM = 'from',
	TO = 'to',
}

export default defaultState