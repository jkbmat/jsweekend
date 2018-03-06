import {TGeneralState} from './general-defaultState'

export const getAirlines = (state: TGeneralState) => state.data.airlines

export const getIsLoading = (state: TGeneralState) => state.ui.loadingLevel > 0