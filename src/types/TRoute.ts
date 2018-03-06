import {Moment} from 'moment'
import {TAirport} from 'types/TLocation'
import {TAirline} from 'types/TAirline'

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

export type TRouteRaw = Object
