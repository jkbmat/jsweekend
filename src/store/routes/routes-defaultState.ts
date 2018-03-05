import {TRoute} from 'types/TRoute'

export const defaultState: TRoutesState = {
	ui: {
		isLoading: false,
		offset: 0,
		limit: 5,
	},
	data: {
		routes: null,
	},
}

export type TRoutesState = {
	ui: {
		isLoading: boolean,
		offset: number,
		limit: number,
	},
	data: {
		routes: Array<TRoute> | null,
	},
}


export default defaultState