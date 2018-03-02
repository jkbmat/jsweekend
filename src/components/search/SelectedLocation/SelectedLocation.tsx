import * as React from 'react'
import {TLocation} from 'types/TLocation'
import * as FontAwesome from 'react-fontawesome'

import './SelectedLocation.css'


interface TProps {
	location: TLocation,
	onRemoveLocation: () => void,
}

export default class SelectedLocation extends React.Component<TProps> {
	render () {
		const {location, onRemoveLocation} = this.props

		return (
			<div className='SelectedLocation' onClick={onRemoveLocation}>
				<div className='SelectedLocation__name'>{location.name}</div>
				<div className='SelectedLocation__tag'>{location.type}</div>
				<div className='SelectedLocation__remove'>
					<FontAwesome name='times'/>
				</div>
			</div>
		)
	}
}