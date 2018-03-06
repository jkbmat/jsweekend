import {TAirline} from 'types/TAirline'

export const defaultState: TGeneralState = {
	ui: {
		loadingLevel: 0,
	},
	data: {
		airlines: null,
	},
}

export type TGeneralState = {
	ui: {
		loadingLevel: number,
	},
	data: {
		airlines: Array<TAirline> | null,
	},
}


export default defaultState