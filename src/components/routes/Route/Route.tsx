import * as React from 'react'
import * as moment from 'moment'

import * as FontAwesome from 'react-fontawesome'

import {TFlight, TRoute} from 'types/TRoute'

import './Route.css'
import Flight from 'components/routes/Flight/Flight'


interface TProps {
	route: TRoute,
}


export default class Route extends React.Component<TProps> {
	render () {
		const {route} = this.props

		const firstFlight = route.flights[0]
		const lastFlight = route.flights[route.flights.length - 1]
		const duration = moment.duration(lastFlight.arrivalTime.diff(firstFlight.departureTime))

		return (
			<div className='Route'>
				<div className='Route__header'>
					<div className='Route__header-price'>
						{route.price} {route.currency}
					</div>

					<div className='Route__header-from'>
						<div className='Route__header-from-time'>
							{firstFlight.departureTime.format('h:mm A')}
						</div>
						<div className='Route__header-from-airport'>
							{firstFlight.fromAirport.name}
						</div>
					</div>

					<div className='Route__header-separator'>
						<FontAwesome name='plane'/>
					</div>

					<div className='Route__header-to'>
						<div className='Route__header-to-airport'>
							{lastFlight.toAirport.name}
						</div>
						<div className='Route__header-to-time'>
							{lastFlight.arrivalTime.format('h:mm A')}
						</div>
					</div>


					<div className='Route__header-duration'>
						{duration.format('h [hours], m [minutes]')}
					</div>
				</div>
				
				<table className='Route__flights'>
					<thead>
						<tr>
							<td>Departure</td>
							<td>Arrival</td>
							<td>Duration</td>
							<td>Airline</td>
						</tr>
					</thead>
					<tbody>
						{route.flights.map((flight: TFlight) => <Flight key={flight.id} flight={flight}/>)}
					</tbody>
				</table>
			</div>
		)
	}
}