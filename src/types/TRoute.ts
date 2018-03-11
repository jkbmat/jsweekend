import {Moment} from 'moment'
import {TAirport, TAirportCode} from 'types/TLocation'
import {TAirline, TAirlineCode} from 'types/TAirline'

export type TRoute = {
	price: number,
	currency: string,
	flights: Array<TFlight>,
}

export type TFlight = {
	id: string,
	airline: TAirline,
	departureTime: Moment,
	arrivalTime: Moment,
	fromAirport: TAirport,
	toAirport: TAirport,
}

export type TFlightsRaw = {
	currency: string,

	data: Array<{
		price: number,

		route: Array<{
			id: string,
			dTimeUTC: number,
			aTimeUTC: number,
			airline: TAirlineCode,
			flyFrom: TAirportCode,
			flyTo: TAirportCode,
		}>
	}>,
}
