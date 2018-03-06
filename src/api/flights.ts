import {apiUrl, apiRequest} from 'api/_base'

import {Moment} from 'moment'
import {TLocation} from 'types/TLocation'
import {TFlightsRaw} from 'types/TRoute'

export const apiGetFlights = async ({from, to, dateFrom, dateTo}: {from: TLocation, to: TLocation, dateFrom: Moment, dateTo: Moment}): Promise<TFlightsRaw> => {
	const response = await apiRequest(`${apiUrl}/flights` +
		`?flyFrom=${from.id}` +
		`&to=${to.id}` +
		`&dateFrom=${dateFrom.format('DD/MM/YYYY')}` +
		`&dateTo=${dateTo.format('DD/MM/YYYY')}`
	)

	return response.json()
}