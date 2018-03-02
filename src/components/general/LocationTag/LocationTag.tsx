import * as React from 'react'

import {ELocationType} from 'types/TLocation'

import './LocationTag.css'


interface TProps {
	type: ELocationType,
}

export default class LocationTag extends React.Component<TProps> {
	render () {
		const {type} = this.props

		return (
			<div className={`LocationTag LocationTag--${type}`}>
				{type.replace(/_/g, ' ')}
			</div>
		)
	}
}