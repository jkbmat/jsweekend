import {TLocation} from 'types/TLocation'
import {Moment} from 'moment'

const searchFieldUIDefaultState = {
	isLoading: false,
	selectedSuggestion: 1,
}

const searchFieldDataDefaultState = {
	location: null,
	searchValue: '',
	suggestions: [],
	date: null,
}

export const defaultState: TSearchState = {
	ui: {
		from: searchFieldUIDefaultState,
		to: searchFieldUIDefaultState,
	},
	data: {
		from: searchFieldDataDefaultState,
		to: searchFieldDataDefaultState,
		date: null,
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
		date: Moment | null
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
	date: Moment | null,
}

export enum ESearchInputField {
	FROM = 'from',
	TO = 'to',
}

export default defaultState