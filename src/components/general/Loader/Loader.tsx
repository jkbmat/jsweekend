import * as React from 'react'
import * as FontAwesome from 'react-fontawesome'

import './Loader.css'

interface TProps {
	fullWidth?: boolean,
}

export default class Loader extends React.Component<TProps> {
	static defaultProps = {
		fullWidth: false,
	}

	render () {
		const {fullWidth} = this.props

		return (
			<div className={`Loader ${fullWidth ? 'Loader--fullWidth' : ''}`}>
				<FontAwesome name='spinner' className='Loader__spinner'/>
			</div>
		)
	}
}