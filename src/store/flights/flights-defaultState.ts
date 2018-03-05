import {TRoute} from 'types/TFlight'

export const defaultState: TFlightsState = {
	ui: {
		isLoading: false,
		offset: 0,
		limit: 5,
	},
	data: {
		flights: null,
	},
}

export type TFlightsState = {
	ui: {
		isLoading: boolean,
		offset: number,
		limit: number,
	},
	data: {
		flights: Array<TRoute> | null,
	},
}


export default defaultState