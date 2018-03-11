import * as React from 'react'

import {TFlight} from 'types/TRoute'

import './Flight.css'
import * as moment from 'moment'


interface TProps {
	flight: TFlight,
}

export default class Flight extends React.Component<TProps> {
	render () {
		const {flight} = this.props

		return (
			<tr className='Flight'>
				<td>
					<div className='Flight__departure'>
						<div className='Flight__departure-time'>
							<strong>{flight.departureTime.format('HH:mm')}</strong>
						</div>
						<div className='Flight__departure-airport'>
							<strong>{flight.fromAirport.name}</strong>, {flight.fromAirport.city.name}, {flight.fromAirport.city.country.name}
						</div>
					</div>
				</td>

				<td>
					<div className='Flight__arrival'>
						<div className='Flight__arrival-time'>
							<strong>{flight.arrivalTime.format('HH:mm')}</strong>
						</div>
						<div className='Flight__arrival-airport'>
							<strong>{flight.toAirport.name}</strong>, {flight.toAirport.city.name}, {flight.toAirport.city.country.name}
						</div>
					</div>
				</td>

				<td>
					<div className='Flight__duration'>
						{moment.duration(flight.arrivalTime.diff(flight.departureTime)).format('h [hours], m [minutes]')}
					</div>
				</td>

				<td>
					<div className='Flight__airline'>
						<div className='Flight__airline-logo'>
							<img src={`https://images.kiwi.com/airlines/64/${flight.airline.code}.png`}/>
						</div>
						<div className='Flight__airline-name'>
							{flight.airline.name}
						</div>
					</div>
				</td>
			</tr>
		)
	}
}