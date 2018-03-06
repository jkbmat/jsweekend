import {Moment} from 'moment'
import {TAirport, TAirportCode} from 'types/TLocation'
import {TAirline, TAirlineCode} from 'types/TAirline'

export type TRoute = {
	price: number,
	flights: Array<TFlight>,
}

export type TFlight = {
	airline: TAirline,
	departureTime: Moment,
	arrivalTime: Moment,
	fromAirport: TAirport,
	toAirport: TAirport,
}

export type TFlightsRaw = {
	data: Array<{
		price: number,

		route: Array<{
			dTimeUTC: number,
			aTimeUTC: number,
			airline: TAirlineCode,
			flyFrom: TAirportCode,
			flyTo: TAirportCode,
		}>
	}>,
}
