import {apiUrl, apiRequest} from 'api/_base'

import {Moment} from 'moment'
import {TLocation} from 'types/TLocation'

export const apiGetFlights = async ({from, to, dateFrom, dateTo}: {from: TLocation, to: TLocation, dateFrom: Moment, dateTo: Moment}) => {
	const response = await apiRequest(`${apiUrl}/flights` +
		`?flyFrom=${from.id}` +
		`&to=${to.id}` +
		`&dateFrom=${dateFrom.format('DD/MM/YYYY')}` +
		`&dateTo=${dateTo.format('DD/MM/YYYY')}`
	)

	return response.json()
}