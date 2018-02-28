import {TLocation} from 'types/TLocation'

export const defaultState: TSearchState = {
	ui: {
		from: {
			isLoading: false
		},
		to: {
			isLoading: false
		},
	},
	data: {
		from: {
			value: '',
			suggestions: [],
		},
		to: {
			value: '',
			suggestions: [],
		},
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
}

export type TSearchFieldData = {
	value: string,
	suggestions: Array<TLocation>,
}

export default defaultState